import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Droplets,
  Flame,
  Zap,
  Home,
  HardHat,
  Hammer,
  Paintbrush,
  Trees,
  Lock,
  Sparkles,
  MessageSquare,
  MapPin,
  Star,
  Camera,
  Plus,
  Minus,
} from 'lucide-react';

type IconType = React.ComponentType<{ className?: string }>;

interface ToolProps {
  onSummaryChange: (summary: string) => void;
}

type TradeCategory = 'heating_plumbing' | 'electrical' | 'joinery' | 'painting' | 'landscaping' | 'triage';

interface TradeConfig {
  key: string;
  label: string;
  icon: IconType;
  category: TradeCategory;
  toolTagline: string;
  triageOptions?: string[];
  allowFreeText?: boolean;
}

const TRADE_CONFIGS: TradeConfig[] = [
  {
    key: 'plumbing_drainage',
    label: 'Plumbers & Emergency Drainage',
    icon: Droplets,
    category: 'heating_plumbing',
    toolTagline: 'Emergency Fault Triage & Price Guide',
  },
  {
    key: 'gas_heating',
    label: 'Gas & Heating Engineers',
    icon: Flame,
    category: 'heating_plumbing',
    toolTagline: 'Emergency Fault Triage & Price Guide',
  },
  {
    key: 'electrical',
    label: 'Electricians, EV Specialists & Solar',
    icon: Zap,
    category: 'electrical',
    toolTagline: 'EV Charger & Consumer Unit Selector',
  },
  {
    key: 'roofing',
    label: 'Roofers, Fascias & Guttering',
    icon: Home,
    category: 'triage',
    toolTagline: 'Quick Roofing Job Triage',
    triageOptions: ['Leak / Storm Damage', 'New Roof / Re-roof', 'Guttering / Fascias', 'Roof Inspection'],
  },
  {
    key: 'building',
    label: 'Builders & Groundworkers',
    icon: HardHat,
    category: 'triage',
    toolTagline: 'Quick Build & Groundworks Triage',
    triageOptions: ['Extension / New Build', 'Renovation', 'Groundworks / Drainage', 'Structural Work'],
  },
  {
    key: 'joinery',
    label: 'Joiners, Carpenters & Kitchen Fitters',
    icon: Hammer,
    category: 'joinery',
    toolTagline: 'Room Dimension & Fitting Estimator',
  },
  {
    key: 'decorating',
    label: 'Painters & Decorators',
    icon: Paintbrush,
    category: 'painting',
    toolTagline: 'Room Count & Scope Selector',
  },
  {
    key: 'landscaping',
    label: 'Landscapers, Paving & Tree Surgeons',
    icon: Trees,
    category: 'landscaping',
    toolTagline: 'Paving & Turf Area Estimator',
  },
  {
    key: 'locksmith',
    label: 'Locksmiths & Security',
    icon: Lock,
    category: 'triage',
    toolTagline: 'Quick Security Job Triage',
    triageOptions: ['Lock-out Emergency', 'Lock Upgrade / UPVC', 'Alarm / CCTV Install', 'Key Cutting / Duplication'],
  },
  {
    key: 'custom',
    label: 'Custom / Other Trade',
    icon: Sparkles,
    category: 'triage',
    toolTagline: 'Universal Voice & Photo Job Triage',
    allowFreeText: true,
  },
];

function chipClass(active: boolean): string {
  return `w-full text-left px-2.5 py-2 rounded-lg border text-[11px] font-medium transition-colors ${
    active
      ? 'border-[#D90429] bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-400 font-semibold'
      : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
  }`;
}

function SegmentButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2 px-2 rounded-lg text-[10px] font-bold font-mono text-center transition-all ${
        active
          ? 'bg-[#D90429] text-white shadow-sm'
          : 'bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function PriceReadout({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="relative rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-3 text-center overflow-hidden shadow-inner">
      <p className="text-[9px] uppercase tracking-widest font-mono font-semibold text-slate-500 dark:text-zinc-400">
        Ballpark Estimate
      </p>
      <motion.p
        key={value}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="font-mono text-lg font-black text-slate-900 dark:text-white"
      >
        {value}
      </motion.p>
      <p className="text-[9px] text-slate-500 dark:text-zinc-500">{caption}</p>
    </div>
  );
}

