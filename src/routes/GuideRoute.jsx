import { Navigate, useLocation } from 'react-router';
import LoadingHash from '../components/shared/LoadingHash';
import useRole from '../hooks/useRole';

const GuideRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (isRoleLoading) return <LoadingHash />;
  if (role === 'tourGuide') return children;
  console.log('I was here --> in TourGuide route');

  return <Navigate to="/" replace state={{ from: location }} />;
};

export default GuideRoute;
