import React, { useState, useEffect } from 'react';
import { PhoneIncoming, Sparkles, Send, Zap, RotateCcw, Activity, MessageSquare } from 'lucide-react';

export const VoiceToQuoteDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0); // 0 = idle, 1 = step1, 2 = step2, 3 = step3
  const [typedText, setTypedText] = useState('');

  const fullTranscript = "Hi, need an urgent repair callout today at our property in CW1, could you text over a price guide and earliest availability?";

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let typeInterval: NodeJS.Timeout;
    let isMounted = true;

    if (isRunning) {
      setActiveStep(1);
      setTypedText('');

      // Play start synth chime
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5

        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
        setTimeout(() => {
          try { audioCtx.close(); } catch (e) {}
        }, 400);
      } catch (e) {}

      // Fast typing effect for Step 1
      let charIndex = 0;
      typeInterval = setInterval(() => {
        if (!isMounted) return;
        if (charIndex < fullTranscript.length) {
          setTypedText((prev) => prev + fullTranscript.charAt(charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 14);

      // Progression to Step 2
      timer1 = setTimeout(() => {
        if (isMounted) setActiveStep(2);
      }, 1200);

      // Progression to Step 3 + second subtle confirmation chime
      timer2 = setTimeout(() => {
        if (isMounted) {
          setActiveStep(3);
          try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5
            osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12); // A5

            gain.gain.setValueAtTime(0, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.35);
            setTimeout(() => {
              try { audioCtx.close(); } catch (e) {}
            }, 400);
          } catch (e) {}
        }
      }, 2400);
    } else {
      setActiveStep(0);
      setTypedText('');
    }

    return () => {
      isMounted = false;
      clearInterval(typeInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isRunning]);

  const handleToggle = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col font-sans transition-colors duration-300 text-left">
      
      {/* Compact Header */}
      <div className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800/80 mb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-mono text-[10px] font-semibold uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
            ALWAYS-ON PHONE INTERCEPTOR
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
            How the Voice-to-Quote Engine Works
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-normal">
            Turn missed phone calls into booked jobs automatically while you're on the tools.
          </p>
        </div>

        <div className="shrink-0 self-start sm:self-center">
          {!isRunning ? (
            <button
              type="button"
              onClick={handleToggle}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs py-1.5 px-3.5 rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <span>Simulate Inbound Call</span>
              <Zap className="w-3.5 h-3.5 fill-current text-emerald-200" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleToggle}
              className="inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 font-semibold text-xs py-1.5 px-3.5 rounded-lg active:scale-95 transition-all cursor-pointer"
            >
              <span>Reset Demo</span>
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Compact 3 Step Rows */}
      <div className="space-y-2.5">
        
        {/* Step 1: Intercept & Transcribe */}
        <div className={`bg-zinc-50 dark:bg-zinc-900/60 border rounded-xl p-3.5 transition-all duration-300 ${
          activeStep >= 1 ? 'border-emerald-400/70 dark:border-emerald-500/60 ring-1 ring-emerald-500/20' : 'border-zinc-200 dark:border-zinc-800'
        }`}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <PhoneIncoming className="w-4 h-4 text-[#D90429]" />
            </div>
            <div className="space-y-0.5 flex-grow">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Step 01</span>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Inbound Call Intercepted</h4>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug">
                When you're busy on the tools, the caller leaves a voicemail or hangs up. Audio is transcribed in seconds or an instant auto-text fires on hang-up.
              </p>

              {/* Active Embedded Box for Step 1 */}
              {activeStep >= 1 && (
                <div className="mt-2.5 pt-2.5 border-t border-zinc-200 dark:border-zinc-800/80 transition-opacity duration-300">
                  <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg py-1.5 px-2.5 space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 font-semibold uppercase">
                        {/* Animated Equalizer Waveform Bars */}
                        <span className="flex items-end gap-0.5 h-3">
                          <span className="w-0.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s] h-2"></span>
                          <span className="w-0.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s] h-3"></span>
                          <span className="w-0.5 bg-emerald-500 rounded-full animate-bounce h-1.5"></span>
                        </span>
                        Voicemail Transcribed
                      </span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 px-1.5 py-0.5 rounded text-[10px]">
                        Audio: 1.8s  /  99% Acc
                      </span>
                    </div>
                    <p className="text-zinc-800 dark:text-zinc-200 text-[11px] font-mono italic">
                      &ldquo;{typedText || fullTranscript}&rdquo;
                      {activeStep === 1 && typedText.length < fullTranscript.length && (
                        <span className="inline-block w-1 h-3 ml-0.5 bg-emerald-500 animate-pulse"></span>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Instant Scope & Price Matching */}
        <div className={`bg-zinc-50 dark:bg-zinc-900/60 border rounded-xl p-3.5 transition-all duration-300 ${
          activeStep >= 2 ? 'border-emerald-400/70 dark:border-emerald-500/60 ring-1 ring-emerald-500/20' : 'border-zinc-200 dark:border-zinc-800'
        }`}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-0.5 flex-grow">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Step 02</span>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Instant Scope & Price Matching</h4>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug">
                The engine extracts the customer's issue and matches it against your custom pricing rules and radius.
              </p>

              {/* Active Embedded Box for Step 2 */}
              {activeStep >= 2 && (
                <div className="mt-2.5 pt-2.5 border-t border-zinc-200 dark:border-zinc-800/80 transition-opacity duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Scope Detected</div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white">Standard Callout & Diagnosis</div>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-lg p-2">
                      <div className="text-[10px] font-mono text-emerald-800 dark:text-emerald-400 uppercase font-semibold">Calculated Bracket</div>
                      <div className="text-xs font-black text-emerald-700 dark:text-emerald-400">£95.00  /  £145.00 <span className="text-[10px] font-normal text-emerald-700 dark:text-emerald-500">+ VAT</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 3: SMS Fallback Dispatched */}
        <div className={`bg-zinc-50 dark:bg-zinc-900/60 border rounded-xl p-3.5 transition-all duration-300 ${
          activeStep >= 3 ? 'border-emerald-400/70 dark:border-emerald-500/60 ring-1 ring-emerald-500/20' : 'border-zinc-200 dark:border-zinc-800'
        }`}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <Send className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-0.5 flex-grow">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Step 03</span>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Instant SMS Fallback & Alert to You</h4>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug">
                If you miss the call or the caller hangs up, an instant text asks them to reply with a couple of job photos so you can price it accurately without playing phone tag.
              </p>

              {/* Active Embedded Box for Step 3 */}
              {activeStep >= 3 && (
                <div className="mt-2.5 pt-2.5 border-t border-zinc-200 dark:border-zinc-800/80 transition-opacity duration-300">
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-lg p-2.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-emerald-800 dark:text-emerald-400 font-bold uppercase flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        Instant SMS Fallback
                      </span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                        Dispatched in 2.4s to 07712 345678
                      </span>
                    </div>
                    <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium bg-white/90 dark:bg-black/40 border border-emerald-200/60 dark:border-emerald-900/30 rounded-md p-2">
                      &ldquo;Sorry I missed your call, currently on a job. Could you reply with a couple of photos of the issue and your postcode? I&rsquo;ll review and text you an estimate and availability right away.&rdquo;
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Slim Inline Bottom Note */}
      <div className="mt-2.5 text-xs py-2 px-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 flex items-center gap-2 font-medium">
        <Zap className="w-3.5 h-3.5 shrink-0" />
        <span><strong className="font-bold">78% of customers</strong> hire the first business that responds. Never lose a job while your hands are full.</span>
      </div>

    </div>
  );
};

