import { motion } from "framer-motion";

export default function ModelCard({ name }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/30 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
    >
      <h3 className="font-bold text-lg">{name}</h3>
      <button className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        Launch
      </button>
    </motion.div>
  );
}