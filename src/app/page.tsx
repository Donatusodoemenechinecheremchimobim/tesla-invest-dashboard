'use client';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowRight, Shield, Search, Lock, Zap, Cpu, Globe, Database, Activity, Code2, LineChart } from 'lucide-react';
import Link from 'next/link';

// --- PAGANI-TIER ANIMATION VARIANTS ---
const engineCurve = [0.16, 1, 0.3, 1] as const; 

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: engineCurve } }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: engineCurve } }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: engineCurve } }
};

const floatAnim = {
  y: [-10, 10, -10],
  transition: { repeat: Infinity, duration: 6, ease: "easeInOut" }
};

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
  const containerRef = useRef(null);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // PRESERVED: Original Typing and Flipping Logic
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
    <main ref={containerRef} className="bg-[#050505] text-white overflow-x-hidden selection:bg-[#D4AF37] selection:text-black w-full relative">
      <Navbar />

      {/* Global Parallax Background Element */}
      <motion.div style={{ y: yBg }} className="fixed inset-0 z-0 pointer-events-none opacity-20">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05)_0%,transparent_50%)]" />
      </motion.div>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative min-h-[100dvh] flex items-center pt-24 md:pt-32 px-4 md:px-6 max-w-[1400px] mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center w-full relative z-10">
          
          {/* Text Content */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center lg:text-left">
            <motion.div variants={slideUp}>
               <span className="inline-block py-1.5 px-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] mb-6 md:mb-8 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  Institutional Wealth Management
               </span>
            </motion.div>
            
            <motion.h1 variants={slideUp} className="text-5xl sm:text-7xl md:text-[8.5rem] font-serif mb-6 md:mb-8 leading-[0.9] md:leading-[0.8] tracking-tighter">
              WEALTH <br /><span className="text-[#D4AF37] italic">REFINED.</span>
            </motion.h1>
            
            <motion.p variants={slideUp} className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-lg mb-8 md:mb-12 font-light mx-auto lg:mx-0">
              Access mathematically secured global equity clusters. Powered by physical reserves and zero-knowledge architecture.
            </motion.p>
            
            <motion.div variants={slideUp}>
               <Link href="/portal/" className="group inline-flex px-10 py-4 md:px-12 md:py-5 bg-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all items-center gap-3 shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                 Access Gateway <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </motion.div>
          </motion.div>

          {/* 3D Flip Card */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
             animate={{ opacity: 1, scale: 1, rotateX: 0 }}
             transition={{ duration: 1.5, ease: engineCurve, delay: 0.2 }}
             className="relative h-[400px] md:h-[600px] flex items-center justify-center perspective-[1500px] w-full"
          >
             <motion.div 
                className="relative w-full max-w-[320px] md:max-w-md aspect-[4/5] preserve-3d" 
                animate={{ rotateY: isTurned ? 180 : 0 }} 
                transition={{ duration: 1.8, ease: engineCurve }}
                style={{ transformStyle: "preserve-3d" }}
             >
                {/* FRONT OF CARD */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col items-center justify-center gap-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-20">
                   <Lock size={32} className="text-[#D4AF37]" />
                   <div className="w-full h-14 md:h-16 bg-black border border-white/10 rounded-full flex items-center px-6 md:px-8 gap-3 md:gap-4 shadow-inner">
                      <Search size={18} className="text-gray-500" />
                      <span className="font-mono text-base md:text-xl text-[#D4AF37] border-r-2 border-[#D4AF37] pr-2 animate-pulse-cursor whitespace-nowrap overflow-hidden">
                        {typedText}
                      </span>
                   </div>
                </div>

                {/* BACK OF CARD */}
                <div className="absolute inset-0 backface-hidden rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-[#0a0a0a]" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
                   <NeuralDashboardSVG />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                   <div className="absolute bottom-8 left-8 right-8 z-20">
                      <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-1">Neural Core Active</p>
                      <h3 className="text-4xl md:text-5xl font-serif text-white tracking-tighter shadow-black drop-shadow-lg">$142M+</h3>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. DOUBLE TICKER --- */}
      <div className="border-y border-white/5 bg-[#030303] py-4 md:py-6 overflow-hidden w-full relative flex flex-col gap-2">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none" />
        {/* Row 1 - Left */}
        <div className="flex gap-12 md:gap-24 text-[10px] md:text-[11px] font-mono text-[#D4AF37] uppercase tracking-[0.3em] animate-marquee whitespace-nowrap opacity-60">
          <span>XAU/USD $2,402.18 ▲</span><span>BTC/USD $64,230.50 ▲</span><span>TSLA $178.20 ▲</span><span>NDX 18,300.10 ▲</span>
          <span>XAU/USD $2,402.18 ▲</span><span>BTC/USD $64,230.50 ▲</span><span>TSLA $178.20 ▲</span><span>NDX 18,300.10 ▲</span>
        </div>
        {/* Row 2 - Right (Reverse) */}
        <div className="flex gap-12 md:gap-24 text-[10px] md:text-[11px] font-mono text-white uppercase tracking-[0.3em] animate-marquee-reverse whitespace-nowrap opacity-30">
          <span>EUR/USD 1.0842 ▼</span><span>ETH/USD $3,105.20 ▲</span><span>AAPL $189.40 ▲</span><span>SPX 5,120.40 ▼</span>
          <span>EUR/USD 1.0842 ▼</span><span>ETH/USD $3,105.20 ▲</span><span>AAPL $189.40 ▲</span><span>SPX 5,120.40 ▼</span>
        </div>
      </div>
      {/* --- 3. BENTO GRID --- */}
      <section className="py-20 md:py-32 px-4 md:px-6 max-w-[1400px] mx-auto overflow-hidden relative z-10">
         <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 h-auto md:h-[700px]">
            {/* Large Image Card */}
            <motion.div variants={slideInLeft} className="md:col-span-2 md:row-span-2 relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group min-h-[300px] border border-white/5 cursor-pointer">
               <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1200" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000 opacity-40 grayscale group-hover:grayscale-0" alt="Hubs" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
               <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 transform group-hover:-translate-y-2 transition-transform duration-500">
                 <h3 className="text-4xl md:text-5xl font-serif mb-4 text-white">Global Hubs</h3>
               </div>
            </motion.div>

            {/* Neural Architecture Card */}
            <motion.div variants={slideUp} className="bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border border-white/5 flex flex-col justify-between hover:border-[#D4AF37]/40 transition-colors min-h-[250px] group cursor-pointer shadow-lg">
               <Cpu className="text-gray-500 group-hover:text-[#D4AF37] transition-colors duration-500 w-8 h-8 md:w-10 md:h-10" />
               <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:text-[#D4AF37] transition-colors duration-500">Neural <br/> Architecture</h3>
            </motion.div>

            {/* Security Card */}
            <motion.div variants={slideInRight} className="bg-[#D4AF37] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between text-black min-h-[250px] group cursor-pointer overflow-hidden relative shadow-[0_0_30px_rgba(212,175,55,0.15)]">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
               <Shield className="w-8 h-8 md:w-10 md:h-10 text-black relative z-10 group-hover:scale-110 transition-transform duration-500" />
               <h3 className="text-2xl md:text-3xl font-serif font-bold text-black relative z-10">Tier 4 <br/> Security</h3>
            </motion.div>

            {/* Private Credit Link */}
            <Link href="/portal/auth" className="md:col-span-2 block group">
               <motion.div variants={slideUp} className="bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border border-white/5 flex items-center justify-between min-h-[150px] h-full hover:border-[#D4AF37]/50 transition-colors shadow-lg">
                  <div className="max-w-xs"><h3 className="text-3xl md:text-4xl font-serif text-white group-hover:text-[#D4AF37] transition-colors duration-300">Private Credit</h3></div>
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 group-hover:scale-110">
                    <ArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
               </motion.div>
            </Link>
         </motion.div>
      </section>

      {/* --- 4. THE ARCHITECTURE (Sticky Scroll) --- */}
      <section className="py-20 md:py-40 px-4 md:px-6 bg-[#080808] border-y border-white/5 relative z-10">
         <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16">
            <div className="lg:sticky lg:top-32 h-[400px] md:h-[600px] bg-[#111] rounded-[3rem] border border-white/5 flex items-center justify-center overflow-hidden relative group">
               <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
               <Database className="w-32 h-32 text-gray-800 group-hover:text-[#D4AF37] transition-colors duration-700 relative z-10" />
               <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute w-[150%] h-[150%] bg-[conic-gradient(transparent_0deg,#D4AF37_90deg,transparent_180deg)] opacity-10" />
               <div className="absolute inset-0 bg-black/80" />
            </div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-16 py-10">
               {[
                  { title: "Algorithmic Routing", desc: "Our engine scans 42 global exchanges simultaneously, seeking micro-arbitrage opportunities with sub-millisecond execution.", icon: <Globe/> },
                  { title: "Cold Vault Sharding", desc: "Assets are mathematically split and distributed across offline, air-gapped servers in Swiss and Singaporean bunkers.", icon: <Lock/> },
                  { title: "Real-Time Ledger", desc: "Every transaction is written to a proprietary zero-knowledge ledger, ensuring absolute privacy while maintaining verifiable reserves.", icon: <Code2/> }
               ].map((item, i) => (
                  <motion.div key={i} variants={slideUp} className="border-l border-white/10 pl-8 relative group">
                     <div className="absolute -left-3 top-0 w-6 h-6 bg-black border border-[#D4AF37] rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                     </div>
                     <div className="text-[#D4AF37] mb-4">{item.icon}</div>
                     <h3 className="text-3xl font-serif mb-4 text-white group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                     <p className="text-gray-400 leading-relaxed text-lg">{item.desc}</p>
                  </motion.div>
               ))}
            </motion.div>
         </div>
      </section>

      {/* --- 5. TRACING GRAPH --- */}
      <section className="py-20 md:py-32 px-4 md:px-6 max-w-[1400px] mx-auto relative z-10">
        <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 overflow-hidden relative shadow-2xl">
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-20 relative z-10 gap-4">
             <motion.h2 variants={slideInLeft} className="text-4xl md:text-6xl font-serif text-white">Equity <span className="text-gray-700 italic">Pulse</span></motion.h2>
             <motion.h2 variants={slideInRight} className="text-4xl md:text-6xl font-mono text-[#D4AF37] tracking-tight">$1.24T+</motion.h2>
           </motion.div>
           <div className="relative w-full h-[200px] md:h-[400px]">
              <svg width="100%" height="100%" viewBox="0 0 1200 400" preserveAspectRatio="none" className="overflow-visible">
                 <motion.path 
                    d="M0,350 C100,340 200,380 300,300 C400,220 500,280 600,180 C700,80 800,220 900,120 C1000,20 1100,60 1200,40" 
                    fill="none" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 2.5, ease: engineCurve }} 
                 />
              </svg>
           </div>
        </div>
      </section>

      {/* --- 6. MARKET ACCESS (Hover Expand) --- */}
      <section className="py-20 px-4 md:px-6 max-w-[1400px] mx-auto relative z-10">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideUp} className="text-center mb-16">
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Asset Classes</span>
            <h2 className="text-4xl md:text-6xl font-serif">Global Markets</h2>
         </motion.div>
         
         <div className="grid md:grid-cols-3 gap-6">
            {[
               { title: "Digital Assets", stat: "40+ Tokens", desc: "Cold-storage secured crypto liquidity.", icon: <Zap/> },
               { title: "Equities & ETFs", stat: "12,000+ Assets", desc: "Fractional and whole share trading.", icon: <LineChart/> },
               { title: "FX & Commodities", stat: "0.0 Spread", desc: "Gold, Silver, and major forex pairs.", icon: <Activity/> }
            ].map((market, i) => (
               <motion.div key={i} variants={slideUp} whileHover={{ y: -10 }} transition={{ duration: 0.4, ease: "easeOut" }} className="bg-[#111] border border-white/5 rounded-[2rem] p-10 group cursor-pointer hover:border-[#D4AF37]/50">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors duration-500 mb-8">
                     {market.icon}
                  </div>
                  <h3 className="text-2xl font-serif mb-2">{market.title}</h3>
                  <p className="font-mono text-xs text-[#D4AF37] mb-4">{market.stat}</p>
                  <p className="text-gray-500 text-sm">{market.desc}</p>
               </motion.div>
            ))}
         </div>
      </section>

      {/* --- 7. SCANNING PHONE (Intersecting Slides + Floating Nodes) --- */}
      <section className="py-20 md:py-40 px-4 md:px-6 max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center overflow-hidden relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideUp} className="relative flex justify-center w-full">
          
          {/* Floating UI Nodes */}
          <motion.div animate={floatAnim} className="absolute -left-4 md:-left-12 top-20 bg-[#111] border border-white/10 p-3 rounded-2xl flex items-center gap-3 shadow-xl z-20">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span className="text-xs font-mono text-white">TSLA +2.4%</span>
          </motion.div>
          <motion.div animate={floatAnim} transition={{ delay: 1, duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-4 md:-right-12 bottom-32 bg-[#111] border border-[#D4AF37]/30 p-3 rounded-2xl flex items-center gap-3 shadow-xl z-20">
             <Lock size={12} className="text-[#D4AF37]" />
             <span className="text-xs font-mono text-[#D4AF37]">Secure Node</span>
          </motion.div>

          {/* Phone */}
          <motion.div animate={{ y: [-15, 15, -15] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="w-[280px] h-[560px] md:w-[340px] md:h-[680px] bg-black border-[8px] md:border-[10px] border-[#1a1a1a] rounded-[3rem] md:rounded-[4rem] relative shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden shrink-0">
            <div className="pt-20 md:pt-28 px-6 md:px-8 space-y-8 md:space-y-12 bg-[#050505] h-full relative">
              <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-widest"><span>Net Worth</span><Shield size={14} className="text-[#D4AF37]" /></div>
              <h3 className="text-3xl md:text-4xl font-serif text-white">$872,000,000</h3>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_#D4AF37] animate-scan opacity-60" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideInRight} className="text-center lg:text-left">
           <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter mb-8 leading-tight">Your Control <br /><span className="text-[#D4AF37]">Interface.</span></h2>
           <Link href="/portal" className="group px-10 py-4 md:px-12 md:py-5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#D4AF37] transition-all inline-block shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
             Get Started
           </Link>
        </motion.div>
      </section>

      {/* --- 8. FINAL CTA --- */}
      <section className="py-32 md:py-48 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideUp} className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-5xl md:text-[6rem] font-serif mb-8 leading-[0.9]">Initialize Your <br/><span className="italic text-[#D4AF37]">Legacy.</span></h2>
            <p className="text-gray-400 mb-12 text-lg max-w-xl mx-auto">Join the private network of individuals engineering the future of capital.</p>
            <Link href="/portal" className="inline-block px-14 py-6 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.3em] rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.3)]">
               Deploy Capital
            </Link>
         </motion.div>
      </section>

      <Footer />
      
      {/* CSS STYLES */}
      <style jsx global>{`
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .preserve-3d { transform-style: preserve-3d; }
        @keyframes pulse-cursor { 0%, 100% { border-color: transparent; } 50% { border-color: #D4AF37; } }
        .animate-pulse-cursor { animation: pulse-cursor 0.8s step-end infinite; }
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        .animate-scan { animation: scan 4s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-marquee-reverse { animation: marquee-reverse 40s linear infinite; }
      `}</style>
    </main>
  );
                       }
