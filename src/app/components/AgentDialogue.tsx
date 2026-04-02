import { motion, AnimatePresence, useDragControls, PanInfo } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useSystem } from "../context/SystemContext";
import { Sparkles, X, Minimize2, Send } from "lucide-react";

interface IconPosition {
  edge: "top" | "right" | "bottom" | "left";
  offset: number; // percentage along the edge
}

interface AgentEyeProps {
  compact?: boolean;
  isTyping: boolean;
  flash: boolean;
}

function AgentEye({ compact = false, isTyping, flash }: AgentEyeProps) {
  const shellShadow = flash
    ? "0 0 20px rgba(255, 70, 70, 0.24), inset 0 1px 2px rgba(255,255,255,0.32), inset 0 -4px 10px rgba(0,0,0,0.78)"
    : "0 0 12px rgba(255,255,255,0.05), inset 0 1px 2px rgba(255,255,255,0.28), inset 0 -4px 10px rgba(0,0,0,0.76)";

  const coreShadow = flash
    ? [
        "0 0 18px rgba(255,60,60,0.85), 0 0 34px rgba(255,60,60,0.44)",
        "0 0 28px rgba(255,92,92,1), 0 0 50px rgba(255,72,72,0.74)",
        "0 0 18px rgba(255,60,60,0.85), 0 0 34px rgba(255,60,60,0.44)",
      ]
    : isTyping
      ? [
          "0 0 15px rgba(255,50,50,0.82), 0 0 28px rgba(255,50,50,0.36)",
          "0 0 24px rgba(255,82,82,0.98), 0 0 44px rgba(255,64,64,0.64)",
          "0 0 15px rgba(255,50,50,0.82), 0 0 28px rgba(255,50,50,0.36)",
        ]
      : [
          "0 0 10px rgba(255,42,42,0.62), 0 0 22px rgba(255,42,42,0.24)",
          "0 0 15px rgba(255,52,52,0.78), 0 0 28px rgba(255,52,52,0.32)",
          "0 0 10px rgba(255,42,42,0.62), 0 0 22px rgba(255,42,42,0.24)",
        ];

  return (
    <motion.div
      className={`rounded-full flex items-center justify-center relative ${compact ? "h-12 w-12" : "h-14 w-14"}`}
      animate={{
        scale: flash ? 1.05 : isTyping ? [1, 1.03, 1] : [1, 1.015, 1],
        filter: flash
          ? ["brightness(1.2)", "brightness(1.45)", "brightness(1.1)"]
          : isTyping
            ? ["brightness(1)", "brightness(1.16)", "brightness(1)"]
            : ["brightness(0.98)", "brightness(1.04)", "brightness(0.98)"],
      }}
      transition={{
        duration: flash ? 0.45 : isTyping ? 0.9 : 2.4,
        repeat: flash ? 1 : Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.34), rgba(194,198,205,0.18) 16%, rgba(99,104,112,0.92) 52%, rgba(25,27,31,1) 78%, rgba(8,9,11,1) 100%)",
          boxShadow: shellShadow,
        }}
      />

      <div
        className={`absolute rounded-full ${compact ? "inset-[5px]" : "inset-[6px]"}`}
        style={{
          background:
            "radial-gradient(circle at 42% 35%, rgba(48,50,56,0.96) 0%, rgba(13,14,18,1) 46%, rgba(0,0,0,1) 100%)",
          boxShadow:
            "inset 0 0 10px rgba(255,255,255,0.06), inset 0 0 24px rgba(0,0,0,0.95)",
        }}
      />

      <motion.div
        className={`absolute rounded-full ${compact ? "inset-[12px]" : "inset-[15px]"}`}
        style={{
          background:
            "radial-gradient(circle at 48% 46%, rgba(255,185,185,0.98) 0%, rgba(255,74,74,0.94) 22%, rgba(164,8,8,0.98) 54%, rgba(44,0,0,1) 76%, rgba(0,0,0,1) 100%)",
        }}
        animate={{
          boxShadow: coreShadow,
          scale: flash ? [1, 1.08, 1] : isTyping ? [1, 1.05, 1] : [1, 1.02, 1],
        }}
        transition={{
          duration: flash ? 0.45 : isTyping ? 0.9 : 2.6,
          repeat: flash ? 1 : Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        className={`absolute rounded-full ${compact ? "inset-[19px]" : "inset-[23px]"}`}
        style={{
          background:
            "radial-gradient(circle at 45% 42%, rgba(255,250,250,0.98) 0%, rgba(255,220,220,0.88) 32%, rgba(255,120,120,0.18) 58%, transparent 78%)",
        }}
      />

      <div
        className={`absolute rounded-full rotate-[-28deg] ${compact ? "left-[11px] top-[9px] h-[8px] w-[18px]" : "left-[14px] top-[11px] h-[10px] w-[22px]"}`}
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.32), rgba(255,255,255,0.04))",
          filter: "blur(0.4px)",
        }}
      />

      <div
        className={`absolute rounded-full border ${compact ? "inset-[7px]" : "inset-[9px]"}`}
        style={{
          borderColor: "rgba(255,255,255,0.08)",
        }}
      />
    </motion.div>
  );
}

