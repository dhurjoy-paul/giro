import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaBars } from "react-icons/fa6";
import { HiOutlineLogin } from "react-icons/hi";
import useAuth from '../hooks/useAuth';
import useNavbarBehavior from '../hooks/useNavbarBehavior';
import MobileMenu from './shared/MobileMenu';
import SimpleDropdown from './shared/SimpleDropdown';
import Announcement from './ui/Announcement';
import Button from './ui/Button';
import Heading from './ui/Heading';
import MenuItem from './ui/MenuItem';
import UserProfile from './ui/UserProfile';

const menuItems = [
  { name: 'Home', to: '/' },
  { name: 'Trips', to: '/trips' },
  { name: 'Community', to: '/community' },
  { name: 'About Us', to: '/about-us' }
]

export default function Navbar() {
  const { user } = useAuth()
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
        className={`fixed w-full z-40 transition-all
    ${isAtTop ? 'bg-transparent text-white' : 'bg-menu text-text'}
  `}
        style={{
          top: showAnnouncement && isAtTop ? `${announcementHeight}px` : '0px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <nav className="w-full mx-auto px-6 md:px-8 last:px-0 py-3 lg:py-2 flex items-center justify-between">
          {/* Logo */}
          <Heading isAtTop={isAtTop} />

          {/* Centered nav menu */}
          <div className="hidden nav:flex nav:justify-between nav:items-center nav:text-xl lg:text-[22px] xl:text-2xl nav:gap-x-6 lg:gap-x-8 xl:gap-x-12">
            {menuItems.map((menuItem, i) => (
              <MenuItem key={i} label={menuItem.name} to={menuItem.to} isAtTop={isAtTop} />
            ))}
            {user && <SimpleDropdown isAtTop={isAtTop} />}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-5 sm:gap-6 md:gap-7">
            {
              user
                ? (<UserProfile isAtTop={isAtTop} />)
                : isAtTop
                  ? <>
                    <Button size='sm' label="Login" to="/auth/login" isAtTop={isAtTop} icon={<HiOutlineLogin size={22} />} control='inline-block lg:hidden' />
                    <Button size='md' label="Login" to="/auth/login" isAtTop={isAtTop} icon={<HiOutlineLogin size={22} />} control='hidden lg:inline-block' />
                  </>
                  : <>
                    <Button size='sm' label="Login" to="/auth/login" icon={<HiOutlineLogin size={22} />} control='inline-block lg:hidden' />
                    <Button size='md' label="Login" to="/auth/login" icon={<HiOutlineLogin size={22} />} control='hidden lg:inline-block' />
                  </>
            }

            {/* mobile menu button */}
            <div className="nav:hidden flex items-center group">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5  group-hover:cursor-pointer
                  ${isAtTop ? 'text-white' : 'text-text'} `}
              >
                <span className="sr-only">Open main menu</span>
                <FaBars className='size-7.5 md:size-8' />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <MobileMenu
          open={mobileMenuOpen}
          setOpen={setMobileMenuOpen}
        />
      </motion.header>
    </>
  )
}
