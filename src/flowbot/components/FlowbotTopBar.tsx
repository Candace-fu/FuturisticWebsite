interface FlowbotTopBarProps {
  room: string
  roomUrl: string
}

export function FlowbotTopBar({ room, roomUrl }: FlowbotTopBarProps) {
  async function copyRoomLink() {
    try {
      await navigator.clipboard.writeText(roomUrl)
    } catch {
      window.prompt('Copy flowbot link', roomUrl)
    }
  }

  return (
    <header className="flowbot-topbar">
      <div className="flowbot-brand">
        <div className="flowbot-brand-mark" />
        <div>
          <div className="flowbot-kicker">PILLS.FUN / Flowbot</div>
          <div className="flowbot-room-label">{room}</div>
        </div>
      </div>

      <div className="flowbot-actions">
        <button className="flowbot-button" type="button" onClick={copyRoomLink}>
          Copy room link
        </button>
        <a className="flowbot-link" href="/index.html">
          Main site
        </a>
      </div>
    </header>
  )
}
