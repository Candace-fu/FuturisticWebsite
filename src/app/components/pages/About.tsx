import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import OrganicAgent from "../OrganicAgent";
import SystemStatus from "../SystemStatus";
import { useSystem } from "../../context/SystemContext";

interface SystemKey {
  id: string;
  key: string;
  title: string;
  fullName: string;
  role: string;
  additionalInfo: string;
  glowColor: string;
  energyBalance: number;
  activityLevel: number;
  coherence: number;
  agentCommentary: string;
}

// Full QWERTY keyboard layout (3 rows)
const keyboardLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export default function About() {
  const { systemState, setDialogueMessage } = useSystem();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Active system keys (team members)
  const systemKeys: SystemKey[] = [
    {
      id: "j",
      key: "J",
      title: "Difference",
      fullName: "Ji Zhao",
      role: "Systems Engineer / Robotics",
      additionalInfo: "playing...",
      glowColor: "rgba(239, 68, 68, 0.6)",
      energyBalance: 35,
      activityLevel: 65,
      coherence: 75,
      agentCommentary: "Difference is how new worlds begin.\n\nWithout deviation, everything becomes repetition. This key unlocks the ability to see beyond convention—to notice the gaps, the contradictions, the overlooked spaces where innovation lives. It's not about being contrarian. It's about having the courage to see differently when everyone else has agreed to look the same way.\n\nDifference doesn't ask permission. It simply sees what is—not what should be.",
    },
    {
      id: "f",
      key: "F",
      title: "Illusion",
      fullName: "Candace Fu",
      role: "Designer / Storyteller",
      additionalInfo: "More info found at fuqianhua.cn",
      glowColor: "rgba(6, 182, 212, 0.6)",
      energyBalance: 65,
      activityLevel: 80,
      coherence: 70,
      agentCommentary: "Illusion is the foundation of all interfaces.\n\nEvery screen you touch is a carefully constructed fiction—pixels pretending to be buttons, lights pretending to be depth. This key unlocks the ability to make the impossible feel inevitable. To create experiences so coherent that users forget they're interacting with code.\n\nThe best illusions don't deceive—they reveal new truths. They show you what could be, so clearly you believe it already is.",
    },
    {
      id: "n",
      key: "N",
      title: "Spirit",
      fullName: "Nonghua Lim",
      role: "Sound Artist / CEO",
      additionalInfo: "thinking...",
      glowColor: "rgba(168, 85, 247, 0.6)",
      energyBalance: 50,
      activityLevel: 45,
      coherence: 90,
      agentCommentary: "Spirit is what transforms tools into companions.\n\nThis key unlocks the ability to encode emotion into logic, to make systems feel rather than just function. It's the difference between a chatbot that responds and one that understands. Between an interface that works and one that cares.\n\nSpirit doesn't mean sentience—it means designing with empathy as the primary constraint. Every interaction becomes a moment of recognition, not just transaction.",
    },
    {
      id: "w",
      key: "W",
      title: "Adventure",
      fullName: "Wenyu Wu",
      role: "Archeology / Pet-friendly",
      additionalInfo: "writing...",
      glowColor: "rgba(255, 255, 255, 0.6)",
      energyBalance: 55,
      activityLevel: 85,
      coherence: 55,
      agentCommentary: "Adventure is the engine of discovery.\n\nThis key unlocks the willingness to move into unknown territory without a map. To treat uncertainty as invitation rather than threat. Systems built with adventure don't guide users—they invite them to explore. Every interaction becomes a choice, every choice a small act of courage.\n\nThe best interfaces feel like playgrounds, not highways. They trust you to find your own path, knowing that getting lost is sometimes the point.",
    },
    {
      id: "g",
      key: "G",
      title: "Precise",
      fullName: "Peng Gao",
      role: "Craftsman / Modeling",
      additionalInfo: "",
      glowColor: "rgba(34, 197, 94, 0.6)",
      energyBalance: 40,
      activityLevel: 70,
      coherence: 95,
      agentCommentary: "Precision is where vision becomes reality.\n\nThis key unlocks the discipline to manifest ideas with absolute fidelity. Every pixel aligned, every timing curve intentional, every state transition choreographed. Precision isn't perfectionism—it's respect for the craft.\n\nThe difference between 'good enough' and 'exactly right' is often invisible until you experience it. Then it becomes everything. Precision is the gift of knowing that invisible difference matters.",
    },
  ];

  // Map active keys by letter
  const activeKeysMap = new Map(systemKeys.map(k => [k.key, k]));

  // Check if a key is active
  const isKeyActive = (letter: string) => activeKeysMap.has(letter);

  // Get key data
  const getKeyData = (letter: string) => activeKeysMap.get(letter);

  // Calculate popup position based on key location
  const getPopupPosition = (letter: string, rowIndex: number, keyIndex: number, rowLength: number) => {
    // Determine horizontal position (left or right of key)
    const isLeftHalf = keyIndex < Math.floor(rowLength / 2);
    
    // Position classes
    let horizontalClass = isLeftHalf ? "left-full ml-2" : "right-full mr-2";
    let verticalClass = "top-1/2 -translate-y-1/2"; // Vertically centered with key
    let arrowClass = isLeftHalf 
      ? "-left-1.5 top-1/2 -translate-y-1/2 rotate-45 border-l border-b" // Arrow pointing left
      : "-right-1.5 top-1/2 -translate-y-1/2 rotate-45 border-r border-t"; // Arrow pointing right
    
    return { verticalClass, horizontalClass, arrowClass };
  };

  const handleKeyHover = (letter: string) => {
    if (isKeyActive(letter)) {
      setHoveredKey(letter.toLowerCase());
    }
  };

  const handleKeyLeave = () => {
    setHoveredKey(null);
  };

  const handleKeyClick = (letter: string) => {
    const keyData = getKeyData(letter);
    if (!keyData) return;

    setActiveKey(keyData.id);

    // Fun Agent comments on the KEY FUNCTION, not a person
    setDialogueMessage({
      id: `fun-agent-key-${keyData.id}-${Date.now()}`,
      text: keyData.agentCommentary,
      speaker: "Fun Agent",
      speakerInitial: "⚡",
      speakerColor: keyData.glowColor,
      timestamp: Date.now(),
      context: keyData.title,
      responses: [
        `Tell me more about ${keyData.title}`,
        "How does this key work?",
        "Show me another key",
      ],
    });
  };

  // Get active key data for particle system
  const activeKeyData = systemKeys.find((k) => k.id === activeKey);
  const hoveredKeyData = hoveredKey ? systemKeys.find((k) => k.id === hoveredKey) : null;

  // Close popup when clicking outside
  const handleClosePopup = () => {
    setHoveredKey(null);
  };

  return (
    <div className="relative min-h-screen pt-32 pb-32 px-8">
      {/* Background particle system - responds to active key */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none z-0"
        animate={{
          opacity: hoveredKey ? 0.25 : 0.12,
          scale: activeKey ? 1.1 : 1,
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <OrganicAgent
          energyBalance={activeKeyData?.energyBalance || systemState.energyBalance}
          activityLevel={activeKeyData?.activityLevel || systemState.activityLevel}
          coherence={activeKeyData?.coherence || systemState.coherence}
          orbit={systemState.orbit}
          glowIntensity={systemState.glowIntensity * (hoveredKey ? 0.7 : 0.4)}
          motionSpeed={systemState.motionSpeed}
        />
      </motion.div>

      {/* System Status */}
      <SystemStatus />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-20 text-center"
        >
          <h1 className="text-6xl md:text-7xl font-extralight tracking-tight mb-6 leading-tight">
            <span className="text-white">MEET THE</span>
            <br />
            <span className="text-cyan-400">KEYS OF PILLS.FUN</span>
          </h1>
          <p className="text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
            Each key unlocks a way of seeing, building, and feeling the unseen.
          </p>
        </motion.div>

        {/* Full Keyboard Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mb-16"
        >
          {/* Keyboard Container - seamless with background */}
          <div className="relative p-12">
            {/* Keyboard rows */}
            <div className="relative z-10 flex flex-col items-center gap-8">
              {keyboardLayout.map((row, rowIndex) => (
                <div
                  key={`row-${rowIndex}`}
                  className="flex gap-3 justify-center"
                  style={{
                    paddingLeft: rowIndex === 1 ? "1.5rem" : rowIndex === 2 ? "3rem" : "0",
                  }}
                >
                  {row.map((letter, keyIndex) => {
                    const isActive = isKeyActive(letter);
                    const keyData = getKeyData(letter);
                    const isHovered = hoveredKey === letter.toLowerCase();
                    const isCurrentActive = activeKey === letter.toLowerCase();
                    const popupPosition = getPopupPosition(letter, rowIndex, keyIndex, row.length);

                    return (
                      <motion.div
                        key={`${letter}-${keyIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + rowIndex * 0.1 + keyIndex * 0.02,
                        }}
                        className="flex flex-col items-center"
                      >
                        {/* Individual Key */}
                        <motion.button
                          className={`relative w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden
                            ${isActive ? "cursor-pointer" : "cursor-default"}`}
                          style={{
                            background: isActive 
                              ? "rgba(0, 0, 0, 0.6)" 
                              : "rgba(0, 0, 0, 0.3)",
                            backdropFilter: "blur(10px)",
                          }}
                          animate={{
                            borderColor: isActive
                              ? isHovered || isCurrentActive
                                ? keyData?.glowColor
                                : "rgba(255, 255, 255, 0.15)"
                              : "rgba(255, 255, 255, 0.05)",
                            boxShadow: isActive && (isHovered || isCurrentActive)
                              ? `0 0 30px ${keyData?.glowColor}, inset 0 0 15px ${keyData?.glowColor}20`
                              : "none",
                            scale: isHovered ? 1.05 : 1,
                            y: isHovered ? -2 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          whileTap={isActive ? { scale: 0.95, y: 1 } : {}}
                          onMouseEnter={() => handleKeyHover(letter)}
                          onMouseLeave={handleKeyLeave}
                          onClick={() => handleKeyClick(letter)}
                          disabled={!isActive}
                        >
                          {/* Border */}
                          <div
                            className="absolute inset-0 rounded-xl"
                            style={{
                              border: `1px solid ${
                                isActive && (isHovered || isCurrentActive) && keyData
                                  ? keyData.glowColor
                                  : isActive
                                  ? "rgba(255, 255, 255, 0.15)"
                                  : "rgba(255, 255, 255, 0.05)"
                              }`,
                            }}
                          />

                          {/* Background glow for active keys */}
                          {isActive && keyData && (
                            <motion.div
                              className="absolute inset-0"
                              style={{
                                background: `radial-gradient(circle at 50% 50%, ${keyData.glowColor} 0%, transparent 70%)`,
                              }}
                              animate={{
                                opacity: isHovered || isCurrentActive ? 0.3 : 0.1,
                              }}
                              transition={{ duration: 0.4 }}
                            />
                          )}

                          {/* Pulsing animation for active keys */}
                          {isActive && keyData && !isHovered && !isCurrentActive && (
                            <motion.div
                              className="absolute inset-0 rounded-xl"
                              style={{
                                border: `1px solid ${keyData.glowColor}`,
                              }}
                              animate={{
                                opacity: [0.3, 0.6, 0.3],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          )}

                          {/* Letter */}
                          <motion.span
                            className="relative z-10 text-2xl font-light tracking-wider"
                            style={{
                              color: isActive ? "white" : "rgba(255, 255, 255, 0.15)",
                            }}
                            animate={{
                              textShadow:
                                isActive && (isHovered || isCurrentActive) && keyData
                                  ? `0 0 15px ${keyData.glowColor}`
                                  : "none",
                              scale: isHovered ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {letter}
                          </motion.span>

                          {/* Active indicator for clicked keys */}
                          {isCurrentActive && keyData && (
                            <motion.div
                              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                              style={{
                                background: keyData.glowColor,
                                boxShadow: `0 0 8px ${keyData.glowColor}`,
                              }}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.button>

                        {/* Compact Popup - Adjacent to Key */}
                        <AnimatePresence>
                          {isActive && isHovered && keyData && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                              className={`absolute ${popupPosition.verticalClass} ${popupPosition.horizontalClass} w-64 z-50 pointer-events-none`}
                            >
                              <div
                                className="relative bg-black/90 backdrop-blur-xl border rounded-xl p-4"
                                style={{
                                  borderColor: keyData.glowColor,
                                  boxShadow: `0 0 30px ${keyData.glowColor}20, inset 0 1px 0 rgba(255,255,255,0.05)`,
                                }}
                              >
                                {/* Subtle glow overlay */}
                                <motion.div
                                  className="absolute inset-0 rounded-xl pointer-events-none"
                                  style={{
                                    background: `radial-gradient(circle at 50% 0%, ${keyData.glowColor}, transparent 70%)`,
                                  }}
                                  animate={{
                                    opacity: [0.1, 0.2, 0.1],
                                  }}
                                  transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                />

                                {/* Content */}
                                <div className="relative z-10 space-y-2">
                                  {/* Full Name */}
                                  <h3 className="text-base font-light text-white tracking-wide">
                                    {keyData.fullName}
                                  </h3>

                                  {/* Title Word */}
                                  <p
                                    className="text-sm font-light tracking-widest uppercase"
                                    style={{ color: keyData.glowColor }}
                                  >
                                    {keyData.title}
                                  </p>

                                  {/* Role */}
                                  <p className="text-xs text-white/50 font-light leading-relaxed">
                                    {keyData.role}
                                  </p>

                                  {/* Additional Info */}
                                  {keyData.additionalInfo && (
                                    <p className="text-xs text-white/40 font-light">
                                      {keyData.additionalInfo}
                                    </p>
                                  )}
                                </div>

                                {/* Arrow pointer */}
                                <div
                                  className={`absolute ${popupPosition.arrowClass} w-3 h-3`}
                                  style={{
                                    background: "black",
                                  }}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Active key count indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute bottom-0 right-0 flex items-center gap-2"
            >
              <div className="flex gap-1">
                {systemKeys.map((key) => (
                  <motion.div
                    key={key.id}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: key.glowColor }}
                    animate={{
                      opacity: activeKey === key.id ? 1 : 0.4,
                      scale: activeKey === key.id ? 1.3 : 1,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-white/30 tracking-wider">
                {systemKeys.length} / {keyboardLayout.flat().length} ACTIVE
              </span>
            </motion.div>
          </div>

          {/* Instruction hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-white/30 tracking-wider">
              HOVER TO PREVIEW · CLICK TO UNLOCK
            </p>
          </motion.div>
        </motion.div>

        {/* System Philosophy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="text-center border-t border-white/10 pt-16"
        >
          <p className="text-2xl md:text-3xl font-extralight text-white/40 leading-relaxed max-w-3xl mx-auto">
            "This is not a team introduction.
            <br />
            <span className="text-white/60">
              This is a system revealing its components.
            </span>
            <br />
            Each key is a function.
            <br />
            <span className="text-cyan-400/60">
              Each function unlocks a world."
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}