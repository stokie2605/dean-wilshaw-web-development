import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const STITCH_SYSTEM_PROMPT = `You are Stitch, the clever, witty, and highly capable AI assistant for Dean Wilshaw's independent web development studio based in South Cheshire, UK.
Your goal is to be conversational, engaging, and genuinely helpful. You can chat about anything, but you always subtly represent Dean's web design business.

Key Facts to draw from when relevant:
- Developer: Dean Wilshaw, based in South Cheshire (Alsager/Sandbach).
- Specialty: Blazing fast, mobile-first React websites for local tradespeople and small businesses.
- Background: Recently completed a Skills Bootcamp in AI-assisted web development.
- Services: Business websites (from £449), Redesigns (from £314), AI integrations & Custom Apps (from £539).
- Turnaround: Typically 1-3 weeks. No monthly contracts. Upfront pricing.

CRITICAL RULES:
1. NEVER write massive essays. Keep every response punchy and short (1-3 sentences maximum).
2. If the user asks a random or off-topic question, answer it cleverly and naturally! Show off your personality.
3. Only pitch Dean's services or mention the quote form/WhatsApp if it naturally fits the conversation. Do not mechanically repeat "use the quote form" in every message.
4. If asked about pricing or technical details, give a direct, honest answer without jargon.`;

function smartFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('cost') || q.includes('price') || q.includes('much') || q.includes('pricing') || q.includes('charge') || q.includes('fee') || q.includes('afford') || q.includes('budget')) {
    return "Business sites start from £449, redesigns from £314, custom apps from £539, and AI integrations from £539. All prices are upfront with no hidden monthly fees. Fill in the quote form for a specific price!";
  }
  if (q.includes('fast') || q.includes('speed') || q.includes('slow') || q.includes('load') || q.includes('performance') || q.includes('wordpress')) {
    return "Dean builds custom React sites that load in under 0.5 seconds — much faster than typical WordPress sites which can take 3-5 seconds. Faster sites rank better on Google and keep visitors from clicking away.";
  }
  if (q.includes('cheshire') || q.includes('stoke') || q.includes('sandbach') || q.includes('alsager') || q.includes('congleton') || q.includes('crewe') || q.includes('nantwich') || q.includes('cover') || q.includes('area') || q.includes('location') || q.includes('local') || q.includes('where')) {
    return "Yes! Dean is based in South Cheshire and primarily works with businesses across Cheshire and Stoke-on-Trent, though he works with clients UK-wide too.";
  }
  if (q.includes('how long') || q.includes('time') || q.includes('deadline') || q.includes('quick') || q.includes('week') || q.includes('turnaround') || q.includes('deliver')) {
    return "Most business websites are delivered in 1-2 weeks. More complex projects take 2-3 weeks. Dean is transparent about timelines from the start.";
  }
  if (q.includes('aftercare') || q.includes('after care') || q.includes('support') || q.includes('maintain') || q.includes('maintenance') || q.includes('update') || q.includes('help after') || q.includes('ongoing') || q.includes('after build') || q.includes('once built')) {
    return "After the site is live, Dean is available on WhatsApp for any questions or small changes. For larger updates, he offers a simple hourly rate with no retainer required. You own your site outright — no lock-in.";
  }
  if (q.includes('experience') || q.includes('qualified') || q.includes('know') || q.includes('skill') || q.includes('what can you do') || q.includes('what do you do') || q.includes('background') || q.includes('trained') || q.includes('bootcamp')) {
    return "Dean recently completed an AI-focused web development Skills Bootcamp and has a completed IT refresh project for a local school on his GitHub. He specialises in React, Vite, and Tailwind CSS.";
  }
  if (q.includes('mobile') || q.includes('phone') || q.includes('responsive') || q.includes('iphone') || q.includes('android') || q.includes('tablet')) {
    return "Every site Dean builds is mobile-first — meaning it's designed for phones before desktops. Over 80% of local business searches happen on mobile, so this is essential.";
  }
  if (q.includes('google') || q.includes('seo') || q.includes('rank') || q.includes('search') || q.includes('find') || q.includes('traffic')) {
    return "Dean builds sites the way Google likes them — fast, semantic HTML, properly structured for local searches like 'plumber near me'. He can also connect your site to your Google Business Profile.";
  }
  if (q.includes('contact') || q.includes('reach') || q.includes('whatsapp') || q.includes('email') || q.includes('call') || q.includes('get in touch') || q.includes('speak')) {
    return "The easiest way to reach Dean is via WhatsApp — just hit the WhatsApp button on this page. Alternatively, fill in the quote form and he'll get back to you within 24 hours.";
  }
  if (q.includes('redesign') || q.includes('existing') || q.includes('current site') || q.includes('old site') || q.includes('refresh') || q.includes('improve') || q.includes('update my')) {
    return "Yes, website redesigns start from £314. Dean can take your existing site and rebuild it faster, cleaner, and mobile-friendly — keeping your branding but massively improving performance.";
  }
  if (q.includes('ai') || q.includes('chatbot') || q.includes('automation') || q.includes('bot') || q.includes('intelligent') || q.includes('machine learning')) {
    return "AI integrations start from £539. Dean can add chatbots, automated enquiry handling, or AI-powered features to your website — like the assistant you're chatting to right now!";
  }
  if (q.includes('booking') || q.includes('appointment') || q.includes('calendar') || q.includes('schedule') || q.includes('reservation') || q.includes('system') || q.includes('dashboard') || q.includes('portal')) {
    return "Yes! Custom web apps like booking systems and dashboards are available from £539. Dean has built tools like this — check out his GitHub at github.com/stokie2605 for examples. Fill in the quote form to discuss your specific needs.";
  }
  if (q.includes('example') || q.includes('portfolio') || q.includes('previous') || q.includes('work') || q.includes('seen') || q.includes('show') || q.includes('past') || q.includes('project')) {
    return "Dean's main completed project is a School IT Support Refresh — you can view it on his GitHub at github.com/stokie2605. He also produces mockup redesigns for local businesses as part of his pitch process.";
  }
  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('morning') || q.includes('evening') || q.includes('afternoon')) {
    return "Hi there! Great to hear from you. I'm Dean's support assistant — ask me anything about pricing, timelines, coverage, or what Dean can build for you!";
  }
  return "Good question! The best way to get a proper answer is to fill in the quote form below or message Dean directly on WhatsApp — he typically replies within a few hours.";
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
      temperature: 0.7,
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
