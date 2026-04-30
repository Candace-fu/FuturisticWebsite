import { Tldraw } from "tldraw";

interface WhiteboardPanelProps {
  roomName: string;
}

export function WhiteboardPanel({ roomName }: WhiteboardPanelProps) {
  return (
    <div className="panel panel--board">
      <div className="panel-header">
        <div>
          <div className="panel-kicker">Whiteboard</div>
          <h2 className="panel-title">Shared canvas</h2>
        </div>
        <div className="panel-meta">Room {roomName}</div>
      </div>

      <div className="board-frame">
        <Tldraw persistenceKey={`playground-board-${roomName}`} autoFocus>
          {/*
            Future multiplayer hook:
            Replace local persistence with the tldraw multiplayer/sync source here.
            This component is intentionally isolated so the board can later connect
            to a sync backend without changing page layout code.
          */}
        </Tldraw>
      </div>
    </div>
  );
}
