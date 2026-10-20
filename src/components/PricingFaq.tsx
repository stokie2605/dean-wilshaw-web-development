import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'How much does it cost?',
    answer: "Every site is a fixed price agreed before I start. Message me and I'll give you a price within the day.",
  },
  {
    question: 'Is this better than paying Checkatrade?',
    answer: 'Directories rent you leads that are shared with other trades. Your own site and Google profile bring enquiries that are yours to keep.',
  },
  {
    question: 'How long does a build take?',
    answer: 'Most single page sites go live in 5 to 7 working days. Web apps depend on what you need.',
  },
  {
    question: 'What if I need updates later?',
    answer: 'Message me directly. Small updates are quick, and I can look after your site each month if you prefer.',
  },
  {
    question: 'Do I need to buy hosting or a domain first?',
    answer: 'No. I set up the domain, hosting and security for you.',
  },
  {
    question: 'Can you build custom tools?',
    answer: 'Yes. I build quote calculators, booking systems and other tools for customers. Message me with what you need.',
  },
];

export const PricingFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-labelledby="pricing-faq-heading" className="max-w-3xl mx-auto">
      <h2 id="pricing-faq-heading" className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 text-center">
        Common questions
      </h2>
      <div className="border-t border-slate-300 dark:border-white/[0.14]">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.question} className="border-b border-slate-300 dark:border-white/[0.14]">
              <h3>
                <button
                  type="button"
                  id={`faq-trigger-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left py-4 min-h-[48px] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429]"
                >
                  <span className="text-base font-bold text-slate-900 dark:text-white">{item.question}</span>
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
                  <p className="pb-4 text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
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
