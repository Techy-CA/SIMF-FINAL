import { useEffect }    from 'react';
import { motion }       from 'framer-motion';
import {
  Share2, Clock, AlertTriangle, Lock,
  Facebook, Twitter, Link2,
} from 'lucide-react';
import DonationPanel   from '../components/campaign/DonationPanel';
import PatientStory    from '../components/campaign/PatientStory';
import DonorsList      from '../components/campaign/DonorsList';
import CampaignUpdates from '../components/campaign/CampaignUpdates';
import { campaignData } from '../data/campaignData';
import MedicalReports from '../components/campaign/MedicalReports';
// import CampaignFooter from '../components/campaign/CampaignFooter';

const CampaignPage: React.FC = () => {
  const c   = campaignData;
  const pct = Math.min(Math.round((c.raisedAmount / c.goalAmount) * 100), 100);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `Help ${c.patientName} — SIMF`;
  }, [c.patientName]);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Help ${c.patientName}`,
        text:  c.shortBio,
        url:   window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Campaign link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0]">

      {/* Sticky top bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <span className="font-poppins font-extrabold text-primary-600 text-lg tracking-tight">
            SIMF
          </span>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600
                         border border-gray-200 rounded-lg px-3 py-1.5
                         hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-7">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5" aria-label="Breadcrumb">
          <span className="text-gray-500 font-medium">SIMF</span>
          <span>/</span>
          <span>Medical Campaigns</span>
          <span>/</span>
          <span className="text-gray-700 font-medium">Help {c.patientName}</span>
        </nav>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">

          {/* Left: 3/5 */}
          <div className="lg:col-span-3 space-y-5">

            {/* Campaign banner image */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl overflow-hidden bg-gray-100"
            >
              <img
                src={c.bannerImage}
                alt={`Fundraiser banner for ${c.patientName}`}
                className="w-full aspect-video object-cover block"
                loading="eager"
              />
            </motion.div>

            {/* Campaign title card */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.07 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6"
            >
              {/* Urgent badge */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="flex items-center gap-1.5 bg-red-600 text-white
                                 text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3" />
                  Urgent Medical Need
                </span>
              </div>

              {/* Title */}
              <h1 className="font-poppins font-extrabold text-gray-900 text-2xl md:text-3xl
                             leading-snug mb-2">
                Help {c.patientName}, {c.age} Yrs — {c.condition}
              </h1>
              <p className="text-gray-500 text-sm md:text-base mb-5 leading-relaxed">
                {c.conditionDetail}
              </p>

              {/* Hospital & Location */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                  <span className="text-gray-500">Hospital:</span>
                  <span className="font-semibold text-gray-800">{c.hospital}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                  <span className="text-gray-500">Location:</span>
                  <span className="font-semibold text-gray-800">{c.location}</span>
                </div>
              </div>

              {/* Urgency banner */}
              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-3.5">
                <p className="text-red-700 text-sm font-medium leading-relaxed flex items-start gap-2">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                  {c.urgencyNote}
                </p>
              </div>
            </motion.div>

            {/* Organizer — mobile only */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:hidden bg-white rounded-2xl border border-gray-100 p-4
                         flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700
                              font-bold text-sm flex items-center justify-center shrink-0">
                {c.organizer.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400">Campaign by</p>
                <p className="font-semibold text-gray-900 text-sm">{c.organizer}</p>
                <p className="text-gray-400 text-xs">{c.organizerRelation} · {c.location}</p>
              </div>
            </motion.div>

            {/* Mobile donation panel */}
            <div id="donate-panel" className="lg:hidden">
              <DonationPanel campaign={c} />
            </div>

            {/* Story, Updates, Donors */}
            <PatientStory campaign={c} />
            <MedicalReports images={c.reportImages} />
            <CampaignUpdates updates={c.updates} patientName={c.patientName} />
            <DonorsList
              donors={c.recentDonors}
              totalCount={c.donorCount}
              patientName={c.patientName}
            />
          </div>

          {/* Right: 2/5 sticky */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-20 space-y-4">

              {/* Donation panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
              >
                <DonationPanel campaign={c} />
              </motion.div>

              {/* Organizer */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Campaign Organizer
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700
                                  font-bold text-sm flex items-center justify-center shrink-0">
                    {c.organizer.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{c.organizer}</p>
                    <p className="text-gray-400 text-xs">{c.organizerRelation}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Managing this campaign with SIMF for full transparency. All funds go directly
                  to {c.hospital}.
                </p>
              </div>

              {/* Share */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="font-poppins font-semibold text-gray-900 text-sm mb-1">
                  Share this campaign
                </p>
                <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                  Every share reaches potential donors who can help {c.patientName.split(' ')[0]}.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { icon: Facebook, label: 'Facebook', cls: 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200' },
                    { icon: Twitter,  label: 'Twitter',  cls: 'hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200'   },
                    { icon: Link2,    label: 'Copy Link', cls: 'hover:bg-gray-100 hover:text-gray-800'                     },
                  ].map(({ icon: Icon, label, cls }) => (
                    <button
                      key={label}
                      onClick={handleShare}
                      aria-label={`Share via ${label}`}
                      className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border
                                  border-gray-100 text-gray-400 text-[11px] font-medium
                                  transition-all focus:outline-none ${cls}`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 border border-gray-200
                             rounded-xl py-2.5 text-xs font-semibold text-gray-600
                             hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Copy Campaign Link
                </button>
              </div>

              {/* Safe giving */}
              <div className="bg-primary-50 rounded-2xl border border-primary-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-3.5 h-3.5 text-primary-700 shrink-0" />
                  <p className="text-xs text-primary-900 font-semibold">Safe &amp; Transparent Giving</p>
                </div>
                <ul className="text-xs text-primary-800 space-y-1.5 leading-relaxed">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary-500 shrink-0" />
                    Payments secured by Razorpay
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary-500 shrink-0" />
                    Funds go directly to the hospital
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary-500 shrink-0" />
                    SIMF charges zero platform fee
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* <CampaignFooter /> */}

      {/* Mobile sticky donate footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t
                      border-gray-200 px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <p className="font-poppins font-bold text-gray-900 text-base">
            ₹{c.raisedAmount.toLocaleString('en-IN')}
          </p>
          <p className="text-gray-400 text-xs">
            {pct}% of ₹{(c.goalAmount / 100000).toFixed(1)}L raised
          </p>
        </div>
        <button
          onClick={() =>
            document.querySelector('#donate-panel')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="btn-primary text-sm px-6 py-3 flex-1 max-w-[180px]"
        >
          Donate Now
        </button>
      </div>

      {/* Spacer for mobile sticky footer */}
      <div className="lg:hidden h-20" />
    </div>
  );
};

export default CampaignPage;
