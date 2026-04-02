import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import { projects, type ProjectEntry } from "@/app/data/projects";
import OrganicAgent from "../OrganicAgent";
import SystemStatus from "../SystemStatus";
import { useSystem } from "../../context/SystemContext";

const trackThemeMap: Record<
  ProjectEntry["track"],
  { gradientFrom: string; gradientTo: string; glowColor: string; energy: number; activity: number; coherence: number }
> = {
  "One Shot": {
    gradientFrom: "#ef4444",
    gradientTo: "#f97316",
    glowColor: "rgba(239, 68, 68, 0.6)",
    energy: 32,
    activity: 78,
    coherence: 62,
  },
  "One Door": {
    gradientFrom: "#06b6d4",
    gradientTo: "#2563eb",
    glowColor: "rgba(6, 182, 212, 0.6)",
    energy: 68,
    activity: 58,
    coherence: 74,
  },
  "One Game": {
    gradientFrom: "#a855f7",
    gradientTo: "#ec4899",
    glowColor: "rgba(168, 85, 247, 0.6)",
    energy: 52,
    activity: 84,
    coherence: 48,
  },
};

export default function Projects() {
  const { systemState, setDialogueMessage, setEnergyBalance, setActivityLevel, setCoherence } = useSystem();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const handleProjectClick = (project: ProjectEntry) => {
    if (expandedProject === project.slug) {
      setExpandedProject(null);
      setDialogueMessage(null);
      return;
    }

    const theme = trackThemeMap[project.track];
    setExpandedProject(project.slug);
    setEnergyBalance(theme.energy);
    setActivityLevel(theme.activity);
    setCoherence(theme.coherence);

    setDialogueMessage({
      id: `fun-agent-project-${project.slug}-${Date.now()}`,
      text: `${project.name}\n\n${project.tagline}\n\n${project.fullDescription}`,
      speaker: "Fun Agent",
      speakerInitial: "F",
      speakerColor: theme.glowColor,
      timestamp: Date.now(),
      context: project.name,
      responses: [
        `Tell me more about ${project.name}`,
        `What does ${project.track} mean?`,
        "How is this used in real space?",
      ],
    });
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-8">
      <motion.div
        className="fixed top-1/2 right-20 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none z-0"
        animate={{
          opacity: hoveredProject ? 0.25 : 0.15,
          scale: hoveredProject ? 1.1 : 1,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <OrganicAgent
          energyBalance={systemState.energyBalance}
          activityLevel={systemState.activityLevel}
          coherence={systemState.coherence}
          orbit={systemState.orbit}
          glowIntensity={systemState.glowIntensity * (hoveredProject ? 0.65 : 0.5)}
          motionSpeed={systemState.motionSpeed}
        />
      </motion.div>

      <SystemStatus />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-24"
        >
          <h1 className="text-7xl md:text-8xl font-extralight tracking-tight mb-8">
            <span className="text-white">ACTIVE</span>{" "}
            <span className="text-red-400">EXPERIMENTS</span>
          </h1>
          <p className="text-xl text-white/60 font-light max-w-3xl leading-relaxed">
            Ongoing explorations in the space between imagination and reality.
          </p>
        </motion.div>

        <div className="space-y-4">
          {projects.map((project, index) => {
            const theme = trackThemeMap[project.track];
            const isExpanded = expandedProject === project.slug;
            const isHovered = hoveredProject === project.slug;

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="relative overflow-hidden rounded-2xl"
                onMouseEnter={() => setHoveredProject(project.slug)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none z-30"
                  style={{
                    border: `1px solid ${theme.glowColor}`,
                  }}
                  animate={{
                    opacity: isExpanded ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${theme.gradientFrom}25 0%, ${theme.gradientTo}15 100%)`,
                  }}
                  animate={{
                    opacity: isExpanded ? 1 : isHovered ? 0.8 : 0.4,
                  }}
                  transition={{ duration: 0.6 }}
                />

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 20% 50%, ${theme.gradientFrom}20 0%, transparent 60%)`,
                  }}
                  animate={{
                    opacity: isExpanded || isHovered ? 0.6 : 0,
                  }}
                  transition={{ duration: 0.8 }}
                />

                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full z-10"
                  style={{
                    background: `linear-gradient(180deg, ${theme.gradientFrom} 0%, ${theme.gradientTo} 100%)`,
                    boxShadow: `0 0 20px ${theme.glowColor}, 0 0 40px ${theme.glowColor}`,
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: isExpanded || isHovered ? 1 : 0,
                    opacity: isExpanded || isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                <div className="relative flex flex-col">
                  <motion.div
                    onClick={() => handleProjectClick(project)}
                    className="relative py-12 px-8 cursor-pointer flex-shrink-0 z-20"
                    whileHover={{ x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-6 mb-3">
                          <h2 className="text-4xl md:text-5xl font-light text-white tracking-wide">
                            {project.name}
                          </h2>
                          <span className="text-sm text-white/40 tracking-widest">
                            {project.track}
                          </span>
                        </div>
                        <div className="flex items-center gap-8">
                          <span className="text-xs text-white/50 tracking-widest">
                            {project.tagline}
                          </span>
                          <motion.p
                            className="text-white/60 font-light"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: isHovered ? 1 : 0,
                              height: isHovered ? "auto" : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {project.shortDescription}
                          </motion.p>
                        </div>
                      </div>

                      <motion.div
                        animate={{
                          rotate: isExpanded ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown
                          size={28}
                          className={`${isExpanded ? "text-white" : "text-white/40"}`}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1],
                          opacity: { duration: 0.4 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="relative px-8 pb-12">
                          <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                            <div className="space-y-8 pr-4">
                              {(project.optionalMedia?.imageUrls?.[0] || project.optionalMedia?.videoUrls?.[0]) && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 }}
                                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                                >
                                  {project.optionalMedia?.imageUrls?.[0] && (
                                    <div className="rounded-2xl overflow-hidden border border-white/10 relative group">
                                      <img
                                        src={project.optionalMedia.imageUrls[0]}
                                        alt={project.name}
                                        className="w-full h-[300px] object-cover"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                                      <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                                      >
                                        <span className="text-white/80 text-sm tracking-widest">
                                          VIEW IMAGE
                                        </span>
                                      </motion.div>
                                    </div>
                                  )}

                                  {project.optionalMedia?.videoUrls?.map((videoUrl, videoIndex) => (
                                    <div
                                      key={`${project.slug}-video-${videoIndex}`}
                                      className="rounded-2xl overflow-hidden border border-white/10 relative bg-black/20 h-[300px] group"
                                    >
                                      <video
                                        src={videoUrl}
                                        className="w-full h-full object-cover"
                                        controls
                                        controlsList="nodownload noplaybackrate"
                                        disablePictureInPicture
                                        playsInline
                                        preload="metadata"
                                        onContextMenu={(e) => e.preventDefault()}
                                      />

                                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 py-2 pointer-events-none">
                                        <div className="flex items-center gap-2">
                                          <Play size={14} className="text-cyan-400" />
                                          <span className="text-xs text-white/80 tracking-wider">
                                            PROJECT DEMO
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </motion.div>
                              )}

                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                              >
                                <h3 className="text-xs text-white/40 tracking-widest mb-4">
                                  PROJECT OVERVIEW
                                </h3>
                                <p className="text-lg text-white/70 font-light leading-relaxed">
                                  {project.fullDescription}
                                </p>
                              </motion.div>

                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-6 flex-wrap"
                              >
                                {project.status && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-white/40 tracking-widest">STATUS:</span>
                                    <span
                                      className="text-xs tracking-widest font-medium px-3 py-1 rounded-full border"
                                      style={{
                                        color: theme.glowColor,
                                        borderColor: theme.glowColor,
                                        backgroundColor: `${theme.glowColor}10`,
                                      }}
                                    >
                                      {project.status}
                                    </span>
                                  </div>
                                )}

                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-white/40 tracking-widest">TRACK:</span>
                                  <span className="text-xs text-white/60 tracking-wider">{project.track}</span>
                                </div>
                              </motion.div>

                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                              >
                                <h3 className="text-xs text-white/40 tracking-widest mb-4">
                                  CAPABILITIES
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                  {project.capabilities.map((capability, capabilityIndex) => (
                                    <motion.div
                                      key={capability}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.7 + capabilityIndex * 0.05 }}
                                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 tracking-wide hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                                    >
                                      {capability}
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>

                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                              >
                                <h3 className="text-xs text-white/40 tracking-widest mb-4">
                                  USE CASES
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                  {project.useCases.map((useCase, useCaseIndex) => (
                                    <motion.div
                                      key={useCase}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.8 + useCaseIndex * 0.05 }}
                                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 tracking-wide hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                                    >
                                      {useCase}
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>

                              <div className="h-4" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-24 text-center"
        >
          <p className="text-white/30 text-sm tracking-widest">
            MORE EXPERIMENTS COMING SOON
          </p>
        </motion.div>
      </div>
    </div>
  );
}
