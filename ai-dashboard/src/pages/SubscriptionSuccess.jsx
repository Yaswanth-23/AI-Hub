import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SubscriptionSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/"), 3000);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center text-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-gray-900 p-10 rounded-xl text-center"
      >
        <h1 className="text-3xl font-bold text-green-400">
          🎉 Subscription Activated!
        </h1>
        <p className="mt-4">Redirecting to dashboard...</p>
      </motion.div>
    </div>
  );
}