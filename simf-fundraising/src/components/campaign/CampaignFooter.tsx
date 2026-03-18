// src/components/campaign/CampaignFooter.tsx

const CampaignFooter: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 mt-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <p className="text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} Sugandhi Innovation &amp; Multipurpose Foundation.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default CampaignFooter;
