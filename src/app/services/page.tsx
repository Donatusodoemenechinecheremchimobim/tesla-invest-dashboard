'use client';
import React, { useRef } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { 
  Bitcoin, Building2, TrendingUp, Globe, Briefcase, Gem, 
  ArrowRight, CheckCircle2, Zap, Lock, BarChart3 
} from 'lucide-react';
import Link from 'next/link';

// --- ANIMATION VARIANTS ---
const smoothReveal: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } // "Car Reveal" Easing
  }
};

const staggerGrid: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const cardHover: Variants = {
  rest: { scale: 1, borderColor: "rgba(255,255,255,0.05)" },
  hover: { 
    scale: 1.02, 
    borderColor: "rgba(212,175,55,0.5)",
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function ServicesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  const services = [
    { 
      name: "Digital Assets", 
      desc: "Institutional-grade custody and trading for Bitcoin, Ethereum, and major alts. 100% Cold Storage in Swiss bunkers.", 
      icon: <Bitcoin strokeWidth={1} size={40} />,
      tag: "CUSTODY"
    },
    { 
      name: "Real Estate", 
      desc: "Access to fractionalized ownership in commercial properties across Dubai, London, and NYC with instant liquidity.", 
      icon: <Building2 strokeWidth={1} size={40} />,
      tag: "TOKENIZED"
    },
    { 
      name: "Global Equities", 
      desc: "Direct market access to NYSE, NASDAQ, and LSE with sub-millisecond execution and algorithmic routing.", 
      icon: <TrendingUp strokeWidth={1} size={40} />,
      tag: "DMA"
    },
    { 
      name: "Offshore Banking", 
      desc: "Multi-currency accounts in tax-neutral jurisdictions for total financial privacy and borderless movement.", 
      icon: <Globe strokeWidth={1} size={40} />,
      tag: "PRIVATE"
    },
    { 
      name: "Private Credit", 
      desc: "High-yield fixed income opportunities not available on public markets, secured by real-world assets.", 
      icon: <Briefcase strokeWidth={1} size={40} />,
      tag: "YIELD"
    },
    { 
      name: "Art & Collectibles", 
      desc: "Tokenized investment in blue-chip art and vintage luxury assets, audited by top-tier firms.", 
      icon: <Gem strokeWidth={1} size={40} />,
      tag: "ALT-ASSETS"
    }
  ];

  return (
    <main ref={containerRef} className="bg-[#050505] text-white w-full overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[110vh] flex items-center justify-center text-center px-6 overflow-hidden">
        {/* Cinematic Background */}
        <motion.div 
          style={{ y: yHero, scale: scaleHero }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
        </motion.div>
        
        {/* Content */}
        <motion.div 
          variants={smoothReveal}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center mt-[-10vh]"
        >
          <div className="flex items-center gap-4 mb-8">
             <span className="h-[1px] w-20 bg-white/20" />
             <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.5em]">Ecosystem</span>
             <span className="h-[1px] w-20 bg-white/20" />
          </div>

          <h1 className="text-7xl sm:text-8xl md:text-[10rem] font-serif mb-6 leading-[0.85] tracking-tight mix-blend-overlay opacity-50 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-sm pointer-events-none w-full">
            FULL STACK
          </h1>

          <h1 className="text-6xl sm:text-7xl md:text-9xl font-serif mb-10 leading-[0.9] tracking-tight relative z-20">
            Full Stack <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] via-[#FCEE21] to-[#D4AF37]">Finance.</span>
          </h1>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-2xl font-light leading-relaxed mb-12">
            We have dismantled the barriers between traditional banking and decentralized finance. One platform. Zero friction.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
             <Link href="/portal" className="px-12 py-5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] transition-colors duration-300">
               Access Platform
             </Link>
             <button className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300">
               View Documentation
             </button>
          </div>
        </motion.div>

        {/* Scroll Mouse Animation */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
          <span className="text-[9px] uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* --- INFINITE TICKER (Tech Specs) --- */}
      <div className="w-full bg-[#111] border-y border-white/5 py-4 overflow-hidden relative z-20">
         <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none" />
         <motion.div 
           animate={{ x: ["0%", "-50%"] }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className="flex whitespace-nowrap gap-20 text-gray-500 font-mono text-xs uppercase tracking-widest"
         >
            {[...Array(6)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="flex items-center gap-2"><Zap size={12} className="text-[#D4AF37]"/> Sub-ms Latency</span>
                <span className="flex items-center gap-2"><Lock size={12} className="text-[#D4AF37]"/> SOC2 Type II</span>
                <span className="flex items-center gap-2"><BarChart3 size={12} className="text-[#D4AF37]"/> Deep Liquidity</span>
                <span className="flex items-center gap-2"><Globe size={12} className="text-[#D4AF37]"/> 24/7 Settlement</span>
              </React.Fragment>
            ))}
         </motion.div>
      </div>

      {/* --- PHILOSOPHY SECTION (Sticky Scroll) --- */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto">
         <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
               <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-none">
                  The <span className="italic text-[#D4AF37]">Architecture</span> <br/> of Wealth.
               </h2>
               <p className="text-xl text-gray-400 leading-relaxed mb-8">
                  Legacy institutions operate in silos. VerdeStock operates in layers. We have unified the fragmented world of finance into a single, vertical stack.
               </p>
               <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                     <span className="text-[#D4AF37] font-mono text-lg">01</span>
                     <p className="text-sm text-gray-500 leading-relaxed">Cross-chain interoperability meets SWIFT payment rails.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                     <span className="text-[#D4AF37] font-mono text-lg">02</span>
                     <p className="text-sm text-gray-500 leading-relaxed">Real-world asset tokenization engine with legal compliance baked into the code.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                     <span className="text-[#D4AF37] font-mono text-lg">03</span>
                     <p className="text-sm text-gray-500 leading-relaxed">Algorithmic tax-loss harvesting across multiple jurisdictions.</p>
                  </div>
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative h-[600px] w-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#111] to-black border border-white/5"
            >
               {/* Abstract 3D shape or data visualization representation */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity hover:opacity-60 transition-opacity duration-700" />
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </motion.div>
         </div>
      </section>

      {/* --- BENTO GRID SERVICES --- */}
      <section className="py-20 px-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center mb-20">
           <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4">Capabilities</span>
           <h2 className="text-5xl md:text-7xl font-serif text-center">Market Access</h2>
        </div>

        <motion.div 
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s, i) => (
            <motion.div 
              key={i} 
              variants={smoothReveal}
              whileHover="hover"
              initial="rest"
              animate="rest"
              custom={i}
              className="group relative bg-[#0a0a0a] p-10 h-[400px] flex flex-col justify-between rounded-[2px] border border-white/5 overflow-hidden"
            >
               {/* Hover Border Effect */}
               <motion.div variants={cardHover} className="absolute inset-0 border border-transparent rounded-[2px] pointer-events-none" />
               
               {/* Background Gradient on Hover */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

               <div>
                 <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-white/5 rounded-full text-gray-400 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                      {s.icon}
                    </div>
                    <span className="text-[9px] font-mono uppercase border border-white/10 px-2 py-1 rounded text-gray-500 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-colors">
                      {s.tag}
                    </span>
                 </div>
                 <h3 className="text-3xl font-serif mb-4 text-white group-hover:text-[#D4AF37] transition-colors duration-300">{s.name}</h3>
                 <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{s.desc}</p>
               </div>

               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors">
                  <span>Explore</span>
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
               </div>
            </motion.div>
          ))}
          
          {/* SPECIAL CTA CARD */}
          <motion.div 
            variants={smoothReveal}
            className="md:col-span-2 lg:col-span-3 bg-[#D4AF37] h-[300px] md:h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
             
             <h3 className="relative z-10 text-4xl md:text-6xl font-serif text-black mb-8">Ready to deploy capital?</h3>
             <Link 
               href="/portal" 
               className="relative z-10 px-12 py-5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300"
             >
               Initialize Account
             </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- DEEP DIVE SECTION (Tech Visuals) --- */}
      <section className="py-32 px-6 bg-[#080808] border-t border-white/5">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
               <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-6">Security Layer</h3>
               <h2 className="text-4xl font-serif mb-6">Fort Knox <br/> in the Cloud.</h2>
               <p className="text-gray-500 leading-relaxed mb-8">
                  Security is not an add-on; it is the foundation. We employ Multi-Party Computation (MPC) wallets, geographic key sharding, and real-time biometric authorization for all high-value transactions.
               </p>
               <ul className="space-y-4">
                  {["ISO 27001 Certified", "GDPR & CCPA Compliant", "Real-Time Proof of Reserves"].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <CheckCircle2 size={16} className="text-[#D4AF37]" /> {item}
                     </li>
                  ))}
               </ul>
            </div>
            <div className="md:w-2/3 h-[500px] bg-[#111] rounded-[2rem] border border-white/5 relative overflow-hidden group">
               {/* Tech Dashboard Visual */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent" />
               <div className="absolute bottom-10 right-10 text-right">
                  <p className="text-6xl font-mono text-white">99.99%</p>
                  <p className="text-gray-400 text-xs uppercase tracking-widest">Uptime SLA</p>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
          }
