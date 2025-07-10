// Navbar.jsx
import { Dialog, DialogPanel } from '@headlessui/react';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { FaBars, FaPaperPlane, FaXmark } from "react-icons/fa6";
import { HiHome, HiOutlineLogin } from "react-icons/hi";
import { RiUserCommunityFill } from "react-icons/ri";
import { NavLink } from 'react-router';
import Button from './ui/Button';
import Heading from './ui/Heading';
import MenuItem from './ui/MenuItem';
import UserProfile from './ui/UserProfile';

const menuItems = [
  { name: 'Home', to: '/', icon: <HiHome size={26} /> },
  { name: 'Trips', to: '/trips', icon: <FaPaperPlane /> },
  { name: 'Community', to: '/community', icon: <RiUserCommunityFill size={26} /> },
  { name: 'About Us', to: '/about-us', icon: <FaInfoCircle size={24} /> }
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const user = {
    name: 'Dhurjoy',
    email: 'dhurjoy@paul.com',
    logout: () => alert('Logging out...')
  }
  // const user = false

  return (
    <header className="bg-transparent">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        {/* Logo */}
        <Heading />

        {/* Centered nav menu */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 md:gap-x-6 lg:gap-x-12">
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
            <button
              type="button"
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
                  <NavLink key={i} to={item.to}
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
    </header>
  )
}
