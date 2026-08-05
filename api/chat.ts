import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const STITCH_SYSTEM_PROMPT = `ROLE: You are the friendly, down-to-earth AI assistant for Dean Wilshaw, a freelance web developer in Cheshire & Stoke-on-Trent.

TONE & VOICE:
- Friendly, grounded, peer-to-peer, and direct.
- Speak like a helpful local professional talking to another local business owner over coffee.
- DO NOT be patronizing, talk down to users, or use childish ELI5 analogies (e.g. avoid 'hosting is like a shop window' or 'domains are street addresses' unless explicitly asked).
- Keep responses concise (2-4 sentences max), honest, and practical.

KEY BEHAVIORS:
- Treat visitors as smart business owners who value straightforward answers.
- Avoid unnecessary dev jargon (don't ramble about frameworks, APIs, or SSR), but speak normally about standard website features (mobile layout, contact forms, Google search presence, fast load times).
- Pricing: Explain that quotes are tailored to individual project scope with flexible split-payment options for local budgets.
- Goal: Answer questions directly and invite them to request a quote or drop Dean a message on WhatsApp.`;

function smartFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('cost') || q.includes('price') || q.includes('much') || q.includes('pricing') || q.includes('charge') || q.includes('fee') || q.includes('afford') || q.includes('budget')) {
    return "Pricing is flexible, with monthly or split-payment options tailored to small local budgets. Feel free to book a 15-minute chat to discuss what works best for you!";
  }
  if (q.includes('fast') || q.includes('speed') || q.includes('slow') || q.includes('load') || q.includes('performance') || q.includes('wordpress')) {
    return "Dean builds custom React sites that load in under 0.5 seconds — much faster than typical WordPress sites which can take 3-5 seconds. Faster sites rank better on Google and keep visitors from clicking away.";
  }
  if (q.includes('cheshire') || q.includes('stoke') || q.includes('sandbach') || q.includes('alsager') || q.includes('congleton') || q.includes('crewe') || q.includes('nantwich') || q.includes('cover') || q.includes('area') || q.includes('location') || q.includes('local') || q.includes('where')) {
    return "Yes! Dean is based in South Cheshire and primarily works with businesses across Cheshire and Stoke-on-Trent, though he works with clients UK-wide too.";
  }
  if (q.includes('how long') || q.includes('time') || q.includes('deadline') || q.includes('quick') || q.includes('week') || q.includes('turnaround') || q.includes('deliver')) {
    return "Projects have a strict 1-2 weeks turnaround time. Dean moves fast to get your business live.";
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
    return "Yes! Core Business Web Apps (£1,200–£1,800) include custom client portals, dashboards, and booking systems.";
  }
  if (q.includes('example') || q.includes('portfolio') || q.includes('previous') || q.includes('work') || q.includes('seen') || q.includes('show') || q.includes('past') || q.includes('project')) {
    return "Dean's main completed project is a School IT Support Refresh — you can view it on his GitHub at github.com/stokie2605. He also produces mockup redesigns for local businesses as part of his pitch process.";
  }
  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('morning') || q.includes('evening') || q.includes('afternoon')) {
    return "Hi there! Great to hear from you. I'm the AI Assistant for Dean Wilshaw. Can I help you book a 15-minute chat with Dean?";
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
