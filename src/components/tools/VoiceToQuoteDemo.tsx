import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PhoneIncoming, Zap, RotateCcw, MessageSquare, Play, Image as ImageIcon, CheckCheck, Clock, MapPin } from 'lucide-react';

type Stage = 'idle' | 'ringing' | 'listening' | 'extracting' | 'dispatched' | 'replied' | 'confirmed';

const STAGE_ORDER: Stage[] = ['idle', 'ringing', 'listening', 'extracting', 'dispatched', 'replied', 'confirmed'];

function stageAtLeast(current: Stage, target: Stage): boolean {
  return STAGE_ORDER.indexOf(current) >= STAGE_ORDER.indexOf(target);
}

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function playChime(startFreq: number, endFreq: number) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
    setTimeout(() => {
      try {
        audioCtx.close();
      } catch {
        /* ignore */
      }
    }, 400);
  } catch {
    /* autoplay restrictions, fail silently */
  }
}

const WAVEFORM_BAR_COUNT = 11;
const WAVEFORM_BAR_CONFIG: { duration: number; delay: number }[] = Array.from({ length: WAVEFORM_BAR_COUNT }, () => ({
  duration: 0.4 + Math.random() * 0.5,
  delay: Math.random() * 0.3,
}));

function WaveformBars() {
  return (
    <div className="flex items-end justify-center gap-[3px] h-6">
      {WAVEFORM_BAR_CONFIG.map((cfg, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-emerald-500 origin-bottom"
          style={{ height: 22 }}
          animate={{ scaleY: [0.35, 1, 0.35] }}
          transition={{ duration: cfg.duration, delay: cfg.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function ExtractionTag({ label, lit }: { label: string; lit: boolean }) {
  return (
    <motion.span
      animate={{ scale: lit ? 1 : 0.92 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className={`inline-flex items-center px-2.5 py-1 rounded-full border font-mono text-[10px] font-semibold uppercase tracking-wide transition-colors duration-300 ${
        lit
          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700 shadow-[0_0_10px_rgba(16,185,129,0.35)]'
          : 'bg-zinc-50 dark:bg-zinc-900/60 text-zinc-400 dark:text-zinc-600 border-zinc-200 dark:border-zinc-800'
      }`}
    >
      {label}
    </motion.span>
  );
}

function SmsBubble({ align, children }: { align: 'outbound' | 'inbound'; children: React.ReactNode }) {
  const isOutbound = align === 'outbound';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isOutbound ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
          isOutbound
            ? 'bg-emerald-600 text-white rounded-br-none'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-none'
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function PhotoThumb({ rotate }: { rotate: string }) {
  return (
    <div
      className="w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-600 border border-white/40 dark:border-black/30 shadow-sm flex items-center justify-center shrink-0"
      style={{ transform: `rotate(${rotate})` }}
    >
      <ImageIcon className="w-5 h-5 text-white/70 dark:text-white/50" />
    </div>
  );
}

const FULL_TRANSCRIPT =
  'Hi, I need an urgent repair callout today, could you text over a price guide and earliest availability?';

export const VoiceToQuoteDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState<Stage>('idle');
  const [typedText, setTypedText] = useState('');
  const [callSeconds, setCallSeconds] = useState(0);

  useEffect(() => {
    let typeInterval: ReturnType<typeof setInterval>;
    let clockInterval: ReturnType<typeof setInterval>;
    let listeningTimer: ReturnType<typeof setTimeout>;
    let extractingTimer: ReturnType<typeof setTimeout>;
    let dispatchedTimer: ReturnType<typeof setTimeout>;
    let repliedTimer: ReturnType<typeof setTimeout>;
    let confirmedTimer: ReturnType<typeof setTimeout>;
    let isMounted = true;

    if (isRunning) {
      setStage('ringing');
      setTypedText('');
      setCallSeconds(0);

      playChime(523.25, 659.25);

      clockInterval = setInterval(() => {
        if (isMounted) setCallSeconds((s) => s + 1);
      }, 1000);

      listeningTimer = setTimeout(() => {
        if (!isMounted) return;
        setStage('listening');
        let charIndex = 0;
        typeInterval = setInterval(() => {
          if (!isMounted) return;
          charIndex++;
          if (charIndex <= FULL_TRANSCRIPT.length) {
            setTypedText(FULL_TRANSCRIPT.slice(0, charIndex));
          } else {
            clearInterval(typeInterval);
          }
        }, 14);
      }, 500);

      extractingTimer = setTimeout(() => {
        if (isMounted) {
          setStage('extracting');
          clearInterval(clockInterval);
        }
      }, 2400);

      dispatchedTimer = setTimeout(() => {
        if (isMounted) {
          setStage('dispatched');
          playChime(659.25, 880);
        }
      }, 2400);

      repliedTimer = setTimeout(() => {
        if (isMounted) setStage('replied');
      }, 3300);

      confirmedTimer = setTimeout(() => {
        if (isMounted) setStage('confirmed');
      }, 3900);
    } else {
      setStage('idle');
      setTypedText('');
      setCallSeconds(0);
    }

    return () => {
      isMounted = false;
      clearInterval(typeInterval);
      clearInterval(clockInterval);
      clearTimeout(listeningTimer);
      clearTimeout(extractingTimer);
      clearTimeout(dispatchedTimer);
      clearTimeout(repliedTimer);
      clearTimeout(confirmedTimer);
    };
  }, [isRunning]);

  const handleToggle = () => setIsRunning((prev) => !prev);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col font-sans transition-colors duration-300 text-left space-y-3">
      {/* Eyebrow and title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-mono text-[10px] font-semibold uppercase tracking-wider mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
          Always On Phone Intercept
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Watch a Missed Call Become a Booked Lead
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-normal">
          Turn missed phone calls into booked jobs automatically while you are on the job.
        </p>
      </div>

      {/* Call card */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            {(stage === 'ringing' || stage === 'listening') && (
              <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
            )}
            <div className="relative w-11 h-11 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <PhoneIncoming className="w-5 h-5 text-[#D90429]" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-zinc-900 dark:text-white font-mono truncate">07712 345678</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 shrink-0" /> Stoke &amp; Cheshire
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {stage !== 'idle' && (
            <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {formatDuration(callSeconds)}
            </span>
          )}
          {stage === 'idle' ? (
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleToggle}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-1.5 px-3.5 rounded-2xl shadow-sm transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Missed Call</span>
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleToggle}
              className="inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 font-semibold text-xs py-1.5 px-3.5 rounded-2xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Voicemail and waveform */}
      {stageAtLeast(stage, 'listening') && (
        <div className="rounded-2xl border border-emerald-300/70 dark:border-emerald-700/60 ring-1 ring-emerald-500/20 bg-zinc-50 dark:bg-zinc-900/60 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wide shrink-0">
              Voicemail
            </span>
            {stageAtLeast(stage, 'extracting') ? (
              <span className="text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 px-2 py-0.5 rounded-full text-[10px] font-mono">
                Audio 1.8s
              </span>
            ) : (
              <WaveformBars />
            )}
          </div>
          <p className="text-zinc-800 dark:text-zinc-200 text-xs font-mono leading-relaxed break-words">
            {typedText}
            {stage === 'listening' && typedText.length < FULL_TRANSCRIPT.length && (
              <span className="inline-block w-1 h-3 ml-0.5 bg-emerald-500 animate-pulse"></span>
            )}
          </p>
        </div>
      )}

      {/* Live extraction tags */}
      {stageAtLeast(stage, 'extracting') && (
        <div className="flex flex-wrap gap-2">
          <ExtractionTag label="Urgent Callout" lit={stageAtLeast(stage, 'extracting')} />
          <ExtractionTag label="Instant Auto SMS Dispatched in 2.4s" lit={stageAtLeast(stage, 'dispatched')} />
          <ExtractionTag label="Local Postcode" lit={stageAtLeast(stage, 'replied')} />
        </div>
      )}

      {/* SMS thread */}
      {stageAtLeast(stage, 'dispatched') && (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wide mb-1">
            <MessageSquare className="w-3 h-3" /> Messages &middot; 07712 345678
          </div>

          <SmsBubble align="outbound">
            Sorry I missed your call, currently on the job. Please reply with a couple of photos of the job and your postcode for an instant estimate.
          </SmsBubble>

          {stageAtLeast(stage, 'replied') && (
            <SmsBubble align="inbound">
              <div className="flex items-center gap-2 mb-1.5">
                <PhotoThumb rotate="-3deg" />
                <PhotoThumb rotate="2deg" />
              </div>
              Photos attached, postcode is ST7.
            </SmsBubble>
          )}
        </div>
      )}

      {/* Confirmation */}
      {stageAtLeast(stage, 'confirmed') && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold font-mono text-center">
            <CheckCheck className="w-3.5 h-3.5 shrink-0" />
            Lead captured with photo. Zero phone tag. Ready to price.
          </span>
        </motion.div>
      )}

      {/* Bottom note */}
      <div className="text-xs py-2 px-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 flex items-center gap-2 font-medium">
        <Zap className="w-3.5 h-3.5 shrink-0" />
        <span>
          <strong className="font-bold">78% of customers</strong> hire the first business that responds. Never lose a
          job while your hands are full.
        </span>
      </div>
    </div>
  );
};
