import AOS from 'aos';
import 'aos/dist/aos.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import LoadingHash from '../../../../components/shared/LoadingHash';
import useAuth from '../../../../hooks/useAuth';
import useRole from '../../../../hooks/useRole';

const WelcomeBanner = () => {
  const { user, loading: authLoading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const name = user?.displayName || 'Guest';
  const messages = {
    tourist: [
      `✈️ ${name}, ready for your next adventure? Discover breathtaking destinations across Bangladesh.`,
      `🌄 Hello ${name}! From the hills of Bandarban to the shores of Cox’s Bazar, the journey awaits.`,
      `🗺️ Plan your trip easily, save your favorites, and connect with trusted tour guides.`,
      `🎒 Whether solo or with friends, your next unforgettable trip starts right here, ${name}.`,
    ],
    tourGuide: [
      `🧭 ${name}, check your upcoming tours and help travelers explore Bangladesh like never before.`,
      `🏞️ Share local insights and ensure tourists have safe and memorable experiences.`,
      `🤝 Manage your guide profile and connect with tourists directly from your dashboard.`,
    ],
    admin: [
      `🛡️ Hello Admin ${name}, manage user roles, package approvals, and system activities.`,
      `📊 View booking analytics, track platform usage, and maintain service quality.`,
      `⚙️ Stay updated with pending approvals and reported issues — your dashboard shows all.`,
    ]
  };
  const fallback = `👋 Welcome, ${name}! Explore, guide, or manage your profile.`;
  const roleMessages = messages[role] || [fallback];

  useEffect(() => {
    if (!role) return;

    const id = setInterval(
      () => setCurrentIndex(i => (i + 1) % roleMessages.length),
      3_500,
    );
    return () => clearInterval(id);
  }, [role, roleMessages.length]);

  if (authLoading || isRoleLoading || !user) return <LoadingHash />;
  if (!visible) return null;

  return (
    <div
      data-aos="fade-up"
      className="relative isolate flex items-center gap-x-6 overflow-hidden rounded-2xl bg-bg-light dark:bg-bg-dark px-6 py-2 sm:px-8 shadow-sm border border-border font-bricolage-grotesque"
    >
      {/* Gradient Blob */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[-7rem] -z-10 -translate-y-1/2 transform-gpu blur-2xl opacity-30"
      >
        <div
          className="w-80 aspect-[577/310] bg-gradient-to-r from-emerald-300 to-emerald-500 dark:from-emerald-600 dark:to-emerald-400 rounded-full"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>

      {/* Message Content */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 min-h-[50px]">
        <p className="text-sm text-text w-full">
          <strong className="font-semibold">Welcome, {name}!</strong>
          <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg>

          {/* Animated message */}
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="inline-block"
            >
              {roleMessages[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </p>
      </div>

      {/* Dismiss Button */}
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="p-2 text-text hover:text-text-muted transition"
        >
          <span className="sr-only">Dismiss</span>
          <HiXMark className="size-7" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;
