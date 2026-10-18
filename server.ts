import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", studio: "Dean Wilshaw Web Development" });
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
          from: "Dean Wilshaw <dean@designsystemsweb.co.uk>",
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

  // Website Health Check endpoint
  app.post("/api/health-check", async (req, res) => {
    const { default: healthCheckHandler } = await import("./api/health-check");
    return healthCheckHandler(req as any, res as any);
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
    const fs = await import("fs");
    const zlib = await import("zlib");

    const sendCompressedFile = (req: express.Request, res: express.Response, filePath: string) => {
      const ext = path.extname(filePath).toLowerCase();
      const mimeMap: Record<string, string> = {
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".svg": "image/svg+xml",
        ".xml": "application/xml; charset=utf-8",
        ".json": "application/json; charset=utf-8",
      };
      const mime = mimeMap[ext];
      const acceptEncoding = String(req.headers["accept-encoding"] || "");
      if (mime && acceptEncoding.includes("gzip") && fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath);
        res.setHeader("Content-Type", mime);
        res.setHeader("Content-Encoding", "gzip");
        if (ext === ".css" || ext === ".js") {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
        return res.send(zlib.gzipSync(raw));
      }
      return res.sendFile(filePath);
    };

    app.get(["/check", "/check/"], (req, res) => {
      sendCompressedFile(req, res, path.join(distPath, "check.html"));
    });
    app.use((req, res, next) => {
      if (req.method === "GET") {
        const candidate = path.join(distPath, req.path);
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
          return sendCompressedFile(req, res, candidate);
        }
      }
      return next();
    });
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      sendCompressedFile(req, res, path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Design Systems Web server running on http://localhost:${PORT}`);
  });
}

startServer();
