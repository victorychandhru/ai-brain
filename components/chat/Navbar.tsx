"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-xl border-b border-gray-50 flex items-center justify-between px-6 z-[60] shadow-sm">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="h-10 w-10 rounded-xl hover:bg-gray-100 transition-all active:scale-95"
        >
          <Menu size={20} strokeWidth={1.5} className="text-[#111]" />
        </Button>
        
        <div className="relative w-32 h-8 flex items-center">
          <Image src="/assets/srishti.png" alt="" fill className="object-contain object-left pointer-events-none" priority unoptimized />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-20 h-8 flex items-center justify-center">
          <Image src="/assets/YUGA.png" alt="" fill className="object-contain pointer-events-none" priority unoptimized />
        </div>
      </div>
    </nav>
  );
}
