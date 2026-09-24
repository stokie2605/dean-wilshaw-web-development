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
        <p className="text-slate-500 dark:text-zinc-400 text-sm mb-8">Last updated: September 2026. This policy explains how Dean Wilshaw (sole trader) collects and uses your personal data.</p>

        <div className="space-y-8 text-slate-700 dark:text-zinc-300 leading-relaxed">

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">1. Who I Am</h2>
            <p>Dean Wilshaw is a sole trader providing web development services, based in Alsager, Cheshire, UK. If you have any questions about how your data is used, you can contact me via the quote form or WhatsApp on this website.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">2. What Data I Collect</h2>
            <p className="mb-2">When you submit a quote request on this website, I collect the following information:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your phone number</li>
              <li>Details about your project</li>
            </ul>
            <p className="mt-2">I do not collect any payment information through this website. I do not use cookies for tracking or analytics.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">3. Why I Collect It</h2>
            <p>I collect this information solely to respond to your enquiry and provide you with a quote for web development services. I will not use your details for any other purpose without your explicit consent.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">4. How I Use It</h2>
            <p className="mb-2">Your submitted details are:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Sent by email through Resend (a third party email delivery service), which keeps a copy for a limited period</li>
              <li>Delivered to my Gmail inbox (Google), where they are kept only to respond to you</li>
              <li>Never sold, shared, or passed to any third party for marketing purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">5. Third Party Services</h2>
            <p className="mb-2">This website uses the following third party services:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Resend</strong> (resend.com), used to deliver your quote request to my inbox. Resend keeps a copy of each email for a limited period and processes it in line with its own privacy policy.</li>
              <li><strong>Google (Gmail)</strong>, where your quote request arrives and is stored.</li>
              <li><strong>Google Fonts</strong>, used to display the text on this website. When a page loads, Google receives your IP address.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">6. How Long I Keep Your Data</h2>
            <p>I retain your enquiry details for up to 6 months from the date of submission, or until my project is complete, whichever is longer. After this period, your details are deleted from my inbox.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">7. Your Rights</h2>
            <p className="mb-2">Under UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Request a copy of the data I hold about you</li>
              <li>Ask me to correct any inaccurate data</li>
              <li>Ask me to delete your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, please contact me via WhatsApp or the quote form on this site. I will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">8. Security</h2>
            <p>I take reasonable precautions to protect your data. This website is hosted on Vercel, which maintains industry standard security practices. Data submitted through the quote form is transmitted securely over HTTPS.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">9. Changes to This Policy</h2>
            <p>I may update this privacy policy from time to time. Any changes will be posted on this page with an updated date at the top.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-3">10. Complaints</h2>
            <p>If you are unhappy with how I have handled your data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at <strong>ico.org.uk</strong>.</p>
          </section>

          <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-5">
            <h2 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-2">Questions?</h2>
            <p>If you have any questions about this privacy policy or how your data is used, please get in touch via WhatsApp or the quote form on the main site.</p>
          </section>

        </div>
      </div>
    </div>
  );
};

