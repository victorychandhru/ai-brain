"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/chat/Navbar";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { ChatInput } from "@/components/chat/ChatInput";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { chatFlow } from "@/ai/flows/chat-flow";
import { FirestorePermissionError } from "@/firebase/errors";
import { errorEmitter } from "@/firebase/error-emitter";

export default function Home() {
  const [messages, setMessages] = useState<{role: "user" | "ai", content: string}[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const db = useFirestore();

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: "ai",
        content: "Hi I am SRISHTI, Your Virtual ASI Agent. How can I assist for you today?"
      }]);
    }
  }, [messages.length]);

  const saveToFirestore = (role: string, content: string) => {
    if (!db) return;
    const chatRef = collection(db, "chat");
    addDoc(chatRef, {
      role,
      content,
      timestamp: serverTimestamp(),
    }).catch(async (err) => {
      const permissionError = new FirestorePermissionError({
        path: chatRef.path,
        operation: 'create',
        requestResourceData: { role, content }
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      const greeting = "Hi I am SRISHTI, Your Virtual ASI Agent. How can I assist for you today?";
      setMessages(prev => [...prev, { role: "ai", content: greeting }]);
      return;
    }
    
    const userMsg = { role: "user" as const, content: content.trim() };
    setMessages(prev => [...prev, userMsg]);
    saveToFirestore("user", userMsg.content);

    try {
      // Calling server action which connects to ngrok API
      const replyContent = await chatFlow(userMsg.content);
      const aiResponse = { role: "ai" as const, content: replyContent };
      setMessages(prev => [...prev, aiResponse]);
      saveToFirestore("ai", replyContent);
    } catch (err) {
      const errorMsg = "AI not reachable. Please try again.";
      setMessages(prev => [...prev, { role: "ai", content: errorMsg }]);
    }
  };

  const handleNewChat = () => {
    setMessages([{
      role: "ai",
      content: "Hi I am SRISHTI, Your Virtual ASI Agent. How can I assist for you today?"
    }]);
  };

  return (
    <div className="flex min-h-screen bg-white overflow-hidden font-body relative">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onNewChat={handleNewChat} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <main className="flex-1 flex flex-col bg-white w-full transition-all duration-500">
        <ChatArea messages={messages} onPromptSelect={handleSendMessage} />
        <ChatInput onSend={handleSendMessage} />
      </main>
    </div>
  );
}
