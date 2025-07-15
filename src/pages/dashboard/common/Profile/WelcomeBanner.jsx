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
      className="relative max-w-5xl mx-auto isolate flex items-center justify-center gap-x-6 overflow-hidden rounded-2xl bg-bg-light dark:bg-bg-dark px-6 py-2 sm:px-8 shadow-sm border border-border font-bricolage-grotesque"
    >
      {/* Gradient Blob */}
      <div aria-hidden="true"
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
      <div className="flex items-center justify-between w-5xl min-h-[50px]">

        <div className="flex-1 text-center px-4">
          <p className="text-sm text-text inline-block">
            <strong className="font-semibold">Welcome, {name}!</strong>
            <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
              <circle r={1} cx={1} cy={1} />
            </svg>

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


        <div className="shrink-0 pl-4">
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

      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div className="aspect-1155/678 w-288.75 bg-gradient-to-tr from-amber-200 to-emerald-200 opacity-30"
          style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
      </div>

    </div>
  );
};

export default WelcomeBanner;
