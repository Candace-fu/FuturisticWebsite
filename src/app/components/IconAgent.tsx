import { motion } from "motion/react";

interface IconAgentProps {
  currentPage: string;
}

export default function IconAgent({ currentPage }: IconAgentProps) {
  // Dual-color system - red and cyan always present
  const redColor = `rgb(255, 80, 100)`;
  const cyanColor = `rgb(80, 255, 255)`;
  const redGlow = `rgba(255, 80, 100, 0.7)`;
  const cyanGlow = `rgba(80, 255, 255, 0.7)`;
  const mixedGlow = `rgba(170, 170, 180, 0.6)`;

  // State affects interaction pattern, not color identity
  const getStateConfig = () => {
    switch (currentPage) {
      case "/":
        return {
          name: "LIVE",
          pattern: "converge", // Red and cyan flow toward center
          speed: 2,
        };
      case "/lab":
        return {
          name: "GUIDE",
          pattern: "orbit", // Red and cyan orbit together
          speed: 2.5,
        };
      case "/projects":
        return {
          name: "SOCIAL",
          pattern: "diverge", // Red and cyan flow outward
          speed: 2.2,
        };
      case "/contact":
        return {
          name: "CONTACT",
          pattern: "exchange", // Red and cyan swap positions
          speed: 2.8,
        };
      default:
        return {
          name: "LIVE",
          pattern: "converge",
          speed: 2,
        };
    }
  };

  const state = getStateConfig();

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {/* OUTER AURA - Mixed red-cyan glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: state.speed * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Red aura */}
        <div
          className="absolute inset-0 rounded-[45%_55%_50%_50%]"
          style={{
            background: `radial-gradient(ellipse at 35% 40%, ${redGlow} 0%, transparent 65%)`,
            filter: "blur(10px)",
          }}
        />
        {/* Cyan aura */}
        <div
          className="absolute inset-0 rounded-[55%_45%_50%_50%]"
          style={{
            background: `radial-gradient(ellipse at 65% 60%, ${cyanGlow} 0%, transparent 65%)`,
            filter: "blur(10px)",
          }}
        />
      </motion.div>

      {/* MID LAYER - Particle interactions based on state */}
      
      {state.pattern === "converge" && (
        <>
          {/* Red particles flowing inward */}
          {[0, 90, 180, 270].map((angle, i) => (
            <motion.div
              key={`red-${i}`}
              className="absolute"
              style={{ left: "50%", top: "50%" }}
              animate={{
                x: [
                  Math.cos((angle * Math.PI) / 180) * 24,
                  Math.cos((angle * Math.PI) / 180) * 8,
                  Math.cos((angle * Math.PI) / 180) * 24,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * 24,
                  Math.sin((angle * Math.PI) / 180) * 8,
                  Math.sin((angle * Math.PI) / 180) * 24,
                ],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: state.speed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i * state.speed) / 4,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: redColor,
                  filter: "blur(1px)",
                  boxShadow: `0 0 4px ${redGlow}`,
                }}
              />
            </motion.div>
          ))}
          
          {/* Cyan particles flowing inward (offset) */}
          {[45, 135, 225, 315].map((angle, i) => (
            <motion.div
              key={`cyan-${i}`}
              className="absolute"
              style={{ left: "50%", top: "50%" }}
              animate={{
                x: [
                  Math.cos((angle * Math.PI) / 180) * 26,
                  Math.cos((angle * Math.PI) / 180) * 10,
                  Math.cos((angle * Math.PI) / 180) * 26,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * 26,
                  Math.sin((angle * Math.PI) / 180) * 10,
                  Math.sin((angle * Math.PI) / 180) * 26,
                ],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: state.speed * 1.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i * state.speed) / 4,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: cyanColor,
                  filter: "blur(1px)",
                  boxShadow: `0 0 4px ${cyanGlow}`,
                }}
              />
            </motion.div>
          ))}
        </>
      )}

      {state.pattern === "diverge" && (
        <>
          {/* Red particles flowing outward */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={`red-out-${i}`}
              className="absolute"
              style={{ left: "50%", top: "50%" }}
              animate={{
                x: [
                  Math.cos((angle * Math.PI) / 180) * 6,
                  Math.cos((angle * Math.PI) / 180) * 22,
                  Math.cos((angle * Math.PI) / 180) * 6,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * 6,
                  Math.sin((angle * Math.PI) / 180) * 22,
                  Math.sin((angle * Math.PI) / 180) * 6,
                ],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: state.speed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i * state.speed) / 3,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: redColor,
                  filter: "blur(1px)",
                  boxShadow: `0 0 4px ${redGlow}`,
                }}
              />
            </motion.div>
          ))}
          
          {/* Cyan particles flowing outward (offset) */}
          {[60, 180, 300].map((angle, i) => (
            <motion.div
              key={`cyan-out-${i}`}
              className="absolute"
              style={{ left: "50%", top: "50%" }}
              animate={{
                x: [
                  Math.cos((angle * Math.PI) / 180) * 6,
                  Math.cos((angle * Math.PI) / 180) * 24,
                  Math.cos((angle * Math.PI) / 180) * 6,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * 6,
                  Math.sin((angle * Math.PI) / 180) * 24,
                  Math.sin((angle * Math.PI) / 180) * 6,
                ],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: state.speed * 1.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i * state.speed) / 3,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: cyanColor,
                  filter: "blur(1px)",
                  boxShadow: `0 0 4px ${cyanGlow}`,
                }}
              />
            </motion.div>
          ))}
        </>
      )}

      {state.pattern === "orbit" && (
        <>
          {/* Red particles orbiting */}
          {[0, 90, 180, 270].map((offset, i) => (
            <motion.div
              key={`red-orbit-${i}`}
              className="absolute"
              style={{ left: "50%", top: "50%" }}
              animate={{
                x: [
                  18,
                  Math.cos((Math.PI * 2) / 3) * 18,
                  Math.cos((Math.PI * 4) / 3) * 18,
                  18,
                ],
                y: [
                  0,
                  Math.sin((Math.PI * 2) / 3) * 18,
                  Math.sin((Math.PI * 4) / 3) * 18,
                  0,
                ],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: state.speed * 2,
                repeat: Infinity,
                ease: "linear",
                delay: (i * state.speed * 2) / 4,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: redColor,
                  filter: "blur(0.5px)",
                  boxShadow: `0 0 3px ${redGlow}`,
                }}
              />
            </motion.div>
          ))}
          
          {/* Cyan particles orbiting (opposite direction) */}
          {[45, 135, 225, 315].map((offset, i) => (
            <motion.div
              key={`cyan-orbit-${i}`}
              className="absolute"
              style={{ left: "50%", top: "50%" }}
              animate={{
                x: [
                  18,
                  Math.cos((Math.PI * 4) / 3) * 18,
                  Math.cos((Math.PI * 2) / 3) * 18,
                  18,
                ],
                y: [
                  0,
                  Math.sin((Math.PI * 4) / 3) * 18,
                  Math.sin((Math.PI * 2) / 3) * 18,
                  0,
                ],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: state.speed * 2,
                repeat: Infinity,
                ease: "linear",
                delay: (i * state.speed * 2) / 4,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: cyanColor,
                  filter: "blur(0.5px)",
                  boxShadow: `0 0 3px ${cyanGlow}`,
                }}
              />
            </motion.div>
          ))}
        </>
      )}

      {state.pattern === "exchange" && (
        <>
          {/* Red and cyan particles swapping positions */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={`exchange-${i}`}
              className="absolute"
              style={{ left: "50%", top: "50%" }}
            >
              {/* Red particle */}
              <motion.div
                className="absolute"
                animate={{
                  x: [
                    Math.cos((angle * Math.PI) / 180) * 20,
                    Math.cos(((angle + 180) * Math.PI) / 180) * 20,
                    Math.cos((angle * Math.PI) / 180) * 20,
                  ],
                  y: [
                    Math.sin((angle * Math.PI) / 180) * 20,
                    Math.sin(((angle + 180) * Math.PI) / 180) * 20,
                    Math.sin((angle * Math.PI) / 180) * 20,
                  ],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  duration: state.speed,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i * state.speed) / 3,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: redColor,
                    filter: "blur(1px)",
                    boxShadow: `0 0 4px ${redGlow}`,
                  }}
                />
              </motion.div>
              
              {/* Cyan particle (opposite path) */}
              <motion.div
                className="absolute"
                animate={{
                  x: [
                    Math.cos(((angle + 180) * Math.PI) / 180) * 20,
                    Math.cos((angle * Math.PI) / 180) * 20,
                    Math.cos(((angle + 180) * Math.PI) / 180) * 20,
                  ],
                  y: [
                    Math.sin(((angle + 180) * Math.PI) / 180) * 20,
                    Math.sin((angle * Math.PI) / 180) * 20,
                    Math.sin(((angle + 180) * Math.PI) / 180) * 20,
                  ],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  duration: state.speed,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i * state.speed) / 3,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: cyanColor,
                    filter: "blur(1px)",
                    boxShadow: `0 0 4px ${cyanGlow}`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </>
      )}

      {/* INNER CORE - Dual-color nucleus */}
      <motion.div
        className="absolute"
        animate={{
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: state.speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <defs>
            <radialGradient id={`iconRedGrad-${currentPage}`} cx="35%" cy="50%">
              <stop offset="0%" stopColor={redColor} stopOpacity={1} />
              <stop offset="70%" stopColor={redGlow} stopOpacity={0.5} />
              <stop offset="100%" stopColor="transparent" stopOpacity={0} />
            </radialGradient>
            
            <radialGradient id={`iconCyanGrad-${currentPage}`} cx="65%" cy="50%">
              <stop offset="0%" stopColor={cyanColor} stopOpacity={1} />
              <stop offset="70%" stopColor={cyanGlow} stopOpacity={0.5} />
              <stop offset="100%" stopColor="transparent" stopOpacity={0} />
            </radialGradient>

            <filter id={`iconGlow-${currentPage}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Red half */}
          <motion.path
            d="M16,10 C12,11 10,13 9,16 C8,19 10,21 12,22 L16,16 L16,10 Z"
            fill={`url(#iconRedGrad-${currentPage})`}
            filter={`url(#iconGlow-${currentPage})`}
            animate={{
              d: [
                "M16,10 C12,11 10,13 9,16 C8,19 10,21 12,22 L16,16 L16,10 Z",
                "M16,9 C11,11 9,14 8.5,16 C8,19 10.5,21 13,22 L16,16 L16,9 Z",
                "M16,10 C12,11 10,13 9,16 C8,19 10,21 12,22 L16,16 L16,10 Z",
              ],
            }}
            transition={{
              duration: state.speed * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Cyan half */}
          <motion.path
            d="M16,10 C20,11 22,13 23,16 C24,19 22,21 20,22 L16,16 L16,10 Z"
            fill={`url(#iconCyanGrad-${currentPage})`}
            filter={`url(#iconGlow-${currentPage})`}
            animate={{
              d: [
                "M16,10 C20,11 22,13 23,16 C24,19 22,21 20,22 L16,16 L16,10 Z",
                "M16,9 C21,11 23,14 23.5,16 C24,19 21.5,21 19,22 L16,16 L16,9 Z",
                "M16,10 C20,11 22,13 23,16 C24,19 22,21 20,22 L16,16 L16,10 Z",
              ],
            }}
            transition={{
              duration: state.speed * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.05,
            }}
          />

          {/* Center mixing point */}
          <motion.circle
            cx="16"
            cy="16"
            r="3"
            fill={mixedGlow}
            filter={`url(#iconGlow-${currentPage})`}
            animate={{
              r: [3, 4, 2.5, 3.5, 3],
              opacity: [0.9, 1, 0.85, 0.95, 0.9],
            }}
            transition={{
              duration: state.speed * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
