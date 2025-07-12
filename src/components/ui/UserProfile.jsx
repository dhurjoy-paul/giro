import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { HiOutlineLogout } from 'react-icons/hi';
import { LuLayoutDashboard } from "react-icons/lu";
import { NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';

const UserProfile = ({ user, isAtTop }) => {
  const { logOut } = useAuth()
  const hasPhoto = !!user?.photoURL;

  // Get initials from displayName
  const initials = user?.displayName
    ? user.displayName.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  // Determine styling for avatar container
  const avatarWrapperClass = `rounded-full size-8 flex items-center justify-center font-semibold overflow-hidden ${user && !hasPhoto ? 'bg-[#0d0d0d] text-white' : ''
    } ${isAtTop ? '' : 'bg-background text-black'}`;

  return (
    <Popover className="relative z-50">
      <PopoverButton
        aria-label="User Menu"
        className={`inline-flex items-center gap-x-2 rounded-full px-[6px] py-1 font-bold focus:outline-none ${isAtTop ? 'bg-[#f2f2f2] text-[#f2f2f2]' : 'bg-text text-text'
          }`}
      >
        <span className={avatarWrapperClass}>
          {user ? (
            hasPhoto ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="w-full h-full object-cover rounded-full animate-fade-in"
              />
            ) : (
              <span className="text-sm font-semibold">{initials}</span>
            )
          ) : (
            <img
              src="/default-avatar.png"
              alt="Default Avatar"
              className="size-8 object-cover rounded-full animate-fade-in"
            />
          )}
        </span>
        <div className={`${isAtTop ? 'text-black' : 'text-bg-dark'} pr-2`}>
          <FaChevronDown />
        </div>
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute right-0 mt-3 w-fit origin-top-right rounded-xl pb-2 bg-background shadow-xl ring-1 ring-text/20 focus:outline-none">
          <div className="p-4 border-b border-dashed border-gray-100 dark:border-gray-700">
            <p className="text-lg font-bold text-text">{user?.displayName}</p>
            <p className="text-base font-medium text-text-muted">{user?.email}</p>
          </div>

          <div className="px-4 py-2">
            <NavLink
              to="/dashboard"
              className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-lg font-semibold text-text dark:bg-zinc-700 bg-bg-light hover:bg-bg-dark dark:hover:bg-zinc-800"
            >
              <LuLayoutDashboard size={22} />
              <span>Dashboard</span>
            </NavLink>
          </div>

          <div className="border-t border-dashed border-gray-200 dark:border-gray-600" />

          <div className="px-4 py-2">
            <button
              onClick={logOut}
              className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-lg font-semibold text-text dark:bg-zinc-700 bg-bg-light hover:bg-bg-dark dark:hover:bg-zinc-800"
            >
              <HiOutlineLogout size={26} />
              <span>Logout</span>
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default UserProfile;
