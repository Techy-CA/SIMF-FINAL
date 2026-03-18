import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Receipt, Eye, Quote } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../utils/animations';

const badges = [
  {
    icon:  ShieldCheck,
    title: 'Verified NGO',
    desc:  'Registered under the Societies Registration Act. Fully compliant with government norms.',
    color: 'text-primary-800',
    bg:    'bg-primary-50',
  },
  {
    icon:  Lock,
    title: 'Secure Payments',
    desc:  'All transactions are encrypted and processed securely through Razorpay.',
    color: 'text-blue-700',
    bg:    'bg-blue-50',
  },
  {
    icon:  Receipt,
    title: 'Tax Benefits (80G)',
    desc:  'Donations are eligible for tax deduction under Section 80G of the Income Tax Act.',
    color: 'text-amber-700',
    bg:    'bg-amber-50',
  },
  {
    icon:  Eye,
    title: '100% Transparent',
    desc:  'Annual reports, fund utilisation, and impact data are publicly available.',
    color: 'text-violet-700',
    bg:    'bg-violet-50',
  },
];

const testimonials = [
  {
    quote:    'Donating to SIMF was one of the best decisions I\'ve made. Their transparency and real impact reports give me full confidence that my contribution is genuinely helping children.',
    author:   'Priya Sharma',
    location: 'Mumbai, Maharashtra',
    avatar:   'PS',
  },
  {
    quote:    'I have been supporting SIMF for over two years. Their work in rural education is truly transforming lives. I\'ve seen the change firsthand during a site visit.',
    author:   'Rahul Verma',
    location: 'Pune, Maharashtra',
    avatar:   'RV',
  },
  {
    quote:    'What sets SIMF apart is how they communicate impact. I receive regular updates and know exactly where every rupee goes. That\'s rare and deeply reassuring.',
    author:   'Anita Kulkarni',
    location: 'Nagpur, Maharashtra',
    avatar:   'AK',
  },
];

const TrustSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white" aria-label="Trust and testimonials section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Trust badges */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag">Why Trust Us</span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900 mt-2">
            Your Trust is Our Foundation
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-base leading-relaxed">
            We uphold the highest standards of transparency, governance, and accountability
            in everything we do.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20"
        >
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-md
                           transition-shadow duration-300 border border-gray-50"
              >
                <div
                  className={`${badge.bg} ${badge.color} w-11 h-11 rounded-xl
                               flex items-center justify-center mb-4`}
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-semibold text-gray-900 mb-2">
                  {badge.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{badge.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag">Testimonials</span>
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mt-2">
            Voices from Our Community
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={fadeInUp}
              className="bg-beige-50 rounded-2xl p-7 border border-beige-200
                         hover:shadow-card transition-shadow duration-300"
            >
              <Quote
                className="w-7 h-7 text-primary-200 mb-4 fill-primary-100"
                aria-hidden="true"
              />
              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full bg-primary-800 text-white
                               flex items-center justify-center text-xs font-bold"
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.author}</p>
                  <p className="text-gray-400 text-xs">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
