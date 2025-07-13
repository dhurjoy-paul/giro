import { NavLink } from "react-router";

const MenuLink = ({ label, to, icon: Icon, sm = false, onClick, end = false }) => {
  return (
    <NavLink
      to={to}
      onClick={sm ? onClick : undefined}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-4 pl-4 py-3 rounded-lg text-lg transition-colors duration-300 transform
        ${isActive
          ? 'bg-bg-dark text-text'
          : 'text-text-muted hover:bg-bg-light hover:text-text'
        }`
      }
    >
      <Icon className="size-6" />
      {label}
    </NavLink>
  );
};

export default MenuLink;
