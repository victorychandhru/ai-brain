
"use client";

import { Copy, ThumbsUp, ThumbsDown, Share2, Play, RefreshCw, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MessageActionsProps {
  content: string;
}

export function MessageActions({ content }: MessageActionsProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlay = () => {
    const utterance = new SpeechSynthesisUtterance(content);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex items-center gap-1 mt-4 animate-in fade-in slide-in-from-top-1 duration-500">
      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#111]" onClick={handleCopy}>
        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className={`h-8 w-8 text-gray-400 hover:text-blue-500 ${liked ? 'text-blue-500 bg-blue-50' : ''}`}
        onClick={() => { setLiked(!liked); setDisliked(false); }}
      >
        <ThumbsUp size={14} fill={liked ? "currentColor" : "none"} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className={`h-8 w-8 text-gray-400 hover:text-red-500 ${disliked ? 'text-red-500 bg-red-50' : ''}`}
        onClick={() => { setDisliked(!disliked); setLiked(false); }}
      >
        <ThumbsDown size={14} fill={disliked ? "currentColor" : "none"} />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#111]">
        <Share2 size={14} />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#2A2AAD]" onClick={handlePlay}>
        <Play size={14} />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#111]">
        <RefreshCw size={14} />
      </Button>
    </div>
  );
}
