interface TopBarProps {
  roomName: string;
  roomUrl: string;
  meetingExpanded: boolean;
  onCopyRoomLink: () => void;
  onToggleMeetingSize: () => void;
}

export function TopBar({
  roomName,
  roomUrl,
  meetingExpanded,
  onCopyRoomLink,
  onToggleMeetingSize,
}: TopBarProps) {
  return (
    <header className="playground-topbar">
      <div className="topbar-room">
        <div className="topbar-eyebrow">Shared Thinking Space</div>
        <h1 className="topbar-title">{roomName}</h1>
      </div>

      <div className="topbar-actions">
        <button type="button" className="playground-button" onClick={onCopyRoomLink}>
          Copy room link
        </button>
        <button
          type="button"
          className="playground-button"
          onClick={onToggleMeetingSize}
        >
          {meetingExpanded ? "Compact meeting" : "Expand meeting"}
        </button>
        <button type="button" className="playground-button" disabled title="Future mode">
          Present mode
        </button>
        <a
          className="room-link-preview"
          href={roomUrl}
          target="_blank"
          rel="noreferrer"
          title={roomUrl}
        >
          Live room
        </a>
      </div>
    </header>
  );
}
