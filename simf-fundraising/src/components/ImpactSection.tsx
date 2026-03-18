import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, GraduationCap, MapPin, Handshake } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../utils/animations';

interface StatItem {
  icon:   React.ElementType;
  value:  number;
  suffix: string;
  label:  string;
  color:  string;
  bg:     string;
}

const stats: StatItem[] = [
  { icon: Users,          value: 500,  suffix: '+',  label: 'Lives Impacted',       color: 'text-primary-800', bg: 'bg-primary-50'  },
  { icon: GraduationCap,  value: 100,  suffix: '+',  label: 'Students Supported',   color: 'text-blue-700',    bg: 'bg-blue-50'     },
  { icon: MapPin,         value: 25,   suffix: '+',  label: 'Villages Reached',     color: 'text-amber-700',   bg: 'bg-amber-50'    },
  { icon: Handshake,      value: 60,   suffix: '+',  label: 'Active Volunteers',    color: 'text-rose-700',    bg: 'bg-rose-50'     },
];

const Counter: React.FC<{ end: number; suffix: string; isActive: boolean }> = ({
  end, suffix, isActive,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, isActive]);

  return (
    <span className="font-poppins font-extrabold text-4xl text-gray-900">
      {count}
      {suffix}
    </span>
  );
};

const ImpactSection: React.FC = () => {
  const ref     = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="impact" className="py-20 md:py-28 bg-white" aria-label="Impact statistics">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-tag">Our Impact</span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900 mt-2">
            Numbers That Matter
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-base leading-relaxed">
            Every rupee donated translates into real, measurable change in the communities
            we serve across Maharashtra and beyond.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-7 shadow-card hover:shadow-card-md
                           transition-shadow duration-300 border border-gray-50 text-center"
              >
                <div
                  className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center
                               justify-center mx-auto mb-5`}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <Counter end={stat.value} suffix={stat.suffix} isActive={isInView} />
                <p className="text-gray-500 text-sm mt-2 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
