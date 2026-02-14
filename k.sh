#!/bin/bash

cat << 'EOF' > src/app/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Shield, Activity, TrendingUp, ChevronDown, CheckCircle2, Search, Lock, Zap } from 'lucide-react';
import Link from 'next/link';

export default function VerdeStockLanding() {
  // --- TYPEWRITER & TURN LOGIC ---
  const [typedText, setTypedText] = useState("");
  const fullText = "verdestock.com";
  const [isTurned, setIsTurned] = useState(false);

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 150);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsTurned(true);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // --- EARNING BUBBLE LOGIC ---
  const [notification, setNotification] = useState({ name: "Alexander G.", amount: "12,400", country: "Switzerland", visible: true });
  
  useEffect(() => {
    const names = ["Alexander G.", "Sarah L.", "Marcus R.", "Elena K.", "David W.", "Victor B."];
    const countries = ["Switzerland", "UK", "UAE", "Singapore", "Canada", "Germany"];
    
    const cycleNotifications = () => {
      setNotification(prev => ({ ...prev, visible: false })); // Fade out
      setTimeout(() => {
        const randomAmount = Math.floor(Math.random() * (18000 - 3500 + 1) + 3500).toLocaleString();
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        setNotification({ name: randomName, amount: randomAmount, country: randomCountry, visible: true }); // Fade in new
      }, 1000); 
    };
    
    const interval = setInterval(cycleNotifications, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-[#050505] text-white overflow-x-hidden selection:bg-[#D4AF37] selection:text-black relative">
      <Navbar />

      {/* --- SINGLE FIXED EARNING BUBBLE (Bottom Left) --- */}
      <AnimatePresence mode="wait">
        {notification.visible && (
          <motion.div 
            key={notification.name} // Key change triggers animation
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-6 z-[999] bg-[#0a0a0a] border border-[#D4AF37]/30 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center gap-4 max-w-sm backdrop-blur-md"
          >
             <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30 shrink-0">
                <CheckCircle2 size={18} className="text-[#D4AF37]" />
             </div>
             <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Recent Withdrawal</p>
                <p className="text-white text-sm font-bold">{notification.name} <span className="text-[#D4AF37]">${notification.amount}</span></p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 max-w-[1400px] mx-auto">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2532&auto=format&fit=crop')] bg-cover bg-center opacity-20 mask-image-gradient pointer-events-none mix-blend-screen"></div>
        
        <div className="grid lg:grid-cols-2 gap-20 items-center w-full relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5 mb-10">
              <Shield size={12} className="text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">Private Wealth</span>
            </div>
            
            <h1 className="text-7xl md:text-[7rem] font-serif leading-[0.9] mb-8 text-white">
              WEALTH <br /> <span className="text-[#D4AF37]">REFINED.</span>
            </h1>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-12">
              VerdeStock provides institutional-grade access to global markets, secured by physical gold reserves and advanced cryptography.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/portal" className="px-10 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.2em] rounded hover:bg-white transition-all flex items-center gap-3">
                Access Portal <ArrowRight size={14} />
              </Link>
              <button className="px-10 py-4 border border-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded hover:bg-white/5 transition-all">
                View Strategy
              </button>
            </div>
          </motion.div>

          {/* --- 3D SEARCH & TURN ANIMATION --- */}
          <div className="relative h-[500px] w-full flex items-center justify-center perspective-[1200px]">
             <motion.div 
               className="relative w-full max-w-md aspect-[4/5] preserve-3d"
               animate={{ rotateY: isTurned ? 180 : 0 }}
               transition={{ duration: 1.2, ease: "easeInOut" }}
               style={{ transformStyle: "preserve-3d" }}
             >
                {/* FRONT FACE: SEARCH BAR */}
                <div className="absolute inset-0 backface-hidden flex items-center justify-center">
                   <div className="w-full bg-[#111] border border-white/1