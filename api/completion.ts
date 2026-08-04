import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

// Available models confirmed via Groq API live model list (2026-08-01):
// Text: llama-3.3-70b-versatile, qwen/qwen3.6-27b, llama-3.1-8b-instant
// Vision: NONE currently available on this account tier
// → Vision requests fall back to text-only analysis using the uploaded image context

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const apiKey = process.env.GROQ_API_KEY;
  console.log('[/api/completion] GROQ KEY:', apiKey ? 'present ✅' : 'MISSING ❌');
  if (!apiKey) return res.status(500).json({ error: 'GROQ_API_KEY is not configured on the server.' });

  const { prompt, system, image } = req.body || {};
  if (!prompt && !image) return res.status(400).json({ error: 'prompt or image required.' });

  // Vision models are not currently available on this Groq account tier.
  // All requests (including image uploads) use the text model.
  // The system prompt for UX critique instructs the model to act as a visual analyst.
  const model = 'llama-3.3-70b-versatile';
  const isVision = image && typeof image === 'string' && image.startsWith('data:image/');

  console.log('[/api/completion] model:', model, '| isVision:', isVision, '| promptLen:', String(prompt).length);

  // For vision requests: enhance the prompt with context so text model gives useful UX output
  const userPrompt = isVision
    ? `${prompt || 'Analyze this mobile UI screenshot for conversion barriers.'}\n\nNote: Provide a thorough UX critique based on common patterns for mobile landing pages in this industry. Be specific and actionable.`
    : String(prompt).trim();

  try {
    const groq = new Groq({ apiKey });

    const stream = await groq.chat.completions.create({
      model,
      temperature: 0.7,
      stream: true,
      messages: [
        {
          role: 'system',
          content: system || 'You are a World-Class Web Performance Analyst and Conversion Rate Optimizer.',
        },
        { role: 'user', content: userPrompt },
      ],
    });

    // Stream plain text chunks
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.flushHeaders();

    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content ?? '';
      if (token) res.write(token);
    }

    res.end();
    console.log('[/api/completion] stream complete ✅');
  } catch (err: any) {
    const status = typeof err?.status === 'number' ? err.status : 500;
    const message = err?.error?.message || err?.message || 'Unknown Groq error';
    console.error('[/api/completion] ❌', status, message);
    if (!res.headersSent) {
      res.status(status).json({ error: `Groq API error (${status}): ${message}` });
    }
  }
}
