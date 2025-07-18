import { motion } from 'framer-motion';
import { FaUserTie } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router';

const GuideCard = ({ guide }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/tour-guide/${guide.email}`)}
      className="rounded-3xl overflow-hidden bg-gradient-to-br from-white/80 to-gray-100 dark:from-bg-dark/40 dark:to-bg-dark/30 shadow-lg hover:shadow-xl transition duration-300"
    >
      {/* Top image */}
      <div className="relative">
        <img
          src={guide.image}
          alt={guide.name}
          className="h-48 sm:h-52 md:h-56 w-full rounded-3xl object-cover"
        />
      </div>

      <div className="p-4 space-y-3">
        <p className="text-sm sm:text-base text-text-muted font-medium flex items-center gap-4">
          <span className="group-hover:text-emerald-500 transition-colors duration-300">
            <FaUserTie size={24} />
          </span>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-text truncate font-bricolage-grotesque">
            {guide.name}
          </h3>
        </p>

        <p className="text-sm sm:text-base md:text-lg text-text-muted flex items-center gap-5">
          <span className="group-hover:text-emerald-500 transition-colors duration-300">
            <MdEmail size={20} />
          </span>
          <h3 className="text-text truncate">
            {guide.email}
          </h3>
        </p>
      </div>
    </motion.button>
  );
};

export default GuideCard;
