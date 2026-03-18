// src/components/campaign/MedicalReports.tsx
import { useState } from 'react';
import { FileText, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  images: string[];
}

const MedicalReports: React.FC<Props> = ({ images }) => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const prev = () => setLightbox(i => (i! > 0 ? i! - 1 : images.length - 1));
  const next = () => setLightbox(i => (i! < images.length - 1 ? i! + 1 : 0));

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h2 className="font-poppins font-bold text-gray-900 text-base">
            Medical Documents
          </h2>
          <p className="text-gray-400 text-xs">Verified reports and hospital records</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100
                       border border-gray-200 hover:border-primary-400
                       transition-all focus:outline-none focus:ring-2
                       focus:ring-primary-400 group"
            aria-label={`View medical report ${i + 1}`}
          >
            <img
              src={src}
              alt={`Medical report ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white
                         focus:outline-none"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 text-white/70 hover:text-white focus:outline-none"
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              src={images[lightbox]}
              alt={`Medical report ${lightbox + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 text-white/70 hover:text-white focus:outline-none"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <p className="absolute bottom-4 text-white/50 text-xs">
              {lightbox + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MedicalReports;
