import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsProps {
  onBack: () => void;
}

export const TermsConditions: React.FC<TermsProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white text-[#191c1e]">
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
          <span className="font-geist font-bold text-sm">Dean Wilshaw Web Development</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-geist font-bold text-3xl sm:text-4xl text-[#191c1e] mb-2">Terms & Conditions</h1>
        <p className="text-[#76777d] text-sm mb-8">Last updated: July 2025 - These terms apply to all web development work carried out by Dean Wilshaw (sole trader).</p>

        <div className="space-y-8 text-[#45464d] leading-relaxed">

          <section>
            <h2 className="font-geist font-bold text-lg text-[#191c1e] mb-3">1. The Parties</h2>
            <p>"Dean Wilshaw" (referred to as "I", "me", or "the developer") is a sole trader providing web development services. "The Client" refers to the individual or business engaging my services. By commissioning work, both parties agree to these terms.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-[#191c1e] mb-3">2. Quotes & Project Scope</h2>
            <p className="mb-2">All quotes are provided based on the information supplied by the Client at the time of enquiry. A quote is valid for 30 days from issue. Work begins only once both parties have agreed the scope in writing (email or WhatsApp is sufficient) and a deposit has been received.</p>
            <p>Any significant changes to the agreed scope after work has begun may result in additional charges, which will be discussed and agreed before proceeding.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-[#191c1e] mb-3">3. Payment Terms</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>A <strong>50% deposit</strong> is required before work commences.</li>
              <li>The remaining <strong>50% is due upon project completion</strong>, before the final site is handed over or made live.</li>
              <li>Payment is accepted via bank transfer. Details will be provided on invoice.</li>
              <li>If payment is not received within 14 days of the final invoice, I reserve the right to suspend or remove the completed work until payment is made.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-[#191c1e] mb-3">4. Revisions</h2>
            <p className="mb-2">All projects include <strong>two rounds of revisions</strong> as standard. A revision round means a consolidated set of changes provided by the Client in one go.</p>
            <p>Additional revision rounds beyond the two included will be charged at <strong>£35 per hour</strong>, agreed in advance.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-[#191c1e] mb-3">5. Timelines & Delivery</h2>
            <p className="mb-2">Estimated timelines are provided in good faith and I will always aim to meet them. However, timelines depend on the Client providing content (text, images, logos) in a timely manner.</p>
            <p>If the Client fails to provide required content within 14 days of being requested, the project may be delayed without penalty to me.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-[#191c1e] mb-3">6. Ownership & Intellectual Property</h2>
            <p className="mb-2">Upon receipt of full payment, the Client owns the completed website and all associated code created specifically for their project.</p>
            <p className="mb-2">I retain the right to use the project in my portfolio and for promotional purposes unless the Client requests otherwise in writing.</p>
            <p>Any third-party assets (stock images, fonts, plugins) remain subject to their respective licences. It is the Client's responsibility to ensure they have the rights to any content they provide to me.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-[#191c1e] mb-3">7. Hosting & Domain</h2>
            <p>Unless otherwise agreed, hosting and domain registration are the Client's responsibility. I am happy to advise on suitable providers. I am not liable for any downtime, data loss, or issues caused by third-party hosting or domain providers.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-[#191c1e] mb-3">8. Cancellation</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>If the Client cancels after work has begun, the deposit is non-refundable.</li>
              <li>If I am unable to complete the project for any reason, I will refund any payments made for work not yet delivered.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-[#191c1e] mb-3">9. Limitation of Liability</h2>
            <p>I will always carry out work to the best of my ability. However, I cannot be held liable for any loss of business, revenue, or data arising from use of the website. My total liability in any dispute shall not exceed the total amount paid by the Client for the project in question.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-[#191c1e] mb-3">10. Monthly Care Plan</h2>
            <p className="mb-2">The Monthly Care Plan is a rolling monthly arrangement with no minimum term. Either party may cancel with <strong>30 days' written notice</strong> (WhatsApp or email).</p>
            <p>The care plan covers minor content updates and priority support only. It does not include new features, redesigns, or significant new development work.</p>
          </section>

          <section>
            <h2 className="font-geist font-bold text-lg text-[#191c1e] mb-3">11. Governing Law</h2>
            <p>These terms are governed by the laws of England and Wales.</p>
          </section>

          <section className="bg-[#f7f9fb] border border-[#e0e3e5] rounded-xl p-5">
            <h2 className="font-geist font-bold text-lg text-[#191c1e] mb-2">Questions?</h2>
            <p>If you have any questions about these terms, please get in touch via WhatsApp or the quote form on the main site.</p>
          </section>

        </div>
      </div>
    </div>
  );
};
