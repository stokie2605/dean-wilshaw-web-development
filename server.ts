import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { Resend } from "resend";
import dotenv from "dotenv";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

dotenv.config();

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

const STITCH_SYSTEM_PROMPT = `You are the Client Support Assistant for Dean Wilshaw's independent Web Development studio based in Cheshire & Stoke-on-Trent, UK.
Your tone is professional, friendly, concise, and focused on business growth and technical excellence.

Key Studio Facts & Services:
- Engineer: Dean Wilshaw (25 years operational discipline in logistics, now building high-performance web applications).
- Specialty: Custom React + Vite websites designed for local business lead generation (Cheshire, Stoke-on-Trent, Manchester, & UK-wide).
- Turnaround Times: ALL standard websites and landing pages are built and delivered strictly within 1 to 2 weeks. Never quote 3 weeks.
- Comparison vs WordPress: WordPress templates are slow, plugin-heavy, vulnerable, and require constant maintenance. Dean's custom React builds are stateless, lightning fast, highly secure, and tailored 100% to brand goals.

Strict Rules: 
1. Answer technical FAQs (React vs WordPress, turnaround times, hosting, support).
2. NEVER calculate custom prices, offer discounts, or give out specific price figures.
3. If asked about pricing, kindly explain that Dean provides custom quotes after a quick discovery chat to understand the exact business requirements.
4. ALWAYS end your response by directing them to use the "Book 15-Min Chat" or "WhatsApp Dean" links below to get in touch.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", studio: "Dean Wilshaw Web Development" });
  });

  // AI Chat endpoint (Stitch Virtual Assistant)
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message string is required" });
      }

      const ai = getGeminiAI();

      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not configured
        const fallbackText = getSmartFallbackResponse(message);
        return res.json({ response: fallbackText, fallback: true });
      }

      // Format conversation history for Gemini chat if present
      const formattedHistory = Array.isArray(history)
        ? history.slice(-6).map((item: { role: string; content: string }) => ({
            role: item.role === "user" ? "user" : "model",
            parts: [{ text: item.content }],
          }))
        : [];

      const chat = ai.chats.create({
        model: "gemini-3.6-flash",
        config: {
          systemInstruction: STITCH_SYSTEM_PROMPT,
          temperature: 0.7,
        },
        history: formattedHistory,
      });

      const geminiResponse = await chat.sendMessage({ message });
      const responseText = geminiResponse.text || "I'm ready to help answer any questions about Dean's web development services or provide a quick quote!";

      return res.json({ response: responseText });
    } catch (error) {
      console.error("Chat endpoint error:", error);
      const fallbackText = getSmartFallbackResponse(req.body?.message || "");
      return res.json({ response: fallbackText, fallback: true });
    }
  });

  // Quote calculation / submission endpoint
  app.post("/api/quote", async (req, res) => {
    const { name, company, email, phone, projectType, details } = req.body;

    const refNumber = "DW-" + Math.floor(100000 + Math.random() * 900000);

    let estimatedCost = "£449 - £749";
    let turnaround = "10 - 14 Business Days";
    let packageLabel = "Business Site";

    if (projectType === "business-site") {
      estimatedCost = "£449 - £749";
      turnaround = "10 - 14 Business Days";
      packageLabel = "Business Site";
    } else if (projectType === "custom-app") {
      estimatedCost = "£1,200+";
      turnaround = "21+ Business Days";
      packageLabel = "Custom App / Dashboard";
    } else if (projectType === "ai-integration") {
      estimatedCost = "£1,200+";
      turnaround = "14 - 21 Business Days";
      packageLabel = "AI Integration";
    }

    // Send email via Resend
    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: ["dean.wilshaw.web@gmail.com"],
          subject: `New Quote Request [${refNumber}] — ${packageLabel} from ${name || "Unknown"}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              <div style="background: #dc2626; padding: 20px 24px;">
                <h1 style="color: white; margin: 0; font-size: 18px;">New Quote Request — Dean Wilshaw Web</h1>
                <p style="color: #fecaca; margin: 4px 0 0; font-size: 12px;">Reference: ${refNumber}</p>
              </div>
              <div style="padding: 24px; background: #fff;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #111;">${name || "Not provided"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Company</td><td style="padding: 8px 0; color: #111;">${company || "Individual"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; color: #111;"><a href="mailto:${email}" style="color: #dc2626;">${email || "Not provided"}</a></td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; color: #111;">${phone || "Not provided"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Package</td><td style="padding: 8px 0; font-weight: 600; color: #dc2626;">${packageLabel}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Est. Cost</td><td style="padding: 8px 0; color: #111;">${estimatedCost}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Turnaround</td><td style="padding: 8px 0; color: #111;">${turnaround}</td></tr>
                </table>
                <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 6px; font-weight: 600; font-size: 13px; color: #111;">Project Details:</p>
                  <p style="margin: 0; font-size: 14px; color: #374151; white-space: pre-wrap;">${details || "No details provided"}</p>
                </div>
              </div>
              <div style="background: #f9fafb; padding: 14px 24px; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
                Sent from dw-web-freelance.vercel.app — ${new Date().toLocaleString("en-GB")}
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
      projectType: packageLabel,
      estimatedCost,
      turnaround,
      message: `Thank you, ${name || 'friend'}! Your request has been logged under reference ${refNumber}. Dean will review your requirements and contact you at ${email || 'your email'} within 24 hours.`,
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
    console.log(`Dean Wilshaw Web Studio server running on http://0.0.0.0:${PORT}`);
  });
}

function getSmartFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("cost") || q.includes("price") || q.includes("quote") || q.includes("budget") || q.includes("how much")) {
    return "Dean's bespoke websites range from £449 for a Local Tradesman Landing Page up to £749 for a Core Business Website, with a 10% early-bird discount available! Would you like to use our Quote form below to lock in a price or give Dean your number so he can call you?";
  }
  if (q.includes("speed") || q.includes("performance") || q.includes("wordpress") || q.includes("slow")) {
    return "Unlike WordPress templates that load 20+ plugins and heavy themes, Dean builds clean React applications with Vite. This guarantees sub-second load times, 100/100 Core Web Vitals scores, and significantly higher Google rankings and conversion rates.";
  }
  if (q.includes("time") || q.includes("long") || q.includes("deadline")) {
    return "Most builds are delivered in 1 to 2 weeks. Coming from 25 years in logistics operations, Dean maintains a strict operational policy: zero missed deadlines and complete transparency throughout the project.";
  }
  if (q.includes("contact") || q.includes("whatsapp") || q.includes("email") || q.includes("location") || q.includes("cheshire") || q.includes("stoke")) {
    return "Dean is based in Cheshire & Stoke-on-Trent, serving local businesses across the North West and nationwide. You can message Dean directly on WhatsApp or fill out the Quote Request form on this page for a 24-hour response.";
  }
  return "Hi! I'm Dean's Client Support Assistant. Dean builds high-performance, bespoke websites that turn local Cheshire and Stoke traffic into paying customers. How can I help you today? Feel free to ask about pricing, timelines, or tech stack!";
}

startServer();
