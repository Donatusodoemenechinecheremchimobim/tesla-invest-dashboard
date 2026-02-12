#!/bin/bash

echo "⚓ FORCING ROCKET & VOYAGER ANIMATIONS TO GO LIVE..."

# 1. RE-CREATE ROCKET GRAPH (Ensure it exists)
cat << 'EOF' > src/components/landing/RocketGraph.tsx
'use client';

import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function RocketGraph() {
  return (
    <div className="relative w-full max-w-[350px] h-[350px] bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(212,175,55,0.1)]">
      
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="relative w-full h-full p-8">
        <div className="absolute top-6 left-6">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Tesla Growth</p>
          <h3 className="text-3xl text-white font-serif mt-1">+420%</h3>
        </div>

        {/* THE PATH */}
        <svg className="absolute bottom-0 left-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient id="rocketGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <motion.path 
            d="M0,350 Q100,300 175,200 T350,50 V350 H0 Z"
            fill="url(#rocketGradient)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.path 
            d="M0,350 Q100,300 175,200 T350,50"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* THE ROCKET */}
        <motion.div
          className="absolute"
          initial={{ offsetDistance: "0%" }}
          whileInView={{ offsetDistance: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ 
            offsetPath: "path('M0,350 Q100,300 175,200 T350,50')",
            offsetRotate: "auto"
          }}
        >
          <div className="relative -rotate-45 transform"> 
             <Rocket size={32} className="text-white fill-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
             <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ repeat: Infinity, duration: 0.2 }}
               className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-6 bg-orange-500 rounded-full blur-[2px]"
             />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
EOF

# 2. RE-CREATE DIGITAL VOYAGE (With FIXED Import)
cat << 'EOF' > src/components/landing/DigitalVoyage.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Ship, Zap, Telescope } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DigitalVoyage() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const loop = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full max-w-4xl h-[400px] bg-[#050505] border border-white/10 rounded-[3rem] overflow-hidden mx-auto shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      
      {/* 🌊 OCEAN */}
      <div className="absolute inset-0 flex flex-col justify-end pb-10 opacity-30">
        <motion.div 
           animate={{ x: ["-5%", "0%", "-5%"] }}
           transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
           className="w-[120%] h-32 bg-gradient-to-t from-[#111] to-transparent border-t border-white/5"
        />
        <motion.div 
           animate={{ x: ["0%", "-5%", "0%"] }}
           transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
           className="w-[120%] h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent border-t border-[#D4AF37]/10"
        />
      </div>

      {/* 🏝️ BEACON */}
      <motion.div 
        animate={{ 
           scale: stage >= 2 ? [1, 1.2, 1] : 1,
           opacity: stage >= 1 ? 1 : 0.2,
           filter: stage >= 1 ? "blur(0px)" : "blur(5px)"
        }}
        transition={{ duration: 2 }}
        className="absolute top-10 right-10 md:right-32 z-10 flex flex-col items-center"
      >
        <div className="bg-[#D4AF37] p-4 rounded-full shadow-[0_0_60px_#D4AF37]">
          <Zap size={32} className="text-black fill-black" />
        </div>
        <p className="text-[#D4AF37] text-[10px] font-bold mt-2 uppercase tracking-widest">The Sanctuary</p>
      </motion.div>

      {/* 🚢 SHIP */}
      <motion.div
        animate={{ 
           x: stage === 0 ? 0 : stage === 1 ? 50 : 250, 
           y: [0, -5, 0], 
           rotate: stage === 3 ? 0 : [1, -1, 1] 
        }}
        transition={{ 
           x: { duration: 3, ease: "easeInOut" },
           y: { repeat: Infinity, duration: 2 },
           rotate: { repeat: Infinity, duration: 3 }
        }}
        className="absolute bottom-20 left-10 md:left-32 z-20 text-white"
      >
        <div className="relative">
           <Ship size={64} className="text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]" />
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: stage === 1 ? 1 : 0 }}
             className="absolute -top-8 -right-8 bg-white/10 p-2 rounded-full border border-white/20 backdrop-blur-md"
           >
              <Telescope size={20} className="text-[#D4AF37]" />
           </motion.div>
           <AnimatePresence>
             {stage === 1 && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0 }}
                 className="absolute -top-20 -right-20 bg-[#D4AF37] text-black px-4 py-2 rounded-xl text-[10px] font-bold uppercase w-32 shadow-lg"
               >
                 Opportunity Sighted!
               </motion.div>
             )}
           </AnimatePresence>
        </div>
        <motion.div 
           animate={{ width: [0, 50, 0], opacity: [0, 0.5, 0] }}
           transition={{ repeat: Infinity, duration: 1 }}
           className="absolute bottom-0 -left-10 h-1 bg-white/20 rounded-full"
        />
      </motion.div>

      {/* 📜 TEXT */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full text-center px-4">
        <motion.p 
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-gray-400 text-xs md:text-sm font-serif italic"
        >
          {stage === 0 && "Drifting in the sea of traditional banking..."}
          {stage === 1 && "Wait... scanning horizon... High-Yield Signal Detected."}
          {stage === 2 && "Target Locked: Tesla Investment Ecosystem."}
          {stage === 3 && "Full Speed Ahead. Wealth Imminent."}
        </motion.p>
      </div>
    </div>
  );
}
EOF

