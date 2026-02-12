#!/bin/bash

echo "✂️ REMOVING 'DOJO V4 ACTIVE' BADGE..."

# ======================================================
# UPDATE PAGE.TSX (Removing the badge span)
# ======================================================
cat << 'EOF' > src/app/page.tsx
'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import SplashScreen from '@/components/intro/SplashScreen';
import LivePayouts from '@/components/landing/LivePayouts';
import PhoneAnimation from '@/components/landing/PhoneAnimation';
import RocketGraph from '@/components/landing/RocketGraph'; 
import CyberShield from '@/components/landing/CyberShield'; 
import DigitalVoyage from '@/components/landing/DigitalVoyage';
import SignatureAnimation from '@/components/landing/SignatureAnimation'; 
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
            
            {/* REMOVED THE DOJO V4 ACTIVE BADGE HERE */}

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

      {/* FOOTER SIGNATURE */}
      <section className="py-20 px-6 text-center border-t border-white/10">
         <h3 className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-8">Verified & Approved</h3>
         <SignatureAnimation />
      </section>

    </main>
  );
}
EOF

echo "✅ REMOVED DOJO V4 ACTIVE TEXT."