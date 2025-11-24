import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal, ShieldAlert, Minimize2, ChevronRight, Power } from 'lucide-react';
import { ChatMessage, Sender } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInterfaceProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      text: "KAIS SECURE TERMINAL // INITIALIZED. Awaiting operational query. Which drone platform requires analysis?",
      sender: Sender.AI,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check for simulation event
  useEffect(() => {
    if (isOpen && messages.length === 1) {
       // Optional: Auto trigger a message if opened via "Live Sim" button implies we want to start something
       // For now, we just let the user type, or we could insert a prompt.
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: Sender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(input);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.AI,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 bg-black/90 backdrop-blur border border-tactical-green text-tactical-green p-4 rounded-full shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.6)] transition-all group"
          >
            <div className="absolute inset-0 rounded-full border-t border-transparent border-b border-tactical-green animate-spin-slow opacity-50"></div>
            <Terminal className="w-6 h-6 group-hover:animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[95vw] md:w-full max-w-md bg-military-card/95 border border-slate-700 rounded shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[80vh] backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-slate-900/90 p-3 border-b border-slate-700 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-tactical-green to-transparent animate-scan"></div>
              <div className="flex items-center gap-3 z-10">
                <div className="w-2 h-2 bg-tactical-green rounded-full animate-pulse"></div>
                <div>
                  <h3 className="text-tactical-green font-mono font-bold text-xs uppercase tracking-widest">KAIS Neural Link</h3>
                  <p className="text-[10px] text-slate-500 font-mono">SECURE CHANNEL: ENCRYPTED</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors z-10">
                   <Minimize2 className="w-4 h-4" />
                </button>
                <button onClick={() => setMessages([])} className="text-slate-500 hover:text-alert-red transition-colors z-10">
                   <Power className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/80 scrollbar-thin font-mono text-xs md:text-sm relative">
              {/* Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[size:20px_20px] bg-[linear-gradient(to_right,rgba(0,255,157,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,157,0.05)_1px,transparent_1px)]"></div>
              
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.sender === Sender.AI ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.sender === Sender.USER ? 'justify-end' : 'justify-start'} relative z-10`}
                >
                  <div 
                    className={`max-w-[85%] p-3 border shadow-lg ${
                      msg.sender === Sender.USER 
                        ? 'bg-slate-800/90 text-white border-slate-600 rounded-bl-lg rounded-tl-lg rounded-tr-lg' 
                        : 'bg-tactical-green/5 text-tactical-green border-tactical-green/20 rounded-br-lg rounded-tr-lg rounded-tl-lg'
                    }`}
                  >
                    {msg.sender === Sender.AI && <ShieldAlert className="w-3 h-3 mb-1 opacity-50" />}
                    <span className="leading-relaxed whitespace-pre-wrap">{msg.text}</span>
                    <div className="mt-2 pt-1 border-t border-dashed border-white/10 text-[9px] opacity-50 text-right uppercase flex justify-between items-center">
                      <span>ID: {msg.id.slice(-4)}</span>
                      <span>{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start relative z-10">
                  <div className="bg-tactical-green/5 border border-tactical-green/20 p-3 rounded flex items-center gap-2">
                    <span className="text-tactical-green font-mono text-xs animate-pulse">DECRYPTING RESPONSE...</span>
                    <div className="flex gap-1">
                       <span className="w-1 h-1 bg-tactical-green rounded-full animate-bounce"></span>
                       <span className="w-1 h-1 bg-tactical-green rounded-full animate-bounce delay-75"></span>
                       <span className="w-1 h-1 bg-tactical-green rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-slate-900 border-t border-slate-700 relative z-20">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-tactical-green font-mono text-lg flex items-center">
                  <ChevronRight className="w-4 h-4 animate-pulse" />
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  autoFocus
                  placeholder="Enter operational parameters..."
                  className="w-full bg-black text-tactical-green placeholder-slate-600 border border-slate-700 rounded-sm pl-10 pr-10 py-3 focus:outline-none focus:border-tactical-green focus:ring-1 focus:ring-tactical-green/30 transition-all font-mono text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-1 text-slate-500 hover:text-tactical-green disabled:opacity-30 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatInterface;