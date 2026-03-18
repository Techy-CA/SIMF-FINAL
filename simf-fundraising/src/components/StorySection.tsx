import { motion } from 'framer-motion';
import { fadeInLeft, fadeInRight } from '../utils/animations';

const StorySection: React.FC = () => {
  return (
    <section
      id="story"
      className="py-20 md:py-28 bg-beige-50"
      aria-label="Our story section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-card-lg">
              <img
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=80"
                alt="SIMF volunteers working with children in the community"
                className="w-full h-80 lg:h-[460px] object-cover"
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-5 -right-5 bg-primary-800 text-white
                         rounded-2xl p-5 shadow-card-lg hidden sm:block"
            >
              <p className="font-poppins font-bold text-3xl">7+</p>
              <p className="text-primary-100 text-xs mt-0.5">Years of Service</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-tag">Our Story</span>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900 mt-2 mb-5 leading-snug">
              Born From a Simple Belief — Every Child Deserves a Chance
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              SIMF was founded in 2018 by a small group of educators and social workers who witnessed
              firsthand how limited access to quality education could rob children of their futures.
              What began as weekend tutoring sessions in a single village has grown into a structured
              foundation with programs across multiple districts.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We don't just build classrooms — we build confidence. Our holistic approach combines
              academic support with skill development, mental wellness workshops, and community
              empowerment programs designed to create sustainable, long-term change.
            </p>
            <p className="text-gray-600 leading-relaxed mb-7">
              Today, SIMF stands as a registered NGO under the Societies Registration Act, working
              transparently and passionately to ensure that no child's potential is left unrealised
              due to circumstance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-white rounded-xl p-4 border border-gray-100 shadow-card">
                <p className="font-poppins font-semibold text-primary-800 text-lg">Our Mission</p>
                <p className="text-gray-500 text-sm mt-1">
                  To empower underserved communities through quality education and sustainable development.
                </p>
              </div>
              <div className="flex-1 bg-white rounded-xl p-4 border border-gray-100 shadow-card">
                <p className="font-poppins font-semibold text-primary-800 text-lg">Our Vision</p>
                <p className="text-gray-500 text-sm mt-1">
                  A society where every individual has the tools and opportunity to thrive with dignity.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
