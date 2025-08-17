import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LoadingHash from '../../components/shared/LoadingHash';
import Button from '../../components/ui/Button';
import TripCard from '../../pages/Trips/TripCard';
import GuideCard from './GuideCard';

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const fetchPackages = async () => {
  const res = await axiosPublic.get('/packages/random/4');
  return res.data;
};

const fetchGuides = async () => {
  const res = await axiosPublic.get('/users/random/6');
  return res.data;
};

const TourismSection = () => {
  const {
    data: packages = [],
    isLoading: loadingPackages,
    refetch: refetchPackages,
  } = useQuery({
    queryKey: ['randomPackages'],
    queryFn: fetchPackages,
  });

  const {
    data: guides = [],
    isLoading: loadingGuides,
    refetch: refetchGuides,
  } = useQuery({
    queryKey: ['randomGuides'],
    queryFn: fetchGuides,
  });

  const handleTabSelect = (index) => {
    if (index === 0) refetchPackages();
    else if (index === 1) refetchGuides();
  };

  if (loadingPackages || loadingGuides) return <LoadingHash />;

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs onSelect={handleTabSelect}>
          <TabList className="flex border-b-2 mb-8 sm:mb-10 md:mb-12">
            <Tab
              className="py-3 px-4 sm:px-6 text-base sm:text-lg md:text-xl font-semibold text-text cursor-pointer border-b-2 border-transparent hover:border-text hover:bg-text/15 rounded-t-lg transition-all duration-200 outline-none"
              selectedClassName="border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-400/50"
            >
              Our Packages
            </Tab>
            <Tab
              className="py-3 px-4 sm:px-6 text-base sm:text-lg md:text-xl font-semibold text-text cursor-pointer border-b-2 border-transparent hover:border-text hover:bg-text/15 rounded-t-lg transition-all duration-200 outline-none"
              selectedClassName="border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-400/50"
            >
              Meet Our Tour Guides
            </Tab>
          </TabList>

          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 sm:gap-6">
              {packages.map((trip, i) => (
                <TripCard key={i} trip={trip} />
              ))}
            </div>
            <div className="mt-8 sm:mt-10 flex justify-center">
              <Button label="See More" to="/trips" />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {guides.map((guide, i) => (
                <GuideCard key={i} guide={guide} />
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default TourismSection;