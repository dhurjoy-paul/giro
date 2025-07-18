import { motion } from 'framer-motion';
import { FaLocationArrow } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from 'react-router';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl overflow-hidden transition duration-300 group bg-bg-light/10 shadow-lg hover:shadow-xl">
      <div className="relative">
        <img
          src={trip.images?.[0] || "/fallback.jpg"}
          alt={trip.title}
          className="h-48 sm:h-52 md:h-56 w-full rounded-3xl object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center font-bricolage-grotesque">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-text truncate">
            {trip.title}
          </h3>
          <p className="font-normal text-text">
            <span className='font-semibold text-brand/80 group-hover:text-brand text-base sm:text-lg md:text-xl transition-colors duration-300'> ৳{trip.price}</span>
            <span className="text-sm">/person</span>
            <span className='text-xs'>/trip</span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <p className="text-sm sm:text-base text-text-muted font-medium flex items-center gap-1 truncate">
            <span className="group-hover:text-emerald-500 transition-colors duration-300">
              <FaLocationArrow size={16} />
            </span>
            {trip.location}
          </p>

          <p className="w-fit text-xs sm:text-sm font-medium font-bricolage-grotesque bg-text-muted/10 text-text-muted group-hover:bg-emerald-500/10 group-hover:text-emerald-500 px-3 py-1 rounded-full transition-colors duration-300">
            {trip.tourType}
          </p>
        </div>

        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/trip/${trip._id}`)}
            className="w-full flex items-center justify-center gap-2 rounded-full shadow-md transition duration-200 bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 px-5 py-2 text-sm sm:text-base font-medium"
          >
            <TbListDetails size={20} />
            View Details
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
