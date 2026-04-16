import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import PillLogo from "./PillLogo";
import { useSystem } from "../context/SystemContext";

export default function Navigation() {
  const location = useLocation();
  const { isPanelExpanded, expandPanel, collapsePanel } = useSystem();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="flex items-start justify-between">
        {/* Logo with Pill */}
        <motion.button
          type="button"
          onClick={() => {
            if (isPanelExpanded) {
              collapsePanel();
            } else {
              expandPanel();
            }
          }}
          className="flex items-center gap-3 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileTap={{ scale: 0.985 }}
          aria-label={isPanelExpanded ? "Hide agent panel" : "Show agent panel"}
        >
          <PillLogo size="medium" isOn={isPanelExpanded} />
          <div className="flex items-baseline gap-0.5">
            <span
              className={`text-xl font-light tracking-tight transition-colors duration-300 ${
                isPanelExpanded ? "text-white" : "text-white/68"
              }`}
            >
              PILLS
            </span>
            <span
              className={`text-xl font-light tracking-tight transition-colors duration-300 ${
                isPanelExpanded ? "text-white/40" : "text-white/24"
              }`}
            >
              .
            </span>
            <span
              className={`text-xl font-light tracking-tight transition-colors duration-300 ${
                isPanelExpanded ? "text-white" : "text-white/68"
              }`}
            >
              FUN
            </span>
          </div>
        </motion.button>

        {/* Navigation Links */}
        <motion.div
          className="flex flex-col items-end gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex items-center gap-8">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path} className="relative group">
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <span
                      className={`text-sm font-light tracking-wide transition-all duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-white/40 group-hover:text-white/70"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-px bg-white/60"
                        layoutId="activeNav"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

        </motion.div>
      </div>
    </nav>
  );
}
