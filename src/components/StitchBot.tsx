import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, Minimize2, ChevronUp } from 'lucide-react';
import { ChatMessage } from '../types';

interface StitchBotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
  onOpenWhatsApp: () => void;
}

export const StitchBot: React.FC<StitchBotProps> = ({ isOpen, onClose, onOpenQuote, onOpenWhatsApp }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'stitch',
      text: "Hi there! I'm Dean's Client Support Assistant. Looking to grow your business with a website that actually works? I'm here to help.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    // --- Contact Interception: never let the AI guess Dean's details ---
    const q = messageText.toLowerCase();
    const isContactQuery = ['phone', 'number', 'whatsapp', 'email', 'address', 'contact', 'reach', 'get in touch', 'hello@', 'gmail'].some(k => q.includes(k));
    if (isContactQuery) {
      await new Promise(r => setTimeout(r, 600));
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'stitch' as const,
        text: "Here are Dean's direct contact details:\n\n📱 WhatsApp / Phone: 07348 733365\n✉️ Email: dean.wilshaw.web@gmail.com\n\nHe typically replies within a few hours. Tap the \"WhatsApp Dean\" button below to message him directly!",
        timestamp: new Date(),
      }]);
      setLoading(false);
      return;
    }
    // --- End Contact Interception ---

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText, history }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'stitch',
          text: data.response || "I'd be glad to help! Feel free to ask about pricing, timelines, or what Dean can build for you.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('API error');
      }
    } catch (err) {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'stitch',
        text: "Dean builds fast, mobile-first digital systems for local businesses in Cheshire & Stoke. Use the 'Book a Free Audit' link below to get in touch!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      id="chatbot-container"
      className="fixed right-3 sm:right-6 bottom-[4.5rem] sm:bottom-6 z-50 w-[calc(100vw-24px)] sm:w-80 md:w-96 rounded-xl overflow-hidden border border-[#c6c6cd] shadow-2xl bg-white flex flex-col h-[480px] sm:h-[520px] transition-all animate-fadeIn"
    >
      {/* Chat Header */}
      <div className="bg-[#111111] p-3.5 sm:p-4 flex items-center justify-between border-b border-[#c6c6cd]/30 shrink-0 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center border border-white/20 shrink-0">
            <Bot className="w-5 h-5 text-[#dc2626]" />
          </div>
          <div>
            <h3 className="font-geist font-bold text-sm text-white leading-tight flex items-center gap-1.5">
              Client Support
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </h3>
            <p className="text-[11px] text-slate-300 font-mono">Ask me anything about Dean's builds</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-300 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Content Messages Area */}
      <div className="flex-grow bg-[#f8fafc] p-4 overflow-y-auto flex flex-col gap-3 text-xs sm:text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 max-w-[90%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            {msg.sender === 'stitch' && (
              <div className="w-6 h-6 bg-[#eceef0] border border-[#c6c6cd] rounded-full flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-[#991b1b]" />
              </div>
            )}

            <div
              className={`p-3 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-[#dc2626] text-white rounded-tr-xs shadow-2xs font-medium'
                  : 'bg-white border border-[#c6c6cd] text-[#191c1e] rounded-tl-xs shadow-2xs'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2 max-w-[80%] mr-auto items-center">
            <div className="w-6 h-6 bg-[#eceef0] rounded-full flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-[#991b1b]" />
            </div>
            <div className="bg-white border border-[#c6c6cd] p-3 rounded-2xl text-xs text-slate-500 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-ping"></span>
              Assistant is thinking...
            </div>
          </div>
        )}

        {messages[messages.length - 1]?.sender === 'stitch' && !loading && (
          <div className="flex flex-col gap-2 mt-2 ml-10">
            {[
              { text: "I don't have a site yet - where do we start?", icon: "🟢" },
              { text: "I have an old site that isn't getting calls", icon: "🟡" },
              { text: "How much effort is required on my end?", icon: "🔵" },
              { text: "Can I just send Dean a WhatsApp message?", icon: "💬" }
            ].map((btn, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(btn.text)}
                className="text-left p-2 rounded-lg text-xs transition-colors flex items-center gap-2 shadow-sm w-fit bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 dark:text-zinc-100 border border-slate-200 dark:border-zinc-700 font-medium"
              >
                <span>{btn.icon}</span>
                <span>{btn.text}</span>
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>



      {/* Chat Input Area */}
      <div className="p-3 bg-white border-t border-[#c6c6cd] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-[#f8fafc] border border-[#c6c6cd] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#191c1e] focus:outline-none focus:border-[#dc2626]"
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-50 text-white p-2 sm:px-3 sm:py-2 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between mt-2 pt-1 text-[10px] text-[#76777d]">
          <button onClick={onOpenQuote} className="hover:underline text-[#991b1b] font-medium">
            Get Quote
          </button>
          <button onClick={onOpenWhatsApp} className="hover:underline text-emerald-700 font-medium">
            WhatsApp Dean
          </button>
        </div>
      </div>
    </aside>
  );
};

