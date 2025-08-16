import { Dialog, DialogPanel } from "@headlessui/react";
import { useMemo, useState } from "react";
import { FaHome, FaPaperPlane, FaUsers } from "react-icons/fa";
import { FaChevronDown, FaChevronUp, FaCircleInfo, FaXmark } from "react-icons/fa6";
import { HiDocumentAdd, HiDocumentText, HiFolderAdd, HiUserCircle, HiUserGroup, HiUsers } from "react-icons/hi";
import { LuBadgePlus } from "react-icons/lu";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Heading from "../ui/Heading";

const mainMenu = [
  { name: 'Home', to: '/', icon: FaHome },
  { name: 'Trips', to: '/trips', icon: FaPaperPlane },
  { name: 'Community', to: '/community', icon: FaUsers },
  { name: 'About Us', to: '/about-us', icon: FaCircleInfo }
];

const dashboardItems = [
  { name: "Profile", to: "/dashboard", icon: HiUserCircle, always: true },
  { name: "My Bookings", to: "/dashboard/my-bookings", icon: HiDocumentText, role: "tourist" },
  { name: "Assigned Tours", to: "/dashboard/assigned-tours", icon: HiUsers, role: "tourGuide" },
  { name: "Add Story", to: "/dashboard/add-story", icon: HiDocumentAdd, role: "nonAdmin" },
  { name: "Manage Story", to: "/dashboard/manage-story", icon: HiFolderAdd, role: "nonAdmin" },
  { name: "Join as Tour-Guide", to: "/dashboard/apply-guide", icon: LuBadgePlus, role: "tourist" },
  { name: "Add Packages", to: "/dashboard/add-packages", icon: HiDocumentAdd, role: "admin" },
  { name: "Manage Users", to: "/dashboard/manage-users", icon: HiUsers, role: "admin" },
  { name: "Manage Candidates", to: "/dashboard/manage-candidates", icon: HiUserGroup, role: "admin" },
];

const filterByRole = (itemRole, userRole) => {
  if (!itemRole) return true;
  const role = (userRole || "").toLowerCase();
  if (itemRole.toLowerCase() === "nonadmin") return role !== "admin";
  return itemRole.toLowerCase() === role.toLowerCase();
};

export default function MobileMenu({ open, setOpen }) {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const filteredDashboard = useMemo(
    () => dashboardItems.filter((i) => i.always || filterByRole(i.role, role)),
    [role]
  );

  return (
    <Dialog open={open} onClose={setOpen} className="lg:hidden">
      {isRoleLoading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          Loading...
        </div>
      ) : (
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background dark:bg-menu p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-white/10">
          <div className="flex items-center justify-between px-3">
            <Heading />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-text"
            >
              <span className="sr-only">Close menu</span>
              <FaXmark aria-hidden="true" size={32} className="cursor-pointer" />
            </button>
          </div>

          <div className="flow-root mt-12">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-500/20">
              <div className="space-y-2 py-6">
                {/* main menu */}
                {mainMenu.map(({ name, to, icon: Icon }, i) => (
                  <NavLink
                    key={i}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="mx-1 flex items-center gap-5 rounded-lg px-8 py-3 text-xl font-bold text-text hover:bg-bg-dark group"
                  >
                    {Icon && (
                      <div className="group-hover:text-brand size-6" aria-hidden="true">
                        <Icon className="w-full h-full" />
                      </div>
                    )}
                    <p>{name}</p>
                  </NavLink>
                ))}

                {/* dashboard menu */}
                {
                  user
                  && <div>
                    <button
                      onClick={() => setDashboardOpen(!dashboardOpen)}
                      className="w-full mx-1 flex justify-between items-center gap-5 rounded-lg px-8 py-3 text-xl font-bold text-text hover:bg-bg-dark group"
                    >
                      <div className="flex items-center gap-5">
                        <div className="group-hover:text-brand size-6" aria-hidden="true">
                          <TbLayoutDashboardFilled className="w-full h-full" />
                        </div>
                        <span>Dashboard</span>
                      </div>
                      {dashboardOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
                    </button>

                    {dashboardOpen && (
                      <ul className="mt-3 ml-12 flex flex-col gap-1">
                        {filteredDashboard.map(({ name, to, icon: Icon }, i) => (
                          <li key={i}>
                            <Link
                              to={to}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-lg px-4 py-2 text-lg font-semibold text-text hover:bg-menu/50 dark:hover:bg-text-muted/20 group"
                            >
                              {Icon && (
                                <div className="group-hover:text-brand size-6" aria-hidden="true">
                                  <Icon className="w-full h-full" />
                                </div>
                              )}
                              <span>{name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                }
              </div>
            </div>
          </div>
        </DialogPanel>
      )}
    </Dialog>
  );
}
