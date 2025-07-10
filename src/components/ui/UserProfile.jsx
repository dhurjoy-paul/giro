import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { HiOutlineLogout } from 'react-icons/hi';
import { LuLayoutDashboard } from "react-icons/lu";
import { NavLink } from 'react-router';

export default function UserProfile({ user }) {
  return (
    <Popover className="relative z-50">
      <PopoverButton className="inline-flex items-center gap-x-2 rounded-full bg-text px-[6px] py-1 font-bold text-text focus:outline-none">
        <span className="rounded-full bg-background size-8 flex items-center justify-center font-semibold">
          {user?.name[0]}
        </span>
        <div className='text-bg-dark pr-2'><FaChevronDown /></div>
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
            <p className="text-lg font-bold text-text">{user?.name}</p>
            <p className="text-base font-medium text-text-muted">{user?.email}</p>
          </div>

          <div className="px-4 py-2">
            <NavLink to="/dashboard"
              className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-lg font-semibold text-text bg-bg-light hover:bg-bg-dark"
            >
              <LuLayoutDashboard size={22} />
              <span>Dashboard</span>
            </NavLink>
          </div>

          <div className="border-t border-dashed border-gray-200 dark:border-gray-600" />

          <div className="px-4 py-2">
            <button onClick={user?.logout}
              className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-lg font-semibold text-text bg-bg-light hover:bg-bg-dark"
            >
              <HiOutlineLogout size={26} />
              <span>Logout</span>
            </button>
          </div>

        </PopoverPanel>
      </Transition>
    </Popover>
  )
}