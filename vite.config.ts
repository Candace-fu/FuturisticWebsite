import { defineConfig, loadEnv, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { projects } from './src/app/data/projects'

const projectKnowledge = projects
  .map((project) => `- ${project.name}: ${project.shortDescription}`)
  .join('\n')

const systemPrompt = `You are the Pills.Fun system agent.

Here is what we build:

${projectKnowledge}

Answer based on this knowledge. Keep replies concise, futuristic, and helpful.`

function agentProxyPlugin(apiKey: string | undefined): Plugin {
  const handler = async (req: any, res: any) => {
    if (req.method !== 'POST' || req.url !== '/api/agent') {
      return false
    }

    console.log('[agent-proxy] /api/agent request received')

    if (!apiKey) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Missing SILICONFLOW_API_KEY' }))
      return true
    }

    try {
      const chunks: Buffer[] = []
      for await (const chunk of req) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
      }

      const rawBody = Buffer.concat(chunks).toString('utf8')
      const parsed = rawBody ? JSON.parse(rawBody) : {}
      const userMessage = typeof parsed.message === 'string' ? parsed.message : ''
      console.log('[agent-proxy] parsed request body', parsed)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      console.log('[agent-proxy] calling SiliconFlow upstream')

      const upstreamResponse = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'Qwen/Qwen2.5-7B-Instruct',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: userMessage,
            },
          ],
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      console.log('[agent-proxy] SiliconFlow upstream returned')
      console.log('[agent-proxy] upstream status', upstreamResponse.status)

      const data = await upstreamResponse.json()

      if (!upstreamResponse.ok) {
        res.statusCode = upstreamResponse.status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: data?.error?.message || 'Upstream request failed' }))
        return true
      }

      const text = data?.choices?.[0]?.message?.content ?? ''

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ text }))
      return true
    } catch (error) {
      console.error('[agent-proxy] caught error', error)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          error:
            error instanceof Error && error.name === 'AbortError'
              ? 'Agent upstream request timed out'
              : error instanceof Error
                ? error.message
                : 'Unknown server error',
        })
      )
      return true
    }
  }

  return {
    name: 'agent-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const handled = await handler(req, res)
        if (!handled) next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const handled = await handler(req, res)
        if (!handled) next()
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  console.log("SILICONFLOW_API_KEY:", env.SILICONFLOW_API_KEY)


  return {
    plugins: [
      react(),
      tailwindcss(),
      agentProxyPlugin(env.SILICONFLOW_API_KEY),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
