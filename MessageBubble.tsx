"use client";

import { MessageActions } from "./MessageActions";
import Image from "next/image";

interface MessageBubbleProps {
  role: "user" | "ai";
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`max-w-[95%] md:max-w-[85%] flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isUser && (
          <div className="hidden sm:flex shrink-0 w-8 h-8 bg-white border border-gray-50 rounded-lg items-center justify-center p-1 shadow-sm overflow-hidden">
             <Image src="/assets/srishti.png" alt="" width={24} height={24} className="object-contain" unoptimized />
          </div>
        )}
        
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`
            px-5 py-3 rounded-2xl text-[15px] md:text-[17px] leading-relaxed font-medium tracking-tight
            ${isUser 
              ? 'bg-[#111] text-white rounded-tr-none' 
              : 'bg-white text-[#111] rounded-tl-none border border-gray-100 shadow-sm'}
          `}>
            <p className="whitespace-pre-wrap">{content}</p>
          </div>
          {!isUser && (
            <div className="ml-1 scale-90 origin-left">
              <MessageActions content={content} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
