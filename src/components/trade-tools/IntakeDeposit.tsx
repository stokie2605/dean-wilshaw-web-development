import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

export const IntakeDeposit: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [urgency, setUrgency] = useState<string>('Standard (1-2 Weeks)');

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-md">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-4 mb-5">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">Secure Priority Booking</h3>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
          Step {step} of 2
        </span>
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <label className="block text-xs text-slate-500 dark:text-zinc-400 font-medium">When do you need the service completed?</label>
          <div className="grid grid-cols-2 gap-2">
            {['Urgent (1-3 Days)', 'Standard (1-2 Weeks)', 'Planning Ahead', 'Emergency Callout'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setUrgency(option)}
                className={`p-3 rounded-xl text-xs text-left transition-all ${
                  urgency === option
                    ? 'bg-[#D90429] text-white font-medium shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full mt-4 py-3 px-4 rounded-xl bg-[#D90429] hover:bg-[#b80322] text-white font-bold text-sm transition-all shadow-sm shadow-red-600/20"
          >
            Continue to Secure Slot
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2 text-xs shadow-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-zinc-400">Service:</span>
              <span className="text-slate-900 dark:text-white font-medium">Initial Consultation / Callout</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-zinc-400">Timeline:</span>
              <span className="text-slate-900 dark:text-white font-medium">{urgency}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-zinc-800 mt-2">
              <span className="text-slate-700 dark:text-zinc-300 font-bold">Booking Deposit:</span>
              <span className="text-slate-900 dark:text-white font-bold">£25.00</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-zinc-400 text-right mt-1">Deducted from final service cost</div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              alert("In a live environment, this securely redirects to a Stripe payment page.");
              setStep(1);
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay £25 Deposit Securely</span>
          </button>
          
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full py-2 text-xs text-slate-500 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-300 transition-colors"
          >
            Back to previous step
          </button>
        </div>
      )}
    </div>
  );
};
