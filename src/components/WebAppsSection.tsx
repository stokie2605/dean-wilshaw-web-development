import React from 'react';
import { CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';

const WHATSAPP_APP_URL = `https://wa.me/447348733365?text=${encodeURIComponent(
  "Hi Dean, I'd like to discuss a custom web app or customer tool for my business."
)}`;

const APP_FEATURES: { title: string; description: string; points: string[] }[] = [
  {
    title: 'Instant quote calculators',
    description: 'Customers pick the job, see a rough price on their phone, and send the details straight to your WhatsApp.',
    points: [
      'Filters out time wasters',
      'Works directly in any mobile browser',
    ],
  },
  {
    title: 'Online booking',
    description: 'Customers pick a service and a time that suits them, day or night, without ringing round.',
    points: [
      'Urgent jobs flagged straight away',
      'Customers pick their own time',
      'Instant WhatsApp or email alerts to your phone',
    ],
  },
  {
    title: 'Reminders that bring customers back',
    description: 'Keep your customers coming back every year with automated reminder systems for annual boiler servicing, MOTs, or recurring maintenance.',
    points: [
      "Automatic reminders when something's due",
      'Simple one tap rebooking links',
    ],
  },
  {
    title: 'Installable Home Screen Web Apps',
    description: 'Apps that customers open via a link and save straight to their iPhone or Android home screen with your business icon.',
    points: [
      'No App Store or Google Play downloads needed',
      'Far cheaper than a traditional app',
    ],
  },
];

export const WebAppsSection: React.FC = () => {
  return (
    <section id="web-apps" className="scroll-mt-20 sm:scroll-mt-24 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#040507] border-b border-slate-200 dark:border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-3 rounded-full bg-red-500/10 text-[#D90429] dark:text-red-400 border border-red-500/20 font-mono text-[11px] font-semibold tracking-wider uppercase">
            Custom Software and Tools
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Need more than a standard website?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            I build custom web applications and customer tools that run straight from a browser or pin to a phone home screen. No App Store needed, and far cheaper than a traditional app.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {APP_FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg transition-all hover:border-[#D90429]/40 group"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-[#D90429] dark:group-hover:text-red-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-5">
                  {feature.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {feature.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl max-w-3xl mx-auto text-center flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Have a custom tool or app idea?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-xl mx-auto mb-6 leading-relaxed">
            Tell me what you need your customers or team to do on their phone. I will map out the simplest way to build it and give you a clear, fixed quote.
          </p>
          <a
            href={WHATSAPP_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#D90429] hover:bg-[#b80322] active:bg-[#9a021c] text-white dark:bg-white dark:hover:bg-zinc-200 dark:active:bg-zinc-300 dark:text-black font-bold text-sm transition-all shadow-lg shadow-red-600/20 inline-flex items-center justify-center gap-2 group"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Discuss a Web App on WhatsApp</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
