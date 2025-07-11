import { createBrowserRouter } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import AboutUs from '../pages/AboutUs/AboutUs'
import Community from '../pages/Community/Community'
import ErrorPage from '../pages/Error/ErrorPage'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import Trips from '../pages/Trips/trips'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/trips',
        element: <Trips />
      },
      {
        path: '/community',
        element: <Community />
      },
      {
        path: '/about-us',
        element: <AboutUs />
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
