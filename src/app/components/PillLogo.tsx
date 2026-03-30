import { motion } from "motion/react";

interface PillLogoProps {
  size?: "small" | "medium" | "large";
}

export default function PillLogo({ size = "medium" }: PillLogoProps) {
  // Size configurations
  const sizeConfig = {
    small: { width: 32, height: 18 },
    medium: { width: 40, height: 22 },
    large: { width: 56, height: 28 },
  };

  const { width, height } = sizeConfig[size];
  const pillRadius = height / 2;

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
          <linearGradient id="pillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
        <g filter="url(#pillLogoGlow)">
          {/* Left cap */}
          <circle
            cx={pillRadius}
            cy={pillRadius}
            r={pillRadius}
            fill="url(#pillGradient)"
          />
          {/* Center rectangle */}
          <rect
            x={pillRadius}
            y={0}
            width={width - height}
            height={height}
            fill="url(#pillGradient)"
          />
          {/* Right cap */}
          <circle
            cx={width - pillRadius}
            cy={pillRadius}
            r={pillRadius}
            fill="url(#pillGradient)"
          />
        </g>
      </svg>
    </div>
  );
}
