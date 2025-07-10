import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const GoTopBtn = () => {
  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowGoTop(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {showGoTop && (
          <motion.button
            key="goTopBtn"
            onClick={scrollToTop}
            title="Go to top"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="p-3 rounded-full bg-indigo-500 text-white shadow-lg hover:bg-indigo-600"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
export default GoTopBtn