export default function AgentDialogue() {
  const {
    dialogueMessage,
    setDialogueMessage,
    systemState,
    isPanelExpanded,
    togglePanel,
    collapsePanel,
    expandPanel,
  } = useSystem();
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFullyTyped, setIsFullyTyped] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [lastMessage, setLastMessage] = useState<typeof dialogueMessage>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [avatarFlash, setAvatarFlash] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();

  // Load icon position from localStorage
  const [iconPosition, setIconPosition] = useState<IconPosition>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("agentIconPosition");
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return { edge: "right", offset: 50 }; // Default position
  });

  // Save icon position to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("agentIconPosition", JSON.stringify(iconPosition));
    }
  }, [iconPosition]);

  // Calculate pixel position from edge position
  const getPixelPosition = (position: IconPosition) => {
    if (typeof window === "undefined") {
      return { x: 0, y: 0 }; // Default for SSR
    }

    const padding = 32; // Distance from edge
    const iconSize = 64;

    switch (position.edge) {
      case "top":
        return {
          x: (window.innerWidth * position.offset) / 100 - iconSize / 2,
          y: padding,
        };
      case "right":
        return {
          x: window.innerWidth - padding - iconSize,
          y: (window.innerHeight * position.offset) / 100 - iconSize / 2,
        };
      case "bottom":
        return {
          x: (window.innerWidth * position.offset) / 100 - iconSize / 2,
          y: window.innerHeight - padding - iconSize,
        };
      case "left":
        return {
          x: padding,
          y: (window.innerHeight * position.offset) / 100 - iconSize / 2,
        };
    }
  };

  // Get position style for expanded dialogue
  const getPositionStyle = () => {
    if (typeof window === "undefined") {
      return { bottom: "2rem", left: "50%", transform: "translateX(-50%)" }; // Default for SSR
    }

    // For expanded dialogue, position at bottom-center
    return {
      bottom: "2rem",
      left: "50%",
      transform: "translateX(-50%)",
    };
  };

  // Calculate nearest edge and offset from pixel position
  const snapToEdge = (x: number, y: number): IconPosition => {
    if (typeof window === "undefined") {
      return { edge: "right", offset: 50 }; // Default for SSR
    }

    const w = window.innerWidth;
    const h = window.innerHeight;

    const distances = {
      top: y,
      right: w - x,
      bottom: h - y,
      left: x,
    };

    const nearestEdge = Object.entries(distances).reduce((a, b) =>
      a[1] < b[1] ? a : b
    )[0] as "top" | "right" | "bottom" | "left";

    let offset = 50;
    if (nearestEdge === "top" || nearestEdge === "bottom") {
      offset = (x / w) * 100;
    } else {
      offset = (y / h) * 100;
    }

    // Clamp offset between 10% and 90%
    offset = Math.max(10, Math.min(90, offset));

    return { edge: nearestEdge, offset };
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const x = info.point.x;
    const y = info.point.y;
    const newPosition = snapToEdge(x, y);
    setIconPosition(newPosition);
  };

  // Typing effect
  useEffect(() => {
    if (!dialogueMessage) {
      setTypingText("");
      setIsTyping(false);
      setIsFullyTyped(false);
      return;
    }

    // Store last message for when we reopen
    setLastMessage(dialogueMessage);

    setIsTyping(true);
    setIsFullyTyped(false);
    setTypingText("");

    let index = 0;
    const text = dialogueMessage.text;

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setTypingText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        setIsFullyTyped(true);
        clearInterval(typingInterval);
      }
    }, 30); // Typing speed: 30ms per character

    return () => clearInterval(typingInterval);
  }, [dialogueMessage]);

  // Auto-expand panel when new message arrives
  useEffect(() => {
    if (dialogueMessage && !isPanelExpanded) {
      expandPanel();
    }
  }, [dialogueMessage]);

  useEffect(() => {
    if (!dialogueMessage) return;

    setAvatarFlash(true);
    const flashTimer = window.setTimeout(() => {
      setAvatarFlash(false);
    }, 280);

    return () => window.clearTimeout(flashTimer);
  }, [dialogueMessage?.id]);

  const handleClose = () => {
    setDialogueMessage(null);
    collapsePanel();
    setUserInput("");
  };

  const handleCollapse = () => {
    collapsePanel();
  };

  const handleExpand = () => {
    expandPanel();
    // Restore last message
    if (lastMessage) {
      setDialogueMessage(lastMessage);
    }
  };

  const requestAgentResponse = async (prompt: string) => {
    console.log("before fetch", prompt);
    const response = await fetch("/api/agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: prompt }),
    });
    console.log("after fetch", response.status);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Agent request failed");
    }

    return typeof data?.text === "string" && data.text.trim()
      ? data.text
      : "I received your message, but I do not have a response yet.";
  };

  const handleResponseClick = async (response: string) => {
    console.log("User selected:", response);
    setIsTyping(true);
    setIsFullyTyped(false);

    try {
      const text = await requestAgentResponse(response);
      setDialogueMessage({
        id: `response-${Date.now()}`,
        text,
        timestamp: Date.now(),
      });
    } catch (error) {
      setDialogueMessage({
        id: `response-error-${Date.now()}`,
        text:
          error instanceof Error
            ? error.message
            : "The agent is temporarily unavailable.",
        timestamp: Date.now(),
      });
    }
  };

  const submitPrompt = async () => {
    console.log("submitPrompt start", userInput);
    if (!userInput.trim()) return;

    const prompt = userInput.trim();
    setUserInput("");
    setIsTyping(true);
    setIsFullyTyped(false);

    try {
      const text = await requestAgentResponse(prompt);
      setDialogueMessage({
        id: `user-response-${Date.now()}`,
        text,
        timestamp: Date.now(),
      });
    } catch (error) {
      setDialogueMessage({
        id: `user-response-error-${Date.now()}`,
        text:
          error instanceof Error
            ? error.message
            : "The agent is temporarily unavailable.",
        timestamp: Date.now(),
      });
    }
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitPrompt();
  };

  const showAgentControls = Boolean(dialogueMessage) && isPanelExpanded;

  // Calculate glow color based on energy balance
  const getGlowColor = () => {
    const redIntensity = systemState.energyBalance / 100;
    const cyanIntensity = 1 - redIntensity;

    const red = Math.round(239 * redIntensity + 6 * cyanIntensity);
    const green = Math.round(68 * redIntensity + 182 * cyanIntensity);
    const blue = Math.round(68 * redIntensity + 212 * cyanIntensity);

    return `rgba(${red}, ${green}, ${blue}, 0.5)`;
  };

  // Collapsed floating icon
  if (!isPanelExpanded && lastMessage) {
    const pixelPos = getPixelPosition(iconPosition);

    return (
      <motion.div
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          x: pixelPos.x,
          y: pixelPos.y,
        }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="fixed top-0 left-0 z-50 cursor-pointer"
        style={{
          width: "64px",
          height: "64px",
        }}
      >
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            if (!isDragging) {
              handleExpand();
            }
          }}
          className="relative w-full h-full"
          whileHover={{ scale: isDragging ? 1 : 1.1 }}
          whileTap={{ scale: isDragging ? 1 : 0.95 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <AgentEye compact isTyping={isTyping} flash={avatarFlash} />
          </div>

          {/* Drag hint - appears only on hover when not dragging */}
          {!isDragging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <div className="text-xs text-white/40 tracking-wider px-3 py-1 bg-black/60 rounded-full backdrop-blur-sm">
                DRAG TO REPOSITION
              </div>
            </motion.div>
          )}

          {/* Tab key hint - always visible when not dragging */}
          {!isDragging && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-11 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <div className="flex items-center gap-1.5 text-xs text-cyan-400/60 tracking-wider px-3 py-1.5 bg-black/40 rounded-full backdrop-blur-sm border border-cyan-400/20">
                <kbd className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-[10px] font-mono">TAB</kbd>
                <span>TO EXPAND</span>
              </div>
            </motion.div>
          )}
        </motion.button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {dialogueMessage && isPanelExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          drag
          dragMomentum={false}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          className="fixed z-50 cursor-move w-full max-w-2xl"
          style={getPositionStyle()}
        >
          <motion.div
            className="relative bg-black/80 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-visible"
            style={{
              boxShadow: `
                0 0 40px ${getGlowColor()},
                0 20px 60px rgba(0, 0, 0, 0.8),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            {/* Particle glow effect overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${getGlowColor()}, transparent 70%)`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Content container */}
            <div className="relative p-8 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent rounded-3xl">
              {/* Header controls */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                {/* Tab key hint for collapsed */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-1.5 text-xs text-white/40 tracking-wider px-2 py-1 bg-white/5 rounded-lg mr-2"
                >
                  <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/20 rounded text-[10px] font-mono">TAB</kbd>
                  <span>COLLAPSE</span>
                </motion.div>

                <motion.button
                  onClick={handleCollapse}
                  className="text-white/40 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  title="Minimize"
                >
                  <Minimize2 size={20} strokeWidth={1.5} />
                </motion.button>
                <motion.button
                  onClick={handleClose}
                  className="text-white/40 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  title="Close"
                >
                  <X size={20} strokeWidth={1.5} />
                </motion.button>
              </div>

              {/* Header - Agent icon and name */}
              <div className="flex items-center gap-4 mb-6">
                <AgentEye isTyping={isTyping} flash={avatarFlash} />

                {/* Fun Agent info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={14} className="text-cyan-400" />
                    <span className="text-xs text-white/40 tracking-widest">
                      {isTyping ? "FUN_AGENT_PROCESSING" : "FUN_AGENT"}
                    </span>
                  </div>
                  <div className="text-sm text-white/80 tracking-wide font-light">
                    Pills.Fun System Agent
                  </div>
                  {dialogueMessage.context && (
                    <div className="text-xs text-white/50 tracking-wide mt-1">
                      Commentary: {dialogueMessage.context}
                    </div>
                  )}
                </div>

                {/* Activity indicator */}
                <motion.div
                  className="w-2 h-2 rounded-full bg-cyan-400"
                  animate={{
                    opacity: isTyping ? [1, 0.3, 1] : 1,
                    scale: isTyping ? [1, 1.5, 1] : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isTyping ? Infinity : 0,
                  }}
                />
              </div>

              {/* Dialogue text body */}
              <div className="max-h-[60vh] overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <p className="text-lg text-white/90 font-light leading-relaxed whitespace-pre-line">
                  {typingText}
                  {isTyping && (
                    <motion.span
                      className="inline-block w-0.5 h-5 bg-cyan-400 ml-1 align-middle"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </p>
              </div>

              {/* Optional response buttons */}
              {showAgentControls && dialogueMessage.responses && dialogueMessage.responses.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-3 mb-6"
                >
                  {dialogueMessage.responses.map((response, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleResponseClick(response)}
                      className="px-5 py-2 bg-white/5 border border-white/20 rounded-full text-sm text-white/80 tracking-wide hover:bg-white/10 hover:border-white/40 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {response}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* User input box */}
              {showAgentControls && (
                <motion.form
                  onSubmit={handleUserSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative z-20 pointer-events-auto mb-4"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void submitPrompt();
                      }
                    }}
                    placeholder="Ask the agent something..."
                    className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-3 text-white/90 placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all text-sm"
                  />
                  <motion.button
                    type="button"
                    onClick={() => void submitPrompt()}
                    disabled={false}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                      userInput.trim()
                        ? "text-cyan-400 hover:bg-cyan-400/10"
                        : "text-white/20 cursor-not-allowed"
                    }`}
                    whileHover={userInput.trim() ? { scale: 1.1 } : {}}
                    whileTap={userInput.trim() ? { scale: 0.9 } : {}}
                  >
                    <Send size={18} strokeWidth={2} />
                  </motion.button>
                </motion.form>
              )}
            </div>

            {/* REDESIGNED: Integrated Energy Core Glow - Bottom Edge */}
            <div className="absolute bottom-0 left-0 right-0 z-0 h-20 pointer-events-none overflow-hidden rounded-b-3xl">
              {/* Inner glow - fades upward into panel */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse at 50% 100%, ${getGlowColor()} 0%, transparent 70%),
                    linear-gradient(to top, ${getGlowColor()}, transparent 100%)
                  `,
                  opacity: 0.4,
                }}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Dynamic energy bar - flows with system state */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-2"
                style={{
                  background: `linear-gradient(to right, 
                    rgba(239, 68, 68, 0.8) 0%, 
                    rgba(6, 182, 212, 0.8) 100%
                  )`,
                  boxShadow: `
                    0 0 20px ${getGlowColor()},
                    0 -10px 40px ${getGlowColor()},
                    inset 0 1px 2px rgba(255, 255, 255, 0.3)
                  `,
                }}
                animate={{
                  boxShadow: [
                    `0 0 20px ${getGlowColor()}, 0 -10px 40px ${getGlowColor()}, inset 0 1px 2px rgba(255, 255, 255, 0.3)`,
                    `0 0 30px ${getGlowColor()}, 0 -15px 50px ${getGlowColor()}, inset 0 1px 2px rgba(255, 255, 255, 0.3)`,
                    `0 0 20px ${getGlowColor()}, 0 -10px 40px ${getGlowColor()}, inset 0 1px 2px rgba(255, 255, 255, 0.3)`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Flowing energy indicator */}
                <motion.div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: `linear-gradient(90deg, 
                      transparent 0%, 
                      rgba(255, 255, 255, 0.6) 50%, 
                      transparent 100%
                    )`,
                    width: "30%",
                  }}
                  animate={{
                    x: ["-100%", "400%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Energy balance marker */}
                <motion.div
                  className="absolute top-0 bottom-0 w-1"
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                    left: `${systemState.energyBalance}%`,
                  }}
                  animate={{
                    left: `${systemState.energyBalance}%`,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Outer glow - extends below panel */}
              <motion.div
                className="absolute -bottom-4 left-0 right-0 h-8"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${getGlowColor()} 0%, transparent 100%)`,
                  filter: "blur(8px)",
                  opacity: 0.6,
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
