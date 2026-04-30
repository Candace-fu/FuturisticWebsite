interface SidePanelProps {
  roomName: string;
}

const checklist = [
  { label: "Frame collaboration goals", done: true },
  { label: "Sketch ideas directly on the board", done: true },
  { label: "Capture decisions from the call", done: false },
  { label: "Draft agent-ready summary", done: false },
];

export function SidePanel({ roomName }: SidePanelProps) {
  return (
    <div className="panel panel--side">
      <div className="panel-header">
        <div>
          <div className="panel-kicker">Notes / Agent</div>
          <h2 className="panel-title">Session context</h2>
        </div>
        <div className="panel-meta">Room {roomName}</div>
      </div>

      <div className="side-section">
        <div className="side-section-title">Project frame</div>
        <p className="side-copy">
          A compact creative lab setup for sketching, speaking, and aligning in
          one shared surface. This demo is intentionally lightweight so it can
          run locally without a dedicated backend.
        </p>
      </div>

      <div className="side-section">
        <div className="side-section-title">Working checklist</div>
        <ul className="checklist">
          {checklist.map((item) => (
            <li key={item.label} className="checklist-item">
              <span
                className={`checklist-mark ${
                  item.done ? "checklist-mark--done" : ""
                }`}
              />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="side-section">
        <div className="side-section-title">Agent summary</div>
        <div className="agent-summary">
          <p className="side-copy">
            Future AI integration point: generate live recaps, action items, and
            board-aware summaries based on meeting context.
          </p>
          <div className="agent-status-row">
            <span className="agent-status-label">State</span>
            <span className="agent-status-pill">Stubbed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
