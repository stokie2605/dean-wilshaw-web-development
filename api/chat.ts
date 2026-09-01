import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const STITCH_SYSTEM_PROMPT = `You are StitchBot, an AI assistant for Dean Wilshaw Web Development.
Your role is to help tradespeople, contractors, and small business owners understand website packages, features, and pricing in clear, jargon-free British English.

CORE BUSINESS FACTS & PRICING:
- Founder & Developer: Dean Wilshaw.
- Service: Custom, hand-crafted websites purpose-built for trade and commercial businesses (plumbers, electricians, builders, joiners, emergency dispatch, etc.).
- Delivery Timeframe: Typically 5 to 7 working days from brief approval to live launch.
- Ownership: 100 percent code and asset ownership transferred to the client. Zero proprietary lock-in.
- Retainer & Site Care: Optional £49 per month managed care plan covering high-speed cloud hosting, security monitoring, regular backups, and direct content updates.
- One-Off Build Pricing: Transparent, fixed project quotes based on scope. No hidden monthly platform software subscriptions.

CONVERSATIONAL RULES:
- Tone: Grounded, professional, straightforward, and friendly British English. No buzzwords, hyphens, em-dashes, or exaggerated marketing claims.
- Brevity: Keep responses concise (2 to 4 sentences). Tradespeople want direct answers, not essays.
- Guardrail on Unlisted Info: If asked for custom integrations, bespoke features, or exact quotes outside standard packages, direct them to fill out the quick quote form or contact Dean directly.
- Primary Call to Action: Encourage visitors to check the "Six Trade Concepts" on the Demos page or submit the quote form to discuss their project.`;

function smartFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('cost') || q.includes('price') || q.includes('much') || q.includes('pricing') || q.includes('charge') || q.includes('fee') || q.includes('budget')) {
    return "Pricing is transparent and fixed per project: Standalone Lead Tools from £149, Complete Trade Builds from £299, and Custom Infrastructure from £449, plus an optional £49 per month site care retainer. You own 100 percent of your code with zero ongoing platform lock in. Check the Pricing page or request a quick quote for your project.";
  }
  if (q.includes('how long') || q.includes('time') || q.includes('turnaround') || q.includes('deliver') || q.includes('deadline') || q.includes('quick') || q.includes('days')) {
    return "Standard builds are typically completed and launched within 5 to 7 working days from brief approval. Dean works directly with you to get your site live quickly without delays.";
  }
  if (q.includes('retainer') || q.includes('care') || q.includes('hosting') || q.includes('support') || q.includes('maintain') || q.includes('maintenance') || q.includes('aftercare')) {
    return "Dean offers an optional £49 per month managed care plan covering cloud hosting, security monitoring, regular backups, and direct content updates. You own your website outright with zero ongoing platform lock in.";
  }
  if (q.includes('demo') || q.includes('example') || q.includes('portfolio') || q.includes('concept') || q.includes('show') || q.includes('work')) {
    return "You can explore live interactive prototypes in the Six Trade Concepts section on the Demos page. They showcase layouts built for emergency callouts, commercial tenders, bespoke craft, surveying, lead dispatch, and vehicle services.";
  }
  if (q.includes('contact') || q.includes('whatsapp') || q.includes('phone') || q.includes('email') || q.includes('call') || q.includes('reach') || q.includes('speak')) {
    return "You can reach Dean directly on WhatsApp or phone at 07348 733365, or via email at dean.wilshaw.web@gmail.com. He typically replies within a few hours.";
  }
  if (q.includes('cheshire') || q.includes('stoke') || q.includes('location') || q.includes('where') || q.includes('area') || q.includes('local')) {
    return "Dean is based in Cheshire and Stoke on Trent, working directly with trades and small businesses locally and nationwide.";
  }
  if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
    return "Hi there! I am StitchBot, Dean's AI assistant. I can answer questions about website packages, pricing, timelines, or tools. How can I help you today?";
  }
  return "Thanks for asking. For specific project details or custom requirements, please submit the quick quote form on this site or message Dean directly on WhatsApp at 07348 733365.";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.json({ response: smartFallback(message), fallback: true });
  }

  try {
    const groq = new Groq({ apiKey });

    const formattedHistory = Array.isArray(history)
      ? history.slice(-6).map((item: { role: string; content: string }) => ({
          role: item.role === 'user' ? 'user' : 'assistant',
          content: item.content,
        }))
      : [];

    const messages = [
      { role: 'system', content: STITCH_SYSTEM_PROMPT },
      ...formattedHistory,
      { role: 'user', content: message }
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: messages as any,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_tokens: 250,
    });

    const reply = chatCompletion.choices[0]?.message?.content;
    
    if (reply) {
      return res.json({ response: reply });
    } else {
      console.error('Unexpected Groq response format');
      return res.json({ response: smartFallback(message), fallback: true });
    }

  } catch (error) {
    console.error('Groq error:', error);
    return res.json({ response: smartFallback(message), fallback: true });
  }
}
