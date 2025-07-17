import { Disclosure } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { FaEnvelope, FaUserShield } from 'react-icons/fa';
import { HiChevronUp } from 'react-icons/hi2';
import { useParams } from 'react-router';
import LoadingHash from '../../components/shared/LoadingHash';
import useAxiosSecure from '../../hooks/useAxiosSecure';

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
      <div className="max-w-5xl mx-auto px-6 py-12 text-text">
        {/* Guide Info */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
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
          <h3 className="text-2xl font-semibold mb-6">Shared Travel Stories</h3>

          {stories.length > 0 ? (
            <div className="flex flex-col gap-10">
              {stories.map((story) => (
                <div
                  key={story._id?.$oid || story._id}
                  className="glass-card bg-bg-light/40 rounded-2xl overflow-hidden shadow hover:shadow-lg transition p-4 sm:p-12"
                  data-aos="fade-up"
                >
                  {/* Title + Date */}
                  <h4 className="text-xl sm:text-2xl font-semibold">{story.title}</h4>
                  <p className="text-sm text-text-muted mb-4">
                    Shared on: {new Date(story.createdAt).toLocaleDateString()}
                  </p>

                  {/* Gallery Grid */}
                  {story.images && story.images.length > 0 && (
                    <section className="mb-4">
                      <div className="grid grid-cols-8 grid-rows-2 gap-3 overflow-hidden rounded-xl">
                        {story.images.slice(0, 6).map((img, index) => {
                          const gridStyles = [
                            'col-span-3 row-span-2',
                            'col-span-3 row-span-1',
                            'col-span-3 row-span-1',
                            'col-span-2 row-span-2',
                            'col-span-2 row-span-1',
                            'col-span-2 row-span-1',
                          ];
                          return (
                            <img
                              key={index}
                              src={img || '/fallback.jpg'}
                              alt={`Story ${index}`}
                              className={`object-cover w-full h-full rounded-xl ${gridStyles[index % gridStyles.length]}`}
                            />
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* Accordion */}
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 mt-2 text-xl font-medium text-left text-emerald-600 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 transition">
                          <span>{open ? 'Hide Full Story' : 'Read Full Story'}</span>
                          <HiChevronUp
                            className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="pt-3 text-lg text-text-muted">
                          {story.content}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              ))}
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
