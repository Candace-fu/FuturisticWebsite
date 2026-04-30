import { useMemo, useState } from 'react'
import { FlowbotTopBar } from './components/FlowbotTopBar'
import { FlowbotScene } from './components/FlowbotScene'
import { FlowbotAgentPanel } from './components/FlowbotAgentPanel'
import { type MotionId, pickMotionFromPrompt } from './robot/motions'

const DEFAULT_ROOM = 'FLOWBOT-LAB-01'

type AgentMessage = {
  role: 'user' | 'agent'
  text: string
}

export function FlowbotPage() {
  const search = new URLSearchParams(window.location.search)
  const room = search.get('room')?.trim() || DEFAULT_ROOM

  const [motion, setMotion] = useState<MotionId>('idle')
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      role: 'agent',
      text: 'Flowbot is online. I can introduce Pills.Fun, or react to prompts like wave, point, greet, or bow.',
    },
  ])
  const [isSending, setIsSending] = useState(false)

  const roomUrl = useMemo(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('room', room)
    return url.toString()
  }, [room])

  async function handleSubmit(prompt: string) {
    const userText = prompt.trim()
    if (!userText || isSending) return

    setMessages((current) => [...current, { role: 'user', text: userText }])
    setMotion(pickMotionFromPrompt(userText))
    setIsSending(true)

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `You are currently speaking inside the Flowbot lab page for Pills.Fun. Keep the same Fun Agent identity. If the user sounds like they are addressing the robot directly, respond naturally in that scene context.\n\nUser message: ${userText}`,
        }),
      })

      const data = await response.json()
      const reply =
        typeof data?.text === 'string' && data.text.trim()
          ? data.text.trim()
          : typeof data?.error === 'string'
            ? data.error
            : 'Flowbot response unavailable.'

      setMessages((current) => [...current, { role: 'agent', text: reply }])
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'agent',
          text:
            error instanceof Error
              ? error.message
              : 'Unable to reach the Fun Agent right now.',
        },
      ])
    } finally {
      setIsSending(false)
      window.setTimeout(() => setMotion('idle'), 1800)
    }
  }

  return (
    <div className="flowbot-shell">
      <div className="flowbot-backdrop" />
      <FlowbotTopBar room={room} roomUrl={roomUrl} />

      <main className="flowbot-layout">
        <section className="flowbot-stage-panel">
          <div className="flowbot-panel-head">
            <div>
              <div className="flowbot-kicker">Interactive Robot Stage</div>
              <h1 className="flowbot-title">Flowbot Shared Interface</h1>
            </div>
            <div className="flowbot-badge">Fun Agent linked</div>
          </div>

          <FlowbotScene motion={motion} />
        </section>

        <FlowbotAgentPanel
          isSending={isSending}
          messages={messages}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  )
}
