import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

export default function Button({
  label = 'Button',
  to = '#',
  icon = null,
  size = 'base',
  className = '',
}) {

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    base: 'px-5 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <div className="relative inline-block">
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link to={to}
          className={clsx(
            'flex items-center gap-2 relative z-10 rounded-full shadow-md transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
            'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-900',
            'dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:outline-white',
            sizeStyles[size],
            className
          )}
        >
          {label}
          {icon && <span aria-hidden="true">{icon}</span>}
        </Link>
      </motion.div>
    </div>
  )
}
