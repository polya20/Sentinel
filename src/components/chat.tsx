import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { ChatMessage } from "../types";
import { cn } from "../lib/utils";

interface ChatProps {
  initialInput?: string;
  onClearInput?: () => void;
}

export function Chat({ initialInput, onClearInput }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      parts: [{ text: "Hello! I am your Kafka Cruise Control SRE Assistant. Click a question from the dashboard or ask me anything directly." }]
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialInput) {
      setInput(initialInput);
      if (onClearInput) onClearInput();
    }
  }, [initialInput, onClearInput]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: "user", parts: [{ text: input.trim() }] };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages.slice(1), userMsg] }), // Skip initial local message for history
      });
      
      if (!response.ok) throw new Error("Failed to fetch response");
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: "model", parts: [{ text: data.text }] }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: "model", 
        parts: [{ text: "Sorry, I had trouble connecting to the Cruise Control system. Please try again." }] 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="h-full w-full bg-[#111113] border-l border-[#242427] flex flex-col">
      <div className="p-4 flex-shrink-0 border-b border-[#242427] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-white text-black flex items-center justify-center font-bold text-[10px]">C</div>
          <span className="text-xs font-bold tracking-tight text-white">CLAUDE // KCC BRIDGE</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]"></div>
      </div>
      
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={cn(
             "text-xs leading-relaxed max-w-[85%] shadow-lg",
             msg.role === "user" 
               ? "ml-auto bg-[#2563EB] text-white p-3 rounded-lg" 
               : "bg-[#1A1A1C] text-[#D1D1D1] p-3 rounded-lg"
          )}>
            <div className="whitespace-pre-wrap">{msg.parts[0].text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="bg-[#1A1A1C] text-white p-3 rounded-lg text-xs leading-relaxed max-w-[85%] flex items-center gap-2 shadow-lg">
             <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" />
             <span>Analyzing cluster state...</span>
          </div>
        )}
      </div>

      <div className="p-4 mt-auto border-t border-[#242427] bg-[#111113]">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Query Cruise Control API..."
            className="w-full bg-[#0A0A0B] border border-[#242427] rounded-md px-3 py-3 text-xs text-white focus:outline-none focus:border-[#2563EB] pr-10 resize-none transition-colors"
            rows={3}
            style={{ minHeight: '64px', maxHeight: '160px' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-3 p-1 text-slate-400 hover:text-white disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[9px] text-slate-400 mt-2 text-center uppercase tracking-widest">Assistant is interacting with context7.com</p>
      </div>
    </aside>
  );
}
