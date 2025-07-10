import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-gray-50 dark:bg-gray-700 shadow-lg hover:scale-110 transition-transform"
      title="Toggle theme"
    >
      {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
    </button>
  );
};

export default ThemeToggle;
