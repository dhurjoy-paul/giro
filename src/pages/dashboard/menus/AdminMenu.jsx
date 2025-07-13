import { HiDocumentAdd, HiUserGroup, HiUsers } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi2";
import MenuLink from "../sidebar/MenuLink";
// import { HiChartPie } from "react-icons/hi2";

const navigation = [
  { name: 'Profile', href: '/dashboard', icon: HiUserCircle, exact: true },
  { name: 'Add Packages', href: '/dashboard/add-packages', icon: HiDocumentAdd },
  { name: 'Manage Users', href: '/dashboard/manage-users', icon: HiUsers },
  { name: 'Manage Candidates', href: '/dashboard/manage-candidates', icon: HiUserGroup },
  // { name: 'Statistics', href: '/dashboard/statistics', icon: HiChartPie },
];

const AdminMenu = ({ mobile = false, setSidebarOpen }) => {
  return (
    <>
      {navigation.map((menu, i) => (
        <MenuLink
          key={i}
          label={menu.name}
          to={menu.href}
          icon={menu.icon}
          end={menu.exact}
          sm={mobile}
          onClick={mobile ? () => setSidebarOpen(false) : undefined}
        />
      ))}
    </>
  );
};

export default AdminMenu;
