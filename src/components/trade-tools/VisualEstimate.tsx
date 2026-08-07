import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';

export const VisualEstimate: React.FC = () => {
  const [serviceType, setServiceType] = useState<'boiler' | 'rewire' | 'clean'>('rewire');
  const [phone, setPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Ballpark calculation based on service type
  const estimatedLow = serviceType === 'boiler' ? 80 : serviceType === 'rewire' ? 2500 : 150;
  const estimatedHigh = serviceType === 'boiler' ? 120 : serviceType === 'rewire' ? 4000 : 300;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length > 8) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-500/20">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Instant Guide Price</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">Select service tier for a quick estimate</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">Service Requirement</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'boiler', label: 'Boiler Service' },
              { id: 'rewire', label: 'Full Rewire' },
              { id: 'clean', label: 'Deep Clean' }
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setServiceType(option.id as any)}
                className={`py-2 px-1 rounded-lg text-xs font-semibold border transition-all ${
                  serviceType === option.id
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400 shadow-sm'
                    : 'bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-center shadow-sm">
          <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-zinc-500 font-medium">Estimated Guide Price</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            £{estimatedLow} - £{estimatedHigh}
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="tel"
              required
              placeholder="Enter mobile number to lock price"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 text-sm focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            />
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm shadow-red-600/20"
            >
              <span>Get Full Quote Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 flex items-center gap-3 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Estimate locked! We'll text you the detailed quote breakdown shortly.</span>
          </div>
        )}
      </div>
    </div>
  );
};
