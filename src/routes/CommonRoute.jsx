import { Navigate, useLocation } from 'react-router';
import LoadingHash from '../components/shared/LoadingHash';
import useRole from '../hooks/useRole';

const CommonRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (isRoleLoading) return <LoadingHash />;
  if (role === 'admin') return <Navigate to="/" replace state={{ from: location }} />;

  console.log('I was here --> in Common route');
  return children
};

export default CommonRoute;
