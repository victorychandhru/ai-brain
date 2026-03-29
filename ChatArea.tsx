"use client";

import { MessageBubble } from "./MessageBubble";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface Message {
  role: "user" | "ai";
  content: string;
}

interface ChatAreaProps {
  messages: Message[];
  onPromptSelect?: (prompt: string) => void;
}

export function ChatArea({ messages, onPromptSelect }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto pt-24 pb-48 px-4 md:px-12 lg:px-24 custom-scrollbar bg-white"
    >
      <div className="max-w-4xl mx-auto w-full">
        {messages.length <= 1 && (
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col items-center text-center space-y-8">
               <div className="relative w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl border border-gray-50 overflow-hidden">
                <Image src="/assets/srishti.png" alt="" width={60} height={60} className="object-contain" unoptimized />
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-black text-[#111] tracking-tight">Ready to Manifest.</h2>
                <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed">
                  The World's Elite ASI Intelligence Platform.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mt-4">
                 {[
                   'Architect a scalable cloud infrastructure', 
                   'Generate high-conversion ad copy', 
                   'Perform deep code optimization', 
                   'Design a market strategy'
                 ].map((prompt) => (
                   <button 
                    key={prompt} 
                    onClick={() => onPromptSelect?.(prompt)}
                    className="p-5 text-left border border-gray-100 rounded-2xl hover:border-[#111] hover:bg-gray-50 transition-all text-sm font-bold text-gray-700 shadow-sm group"
                  >
                     <span className="group-hover:translate-x-1 inline-block transition-transform">{prompt}</span>
                   </button>
                 ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-8">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} role={msg.role} content={msg.content} />
          ))}
        </div>
      </div>
    </div>
  );
}
