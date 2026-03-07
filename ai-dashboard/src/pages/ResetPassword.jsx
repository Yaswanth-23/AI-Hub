import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) return;

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setMessage("Reset link sent successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 z-10">

      {/* Ambient Glow */}
      <div
        className="absolute w-[650px] h-[650px]
        bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30
        blur-[180px] rounded-full
        opacity-70 animate-pulse -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full max-w-md space-y-10"
      >

        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Reset Password
          </h2>
          <p className="text-sm text-white/60">
            Enter your email to receive a reset link
          </p>
        </div>

        {message && (
          <div className="text-green-400 text-sm text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-8">

          {/* Email */}
          <div className="relative flex items-center gap-3 border-b border-white/30 pb-2 group">

            <Mail size={18} className="text-white/60" />

            <input
              type="email"
              required
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-white placeholder-white/50"
            />

            <span
              className="absolute left-0 bottom-0 h-[2px] w-0
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
              transition-all duration-300
              group-focus-within:w-full"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-4
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              rounded-md
              font-medium
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-300
              shadow-lg shadow-purple-500/30"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {/* Footer */}
        <div className="text-center text-sm text-white/60 pt-4">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 cursor-pointer hover:text-purple-300"
          >
            Back to Login
          </span>
        </div>

      </motion.div>
    </div>
  );
}