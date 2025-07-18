import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
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
  const res = await axiosPublic.get('/packages/random/3');
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
    <div className="max-w-7xl mx-auto px-4 pb-3 sm:pb-6 lg:pb-10 pt-8 sm:pt-12 lg:pt-16">
      <Tabs onSelect={handleTabSelect}>
        <TabList className="flex gap-6 border-b-2 mb-6">
          <Tab className="py-2 px-4 text-lg sm:text-xl md:text-2xl font-semibold text-text cursor-pointer border-b-2 border-transparent hover:border-text hover:bg-text/10 focus:outline-none hover:rounded-tl-2xl hover:rounded-tr-lg">
            Our Packages
          </Tab>
          <Tab className="py-2 px-4 text-lg sm:text-xl md:text-2xl font-semibold text-text cursor-pointer border-b-2 border-transparent hover:border-text hover:bg-text/10 focus:outline-none hover:rounded-tl-2xl hover:rounded-tr-lg">
            Meet Our Tour Guides
          </Tab>
        </TabList>

        {/* Packages */}
        <TabPanel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((trip, i) => (
              <TripCard key={i} trip={trip} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button label="See More" to="/trips" />
          </div>
        </TabPanel>

        {/* Guides */}
        <TabPanel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, i) => (
              <GuideCard key={i} guide={guide} />
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TourismSection;
