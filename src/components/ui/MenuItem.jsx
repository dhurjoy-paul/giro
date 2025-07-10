import { NavLink } from "react-router"

const MenuItem = ({ label, to = '#' }) => {
  return (
    <NavLink to={to} className={({ isActive }) => `text-lg font-semibold transition-colors duration-300 
    ${isActive
        ? 'text-brand '
        : 'text-text hover:text-brand'
      }`}>
      {label}
    </NavLink>
  )
}
export default MenuItem