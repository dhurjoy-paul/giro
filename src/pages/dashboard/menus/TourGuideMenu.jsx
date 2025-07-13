import { HiDocumentAdd, HiFolderAdd } from "react-icons/hi";
import { HiUserCircle, HiUsers } from "react-icons/hi2";
import MenuLink from "../sidebar/MenuLink";

const navigation = [
  { name: 'Profile', href: '/dashboard', icon: HiUserCircle, exact: true },
  { name: 'Assigned Tours', href: '/dashboard/assigned-tours', icon: HiUsers },
  { name: 'Add Story', href: '/dashboard/add-story', icon: HiDocumentAdd },
  { name: 'Manage Story', href: '/dashboard/manage-story', icon: HiFolderAdd },
];

const TourGuideMenu = ({ mobile = false, setSidebarOpen }) => {
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

export default TourGuideMenu;
