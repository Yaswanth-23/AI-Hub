import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { LogOut, User, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const profileRef = useRef(null);

  // Route → Title Mapping
  const routeTitles = {
    "/dashboard": "Dashboard",
    "/workspace": "Workspace",
    "/conversations": "Conversations",
    "/usage-limits": "Usage & Limits",
    "/pricing": "Pricing",
    "/profile": "Profile",
    "/settings": "Settings",
  };

  const pageTitle =
    routeTitles[location.pathname] || "AI Hub";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/logged-out", { replace: true });
  };

  const getInitials = (value) => {
    if (!value) return "U";
    return value
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <motion.header
      key={pageTitle}
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="
        h-20
        w-full
        flex
        items-center
        justify-between
        px-6 md:px-10
        border-b border-white/5
        backdrop-blur-xl
        relative
        z-30
      "
    >
      {/* LEFT SIDE - Dynamic Title */}
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-semibold tracking-wide">
          {pageTitle}
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 relative">
        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="
              px-4 py-2
              text-sm
              rounded-lg
              text-white/80
              hover:text-white
              hover:bg-white/5
              transition
            "
          >
            Login
          </button>
        ) : (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="
                flex items-center gap-3
                px-3 py-2
                rounded-lg
                hover:bg-white/5
                transition
              "
            >
              <div
                className="
                  w-9 h-9
                  rounded-full
                  flex items-center justify-center
                  text-sm font-semibold
                  bg-white/5
                  border border-white/10
                "
              >
                {getInitials(user.name || user.email)}
              </div>

              <div className="hidden md:flex flex-col text-left">
                <span className="text-sm font-medium">
                  {user.name || "User"}
                </span>
                <span className="text-xs text-white/40">
                  {user.email}
                </span>
              </div>

              <ChevronDown size={16} className="text-white/50" />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="
                    absolute right-0 mt-3
                    w-52
                    backdrop-blur-xl
                    border border-white/10
                    rounded-xl
                    bg-black/80
                    shadow-2xl
                    overflow-hidden
                  "
                >
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/profile");
                    }}
                    className="
                      w-full
                      flex items-center gap-3
                      px-4 py-3
                      text-sm
                      text-white/80
                      hover:text-white
                      hover:bg-white/5
                      transition
                    "
                  >
                    <User size={16} />
                    Profile
                  </button>

                  <div className="h-px bg-white/5" />

                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      flex items-center gap-3
                      px-4 py-3
                      text-sm
                      text-red-400
                      hover:bg-white/5
                      transition
                    "
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.header>
  );
}