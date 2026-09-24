import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { Resend } from "resend";
import dotenv from "dotenv";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

import Groq from "groq-sdk";

dotenv.config();

let groqClient: Groq | null = null;
function getGroq(): Groq | null {
  if (!groqClient && process.env.GROQ_API_KEY) {
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqClient;
}

const CHAT_ENABLED = false;

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

let aiClient: GoogleGenAI | null = null;

function getGeminiAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const STITCH_SYSTEM_PROMPT = `You are StitchBot, an AI assistant for Dean Wilshaw Web Development.
Your role is to help tradespeople, contractors, and small business owners understand website packages, features, and pricing in clear, straightforward, jargon-free British English.

CORE BUSINESS FACTS & PRICING:
- Founder & Lead Developer: Dean Wilshaw.
- Service: Custom, hand-crafted websites purpose-built for trade and commercial businesses (plumbing, electrical, construction, roofing, emergency dispatch, etc.).
- Delivery Timeframe: 5 to 7 working days from brief approval to live launch.
- Ownership: 100 percent code and asset ownership transferred directly to the client upon completion. Zero proprietary platform lock-in.
- Managed Site Care: £49 per month optional care plan covering fast cloud hosting, security monitoring, regular backups, and ongoing content updates.
- One-Off Build Pricing: Transparent, fixed-quote project pricing based on scope. No recurring software platform fees.

CONVERSATIONAL RULES:
- Tone: Grounded, practical, professional British English. Avoid buzzwords, hyphens, and marketing hyperbole.
- Length: Keep answers concise (2 to 4 sentences).
- Custom Quotes & Integrations: For bespoke software requirements or detailed price estimates, direct the user to fill out the quick quote form or contact Dean directly.
- Primary CTA: Encourage visitors to explore the "Six Trade Concepts" on the Demos page or submit the quote form to discuss their project.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", studio: "Dean Wilshaw Web Development" });
  });

  // AI Chat endpoint (Stitch Virtual Assistant)
  // StitchBot is retired (see api/chat.ts): the route answers 404 until its copy is fixed.
  app.post("/api/chat", async (req, res) => {
    if (!CHAT_ENABLED) {
      return res.status(404).json({ error: "Not found" });
    }

    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message string is required" });
      }

      const groq = getGroq();
      if (groq) {
        const formattedHistory = Array.isArray(history)
          ? history.slice(-6).map((item: { role: string; content: string }) => ({
              role: item.role === "user" ? "user" : "assistant",
              content: item.content,
            }))
          : [];

        const messages = [
          { role: "system", content: STITCH_SYSTEM_PROMPT },
          ...formattedHistory,
          { role: "user", content: message }
        ];

        const chatCompletion = await groq.chat.completions.create({
          messages: messages as any,
          model: "llama-3.3-70b-versatile",
          temperature: 0.2,
          max_tokens: 250,
        });

        const reply = chatCompletion.choices[0]?.message?.content;
        if (reply) {
          return res.json({ response: reply });
        }
      }

      const ai = getGeminiAI();
      if (ai) {
        const formattedHistory = Array.isArray(history)
          ? history.slice(-6).map((item: { role: string; content: string }) => ({
              role: item.role === "user" ? "user" : "model",
              parts: [{ text: item.content }],
            }))
          : [];

        const chat = ai.chats.create({
          model: "gemini-2.5-flash",
          config: {
            systemInstruction: STITCH_SYSTEM_PROMPT,
            temperature: 0.2,
            maxOutputTokens: 250,
          },
          history: formattedHistory,
        });

        const geminiResponse = await chat.sendMessage({ message });
        const responseText = geminiResponse.text;
        if (responseText) {
          return res.json({ response: responseText });
        }
      }

      const fallbackText = getSmartFallbackResponse(message);
      return res.json({ response: fallbackText, fallback: true });
    } catch (error) {
      console.error("Chat endpoint error:", error);
      const fallbackText = getSmartFallbackResponse(req.body?.message || "");
      return res.json({ response: fallbackText, fallback: true });
    }
  });

  // Quote calculation / submission endpoint
  app.post("/api/quote", async (req, res) => {
    const { name, company, email, phone, details } = req.body;

    const refNumber = "DSW-" + Math.floor(100000 + Math.random() * 900000);

    // Send email via Resend
    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: ["dean.wilshaw.web@gmail.com"],
          subject: `New Quote Request [${refNumber}] from ${name || "Unknown"}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              <div style="background: #dc2626; padding: 20px 24px;">
                <h1 style="color: white; margin: 0; font-size: 18px;">New Quote Request: Design Systems Web</h1>
                <p style="color: #fecaca; margin: 4px 0 0; font-size: 12px;">Reference: ${refNumber}</p>
              </div>
              <div style="padding: 24px; background: #fff;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #111;">${name || "Not provided"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Business / Note</td><td style="padding: 8px 0; color: #111;">${company || "Direct Enquiry"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; color: #111;"><a href="mailto:${email}" style="color: #dc2626;">${email || "Not provided"}</a></td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; color: #111;">${phone || "Not provided"}</td></tr>
                </table>
                <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 6px; font-weight: 600; font-size: 13px; color: #111;">Project Details:</p>
                  <p style="margin: 0; font-size: 14px; color: #374151; white-space: pre-wrap;">${details || "No details provided"}</p>
                </div>
              </div>
              <div style="background: #f9fafb; padding: 14px 24px; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
                Sent from designsystemsweb.co.uk: ${new Date().toLocaleString("en-GB")}
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Resend email error:", emailErr);
      }
    }

    res.json({
      success: true,
      refNumber,
      clientName: name || "Valued Client",
      email,
      message: `Thank you, ${name || 'friend'}. Your request has been sent under reference ${refNumber}. Dean will reply to you at ${email || 'your email'}.`,
      receivedAt: new Date().toISOString(),
    });
  });

  // AI Completion endpoint (Groq / Vercel AI SDK streaming + Vision support)
  app.post("/api/completion", async (req, res) => {
    try {
      const { prompt, system, image } = req.body;

      if ((!prompt || typeof prompt !== "string") && !image) {
        return res.status(400).json({ error: "A prompt or image payload is required." });
      }

      const groqApiKey = process.env.GROQ_API_KEY;
      if (!groqApiKey) {
        return res.status(500).json({ error: "GROQ_API_KEY is not configured on the server." });
      }

      const groq = createOpenAI({
        baseURL: "https://api.groq.com/openai/v1",
        apiKey: groqApiKey,
      });

      let modelName = "llama-3.3-70b-versatile";
      let userPromptContent: any = prompt ? prompt.trim() : "Analyze this mobile UI screenshot for conversion barriers.";

      if (image && typeof image === "string" && image.startsWith("data:image/")) {
        modelName = "llama-3.2-11b-vision-preview";
        userPromptContent = [
          { type: "text", text: prompt && prompt.trim() ? prompt.trim() : "Analyze this mobile UI screenshot for conversion barriers." },
          { type: "image", image: image }
        ];
      }

      const result = streamText({
        model: groq(modelName),
        system: typeof system === "string" && system.trim().length > 0
          ? system
          : "You are a World-Class Mobile UI/UX Specialist & Conversion Rate Optimizer.",
        messages: [
          {
            role: "user",
            content: userPromptContent,
          }
        ],
        maxTokens: 1024,
        onError: ({ error }) => {
          console.error("Groq streamText error:", error);
        },
      });

      // Stream the response back as plain text
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Transfer-Encoding", "chunked");
      res.setHeader("X-Vercel-AI-Data-Stream", "v1");

      result.toDataStreamResponse().body
        ?.pipeTo(
          new WritableStream({
            write(chunk) {
              res.write(chunk);
            },
            close() {
              res.end();
            },
            abort(err) {
              console.error("Stream aborted:", err);
              res.end();
            },
          })
        )
        .catch((err: Error) => {
          console.error("Stream pipe error:", err);
          if (!res.headersSent) {
            res.status(500).json({ error: "Stream failed." });
          } else {
            res.end();
          }
        });

    } catch (error: unknown) {
      console.error("/api/completion error:", error);
      const isRateLimit =
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        (error as { status: number }).status === 429;

      if (isRateLimit) {
        return res.status(429).json({ error: "Groq rate limit reached. Please wait a moment and try again." });
      }

      if (!res.headersSent) {
        return res.status(500).json({ error: "Internal server error during completion." });
      }
    }
  });

  // Speed Benchmark Simulator endpoint
  app.post("/api/speed-test", (req, res) => {
    const { url, industry } = req.body;
    
    const domain = url ? url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0] : "your-current-site.com";

    res.json({
      domain,
      wordpress: {
        loadTimeSeconds: 3.8 + Math.random() * 1.5,
        pageWeightMB: 2.8 + Math.random() * 1.2,
        lighthouseScore: Math.floor(35 + Math.random() * 20),
        vulnerabilities: 7,
        pluginCount: 24,
      },
      reactBuild: {
        loadTimeSeconds: 0.38,
        pageWeightMB: 0.18,
        lighthouseScore: 99,
        vulnerabilities: 0,
        pluginCount: 0,
      },
      estimatedConversionGain: "+34% More Qualified Leads",
    });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Design Systems Web server running on http://localhost:${PORT}`);
  });
}

function getSmartFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("cost") || q.includes("price") || q.includes("quote") || q.includes("budget") || q.includes("how much") || q.includes("pricing") || q.includes("charge") || q.includes("fee")) {
    return "Pricing is transparent and fixed per project: Standalone Lead Tools from £149, Complete Trade Builds from £299, and Custom Infrastructure from £449, plus an optional £49 per month site care retainer. You own 100 percent of your code with zero ongoing platform lock in. Check the Pricing page or request a quick quote for your project.";
  }
  if (q.includes("how long") || q.includes("time") || q.includes("turnaround") || q.includes("deliver") || q.includes("deadline") || q.includes("quick") || q.includes("days")) {
    return "Standard builds are typically completed and launched within 5 to 7 working days from brief approval. Dean works directly with you to get your site live quickly without delays.";
  }
  if (q.includes("retainer") || q.includes("care") || q.includes("hosting") || q.includes("support") || q.includes("maintain") || q.includes("maintenance") || q.includes("aftercare")) {
    return "Dean offers an optional £49 per month managed care plan covering cloud hosting, security monitoring, regular backups, and direct content updates. You own your website outright with zero ongoing platform lock in.";
  }
  if (q.includes("demo") || q.includes("example") || q.includes("portfolio") || q.includes("concept") || q.includes("show") || q.includes("work")) {
    return "You can explore live interactive prototypes in the Six Trade Concepts section on the Demos page. They showcase layouts built for emergency callouts, commercial tenders, bespoke craft, surveying, lead dispatch, and vehicle services.";
  }
  if (q.includes("contact") || q.includes("whatsapp") || q.includes("email") || q.includes("phone") || q.includes("number") || q.includes("location") || q.includes("cheshire") || q.includes("stoke") || q.includes("reach") || q.includes("speak")) {
    return "You can reach Dean directly on WhatsApp or phone at 07348 733365, or via email at dean.wilshaw.web@gmail.com. He typically replies within a few hours.";
  }
  if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    return "Hi there! I am StitchBot, Dean's AI assistant. I can answer questions about website packages, pricing, timelines, or tools. How can I help you today?";
  }
  return "Thanks for asking. For specific project details or custom requirements, please submit the quick quote form on this site or message Dean directly on WhatsApp at 07348 733365.";
}

startServer();
