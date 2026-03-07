import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { ChevronDown, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [themeOpen, setThemeOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const themes = ["rainbow", "soft", "dark"];

  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setThemeOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center w-full px-8 py-4 text-white backdrop-blur-xl border-b border-white/10">
      
      {/* Title */}
      <h1 className="text-xl font-semibold tracking-wide">
        AI Dashboard
      </h1>

      <div className="flex items-center gap-6">

        {/* Theme Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setThemeOpen(!themeOpen)}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-purple-400/40 px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300"
          >
            <span className="capitalize">{theme}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                themeOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {themeOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-44 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] overflow-hidden z-50"
              >
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTheme(t);
                      setThemeOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 capitalize text-sm transition-all duration-200 ${
                      theme === t
                        ? "bg-purple-500/30 text-white"
                        : "hover:bg-white/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Bell className="cursor-pointer hover:text-purple-400 transition" />

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-semibold shadow-lg">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-52 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.5)] overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm font-semibold">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-300 capitalize">
                    {user?.plan || "Free"} Plan
                  </p>
                </div>

                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition-all"
                >
                  Profile Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/20 transition-all"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}