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

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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

    // Contact Interception - bypass AI entirely for contact queries
    const q = messageText.toLowerCase();
    const isContactQuery = ['phone', 'number', 'whatsapp', 'email', 'address', 'contact', 'reach', 'get in touch', 'hello@', 'gmail'].some((k) => q.includes(k));
    if (isContactQuery) {
      await new Promise((r) => setTimeout(r, 600));
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'stitch' as const,
          text: "Here are Dean's direct contact details:\n\nWhatsApp / Phone: 07348 733365\nEmail: dean.wilshaw.web@gmail.com\n\nHe typically replies within a few hours. Tap the \"WhatsApp Dean\" button below to message him directly!",
          timestamp: new Date(),
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'stitch' as const,
          text: data.response || data.reply || "Sorry, I had trouble processing that. You can reach Dean directly on WhatsApp via the button below.",
          timestamp: new Date(),
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'stitch' as const,
          text: "I couldn't reach the AI service right now, but Dean is available on WhatsApp or phone at 07348 733365. Feel free to message him directly!",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 flex items-center justify-center sm:block">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm sm:hidden"
        onClick={onClose}
      />
      
      <div className="relative w-full h-full sm:h-[600px] sm:w-[400px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="w-8 h-8 text-red-500" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Dean Wilshaw AI</h3>
              <p className="text-[10px] text-zinc-400">Available 24/7 | Instant Answers</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'stitch' && (
                <div className="w-7 h-7 rounded-full bg-red-600/10 text-red-600 dark:text-red-500 border border-red-500/20 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-red-600 text-white rounded-br-none'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 rounded-bl-none border border-slate-200 dark:border-zinc-700'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-7 h-7 rounded-full bg-red-600/10 text-red-600 dark:text-red-500 border border-red-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 dark:bg-zinc-800 rounded-2xl rounded-bl-none p-3 border border-slate-200 dark:border-zinc-700">
                <div className="flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

        {messages[messages.length - 1]?.sender === 'stitch' && !loading && (
          <div className="flex flex-col gap-2 mt-2 ml-10">
            {[
              "I don't have a site yet - where do we start?",
              "I have an old site that isn't getting calls",
              "How much effort is required on my end?",
              "Can I just send Dean a WhatsApp message?"
            ].map((btnText, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(btnText)}
                className="text-left p-2 rounded-lg text-xs transition-colors flex items-center gap-2 shadow-sm w-fit bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 dark:text-zinc-100 border border-slate-200 dark:border-zinc-700 font-medium"
              >
                <span>{btnText}</span>
              </button>
            ))}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>


      {/* Chat Input Area */}
      <div className="p-3 bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 shrink-0">
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
            className="flex-grow bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-red-600 dark:focus:border-red-500"
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-50 text-white p-2 sm:px-3 sm:py-2 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between mt-2 pt-1 text-[10px] text-slate-500 dark:text-zinc-400">
          <button onClick={onOpenQuote} className="hover:underline text-red-600 dark:text-red-500 font-medium">
            Get Quote
          </button>
          <button onClick={onOpenWhatsApp} className="hover:underline text-emerald-600 dark:text-emerald-400 font-medium">
            WhatsApp Dean
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

