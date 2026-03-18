import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle, IndianRupee } from 'lucide-react';
import { loadRazorpayScript } from '../utils/loadRazorpay';

/* ── types ───────────────────────────────────────────────── */
interface FormData {
  name:  string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?:   string;
  email?:  string;
  phone?:  string;
  amount?: string;
}

/* ── constants ───────────────────────────────────────────── */
const PRESET_AMOUNTS = [100, 500, 1000, 5000];

// 🔑 Replace with your actual Razorpay test key from the dashboard
const RAZORPAY_KEY = 'rzp_test_YourTestKeyHere';

/* ── validation ──────────────────────────────────────────── */
const validate = (form: FormData, amount: number | null, custom: string): FormErrors => {
  const errors: FormErrors = {};
  const finalAmount = custom ? parseFloat(custom) : amount;

  if (!form.name.trim() || form.name.trim().length < 3)
    errors.name = 'Please enter your full name (min 3 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Please enter a valid email address.';
  if (!/^[6-9]\d{9}$/.test(form.phone))
    errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
  if (!finalAmount || finalAmount < 1)
    errors.amount = 'Please select or enter a donation amount.';

  return errors;
};

/* ── component ───────────────────────────────────────────── */
const DonationForm: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
  const [customAmount,   setCustomAmount]   = useState('');
  const [form,           setForm]           = useState<FormData>({ name: '', email: '', phone: '' });
  const [errors,         setErrors]         = useState<FormErrors>({});
  const [isLoading,      setIsLoading]      = useState(false);
  const [isSuccess,      setIsSuccess]      = useState(false);
  const [paymentId,      setPaymentId]      = useState('');

  const finalAmount = customAmount ? parseFloat(customAmount) : (selectedAmount ?? 0);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) setSelectedAmount(null);
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: undefined }));
  };

  const handlePresetClick = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount('');
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: undefined }));
  };

  const handleDonate = async () => {
    const validationErrors = validate(form, selectedAmount, customAmount);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      setIsLoading(false);
      return;
    }

    const options: RazorpayOptions = {
      key:         RAZORPAY_KEY,
      amount:      Math.round(finalAmount * 100), // paise
      currency:    'INR',
      name:        'SIMF — Sugandhi Foundation',
      description: 'Donation to support SIMF programs',
      prefill: {
        name:    form.name,
        email:   form.email,
        contact: form.phone,
      },
      notes: {
        donor_name: form.name,
      },
      theme: { color: '#2E7D32' },
      handler: (response) => {
        setPaymentId(response.razorpay_payment_id);
        setIsSuccess(true);
        setIsLoading(false);
      },
      modal: {
        ondismiss: () => setIsLoading(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  /* ── success screen ──────────────────────────────────── */
  if (isSuccess) {
    return (
      <section id="donate" className="py-20 md:py-28 bg-beige-100" aria-label="Donation section">
        <div className="max-w-lg mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="bg-white rounded-3xl p-10 shadow-card-lg text-center"
          >
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-9 h-9 text-primary-800" />
            </div>
            <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-3">
              Thank You, {form.name.split(' ')[0]}! 🙏
            </h2>
            <p className="text-gray-500 mb-2">
              Your donation of{' '}
              <span className="font-semibold text-primary-800">₹{finalAmount.toLocaleString('en-IN')}</span>{' '}
              has been received successfully.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Payment ID: <span className="font-mono text-gray-600">{paymentId}</span>
            </p>
            <p className="text-gray-500 text-sm leading-relaxed bg-primary-50 rounded-xl p-4">
              A confirmation email will be sent to <strong>{form.email}</strong>. Your contribution
              will directly support education and community programs run by SIMF. Thank you for
              making a real difference.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setForm({ name: '', email: '', phone: '' });
                setSelectedAmount(500);
                setCustomAmount('');
                setErrors({});
              }}
              className="mt-6 btn-outline text-sm"
            >
              Make Another Donation
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ── form ──────────────────────────────────────────────── */
  return (
    <section id="donate" className="py-20 md:py-28 bg-beige-100" aria-label="Donation form">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-tag">Support Us</span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900 mt-2">
            Make a Donation
          </h2>
          <p className="text-gray-500 mt-3 text-base leading-relaxed max-w-md mx-auto">
            Your generosity directly funds education, skill development, and community
            welfare programs across India.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-card-lg p-8 sm:p-10"
        >

          {/* Amount presets */}
          <fieldset>
            <legend className="text-sm font-semibold text-gray-700 mb-3">
              Select Donation Amount
            </legend>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePresetClick(amt)}
                  className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary-800 focus:ring-offset-1
                    ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-primary-800 border-primary-800 text-white shadow-card'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-primary-400 hover:text-primary-800'
                    }`}
                  aria-pressed={selectedAmount === amt && !customAmount}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <IndianRupee className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                inputMode="numeric"
                value={customAmount}
                onChange={handleCustomAmount}
                placeholder="Enter custom amount"
                className={`input-field pl-10 ${errors.amount ? 'input-error' : ''}`}
                aria-label="Custom donation amount in rupees"
              />
            </div>
            <AnimatePresence>
              {errors.amount && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                  role="alert"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.amount}
                </motion.p>
              )}
            </AnimatePresence>
          </fieldset>

          {/* Divider */}
          <div className="border-t border-gray-100 my-7" />

          {/* Donor info */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-gray-700">Your Details</h3>

            {/* Name */}
            <div>
              <label htmlFor="donor-name" className="block text-sm text-gray-600 mb-1.5 font-medium">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="donor-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleFormChange}
                placeholder="e.g. Rahul Sharma"
                className={`input-field ${errors.name ? 'input-error' : ''}`}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    id="name-error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="donor-email" className="block text-sm text-gray-600 mb-1.5 font-medium">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                id="donor-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleFormChange}
                placeholder="e.g. rahul@gmail.com"
                className={`input-field ${errors.email ? 'input-error' : ''}`}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="donor-phone" className="block text-sm text-gray-600 mb-1.5 font-medium">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span
                  className="absolute inset-y-0 left-4 flex items-center text-gray-400
                              text-sm font-medium pointer-events-none"
                >
                  +91
                </span>
                <input
                  id="donor-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleFormChange}
                  placeholder="98XXXXXXXX"
                  maxLength={10}
                  className={`input-field pl-12 ${errors.phone ? 'input-error' : ''}`}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
              </div>
              <AnimatePresence>
                {errors.phone && (
                  <motion.p
                    id="phone-error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Summary + CTA */}
          <div className="mt-8">
            {finalAmount > 0 && (
              <div className="bg-primary-50 rounded-xl px-5 py-3 mb-5 flex items-center justify-between">
                <span className="text-gray-600 text-sm">Donation amount</span>
                <span className="font-poppins font-bold text-primary-800 text-lg">
                  ₹{finalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={handleDonate}
              disabled={isLoading}
              className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
              aria-label={isLoading ? 'Processing payment' : 'Proceed to donate'}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Opening Payment...
                </>
              ) : (
                'Proceed to Donate'
              )}
            </button>

            <p className="text-center text-gray-400 text-xs mt-4">
              🔒 Secured by Razorpay · Your data is safe with us
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationForm;
