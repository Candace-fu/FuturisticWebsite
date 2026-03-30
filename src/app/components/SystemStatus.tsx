import { motion } from "motion/react";
import { useSystem } from "../context/SystemContext";

export default function SystemStatus() {
  const { systemState } = useSystem();

  // Calculate color based on energy balance
  const redStrength = 1 - systemState.energyBalance / 100;
  const cyanStrength = systemState.energyBalance / 100;

  const dominantColor =
    systemState.energyBalance < 50
      ? `rgba(255, 70, 90, ${0.6 + redStrength * 0.4})`
      : `rgba(80, 240, 255, ${0.5 + cyanStrength * 0.5})`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="fixed top-24 right-8 z-20 text-right space-y-1"
    >
      <div className="text-[10px] text-white/30 tracking-widest font-light">
        SYSTEM_STATUS
      </div>
      <div className="flex items-center justify-end gap-2">
        {/* Energy indicators */}
        <div className="flex items-center gap-1">
          <motion.div
            className="w-1 h-1 rounded-full bg-red-400"
            animate={{
              opacity: [
                0.3 + redStrength * 0.5,
                0.6 + redStrength * 0.4,
                0.3 + redStrength * 0.5,
              ],
              scale: [1, 1 + redStrength * 0.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="w-1 h-1 rounded-full bg-cyan-400"
            animate={{
              opacity: [
                0.3 + cyanStrength * 0.5,
                0.6 + cyanStrength * 0.4,
                0.3 + cyanStrength * 0.5,
              ],
              scale: [1, 1 + cyanStrength * 0.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>
        <span className="text-sm text-white/60 font-light">ACTIVE</span>
      </div>

      {/* Live parameters readout */}
      <div className="mt-3 space-y-0.5 text-[9px] text-white/25 font-mono tracking-wide">
        <div className="flex items-center justify-end gap-2">
          <span>ENB</span>
          <motion.span
            className="text-white/40"
            animate={{ color: dominantColor }}
            transition={{ duration: 0.3 }}
          >
            {systemState.energyBalance.toFixed(0)}
          </motion.span>
        </div>
        <div className="flex items-center justify-end gap-2">
          <span>ACT</span>
          <span className="text-white/40">
            {systemState.activityLevel.toFixed(0)}
          </span>
        </div>
        <div className="flex items-center justify-end gap-2">
          <span>COH</span>
          <span className="text-white/40">{systemState.coherence.toFixed(0)}</span>
        </div>
      </div>
    </motion.div>
  );
}
