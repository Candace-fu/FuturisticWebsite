import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

interface OrganicAgentProps {
  energyBalance: number; // 0-100: 0=red dominant, 100=cyan dominant
  activityLevel: number; // 0-100: affects speed and intensity
  coherence: number; // 0-100: affects particle spread
  orbit: number; // 0-100: affects circularity of motion
  glowIntensity: number; // 0-100: affects brightness
  motionSpeed: number; // 0-100: affects animation speed
}

export default function OrganicAgent({
  energyBalance,
  activityLevel,
  coherence,
  orbit,
  glowIntensity,
  motionSpeed,
}: OrganicAgentProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 80 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) * 0.015;
      const deltaY = (e.clientY - centerY) * 0.015;

      mouseX.set(deltaX);
      mouseY.set(deltaY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Color definitions - balance affects dominance
  const redColor = `rgb(255, 70, 90)`;
  const cyanColor = `rgb(80, 240, 255)`;
  
  // Energy balance affects opacity of each color
  const redStrength = 1 - energyBalance / 100; // 1 when balance=0, 0 when balance=100
  const cyanStrength = energyBalance / 100; // 0 when balance=0, 1 when balance=100
  
  const redGlow = `rgba(255, 70, 90, ${(glowIntensity / 100) * (0.3 + redStrength * 0.7)})`;
  const cyanGlow = `rgba(80, 240, 255, ${(glowIntensity / 100) * (0.2 + cyanStrength * 0.6)})`;

  // Activity affects animation speeds
  const activityMultiplier = 0.5 + (activityLevel / 100) * 1.5; // 0.5x to 2x
  const breathSpeed = (8 - motionSpeed * 0.06) / activityMultiplier; // Slower base speed
  const particleSpeed = (14 - motionSpeed * 0.08) / activityMultiplier; // Slower base speed

  // Coherence affects particle radius spread
  const baseRadius = 145;
  const coherenceSpread = ((100 - coherence) / 100) * 80; // 0-80px spread
  
  // Orbit affects how circular vs random the motion is
  const orbitStrength = orbit / 100; // 0 = random, 1 = perfect orbit

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      style={{ x, y }}
    >
      {/* RED FIELD - opacity affected by energy balance */}
      <motion.div
        className="absolute"
        style={{
          left: "calc(50% - 15px)",
          top: "calc(50% - 20px)",
        }}
        animate={{
          scale: [1, 1.12, 0.95, 1.08, 1],
          opacity: [
            0.35 * (0.6 + redStrength * 0.4),
            0.5 * (0.6 + redStrength * 0.4),
            0.4 * (0.6 + redStrength * 0.4),
            0.45 * (0.6 + redStrength * 0.4),
            0.35 * (0.6 + redStrength * 0.4),
          ],
          rotate: [0, 360],
          x: orbitStrength < 0.5 ? [-10, 10, -5, 8, -10] : [0, 0, 0, 0, 0],
          y: orbitStrength < 0.5 ? [-8, 5, -6, 9, -8] : [0, 0, 0, 0, 0],
        }}
        transition={{
          scale: { duration: breathSpeed * 2.5, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: breathSpeed * 2.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: breathSpeed * 20, repeat: Infinity, ease: "linear" },
          x: { duration: breathSpeed * 3, repeat: Infinity, ease: "easeInOut" },
          y: { duration: breathSpeed * 3.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div
          className="w-[600px] h-[650px] rounded-[58%_42%_63%_37%/47%_53%_52%_48%]"
          style={{
            background: `radial-gradient(ellipse at 42% 38%, ${redGlow} 0%, transparent 65%)`,
            filter: `blur(${110 * (glowIntensity / 100)}px)`,
          }}
        />
      </motion.div>

      {/* CYAN FIELD - opacity affected by energy balance */}
      <motion.div
        className="absolute"
        style={{
          left: "calc(50% + 35px)",
          top: "calc(50% + 25px)",
        }}
        animate={{
          scale: [1, 1.2, 0.9, 1.15, 1],
          opacity: [
            0.25 * (0.5 + cyanStrength * 0.5),
            0.4 * (0.5 + cyanStrength * 0.5),
            0.3 * (0.5 + cyanStrength * 0.5),
            0.35 * (0.5 + cyanStrength * 0.5),
            0.25 * (0.5 + cyanStrength * 0.5),
          ],
          rotate: [90, -270],
          x: orbitStrength < 0.5 ? [8, -6, 10, -7, 8] : [0, 0, 0, 0, 0],
          y: orbitStrength < 0.5 ? [6, -9, 7, -5, 6] : [0, 0, 0, 0, 0],
        }}
        transition={{
          scale: { duration: breathSpeed * 2.8, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: breathSpeed * 2.8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: breathSpeed * 18, repeat: Infinity, ease: "linear" },
          x: { duration: breathSpeed * 2.7, repeat: Infinity, ease: "easeInOut" },
          y: { duration: breathSpeed * 3.2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div
          className="w-[380px] h-[420px] rounded-[45%_55%_48%_52%/52%_48%_55%_45%]"
          style={{
            background: `radial-gradient(ellipse at 58% 62%, ${cyanGlow} 0%, transparent 60%)`,
            filter: `blur(${85 * (glowIntensity / 100)}px)`,
          }}
        />
      </motion.div>

      {/* PARTICLES - affected by coherence, orbit, and activity */}
      
      {/* 3 red particles */}
      {[
        { angle: 25, baseDelay: 0 },
        { angle: 145, baseDelay: 1.2 },
        { angle: 280, baseDelay: 2.4 },
      ].map((particle, i) => {
        const radius = baseRadius - coherenceSpread / 2 + (i * coherenceSpread) / 3;
        const orbitSpeed = particleSpeed * (1.2 + i * 0.15);
        
        // Orbit determines circularity: high orbit = circular, low orbit = erratic
        const randomFactor = 1 - orbitStrength;
        const xVariation = randomFactor * (Math.sin(i * 2) * 40);
        const yVariation = randomFactor * (Math.cos(i * 3) * 40);
        
        return (
          <motion.div
            key={`red-${i}`}
            className="absolute"
            style={{ left: "50%", top: "50%" }}
            animate={{
              x: [
                radius + xVariation,
                Math.cos((Math.PI * 2) / 3) * radius - xVariation,
                Math.cos((Math.PI * 4) / 3) * radius + xVariation * 0.5,
                radius + xVariation,
              ],
              y: [
                yVariation,
                Math.sin((Math.PI * 2) / 3) * radius + yVariation,
                Math.sin((Math.PI * 4) / 3) * radius - yVariation * 0.5,
                yVariation,
              ],
              opacity: [
                0.4 * (0.6 + redStrength * 0.4),
                0.7 * (0.6 + redStrength * 0.4),
                0.5 * (0.6 + redStrength * 0.4),
                0.6 * (0.6 + redStrength * 0.4),
                0.4 * (0.6 + redStrength * 0.4),
              ],
            }}
            transition={{
              duration: orbitSpeed,
              repeat: Infinity,
              ease: orbitStrength > 0.5 ? "linear" : "easeInOut",
              delay: particle.baseDelay,
            }}
          >
            <div className="relative w-8 h-8">
              <motion.div
                className="absolute inset-[-12px] rounded-full"
                style={{
                  backgroundColor: redColor,
                  filter: `blur(${11 * (glowIntensity / 100)}px)`,
                  opacity: 0.24 + redStrength * 0.16,
                  boxShadow: `0 0 ${12 * (glowIntensity / 100)}px ${redGlow}`,
                }}
                animate={{
                  opacity: [
                    0.22 + redStrength * 0.12,
                    0.3 + redStrength * 0.16,
                    0.25 + redStrength * 0.13,
                    0.28 + redStrength * 0.15,
                    0.22 + redStrength * 0.12,
                  ],
                }}
                transition={{
                  duration: orbitSpeed,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.baseDelay,
                }}
              />
              <motion.div
                className="absolute inset-[6px] rounded-full"
                style={{
                  backgroundColor: redColor,
                  boxShadow: `0 0 ${8 * (glowIntensity / 100)}px ${redGlow}`,
                }}
                animate={{
                  scale: [1, 1.04 + activityLevel * 0.0015, 1.01, 1.03 + activityLevel * 0.0012, 1],
                  opacity: [0.9, 1, 0.94, 0.98, 0.9],
                }}
                transition={{
                  duration: orbitSpeed,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.baseDelay,
                }}
              />
            </div>
          </motion.div>
        );
      })}

      {/* 2 cyan particles */}
      {[
        { angle: 80, baseDelay: 0.8 },
        { angle: 210, baseDelay: 2 },
      ].map((particle, i) => {
        const radius = baseRadius - coherenceSpread / 3 + (i * coherenceSpread) / 2;
        const orbitSpeed = particleSpeed * (1.4 + i * 0.2);
        
        const randomFactor = 1 - orbitStrength;
        const xVariation = randomFactor * (Math.cos(i * 3) * 35);
        const yVariation = randomFactor * (Math.sin(i * 2.5) * 35);
        
        return (
          <motion.div
            key={`cyan-${i}`}
            className="absolute"
            style={{ left: "50%", top: "50%" }}
            animate={{
              x: [
                radius - xVariation,
                Math.cos((Math.PI * 4) / 3) * radius + xVariation,
                Math.cos((Math.PI * 2) / 3) * radius - xVariation * 0.5,
                radius - xVariation,
              ],
              y: [
                -yVariation,
                Math.sin((Math.PI * 4) / 3) * radius - yVariation,
                Math.sin((Math.PI * 2) / 3) * radius + yVariation * 0.5,
                -yVariation,
              ],
              opacity: [
                0.35 * (0.5 + cyanStrength * 0.5),
                0.65 * (0.5 + cyanStrength * 0.5),
                0.45 * (0.5 + cyanStrength * 0.5),
                0.55 * (0.5 + cyanStrength * 0.5),
                0.35 * (0.5 + cyanStrength * 0.5),
              ],
            }}
            transition={{
              duration: orbitSpeed,
              repeat: Infinity,
              ease: orbitStrength > 0.5 ? "linear" : "easeInOut",
              delay: particle.baseDelay,
            }}
          >
            <div className="relative w-7 h-7">
              <motion.div
                className="absolute inset-[-11px] rounded-full"
                style={{
                  backgroundColor: cyanColor,
                  filter: `blur(${10 * (glowIntensity / 100)}px)`,
                  opacity: 0.22 + cyanStrength * 0.14,
                  boxShadow: `0 0 ${10 * (glowIntensity / 100)}px ${cyanGlow}`,
                }}
                animate={{
                  opacity: [
                    0.2 + cyanStrength * 0.1,
                    0.28 + cyanStrength * 0.15,
                    0.23 + cyanStrength * 0.12,
                    0.26 + cyanStrength * 0.14,
                    0.2 + cyanStrength * 0.1,
                  ],
                }}
                transition={{
                  duration: orbitSpeed,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.baseDelay,
                }}
              />
              <motion.div
                className="absolute inset-[5px] rounded-full"
                style={{
                  backgroundColor: cyanColor,
                  boxShadow: `0 0 ${7 * (glowIntensity / 100)}px ${cyanGlow}`,
                }}
                animate={{
                  scale: [0.99, 1.035 + activityLevel * 0.0013, 1, 1.025 + activityLevel * 0.001, 0.99],
                  opacity: [0.88, 0.98, 0.92, 0.96, 0.88],
                }}
                transition={{
                  duration: orbitSpeed,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.baseDelay,
                }}
              />
            </div>
          </motion.div>
        );
      })}

      {/* MAIN CORE - affected by energy balance */}
      <motion.div
        className="absolute"
        style={{
          left: "calc(50% - 8px)",
          top: "calc(50% - 5px)",
        }}
        animate={{
          rotate: [0, 3, -2, 4, 0],
        }}
        transition={{
          rotate: { duration: breathSpeed * 2.2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg
          width="320"
          height="320"
          viewBox="-40 -40 320 320"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Red-dominant core gradient */}
            <radialGradient id="coreGradient" cx="45%" cy="42%">
              <stop offset="0%" stopColor={redColor} stopOpacity={0.5 + redStrength * 0.5} />
              <stop offset="35%" stopColor={redColor} stopOpacity={0.4 + redStrength * 0.55} />
              <stop offset="60%" stopColor={redGlow} stopOpacity={0.7} />
              <stop offset="85%" stopColor={redGlow} stopOpacity={0.3} />
              <stop offset="100%" stopColor="transparent" stopOpacity={0} />
            </radialGradient>

            {/* Cyan intrusion gradient */}
            <radialGradient id="cyanIntrusionGradient" cx="65%" cy="58%">
              <stop offset="0%" stopColor={cyanColor} stopOpacity={0.3 + cyanStrength * 0.4} />
              <stop offset="40%" stopColor={cyanGlow} stopOpacity={0.2 + cyanStrength * 0.2} />
              <stop offset="70%" stopColor="transparent" stopOpacity={0} />
            </radialGradient>

            <filter
              id="coreGlow"
              x="-60"
              y="-60"
              width="360"
              height="360"
              filterUnits="userSpaceOnUse"
            >
              <feGaussianBlur stdDeviation={18 * (glowIntensity / 100)} result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main red core */}
          <motion.path
            d="M120,50 C145,52 165,70 175,95 C185,120 180,145 165,165 C150,185 125,190 100,185 C75,180 55,165 48,140 C40,115 50,85 75,65 C90,55 105,48 120,50 Z"
            fill="url(#coreGradient)"
            filter="url(#coreGlow)"
            animate={{
              d: [
                "M120,50 C145,52 165,70 175,95 C185,120 180,145 165,165 C150,185 125,190 100,185 C75,180 55,165 48,140 C40,115 50,85 75,65 C90,55 105,48 120,50 Z",
                "M120,45 C150,50 170,72 178,98 C186,124 178,148 162,168 C146,188 120,192 96,186 C72,180 52,162 46,136 C39,110 52,82 78,62 C94,52 108,43 120,45 Z",
                "M120,48 C147,51 168,71 176,96 C184,121 179,146 164,166 C149,186 123,191 99,186 C74,181 54,164 47,139 C40,114 51,84 76,64 C91,54 106,46 120,48 Z",
                "M120,50 C145,52 165,70 175,95 C185,120 180,145 165,165 C150,185 125,190 100,185 C75,180 55,165 48,140 C40,115 50,85 75,65 C90,55 105,48 120,50 Z",
              ],
            }}
            transition={{
              duration: breathSpeed * 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Cyan intrusion */}
          <motion.ellipse
            cx="145"
            cy="135"
            rx="35"
            ry="38"
            fill="url(#cyanIntrusionGradient)"
            filter="url(#coreGlow)"
            opacity={0.5 + cyanStrength * 0.3}
            animate={{
              rx: [35, 40, 32, 38, 35],
              ry: [38, 42, 35, 40, 38],
              cx: [145, 148, 143, 147, 145],
              cy: [135, 138, 133, 136, 135],
            }}
            transition={{
              duration: breathSpeed * 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />

          {/* Bright core center - softer */}
          <motion.circle
            cx="115"
            cy="110"
            r="28"
            fill={redColor}
            filter="url(#coreGlow)"
            opacity={0.6 + redStrength * 0.25}
            animate={{
              r: [28, 32, 26, 30, 28],
            }}
            transition={{
              duration: breathSpeed * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Soft highlight - reduced contrast */}
          <motion.circle
            cx="110"
            cy="105"
            r="14"
            fill="rgba(255, 150, 160, 0.5)"
            filter="url(#coreGlow)"
            animate={{
              r: [14, 16, 12, 15, 14],
              opacity: [0.5, 0.65, 0.45, 0.6, 0.5],
            }}
            transition={{
              duration: breathSpeed * 1.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
