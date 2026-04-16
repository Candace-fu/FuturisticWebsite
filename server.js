import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app = express();
const PORT = 3001;

const projectKnowledge = [
  "- MagicCube: MagicCube transforms physical space into an interactive capture system for offline events and activations.",
  "- Smart Video Booth: Smart Video Booth captures immersive short-form video in a compact interactive setup.",
  "- Morphe: Morphe turns participant input into immediate visual transformation through a live capture and generation pipeline.",
  "- AI Snapshot: AI Snapshot creates high-quality portraits with cross-era costume transformation and visual stylization.",
  "- MY Keywords: MY Keywords transforms playful interaction into personalized keyword-based digital identity artifacts.",
  "- PlotBot: PlotBot converts AI-generated imagery into physical marks through a robotic drawing and engraving process.",
  "- Dream Port: Dream Port combines a 360 degree VR system with a multi-axis motion platform to simulate travel to remote environments.",
  "- 2050 Stage: 2050 Stage transforms the conventional stage into a responsive system for live performance and media orchestration.",
  "- Sounds, and Sweet Airs: Sounds, and Sweet Airs creates mechanical sound-making species that respond to the environment through sensors and movement.",
  "- AI Gadgets: AI Gadgets turns AI interaction into small-scale physical experiences that people can directly trigger and explore.",
  "- Play With Machines: Play With Machines stages interaction as play, inviting people to engage with machine behavior directly.",
  "- Customized Board Games: Customized Board Games uses board games as a flexible medium for context-specific interaction and play.",
].join("\n");

const systemPrompt = `You are the Pills.Fun system agent.

Here is what we build:

${projectKnowledge}

Answer based on this knowledge. Keep replies concise, futuristic, and helpful.`;

app.use(express.json({ limit: "1mb" }));

app.post("/api/agent", async (req, res) => {
  const apiKey = process.env.SILICONFLOW_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing SILICONFLOW_API_KEY" });
  }

  const userMessage =
    typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!userMessage) {
    return res.status(400).json({ error: "Missing message" });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const upstreamResponse = await fetch(
      "https://api.siliconflow.cn/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "Qwen/Qwen3.5-35B-A3B",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    const data = await upstreamResponse.json();

    if (!upstreamResponse.ok) {
      return res.status(upstreamResponse.status).json({
        error: data?.error?.message || "Upstream request failed",
      });
    }

    const text = data?.choices?.[0]?.message?.content ?? "";

    return res.json({ text });
  } catch (error) {
    clearTimeout(timeoutId);
    return res.status(500).json({
      error:
        error instanceof Error && error.name === "AbortError"
          ? "Agent upstream request timed out"
          : error instanceof Error
            ? error.message
            : "Unknown server error",
    });
  }
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Agent API listening on http://127.0.0.1:${PORT}`);
});
