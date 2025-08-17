import { useQuery } from '@tanstack/react-query';
import LoadingHash from '../../../../components/shared/LoadingHash';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useRole from '../../../../hooks/useRole';
import StatsCards from '../../admin/StatsCards';

const OverviewPage = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();

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

  if (isRoleLoading || (role === 'admin' && isStatsLoading)) {
    return <LoadingHash />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-bricolage-grotesque text-text mb-2">
          Admin Overview
        </h1>
        <p className="text-text-muted">
          Monitor key statistics and system performance
        </p>
      </div>

      {role === 'admin' && <StatsCards stats={stats} />}
    </div>
  );
};

export default OverviewPage;