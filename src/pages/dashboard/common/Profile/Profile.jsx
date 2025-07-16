import { useQuery } from '@tanstack/react-query';
import LoadingHash from '../../../../components/shared/LoadingHash';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useRole from '../../../../hooks/useRole';
import StatsCards from '../../admin/StatsCards';
import ProfileInfo from './ProfileInfo';
import WelcomeBanner from './WelcomeBanner';

const Profile = () => {
  const { user } = useAuth()
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/stats`
      );
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  if (isLoading || isRoleLoading) return <LoadingHash />

  return (
    <div className="w-full mx-auto px-4 sm:px-8 py-10 text-text">
      <WelcomeBanner />
      {
        role === 'admin' &&
        <StatsCards stats={stats} />
      }
      <ProfileInfo />

    </div>
  );
};

export default Profile;
