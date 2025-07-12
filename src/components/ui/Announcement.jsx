import { AnimatePresence, motion } from 'framer-motion';
import { FaXmark } from "react-icons/fa6";
import { Link } from 'react-router';

export default function Announcement({ setShowAnnouncement }) {
  const handleDismiss = () => {
    setShowAnnouncement(false);
    localStorage.setItem('announcementDismissed', 'true');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="relative isolate flex items-center gap-x-6 overflow-hidden bg-yellow-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
      >
        {/* Background gradient blur shapes */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            className="aspect-577/310 w-144.25 bg-gradient-to-r from-[#facc15] to-[#f97316] opacity-30"
            style={{
              clipPath:
                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm/6 text-gray-900">
            <strong className="font-semibold">Explore Bangladesh</strong>
            <svg
              viewBox="0 0 2 2"
              aria-hidden="true"
              className="mx-2 inline size-0.5 fill-current"
            >
              <circle r={1} cx={1} cy={1} />
            </svg>
            Discover top destinations, hidden gems, and rich culture with our Tourism Management System.
          </p>
          <Link to="/community"
            className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
          >
            Start exploring <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Dismiss Button */}
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            onClick={handleDismiss}
            className="-m-3 p-3 focus-visible:-outline-offset-4"
          >
            <span className="sr-only">Dismiss</span>
            <FaXmark aria-hidden="true" className="size-5 text-gray-900" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
