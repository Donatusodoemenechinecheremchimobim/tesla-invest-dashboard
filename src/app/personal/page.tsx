#!/bin/bash

echo "✍️ FORCING SIGNATURE ANIMATION ONTO NEW SITE..."

# 1. RE-CREATE THE COMPONENT (Ensure it's perfect)
cat << 'EOF' > src/components/landing/SignatureAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SignatureAnimation() {
  const [showSeal, setShowSeal] = useState(false);

  return (
    <div className="relative w-full max-w-[400px] h-[200px] flex items-center justify-center mx-auto my-12">
      
      {/* PAPER TEXTURE BACKGROUND */}
      <div className="absolute inset-0 bg-[#111] border border-[#333] rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] transform -rotate-2" />
      <div className="absolute inset-0 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl transform rotate-1 flex items-center justify-center overflow-hidden">
         
         {/* CURSIVE WRITING SVG */}
         <svg width="300" height="100" viewBox="0 0 300 100" className="overflow-visible">
            <motion.path
              d="M20,60 C40,50 50,80 60,60 C70,40 60,30 50,40 C40,50 60,70 80,60 C90,55 100,50 110,60 C120,70 130,50 140,60 L150,60 M160,50 L160,70 M170,60 C180,50 190,70 200,60 C210,50 220,60 230,60" 
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              onAnimationComplete={() => setShowSeal(true)}
            />
         </svg>

         {/* TEXT FADE IN (Matches SVG path) */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 2 }}
              className="text-5xl font-serif text-[#D4AF37] italic tracking-wide" 
              style={{ fontFamily: 'serif', fontStyle: 'italic' }}
            >
              TeslaInv.
            </motion.h2>
         </div>

         {/* WAX SEAL STAMP */}
         <motion.div 
           initial={{ scale: 3, opacity: 0 }}
           animate={{ scale: showSeal ? 1 : 3, opacity: showSeal ? 1 : 0 }}
           transition={{ type: "spring", stiffness: 200, damping: 12 }}
           className="absolute bottom-4 right-4 w-16 h-16 bg-red-900 rounded-full border-4 border-red-950 shadow-xl flex items-center justify-center rotate-12"
         >
            <div className="w-12 h-12 border-2 border-red-950/50 rounded-full flex items-center justify-center">
               <span className="text-red-950 font-bold text-xs">TI</span>
            </div>
         </motion.div>

      </div>
    </div>
  );
}
EOF

# 2. UPDATE NEW SITE ABOUT PAGE (Adding it here)
cat << 'EOF' > src/app/about/page.tsx
'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import RocketGraph from '@/components/landing/RocketGraph'; 
import SignatureAnimation from '@/components/landing/SignatureAnimation'; // 👈 IMPORTED
import { motion } from 'framer-motion';
import { Target, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37]">
      <IntroNavbar />
      
      {/* HERO STORY */}
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em]">Our Genesis</span>
          <h1 className="text-5xl md:text-8xl font-serif mt-6 mb-8">From Chaos to Code.</h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed font-light">
            In 2020, the financial markets broke. While retail investors panicked, algorithms feasted. 
            We asked a simple question: <br/>
            <span className="text-white font-bold italic">"Why should Wall Street have all the fun?"</span>
          </p>
        </motion.div>

        {/* ✍️ SIGNATURE ADDED HERE */}
        <div className="py-10">
           <SignatureAnimation />
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div className="space-y-12">
              <div className="flex gap-6">
                 <div className="bg-[#111] p-4 h-fit rounded-2xl border border-white/10"><Target className="text-[#D4AF37]" size={32}/></div>
                 <div>
                    <h3 className="text-2xl font-serif mb-2">The Objective</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                       To democratize high-frequency trading. We built a bridge between Tesla's Dojo Supercomputer and your wallet.
                    </p>
                 </div>
              </div>
              <div className="flex gap-6">
                 <div className="bg-[#111] p-4 h-fit rounded-2xl border border-white/10"><Users className="text-[#D4AF37]" size={32}/></div>
                 <div>
                    <h3 className="text-2xl font-serif mb-2">The Community</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                       14,000+ members strong. From Dubai to Tokyo, our investors are not just clients; they are part of the network.
                    </p>
                 </div>
              </div>
           </div>

           <div className="bg-[#050505] p-8 rounded-[3rem] border border-white/10 shadow-2xl text-center">
              <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-8">Visualizing Our Growth</p>
              <RocketGraph />
              <p className="text-gray-500 text-[10px] mt-8 italic">Actual representation of Portfolio v4.2 Performance</p>
           </div>
        </div>
      </section>
    </main>
  );
}
EOF

# 3. UPDATE NEW SITE HOMEPAGE (Adding it to the Footer area as a stamp)
cat << 'EOF' > src/app/page.tsx
'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import SplashScreen from '@/components/intro/SplashScreen';
import LivePayouts from '@/components/landing/LivePayouts';
import PhoneAnimation from '@/components/landing/PhoneAnimation';
import RocketGraph from '@/components/landing/RocketGraph'; 
import CyberShield from '@/components/landing/CyberShield'; 
import DigitalVoyage from '@/components/landing/DigitalVoyage';
import SignatureAnimation from '@/components/landing/SignatureAnimation'; // 👈 IMPORTED
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

      {/* FOOTER SIGNATURE (NEW ADDITION) */}
      <section className="py-20 px-6 text-center border-t border-white/10">
         <h3 className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-8">Verified & Approved</h3>
         <SignatureAnimation /> {/* 👈 ALSO HERE ON HOMEPAGE */}
      </section>

    </main>
  );
}
EOF

echo "✅ SIGNATURE ANIMATION FORCE-DEPLOYED TO NEW SITE."