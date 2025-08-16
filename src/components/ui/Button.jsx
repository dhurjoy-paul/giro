import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Button = ({
  label = 'Button',
  size = 'sm',
  to,
  icon,
  onClick,
  control = '',
  isAtTop = false,
  invert = false,
}) => {
  const baseClasses = 'flex items-center justify-center gap-2 relative z-10 rounded-full shadow-md transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 font-medium';

  // size variants
  const sizeClasses = {
    sm: 'px-5 py-1.5 text-lg',
    md: 'px-6 py-1.5 text-[22px]',
    lg: 'px-7 py-2.5 text-2xl',
  };

  // normal theme
  const normalStyle = isAtTop
    ? 'bg-white text-gray-900 hover:bg-gray-200 focus-visible:outline-white'
    : 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:outline-white';

  // inverted theme
  const invertedStyle = isAtTop
    ? 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-white'
    : 'bg-white text-gray-900 hover:bg-emerald-100/30 focus-visible:outline-gray-900 dark:bg-gray-950 dark:text-white dark:hover:bg-black/70 dark:focus-visible:outline-white';

  const combinedClass = clsx(
    baseClasses,
    sizeClasses[size],
    invert ? invertedStyle : normalStyle
  );

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className={clsx(control || "inline-block")}>
      <Link to={to} onClick={onClick} className={combinedClass}>
        {icon && <span aria-hidden="true">{icon}</span>}
        {label}
      </Link>
    </motion.div>
  );
};

export default Button;