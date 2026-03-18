import { motion } from 'framer-motion';
import { MapPin, Stethoscope, ShieldCheck, ArrowLeft, AlertTriangle } from 'lucide-react';
import type { Campaign } from '../../data/campaignData';

interface Props {
  campaign: Campaign;
  onBack:   () => void;
}

const CampaignHero: React.FC<Props> = ({ campaign, onBack }) => {
  return (
    <div className="relative h-64 sm:h-80 md:h-[420px] overflow-hidden">
      <img
        src={campaign.bannerImage}
        alt={`Fundraiser for ${campaign.patientName}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Back */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center gap-1.5 text-white/90 hover:text-white
                   bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium
                   transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
        aria-label="Back to SIMF home"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden xs:inline">Back to SIMF</span>
        <span className="xs:hidden">Back</span>
      </button>

      {/* Verified badge */}
      {campaign.verified && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-primary-500/90
                        backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Verified by SIMF</span>
          <span className="sm:hidden">Verified</span>
        </div>
      )}

      {/* Patient info overlay */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8"
      >
        <span className="inline-flex items-center gap-1.5 bg-red-600 text-white
                         text-[10px] sm:text-xs font-bold px-2.5 py-1.5 rounded-md
                         mb-3 uppercase tracking-wide">
          <AlertTriangle className="w-3 h-3" />
          Urgent Medical Need
        </span>

        <h1 className="font-poppins font-extrabold text-white
                       text-xl sm:text-2xl md:text-4xl leading-tight mb-2">
          Help {campaign.patientName}, Age {campaign.age}
        </h1>

        <p className="text-white/80 text-xs sm:text-sm md:text-base mb-3 line-clamp-2 md:line-clamp-none">
          {campaign.conditionDetail}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="text-white/70 text-xs flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate max-w-[160px] sm:max-w-none">{campaign.hospital}</span>
          </span>
          <span className="text-white/70 text-xs flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {campaign.location}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default CampaignHero;
