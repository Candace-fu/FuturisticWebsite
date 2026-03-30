import { createContext, useContext, useState, ReactNode } from "react";

interface SystemState {
  energyBalance: number;
  activityLevel: number;
  coherence: number;
  orbit: number;
  glowIntensity: number;
  motionSpeed: number;
}

export interface DialogueMessage {
  id: string;
  text: string;
  speaker?: string;
  speakerInitial?: string;
  speakerColor?: string;
  timestamp: number;
  responses?: string[];
  context?: string; // What the agent is commenting on (e.g., "Jordan Chen", "Neural Canvas")
  projectDetails?: {
    title: string;
    category: string;
    year: string;
    description: string;
    detailedDescription: string;
    technologies: string[];
    status: string;
    images?: string[];
    videoUrl?: string;
  };
}

interface SystemContextType {
  systemState: SystemState;
  setEnergyBalance: (value: number) => void;
  setActivityLevel: (value: number) => void;
  setCoherence: (value: number) => void;
  setOrbit: (value: number) => void;
  setGlowIntensity: (value: number) => void;
  setMotionSpeed: (value: number) => void;
  setPreset: (preset: "calm" | "balanced" | "active" | "chaos") => void;
  dialogueMessage: DialogueMessage | null;
  setDialogueMessage: (message: DialogueMessage | null) => void;
  isPanelExpanded: boolean;
  togglePanel: () => void;
  expandPanel: () => void;
  collapsePanel: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [systemState, setSystemState] = useState<SystemState>({
    energyBalance: 30, // Red dominant by default
    activityLevel: 50,
    coherence: 60,
    orbit: 70,
    glowIntensity: 60,
    motionSpeed: 50,
  });

  const [dialogueMessage, setDialogueMessage] = useState<DialogueMessage | null>(
    null
  );

  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  const setEnergyBalance = (value: number) => {
    setSystemState((prev) => ({ ...prev, energyBalance: value }));
  };

  const setActivityLevel = (value: number) => {
    setSystemState((prev) => ({ ...prev, activityLevel: value }));
  };

  const setCoherence = (value: number) => {
    setSystemState((prev) => ({ ...prev, coherence: value }));
  };

  const setOrbit = (value: number) => {
    setSystemState((prev) => ({ ...prev, orbit: value }));
  };

  const setGlowIntensity = (value: number) => {
    setSystemState((prev) => ({ ...prev, glowIntensity: value }));
  };

  const setMotionSpeed = (value: number) => {
    setSystemState((prev) => ({ ...prev, motionSpeed: value }));
  };

  const setPreset = (preset: "calm" | "balanced" | "active" | "chaos") => {
    switch (preset) {
      case "calm":
        setSystemState({
          energyBalance: 25,
          activityLevel: 20,
          coherence: 80,
          orbit: 85,
          glowIntensity: 40,
          motionSpeed: 30,
        });
        break;
      case "balanced":
        setSystemState({
          energyBalance: 50,
          activityLevel: 50,
          coherence: 60,
          orbit: 70,
          glowIntensity: 60,
          motionSpeed: 50,
        });
        break;
      case "active":
        setSystemState({
          energyBalance: 70,
          activityLevel: 80,
          coherence: 50,
          orbit: 60,
          glowIntensity: 75,
          motionSpeed: 70,
        });
        break;
      case "chaos":
        setSystemState({
          energyBalance: 50,
          activityLevel: 95,
          coherence: 15,
          orbit: 20,
          glowIntensity: 85,
          motionSpeed: 90,
        });
        break;
    }
  };

  const togglePanel = () => {
    setIsPanelExpanded(!isPanelExpanded);
  };

  const expandPanel = () => {
    setIsPanelExpanded(true);
  };

  const collapsePanel = () => {
    setIsPanelExpanded(false);
  };

  return (
    <SystemContext.Provider
      value={{
        systemState,
        setEnergyBalance,
        setActivityLevel,
        setCoherence,
        setOrbit,
        setGlowIntensity,
        setMotionSpeed,
        setPreset,
        dialogueMessage,
        setDialogueMessage,
        isPanelExpanded,
        togglePanel,
        expandPanel,
        collapsePanel,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (context === undefined) {
    // Return a default context to prevent crashes during development
    console.error("useSystem must be used within a SystemProvider");
    return {
      systemState: {
        energyBalance: 30,
        activityLevel: 50,
        coherence: 60,
        orbit: 70,
        glowIntensity: 60,
        motionSpeed: 50,
      },
      setEnergyBalance: () => {},
      setActivityLevel: () => {},
      setCoherence: () => {},
      setOrbit: () => {},
      setGlowIntensity: () => {},
      setMotionSpeed: () => {},
      setPreset: () => {},
      dialogueMessage: null,
      setDialogueMessage: () => {},
      isPanelExpanded: false,
      togglePanel: () => {},
      expandPanel: () => {},
      collapsePanel: () => {},
    };
  }
  return context;
}