import { motion } from "motion/react";
import { useEffect } from "react";
import OrganicAgent from "../OrganicAgent";
import ControlPanel from "../ControlPanel";
import SystemStatus from "../SystemStatus";
import { useSystem } from "../../context/SystemContext";

export default function Home() {
  const {
    systemState,
    isPanelExpanded,
    setEnergyBalance,
    setActivityLevel,
    setCoherence,
    setOrbit,
    setGlowIntensity,
    setMotionSpeed,
    setPreset,
    setDialogueMessage,
  } = useSystem();

  // Welcome message on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setDialogueMessage({
        id: "welcome-home",
        text: "Welcome to PILLS.FUN. I am the Fun Agent—a living energy form that responds to your input. Adjust my parameters using the control panel, or explore the collective behind this lab.",
        speaker: "Fun Agent",
        speakerInitial: "⚡",
        speakerColor: "rgba(6, 182, 212, 0.5)",
        timestamp: Date.now(),
        context: "Welcome",
      });
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, [setDialogueMessage]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Top left info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="fixed top-20 left-8 z-20 space-y-2"
      >
        <div className="flex items-center gap-2 text-[10px] font-light tracking-widest">
          <span className="text-white/30">FUN_AGENT</span>
          <span className="text-white/22 normal-case tracking-normal">is</span>
          <motion.span
            className={`transition-colors duration-300 ${
              isPanelExpanded ? "text-cyan-300/90" : "text-white/24"
            }`}
            animate={{ opacity: isPanelExpanded ? 1 : 0.78 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {isPanelExpanded ? "ON" : "OFF"}
          </motion.span>
        </div>
        <div className="text-[10px] text-white/30 tracking-widest font-light">
          CREATIVE TECHNOLOGY LAB
        </div>
        <div className="text-sm text-white/60 font-light tracking-wide">
          Core Form — Interactive
        </div>
      </motion.div>

      {/* System Status - top right */}
      <SystemStatus />

      {/* Main AI Agent - Center Stage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <OrganicAgent
          energyBalance={systemState.energyBalance}
          activityLevel={systemState.activityLevel}
          coherence={systemState.coherence}
          orbit={systemState.orbit}
          glowIntensity={systemState.glowIntensity}
          motionSpeed={systemState.motionSpeed}
        />
      </div>

      {/* Bottom left description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="fixed bottom-12 left-8 z-20 max-w-xs space-y-2"
      >
        <div className="text-[10px] text-white/30 tracking-widest font-light">
          ENERGY_CORE
        </div>
        <p className="text-xs text-white/50 font-light leading-relaxed">
          A powerful <span className="text-red-400/70">red</span> core with subtle{" "}
          <span className="text-cyan-400/70">cyan</span> intrusion. 
          Minimal particles orbit the asymmetrical center, alive and responsive.
        </p>
      </motion.div>

      {/* Control Panel - only on Home */}
      <ControlPanel
        energyBalance={systemState.energyBalance}
        activityLevel={systemState.activityLevel}
        coherence={systemState.coherence}
        orbit={systemState.orbit}
        glowIntensity={systemState.glowIntensity}
        motionSpeed={systemState.motionSpeed}
        onEnergyBalanceChange={setEnergyBalance}
        onActivityLevelChange={setActivityLevel}
        onCoherenceChange={setCoherence}
        onOrbitChange={setOrbit}
        onGlowIntensityChange={setGlowIntensity}
        onMotionSpeedChange={setMotionSpeed}
        onPreset={setPreset}
      />

      {/* Ambient grid lines */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
    </div>
  );
}
