import { Navigate, useLocation } from 'react-router';
import LoadingHash from '../components/shared/LoadingHash';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (loading) {
    console.log('[PrivateRoute] 🔄 Auth loading...');
    return <LoadingHash />;
  }

  if (!user || !token) {
    console.warn('[PrivateRoute] 🚫 Access denied — not authenticated');
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  console.log('[PrivateRoute] ✅ Access granted — user authenticated');
  return children;
};

export default PrivateRoute;
