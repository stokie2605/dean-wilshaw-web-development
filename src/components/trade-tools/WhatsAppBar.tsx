import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, Camera, Send, Sparkles } from 'lucide-react';

interface WhatsAppBarProps {
  phoneNumber?: string;
  tradeName?: string;
}

export const WhatsAppBar: React.FC<WhatsAppBarProps> = ({ 
  phoneNumber = "447348733365", 
  tradeName = "Dean Wilshaw" 
}) => {
  const [photoSent, setPhotoSent] = useState(false);
  const encodedText = encodeURIComponent(`Hi ${tradeName}, I'm looking for a fast quote for some trade work.`);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

  const triggerPhotoSim = () => {
    setPhotoSent(true);
    setTimeout(() => setPhotoSent(false), 3000);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5 text-slate-900 dark:text-white">
      
      {/* Top Description */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            Dynamic Island Quick Contact
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50 uppercase">
          1-Tap Connect
        </span>
      </div>

      {/* Floating Dynamic Island Preview Stage */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 dark:from-zinc-900/90 dark:to-black/95 border border-slate-200 dark:border-white/[0.08] flex flex-col items-center justify-center gap-4 relative overflow-hidden shadow-xl min-h-[160px]">
        
        {/* Dynamic Island Capsule */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl flex items-center justify-between gap-3 text-white max-w-sm w-full mx-auto"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#25D366] text-black flex items-center justify-center shrink-0 shadow-md">
              <MessageSquare className="w-4 h-4 fill-current" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold font-mono tracking-tight leading-tight">
                Dean • Direct Line
              </div>
              <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active now (ST7)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <motion.a
              whileTap={{ scale: 0.95 }}
              href={`tel:${phoneNumber}`}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Call Direct"
            >
              <Phone className="w-3.5 h-3.5" />
            </motion.a>

            <motion.a
              whileTap={{ scale: 0.95 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs font-bold font-mono tracking-tight transition-colors shadow-sm"
            >
              Chat
            </motion.a>
          </div>
        </motion.div>

        {/* 1-Tap Job Photo Simulation Trigger */}
        <div className="flex items-center justify-center gap-2 w-full pt-1">
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={triggerPhotoSim}
            className="px-3.5 py-1.5 rounded-full bg-slate-200/80 dark:bg-white/[0.08] hover:bg-[#D90429] hover:text-white dark:hover:bg-[#D90429] text-[11px] font-mono font-medium text-slate-700 dark:text-zinc-300 border border-slate-300 dark:border-white/[0.08] transition-all flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{photoSent ? "📸 Photo Attached (Ready to Send!)" : "Simulate Snap & Send Job Photo"}</span>
          </motion.button>
        </div>

      </div>

      {/* Benefits Strip */}
      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span>
          <span>Zero app install needed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span>
          <span>Photos send straight to WhatsApp</span>
        </div>
      </div>

    </div>
  );
};
