import { motion } from 'framer-motion';
import { FaPenNib, FaRoute, FaSuitcase, FaUsers } from 'react-icons/fa';
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const StatCard = ({ icon: Icon, label, value, index, color }) => (
  <motion.div
    custom={index}
    initial="hidden"
    animate="visible"
    variants={cardVariants}
    className="p-6 rounded-2xl bg-white/20 dark:bg-black/20 border border-border shadow-sm flex items-center gap-4"
  >
    <div className={`text-3xl p-4 rounded-full text-text`}>
      <Icon />
    </div>
    <div>
      <h3 className="text-2xl font-semibold">{value}</h3>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  </motion.div>
);

const StatsCards = ({ stats }) => {
  const items = [
    {
      icon: FaBangladeshiTakaSign,
      label: 'Total Payment',
      value: `৳ ${stats?.totalPayment || 0}`,
      color: 'emerald',
    },
    {
      icon: FaUsers,
      label: 'Total Tour Guides',
      value: stats?.totalTourGuides || 0,
      color: 'blue',
    },
    {
      icon: FaSuitcase,
      label: 'Total Packages',
      value: stats?.totalPackages || 0,
      color: 'indigo',
    },
    {
      icon: FaRoute,
      label: 'Total Clients',
      value: stats?.totalClients || 0,
      color: 'fuchsia',
    },
    {
      icon: FaPenNib,
      label: 'Total Stories',
      value: stats?.totalStories || 0,
      color: 'rose',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
      {items.map((item, i) => (
        <StatCard key={i} {...item} index={i} />
      ))}
    </div>
  );
};

export default StatsCards;
