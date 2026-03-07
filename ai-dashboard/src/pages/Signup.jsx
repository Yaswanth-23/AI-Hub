import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Sparkles, Mail, User, Lock } from "lucide-react";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);
      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative text-white">

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm space-y-8 px-6"
      >

        {/* Title */}
        <h2 className="text-3xl font-semibold text-center flex items-center justify-center gap-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          <Sparkles size={26} />
          Create Account
        </h2>

        {/* Name */}
        <div className="relative group flex items-center gap-3 border-b border-white/30 pb-2">
          <User size={18} className="text-white/60" />

          <input
            required
            placeholder="Full Name"
            className="w-full bg-transparent focus:outline-none text-white placeholder-white/50"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <span className="absolute left-0 bottom-0 h-[2px] w-0 
          bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
          transition-all duration-500 ease-out 
          group-focus-within:w-full 
          shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
        </div>

        {/* Email */}
        <div className="relative group flex items-center gap-3 border-b border-white/30 pb-2">
          <Mail size={18} className="text-white/60" />

          <input
            required
            type="email"
            placeholder="Email Address"
            className="w-full bg-transparent focus:outline-none text-white placeholder-white/50"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <span className="absolute left-0 bottom-0 h-[2px] w-0 
          bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
          transition-all duration-500 ease-out 
          group-focus-within:w-full 
          shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
        </div>

        {/* Password */}
        <div className="relative group flex items-center gap-3 border-b border-white/30 pb-2">
          <Lock size={18} className="text-white/60" />

          <input
            required
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-transparent focus:outline-none text-white placeholder-white/50"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-300 hover:text-purple-400 transition"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

          <span className="absolute left-0 bottom-0 h-[2px] w-0 
          bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
          transition-all duration-500 ease-out 
          group-focus-within:w-full 
          shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg 
          bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
          hover:scale-105 transition duration-300 
          shadow-[0_0_20px_rgba(168,85,247,0.5)]"
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 hover:text-pink-400 cursor-pointer"
          >
            Login
          </span>
        </p>

      </form>
    </div>
  );
}