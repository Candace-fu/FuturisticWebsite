import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Navigation from "./Navigation";
import { SystemProvider } from "../context/SystemContext";
import AgentDialogue from "./AgentDialogue";
import GlobalKeyboardListener from "./GlobalKeyboardListener";

export default function Root() {
  const location = useLocation();

  useEffect(() => {
    // Smooth scroll to top on route change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <SystemProvider>
      <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
        {/* Global keyboard shortcuts */}
        <GlobalKeyboardListener />

        {/* Background ambient glow */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px]" />
        </div>

        {/* Navigation with integrated Pill Icon */}
        <Navigation />

        {/* Main Content */}
        <main className="relative z-10">
          <Outlet />
        </main>

        {/* Global Agent Dialogue Box */}
        <AgentDialogue />

        {/* Footer signature */}
        <footer className="fixed bottom-6 left-8 z-10 text-white/30 text-sm font-light tracking-wider">
          PILLS.FUN © 2026
        </footer>
      </div>
    </SystemProvider>
  );
}
