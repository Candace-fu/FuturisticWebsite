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
        <div className="relative w-[240px] h-[240px]">
          <motion.div
            className="absolute inset-[-14px] rounded-[58%_42%_63%_37%/47%_53%_52%_48%]"
            style={{
              background: `radial-gradient(circle at 46% 44%, rgba(255, 118, 132, ${0.15 + redStrength * 0.06}) 0%, rgba(255, 70, 90, ${0.09 + redStrength * 0.08}) 18%, rgba(255, 70, 90, ${0.05 + redStrength * 0.04}) 36%, rgba(255, 70, 90, ${0.025 + redStrength * 0.02}) 56%, transparent 88%)`,
              filter: `blur(${56 + glowIntensity * 0.4}px)`,
              opacity: 0.66,
            }}
            animate={{
              scale: [1, 1.04, 0.988, 1.028, 1],
              opacity: [0.6, 0.72, 0.64, 0.7, 0.6],
              borderRadius: [
                "58% 42% 63% 37% / 47% 53% 52% 48%",
                "61% 39% 59% 41% / 44% 56% 49% 51%",
                "56% 44% 62% 38% / 49% 51% 54% 46%",
                "60% 40% 58% 42% / 46% 54% 50% 50%",
                "58% 42% 63% 37% / 47% 53% 52% 48%",
              ],
            }}
            transition={{
              duration: breathSpeed * 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute rounded-full"
            style={{
              left: "58%",
              top: "58%",
              width: "68px",
              height: "72px",
              background: `radial-gradient(circle at 40% 40%, rgba(80, 240, 255, ${0.16 + cyanStrength * 0.14}) 0%, rgba(80, 240, 255, ${0.1 + cyanStrength * 0.1}) 32%, transparent 72%)`,
              filter: `blur(${20 + glowIntensity * 0.18}px)`,
              opacity: 0.48 + cyanStrength * 0.16,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              x: [0, 4, -3, 2, 0],
              y: [0, 3, -2, 2, 0],
              scale: [1, 1.08, 0.96, 1.04, 1],
            }}
            transition={{
              duration: breathSpeed * 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />

          <motion.div
            className="absolute rounded-full"
            style={{
              left: "50%",
              top: "50%",
              width: "132px",
              height: "132px",
              background: `radial-gradient(circle at 46% 44%, rgba(255, 130, 142, ${0.68 - redStrength * 0.03}) 0%, rgba(255, 70, 90, ${0.56 + redStrength * 0.05}) 22%, rgba(255, 70, 90, ${0.26 + redStrength * 0.08}) 48%, rgba(255, 70, 90, ${0.1 + redStrength * 0.05}) 68%, rgba(255, 70, 90, ${0.03 + redStrength * 0.02}) 84%, transparent 100%)`,
              boxShadow: `0 0 ${42 + glowIntensity * 0.34}px rgba(255, 70, 90, ${0.08 + redStrength * 0.04})`,
              filter: "blur(3px)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              width: ["132px", "140px", "126px", "136px", "132px"],
              height: ["132px", "140px", "126px", "136px", "132px"],
              borderRadius: [
                "50%",
                "53% 47% 49% 51% / 48% 52% 50% 50%",
                "49% 51% 53% 47% / 52% 48% 49% 51%",
                "52% 48% 50% 50% / 47% 53% 51% 49%",
                "50%",
              ],
            }}
            transition={{
              duration: breathSpeed * 1.45,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute rounded-full"
            style={{
              left: "50%",
              top: "50%",
              width: "58px",
              height: "58px",
              background: "radial-gradient(circle at 42% 40%, rgba(255, 145, 156, 0.72) 0%, rgba(255, 98, 114, 0.46) 42%, rgba(255, 92, 108, 0.14) 78%, transparent 100%)",
              filter: "blur(4px)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              width: ["58px", "64px", "54px", "61px", "58px"],
              height: ["58px", "64px", "54px", "61px", "58px"],
              opacity: [0.62, 0.76, 0.58, 0.7, 0.62],
            }}
            transition={{
              duration: breathSpeed * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute rounded-full"
            style={{
              left: "46%",
              top: "45%",
              width: "24px",
              height: "24px",
              background: "radial-gradient(circle, rgba(255, 190, 196, 0.9) 0%, rgba(255, 160, 170, 0.3) 68%, transparent 100%)",
              filter: "blur(2px)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              x: [0, 2, -1, 1, 0],
              y: [0, 1, -2, 1, 0],
              opacity: [0.58, 0.76, 0.52, 0.7, 0.58],
              scale: [1, 1.08, 0.94, 1.03, 1],
            }}
            transition={{
              duration: breathSpeed * 1.05,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
