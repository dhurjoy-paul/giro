import { useQuery } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { FaEnvelope, FaUserShield } from 'react-icons/fa';
import { useParams } from 'react-router';
import LoadingHash from '../../components/shared/LoadingHash';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import StoryCard from '../Home/StoryCard';

const GuideDetails = () => {
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Fetch guide info
  const { data: guide, isLoading: isGuideLoading } = useQuery({
    queryKey: ['guide-info', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/guides/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // Fetch stories by this guide
  const { data: stories = [], isLoading: isStoriesLoading } = useQuery({
    queryKey: ['guide-stories', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/public-stories/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  if (isGuideLoading || isStoriesLoading) return <LoadingHash />;

  return (
    <>
      <div className="h-20 bg-text dark:bg-bg-dark" />
      <div className="max-w-7xl mx-auto px-6 py-12 text-text">
        {/* Guide Info */}
        <div className="glass-card w-fit mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <img
            src={guide?.image || '/fallback.jpg'}
            alt={guide?.name}
            className="w-40 h-40 rounded-full object-cover shadow-md"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold">{guide?.name}</h2>
            <p className="flex items-center gap-2 text-text-muted justify-center md:justify-start mt-2">
              <FaEnvelope /> {guide?.email}
            </p>
            <div className="mt-3 inline-block px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full font-medium text-sm">
              <FaUserShield className="inline-block mr-1" /> Verified Tour Guide
            </div>
          </div>
        </div>

        {/* Stories Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Shared Travel Stories ({stories?.length})</h3>

          {stories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {
                stories.map((story) => <StoryCard key={story._id} story={story} />)
              }
            </div>
          ) : (
            <p className="text-text-muted mt-4">No stories shared yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GuideDetails;
