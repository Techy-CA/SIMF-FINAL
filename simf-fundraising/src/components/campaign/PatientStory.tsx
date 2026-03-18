import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, FileCheck, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import type { Campaign } from '../../data/campaignData';

interface Props { campaign: Campaign; }

const PatientStory: React.FC<Props> = ({ campaign }) => {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? campaign.story : campaign.story.slice(0, 2);

  return (
    <section
      aria-label="Patient's story"
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 md:px-6 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-start gap-4">
          <img
            src={campaign.patientImage}
            alt={`Photo of ${campaign.patientName}`}
            className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover shrink-0 bg-gray-100"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div>
            <h2 className="font-poppins font-bold text-gray-900 text-lg leading-tight">
              {campaign.patientName}'s Story
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">
              {campaign.age} years old · {campaign.condition}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-800
                              flex items-center justify-center text-[9px] font-bold shrink-0">
                {campaign.organizer.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <p className="text-xs text-gray-400">
                By <span className="font-medium text-gray-600">{campaign.organizer}</span>
                {' '}· {campaign.organizerRelation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story body */}
      <div className="px-5 md:px-6 py-5">

        {/* Opening quote */}
        <div className="flex gap-2.5 mb-5">
          <Quote className="w-6 h-6 text-primary-200 fill-primary-100 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium italic">
            {campaign.shortBio}
          </p>
        </div>

        {/* Story paragraphs */}
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {shown.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="text-gray-600 text-sm md:text-base leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        {/* Read more / less */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1.5 text-primary-800 text-sm font-semibold
                     hover:text-primary-900 transition-colors focus:outline-none"
          aria-expanded={expanded}
        >
          {expanded
            ? <><ChevronUp className="w-4 h-4" /> Show Less</>
            : <><ChevronDown className="w-4 h-4" /> Read Full Story</>
          }
        </button>
      </div>

    </section>
  );
};

export default PatientStory;
