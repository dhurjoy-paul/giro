import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

export default function Button({ label = 'Button', to, icon, onClick, className = '', isAtTop = false }) {
  const baseClasses = 'flex items-center gap-2 relative z-10 rounded-full shadow-md transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 px-5 py-1.5 text-lg font-medium';
  const topStyle = 'bg-white text-gray-900 hover:bg-gray-200 focus-visible:outline-white';
  const normalStyle = 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:outline-white';

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Link
        to={to}
        onClick={onClick}
        className={clsx(baseClasses, isAtTop ? topStyle : normalStyle, className)}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {label}
      </Link>
    </motion.div>
  );
}
