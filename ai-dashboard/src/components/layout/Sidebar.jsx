import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  Gem,
  UserCircle2,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/aihub-logo.png";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/workspace", icon: Sparkles, label: "Workspace" },
    { to: "/pricing", icon: Gem, label: "Pricing" },
    { to: "/profile", icon: UserCircle2, label: "Profile" },
    { to: "/settings", icon: SlidersHorizontal, label: "Settings" },
  ];

  const baseItem =
    "relative flex items-center gap-5 px-7 py-4 text-[16px] font-medium transition-all duration-300 rounded-xl group";

  const renderLinks = () =>
    links.map(({ to, icon: Icon, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          `${baseItem} ${
            isActive
              ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              size={26}
              strokeWidth={1.8}
              className={`transition-all duration-300 ${
                isActive
                  ? "scale-110 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                  : "opacity-70 group-hover:scale-105 group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
              }`}
            />

            {!collapsed && (
              <span className="tracking-wide">{label}</span>
            )}
          </>
        )}
      </NavLink>
    ));

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 flex items-center px-4 z-40 border-b border-white/10">

        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 hover:bg-white/10 rounded-lg transition"
        >
          <Menu size={22} />
        </button>

        <div className="ml-4 flex items-center gap-2">
          <img src={logo} alt="AI Hub" className="w-6 h-6" />
          <span className="text-lg font-semibold tracking-wide">
            AI Hub
          </span>
        </div>
      </div>

      <div className="md:hidden h-16" />

      {/* DESKTOP SIDEBAR */}
      <motion.aside
        animate={{ width: collapsed ? 110 : 280 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex h-screen flex-col py-10 border-r border-white/10"
      >

        {/* LOGO */}
        <div className="flex items-center justify-between px-7 mb-16">

          {!collapsed && (
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="AI Hub"
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                AI Hub
              </h1>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            {collapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>

        </div>

        {/* NAV */}
        <div className="flex flex-col gap-3 flex-1 px-3">
          {renderLinks()}
        </div>

      </motion.aside>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/70 z-40"
            />

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed top-0 left-0 h-full w-72 z-50 px-7 py-10 border-r border-white/10"
            >

              <div className="flex justify-between items-center mb-12">

                <div className="flex items-center gap-3">
                  <img src={logo} alt="AI Hub" className="w-6 h-6" />
                  <h1 className="text-lg font-semibold tracking-wide">
                    AI Hub
                  </h1>
                </div>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  <X size={20} />
                </button>

              </div>

              <nav className="flex flex-col gap-3">
                {links.map(({ to, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-5 px-5 py-4 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition text-[16px]"
                  >
                    <Icon size={24} strokeWidth={1.8} />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}