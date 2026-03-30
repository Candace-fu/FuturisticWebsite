import { motion } from "motion/react";

interface PillIconProps {
  currentPage: string;
  size?: "small" | "medium" | "large";
}

export default function PillIcon({ currentPage, size = "medium" }: PillIconProps) {
  // Dual-color system
  const redColor = `rgb(255, 80, 100)`;
  const cyanColor = `rgb(80, 255, 255)`;
  const redGlow = `rgba(255, 80, 100, 0.6)`;
  const cyanGlow = `rgba(80, 255, 255, 0.6)`;

  // State configuration
  const getStateConfig = () => {
    switch (currentPage) {
      case "/":
        return {
          name: "LIVE",
          flowPattern: "converge",
          particleCount: 6,
          speed: 2.5,
        };
      case "/lab":
        return {
          name: "GUIDE",
          flowPattern: "orbit",
          particleCount: 8,
          speed: 3,
        };
      case "/projects":
        return {
          name: "SOCIAL",
          flowPattern: "diverge",
          particleCount: 7,
          speed: 2.8,
        };
      case "/contact":
        return {
          name: "CONTACT",
          flowPattern: "exchange",
          particleCount: 6,
          speed: 2.2,
        };
      default:
        return {
          name: "LIVE",
          flowPattern: "converge",
          particleCount: 6,
          speed: 2.5,
        };
    }
  };

  const state = getStateConfig();

  // Size configurations
  const sizeConfig = {
    small: { width: 32, height: 18, strokeWidth: 1 },
    medium: { width: 48, height: 24, strokeWidth: 1.5 },
    large: { width: 64, height: 32, strokeWidth: 2 },
  };

  const { width, height, strokeWidth } = sizeConfig[size];
  const centerX = width / 2;
  const centerY = height / 2;
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
          {/* Gradient for outer glow */}
          <radialGradient id={`pillGlow-${currentPage}`}>
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="50%" stopColor="rgba(170, 170, 180, 0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Blur filter for particles */}
          <filter id={`particleBlur-${currentPage}`}>
            <feGaussianBlur stdDeviation="0.8" />
          </filter>

          {/* Glow filter for outline */}
          <filter id={`outlineGlow-${currentPage}`}>
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Clip path for pill shape */}
          <clipPath id={`pillClip-${currentPage}`}>
            <rect
              x={pillRadius}
              y={0}
              width={width - height}
              height={height}
            />
            <circle cx={pillRadius} cy={centerY} r={pillRadius} />
            <circle cx={width - pillRadius} cy={centerY} r={pillRadius} />
          </clipPath>
        </defs>

        {/* Outer glow layer */}
        <motion.g
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: state.speed * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <rect
            x={pillRadius}
            y={0}
            width={width - height}
            height={height}
            fill={`url(#pillGlow-${currentPage})`}
          />
          <circle
            cx={pillRadius}
            cy={centerY}
            r={pillRadius + 2}
            fill={`url(#pillGlow-${currentPage})`}
          />
          <circle
            cx={width - pillRadius}
            cy={centerY}
            r={pillRadius + 2}
            fill={`url(#pillGlow-${currentPage})`}
          />
        </motion.g>

        {/* Internal particles */}
        <g clipPath={`url(#pillClip-${currentPage})`}>
          {/* Converge pattern - particles flow toward center */}
          {state.flowPattern === "converge" &&
            [...Array(state.particleCount)].map((_, i) => {
              const startX = (i / state.particleCount) * width;
              const isRed = i % 2 === 0;

              return (
                <motion.circle
                  key={`converge-${i}`}
                  cx={startX}
                  cy={centerY}
                  r={1.5}
                  fill={isRed ? redColor : cyanColor}
                  filter={`url(#particleBlur-${currentPage})`}
                  animate={{
                    cx: [startX, centerX, startX],
                    cy: [
                      centerY + (i % 2 === 0 ? -3 : 3),
                      centerY,
                      centerY + (i % 2 === 0 ? -3 : 3),
                    ],
                    opacity: [0.3, 1, 0.3],
                    fill: isRed
                      ? [redColor, cyanColor, redColor]
                      : [cyanColor, redColor, cyanColor],
                  }}
                  transition={{
                    duration: state.speed,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i * state.speed) / state.particleCount,
                  }}
                />
              );
            })}

          {/* Orbit pattern - particles circle inside pill */}
          {state.flowPattern === "orbit" &&
            [...Array(state.particleCount)].map((_, i) => {
              const angle = (i / state.particleCount) * Math.PI * 2;
              const orbitRadius = height * 0.3;
              const isRed = i % 2 === 0;

              return (
                <motion.circle
                  key={`orbit-${i}`}
                  cx={centerX}
                  cy={centerY}
                  r={1.2}
                  fill={isRed ? redColor : cyanColor}
                  filter={`url(#particleBlur-${currentPage})`}
                  animate={{
                    cx: [
                      centerX + Math.cos(angle) * orbitRadius,
                      centerX + Math.cos(angle + Math.PI) * orbitRadius,
                      centerX + Math.cos(angle + Math.PI * 2) * orbitRadius,
                    ],
                    cy: [
                      centerY + Math.sin(angle) * orbitRadius,
                      centerY + Math.sin(angle + Math.PI) * orbitRadius,
                      centerY + Math.sin(angle + Math.PI * 2) * orbitRadius,
                    ],
                    opacity: [0.5, 0.9, 0.5],
                    fill: isRed
                      ? [redColor, cyanColor, redColor]
                      : [cyanColor, redColor, cyanColor],
                  }}
                  transition={{
                    duration: state.speed * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              );
            })}

          {/* Diverge pattern - particles flow outward from center */}
          {state.flowPattern === "diverge" &&
            [...Array(state.particleCount)].map((_, i) => {
              const endX = (i / state.particleCount) * width;
              const isRed = i % 2 === 0;

              return (
                <motion.circle
                  key={`diverge-${i}`}
                  cx={centerX}
                  cy={centerY}
                  r={1.5}
                  fill={isRed ? redColor : cyanColor}
                  filter={`url(#particleBlur-${currentPage})`}
                  animate={{
                    cx: [centerX, endX, centerX],
                    cy: [
                      centerY,
                      centerY + (i % 2 === 0 ? -3 : 3),
                      centerY,
                    ],
                    opacity: [1, 0.3, 1],
                    fill: isRed
                      ? [redColor, cyanColor, redColor]
                      : [cyanColor, redColor, cyanColor],
                  }}
                  transition={{
                    duration: state.speed,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i * state.speed) / state.particleCount,
                  }}
                />
              );
            })}

          {/* Exchange pattern - particles swap left-right */}
          {state.flowPattern === "exchange" &&
            [...Array(state.particleCount)].map((_, i) => {
              const leftX = width * 0.25;
              const rightX = width * 0.75;
              const startX = i % 2 === 0 ? leftX : rightX;
              const endX = i % 2 === 0 ? rightX : leftX;
              const isRed = i % 2 === 0;

              return (
                <motion.circle
                  key={`exchange-${i}`}
                  cx={startX}
                  cy={centerY}
                  r={1.4}
                  fill={isRed ? redColor : cyanColor}
                  filter={`url(#particleBlur-${currentPage})`}
                  animate={{
                    cx: [startX, endX, startX],
                    cy: [
                      centerY + (Math.floor(i / 2) * 2 - 2),
                      centerY,
                      centerY + (Math.floor(i / 2) * 2 - 2),
                    ],
                    opacity: [0.6, 1, 0.6],
                    fill: isRed
                      ? [redColor, cyanColor, redColor]
                      : [cyanColor, redColor, cyanColor],
                  }}
                  transition={{
                    duration: state.speed,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i * state.speed) / state.particleCount,
                  }}
                />
              );
            })}

          {/* Ambient flowing particles (background layer) */}
          {[...Array(4)].map((_, i) => {
            const startX = (i / 4) * width;
            return (
              <motion.circle
                key={`ambient-${i}`}
                cx={startX}
                cy={centerY}
                r={0.8}
                fill={i % 2 === 0 ? redGlow : cyanGlow}
                opacity={0.3}
                filter={`url(#particleBlur-${currentPage})`}
                animate={{
                  cx: [startX, startX + width * 0.5, startX],
                  cy: [
                    centerY - 2,
                    centerY + 2,
                    centerY - 2,
                  ],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: state.speed * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            );
          })}
        </g>

        {/* Pill outline */}
        <motion.g
          animate={{
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: state.speed * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Left cap */}
          <circle
            cx={pillRadius}
            cy={centerY}
            r={pillRadius - strokeWidth / 2}
            fill="none"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth={strokeWidth}
            filter={`url(#outlineGlow-${currentPage})`}
          />
          {/* Right cap */}
          <circle
            cx={width - pillRadius}
            cy={centerY}
            r={pillRadius - strokeWidth / 2}
            fill="none"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth={strokeWidth}
            filter={`url(#outlineGlow-${currentPage})`}
          />
          {/* Top line */}
          <line
            x1={pillRadius}
            y1={strokeWidth / 2}
            x2={width - pillRadius}
            y2={strokeWidth / 2}
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth={strokeWidth}
            filter={`url(#outlineGlow-${currentPage})`}
          />
          {/* Bottom line */}
          <line
            x1={pillRadius}
            y1={height - strokeWidth / 2}
            x2={width - pillRadius}
            y2={height - strokeWidth / 2}
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth={strokeWidth}
            filter={`url(#outlineGlow-${currentPage})`}
          />
        </motion.g>
      </svg>
    </div>
  );
}
