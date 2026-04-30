import { useState } from 'react'

type AgentMessage = {
  role: 'user' | 'agent'
  text: string
}

interface FlowbotAgentPanelProps {
  isSending: boolean
  messages: AgentMessage[]
  onSubmit: (prompt: string) => void
}

export function FlowbotAgentPanel({
  isSending,
  messages,
  onSubmit,
}: FlowbotAgentPanelProps) {
  const [prompt, setPrompt] = useState('')

  function submit() {
    const text = prompt.trim()
    if (!text || isSending) return
    setPrompt('')
    onSubmit(text)
  }

  return (
    <aside className="flowbot-side-panel">
      <div className="flowbot-panel-head">
        <div>
          <div className="flowbot-kicker">Fun Agent Channel</div>
          <h2 className="flowbot-title flowbot-title--small">Shared scene dialogue</h2>
        </div>
        <div className="flowbot-badge">{isSending ? 'Thinking' : 'Ready'}</div>
      </div>

      <div className="flowbot-status-card">
        <div className="flowbot-status-label">Scene notes</div>
        <p>
          This page is isolated from the main site layout, but it talks to the same
          Fun Agent endpoint. The robot scene can later swap to a GLB mechanical arm
          without changing the page shell.
        </p>
      </div>

      <div className="flowbot-log">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flowbot-message flowbot-message--${message.role}`}
          >
            <div className="flowbot-message-role">
              {message.role === 'agent' ? 'FUN_AGENT' : 'YOU'}
            </div>
            <div className="flowbot-message-text">{message.text}</div>
          </div>
        ))}
      </div>

      <div className="flowbot-quick-actions">
        {['wave', 'point', 'greet', 'bow'].map((action) => (
          <button
            key={action}
            className="flowbot-chip"
            type="button"
            onClick={() => onSubmit(action)}
          >
            {action}
          </button>
        ))}
      </div>

      <form
        className="flowbot-form"
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
      >
        <textarea
          className="flowbot-input"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask the Fun Agent or direct Flowbot: wave, point, introduce yourself..."
          rows={4}
        />
        <button className="flowbot-submit" type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </aside>
  )
}
