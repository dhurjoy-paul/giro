import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { HiDocumentAdd, HiDocumentText, HiFolderAdd, HiUserCircle, HiUserGroup, HiUsers } from "react-icons/hi";
import { LuBadgePlus } from "react-icons/lu";
import { Link } from "react-router";
import useRole from "../../hooks/useRole";

const DropdownMenu = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    const handleScroll = () => setIsOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    if (!isOpen && buttonRef.current) buttonRef.current.blur();
  }, [isOpen]);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-xl font-semibold text-white hover:text-brand focus:text-brand transition-all duration-300"
      >
        {trigger} <FaChevronDown className="ml-0.5 w-4 h-4 opacity-80" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[min(88vw,20rem)] sm:w-72 z-50 rounded-xl bg-bg-dark shadow-lg px-4 py-6 animate-in fade-in-0 zoom-in-95">
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownMenuItem = ({ label, to, icon: Icon }) => (
  <Link
    to={to}
    className="flex items-center px-4 py-3 text-xl rounded-lg font-semibold text-text hover:bg-menu dark:hover:bg-text-muted/25 focus:bg-menu/70 transition-colors group"
  >
    {Icon && <Icon className="size-7 mr-4 group-hover:text-brand transition-colors" />}
    {label}
  </Link>
);

const menuItems = [
  { name: "My Bookings", href: "/dashboard/my-bookings", icon: HiDocumentText, role: "tourist" },
  { name: "Assigned Tours", href: "/dashboard/assigned-tours", icon: HiUsers, role: "tourGuide" },
  { name: "Add Story", href: "/dashboard/add-story", icon: HiDocumentAdd, role: "nonAdmin" },
  { name: "Manage Story", href: "/dashboard/manage-story", icon: HiFolderAdd, role: "nonAdmin" },
  { name: "Join as Tour-Guide", href: "/dashboard/apply-guide", icon: LuBadgePlus, role: "tourist" },
  { name: "Add Packages", href: "/dashboard/add-packages", icon: HiDocumentAdd, role: "admin" },
  { name: "Manage Users", href: "/dashboard/manage-users", icon: HiUsers, role: "admin" },
  { name: "Manage Candidates", href: "/dashboard/manage-candidates", icon: HiUserGroup, role: "admin" },
];

const filterByRole = (itemRole, userRole) => {
  if (!itemRole) return true;
  const role = (userRole || "").toLowerCase();
  if (itemRole.toLowerCase() === "nonadmin") return role !== "admin";
  return itemRole.toLowerCase() === role;
};

// ---------- SimpleDropdown ----------
export default function SimpleDropdown() {
  const [role, isRoleLoading] = useRole();
  const filtered = useMemo(() => menuItems.filter((i) => filterByRole(i.role, role)), [role]);

  if (isRoleLoading) return null;

  return (
    <DropdownMenu trigger="Dashboard">
      <DropdownMenuItem to="/dashboard" label="Profile" icon={HiUserCircle} />

      <ul className="flex flex-col gap-2.5 mt-2">
        {filtered.map((item) => (
          <li key={item.href}>
            <DropdownMenuItem to={item.href} label={item.name} icon={item.icon} />
          </li>
        ))}
      </ul>
    </DropdownMenu>
  );
}
