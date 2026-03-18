import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-primary-800 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <p className="font-poppins font-bold text-white text-sm leading-none">SIMF</p>
                <p className="text-gray-400 text-xs mt-0.5">Sugandhi Innovation & Multipurpose Foundation</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              A registered NGO committed to empowering underserved communities through education,
              skill development, and sustainable innovation across Maharashtra.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook,  label: 'Facebook',  href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Twitter,   label: 'Twitter',   href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`SIMF on ${label}`}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center
                             text-gray-400 hover:text-white hover:bg-primary-800
                             transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-poppins font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home',         href: '#home'   },
                { label: 'About SIMF',   href: '#story'  },
                { label: 'Our Impact',   href: '#impact' },
                { label: 'Donate Now',   href: '#donate' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-gray-400 hover:text-primary-300 text-sm
                               transition-colors duration-200 focus:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-300 text-sm
                             transition-colors duration-200 inline-flex items-center gap-1"
                  aria-label="View annual report (opens in new tab)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Annual Report
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-poppins font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  SIMF Office, Sector 12,<br />
                  Nagpur, Maharashtra 440001
                </span>
              </li>
              <li>
                <a
                  href="mailto:contact@simf.org.in"
                  className="flex items-center gap-2.5 text-gray-400 hover:text-primary-300
                             text-sm transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 text-primary-400 shrink-0" aria-hidden="true" />
                  contact@simf.org.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+917890123456"
                  className="flex items-center gap-2.5 text-gray-400 hover:text-primary-300
                             text-sm transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 text-primary-400 shrink-0" aria-hidden="true" />
                  +91 78901 23456
                </a>
              </li>
            </ul>

            <div className="mt-5 p-3 bg-gray-800 rounded-xl">
              <p className="text-gray-400 text-xs leading-relaxed">
                🏛️ Reg. No. MAH/12345/2018<br />
                📜 80G Certified · FCRA Registered
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row
                        items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Sugandhi Innovation &amp; Multipurpose Foundation. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
