import { motion } from "motion/react";

interface PillLogoProps {
  size?: "small" | "medium" | "large";
  isOn?: boolean;
}

export default function PillLogo({ size = "medium", isOn = true }: PillLogoProps) {
  // Size configurations
  const sizeConfig = {
    small: { width: 32, height: 18 },
    medium: { width: 40, height: 22 },
    large: { width: 56, height: 28 },
  };

  const { width, height } = sizeConfig[size];
  const pillRadius = height / 2;
  const ballSize = Math.max(10, height - 8);
  const ballOffset = 4;
  const ballX = isOn ? ballOffset : width - ballOffset - ballSize;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width, height }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        <defs>
          {/* Main gradient - smooth red to cyan */}
          <linearGradient
            id="pillGradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={height / 2}
            x2={width}
            y2={height / 2}
          >
            <motion.stop
              offset="0%"
              animate={{
                stopColor: [
                  "rgb(255, 80, 100)",
                  "rgb(255, 90, 110)",
                  "rgb(255, 80, 100)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.stop
              offset="50%"
              animate={{
                stopColor: [
                  "rgb(170, 170, 180)",
                  "rgb(180, 170, 190)",
                  "rgb(170, 170, 180)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.stop
              offset="100%"
              animate={{
                stopColor: [
                  "rgb(80, 255, 255)",
                  "rgb(90, 255, 245)",
                  "rgb(80, 255, 255)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </linearGradient>

          {/* Subtle glow filter */}
          <filter id="pillLogoGlow">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Pill shape */}
        <g filter={isOn ? "url(#pillLogoGlow)" : undefined}>
          {/* Left cap */}
          <circle
            cx={pillRadius}
            cy={pillRadius}
            r={pillRadius}
            fill={isOn ? "url(#pillGradient)" : "rgba(0, 0, 0, 0.7)"}
            stroke={isOn ? "transparent" : "rgba(255, 255, 255, 0.18)"}
            strokeWidth={isOn ? 0 : 0.8}
          />
          {/* Center rectangle */}
          <rect
            x={pillRadius}
            y={0}
            width={width - height}
            height={height}
            fill={isOn ? "url(#pillGradient)" : "rgba(0, 0, 0, 0.7)"}
            stroke={isOn ? "transparent" : "rgba(255, 255, 255, 0.18)"}
            strokeWidth={isOn ? 0 : 0.8}
          />
          {/* Right cap */}
          <circle
            cx={width - pillRadius}
            cy={pillRadius}
            r={pillRadius}
            fill={isOn ? "url(#pillGradient)" : "rgba(0, 0, 0, 0.7)"}
            stroke={isOn ? "transparent" : "rgba(255, 255, 255, 0.18)"}
            strokeWidth={isOn ? 0 : 0.8}
          />
        </g>
      </svg>

      <motion.div
        className="absolute rounded-full"
        animate={{
          x: ballX,
          boxShadow: isOn
            ? [
                "0 0 6px rgba(255,255,255,0.65), 0 0 12px rgba(255,80,100,0.25)",
                "0 0 10px rgba(255,255,255,0.85), 0 0 18px rgba(255,80,100,0.4)",
                "0 0 6px rgba(255,255,255,0.65), 0 0 12px rgba(255,80,100,0.25)",
              ]
            : "0 0 6px rgba(255,255,255,0.22)",
          opacity: isOn ? 1 : 0.92,
        }}
        transition={{
          x: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
          boxShadow: {
            duration: isOn ? 1.4 : 0.2,
            repeat: isOn ? Infinity : 0,
            ease: "easeInOut",
          },
        }}
        style={{
          left: 0,
          top: (height - ballSize) / 2,
          width: ballSize,
          height: ballSize,
          background:
            "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 45%, rgba(225,225,235,0.84) 70%, rgba(180,184,196,0.72) 100%)",
        }}
      />
    </div>
  );
}
