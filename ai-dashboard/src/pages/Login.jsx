import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 z-10">

      {/* Ambient Glow */}
      <div className="absolute w-[650px] h-[650px]
        bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-indigo-500/30
        blur-[180px] rounded-full
        opacity-70 animate-pulse z-0" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-md space-y-10"
      >

        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-white/60">
            Sign in to continue to your dashboard
          </p>
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Email */}
          <div className="relative flex items-center gap-3 border-b border-white/30 pb-2 group">

            <Mail size={18} className="text-white/60" />

            <input
              type="email"
              required
              placeholder="Email ID"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full bg-transparent outline-none text-white placeholder:text-white/50"
            />

            <span className="absolute left-0 bottom-0 h-[2px] w-0
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
              transition-all duration-300
              group-focus-within:w-full"
            />

          </div>

          {/* Password */}
          <div className="relative flex items-center gap-3 border-b border-white/30 pb-2 group">

            <Lock size={18} className="text-white/60" />

            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full bg-transparent outline-none text-white placeholder:text-white/50"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-white/60 hover:text-purple-400 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            <span className="absolute left-0 bottom-0 h-[2px] w-0
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
              transition-all duration-300
              group-focus-within:w-full"
            />

          </div>

          {/* Forgot Password */}
          <div className="flex justify-end text-sm">
            <button
              type="button"
              onClick={() => navigate("/reset-password")}
              className="text-purple-400 hover:text-purple-300 transition"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-4
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
              rounded-md font-medium
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-300
              shadow-lg shadow-purple-500/30"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* Footer */}
        <div className="text-center text-sm text-white/60 pt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-400 cursor-pointer hover:text-purple-300"
          >
            Create one
          </span>
        </div>

      </motion.div>
    </div>
  );
}