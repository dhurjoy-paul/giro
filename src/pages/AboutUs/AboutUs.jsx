import { motion } from 'framer-motion';
import { FiGlobe, FiHeart, FiMapPin, FiStar, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router';

const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Passionate traveler with 15+ years of experience in sustainable tourism."
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Expert in creating seamless travel experiences across Bangladesh."
    },
    {
      name: "Amina Rahman",
      role: "Lead Tour Guide",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Local expert with deep knowledge of Bangladesh's hidden gems."
    },
    {
      name: "David Wilson",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Bringing Bangladesh's beauty to the world through innovative marketing."
    }
  ];

  // Values data
  const values = [
    {
      icon: <FiHeart className="text-2xl" />,
      title: "Passion for Travel",
      description: "We live and breathe travel, creating experiences that ignite wanderlust."
    },
    {
      icon: <FiMapPin className="text-2xl" />,
      title: "Local Expertise",
      description: "Our guides are locals who know Bangladesh like the back of their hand."
    },
    {
      icon: <FiUsers className="text-2xl" />,
      title: "Community Focus",
      description: "We support local communities and promote responsible tourism."
    },
    {
      icon: <FiGlobe className="text-2xl" />,
      title: "Sustainability",
      description: "Committed to preserving Bangladesh's natural beauty for future generations."
    }
  ];

  // Stats data
  const stats = [
    { value: "50K+", label: "Happy Travelers" },
    { value: "25+", label: "Destinations" },
    { value: "15+", label: "Years Experience" },
    { value: "4.8/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen">
      <div className="h-20 bg-text dark:bg-bg-dark" />
      {/* Hero Section */}
      <section className="relative  py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold font-bricolage-grotesque tracking-tight text-text mb-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <span className="block">Discover Bangladesh</span>
              <span className="block">With Us</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto"
            >
              We're not just a travel company; we're storytellers, adventure creators, and your gateway to the heart of Bangladesh.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <div className="w-12 h-1 bg-emerald-500 rounded-full mb-4"></div>
                <h2 className="text-3xl sm:text-4xl font-bold font-bricolage-grotesque text-text mb-4">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-text-muted mb-4">
                To create unforgettable travel experiences that connect people with the rich culture, stunning landscapes, and warm hospitality of Bangladesh.
              </p>
              <p className="text-lg text-text-muted">
                We believe travel should be transformative, not just transactional. Every journey we craft is designed to leave a positive impact on both travelers and local communities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <div className="w-12 h-1 bg-blue-500 rounded-full mb-4"></div>
                <h2 className="text-3xl sm:text-4xl font-bold font-bricolage-grotesque text-text mb-4">
                  Our Vision
                </h2>
              </div>
              <p className="text-lg text-text-muted mb-4">
                To be Bangladesh's most trusted and innovative travel company, setting new standards for sustainable and authentic tourism.
              </p>
              <p className="text-lg text-text-muted">
                We envision a future where tourism in Bangladesh thrives in harmony with nature and culture, creating meaningful connections that last a lifetime.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20 lg:py-24 bg-zinc-50 dark:bg-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold font-bricolage-grotesque text-text mb-4">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-emerald-500 rounded-full mx-auto"></div>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="md:w-1/3">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Our beginning"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-text mb-4 font-bricolage-grotesque">The Beginning</h3>
                  <p className="text-lg text-text-muted">
                    It all started in 2008 when our founder, Sarah Johnson, fell in love with Bangladesh during a backpacking trip. She was captivated by the warmth of the people, the diversity of landscapes, and the richness of culture that few travelers get to experience.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row-reverse gap-8 items-center"
              >
                <div className="md:w-1/3">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Growth"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-text mb-4 font-bricolage-grotesque">Growth & Evolution</h3>
                  <p className="text-lg text-text-muted">
                    What began as a small operation with just two guides has grown into a team of passionate travel experts. We've expanded our offerings, refined our processes, but never lost sight of what matters most: creating authentic, responsible travel experiences.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="md:w-1/3">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Today"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-text mb-4 font-bricolage-grotesque">Today & Tomorrow</h3>
                  <p className="text-lg text-text-muted">
                    Today, we're proud to be Bangladesh's leading travel company, known for our innovative itineraries, exceptional service, and commitment to sustainability. As we look to the future, we're excited to continue exploring new ways to showcase the beauty of Bangladesh while preserving it for generations to come.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-emerald-500 font-bricolage-grotesque mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-text-muted">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 sm:py-20 lg:py-24 bg-zinc-50 dark:bg-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-bricolage-grotesque text-text mb-4">
              Our Values
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-emerald-500">{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-text mb-2 font-bricolage-grotesque">
                  {value.title}
                </h3>
                <p className="text-text-muted">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-bricolage-grotesque text-text mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              The passionate people behind your unforgettable journeys
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-text mb-1 font-bricolage-grotesque">
                    {member.name}
                  </h3>
                  <p className="text-emerald-500 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-text-muted">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white mb-6 font-bricolage-grotesque"
            >
              Ready to Begin Your Bangladesh Adventure?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-emerald-50 mb-8"
            >
              Join thousands of travelers who have discovered the magic of Bangladesh with us. Your journey starts here.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                to="/trips"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 font-bold px-6 py-3 rounded-full hover:bg-zinc-100 transition-colors"
              >
                Explore Our Trips
                <FiStar className="text-amber-500" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;