import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import CongratulationMessage from '../../tourist/CongratulationMessage';
import LoadingHash from '../../../../components/shared/LoadingHash';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useRole from '../../../../hooks/useRole';
import StatsCards from '../../admin/StatsCards';
import ProfileInfo from './ProfileInfo';
import WelcomeBanner from './WelcomeBanner';

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();
  const [showCongrats, setShowCongrats] = useState(false);

  const {
    data: stats,
    isLoading: isStatsLoading,
  } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    },
    enabled: role === 'admin',
    keepPreviousData: true,
  });

  // 👇 Booking count query
  const { data: bookings = [], isLoading: isBookingLoading } = useQuery({
    queryKey: ['user-bookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (bookings.length > 3 && !localStorage.getItem('seenCongrats')) {
      setShowCongrats(true);
      localStorage.setItem('seenCongrats', 'true');
    }
  }, [bookings]);

  if (isRoleLoading || (role === 'admin' && isStatsLoading) || isBookingLoading)
    return <LoadingHash />;

  return (
    <div className="w-full mx-auto px-4 sm:px-8 py-10 text-text">
      {showCongrats && <CongratulationMessage />}
      <WelcomeBanner />
      {role === 'admin' && <StatsCards stats={stats} />}
      <ProfileInfo />
    </div>
  );
};

export default Profile;
