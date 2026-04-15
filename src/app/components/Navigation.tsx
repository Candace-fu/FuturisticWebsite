import { motion } from "motion/react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import PillLogo from "./PillLogo";
import { useSystem } from "../context/SystemContext";

export default function Navigation() {
  const location = useLocation();
  const { isPanelExpanded, togglePanel } = useSystem();
  const [isToggleHovered, setIsToggleHovered] = useState(false);

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

          <motion.button
            type="button"
            onClick={togglePanel}
            onHoverStart={() => setIsToggleHovered(true)}
            onHoverEnd={() => setIsToggleHovered(false)}
            aria-label={isPanelExpanded ? "Collapse agent panel" : "Expand agent panel"}
            className="relative flex items-center gap-3"
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="relative flex h-9 w-[78px] items-center rounded-full border border-white/15 bg-black/30 px-2 backdrop-blur-xl transition-colors"
              style={{
                boxShadow: isPanelExpanded
                  ? "0 0 18px rgba(255, 90, 110, 0.12), 0 0 26px rgba(80, 240, 255, 0.08), inset 0 1px 0 rgba(255,255,255,0.08)"
                  : "0 0 10px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  opacity: isPanelExpanded ? 0.22 : isToggleHovered ? 0.14 : 0.08,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,80,100,0.16) 0%, rgba(255,255,255,0.04) 45%, rgba(80,255,255,0.16) 100%)",
                }}
              />

              <motion.div
                className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full"
                animate={{
                  x: isPanelExpanded ? 0 : 44,
                  scale: isPanelExpanded
                    ? [1, 1.08, 1]
                    : isToggleHovered
                      ? [0.98, 1.02, 0.99]
                      : [0.95, 1, 0.96],
                  boxShadow: isPanelExpanded
                    ? [
                        "0 0 10px rgba(255,80,100,0.35), 0 0 18px rgba(80,255,255,0.18)",
                        "0 0 16px rgba(255,80,100,0.5), 0 0 28px rgba(80,255,255,0.28)",
                        "0 0 10px rgba(255,80,100,0.35), 0 0 18px rgba(80,255,255,0.18)",
                      ]
                    : isToggleHovered
                      ? [
                          "0 0 8px rgba(255,80,100,0.18), 0 0 14px rgba(80,255,255,0.1)",
                          "0 0 12px rgba(255,80,100,0.26), 0 0 18px rgba(80,255,255,0.16)",
                          "0 0 8px rgba(255,80,100,0.18), 0 0 14px rgba(80,255,255,0.1)",
                        ]
                      : [
                          "0 0 3px rgba(255,80,100,0.06), 0 0 6px rgba(80,255,255,0.03)",
                          "0 0 5px rgba(255,80,100,0.1), 0 0 9px rgba(80,255,255,0.06)",
                          "0 0 3px rgba(255,80,100,0.06), 0 0 6px rgba(80,255,255,0.03)",
                        ],
                  opacity: isPanelExpanded ? 1 : isToggleHovered ? 0.82 : 0.58,
                }}
                transition={{
                  x: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                  scale: {
                    duration: isPanelExpanded ? 1.15 : isToggleHovered ? 1 : 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  boxShadow: {
                    duration: isPanelExpanded ? 1.15 : isToggleHovered ? 1 : 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  background:
                    isPanelExpanded
                      ? "radial-gradient(circle at 42% 38%, rgba(255,230,235,0.96) 0%, rgba(255,105,120,0.92) 24%, rgba(180,26,44,0.92) 54%, rgba(40,10,16,1) 100%)"
                      : "radial-gradient(circle at 42% 38%, rgba(255,205,212,0.55) 0%, rgba(170,74,88,0.5) 24%, rgba(84,20,30,0.72) 54%, rgba(18,10,12,0.95) 100%)",
                }}
              >
                <div
                  className="absolute inset-[3px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 62% 60%, rgba(80,255,255,0.2) 0%, rgba(80,255,255,0.08) 26%, transparent 62%)",
                  }}
                />
                <div
                  className="absolute inset-[6px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 45% 42%, rgba(255,255,255,0.98) 0%, rgba(255,220,220,0.75) 32%, transparent 70%)",
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="relative z-10 flex items-baseline gap-1"
              animate={{
                opacity: isToggleHovered || isPanelExpanded ? 1 : 0.82,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <span className="text-[10px] tracking-[0.24em] text-white/40">
                AGENT
              </span>
              <span
                className={`text-[10px] tracking-[0.24em] ${
                  isPanelExpanded ? "text-cyan-300/90" : "text-white/28"
                }`}
              >
                {isPanelExpanded ? "ON" : "OFF"}
              </span>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </nav>
  );
}
