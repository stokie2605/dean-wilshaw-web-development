import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'How long does it actually take?',
    answer: 'Most single page builds go live within five to seven working days from our first message.',
  },
  {
    question: 'What if I want changes later?',
    answer: 'You can ask for updates any time. Small changes are often quick and low cost, bigger changes are quoted upfront before any work starts.',
  },
  {
    question: 'Do I need to know anything technical?',
    answer: 'No. You review everything on your phone before paying the final balance, and I handle the rest.',
  },
];

export const PricingFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-labelledby="pricing-faq-heading" className="max-w-3xl mx-auto">
      <h2 id="pricing-faq-heading" className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 text-center">
        Quick Questions
      </h2>
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={item.question}
              className={`bg-white dark:bg-[#0A0D14] rounded-2xl border shadow-lg transition-colors ${
                isOpen ? 'border-[#D90429]/60' : 'border-slate-200 dark:border-white/[0.08]'
              }`}
            >
              <h3>
                <button
                  type="button"
                  id={`faq-trigger-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 min-h-[3.25rem] rounded-2xl"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#D90429]' : 'text-slate-400 dark:text-zinc-500'
                    }`}
                  />
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
