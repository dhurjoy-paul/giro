import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { HiOutlineLogout, HiX } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router';
import LoadingHash from '../../../components/shared/LoadingHash';
import UserImage from '../../../components/shared/UserImage';
import Button from '../../../components/ui/Button';
import Heading from '../../../components/ui/Heading';
import ThemeToggle from '../../../components/ui/ThemeToggle';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import AdminMenu from '../menus/AdminMenu';
import TourGuideMenu from '../menus/TourGuideMenu';
import TouristMenu from '../menus/TouristMenu';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [role, isRoleLoading] = useRole();
  const { logOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logOut();
    navigate('/', { replace: true, state: { from: location } });
  };

  return (
    <>
      {/* ===== Mobile Sidebar ===== */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative w-70 bg-sidebar text-text p-4 flex flex-col h-full">
                {/* Heading */}
                <div className="flex justify-between items-center mb-6">
                  <Heading />
                  <button onClick={() => setSidebarOpen(false)} className='cursor-pointer'>
                    <HiX size={26} />
                  </button>
                </div>

                {/* Scrollable nav */}
                <nav className="flex-1 overflow-y-auto space-y-4 pr-1">
                  {role === 'tourist' && <TouristMenu mobile={true} setSidebarOpen={setSidebarOpen} />}
                  {role === 'tourGuide' && <TourGuideMenu mobile={true} setSidebarOpen={setSidebarOpen} />}
                  {role === 'admin' && <AdminMenu mobile={true} setSidebarOpen={setSidebarOpen} />}
                </nav>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-2.5">
                  <Link to={`/dashboard`} onClick={() => setSidebarOpen(false)}><UserImage size='lg' dashboard={true} /></Link>
                  <Button label="Logout" onClick={handleLogout} icon={<HiOutlineLogout size={24} />} />
                  <ThemeToggle />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* ===== Desktop Sidebar ===== */}
      <div className="hidden lg:flex lg:flex-shrink-0 z-20 border-r border-text-muted/20 dark:border-text-muted/40">
        <div className="relative flex flex-col w-70 h-screen bg-sidebar text-text px-4 pt-4 pb-6">
          {/* Fixed heading */}
          <div className="absolute top-8 left-8">
            <Heading />
          </div>

          {
            isRoleLoading || authLoading
              ? <LoadingHash />
              : <>
                {/* Scrollable nav section */}
                <nav className="mt-20 flex-1 overflow-y-auto space-y-4 pr-2">
                  {role === 'tourist' && <TouristMenu />}
                  {role === 'tourGuide' && <TourGuideMenu />}
                  {role === 'admin' && <AdminMenu />}
                </nav>

                {/* Fixed bottom footer */}
                <div className="absolute bottom-6 left-5 flex items-center justify-between gap-2.5">
                  <Link to={`/dashboard`}><UserImage size='lg' dashboard={true} /></Link>
                  <Button label="Logout" onClick={handleLogout} icon={<HiOutlineLogout size={24} />} />
                  <ThemeToggle />
                </div>
              </>
          }
        </div>
      </div>
    </>
  );
};

export default Sidebar;