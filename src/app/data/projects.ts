export interface ProjectEntry {
  slug: string;
  name: string;
  track: "One Shot" | "One Door" | "One Game";
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  capabilities: string[];
  useCases: string[];
  optionalMedia?: {
    imageUrls?: string[];
    videoUrls?: string[];
  };
  status?: string;
}

export const projects: ProjectEntry[] = [
  {
    slug: "magiccube",
    name: "MagicCube",
    track: "One Shot",
    tagline: "A dynamic interactive capture system for high-impact on-site content.",
    shortDescription:
      "MagicCube transforms physical space into an interactive capture system for offline events and activations.",
    fullDescription:
      "Combining virtual production with automated capture systems, MagicCube generates fast, high-impact, shareable content on site. It exists to turn event participation into immediate media output without separating spectacle from production.",
    capabilities: [
      "Virtual production",
      "Automated capture",
      "On-site content generation",
      "Interactive event experience",
    ],
    useCases: [
      "Brand activations",
      "Offline campaigns",
      "Event installations",
      "Audience participation content",
    ],
    status: "Active",
    optionalMedia: {
      imageUrls: ["/media/projects/magiccube/magiccube_cover.png"],
      videoUrls: ["/media/projects/magiccube/magiccube_demo.mp4"],
    },
  },
  {
    slug: "smart-video-booth",
    name: "Smart Video Booth",
    track: "One Shot",
    tagline: "A 360° booth experience built for instant motion content.",
    shortDescription:
      "Smart Video Booth captures immersive short-form video in a compact interactive setup.",
    fullDescription:
      "Built around a 360° video booth format, Smart Video Booth creates polished motion content in a small footprint. It exists to give events and public activations a faster, more immersive alternative to standard photo booths, with video output ready to share almost immediately.",
    capabilities: [
      "360° video capture",
      "Interactive booth design",
      "Instant media output",
      "Event-ready content production",
    ],
    useCases: [
      "Pop-up activations",
      "Brand events",
      "Social media content capture",
      "Audience engagement moments",
    ],
    status: "Active",
    optionalMedia: {
      imageUrls: ["/media/projects/smart-video-booth/cover.jpg"],
      videoUrls: ["/media/projects/smart-video-booth/demo.mp4"],
    },
  },
  {
    slug: "morphe",
    name: "Morphe",
    track: "One Shot",
    tagline: "A real-time transformation system for live visual interaction.",
    shortDescription:
      "Morphe turns participant input into immediate visual transformation through a live capture and generation pipeline.",
    fullDescription:
      "Morphe is built as a real-time input/output system: it captures a participant, processes visual signals through an AI transformation engine, and returns a reshaped image or moving visual almost immediately. It exists to make transformation legible as a live event rather than a hidden post-production step.",
    capabilities: [
      "Real-time capture",
      "AI-driven visual transformation",
      "Live input/output processing",
      "Interactive media generation",
    ],
    useCases: [
      "Interactive exhibitions",
      "Media art activations",
      "Public-facing installations",
      "Creative technology showcases",
    ],
    status: "Active",
    optionalMedia: {
      videoUrls: [
    "/media/projects/morphe/demo1.mp4",
    "/media/projects/morphe/demo2.mp4",
     ],
    },
  },
  {
    slug: "ai-snapshot",
    name: "AI Snapshot",
    track: "One Shot",
    tagline: "Instant themed portraits through AI stylization.",
    shortDescription:
      "AI Snapshot creates high-quality portraits with cross-era costume transformation and visual stylization.",
    fullDescription:
      "Using AI stylization algorithms, AI Snapshot enables instant portrait transformation across eras, costumes, and image styles. It is designed as an intuitive interactive experience that produces polished, highly shareable themed portraits.",
    capabilities: [
      "AI stylization",
      "Portrait generation",
      "Theme-based transformation",
      "Live interactive capture",
    ],
    useCases: [
      "Public activations",
      "Immersive pop-ups",
      "Portrait experiences",
      "Shareable social content",
    ],
    status: "Active",
    optionalMedia: {
    imageUrls: [
      "/media/projects/ai-snapshot/cover.jpg",
      ],
    },
  },
  {
    slug: "my-keywords",
    name: "MY Keywords",
    track: "One Shot",
    tagline: "Personal keywords turned into collectible digital identity outputs.",
    shortDescription:
      "MY Keywords transforms playful interaction into personalized keyword-based digital identity artifacts.",
    fullDescription:
      "Through a light interactive process, MY Keywords generates tailored keyword combinations and turns them into exclusive digital identity outputs. The results can also be printed as collectible souvenirs, bridging interaction, self-description, and take-away design.",
    capabilities: [
      "Keyword generation",
      "Personalized interaction",
      "Digital identity visualization",
      "Printable souvenir output",
    ],
    useCases: [
      "Events",
      "Interactive installations",
      "Audience personalization",
      "Collectible identity experiences",
    ],
    status: "Active",
    optionalMedia: {
    imageUrls: [
      "/media/projects/my-keywords/cover.jpg",
      ],
    },    
  },
  {
    slug: "plotbot",
    name: "PlotBot",
    track: "One Shot",
    tagline: "A robotic drawing and engraving system linked to AI image generation.",
    shortDescription:
      "PlotBot converts AI-generated imagery into physical marks through a robotic drawing and engraving process.",
    fullDescription:
      "PlotBot connects AI image generation with a robotic output system that can draw or engrave selected results onto physical surfaces. It exists to give generated images material presence, turning screen-based output into an observable making process and a tangible artifact.",
    capabilities: [
      "AI image generation workflow",
      "Robotic drawing",
      "Robotic engraving",
      "Digital-to-physical output",
    ],
    useCases: [
      "Interactive installations",
      "Creative technology showcases",
      "Live fabrication demos",
      "Custom physical image output",
    ],
    status: "Active",
    optionalMedia: {
      videoUrls: [
    "/media/projects/plotbot/Demo1.mp4",
    "/media/projects/plotbot/Demo2.mp4",
     ],
    },
  },
  {
    slug: "dream-port",
    name: "Dream Port",
    track: "One Door",
    tagline: "An immersive virtual travel hub for zero-distance exploration.",
    shortDescription:
      "Dream Port combines a 360° VR system with a multi-axis motion platform to simulate travel to remote environments.",
    fullDescription:
      "Dream Port is an immersive travel experience that allows participants to explore destinations such as Antarctica and the Sahara without physical distance or conventional travel cost. By combining 360° VR content with a multi-axis motion platform, it creates a stronger sense of movement, place, and environmental transition.",
    capabilities: [
      "360° VR experience",
      "Multi-axis motion simulation",
      "Immersive destination playback",
      "Accessible virtual travel design",
    ],
    useCases: [
      "Public installations",
      "Travel simulation",
      "Immersive education",
      "Exhibition experiences",
    ],
    status: "Active",
    optionalMedia: {
      imageUrls: ["/media/projects/dreamport/cover.png"],
      videoUrls: ["/media/projects/dreamport/demo.mp4"],
    },
  },
  {
    slug: "2050-stage",
    name: "2050 Stage",
    track: "One Door",
    tagline: "A stage reimagined as a living interactive environment.",
    shortDescription:
      "2050 Stage transforms the conventional stage into a responsive system for live performance and media orchestration.",
    fullDescription:
      "Built with a game-engine-based workflow, 2050 Stage turns the stage into an active container where digital presence, lighting, choreography, music, and media content can be coordinated in real time. It functions as a large-scale entry point into a new kind of performance environment.",
    capabilities: [
      "Interactive stage design",
      "Real-time media orchestration",
      "Game-engine-driven control",
      "Hybrid performance environment",
    ],
    useCases: [
      "Live shows",
      "Experimental stage productions",
      "Immersive performances",
      "Media-integrated events",
    ],
    status: "Completed",
    optionalMedia: {
      imageUrls: ["/media/projects/2050-stage/cover.png","/media/projects/2050-stage/detail.jpg"],
      videoUrls: ["/media/projects/2050-stage/demo.mp4"],
    },
  },
  {
    slug: "sounds-and-sweet-airs",
    name: "Sounds, and Sweet Airs",
    track: "One Door",
    tagline: "A responsive sound installation built from recycled everyday materials.",
    shortDescription:
      "Sounds, and Sweet Airs creates mechanical sound-making species that respond to the environment through sensors and movement.",
    fullDescription:
      "Sounds, and Sweet Airs is an interactive installation in which sound-producing mechanical forms are built from recycled everyday materials. Using sensors and environmental input, these machine-like species respond to changing conditions and human presence, drawing attention to the disappearance of natural atmosphere within urbanized life.",
    capabilities: [
      "Sensor-driven interaction",
      "Mechanical sound systems",
      "Recycled material construction",
      "Environment-responsive installation design",
    ],
    useCases: [
      "Interactive exhibitions",
      "Sound art installations",
      "Public cultural programs",
      "Environment-focused experiences",
    ],
    status: "Completed",
      optionalMedia: {
      imageUrls: ["/media/projects/sounds-and-sweet-airs/cover.jpg"],
      videoUrls: ["/media/projects/sounds-and-sweet-airs/demo.mp4"],
    },
  },
  {
    slug: "ai-gadgets",
    name: "AI Gadgets",
    track: "One Game",
    tagline: "Playful AI objects that make machine behavior tangible.",
    shortDescription:
      "AI Gadgets turns AI interaction into small-scale physical experiences that people can directly trigger and explore.",
    fullDescription:
      "AI Gadgets is a collection of compact interactive objects that gives AI a physical, approachable form. It exists to move AI out of abstract interfaces and into playful everyday encounters, where people can understand system behavior through touch, reaction, and repeated use.",
    capabilities: [
      "Embodied AI interaction",
      "Interactive object design",
      "Playful prototyping",
      "Small-scale experience design",
    ],
    useCases: [
      "Exhibitions",
      "Tech-art showcases",
      "Interactive product prototypes",
      "Hands-on AI demonstrations",
    ],
    status: "Active",
       optionalMedia: {
      videoUrls: ["/media/projects/ai-gadgets/demo.mp4"],
    },
  },
  {
    slug: "play-with-machines",
    name: "Play With Machines",
    track: "One Game",
    tagline: "A playful meeting point between humans, AI, and machines.",
    shortDescription:
      "Play With Machines stages interaction as play, inviting people to engage with machine behavior directly.",
    fullDescription:
      "Play With Machines is built around the idea that humans, AI, and machines can meet most naturally through play. It creates interactive situations where machine logic, response, and physical behavior become legible through direct participation rather than instruction.",
    capabilities: [
      "Human-machine interaction",
      "Play-based experience design",
      "Interactive system behavior",
      "Tech-art engagement formats",
    ],
    useCases: [
      "Interactive exhibitions",
      "Public engagement programs",
      "Creative technology showcases",
      "Educational play experiences",
    ],
    status: "Active",
      optionalMedia: {
      imageUrls: ["/media/projects/play-with-machines/cover.jpg"],
      videoUrls: ["/media/projects/play-with-machines/demo.mp4"],
    },
  },
  {
    slug: "customized-board-games",
    name: "Customized Board Games",
    track: "One Game",
    tagline: "Tailored game mechanics for brands, events, and public spaces.",
    shortDescription:
      "Customized Board Games uses board games as a flexible medium for context-specific interaction and play.",
    fullDescription:
      "Using board games as a customizable interactive format, this project develops tailored rule systems, mechanics, and experience frameworks for different settings. It adapts play to brand, event, and spatial context rather than forcing every audience into a fixed game model.",
    capabilities: [
      "Custom game mechanics",
      "Experience framework design",
      "Context-specific interaction",
      "Playable format development",
    ],
    useCases: [
      "Brand events",
      "Public installations",
      "Educational programs",
      "Custom participatory experiences",
    ],
    status: "Active",
    optionalMedia: {
      imageUrls: ["/media/projects/customized-board-games/cover.jpg"],
    },
  },
];
