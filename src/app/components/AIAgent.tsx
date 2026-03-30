import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

interface AIAgentProps {
  currentPage: string;
}

export default function AIAgent({ currentPage }: AIAgentProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      
      // Subtle follow behavior - only move 10% of the way to mouse
      mouseX.set(clientX * 0.05);
      mouseY.set(clientY * 0.05);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Agent personality changes per page
  const getAgentConfig = () => {
    switch (currentPage) {
      case "/":
        return {
          color: "rgba(255, 255, 255, 0.8)",
          glowColor: "rgba(255, 255, 255, 0.4)",
          size: 120,
          blur: 60,
          position: { top: "20%", right: "15%" },
          pulseSpeed: 3,
        };
      case "/lab":
        return {
          color: "rgba(0, 255, 255, 0.8)",
          glowColor: "rgba(0, 255, 255, 0.4)",
          size: 100,
          blur: 80,
          position: { top: "30%", right: "20%" },
          pulseSpeed: 4,
        };
      case "/projects":
        return {
          color: "rgba(255, 0, 100, 0.8)",
          glowColor: "rgba(255, 0, 100, 0.4)",
          size: 140,
          blur: 70,
          position: { top: "25%", right: "10%" },
          pulseSpeed: 2,
        };
      case "/contact":
        return {
          color: "rgba(255, 100, 255, 0.8)",
          glowColor: "rgba(255, 100, 255, 0.4)",
          size: 90,
          blur: 90,
          position: { top: "35%", right: "25%" },
          pulseSpeed: 5,
        };
      default:
        return {
          color: "rgba(255, 255, 255, 0.8)",
          glowColor: "rgba(255, 255, 255, 0.4)",
          size: 120,
          blur: 60,
          position: { top: "20%", right: "15%" },
          pulseSpeed: 3,
        };
    }
  };

  const config = getAgentConfig();

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        ...config.position,
        x,
        y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Core orb */}
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: config.pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            width: config.size,
            height: config.size,
            background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`,
            filter: `blur(${config.blur}px)`,
          }}
        />
        
        {/* Inner core */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            width: config.size * 0.4,
            height: config.size * 0.4,
            left: "30%",
            top: "30%",
            background: config.color,
            filter: "blur(10px)",
          }}
        />

        {/* Subtle ring */}
        <motion.div
          className="absolute inset-0 rounded-full border"
          style={{
            width: config.size * 0.6,
            height: config.size * 0.6,
            left: "20%",
            top: "20%",
            borderColor: config.color,
            borderWidth: "1px",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: config.pulseSpeed * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
