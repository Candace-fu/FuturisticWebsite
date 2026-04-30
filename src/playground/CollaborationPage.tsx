import { useMemo, useState } from "react";
import { MeetingPanel } from "./components/MeetingPanel";
import { SidePanel } from "./components/SidePanel";
import { TopBar } from "./components/TopBar";
import { WhiteboardPanel } from "./components/WhiteboardPanel";

const DEFAULT_ROOM = "PILLS-FUN-Shared-Thinking-Space";

function getRoomName() {
  if (typeof window === "undefined") return DEFAULT_ROOM;

  const params = new URLSearchParams(window.location.search);
  const room = params.get("room");
  return room?.trim() ? room.trim() : DEFAULT_ROOM;
}

export function CollaborationPage() {
  const [roomName] = useState(() => getRoomName());
  const [meetingExpanded, setMeetingExpanded] = useState(false);

  const roomUrl = useMemo(() => {
    if (typeof window === "undefined") return `?room=${encodeURIComponent(roomName)}`;

    const url = new URL(window.location.href);
    url.searchParams.set("room", roomName);
    return url.toString();
  }, [roomName]);

  const handleCopyRoomLink = async () => {
    try {
      await navigator.clipboard.writeText(roomUrl);
      window.alert("Room link copied.");
    } catch {
      window.alert("Unable to copy the room link in this browser.");
    }
  };

  return (
    <div className="playground-shell">
      <div className="playground-grid-overlay" />
      <TopBar
        roomName={roomName}
        roomUrl={roomUrl}
        meetingExpanded={meetingExpanded}
        onCopyRoomLink={handleCopyRoomLink}
        onToggleMeetingSize={() => setMeetingExpanded((current) => !current)}
      />

      <main
        className={`collaboration-layout ${
          meetingExpanded ? "collaboration-layout--meeting-expanded" : ""
        }`}
      >
        <section className="board-column">
          <WhiteboardPanel roomName={roomName} />
        </section>

        <aside className="right-column">
          <MeetingPanel roomName={roomName} expanded={meetingExpanded} />
          <SidePanel roomName={roomName} />
        </aside>
      </main>
    </div>
  );
}
