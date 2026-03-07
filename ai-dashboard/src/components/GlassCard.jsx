import { motion } from "framer-motion";

export default function GlassCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="
        relative
        bg-white/30
        backdrop-blur-xl
        rounded-2xl
        p-6
        shadow-2xl
        overflow-hidden
      "
    >
      {/* Glow Border */}
      <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 p-[1px]">
        <div className="h-full w-full rounded-2xl bg-white/30 backdrop-blur-xl" />
      </div>

      <div className="relative">
        <div className="text-sm text-gray-600 mb-2">{title}</div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </div>
    </motion.div>
  );
}