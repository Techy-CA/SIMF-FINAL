import { motion } from 'framer-motion';
import { ArrowDown, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToDonate = () => {
    document.querySelector('#donate')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToStory = () => {
    document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80"
          alt="Children smiling in a community program"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border
                     border-white/20 text-white text-xs font-medium px-4 py-1.5
                     rounded-full mb-6"
        >
          <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />
          Empowering Communities Since 2018
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-poppins font-extrabold text-white text-4xl sm:text-5xl
                     md:text-6xl leading-tight mb-6"
        >
          Make a Difference
          <span className="block text-primary-300">Today</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="text-white/85 text-base sm:text-lg md:text-xl leading-relaxed
                     max-w-2xl mx-auto mb-10 font-inter"
        >
          Sugandhi Innovation &amp; Multipurpose Foundation works to uplift underserved
          communities through education, skill development, and sustainable innovation —
          one life at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToDonate}
            className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto"
            aria-label="Donate to SIMF now"
          >
            Donate Now
          </button>
          <button
            onClick={scrollToStory}
            className="btn-outline text-base px-8 py-3.5 w-full sm:w-auto
                       border-white text-white hover:bg-white/10"
            aria-label="Learn more about SIMF"
          >
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-hidden="true"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};

export default Hero;
