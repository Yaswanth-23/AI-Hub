import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function LoggedOut() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If somehow user is still logged in, send to dashboard
    if (user) {
      navigate("/dashboard", { replace: true });
      return;
    }

    // Redirect to login after 2 seconds
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 p-10 rounded-2xl shadow-xl text-center w-96"
      >
        <div className="text-5xl mb-4">👋</div>

        <h1 className="text-2xl font-bold mb-2">
          You’ve been logged out
        </h1>

        <p className="text-gray-400">
          Redirecting to login...
        </p>
      </motion.div>
    </div>
  );
}