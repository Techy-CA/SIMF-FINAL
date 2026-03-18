import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import type { Donor } from '../../data/campaignData';
import { staggerContainer, fadeInUp } from '../../utils/animations';

interface Props {
  donors:     Donor[];
  totalCount: number;
}

const avatarColors = [
  'bg-rose-100 text-rose-700',
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-violet-100 text-violet-700',
  'bg-teal-100 text-teal-700',
  'bg-orange-100 text-orange-700',
];

const DonorsList: React.FC<Props> = ({ donors, totalCount }) => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? donors : donors.slice(0, 5);

  return (
    <section
      aria-label="Recent donors"
      className="bg-white rounded-2xl shadow-card border border-gray-50 p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-poppins font-bold text-lg text-gray-900">
          Recent Donors
        </h2>
        <span className="text-xs font-semibold text-primary-800 bg-primary-50 px-3 py-1 rounded-full">
          {totalCount} people donated
        </span>
      </div>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3"
        aria-label="List of recent donors"
      >
        {visible.map((donor, index) => (
          <motion.li
            key={donor.id}
            variants={fadeInUp}
            className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0"
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0
                          text-xs font-bold ${avatarColors[index % avatarColors.length]}`}
              aria-hidden="true"
            >
              {donor.isAnonymous
                ? '?'
                : donor.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-gray-900 text-sm truncate">
                  {donor.isAnonymous ? 'Anonymous' : donor.name}
                </p>
                <span className="font-poppins font-bold text-primary-800 text-sm shrink-0">
                  ₹{donor.amount.toLocaleString('en-IN')}
                </span>
              </div>
              {donor.message && (
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed italic">
                  "{donor.message}"
                </p>
              )}
              <p className="text-gray-400 text-xs mt-1">{donor.timeAgo}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>

      {/* Show more */}
      {donors.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full flex items-center justify-center gap-1.5 text-primary-800
                     text-sm font-medium py-2.5 border border-primary-100 rounded-xl
                     hover:bg-primary-50 transition-colors focus:outline-none"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
          />
          {showAll ? 'Show Less' : `View All ${totalCount} Donors`}
        </button>
      )}

      {/* Donate nudge */}
      <div className="mt-4 bg-primary-50 rounded-xl px-4 py-3 flex items-center gap-2.5
                border border-primary-100">
  <Heart className="w-4 h-4 text-primary-500 fill-primary-200 shrink-0" />
  <p className="text-gray-600 text-xs">
    <span className="font-semibold text-gray-800">Be the next hero.</span>{' '}
    Even ₹100 makes a real difference.
        </p>
      </div>
    </section>
  );
};

export default DonorsList;
