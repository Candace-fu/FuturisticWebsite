import { motion } from "motion/react";
import { useState } from "react";
import OrganicAgent from "../OrganicAgent";
import SystemStatus from "../SystemStatus";
import { useSystem } from "../../context/SystemContext";

export default function Contact() {
  const { systemState } = useSystem();
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

  const contactMethods = [
    {
      id: "email",
      label: "EMAIL",
      value: "hello@pills.fun",
      color: "from-cyan-400 to-cyan-600",
    },
    {
      id: "twitter",
      label: "TWITTER",
      value: "@pills_fun",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "instagram",
      label: "INSTAGRAM",
      value: "@pills.fun",
      color: "from-pink-400 to-purple-600",
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center px-8">
      {/* Background agent - smaller, subtle */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-10 pointer-events-none z-0">
        <OrganicAgent
          energyBalance={systemState.energyBalance}
          activityLevel={systemState.activityLevel}
          coherence={systemState.coherence}
          orbit={systemState.orbit}
          glowIntensity={systemState.glowIntensity * 0.4}
          motionSpeed={systemState.motionSpeed}
        />
      </div>

      {/* System Status */}
      <SystemStatus />

      <div className="max-w-4xl w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h1 className="text-7xl md:text-8xl font-extralight tracking-tight mb-8">
            <span className="text-white">LET'S</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-cyan-400">
              CONNECT
            </span>
          </h1>
          <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
            Have an idea? Want to collaborate? Or just curious about what we're building?
            Reach out—we love hearing from fellow explorers.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="space-y-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
              onMouseEnter={() => setHoveredMethod(method.id)}
              onMouseLeave={() => setHoveredMethod(null)}
            >
              <motion.a
                href={
                  method.id === "email"
                    ? `mailto:${method.value}`
                    : method.id === "twitter"
                    ? `https://twitter.com/${method.value.replace("@", "")}`
                    : `https://instagram.com/${method.value.replace("@", "")}`
                }
                className="block relative border border-white/10 rounded-2xl p-8 overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background gradient on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-10`}
                  initial={{ x: "-100%" }}
                  animate={{ x: hoveredMethod === method.id ? "0%" : "-100%" }}
                  transition={{ duration: 0.5 }}
                />

                {/* Content */}
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white/40 tracking-widest mb-2">
                      {method.label}
                    </div>
                    <div className="text-3xl font-light text-white tracking-wide">
                      {method.value}
                    </div>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    className="text-white/40 text-3xl"
                    animate={{
                      x: hoveredMethod === method.id ? 10 : 0,
                      rotate: hoveredMethod === method.id ? -45 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.div>
                </div>

                {/* Bottom line accent */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${method.color}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredMethod === method.id ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 text-center space-y-6"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-white/30 text-xs tracking-widest">OR</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          
          <p className="text-white/50 font-light text-lg">
            Join our newsletter for updates on new experiments
          </p>
          
          <motion.div
            className="inline-flex items-center gap-3 border border-white/20 rounded-full px-6 py-3 cursor-pointer"
            whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.4)" }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-transparent text-white placeholder:text-white/30 outline-none text-sm tracking-wide"
            />
            <motion.button
              className="text-white/60 text-sm tracking-widest hover:text-white"
              whileHover={{ x: 5 }}
            >
              SUBSCRIBE →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}