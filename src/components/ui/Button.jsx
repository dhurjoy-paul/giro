import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Button = ({
  label = 'Button',
  to,
  icon,
  onClick,
  className = '',
  isAtTop = false,
  invert = false,
}) => {
  const baseClasses =
    'flex items-center justify-center gap-2 relative z-10 rounded-full shadow-md transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 px-5 py-1.5 text-lg font-medium';

  // Normal theme
  const normalStyle = isAtTop
    ? 'bg-white text-gray-900 hover:bg-gray-200 focus-visible:outline-white'
    : 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:outline-white';

  // Inverted theme
  const invertedStyle = isAtTop
    ? 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-white'
    : 'bg-white text-gray-900 hover:bg-emerald-100/30 focus-visible:outline-gray-900 dark:bg-gray-950 dark:text-white dark:hover:bg-black/70 dark:focus-visible:outline-white';

  const combinedClass = clsx(
    baseClasses, className,
    invert ? invertedStyle : normalStyle,
  );

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Link to={to} onClick={onClick} className={combinedClass}>
        {icon && <span aria-hidden="true">{icon}</span>}
        {label}
      </Link>
    </motion.div>
  );
};

export default Button;
