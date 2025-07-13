import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import MainLayout from '../layouts/MainLayout';
import AboutUs from '../pages/AboutUs/AboutUs';
import Community from '../pages/Community/Community';
import ErrorPage from '../pages/Error/ErrorPage';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import Trips from '../pages/Trips/Trips';
import AddPackages from '../pages/dashboard/admin/AddPackages';
import ManageCandidate from '../pages/dashboard/admin/ManageCandidate';
import ManageUsers from '../pages/dashboard/admin/ManageUsers';
import Statistics from '../pages/dashboard/admin/Statistics';
import AddStory from '../pages/dashboard/common/AddStory';
import ManageStory from '../pages/dashboard/common/ManageStory';
import Profile from '../pages/dashboard/common/Profile';
import AssignedTour from '../pages/dashboard/tourGuide/AssignedTour';
import ApplyGuide from '../pages/dashboard/tourist/ApplyGuide';
import MyBookings from '../pages/dashboard/tourist/MyBookings';
import AdminRoute from './AdminRoute';
import GuideRoute from './GuideRoute';
import PrivateRoute from './PrivateRoute';
import TouristRoute from './TouristRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/trips', element: <Trips /> },
      { path: '/community', element: <Community /> },
      { path: '/about-us', element: <AboutUs /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/sign-up', element: <SignUp /> },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      // Common
      { path: 'profile', element: <Profile /> },
      { path: 'add-story', element: <AddStory /> },
      { path: 'manage-story', element: <ManageStory /> },

      // Tourist
      { path: 'my-bookings', element: <TouristRoute><MyBookings /></TouristRoute> },
      { path: 'apply-guide', element: <TouristRoute><ApplyGuide /></TouristRoute> },

      // Tour Guide
      { path: 'assigned-tours', element: <GuideRoute><AssignedTour /></GuideRoute> },

      // Admin
      { path: 'add-packages', element: <AdminRoute><AddPackages /></AdminRoute> },
      { path: 'manage-users', element: <AdminRoute><ManageUsers /></AdminRoute> },
      { path: 'manage-candidates', element: <AdminRoute><ManageCandidate /></AdminRoute> },
      { path: 'statistics', element: <AdminRoute><Statistics /></AdminRoute> },
    ],
  },
]);

export default router;
