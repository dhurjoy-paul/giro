import { NavLink } from "react-router"

const MenuItem = ({ label, to = '#', isAtTop = false }) => {
  return (
    <>
      {
        isAtTop
          ? <NavLink to={to} className={({ isActive }) => `font-semibold transition-colors duration-300 
    ${isActive ? 'text-brand' : 'text-white hover:text-brand'}`}>
            {label}
          </NavLink>
          : <NavLink to={to} className={({ isActive }) => `font-semibold transition-colors duration-300 
    ${isActive ? 'text-brand' : 'text-text hover:text-brand'}`}>
            {label}
          </NavLink>
      }
    </>
  )
}
export default MenuItem