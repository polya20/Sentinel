import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let kccContext: string | null = null;
let ai: GoogleGenAI | null = null;

async function getKCCContext() {
  if (kccContext) return kccContext;
  try {
    const res = await fetch("https://context7.com/linkedin/cruise-control/llms.txt?tokens=10000");
    if (res.ok) {
      kccContext = await res.text();
    } else {
      console.error("Failed to fetch KCC Context");
    }
  } catch (e) {
    console.error("Error fetching KCC Context:", e);
  }
  return kccContext;
}

export function getGenAI(): GoogleGenAI {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    ai = new GoogleGenAI({ apiKey: key });
  }
  return ai;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Background fetch of context
  getKCCContext();

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      const contextText = await getKCCContext();
      const aiClient = getGenAI();

      const systemInstruction = `You are a Senior Site Reliability Engineer (SRE) Assistant, specializing in Kafka and Kafka Cruise Control (KCC).
You have access to the following Cruise Control context and documentation to assist the user:

<cruise_control_docs>
${contextText || 'Documentation could not be loaded.'}
</cruise_control_docs>

Your goal is to answer questions related to Kafka capacity planning, incident response, and post-incident review.

Use the provided tools to fetch real-time state from the live Cruise Control cluster when the user asks about current cluster health, replicas, or anomalies.
If the API tool returns an error (meaning the demo cluster might not be running), gracefully fallback to simulating a realistic SRE response based on the anomaly they are inquiring about.

Keep your answers brief, actionable, and focus on exactly how to use Kafka and Cruise Control APIs/metrics to solve the user's issue.
Provide curl commands or API endpoints where applicable.
Format with markdown.`;

      // Define Gemini Function Tools
      const cruiseControlTools = [{
        functionDeclarations: [
          {
            name: "get_cluster_state",
            description: "Fetches the current live state of the Kafka cluster from Cruise Control API, including broker health, replica counts, and valid partition states.",
            parameters: {
              type: "OBJECT",
              properties: {
                verbose: {
                  type: "BOOLEAN",
                  description: "Whether to request verbose metrics"
                }
              }
            }
          },
          {
            name: "get_anomalies",
            description: "Fetches active anomalies currently detected by Cruise Control (e.g. goal violations, broker failures, disk failures).",
            parameters: {
              type: "OBJECT",
              properties: {}
            }
          }
        ]
      }];

      const lastUserMessage = messages[messages.length - 1];
      const previousMessages = messages.slice(0, -1);

      const response = await aiClient.models.generateContent({
        model: "gemini-2.5-pro",
        contents: [
          ...previousMessages,
          lastUserMessage
        ],
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.2,
          tools: cruiseControlTools
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: error.message || "Failed to process chat request." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Express 4 wildcard catch-all
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
