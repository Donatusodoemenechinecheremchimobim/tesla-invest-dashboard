'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import SplashScreen from '@/components/intro/SplashScreen';
import LivePayouts from '@/components/landing/LivePayouts';
import PhoneAnimation from '@/components/landing/PhoneAnimation'; // 👈 IMPORT
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

      {/* HERO SECTION SPLIT: TEXT LEFT, PHONE RIGHT */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: TEXT */}
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
              Watch your portfolio grow in real-time with Quantum Execution.
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              <Link href="/portal" className="px-10 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                Enter Platform
              </Link>
              <Link href="/technology" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                View Tech <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: PHONE ANIMATION */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }} 
             animate={{ opacity: 1, x: 0 }} 
             transition={{ delay: 3.8, duration: 1 }}
             className="hidden lg:block"
          >
             <PhoneAnimation />
          </motion.div>

        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-20 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div><h3 className="text-4xl font-serif text-white"><Counter to={18500} suffix="+" /></h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Active Investors</p></div>
          <div><h3 className="text-4xl font-serif text-[#D4AF37]">$<Counter to={940} suffix="M" /></h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Total Volume</p></div>
          <div><h3 className="text-4xl font-serif text-white"><Counter to={100} suffix="%" /></h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Uptime</p></div>
          <div><h3 className="text-4xl font-serif text-white">0.04<span className="text-sm">ms</span></h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Latency</p></div>
        </div>
      </section>

      {/* GLOBAL MAP */}
      <section className="py-32 px-6 max-w-7xl mx-auto text-center">
         <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em]">Global Infrastructure</span>
         <h2 className="text-5xl font-serif mt-6 mb-16">Operating in 140+ Countries</h2>
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

      {/* INFO CARDS */}
      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/insurance" className="group relative bg-[#111] border border-white/10 p-12 rounded-[3rem] overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 cursor-pointer">
             <ShieldCheck size={48} className="text-[#D4AF37] mb-8" />
             <h2 className="text-4xl font-serif mb-4">Insured by Tesla</h2>
             <p className="text-gray-400 mb-8 leading-relaxed max-w-md">Zero risk. 100% principal guarantee.</p>
             <span className="text-white text-xs font-bold uppercase tracking-widest border-b border-[#D4AF37] pb-1">Read Policy</span>
          </Link>
          <Link href="/technology" className="group relative bg-[#111] border border-white/10 p-12 rounded-[3rem] overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 cursor-pointer">
             <Server size={48} className="text-[#D4AF37] mb-8" />
             <h2 className="text-4xl font-serif mb-4">The Technology</h2>
             <p className="text-gray-400 mb-8 leading-relaxed max-w-md">Powered by Dojo Supercomputer V4.</p>
             <span className="text-white text-xs font-bold uppercase tracking-widest border-b border-[#D4AF37] pb-1">Learn More</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
