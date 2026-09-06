import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, Clock, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

const PIPELINE_STEPS = [
  { step: 1, label: 'Urgency Tier' },
  { step: 2, label: 'Arrival Window' },
  { step: 3, label: 'Hold & Lock' },
];

export const IntakeDeposit: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [urgency, setUrgency] = useState<string>('Urgent (1-3 Days)');
  const [slot, setSlot] = useState<string>('Morning (08:00 - 12:00)');
  const [isSuccess, setIsSuccess] = useState(false);

  const urgencyOptions = [
    { id: 'Emergency Callout', label: 'Emergency (Same Day)', fee: '£40 Deposit', highlight: 'Dispatched immediately' },
    { id: 'Urgent (1-3 Days)', label: 'Urgent (1-3 Days)', fee: '£25 Deposit', highlight: 'Priority queue hold' },
    { id: 'Standard (1-2 Weeks)', label: 'Standard (1-2 Wks)', fee: '£25 Deposit', highlight: 'Guaranteed calendar slot' },
    { id: 'Planned Scope', label: 'Planned Project', fee: '£25 Deposit', highlight: 'Site survey & spec' },
  ];

  const slotOptions = [
    { id: 'Morning (08:00 - 12:00)', label: 'Morning Slot', time: '08:00 - 12:00' },
    { id: 'Afternoon (12:00 - 16:00)', label: 'Afternoon Slot', time: '12:00 - 16:00' },
    { id: 'Flexible Next-Day', label: 'Anytime / First Available', time: 'Fastest dispatch' },
  ];

  const handlePay = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setStep(1);
    }, 3500);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5 text-slate-900 dark:text-white">
      
      {/* 3-Step Connected Pipeline Progress Track */}
      <div className="relative pb-2">
        <div className="flex items-center justify-between relative z-10">
          {PIPELINE_STEPS.map((s) => {
            const isCompleted = step > s.step;
            const isCurrent = step === s.step;
            return (
              <div key={s.step} className="flex flex-col items-center gap-1.5 flex-1">
                <button
                  type="button"
                  onClick={() => s.step < step && setStep(s.step)}
                  className={`w-7 h-7 rounded-full text-xs font-mono font-bold flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-black shadow-md'
                      : isCurrent
                      ? 'bg-[#D90429] text-white shadow-lg shadow-red-600/30 ring-4 ring-red-500/20'
                      : 'bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-zinc-500'
                  }`}
                >
                  {isCompleted ? '✓' : s.step}
                </button>
                <span className={`text-[10px] font-mono tracking-tight font-semibold text-center ${
                  isCurrent ? 'text-[#D90429]' : 'text-slate-500 dark:text-zinc-500'
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Line */}
        <div className="absolute top-3.5 left-1/6 right-1/6 h-[2px] bg-slate-200 dark:bg-zinc-800 -z-0">
          <div 
            className="h-full bg-[#D90429] transition-all duration-300"
            style={{ width: `${((step - 1) / (PIPELINE_STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content Stage */}
      <>
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
              1. Select Job Urgency Tier
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {urgencyOptions.map((opt) => (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => setUrgency(opt.id)}
                  className={`p-3 rounded-xl text-left transition-all border ${
                    urgency === opt.id
                      ? 'bg-[#D90429] text-white border-[#D90429] shadow-md shadow-red-600/20'
                      : 'bg-zinc-100 dark:bg-white/[0.04] text-slate-700 dark:text-zinc-300 border-zinc-200 dark:border-white/[0.08] hover:border-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs">{opt.label}</div>
                  <div className={`text-[10px] mt-0.5 ${urgency === opt.id ? 'text-white/80' : 'text-slate-500 dark:text-zinc-400'}`}>
                    {opt.highlight}
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setStep(2)}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#D90429] hover:bg-[#b80322] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5"
            >
              <span>Next: Choose Slot</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
              2. Choose Target Arrival Window
            </div>
            <div className="space-y-2">
              {slotOptions.map((opt) => (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setSlot(opt.id)}
                  className={`w-full p-3 rounded-xl text-left transition-all border flex items-center justify-between ${
                    slot === opt.id
                      ? 'bg-[#D90429] text-white border-[#D90429] shadow-md shadow-red-600/20'
                      : 'bg-zinc-100 dark:bg-white/[0.04] text-slate-700 dark:text-zinc-300 border-zinc-200 dark:border-white/[0.08]'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">{opt.label}</div>
                    <div className={`text-[10px] ${slot === opt.id ? 'text-white/80' : 'text-slate-500 dark:text-zinc-400'}`}>
                      {opt.time}
                    </div>
                  </div>
                  <Clock className="w-4 h-4 opacity-70" />
                </motion.button>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-3 rounded-xl bg-zinc-100 dark:bg-white/[0.06] text-xs font-semibold text-slate-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/[0.08]"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#D90429] hover:bg-[#b80322] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5"
              >
                <span>Next: Review &amp; Lock</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {isSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="font-bold text-base text-emerald-900 dark:text-emerald-200 font-mono">
                  Slot Reserved &amp; Engineer Notified!
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400/80 mt-1 font-mono">
                  Interactive demo simulator resetting...
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/[0.08] space-y-2 text-xs font-mono shadow-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-zinc-400">Urgency:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{urgency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-zinc-400">Arrival Window:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{slot}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-white/[0.08]">
                    <span className="font-bold text-slate-700 dark:text-zinc-300">Commitment Deposit:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">£25.00</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-500 pt-0.5">
                    100% credited against your final invoice
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-3 px-3 rounded-xl bg-zinc-100 dark:bg-white/[0.06] text-xs font-semibold text-slate-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/[0.08]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handlePay}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 font-mono"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay £25 Deposit Securely</span>
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </>

    </div>
  );
};

