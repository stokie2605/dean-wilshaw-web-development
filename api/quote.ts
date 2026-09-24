import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, email, phone, details } = req.body;

  // Strict Payload Validation
  if (!name || !email || !details) {
    return res.status(400).json({ error: 'Missing required fields: name, email, or details.' });
  }

  const resend = getResend();
  
  // Guard against missing API Key
  if (!resend) {
    console.error('CRITICAL: RESEND_API_KEY is not configured.');
    return res.status(500).json({ error: 'Internal server configuration error.' });
  }

  const refNumber = 'DSW-' + Math.floor(100000 + Math.random() * 900000);

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['dean.wilshaw.web@gmail.com'],
      subject: `New Quote Request [${refNumber}] from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background: #dc2626; padding: 20px 24px;">
            <h1 style="color: white; margin: 0; font-size: 18px;">New Quote Request: Design Systems Web</h1>
            <p style="color: #fecaca; margin: 4px 0 0; font-size: 12px;">Reference: ${refNumber}</p>
          </div>
          <div style="padding: 24px; background: #fff;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #111;">${name || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Business / Note</td><td style="padding: 8px 0; color: #111;">${company || 'Direct Enquiry'}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; color: #111;"><a href="mailto:${email}" style="color: #dc2626;">${email || 'Not provided'}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; color: #111;">${phone || 'Not provided'}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 6px; font-weight: 600; font-size: 13px; color: #111;">Project Details:</p>
              <p style="margin: 0; font-size: 14px; color: #374151; white-space: pre-wrap;">${details || 'No details provided'}</p>
            </div>
          </div>
          <div style="background: #f9fafb; padding: 14px 24px; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
            Sent from designsystemsweb.co.uk: ${new Date().toLocaleString('en-GB')}
          </div>
        </div>
      `,
    });

    return res.json({
      success: true,
      refNumber,
      clientName: name,
      message: `Thank you, ${name}. Your request has been sent under reference ${refNumber}. Dean will reply to you at ${email}.`,
    });
  } catch (emailErr) {
    console.error('Resend execution error:', emailErr);
    return res.status(500).json({ error: 'Failed to dispatch email.' });
  }
}
