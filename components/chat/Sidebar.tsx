"use client";

import Image from "next/image";
import { PlusCircle, MessageSquare, User, LogOut, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onNewChat: () => void;
  onClose: () => void;
}

export function Sidebar({ isOpen, onNewChat, onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState("AI Strategy 2024");

  const NavItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(label)}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all text-sm font-bold tracking-tight ${activeTab === label ? 'bg-gray-50 text-[#111] shadow-sm' : 'text-gray-400 hover:bg-gray-50 hover:text-[#111]'}`}
    >
      <Icon size={18} strokeWidth={activeTab === label ? 2.5 : 2} />
      <span>{label}</span>
    </button>
  );

  return (
    <>
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <aside className={`fixed left-0 top-0 bottom-0 w-[280px] bg-white border-r border-gray-50 flex flex-col z-[70] transition-transform duration-500 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-50">
          <div className="relative w-32 h-6">
            <Image src="/assets/srishti.png" alt="" fill className="object-contain object-left" priority unoptimized />
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100 rounded-lg h-8 w-8">
            <X size={18} />
          </Button>
        </div>

        <div className="p-4">
          <Button onClick={() => { onNewChat(); onClose(); }} className="w-full justify-center gap-3 bg-[#111] hover:bg-black text-white rounded-xl py-5 shadow-lg shadow-black/5 transition-all active:scale-95 group">
            <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-bold text-[9px] uppercase tracking-[0.15em]">New Session</span>
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-6 py-4">
            <div className="space-y-1">
              <p className="px-5 text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 opacity-50">History</p>
              <NavItem icon={MessageSquare} label="AI Strategy 2024" />
              <NavItem icon={MessageSquare} label="Architecture Audit" />
            </div>
            <div className="space-y-1">
              <p className="px-5 text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 opacity-50">Account</p>
              <NavItem icon={LayoutDashboard} label="Network Matrix" />
              <NavItem icon={User} label="Executive Profile" />
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-50">
          <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-500 hover:bg-red-50 font-bold transition-all text-xs">
            <LogOut size={16} strokeWidth={2.5} />
            <span className="uppercase tracking-[0.1em] text-[9px]">Terminate</span>
          </button>
        </div>
      </aside>
    </>
  );
}