# 3. UPDATE PAGE.TSX TO SHOW THEM
cat << 'EOF' > src/app/page.tsx
'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import SplashScreen from '@/components/intro/SplashScreen';
import LivePayouts from '@/components/landing/LivePayouts';
import PhoneAnimation from '@/components/landing/PhoneAnimation';
import RocketGraph from '@/components/landing/RocketGraph'; 
import CyberShield from '@/components/landing/CyberShield'; 
import DigitalVoyage from '@/components/landing/DigitalVoyage'; 
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ShieldCheck, TrendingUp, ArrowRight, Server, Globe } from 'lucide-react';
import { useInView } from 'framer-motion';

const Counter = ({ to, suffix = "" }: { to: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; 
      const timer = setInterval(() => {
        start += Math.ceil(to / 50);
        if (start >= to) { setCount(to); clearInterval(timer); } 
        else { setCount(start); }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, to]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export default function LuxuryHome() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <LivePayouts />
      <IntroNavbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.5, duration: 1 }}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-bold uppercase tracking-[0.4em] mb-8 animate-pulse">
              System Online • Dojo V4 Active
            </span>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-tight tracking-tight text-white">
              Invest in <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">The Future.</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-lg max-w-xl mb-12 leading-relaxed font-light">
              Join the elite ecosystem powered by Tesla's algorithmic dominance. 
              Watch your portfolio grow in real-time.
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              <Link href="/portal" className="px-10 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.3)] text-center">
                Enter Platform
              </Link>
              <Link href="/about" className="group flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                Read Our Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.8, duration: 1 }} className="flex justify-center">
             <div className="scale-75 md:scale-100 transform origin-top md:origin-center">
                <PhoneAnimation />
             </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div><h3 className="text-4xl font-serif text-white"><Counter to={18500} suffix="+" /></h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Active Investors</p></div>
          <div><h3 className="text-4xl font-serif text-[#D4AF37]">$<Counter to={940} suffix="M" /></h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Total Volume</p></div>
          <div><h3 className="text-4xl font-serif text-white"><Counter to={100} suffix="%" /></h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Uptime</p></div>
          <div><h3 className="text-4xl font-serif text-white">0.04<span className="text-sm">ms</span></h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Latency</p></div>
        </div>
      </section>

      {/* VOYAGER */}
      <section className="py-32 px-6 max-w-7xl mx-auto text-center">
         <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em]">The Journey</span>
         <h2 className="text-4xl md:text-5xl font-serif mt-6 mb-16">Navigating the Digital Ocean</h2>
         <DigitalVoyage />
         <p className="text-gray-400 max-w-2xl mx-auto mt-12 leading-relaxed">
            Stop drifting in the choppy waters of traditional banking. 
            Set your sights on the golden beacon of Tesla AI Trading.
         </p>
      </section>

      {/* ROCKET & SHIELD */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-black border-y border-white/5">
        <div className="text-center mb-16">
           <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em]">Visualizing Performance</span>
           <h2 className="text-5xl font-serif mt-6">Speed & Security</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="bg-[#0a0a0a] p-8 md:p-12 rounded-[3rem] border border-white/10 text-center group hover:border-[#D4AF37]/30 transition-colors">
              <RocketGraph />
              <h3 className="text-3xl font-serif mt-8 mb-4">Hyper-Growth</h3>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">AI identifies breakout patterns before they happen.</p>
           </div>
           <div className="bg-[#0a0a0a] p-8 md:p-12 rounded-[3rem] border border-white/10 text-center group hover:border-[#D4AF37]/30 transition-colors">
              <CyberShield />
              <h3 className="text-3xl font-serif mt-8 mb-4">Ironclad Security</h3>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">Assets protected by military-grade encryption.</p>
           </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-32 px-6 max-w-7xl mx-auto text-center">
         <h2 className="text-5xl font-serif mb-16">Operating in 140+ Countries</h2>
         <div className="relative w-full h-[300px] md:h-[500px] bg-[#111] rounded-[3rem] border border-white/5 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center opacity-10 grayscale invert" />
            <div className="absolute top-[30%] left-[20%] w-3 h-3 bg-[#D4AF37] rounded-full animate-ping" />
            <div className="absolute top-[40%] left-[50%] w-3 h-3 bg-[#D4AF37] rounded-full animate-ping delay-700" />
            <div className="absolute top-[60%] left-[75%] w-3 h-3 bg-[#D4AF37] rounded-full animate-ping delay-300" />
            <div className="relative z-10 bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-white/10">
               <Globe size={48} className="mx-auto mb-4 text-[#D4AF37]" />
               <h3 className="text-2xl font-serif">Decentralized Nodes</h3>
               <p className="text-sm text-gray-400 mt-2">Route your trades through the nearest server.</p>
            </div>
         </div>
      </section>
    </main>
  );
}
EOF

echo "✅ FORCE UPDATE COMPLETE: ROCKET & SHIP ANIMATIONS LIVE."