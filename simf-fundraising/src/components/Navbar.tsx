import { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home',   href: '#home'   },
  { label: 'About',  href: '#story'  },
  { label: 'Impact', href: '#impact' },
  { label: 'Donate', href: '#donate' },
];

const Navbar: React.FC = () => {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-card-md' : 'border-b border-gray-100'
      }`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => scrollTo('#home')}
            className="flex items-center gap-2.5 focus:outline-none group"
            aria-label="Go to homepage"
          >
            <div className="w-9 h-9 bg-primary-800 rounded-lg flex items-center justify-center
                            group-hover:bg-primary-900 transition-colors duration-200">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="flex flex-col leading-tight text-left">
              <span className="font-poppins font-bold text-primary-800 text-sm leading-none">
                SIMF
              </span>
              <span className="text-gray-500 text-[11px] leading-none hidden sm:block mt-0.5">
                Sugandhi Foundation
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-gray-600 hover:text-primary-800 font-medium text-sm
                           transition-colors duration-200 focus:outline-none"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollTo('#donate')}
              className="btn-primary text-sm"
              aria-label="Donate to SIMF"
            >
              Donate Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-primary-800
                       transition-colors rounded-lg hover:bg-gray-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav
              className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-3 py-2.5 text-gray-700 hover:text-primary-800
                             hover:bg-primary-50 rounded-lg font-medium text-sm transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#donate')}
                className="mt-2 btn-primary text-sm text-center"
              >
                Donate Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
