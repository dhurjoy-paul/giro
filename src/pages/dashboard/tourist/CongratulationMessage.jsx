// CongratulationMessage.jsx
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";

const CongratulationMessage = () => {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti width={width} height={height} numberOfPieces={300} />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div className="bg-white text-center rounded-2xl shadow-2xl p-8 max-w-md">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            🎉 Congratulations!
          </h2>
          <p className="text-gray-700 text-lg">
            You've booked more than 3 trips! We appreciate your trust in Giro.
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default CongratulationMessage;
