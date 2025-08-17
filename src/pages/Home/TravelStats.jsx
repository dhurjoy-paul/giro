// TravelStats.jsx
import { motion } from "framer-motion";
import { FiAward, FiMap, FiStar, FiUsers } from "react-icons/fi";

const stats = [
  {
    id: 1,
    icon: <FiUsers className="text-3xl" />,
    value: "50K+",
    label: "Happy Travelers",
    description: "People who explored Bangladesh with us",
    color: "text-emerald-500",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/20"
  },
  {
    id: 2,
    icon: <FiMap className="text-3xl" />,
    value: "25+",
    label: "Destinations",
    description: "Beautiful places to discover",
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/20"
  },
  {
    id: 3,
    icon: <FiStar className="text-3xl" />,
    value: "4.8/5",
    label: "Average Rating",
    description: "From thousands of reviews",
    color: "text-amber-500",
    bgColor: "bg-amber-100 dark:bg-amber-900/20"
  },
  {
    id: 4,
    icon: <FiAward className="text-3xl" />,
    value: "15+",
    label: "Years Experience",
    description: "Creating memorable journeys",
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/20"
  }
];

const TravelStats = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-bricolage-grotesque">
            Bangladesh By The Numbers
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Discover the impact we've made in promoting tourism across the country
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-800 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.bgColor} mb-4 mx-auto`}>
                <span className={stat.color}>{stat.icon}</span>
              </div>

              <div className="mb-2">
                <span className="text-3xl sm:text-4xl font-bold text-text font-bricolage-grotesque">
                  {stat.value}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-text mb-1 font-bricolage-grotesque">
                {stat.label}
              </h3>

              <p className="text-sm text-text-muted">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-white dark:bg-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 font-bricolage-grotesque">
                Why Travel With Us?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-text-muted">Expert local guides with deep knowledge</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-text-muted">Carefully crafted itineraries</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-text-muted">24/7 customer support</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-text-muted">Sustainable and responsible tourism</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-2xl font-bold mb-4 font-bricolage-grotesque">
                Ready for Your Adventure?
              </h3>
              <p className="mb-6 text-emerald-50">
                Join thousands of satisfied travelers who have discovered the magic of Bangladesh with us.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <FiStar className="text-emerald-200" />
                  </div>
                  <div>
                    <p className="font-medium">Expert Guidance</p>
                    <p className="text-sm text-emerald-100">Local insights and tips</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <FiMap className="text-emerald-200" />
                  </div>
                  <div>
                    <p className="font-medium">Hidden Gems</p>
                    <p className="text-sm text-emerald-100">Off-the-beaten-path experiences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelStats;