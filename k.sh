#!/bin/bash

echo "🚀 INJECTING HIGH-END CONTENT & ANIMATIONS..."

# ==========================================
# 1. UPDATE NAVBAR (ADD NEW LINKS)
# ==========================================
cat << 'EOF' > src/components/intro/IntroNavbar.tsx
'use client';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export default function IntroNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-[#D4AF37] p-1.5 rounded-lg group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <Zap size={20} className="text-black fill-black" />
          </div>
          <span className="text-white font-serif font-bold text-xl tracking-wide">TESLA<span className="text-[#D4AF37]">INV</span></span>
        </Link>
        
        {/* NEW LINKS ADDED HERE */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          <Link href="/technology" className="hover:text-white transition-colors">Technology</Link>
          <Link href="/insurance" className="hover:text-white transition-colors">Insurance</Link>
          <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>

        <Link href="/portal" className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all group shadow-lg">
          Client Portal <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </nav>
  );
}
EOF

# ==========================================
# 2. CREATE /technology PAGE (High-Tech Fluff)
# ==========================================
mkdir -p src/app/technology
cat << 'EOF' > src/app/technology/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, Server, Lock, Network } from 'lucide-react';

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <IntroNavbar />
      
      {/* HERO */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em]">Powered by Dojo</span>
          <h1 className="text-5xl md:text-8xl font-serif mt-6 mb-8">Quantum Precision.</h1>
          <p className="text-xl text-gray-400 leading-relaxed font-light max-w-3xl mx-auto">
            Our trading algorithms run on Tesla's custom Dojo Supercomputer clusters. 
            Processing 1.1 Exaflops of market data per second.
          </p>
        </motion.div>
      </section>

      {/* TECH GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Cpu size={40}/>, title: "Dojo Silicon", desc: "Custom D1 Chips designed specifically for machine learning execution." },
            { icon: <Network size={40}/>, title: "Neural Nets", desc: "Self-improving AI that learns from every trade made globally." },
            { icon: <Zap size={40}/>, title: "Zero Latency", desc: "Fiber-optic direct lines to NASDAQ for 0.04ms execution speeds." },
            { icon: <Lock size={40}/>, title: "Quantum Encrypt", desc: "256-bit military grade encryption protects every transaction." },
            { icon: <Server size={40}/>, title: "Decentralized", desc: "Distributed ledger technology ensures 100% uptime." },
            { icon: <Activity size={40}/>, title: "Predictive V4", desc: "Our AI predicts market movements 3 seconds before they happen." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#111] p-10 rounded-[2rem] border border-white/5 hover:border-[#D4AF37]/50 transition-colors group"
            >
              <div className="text-gray-600 mb-6 group-hover:text-[#D4AF37] transition-colors">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4 font-serif">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="text-center pb-32">
        <Link href="/portal" className="px-10 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          Experience the Speed
        </Link>
      </div>
    </main>
  );
}
EOF

# ==========================================
# 3. CREATE /faq PAGE (Sexy Accordions)
# ==========================================
mkdir -p src/app/faq
cat << 'EOF' > src/app/faq/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: "How is my capital insured?", a: "We utilize Tesla's $20B internal insurance fund. If a trading algorithm fails or incurs a loss greater than 0.5%, the fund instantly reimburses the difference to your account." },
  { q: "What is the minimum deposit?", a: "The Silver Tier starts at $500. This low entry barrier allows us to gather more data for our AI models." },
  { q: "Can I withdraw anytime?", a: "Yes. Our smart contracts allow for instant liquidity. Gold and Diamond members enjoy priority processing (under 10 minutes)." },
  { q: "Is this tax-free?", a: "We operate out of special economic zones. However, you are responsible for reporting earnings in your local jurisdiction. We provide anonymous crypto payouts to protect privacy." },
  { q: "How accurate is the AI?", a: "The Dojo V4 model currently holds a 98.4% win rate on intraday swing trades." }
];

export default function FAQPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <IntroNavbar />
      
      <div className="pt-40 pb-20 px-6 max-w-3xl mx-auto">
        <h1 className="text-5xl font-serif text-center mb-16">Intelligence Center</h1>
        
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-serif">{item.q}</span>
                {active === i ? <Minus size={20} className="text-[#D4AF37]" /> : <Plus size={20} className="text-gray-500" />}
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
EOF

# ==========================================
# 4. UPGRADE HOMEPAGE (More Sections & Counters)
# ==========================================
# I'm appending a new section to the existing homepage structure without deleting the old logic.
# Actually, to be safe and clean, I will rewrite the homepage with the NEW sections added.

cat << 'EOF' > src/app/page.tsx
'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import SplashScreen from '@/components/intro/SplashScreen';
import LivePayouts from '@/components/landing/LivePayouts';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ShieldCheck, TrendingUp, ArrowRight, Activity, Globe, Zap, Server } from 'lucide-react';
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37] opacity-[0.04] blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5, duration: 1 }}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-bold uppercase tracking-[0.4em] mb-8 animate-pulse">
              System Online • Dojo V4 Active
            </span>
            <h1 className="text-6xl md:text-9xl font-serif mb-8 leading-tight tracking-tight text-white">
              Invest in <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">The Impossible.</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Join the elite ecosystem powered by Tesla's algorithmic dominance. 
              We don't predict the future; we build it.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link href="/portal" className="w-full md:w-auto px-10 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                Enter Platform
              </Link>
              <Link href="/technology" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                View Technology <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
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

      {/* NEW: GLOBAL MAP SECTION */}
      <section className="py-32 px-6 max-w-7xl mx-auto text-center">
         <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em]">Global Infrastructure</span>
         <h2 className="text-5xl font-serif mt-6 mb-16">Operating in 140+ Countries</h2>
         
         {/* Abstract Map Graphic (CSS Based) */}
         <div className="relative w-full h-[300px] md:h-[500px] bg-[#111] rounded-[3rem] border border-white/5 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center opacity-10 grayscale invert" />
            
            {/* Pulsing Dots */}
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
EOF

echo "✅ EXPANSION COMPLETE. NEW PAGES, ANIMATIONS, AND CONTENT ADDED."