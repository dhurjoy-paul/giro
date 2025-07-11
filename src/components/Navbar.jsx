import { Dialog, DialogPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaBars, FaCircleInfo, FaPaperPlane, FaXmark } from "react-icons/fa6";
import { HiHome, HiOutlineLogin } from "react-icons/hi";
import { RiUserCommunityFill } from "react-icons/ri";
import { NavLink } from 'react-router';
import useNavbarBehavior from '../hooks/useNavbarBehavior';
import Announcement from './ui/Announcement';
import Button from './ui/Button';
import Heading from './ui/Heading';
import MenuItem from './ui/MenuItem';
import UserProfile from './ui/UserProfile';

const menuItems = [
  { name: 'Home', to: '/', icon: <HiHome size={27} /> },
  { name: 'Trips', to: '/trips', icon: <FaPaperPlane /> },
  { name: 'Community', to: '/community', icon: <RiUserCommunityFill size={26} /> },
  { name: 'About Us', to: '/about-us', icon: <FaCircleInfo size={24} /> }
]

export default function Navbar() {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const { isNavbarVisible, isAtTop } = useNavbarBehavior();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ref and state to track announcement height dynamically
  const announcementRef = useRef(null);
  const [announcementHeight, setAnnouncementHeight] = useState(0);

  // for announcement show or not
  useEffect(() => {
    const dismissed = localStorage.getItem('announcementDismissed');
    if (!dismissed) {
      setShowAnnouncement(true);
    }
  }, []);

  useEffect(() => {
    function updateHeight() {
      if (announcementRef.current) {
        setAnnouncementHeight(announcementRef.current.offsetHeight);
      } else {
        setAnnouncementHeight(0);
      }
    }

    updateHeight();

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [showAnnouncement]);

  // User example
  const user = {
    name: 'Dhurjoy',
    email: 'dhurjoy@paul.com',
    logout: () => alert('Logging out...')
  }
  // const user = false

  return (
    <>
      {showAnnouncement && (
        <section ref={announcementRef} className="relative z-50">
          <Announcement setShowAnnouncement={setShowAnnouncement} />
        </section>
      )}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isNavbarVisible ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`
    fixed w-full z-40
    ${isAtTop ? 'bg-transparent' : 'bg-menu'}
  `}
        style={{
          top: showAnnouncement && isAtTop ? `${announcementHeight}px` : '0px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >

        <nav className="mx-auto max-w-7xl px-6 py-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Heading />

          {/* Centered nav menu */}
          <div className="hidden md:flex absolute md:text-lg left-1/2 -translate-x-1/2 md:gap-x-6 lg:gap-x-12">
            {menuItems.map((menuItem, i) => (
              <MenuItem key={i} label={menuItem.name} to={menuItem.to} />
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {
              user
                ? (<UserProfile user={user} />)
                : (<Button label="Login" to="/login" icon={<HiOutlineLogin size={22} />} />)
            }

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text"
              >
                <span className="sr-only">Open main menu</span>
                <FaBars size={24} />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[var(--color-background)] dark:bg-[var(--color-menu)] p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-white/10">
            <div className="flex items-center justify-between">
              <Heading />
              <button type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-[var(--color-text)] dark:text-[var(--color-text)]"
              >
                <span className="sr-only">Close menu</span>
                <FaXmark aria-hidden="true" size={28} className='cursor-pointer' />
              </button>
            </div>

            <div className="flow-root mt-12">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-500/20">
                <div className="space-y-2 py-6">
                  {menuItems.map((item, i) => (
                    <NavLink key={i} to={item.to} onClick={() => setMobileMenuOpen(false)}
                      className="mx-1 flex items-center gap-5 rounded-lg px-8 py-3 text-xl font-bold text-text hover:bg-bg-light dark:text-text dark:hover:bg-bg-dark group"
                    >{item?.icon && <span className='group-hover:text-brand' aria-hidden="true">{item?.icon}</span>}
                      <span>{item?.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </motion.header>
    </>
  )
}
