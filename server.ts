import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { Resend } from "resend";
import dotenv from "dotenv";

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
- Core Offerings:
  1. Custom React Builds: Instant load times (<0.5s LCP), 100/100 Core Web Vitals, zero template bloat.
  2. Lead-Gen & Conversion Optimization (CRO): Strategic layouts, clear CTAs, integrated lead capture forms.
  3. Modern Technical SEO & Schema: Structured data, semantic HTML to outrank competitors.
  4. Operational Discipline: Zero missed deadlines, transparent pricing, direct WhatsApp communication.
- Pricing & Timelines:
  - Custom Landing Pages / Starter Sites: ~£250 - £450 (1-2 weeks)
  - Full Business Websites / Lead Portals: ~£500 - £850 (2-3 weeks)
  - Bespoke Web Apps / Custom Dashboards: £1,200+ (3-4 weeks)
- Comparison vs WordPress: WordPress templates are slow, plugin-heavy, vulnerable, and require constant maintenance. Dean's custom React builds are stateless, lightning fast, highly secure, and tailored 100% to brand goals.

When users ask questions, provide clear answers and suggest using the "Request a Quote" form or clicking "Message on WhatsApp" to get in touch directly with Dean. Keep answers concise (under 120 words).`;

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

    let estimatedCost = "£299 - £599";
    let turnaround = "10 - 14 Business Days";
    let packageLabel = "Business Site";

    if (projectType === "business-site") {
      estimatedCost = "£299 - £599";
      turnaround = "10 - 14 Business Days";
      packageLabel = "Business Site";
    } else if (projectType === "custom-app") {
      estimatedCost = "£599 - £1,200";
      turnaround = "14 - 21 Business Days";
      packageLabel = "Custom App / Dashboard";
    } else if (projectType === "ai-integration") {
      estimatedCost = "£399 - £799";
      turnaround = "7 - 14 Business Days";
      packageLabel = "AI Integration";
    }

    // Send email via Resend
    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "dean.wilshaw@hotmail.com",
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
    return "Dean's bespoke websites typically range from £250 for starter landing pages up to £850 for full lead-generation business portals. Every site is custom built with React for maximum speed and zero monthly plugin bloat. Would you like to use our Quote Calculator below?";
  }
  if (q.includes("speed") || q.includes("performance") || q.includes("wordpress") || q.includes("slow")) {
    return "Unlike WordPress templates that load 20+ plugins and heavy themes, Dean builds clean React applications with Vite. This guarantees sub-second load times, 100/100 Core Web Vitals scores, and significantly higher Google rankings and conversion rates.";
  }
  if (q.includes("time") || q.includes("long") || q.includes("deadline")) {
    return "Most builds are delivered in 2 to 3 weeks. Coming from 25 years in logistics operations, Dean maintains a strict operational policy: zero missed deadlines and complete transparency throughout the project.";
  }
  if (q.includes("contact") || q.includes("whatsapp") || q.includes("email") || q.includes("location") || q.includes("cheshire") || q.includes("stoke")) {
    return "Dean is based in Cheshire & Stoke-on-Trent, serving local businesses across the North West and nationwide. You can message Dean directly on WhatsApp or fill out the Quote Request form on this page for a 24-hour response.";
  }
  return "Hi! I'm Dean's Client Support Assistant. Dean builds high-performance, bespoke websites that turn local Cheshire and Stoke traffic into paying customers. How can I help you today? Feel free to ask about pricing, timelines, or tech stack!";
}

startServer();
