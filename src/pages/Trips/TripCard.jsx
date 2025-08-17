import { motion } from 'framer-motion';
import { FaLocationArrow } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from 'react-router';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-sm mx-auto rounded-3xl overflow-hidden group bg-bg-light/10 shadow-md hover:shadow-2xl transition-all duration-300">
      <div className="relative">
        <img
          src={trip.images?.[0] || "/fallback.jpg"}
          alt={trip.title}
          className="h-48 sm:h-52 md:h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">
        <div className="flex justify-between items-center font-bricolage-grotesque">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-text truncate">
            {trip.title}
          </h3>
          <p className="font-normal text-text">
            <span className='font-semibold text-brand/80 group-hover:text-brand text-base sm:text-lg md:text-xl transition-colors duration-300'> ৳{trip.price}</span>
            <span className="text-xs sm:text-sm">/person</span>
            <span className='text-[10px] sm:text-xs'>/trip</span>
          </p>
        </div>
        <div className="flex items-center justify-between gap-1 sm:gap-2 flex-wrap">
          <p className="text-sm sm:text-base text-text-muted font-medium flex items-center gap-1 truncate">
            <span className="group-hover:text-emerald-500 transition-colors duration-300">
              <FaLocationArrow size={14} className="sm:size-4" />
            </span>
            {trip.location}
          </p>
          {/* <p className="w-fit text-xs sm:text-sm font-medium font-bricolage-grotesque bg-text-muted/10 text-text-muted group-hover:bg-emerald-500/10 group-hover:text-emerald-500 px-2 sm:px-3 py-1 rounded-full transition-colors duration-300">
            {trip.tourType}
          </p> */}
        </div>
        <div className="pt-2 sm:pt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/trip/${trip._id}`)}
            className="w-full flex items-center justify-center gap-2 rounded-full shadow-md transition duration-200 bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-medium"
          >
            <TbListDetails size={18} className="sm:size-5" />
            View Details
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;