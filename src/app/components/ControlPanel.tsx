import { motion } from "motion/react";

interface ControlPanelProps {
  energyBalance: number;
  activityLevel: number;
  coherence: number;
  orbit: number;
  glowIntensity: number;
  motionSpeed: number;
  onEnergyBalanceChange: (value: number) => void;
  onActivityLevelChange: (value: number) => void;
  onCoherenceChange: (value: number) => void;
  onOrbitChange: (value: number) => void;
  onGlowIntensityChange: (value: number) => void;
  onMotionSpeedChange: (value: number) => void;
  onPreset: (preset: "calm" | "balanced" | "active" | "chaos") => void;
}

export default function ControlPanel({
  energyBalance,
  activityLevel,
  coherence,
  orbit,
  glowIntensity,
  motionSpeed,
  onEnergyBalanceChange,
  onActivityLevelChange,
  onCoherenceChange,
  onOrbitChange,
  onGlowIntensityChange,
  onMotionSpeedChange,
  onPreset,
}: ControlPanelProps) {
  const controls = [
    {
      label: "ENERGY_BALANCE",
      value: energyBalance,
      onChange: onEnergyBalanceChange,
      leftLabel: "RED",
      rightLabel: "CYAN",
      leftColor: "rgb(255, 70, 90)",
      rightColor: "rgb(80, 240, 255)",
    },
    {
      label: "ACTIVITY_LEVEL",
      value: activityLevel,
      onChange: onActivityLevelChange,
      leftLabel: "CALM",
      rightLabel: "ACTIVE",
    },
    {
      label: "COHERENCE",
      value: coherence,
      onChange: onCoherenceChange,
      leftLabel: "SCATTER",
      rightLabel: "TIGHT",
    },
    {
      label: "ORBIT",
      value: orbit,
      onChange: onOrbitChange,
      leftLabel: "RANDOM",
      rightLabel: "STRUCTURE",
    },
    {
      label: "GLOW_INTENSITY",
      value: glowIntensity,
      onChange: onGlowIntensityChange,
      leftLabel: "DIM",
      rightLabel: "BRIGHT",
    },
    {
      label: "MOTION_SPEED",
      value: motionSpeed,
      onChange: onMotionSpeedChange,
      leftLabel: "SLOW",
      rightLabel: "FAST",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed bottom-12 right-8 z-30"
    >
      {/* Main panel container */}
      <div className="relative">
        {/* Panel background with subtle glow */}
        <div
          className="absolute inset-0 rounded-sm"
          style={{
            background: "rgba(0, 0, 0, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 0 40px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(255, 70, 90, 0.03)",
            backdropFilter: "blur(20px)",
          }}
        />

        {/* Content */}
        <div className="relative px-6 py-5 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between gap-8 pb-3 border-b border-white/5">
            <div>
              <div className="text-[9px] text-white/25 tracking-[0.15em] font-light mb-0.5">
                SYSTEM_CONTROL
              </div>
              <div className="text-[11px] text-white/50 tracking-wide font-light">
                Energy Parameters
              </div>
            </div>
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-red-400"
              animate={{
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  "0 0 4px rgba(255, 70, 90, 0.3)",
                  "0 0 8px rgba(255, 70, 90, 0.8)",
                  "0 0 4px rgba(255, 70, 90, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Controls */}
          <div className="space-y-4 w-[280px]">
            {controls.map((control, index) => (
              <motion.div
                key={control.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                className="space-y-1.5"
              >
                {/* Label and value */}
                <div className="flex items-baseline justify-between">
                  <div className="text-[9px] text-white/40 tracking-[0.12em] font-light">
                    {control.label}
                  </div>
                  <div className="text-[10px] text-white/60 font-mono">
                    {control.value.toFixed(0)}
                  </div>
                </div>

                {/* Slider container */}
                <div className="relative h-[2px] bg-white/5 rounded-full">
                  {/* Track fill with color gradient for energy balance */}
                  {control.label === "ENERGY_BALANCE" ? (
                    <div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        width: `${control.value}%`,
                        background: `linear-gradient(to right, ${control.leftColor}, ${control.rightColor})`,
                        opacity: 0.6,
                        boxShadow:
                          control.value > 50
                            ? `0 0 8px ${control.rightColor}40`
                            : `0 0 8px ${control.leftColor}40`,
                      }}
                    />
                  ) : (
                    <div
                      className="absolute top-0 left-0 h-full bg-white/20 rounded-full"
                      style={{ width: `${control.value}%` }}
                    />
                  )}

                  {/* Slider thumb */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={control.value}
                    onChange={(e) => control.onChange(Number(e.target.value))}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    style={{ zIndex: 10 }}
                  />

                  {/* Visual thumb */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full pointer-events-none transition-all duration-150"
                    style={{
                      left: `${control.value}%`,
                      transform: "translate(-50%, -50%)",
                      background:
                        control.label === "ENERGY_BALANCE"
                          ? control.value > 50
                            ? control.rightColor
                            : control.leftColor
                          : "rgba(255, 255, 255, 0.9)",
                      boxShadow:
                        control.label === "ENERGY_BALANCE"
                          ? control.value > 50
                            ? `0 0 12px ${control.rightColor}`
                            : `0 0 12px ${control.leftColor}`
                          : "0 0 8px rgba(255, 255, 255, 0.5)",
                    }}
                  />
                </div>

                {/* End labels */}
                <div className="flex items-center justify-between text-[8px] text-white/20 tracking-wider font-light">
                  <span>{control.leftLabel}</span>
                  <span>{control.rightLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Preset buttons */}
          <div className="pt-3 border-t border-white/5">
            <div className="text-[9px] text-white/25 tracking-[0.12em] font-light mb-2.5">
              PRESETS
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "calm" as const, label: "CALM" },
                { id: "balanced" as const, label: "BAL" },
                { id: "active" as const, label: "ACT" },
                { id: "chaos" as const, label: "CHS" },
              ].map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => onPreset(preset.id)}
                  className="px-2 py-1.5 text-[9px] text-white/40 tracking-wider font-light rounded-sm border border-white/8 hover:border-white/20 hover:text-white/60 hover:bg-white/[0.02] transition-all duration-200"
                  style={{
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-3 h-px bg-gradient-to-r from-red-400/40 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-3 bg-gradient-to-b from-red-400/40 to-transparent" />
        <div className="absolute bottom-0 right-0 w-3 h-px bg-gradient-to-l from-cyan-400/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-3 bg-gradient-to-t from-cyan-400/30 to-transparent" />
      </div>
    </motion.div>
  );
}
