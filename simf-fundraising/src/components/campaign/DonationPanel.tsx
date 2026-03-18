import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2, AlertCircle, Heart, Users, Clock,
  IndianRupee, Lock, AlertTriangle, CheckCircle2,
} from 'lucide-react';
import { loadRazorpayScript } from '../../utils/loadRazorpay';
import type { Campaign } from '../../data/campaignData';

interface Props { campaign: Campaign; }

interface DonorInfo {
  name:    string;
  email:   string;
  phone:   string;
  message: string;
}

interface Errors {
  name?:   string;
  email?:  string;
  phone?:  string;
  amount?: string;
}

const PRESET_AMOUNTS = [500, 1000, 2000, 5000];
const RAZORPAY_KEY   = 'rzp_test_YourTestKeyHere';

const DonationPanel: React.FC<Props> = ({ campaign }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount,   setCustomAmount]   = useState('');
  const [donor,          setDonor]          = useState<DonorInfo>({
    name: '', email: '', phone: '', message: '',
  });
  const [errors,    setErrors]    = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');

  const percentage  = Math.min(Math.round((campaign.raisedAmount / campaign.goalAmount) * 100), 100);
  const finalAmount = customAmount ? parseFloat(customAmount) : (selectedAmount ?? 0);
  const remaining   = campaign.goalAmount - campaign.raisedAmount;

  /* -- Validation -- */
  const validate = (): Errors => {
    const e: Errors = {};
    if (!donor.name.trim() || donor.name.trim().length < 3)
      e.name  = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donor.email))
      e.email = 'Please enter a valid email address.';
    if (!/^[6-9]\d{9}$/.test(donor.phone))
      e.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (!finalAmount || finalAmount < 1)
      e.amount = 'Please select or enter a donation amount.';
    return e;
  };

  /* -- Handlers -- */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDonor(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors])
      setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handlePreset = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount('');
    if (errors.amount) setErrors(prev => ({ ...prev, amount: undefined }));
  };

  const handleCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    if (val) setSelectedAmount(null);
    if (errors.amount) setErrors(prev => ({ ...prev, amount: undefined }));
  };

  const handleDonate = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setIsLoading(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Razorpay failed to load. Check your internet connection.');
      setIsLoading(false);
      return;
    }

    const rzp = new window.Razorpay({
      key:         RAZORPAY_KEY,
      amount:      Math.round(finalAmount * 100),
      currency:    'INR',
      name:        `SIMF — Help ${campaign.patientName}`,
      description: `Donation for ${campaign.patientName}'s ${campaign.condition} surgery`,
      prefill:     { name: donor.name, email: donor.email, contact: donor.phone },
      notes:       { patient: campaign.patientName, message: donor.message },
      theme:       { color: '#2ECC8F' },
      handler: (response) => {
        setPaymentId(response.razorpay_payment_id);
        setIsSuccess(true);
        setIsLoading(false);
      },
      modal: { ondismiss: () => setIsLoading(false) },
    });
    rzp.open();
  };

  const resetForm = () => {
    setIsSuccess(false);
    setDonor({ name: '', email: '', phone: '', message: '' });
    setSelectedAmount(1000);
    setCustomAmount('');
    setErrors({});
    setPaymentId('');
  };

  /* -- Error message component -- */
  const ErrorMsg: React.FC<{ msg?: string }> = ({ msg }) => (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );

  /* -- Success screen -- */
  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-card-lg border border-gray-100 p-8 text-center">
        <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-primary-500" />
        </div>
        <h3 className="font-poppins font-bold text-xl text-gray-900 mb-2">
          Donation Received
        </h3>
        <p className="text-gray-500 text-sm mb-1">
          Your donation of{' '}
          <span className="font-bold text-primary-600">
            ₹{finalAmount.toLocaleString('en-IN')}
          </span>{' '}
          will directly fund {campaign.patientName}'s treatment.
        </p>
        <p className="text-gray-400 text-xs mb-6 font-mono break-all">{paymentId}</p>
        <button onClick={resetForm} className="btn-outline text-sm w-full">
          Donate Again
        </button>
      </div>
    );
  }

  /* -- Donation form -- */
  return (
    <div className="bg-white rounded-2xl shadow-card-lg border border-gray-100 overflow-hidden">

      {/* Progress block */}
      <div className="p-5 sm:p-6 border-b border-gray-100">
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="font-poppins font-bold text-xl sm:text-2xl text-gray-900">
              ₹{campaign.raisedAmount.toLocaleString('en-IN')}
            </p>
            <p className="text-gray-400 text-xs mt-0.5">
              raised of{' '}
              <span className="text-gray-600 font-medium">
                ₹{campaign.goalAmount.toLocaleString('en-IN')}
              </span>{' '}
              goal
            </p>
          </div>
          <span className="font-poppins font-bold text-primary-600 text-lg">
            {percentage}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-5">
          <motion.div
            className="h-full bg-primary-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
          />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 text-center divide-x divide-gray-100">
          <div className="px-2">
            <p className="font-poppins font-bold text-gray-900 text-base sm:text-lg">
              {campaign.donorCount}
            </p>
            <p className="text-gray-400 text-xs flex items-center justify-center gap-1 mt-0.5">
              <Users className="w-3 h-3 shrink-0" />
              <span>Donors</span>
            </p>
          </div>
          <div className="px-2">
            <p className="font-poppins font-bold text-gray-900 text-base sm:text-lg">
              {campaign.daysLeft}
            </p>
            <p className="text-gray-400 text-xs flex items-center justify-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 shrink-0" />
              <span>Days Left</span>
            </p>
          </div>
          <div className="px-2">
            <p className="font-poppins font-bold text-red-600 text-base sm:text-lg">
             ₹{(remaining / 100000).toFixed(1)}L
            </p>
            <p className="text-gray-400 text-xs mt-0.5">Still Needed</p>
          </div>
        </div>
      </div>

      {/* Form body */}
      <div className="p-5 sm:p-6 space-y-5">

        {/* Urgency note */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex gap-2.5">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-red-700 text-xs font-medium leading-relaxed">
            {campaign.urgencyNote}
          </p>
        </div>

        {/* Preset amounts */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Select Amount</p>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {PRESET_AMOUNTS.map(amt => (
              <button
                key={amt}
                type="button"
                onClick={() => handlePreset(amt)}
                aria-pressed={selectedAmount === amt && !customAmount}
                className={`py-2.5 text-xs font-semibold rounded-xl border-2 transition-all
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1
                  ${selectedAmount === amt && !customAmount
                    ? 'bg-primary-500 border-primary-500 text-white shadow-sm'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-primary-400 hover:text-primary-600'
                  }`}
              >
                ₹{amt >= 1000 ? `${amt / 1000}K` : amt}
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
              onChange={handleCustom}
              placeholder="Enter custom amount"
              className={`input-field pl-10 text-sm ${errors.amount ? 'input-error' : ''}`}
              aria-label="Custom donation amount"
            />
          </div>
          <ErrorMsg msg={errors.amount} />
        </div>

        {/* Donor fields */}
        <div className="space-y-3">
          <div>
            <input
              name="name"
              type="text"
              autoComplete="name"
              value={donor.name}
              onChange={handleInputChange}
              placeholder="Your Full Name *"
              className={`input-field text-sm ${errors.name ? 'input-error' : ''}`}
              aria-label="Your full name"
            />
            <ErrorMsg msg={errors.name} />
          </div>

          <div>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={donor.email}
              onChange={handleInputChange}
              placeholder="Email Address *"
              className={`input-field text-sm ${errors.email ? 'input-error' : ''}`}
              aria-label="Your email address"
            />
            <ErrorMsg msg={errors.email} />
          </div>

          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400
                               text-sm pointer-events-none select-none font-medium">
                +91
              </span>
              <input
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={donor.phone}
                onChange={handleInputChange}
                placeholder="Mobile Number *"
                maxLength={10}
                className={`input-field pl-12 text-sm ${errors.phone ? 'input-error' : ''}`}
                aria-label="Your mobile number"
              />
            </div>
            <ErrorMsg msg={errors.phone} />
          </div>

          <input
            name="message"
            type="text"
            value={donor.message}
            onChange={handleInputChange}
            placeholder="Leave a message for the family (optional)"
            className="input-field text-sm"
            aria-label="Optional message for the family"
          />
        </div>

        {/* Amount summary */}
        {finalAmount > 0 && (
          <div className="bg-primary-50 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-gray-600 text-sm">You are donating</span>
            <span className="font-poppins font-bold text-primary-700 text-lg">
              ₹{finalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        )}

        {/* CTA */}
        <button
          type="button"
          onClick={handleDonate}
          disabled={isLoading}
          className="btn-primary w-full py-4 text-sm flex items-center justify-center gap-2
                     disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label={isLoading ? 'Processing payment' : `Donate to help ${campaign.patientName}`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Opening Payment...
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 fill-white" />
              Donate Now — Help {campaign.patientName.split(' ')[0]}
            </>
          )}
        </button>

        {/* Trust line — only Razorpay security */}
<div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
  <Lock className="w-3 h-3 shrink-0" />
  <span>Secured by Razorpay</span>
</div>

      </div>
    </div>
  );
};

export default DonationPanel;
