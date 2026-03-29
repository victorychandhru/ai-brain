"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const instance = new SpeechRecognition();
        instance.continuous = true;
        instance.interimResults = true;
        instance.lang = "en-US";

        instance.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setInput(currentTranscript);
          if (textareaRef.current) {
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
          }
        };

        instance.onerror = () => setIsListening(false);
        instance.onend = () => setIsListening(false);
        setRecognition(instance);
      }
    }
  }, []);

  const toggleMic = () => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      setInput(""); 
    }
  };

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onSend(trimmedInput);
    } else {
      onSend("hi");
    }
    setInput("");
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-white via-white to-transparent z-40">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] p-1 flex flex-col gap-0 ring-1 ring-gray-50 overflow-hidden">
          
          <div className="flex items-center gap-2 px-2">
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-gray-300 hover:text-[#111] shrink-0">
              <Paperclip size={14} strokeWidth={1.5} />
            </Button>

            <Textarea 
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Anything to SRISHTI..."
              className="min-h-[36px] h-[36px] max-h-[100px] border-none focus-visible:ring-0 text-[14px] font-medium placeholder:text-gray-300 bg-transparent resize-none leading-relaxed py-2 px-0 custom-scrollbar"
            />

            <div className="flex items-center gap-1 shrink-0">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMic}
                className={`h-7 w-7 rounded-full transition-colors ${isListening ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-[#111]'}`}
              >
                <Mic size={14} strokeWidth={1.5} className={isListening ? "animate-pulse" : ""} />
              </Button>
              
              <Button onClick={handleSend} className="h-7 w-7 rounded-full bg-[#111] text-white shadow-md active:scale-95 flex items-center justify-center p-0">
                <Send size={11} strokeWidth={2.5} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-6 opacity-30 grayscale pointer-events-none">
            <div className="relative w-16 h-4">
              <Image src="/assets/srishti.png" alt="" fill className="object-contain" priority unoptimized />
            </div>
            <div className="w-[1px] h-3 bg-gray-200" />
            <div className="relative w-16 h-4">
              <Image src="/assets/YUGA.png" alt="" fill className="object-contain" priority unoptimized />
            </div>
          </div>
          <p className="text-[6px] text-center text-gray-400 font-bold tracking-[0.4em] uppercase">
            POWERED BY YUGA FOUNDATION
          </p>
        </div>
      </div>
    </div>
  );
}
