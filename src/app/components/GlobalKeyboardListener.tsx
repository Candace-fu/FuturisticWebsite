import { useEffect } from "react";
import { useSystem } from "../context/SystemContext";

/**
 * GlobalKeyboardListener - Handles global keyboard shortcuts
 * 
 * Tab Key: Toggle Fun Agent panel expand/collapse
 */
export default function GlobalKeyboardListener() {
  const { togglePanel, isPanelExpanded } = useSystem();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab key: Toggle Fun Agent panel
      if (e.key === "Tab") {
        e.preventDefault(); // Prevent default tab navigation
        togglePanel();
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [togglePanel]);

  // This component doesn't render anything
  return null;
}
