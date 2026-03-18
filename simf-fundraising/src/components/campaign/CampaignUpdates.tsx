import { motion } from 'framer-motion';
import { BellRing, CalendarDays, User } from 'lucide-react';
import type { CampaignUpdate } from '../../data/campaignData';
import { staggerContainer, fadeInUp } from '../../utils/animations';

interface Props {
  updates:     CampaignUpdate[];
  patientName: string;
}

const CampaignUpdates: React.FC<Props> = ({ updates, patientName }) => {
  return (
    <section
      aria-label="Campaign updates"
      className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 sm:p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
          <BellRing className="w-4 h-4 text-primary-600" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-poppins font-bold text-base sm:text-lg text-gray-900">
            Campaign Updates
          </h2>
          <p className="text-gray-400 text-xs">Latest news from {patientName}'s family</p>
        </div>
      </div>

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative border-l-2 border-primary-100 pl-5 sm:pl-6 space-y-7"
        aria-label="Timeline of campaign updates"
      >
        {updates.map((update, index) => (
          <motion.li key={update.id} variants={fadeInUp} className="relative">

            {/* Timeline dot */}
            <div
              className={`absolute -left-[27px] sm:-left-[29px] w-4 h-4 rounded-full border-2
                          border-primary-500 flex items-center justify-center
                          ${index === 0 ? 'bg-primary-500' : 'bg-white'}`}
              aria-hidden="true"
            >
              {index === 0 && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>

            {/* Card */}
            <div className={`rounded-xl p-3.5 sm:p-4 ${
              index === 0
                ? 'bg-primary-50 border border-primary-100'
                : 'bg-gray-50 border border-gray-100'
            }`}>
              <div className="flex flex-wrap items-center gap-1.5 text-gray-400 text-xs mb-2">
                <CalendarDays className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{update.date}</span>
                <span className="text-gray-300">·</span>
                <User className="w-3 h-3 shrink-0" aria-hidden="true" />
                <span>{update.postedBy}</span>
                {index === 0 && (
                  <span className="ml-auto bg-primary-600 text-white text-[10px] font-bold
                                   px-1.5 py-0.5 rounded tracking-wide">
                    LATEST
                  </span>
                )}
              </div>

              <h3 className="font-poppins font-semibold text-gray-900 text-sm mb-2">
                {update.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {update.content}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
};

export default CampaignUpdates;
