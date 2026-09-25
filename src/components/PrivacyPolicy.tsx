import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040507] text-slate-900 dark:text-zinc-100">
      {/* Header */}
      <div className="bg-[#191c1e] text-white px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-300 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </button>
          <div className="h-4 w-px bg-slate-600" />
          <span className="font-geist font-bold text-sm">Design Systems Web</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-geist font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-500 dark:text-zinc-400 text-sm mb-8">
          Last updated: September 2026. This policy explains how Dean Wilshaw (sole trader) collects and uses personal data in compliance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
        </p>

        <div className="space-y-8 text-slate-700 dark:text-zinc-300 leading-relaxed">

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">1. Who I Am (Data Controller)</h2>
            <p>
              Dean Wilshaw, trading as Design Systems Web, is the data controller for personal information collected through this website.
            </p>
            <p className="mt-2">
              Trading address: 9 Bankside Court, Alsager, Cheshire, ST7, UK.<br />
              Email: <a href="mailto:dean@designsystemsweb.co.uk" className="text-[#D90429] hover:underline">dean@designsystemsweb.co.uk</a><br />
              Phone: <a href="tel:07348733365" className="text-[#D90429] hover:underline">07348 733365</a>
            </p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">2. How You Contact Me &amp; What Data Is Collected</h2>
            <p className="mb-2">I collect personal information only when you voluntarily initiate contact with me:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>WhatsApp Enquiries (Primary):</strong> When you click the WhatsApp link or message me on 07348 733365, your phone number, profile name, and message contents are transmitted to me via WhatsApp.
              </li>
              <li>
                <strong>Website Quote Requests (Secondary):</strong> If you submit a project request form on this site, I collect your name, email address, phone number, and brief project requirements.
              </li>
              <li>
                <strong>Direct Telephone &amp; Email:</strong> If you call or email me directly, I receive your contact details and message contents.
              </li>
            </ul>
            <p className="mt-2">
              I do not run tracking cookies, third party advertising trackers, or marketing pixels on this website.
            </p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">3. Legal Basis &amp; Purpose of Processing</h2>
            <p>
              Under UK GDPR Article 6, the lawful basis for processing your data is <strong>Legitimate Interests</strong> and taking steps at your request prior to entering into a contract. 
            </p>
            <p className="mt-2">
              Your details are used strictly to communicate with you, evaluate your project requirements, and provide a fixed quotation for web design or software development services. Your details are never sold, rented, or added to automated marketing newsletters.
            </p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">4. Third Party Data Processors</h2>
            <p className="mb-2">To deliver this service, the following third party processors handle relevant data:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>WhatsApp / Meta Platforms Ireland Limited:</strong> Provides the messaging infrastructure for customer enquiries. Your interactions are subject to WhatsApp's Terms of Service and Privacy Policy.
              </li>
              <li>
                <strong>Resend &amp; Google Workspace:</strong> Deliver and store quote request notifications sent to my secure inbox.
              </li>
              <li>
                <strong>Vercel Inc:</strong> Hosts this website on its global edge network over secure HTTPS encryption.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">5. Data Retention</h2>
            <p>
              Enquiry messages and contact records are retained for up to 12 months for commercial reference, accounting records, or project correspondence. After this period, records that did not proceed to an active contract are securely deleted.
            </p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">6. Your Rights Under UK GDPR</h2>
            <p className="mb-2">You hold the following rights regarding your personal data:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Right of access: Request a copy of information held about you</li>
              <li>Right to rectification: Request correction of inaccurate data</li>
              <li>Right to erasure: Request deletion of your personal data</li>
              <li>Right to restrict processing: Limit how your data is used</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact Dean Wilshaw directly via WhatsApp on 07348 733365 or email dean@designsystemsweb.co.uk. Requests are addressed within 30 calendar days without charge.
            </p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">7. Supervisory Authority</h2>
            <p>
              If you have concerns about how your data is processed, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at <strong>ico.org.uk</strong> or by telephoning 0303 123 1113.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};
