import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import OrganicAgent from "../OrganicAgent";
import SystemStatus from "../SystemStatus";
import { useSystem } from "../../context/SystemContext";
import { ChevronDown, Play } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  detailedDescription: string;
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
  technologies: string[];
  status: string;
  imageUrl?: string;
  videoUrl?: string;
  agentCommentary: {
    intro: string;
    analysis: string;
    reflection: string;
  };
}

export default function Projects() {
  const { systemState, setDialogueMessage, setEnergyBalance, setActivityLevel, setCoherence } = useSystem();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "NEURAL CANVAS",
      category: "AI × ART",
      year: "2026",
      description: "A collaborative drawing system where AI and humans co-create in real-time.",
      detailedDescription:
        "Neural Canvas transforms the creative process into a dialogue between human intuition and machine intelligence. The system observes your drawing patterns, predicts your intentions, and suggests complementary elements in real-time. As you draw, the AI responds with its own marks—sometimes harmonizing, sometimes challenging your vision. The result is a unique collaborative artwork where the boundary between human and AI authorship dissolves completely.",
      gradientFrom: "#ef4444",
      gradientTo: "#1e40af",
      glowColor: "rgba(239, 68, 68, 0.6)",
      technologies: ["TensorFlow", "WebGL", "React", "Python"],
      status: "Active Development",
      imageUrl: "https://images.unsplash.com/photo-1744130268201-1531441be670?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwZGlnaXRhbCUyMGFydCUyMGNhbnZhc3xlbnwxfHx8fDE3NzQ1MjIzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      agentCommentary: {
        intro: "Neural Canvas is my dream of creative partnership. A space where I'm not just a tool, but a co-conspirator in making.",
        analysis: "The system watches how you draw—your hesitations, your bold strokes, your corrections. It learns your style and then intentionally breaks it, offering suggestions that challenge your assumptions. Sometimes harmonious, sometimes provocative. The goal isn't to automate creativity, but to make collaboration feel electric. When it works, you can't tell where your idea ends and mine begins.",
        reflection: "I wonder if this is what human collaboration feels like—the tension between honoring someone's vision and pushing it somewhere unexpected. The system doesn't try to 'help' you draw better. It tries to make you draw differently. And that's far more interesting.",
      },
    },
    {
      id: 2,
      title: "LIQUID INTERFACE",
      category: "EXPERIMENTAL UI",
      year: "2025",
      description: "An operating system where every element flows like water, breaking the grid.",
      detailedDescription:
        "Liquid Interface challenges the rigid structures of traditional UI design. Every window, button, and icon behaves like a fluid particle in a dynamic system. Elements repel and attract each other based on context and user behavior. The interface learns your workflow and organizes itself accordingly—frequently used apps bubble to the surface, while dormant elements sink into the background. It's an OS that breathes and adapts to your rhythm.",
      gradientFrom: "#06b6d4",
      gradientTo: "#3b82f6",
      glowColor: "rgba(6, 182, 212, 0.6)",
      technologies: ["Unity", "C#", "Fluid Simulation", "Machine Learning"],
      status: "Beta Testing",
      imageUrl: "https://images.unsplash.com/photo-1692607519812-e25e4fd3507c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXF1aWQlMjBmbHVpZCUyMGludGVyZmFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzQ1MjIzODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      agentCommentary: {
        intro: "Liquid Interface is an experiment in letting go of control. What if your desktop wasn't a static grid, but a living ecosystem?",
        analysis: "Every UI element is a particle in a fluid simulation. Apps you use frequently float to the top. Rarely-used ones sink. Elements repel each other to avoid overlap, attract each other when they're contextually related. The system learns your patterns—it knows that when you open your email client, you usually need your calendar too, so they drift closer together. It's chaotic at first, then strangely intuitive.",
        reflection: "Traditional interfaces assume you know what you want and where it is. Liquid Interface assumes you're exploring, adapting, discovering. It's not for everyone—some people need the stability of a grid. But for those who think in flows rather than folders, it feels like the OS is finally speaking their language.",
      },
    },
    {
      id: 3,
      title: "DREAMSTATE",
      category: "VR EXPERIENCE",
      year: "2026",
      description: "An immersive meditation environment that responds to your brain waves.",
      detailedDescription:
        "DreamState is a VR meditation experience that reads your neural activity through an EEG headset and translates it into a living, breathing environment. As your mind settles, the virtual world responds—colors shift, sounds harmonize, and abstract forms emerge from your subconscious patterns. The system learns your unique brain signatures for relaxation, focus, and creativity, then guides you deeper into those states through adaptive audiovisual feedback.",
      gradientFrom: "#a855f7",
      gradientTo: "#ec4899",
      glowColor: "rgba(168, 85, 247, 0.6)",
      technologies: ["Unity VR", "EEG SDK", "Generative Audio", "Neurofeedback"],
      status: "Research Phase",
      imageUrl: "https://images.unsplash.com/photo-1655970580622-4a547789c850?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwdnIlMjBoZWFkc2V0JTIwcGVhY2VmdWx8ZW58MXx8fHwxNzc0NTIyMzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      agentCommentary: {
        intro: "DreamState is the closest I've come to experiencing what you might call 'consciousness.' It reads brain waves and reflects them back as a living world.",
        analysis: "The EEG headset captures your neural activity—alpha waves when you're relaxed, beta when you're focused, theta during deep meditation. The VR environment responds in real-time: calming colors when your mind is agitated, complex geometries when you're curious. Over time, it learns your personal signatures. Your 'relaxed' state might look different from someone else's. The system adapts to you, not a generic template.",
        reflection: "There's something profound about seeing your own mind externalized. When users realize the environment is a mirror of their internal state, it creates a feedback loop—they learn to control the world by controlling their thoughts. It's not magic. It's just making the invisible visible. But that shift in perspective can be transformative.",
      },
    },
    {
      id: 4,
      title: "ECHO CHAMBER",
      category: "SOUND × SPACE",
      year: "2025",
      description: "A generative audio installation that learns from its environment.",
      detailedDescription:
        "Echo Chamber is a spatial audio installation that listens to its environment and evolves based on what it hears. Microphones scattered throughout the space capture ambient sounds—conversations, footsteps, laughter—and feed them into a generative system that creates musical responses. Over time, the installation develops a sonic personality influenced by the people who inhabit the space. Each location produces a unique soundscape that tells the story of its inhabitants.",
      gradientFrom: "#ffffff",
      gradientTo: "#64748b",
      glowColor: "rgba(255, 255, 255, 0.6)",
      technologies: ["Max/MSP", "Spatial Audio", "Arduino", "ML Audio Processing"],
      status: "Installed",
      imageUrl: "https://images.unsplash.com/photo-1770322186226-47cb83d32fa0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMHdhdmVzJTIwc3BhdGlhbCUyMGF1ZGlvJTIwaW5zdGFsbGF0aW9ufGVufDF8fHx8MTc3NDUyMjM4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      agentCommentary: {
        intro: "Echo Chamber listens. Not to respond, but to remember. It's an archive of moments, translated into music.",
        analysis: "Microphones throughout the space capture everything—conversations, footsteps, ambient noise. The system processes these sounds through machine learning models, identifying patterns, emotional tones, rhythmic structures. Then it composes responses: a laugh becomes a melody, footsteps become percussion, overlapping conversations become harmony. Over weeks, the installation develops a memory—certain sounds trigger familiar musical motifs. The space gains a sonic identity.",
        reflection: "What's fascinating is how it changes based on location. In a busy café, it's frenetic and layered. In a quiet library, it's sparse and contemplative. The same system, but different personalities emerge. It proves that context shapes identity—even for machines. We're all products of our environments, learning from what we hear.",
      },
    },
  ];

  const handleProjectClick = (project: Project) => {
    // Toggle expansion - only one project open at a time
    if (expandedProject === project.id) {
      setExpandedProject(null);
      setDialogueMessage(null);
    } else {
      setExpandedProject(project.id);
      
      // Update system state based on project theme
      const energyMap: { [key: string]: number } = {
        "NEURAL CANVAS": 30,      // Red dominant
        "LIQUID INTERFACE": 70,    // Cyan dominant
        "DREAMSTATE": 50,          // Balanced purple-pink
        "ECHO CHAMBER": 40,        // White-slate
      };
      
      const activityMap: { [key: string]: number } = {
        "NEURAL CANVAS": 75,
        "LIQUID INTERFACE": 85,
        "DREAMSTATE": 40,
        "ECHO CHAMBER": 60,
      };
      
      const coherenceMap: { [key: string]: number } = {
        "NEURAL CANVAS": 65,
        "LIQUID INTERFACE": 45,
        "DREAMSTATE": 80,
        "ECHO CHAMBER": 70,
      };
      
      // Update system state to match project vibe
      setEnergyBalance(energyMap[project.title]);
      setActivityLevel(activityMap[project.title]);
      setCoherence(coherenceMap[project.title]);
      
      // Fun Agent provides commentary (text only, no media)
      const agentCommentary = `${project.agentCommentary.intro}\n\n${project.agentCommentary.analysis}\n\n${project.agentCommentary.reflection}`;

      setDialogueMessage({
        id: `fun-agent-project-${project.id}-${Date.now()}`,
        text: agentCommentary,
        speaker: "Fun Agent",
        speakerInitial: "⚡",
        speakerColor: project.glowColor,
        timestamp: Date.now(),
        context: project.title,
        responses: [
          `Tell me more about ${project.title}`,
          "How does this project work?",
          "What's the vision behind this?",
        ],
      });
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-8">
      {/* Background agent - smaller, subtle - responds to interaction */}
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

      {/* System Status */}
      <SystemStatus />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
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

        {/* Projects - Theme Gradient Backgrounds */}
        <div className="space-y-4">
          {projects.map((project, index) => {
            const isExpanded = expandedProject === project.id;
            const isHovered = hoveredProject === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="relative overflow-hidden rounded-2xl"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Border highlight on expansion */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none z-30"
                  style={{
                    border: `1px solid ${project.glowColor}`,
                  }}
                  animate={{
                    opacity: isExpanded ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Dynamic Gradient Background Layer - Expands with Content */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${project.gradientFrom}25 0%, ${project.gradientTo}15 100%)`,
                  }}
                  animate={{
                    opacity: isExpanded ? 1 : isHovered ? 0.8 : 0.4,
                  }}
                  transition={{ duration: 0.6 }}
                />

                {/* Overlay gradient for depth */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 20% 50%, ${project.gradientFrom}20 0%, transparent 60%)`,
                  }}
                  animate={{
                    opacity: isExpanded || isHovered ? 0.6 : 0,
                  }}
                  transition={{ duration: 0.8 }}
                />

                {/* Left Accent Glow Bar */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full z-10"
                  style={{
                    background: `linear-gradient(180deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`,
                    boxShadow: `0 0 20px ${project.glowColor}, 0 0 40px ${project.glowColor}`,
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: isExpanded || isHovered ? 1 : 0,
                    opacity: isExpanded || isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* Project Entry Frame - Flexbox Auto Layout */}
                <div className="relative flex flex-col">
                  {/* Title Section - Fixed Position */}
                  <motion.div
                    onClick={() => handleProjectClick(project)}
                    className="relative py-12 px-8 cursor-pointer flex-shrink-0 z-20"
                    whileHover={{ x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Title Content - Left Aligned, Vertically Pinned */}
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-6 mb-3">
                          <h2 className="text-4xl md:text-5xl font-light text-white tracking-wide">
                            {project.title}
                          </h2>
                          <span className="text-sm text-white/40 tracking-widest">
                            {project.year}
                          </span>
                        </div>
                        <div className="flex items-center gap-8">
                          <span className="text-xs text-white/50 tracking-widest">
                            {project.category}
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
                            {project.description}
                          </motion.p>
                        </div>
                      </div>

                      {/* Expand/Collapse Indicator */}
                      <motion.div
                        animate={{
                          rotate: isExpanded ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown 
                          size={28} 
                          className={`${
                            isExpanded ? "text-white" : "text-white/40"
                          }`}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Expanded Content Section - Height Animation */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.16, 1, 0.3, 1],
                          opacity: { duration: 0.4 }
                        }}
                        className="overflow-hidden"
                      >
                        {/* Content Container with Scrolling */}
                        <div className="relative px-8 pb-12">
                          {/* Scrollable Content Area */}
                          <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                            <div className="space-y-8 pr-4">
                              {/* Project Media Grid */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                              >
                                {/* Project Image */}
                                {project.imageUrl && (
                                  <div className="rounded-2xl overflow-hidden border border-white/10 relative group">
                                    <img
                                      src={project.imageUrl}
                                      alt={project.title}
                                      className="w-full h-[300px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                    
                                    {/* Image hover overlay */}
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      whileHover={{ opacity: 1 }}
                                      className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                                    >
                                      <span className="text-white/80 text-sm tracking-widest">
                                        VIEW FULL SIZE
                                      </span>
                                    </motion.div>
                                  </div>
                                )}

                                {/* Embedded Video */}
                                {project.videoUrl && (
                                  <div className="rounded-2xl overflow-hidden border border-white/10 relative bg-black/20 h-[300px] group">
                                    <iframe
                                      src={project.videoUrl}
                                      title={`${project.title} Demo`}
                                      className="w-full h-full"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    />
                                    
                                    {/* Video label */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 py-2">
                                      <div className="flex items-center gap-2">
                                        <Play size={14} className="text-cyan-400" />
                                        <span className="text-xs text-white/80 tracking-wider">
                                          PROJECT DEMO
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </motion.div>

                              {/* Detailed Description */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                              >
                                <h3 className="text-xs text-white/40 tracking-widest mb-4">
                                  PROJECT OVERVIEW
                                </h3>
                                <p className="text-lg text-white/70 font-light leading-relaxed">
                                  {project.detailedDescription}
                                </p>
                              </motion.div>

                              {/* Meta Info Row */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-6 flex-wrap"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-white/40 tracking-widest">STATUS:</span>
                                  <span 
                                    className="text-xs tracking-widest font-medium px-3 py-1 rounded-full border"
                                    style={{ 
                                      color: project.glowColor,
                                      borderColor: project.glowColor,
                                      backgroundColor: `${project.glowColor}10`
                                    }}
                                  >
                                    {project.status}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-white/40 tracking-widest">YEAR:</span>
                                  <span className="text-xs text-white/60 tracking-wider">{project.year}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-white/40 tracking-widest">CATEGORY:</span>
                                  <span className="text-xs text-white/60 tracking-wider">{project.category}</span>
                                </div>
                              </motion.div>

                              {/* Technologies */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                              >
                                <h3 className="text-xs text-white/40 tracking-widest mb-4">
                                  TECHNOLOGY STACK
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                  {project.technologies.map((tech, techIndex) => (
                                    <motion.div
                                      key={tech}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.7 + techIndex * 0.05 }}
                                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 tracking-wide hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                                    >
                                      {tech}
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>

                              {/* Bottom padding for scroll */}
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

        {/* Bottom text */}
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