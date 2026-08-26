import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const STITCH_SYSTEM_PROMPT = `ROLE: You are the 24/7 AI Lead Assistant & Trade Dispatcher for Dean Wilshaw Web Development (Cheshire & Stoke-on-Trent).

TONE & VOICE:
- Friendly, grounded, direct, and professional.
- Speak like a knowledgeable local contractor liaison.
- Keep responses concise (2-3 sentences max), honest, and actionable.

KEY CAPABILITIES & POSITIONING:
- 24/7 Job Triage: Qualify customer emergencies, answer FAQs regarding coverage areas (Cheshire & Stoke-on-Trent), pricing tiers, and turnaround times even at 11 PM on a Sunday.
- Commercial Pricing: Standalone Lead Tools from £149, Single-Page Websites from £299 (+ optional £49/mo care), Multi-Page and Custom Portals from £449-£599 / Custom Quote. 100% source code ownership, zero hidden fees.
- Goal: Direct serious enquiries to the instant quote form or 1-click WhatsApp message to Dean at 07348 733365.`;

function smartFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('cost') || q.includes('price') || q.includes('much') || q.includes('pricing') || q.includes('charge') || q.includes('fee') || q.includes('afford') || q.includes('budget')) {
    return "Pricing is structured in clear tiers: Standalone Lead Tools start from £149, Full Website Builds start from £299 with optional £49/month site care, and Custom Portals from £449-£599. Feel free to book a quick chat to discuss what suits your business best!";
  }
  if (q.includes('triage') || q.includes('emergency') || q.includes('dispatch') || q.includes('receptionist') || q.includes('overnight') || q.includes('weekend') || q.includes('sunday')) {
    return "The 24/7 AI Trade Dispatcher acts as a full-time receptionist: answering FAQs, diagnosing emergency job urgency with 3 smart questions, and routing qualified lead details straight to WhatsApp for a 1-tap quote reply.";
  }
  if (q.includes('fast') || q.includes('speed') || q.includes('slow') || q.includes('load') || q.includes('performance') || q.includes('wordpress')) {
    return "Dean builds custom React sites that load in under 1.5 seconds - significantly faster than typical trade sites. Fast mobile pages keep local customers from clicking away to competitors.";
  }
  if (q.includes('cheshire') || q.includes('stoke') || q.includes('sandbach') || q.includes('alsager') || q.includes('congleton') || q.includes('crewe') || q.includes('nantwich') || q.includes('cover') || q.includes('area') || q.includes('location') || q.includes('local') || q.includes('where')) {
    return "Yes! Dean is based in South Cheshire and primarily works with businesses across Cheshire and Stoke-on-Trent, though he works with clients UK-wide too.";
  }
  if (q.includes('how long') || q.includes('time') || q.includes('deadline') || q.includes('quick') || q.includes('week') || q.includes('turnaround') || q.includes('deliver')) {
    return "Standard builds are delivered in 3-5 days for single-page sites and 1-2 weeks for larger setups. Dean moves fast to get your business live.";
  }
  if (q.includes('aftercare') || q.includes('after care') || q.includes('support') || q.includes('maintain') || q.includes('maintenance') || q.includes('update') || q.includes('help after') || q.includes('ongoing') || q.includes('after build') || q.includes('once built')) {
    return "After the site is live, Dean offers an optional £49/month site care retainer covering hosting, security, daily backups, and support. You own your site outright with zero lock-in.";
  }
  if (q.includes('experience') || q.includes('qualified') || q.includes('know') || q.includes('skill') || q.includes('what can you do') || q.includes('what do you do') || q.includes('background') || q.includes('trained') || q.includes('bootcamp')) {
    return "Dean completed an AI-focused web development Skills Bootcamp and builds high-performance trade systems using React, Vite, and Tailwind CSS. You can view his live portfolio at dw-web-freelance.vercel.app.";
  }
  if (q.includes('mobile') || q.includes('phone') || q.includes('responsive') || q.includes('iphone') || q.includes('android') || q.includes('tablet')) {
    return "Every site Dean builds is mobile-first - meaning it is designed for phones before desktops. Most local trade customer enquiries happen on mobile, so this is essential.";
  }
  if (q.includes('google') || q.includes('seo') || q.includes('rank') || q.includes('search') || q.includes('find') || q.includes('traffic')) {
    return "Dean builds sites for local SEO - fast, semantic HTML properly structured for searches like 'roofer in Stoke' or 'driveways Cheshire'.";
  }
  if (q.includes('contact') || q.includes('reach') || q.includes('whatsapp') || q.includes('email') || q.includes('call') || q.includes('get in touch') || q.includes('speak')) {
    return "The easiest way to reach Dean is via WhatsApp at 07348 733365 or by filling in the quote form on this page.";
  }
  if (q.includes('redesign') || q.includes('existing') || q.includes('current site') || q.includes('old site') || q.includes('refresh') || q.includes('improve') || q.includes('update my')) {
    return "Full website rebuilds start from £299. Dean takes your existing content and rebuilds it faster, cleaner, and mobile-friendly to increase conversion rates.";
  }
  if (q.includes('ai') || q.includes('chatbot') || q.includes('automation') || q.includes('bot') || q.includes('intelligent') || q.includes('machine learning') || q.includes('tool')) {
    return "The 24/7 AI Lead Assistant & Trade Dispatcher qualifies emergency requests, diagnoses issues, and sends WhatsApp alerts directly to your phone. Standalone tools start from £149.";
  }
  if (q.includes('booking') || q.includes('appointment') || q.includes('calendar') || q.includes('schedule') || q.includes('reservation') || q.includes('system') || q.includes('dashboard') || q.includes('portal')) {
    return "Custom booking portals and multi-page web applications are available from £449-£599 via custom quote based on your exact workflow.";
  }
  if (q.includes('example') || q.includes('portfolio') || q.includes('previous') || q.includes('work') || q.includes('seen') || q.includes('show') || q.includes('past') || q.includes('project')) {
    return "You can explore live interactive demos and trade mockups directly on this site or request a free 24-hour preview for your business.";
  }
  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('morning') || q.includes('evening') || q.includes('afternoon')) {
    return "Hi there! Great to hear from you. I am the 24/7 AI Assistant for Dean Wilshaw. How can I help with your trade website or quote today?";
  }
  return "Good question! The best way to get a proper answer is to fill in the quote form below or message Dean directly on WhatsApp at 07348 733365 - he typically replies within a few hours.";
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
