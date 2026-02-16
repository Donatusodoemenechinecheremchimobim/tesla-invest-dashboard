'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Search, Lock, Zap, Cpu } from 'lucide-react';
import Link from 'next/link';

// --- CUSTOM SVG DASHBOARD COMPONENT ---
const NeuralDashboardSVG = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full bg-[#0a0a0a]">
    <defs>
      <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
      </radialGradient>
    </defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)" />
    <circle cx="200" cy="200" r="80" fill="url(#hubGlow)" />
    <motion.circle 
      cx="200" cy="200" r="40" 
      stroke="#D4AF37" strokeWidth="2" fill="none"
      animate={{ r: [40, 45, 40], opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 3 }}
    />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 200 200)`}>
        <motion.line 
          x1="200" y1="120" x2="200" y2="60" 
          stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -20 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
        <circle cx="200" cy="50" r="4" fill="#D4AF37" />
      </g>
    ))}
  </svg>
);

export default function VerdeStockLanding() {
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
      const timeout = setTimeout(() => { setIsTurned(true); }, 800);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  return (
    <main className="bg-[#050505] text-white overflow-x-hidden selection:bg-[#D4AF37] selection:text-black w-full">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 md:pt-32 px-4 md:px-6 max-w-[1400px] mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center w-full relative z-10">
          
          {/* Text Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="text-center lg:text-left">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] mb-6 md:mb-8">Institutional Wealth Management</span>
            {/* Responsive Text Sizing: Smaller on mobile to prevent cut-off */}
            <h1 className="text-5xl sm:text-7xl md:text-[8.5rem] font-serif mb-6 md:mb-8 leading-[0.9] md:leading-[0.8] tracking-tighter">
              WEALTH <br /><span className="text-[#D4AF37] italic">REFINED.</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-lg mb-8 md:mb-12 font-light mx-auto lg:mx-0">
              Access mathematically secured global equity clusters. Powered by physical reserves and zero-knowledge architecture.
            </p>
            <Link href="/portal/auth" className="inline-flex px-10 py-4 md:px-12 md:py-5 bg-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all items-center gap-3 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
              Access Gateway <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* 3D Flip Card */}
          <div className="relative h-[400px] md:h-[600px] flex items-center justify-center perspective-[1500px] w-full">
             <motion.div 
                className="relative w-full max-w-[320px] md:max-w-md aspect-[4/5] preserve-3d" 
                animate={{ rotateY: isTurned ? 180 : 0 }} 
                transition={{ duration: 1.5, ease: "anticipate" }}
                style={{ transformStyle: "preserve-3d" }}
             >
                {/* FRONT OF CARD */}
                <div className="absolute inset-0 backface-hidden bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col items-center justify-center gap-8 shadow-2xl z-20">
                   <Lock size={32} className="text-[#D4AF37]" />
                   <div className="w-full h-14 md:h-16 bg-black border border-white/10 rounded-full flex items-center px-6 md:px-8 gap-3 md:gap-4 shadow-inner">
                      <Search size={18} className="text-gray-500" />
                      <span className="font-mono text-base md:text-xl text-[#D4AF37] border-r-2 border-[#D4AF37] pr-2 animate-pulse-cursor whitespace-nowrap overflow-hidden">
                        {typedText}
                      </span>
                   </div>
                </div>

                {/* BACK OF CARD */}
                <div className="absolute inset-0 backface-hidden rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#0a0a0a]" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
                   <NeuralDashboardSVG />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                   <div className="absolute bottom-8 left-8 right-8 z-20">
                      <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-1">Neural Core Active</p>
                      <h3 className="text-4xl md:text-5xl font-serif text-white tracking-tighter shadow-black drop-shadow-lg">$142M+</h3>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="border-y border-white/5 bg-black py-4 md:py-6 overflow-hidden w-full">
        <div className="flex gap-12 md:gap-24 text-[10px] md:text-[11px] font-mono text-[#D4AF37] uppercase tracking-[0.3em] animate-marquee whitespace-nowrap opacity-60">
          <span>XAU/USD $2,402.18 ▲</span><span>BTC/USD $64,230.50 ▲</span><span>TSLA $178.20 ▲</span><span>NDX 18,300.10 ▲</span>
          <span>XAU/USD $2,402.18 ▲</span><span>BTC/USD $64,230.50 ▲</span><span>TSLA $178.20 ▲</span><span>NDX 18,300.10 ▲</span>
        </div>
      </div>

      {/* BENTO GRID */}
      <section className="py-20 md:py-32 px-4 md:px-6 max-w-[1400px] mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 h-auto md:h-[700px]">
            {/* Large Image Card */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group min-h-[300px]">
               <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1200" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-40" alt="Hubs" />
               <div className="absolute inset-0 bg-black/40" />
               <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                 <h3 className="text-4xl md:text-5xl font-serif mb-4 text-white">Global Hubs</h3>
               </div>
            </div>

            {/* Neural Architecture Card */}
            <div className="bg-[#111] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border border-white/5 flex flex-col justify-between hover:border-[#D4AF37]/40 transition-colors min-h-[250px]">
               <Cpu className="text-[#D4AF37]" size={32} md:size={40} />
               <h3 className="text-2xl md:text-3xl font-serif text-white">Neural <br/> Architecture</h3>
            </div>

            {/* Security Card */}
            <div className="bg-[#D4AF37] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between text-black min-h-[250px]">
               <Shield size={32} md:size={40} />
               <h3 className="text-2xl md:text-3xl font-serif font-bold text-black">Tier 4 <br/> Security</h3>
            </div>

            {/* Private Credit Link */}
            <Link href="/portal/auth" className="md:col-span-2 bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border border-white/5 flex items-center justify-between group min-h-[150px]">
               <div className="max-w-xs"><h3 className="text-3xl md:text-4xl font-serif text-white">Private Credit</h3></div>
               <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                 <ArrowRight />
               </div>
            </Link>
         </div>
      </section>

      {/* TRACING GRAPH */}
      <section className="py-12 md:py-20 px-4 md:px-6 max-w-[1400px] mx-auto">
        <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 overflow-hidden relative">
           <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-20 relative z-10 gap-4">
             <h2 className="text-4xl md:text-6xl font-serif text-white">Equity <span className="text-gray-700 italic">Pulse</span></h2>
             <h2 className="text-4xl md:text-6xl font-mono text-[#D4AF37] tracking-tight">$1.24T+</h2>
           </div>
           <div className="relative w-full h-[200px] md:h-[400px]">
              <svg width="100%" height="100%" viewBox="0 0 1200 400" preserveAspectRatio="none" className="overflow-visible">
                 <motion.path 
                    d="M0,350 C100,340 200,380 300,300 C400,220 500,280 600,180 C700,80 800,220 900,120 C1000,20 1100,60 1200,40" 
                    fill="none" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }}
                 />
              </svg>
           </div>
        </div>
      </section>

      {/* SCANNING PHONE */}
      <section className="py-20 md:py-40 px-4 md:px-6 max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center overflow-hidden">
        {/* Phone Container - Scaled for Mobile */}
        <motion.div className="relative flex justify-center w-full">
          <motion.div 
            animate={{ y: [-15, 15, -15] }} 
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} 
            className="w-[280px] h-[560px] md:w-[340px] md:h-[680px] bg-black border-[8px] md:border-[10px] border-[#1a1a1a] rounded-[3rem] md:rounded-[4rem] relative shadow-2xl overflow-hidden shrink-0"
          >
            <div className="pt-20 md:pt-28 px-6 md:px-8 space-y-8 md:space-y-12 bg-[#050505] h-full relative">
              <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-widest"><span>Net Worth</span><Shield size={14} className="text-[#D4AF37]" /></div>
              <h3 className="text-3xl md:text-4xl font-serif text-white">$872,000,000</h3>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_#D4AF37] animate-scan opacity-60" />
            </div>
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <div className="text-center lg:text-left">
           <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter mb-8 leading-tight">Your Control <br /><span className="text-[#D4AF37]">Interface.</span></h2>
           <Link href="/portal/auth" className="px-10 py-4 md:px-12 md:py-5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#D4AF37] transition-all inline-block">Launch Terminal</Link>
        </div>
      </section>

      <Footer />
      <style jsx global>{`
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .preserve-3d { transform-style: preserve-3d; }
        @keyframes pulse-cursor { 0%, 100% { border-color: transparent; } 50% { border-color: #D4AF37; } }
        .animate-pulse-cursor { animation: pulse-cursor 0.8s step-end infinite; }
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        .animate-scan { animation: scan 4s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
      `}</style>
    </main>
  );
}
