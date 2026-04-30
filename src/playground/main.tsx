import React from "react";
import { createRoot } from "react-dom/client";
import { CollaborationPage } from "./CollaborationPage";
import "./playground.css";
import "tldraw/tldraw.css";

createRoot(document.getElementById("play-root")!).render(
  <React.StrictMode>
    <CollaborationPage />
  </React.StrictMode>
);
