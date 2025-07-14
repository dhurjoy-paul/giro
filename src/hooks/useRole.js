import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading, isError, error } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role/${user.email}`);
      return res.data?.role;
    }
  });

  if (isError) { console.error('Failed to fetch role:', error) }

  return [role, isRoleLoading];
};

export default useRole;
