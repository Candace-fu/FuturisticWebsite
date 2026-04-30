import { useEffect, useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    JitsiMeetExternalAPI?: new (
      domain: string,
      options: Record<string, unknown>
    ) => {
      dispose?: () => void;
      addListener?: (event: string, listener: (...args: unknown[]) => void) => void;
    };
  }
}

interface MeetingPanelProps {
  roomName: string;
  expanded: boolean;
}

const JITSI_SCRIPT = "https://meet.jit.si/external_api.js";

function loadJitsiScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.JitsiMeetExternalAPI) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${JITSI_SCRIPT}"]`
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Jitsi failed to load.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = JITSI_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Jitsi failed to load."));
    document.body.appendChild(script);
  });
}

export function MeetingPanel({ roomName, expanded }: MeetingPanelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<{ dispose?: () => void } | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  const userInfo = useMemo(
    () => ({
      displayName: "PILLS.FUN Guest",
    }),
    []
  );

  useEffect(() => {
    let cancelled = false;

    async function createMeeting() {
      setStatus("loading");

      try {
        await loadJitsiScript();

        if (cancelled || !containerRef.current || !window.JitsiMeetExternalAPI) return;

        apiRef.current?.dispose?.();

        const api = new window.JitsiMeetExternalAPI("meet.jit.si", {
          roomName,
          parentNode: containerRef.current,
          userInfo,
          width: "100%",
          height: "100%",
          configOverwrite: {
            prejoinPageEnabled: false,
            startWithAudioMuted: false,
            startWithVideoMuted: false,
          },
          interfaceConfigOverwrite: {
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            MOBILE_APP_PROMO: false,
          },
        });

        api.addListener?.("videoConferenceJoined", () => {
          if (!cancelled) setStatus("ready");
        });

        apiRef.current = api;

        // The iframe is interactive as soon as the API has mounted it.
        // Waiting for "videoConferenceJoined" can leave the overlay blocking Jitsi.
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    createMeeting();

    return () => {
      cancelled = true;
      apiRef.current?.dispose?.();
      apiRef.current = null;
    };
  }, [roomName, userInfo]);

  return (
    <div className={`panel panel--meeting ${expanded ? "panel--meeting-expanded" : ""}`}>
      <div className="panel-header">
        <div>
          <div className="panel-kicker">Meeting</div>
          <h2 className="panel-title">Live collaboration room</h2>
        </div>
        <div className="panel-meta">meet.jit.si</div>
      </div>

      <div className="meeting-frame">
        {status !== "ready" && (
          <div className="meeting-overlay">
            <div className="meeting-status">
              {status === "error" ? "Unable to load the meeting." : "Connecting room..."}
            </div>
            <div className="meeting-substatus">
              Audio, video, and screen sharing are provided by Jitsi.
            </div>
          </div>
        )}
        <div ref={containerRef} className="meeting-embed" />
      </div>
    </div>
  );
}
