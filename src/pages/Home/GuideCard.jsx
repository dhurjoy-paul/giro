import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const GuideCard = ({ guide }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="relative aspect-square w-full overflow-hidden rounded-xl group shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/tour-guide/${guide.email}`)}
    >
      <img
        src={guide.image}
        alt={guide.name}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90"></div>

      <div className="absolute inset-0 flex flex-col justify-end p-3">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white truncate font-bricolage-grotesque group-hover:text-brand transition-all duration-300">
            {guide.name}
          </h3>
          <p className="text-sm text-white/80 truncate">
            {guide.email}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-all duration-300"></div>
    </motion.div>
  );
};

export default GuideCard;