import { HiDocumentAdd, HiFolderAdd } from "react-icons/hi";
import { HiDocumentText, HiUserCircle } from "react-icons/hi2";
import { LuBadgePlus } from "react-icons/lu";
import MenuLink from "../sidebar/MenuLink";

const navigation = [
  { name: 'Profile', href: '/dashboard', icon: HiUserCircle, exact: true },
  { name: 'My Bookings', href: '/dashboard/my-bookings', icon: HiDocumentText },
  { name: 'Add Story', href: '/dashboard/add-story', icon: HiDocumentAdd },
  { name: 'Manage Story', href: '/dashboard/manage-story', icon: HiFolderAdd },
  { name: 'Join as Tour-Guide', href: '/dashboard/apply-guide', icon: LuBadgePlus },
];

const TouristMenu = ({ mobile = false, setSidebarOpen }) => {
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
  )
}
export default TouristMenu