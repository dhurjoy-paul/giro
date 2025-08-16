import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LoadingHash from '../components/shared/LoadingHash';
import GoTopBtn from '../components/ui/GoTopBtn';
import ThemeToggle from '../components/ui/ThemeToggle';
import ThemeProvider from '../contexts/ThemeContext';
import useAuth from '../hooks/useAuth';
import ScrollToHashElement from '../utils/ScrollToHashElement';

const MainLayout = () => {
  const location = useLocation();
  const { loading } = useAuth();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 100,
      easing: 'ease-in-out',
      once: true,
    });

    const timeout = setTimeout(() => {
      Aos.refreshHard();
    }, 400);

    return () => clearTimeout(timeout);
  }, [location.pathname, location.hash]);

  if (loading) return <LoadingHash />;

  return (
    <ThemeProvider>
      <ScrollToHashElement />
      <main className="relative bg-background/90 isolate overflow-hidden">

        <div aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-emerald-100 to-amber-100 opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>

        <Navbar />
        <Outlet />

        <section className="fixed bottom-4 right-0 -translate-x-1/2 z-9999 flex flex-col items-center space-y-2">
          <GoTopBtn />
          <ThemeToggle />
        </section>

        <div aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
            // className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-emerald-100 to-amber-100 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>

        <Footer />

        <div aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
          <div className="aspect-1155/678 w-288.75 bg-gradient-to-tr from-amber-200 to-emerald-200 opacity-30"
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
        </div>

      </main>
    </ThemeProvider>
  );
};

export default MainLayout;
