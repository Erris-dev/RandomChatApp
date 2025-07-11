import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { type: "spring", stiffness: 120 } },
  exit: { y: "100vh", opacity: 0 },
};

const QueueModal = ({ open, onCancel }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl w-80 p-6 shadow-lg space-y-4 text-center"
          >
            <h2 className="text-lg font-semibold text-[#4D77AD]">
              Finding someone to connect with...
            </h2>
            <p className="text-sm text-gray-600">Please hang tight while we match you!</p>
            <div className="flex justify-center">
              <button
                onClick={onCancel}
                className="mt-3 px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QueueModal;
