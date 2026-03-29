
"use client";

import { Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

interface MicPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscriptComplete: (text: string) => void;
}

export function MicPopup({ isOpen, onClose, onTranscriptComplete }: MicPopupProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = "en-US";

        recognitionInstance.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognitionInstance.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen && recognition) {
      recognition.start();
      setIsListening(true);
      setTranscript("");
    } else if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [isOpen, recognition]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const handleFinish = () => {
    if (transcript.trim()) {
      onTranscriptComplete(transcript);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 flex flex-col items-center gap-8 corporate-shadow animate-in zoom-in-95 duration-300 relative">
        <div className="absolute top-6 right-6">
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-100 h-10 w-10">
            <X size={24} className="text-gray-400" />
          </Button>
        </div>
        
        <div className="relative mt-4">
          <div className={`absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20 ${isListening ? 'scale-150' : 'scale-0'}`}></div>
          <div className={`relative w-28 h-28 ${isListening ? 'bg-red-500' : 'bg-gray-200'} rounded-full flex items-center justify-center shadow-2xl transition-all duration-500`}>
            {isListening ? <Mic size={48} className="text-white animate-pulse" /> : <Mic size={48} className="text-gray-400" />}
          </div>
        </div>

        <div className="text-center space-y-3">
          <h3 className="text-2xl font-extrabold text-[#111] tracking-tight">
            {isListening ? "SRISHTI is Listening..." : "Microphone Ready"}
          </h3>
          <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
            Voice command enabled
          </p>
        </div>

        <div 
          ref={scrollRef}
          className="w-full h-[140px] bg-gray-50 rounded-3xl p-8 border border-gray-100 text-gray-700 text-xl font-medium text-center leading-relaxed italic overflow-y-auto custom-scrollbar"
        >
          {transcript || "Speak now..."}
        </div>

        <Button 
          onClick={handleFinish}
          className="w-full py-8 rounded-2xl bg-[#111] text-white hover:bg-black font-bold text-lg shadow-xl active:scale-[0.98] transition-all"
        >
          {transcript ? "Apply Transcript" : "Finish Recording"}
        </Button>
      </div>
    </div>
  );
}