function SliderRow({
  label,
  value,
  onChange,
  min,
  max,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400 mb-1 font-medium">
        <span>{label}</span>
        <span className="text-slate-900 dark:text-white font-bold">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#D90429] cursor-pointer"
      />
    </div>
  );
}

const FAULT_OPTIONS: { id: string; label: string; emergency: [number, number]; standard: [number, number] }[] = [
  { id: 'no-heat', label: 'No Heating / Hot Water', emergency: [120, 180], standard: [80, 120] },
  { id: 'leak', label: 'Leak / Burst Pipe', emergency: [140, 220], standard: [90, 140] },
  { id: 'boiler-fault', label: 'Boiler Fault Code', emergency: [110, 160], standard: [75, 110] },
  { id: 'blocked-drain', label: 'Blocked Drain', emergency: [90, 150], standard: [60, 90] },
  { id: 'service', label: 'Annual Service / MOT', emergency: [75, 95], standard: [65, 85] },
];

function HeatingPlumbingTool({ onSummaryChange }: ToolProps) {
  const [faultId, setFaultId] = useState(FAULT_OPTIONS[0].id);
  const [emergency, setEmergency] = useState(true);

  const fault = FAULT_OPTIONS.find((f) => f.id === faultId) ?? FAULT_OPTIONS[0];
  const [low, high] = emergency ? fault.emergency : fault.standard;

  useEffect(() => {
    onSummaryChange(`${fault.label}, ${emergency ? 'Emergency Same-Day' : 'Standard Booked'}, ballpark £${low}-£${high}`);
  }, [fault.label, emergency, low, high, onSummaryChange]);

  return (
    <div className="space-y-2.5">
      <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-300">What&apos;s the fault?</p>
      <div className="space-y-1.5">
        {FAULT_OPTIONS.map((f) => (
          <button key={f.id} type="button" onClick={() => setFaultId(f.id)} className={chipClass(faultId === f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-1.5 pt-1">
        <SegmentButton active={emergency} onClick={() => setEmergency(true)}>
          Emergency Same-Day
        </SegmentButton>
        <SegmentButton active={!emergency} onClick={() => setEmergency(false)}>
          Standard Booked
        </SegmentButton>
      </div>

      <PriceReadout value={`£${low} - £${high}`} caption="Includes parts & certified labour" />
    </div>
  );
}

const ELECTRICAL_OPTIONS: { id: string; label: string; price: string; note: string }[] = [
  { id: 'ev', label: 'EV Charger Install', price: '£750 - £950', note: 'Inc. OZEV grant guidance' },
  { id: 'cu', label: 'Consumer Unit / Fuse Box Upgrade', price: '£350 - £450', note: 'Full board replacement' },
  { id: 'rewire', label: 'Full House Rewire', price: '£3,500 - £6,000', note: '3-4 bed property guide price' },
  { id: 'eicr', label: 'EICR / Safety Check', price: '£120 - £180', note: 'Landlord & homebuyer reports' },
  { id: 'solar', label: 'Solar PV Consultation', price: 'Free Survey', note: 'Custom quote after site visit' },
];

function ElectricalTool({ onSummaryChange }: ToolProps) {
  const [serviceId, setServiceId] = useState(ELECTRICAL_OPTIONS[0].id);
  const service = ELECTRICAL_OPTIONS.find((s) => s.id === serviceId) ?? ELECTRICAL_OPTIONS[0];

  useEffect(() => {
    onSummaryChange(`${service.label}, ballpark ${service.price}`);
  }, [service.label, service.price, onSummaryChange]);

  return (
    <div className="space-y-2.5">
      <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-300">Select a service</p>
      <div className="space-y-1.5">
        {ELECTRICAL_OPTIONS.map((s) => (
          <button key={s.id} type="button" onClick={() => setServiceId(s.id)} className={chipClass(serviceId === s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      <PriceReadout value={service.price} caption={service.note} />
    </div>
  );
}

const FIT_TIERS: { id: string; label: string; rate: number }[] = [
  { id: 'flatpack', label: 'Flat-Pack Fit', rate: 45 },
  { id: 'bespoke', label: 'Bespoke Fitted', rate: 120 },
  { id: 'full', label: 'Full Strip & Refit', rate: 220 },
];

function JoineryTool({ onSummaryChange }: ToolProps) {
  const [length, setLength] = useState(3);
  const [width, setWidth] = useState(3);
  const [tierId, setTierId] = useState(FIT_TIERS[1].id);

  const tier = FIT_TIERS.find((t) => t.id === tierId) ?? FIT_TIERS[1];
  const sqm = length * width;
  const low = Math.round(sqm * tier.rate);
  const high = Math.round(sqm * tier.rate * 1.2);

  useEffect(() => {
    onSummaryChange(`${tier.label}, ${sqm}m² room, ballpark £${low}-£${high}`);
  }, [tier.label, sqm, low, high, onSummaryChange]);

  return (
    <div className="space-y-2.5">
      <SliderRow label="Room Length" value={length} onChange={setLength} min={2} max={8} unit="m" />
      <SliderRow label="Room Width" value={width} onChange={setWidth} min={2} max={6} unit="m" />
      <div>
        <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-300 mb-1.5">Fitting Tier</p>
        <div className="grid grid-cols-3 gap-1.5">
          {FIT_TIERS.map((t) => (
            <SegmentButton key={t.id} active={tierId === t.id} onClick={() => setTierId(t.id)}>
              {t.label}
            </SegmentButton>
          ))}
        </div>
      </div>
      <PriceReadout value={`£${low.toLocaleString()} - £${high.toLocaleString()}`} caption={`${sqm}m² total coverage`} />
    </div>
  );
}

const EXTERIOR_TIERS: { id: string; label: string; low: number; high: number }[] = [
  { id: 'terrace', label: 'Terrace / Small', low: 450, high: 650 },
  { id: 'semi', label: 'Semi-Detached', low: 650, high: 950 },
  { id: 'detached', label: 'Detached / Large', low: 950, high: 1500 },
];

function PainterDecoratorTool({ onSummaryChange }: ToolProps) {
  const [scope, setScope] = useState<'interior' | 'exterior'>('interior');
  const [rooms, setRooms] = useState(2);
  const [tierId, setTierId] = useState(EXTERIOR_TIERS[0].id);

  const tier = EXTERIOR_TIERS.find((t) => t.id === tierId) ?? EXTERIOR_TIERS[0];
  const low = scope === 'interior' ? rooms * 120 : tier.low;
  const high = scope === 'interior' ? rooms * 180 : tier.high;

  useEffect(() => {
    const desc = scope === 'interior' ? `${rooms} room${rooms === 1 ? '' : 's'} interior` : `${tier.label} exterior`;
    onSummaryChange(`${desc}, ballpark £${low}-£${high}`);
  }, [scope, rooms, tier.label, low, high, onSummaryChange]);

  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-2 gap-1.5">
        <SegmentButton active={scope === 'interior'} onClick={() => setScope('interior')}>
          Interior
        </SegmentButton>
        <SegmentButton active={scope === 'exterior'} onClick={() => setScope('exterior')}>
          Exterior
        </SegmentButton>
      </div>

      {scope === 'interior' ? (
        <div>
          <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-300 mb-1.5">How many rooms?</p>
          <div className="flex items-center justify-center gap-4 py-1">
            <button
              type="button"
              onClick={() => setRooms((r) => Math.max(1, r - 1))}
              className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/[0.06] border border-zinc-200 dark:border-white/[0.08] flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-white hover:bg-[#D90429] transition-colors"
              aria-label="Fewer rooms"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-lg font-black w-8 text-center">{rooms}</span>
            <button
              type="button"
              onClick={() => setRooms((r) => Math.min(8, r + 1))}
              className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/[0.06] border border-zinc-200 dark:border-white/[0.08] flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-white hover:bg-[#D90429] transition-colors"
              aria-label="More rooms"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-1.5">
          {EXTERIOR_TIERS.map((t) => (
            <button key={t.id} type="button" onClick={() => setTierId(t.id)} className={chipClass(tierId === t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      )}

      <PriceReadout
        value={`£${low.toLocaleString()} - £${high.toLocaleString()}`}
        caption={scope === 'interior' ? 'Two coats, standard prep' : 'Full exterior repaint'}
      />
    </div>
  );
}

const LANDSCAPE_MATERIALS: { id: string; label: string; rate: number }[] = [
  { id: 'turf', label: 'Turf Lawn', rate: 25 },
  { id: 'paving', label: 'Block Paving', rate: 70 },
  { id: 'resin', label: 'Resin Bound', rate: 90 },
  { id: 'decking', label: 'Decking', rate: 110 },
];

function LandscaperTool({ onSummaryChange }: ToolProps) {
  const [length, setLength] = useState(6);
  const [width, setWidth] = useState(4);
  const [materialId, setMaterialId] = useState(LANDSCAPE_MATERIALS[1].id);

  const material = LANDSCAPE_MATERIALS.find((m) => m.id === materialId) ?? LANDSCAPE_MATERIALS[1];
  const sqm = length * width;
  const low = Math.round(sqm * material.rate);
  const high = Math.round(sqm * material.rate * 1.15);

  useEffect(() => {
    onSummaryChange(`${material.label}, ${sqm}m², ballpark £${low}-£${high}`);
  }, [material.label, sqm, low, high, onSummaryChange]);

  return (
    <div className="space-y-2.5">
      <SliderRow label="Length" value={length} onChange={setLength} min={2} max={20} unit="m" />
      <SliderRow label="Width" value={width} onChange={setWidth} min={2} max={15} unit="m" />
      <div>
        <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-300 mb-1.5">Material</p>
        <div className="grid grid-cols-2 gap-1.5">
          {LANDSCAPE_MATERIALS.map((m) => (
            <SegmentButton key={m.id} active={materialId === m.id} onClick={() => setMaterialId(m.id)}>
              {m.label}
            </SegmentButton>
          ))}
        </div>
      </div>
      <PriceReadout value={`£${low.toLocaleString()} - £${high.toLocaleString()}`} caption={`${sqm}m² total area`} />
    </div>
  );
}

const URGENCY_OPTIONS = ['Emergency', 'This Week', 'Flexible'] as const;

interface GenericTriageToolProps extends ToolProps {
  jobOptions: string[];
  allowFreeText?: boolean;
}

function GenericTriageTool({ jobOptions, allowFreeText, onSummaryChange }: GenericTriageToolProps) {
  const [step, setStep] = useState(1);
  const [jobType, setJobType] = useState('');
  const [customJob, setCustomJob] = useState('');
  const [urgency, setUrgency] = useState<(typeof URGENCY_OPTIONS)[number]>('This Week');
  const [mediaAdded, setMediaAdded] = useState(false);

  const resolvedJob = (allowFreeText ? customJob : jobType).trim();

  useEffect(() => {
    if (!resolvedJob) {
      onSummaryChange('');
      return;
    }
    onSummaryChange(`${resolvedJob}, ${urgency} priority${mediaAdded ? ', photo/voice note attached' : ''}`);
  }, [resolvedJob, urgency, mediaAdded, onSummaryChange]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${step >= s ? 'bg-[#D90429]' : 'bg-slate-200 dark:bg-zinc-700'}`}
          />
        ))}
      </div>

      <>
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-2.5"
          >
            <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-300">Step 1 &middot; What&apos;s the job?</p>
            {allowFreeText ? (
              <textarea
                rows={3}
                value={customJob}
                onChange={(e) => setCustomJob(e.target.value)}
                placeholder="e.g. Fence panel blew down in the storm, needs replacing..."
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-2.5 text-[11px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500 resize-none"
              />
            ) : (
              <div className="space-y-1.5">
                {jobOptions.map((opt) => (
                  <button key={opt} type="button" onClick={() => setJobType(opt)} className={chipClass(jobType === opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            )}
            <button
              type="button"
              disabled={!resolvedJob}
              onClick={() => setStep(2)}
              className="w-full py-2 rounded-lg text-[11px] font-bold bg-[#D90429] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              Next
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-2.5"
          >
            <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-300">Step 2 &middot; How urgent?</p>
            <div className="grid grid-cols-3 gap-1.5">
              {URGENCY_OPTIONS.map((u) => (
                <SegmentButton key={u} active={urgency === u} onClick={() => setUrgency(u)}>
                  {u}
                </SegmentButton>
              ))}
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2 rounded-lg text-[11px] font-bold bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-2 rounded-lg text-[11px] font-bold bg-[#D90429] text-white"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-2.5"
          >
            <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-300">Step 3 &middot; Add context</p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setMediaAdded((v) => !v)}
              className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[11px] font-semibold border transition-colors ${
                mediaAdded
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                  : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              {mediaAdded ? 'Photo & Voice Note Attached' : 'Simulate Photo / Voice Note'}
            </motion.button>

            <div className="rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-2.5">
              <p className="text-[9px] uppercase tracking-widest font-mono font-semibold text-slate-500 dark:text-zinc-400 mb-1">
                Triage Summary
              </p>
              <p className="text-[11px] font-semibold text-slate-900 dark:text-white leading-snug">
                {resolvedJob || 'No job details yet'} &mdash; {urgency}
                {mediaAdded ? ', photo attached' : ''}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full py-2 rounded-lg text-[11px] font-bold bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300"
            >
              Start Over
            </button>
          </motion.div>
        )}
      </>
    </div>
  );
}

function renderActiveTool(trade: TradeConfig, onSummaryChange: (summary: string) => void) {
  switch (trade.category) {
    case 'heating_plumbing':
      return <HeatingPlumbingTool onSummaryChange={onSummaryChange} />;
    case 'electrical':
      return <ElectricalTool onSummaryChange={onSummaryChange} />;
    case 'joinery':
      return <JoineryTool onSummaryChange={onSummaryChange} />;
    case 'painting':
      return <PainterDecoratorTool onSummaryChange={onSummaryChange} />;
    case 'landscaping':
      return <LandscaperTool onSummaryChange={onSummaryChange} />;
    case 'triage':
      return (
        <GenericTriageTool
          jobOptions={trade.triageOptions ?? []}
          allowFreeText={trade.allowFreeText}
          onSummaryChange={onSummaryChange}
        />
      );
    default:
      return null;
  }
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <div className="relative bg-[#111] rounded-[2.5rem] border-[8px] border-[#222] shadow-2xl overflow-hidden aspect-[9/19]">
        <div className="absolute top-0 inset-x-0 h-6 bg-[#222] rounded-b-2xl w-32 mx-auto z-20 flex justify-center items-center gap-2">
          <div className="w-12 h-1.5 bg-black/60 rounded-full shadow-inner" />
          <div className="w-1.5 h-1.5 bg-blue-900/50 rounded-full shadow-inner" />
        </div>
        <div className="absolute inset-0 bg-white dark:bg-zinc-900 overflow-y-auto hide-scrollbar pt-7 pb-5 px-3">
          {children}
        </div>
      </div>
    </div>
  );
}

function PhonePreviewHero({
  businessName,
  town,
  tradeLabel,
  TradeIcon,
}: {
  businessName: string;
  town: string;
  tradeLabel: string;
  TradeIcon: IconType;
}) {
  const displayName = businessName.trim() || 'Your Business Name';
  const displayTown = town.trim() || 'Your Area';

  return (
    <div className="mb-3 rounded-xl overflow-hidden bg-gradient-to-br from-[#111] to-[#1c1c1c] text-white p-3.5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-[#D90429] flex items-center justify-center shrink-0">
          <TradeIcon className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="font-geist font-bold text-[13px] leading-tight truncate">{displayName}</p>
          <p className="text-[9px] text-zinc-400 truncate">{tradeLabel}</p>
        </div>
      </div>
      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
        <MapPin className="w-2.5 h-2.5" /> Serving {displayTown}
      </span>
      <div className="flex items-center gap-1 mt-2">
        <div className="flex text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 fill-current" />
          ))}
        </div>
        <span className="text-[9px] text-zinc-400 font-mono">5.0 &middot; 128 reviews</span>
      </div>
    </div>
  );
}

export const TradeSimulator: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tradeParam = searchParams.get('trade') || '';
  const matchedInitialTrade = TRADE_CONFIGS.find((t) => t.key === tradeParam);

  const [businessName, setBusinessName] = useState(searchParams.get('biz') || '');
  const [town, setTown] = useState(searchParams.get('town') || '');
  const [tradeKey, setTradeKey] = useState(matchedInitialTrade?.key ?? TRADE_CONFIGS[0].key);
  const [customTradeLabel, setCustomTradeLabel] = useState(!matchedInitialTrade && tradeParam ? tradeParam : '');
  const [toolSummary, setToolSummary] = useState('');

  const activeTrade = TRADE_CONFIGS.find((t) => t.key === tradeKey) ?? TRADE_CONFIGS[0];
  const isCustom = activeTrade.key === 'custom';
  const resolvedTradeLabel = isCustom && customTradeLabel.trim() ? customTradeLabel.trim() : activeTrade.label;
  const canClaim = businessName.trim().length > 0;

  const handleClaim = () => {
    if (!canClaim) return;
    const lines = [
      `Hi Dean, I want to claim the ${resolvedTradeLabel} website & tool for ${businessName.trim()}.`,
      town.trim() ? `Serving ${town.trim()}.` : '',
      toolSummary ? `I tried the demo: ${toolSummary}.` : '',
      "I'm ready to go, let's get it set up.",
    ].filter(Boolean);
    const message = lines.join(' ');
    window.open(`https://wa.me/447348733365?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-5xl mx-auto text-slate-900 dark:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-10 items-start">
        {/* Left column: business inputs & trade selector */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Wilshaw Plumbing & Heating"
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Town / Location</label>
              <input
                type="text"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                placeholder="e.g. Stoke-on-Trent"
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Your Trade</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TRADE_CONFIGS.map((t) => {
                const Icon = t.icon;
                const active = t.key === tradeKey;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTradeKey(t.key)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left text-[11px] font-semibold transition-colors ${
                      active
                        ? 'border-[#D90429] bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-400'
                        : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="leading-tight">{t.label}</span>
                  </button>
                );
              })}
            </div>

            {isCustom && (
              <input
                type="text"
                value={customTradeLabel}
                onChange={(e) => setCustomTradeLabel(e.target.value)}
                placeholder="Tell us your trade, e.g. Pest Control, Window Cleaning..."
                className="mt-2 w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
              />
            )}
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] p-4 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            <p className="font-semibold text-slate-900 dark:text-white mb-1">{activeTrade.toolTagline}</p>
            <p>
              Play with the live tool inside the phone preview, it updates instantly as you type and select options,
              exactly how it would look on your finished site.
            </p>
          </div>
        </div>

        {/* Right column: live phone preview + handover CTA */}
        <div className="lg:sticky lg:top-28 space-y-4">
          <PhoneFrame>
            <PhonePreviewHero businessName={businessName} town={town} tradeLabel={resolvedTradeLabel} TradeIcon={activeTrade.icon} />
            <div key={tradeKey}>{renderActiveTool(activeTrade, setToolSummary)}</div>
          </PhoneFrame>

          <motion.button
            whileTap={canClaim ? { scale: 0.98 } : undefined}
            type="button"
            onClick={handleClaim}
            disabled={!canClaim}
            className={`w-full font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm transition shadow-lg font-mono ${
              canClaim
                ? 'bg-[#25D366] hover:bg-[#20ba5a] text-black shadow-[#25D366]/20'
                : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600 shadow-none cursor-not-allowed'
            }`}
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Claim This Exact Website &amp; Tool for Your Business</span>
          </motion.button>
          {!canClaim && (
            <p className="text-[11px] text-center text-slate-500 dark:text-zinc-500 -mt-2">
              Enter your business name above to claim this site
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
