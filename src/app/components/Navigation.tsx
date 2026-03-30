import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import PillLogo from "./PillLogo";

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Logo with Pill */}
        <Link to="/">
          <motion.div
            className="flex items-center gap-3 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PillLogo size="medium" />
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-light text-white tracking-tight">
                PILLS
              </span>
              <span className="text-xl font-light text-white/40 tracking-tight">
                .
              </span>
              <span className="text-xl font-light text-white tracking-tight">
                FUN
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <motion.div
          className="flex items-center gap-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
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
        </motion.div>
      </div>
    </nav>
  );
}