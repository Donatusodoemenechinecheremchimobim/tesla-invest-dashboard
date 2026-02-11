#!/bin/bash

echo "🏗️ STARTING FULL SITE RE-BUILD..."

# ==========================================
# 1. SETUP FOLDERS
# ==========================================
mkdir -p src/app/portal
mkdir -p src/components/intro
mkdir -p src/components/landing

# ==========================================
# 2. BUILD THE "OLD SITE" AT /portal
# ==========================================
echo "🔒 Restoring Old Site at /portal..."

cat << 'EOF' > src/app/portal/page.tsx
'use client';

import Navbar from '@/components/landing/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, TrendingUp, Zap, Globe, CheckCircle } from 'lucide-react';
import TradeTicker from '@/components/dashboard/TradeTicker';
import GrowthChart from '@/components/dashboard/GrowthChart';

export default function OldSitePortal() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden gpu-accelerated selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)] z-0" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl w-full">
           <motion.div 
             initial={{ opacity: 0, y: 30 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ duration: 0.8, ease: "easeOut" }}
           >
              <span className="inline-block py-1 px-3 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
                Official Tesla Investment Partner
              </span>
              <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight tracking-tight">
                The Future of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Wealth Generation.</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                Join the world's first algorithmic trading ecosystem powered by Tesla's Dojo Supercomputer.
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full mb-16">
                <Link href="/auth" className="w-full md:w-auto px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  Access Client Portal
                </Link>
                <button className="w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-all">
                  View Performance
                </button>
              </div>
           </motion.div>

           {/* CHART */}
           <div className="relative w-full max-w-4xl mx-auto h-[300px] md:h-[400px] bg-[#0a0a0a] border border-white/10 rounded-3xl p-4 md:p-8 shadow-2xl overflow-hidden mb-20">
              <div className="absolute top-4 left-6 z-10">
                 <h3 className="text-left text-xs font-bold uppercase tracking-widest text-gray-400">Live Performance</h3>
                 <p className="text-left text-2xl font-serif text-[#D4AF37]">+127.4% <span className="text-xs text-gray-500 font-sans tracking-normal">(YTD)</span></p>
              </div>
              <div className="w-full h-full opacity-80" style={{ transform: 'translateZ(0)' }}>
                 <GrowthChart />
              </div>
           </div>
        </div>

        {/* TICKER */}
        <div className="absolute bottom-0 left-0 w-full z-20 border-t border-white/10 bg-black/80 backdrop-blur-md">
           <TradeTicker />
        </div>
      </section>

      {/* PLANS (Swipeable) */}
      <section className="py-24 max-w-7xl mx-auto">
        <div className="text-center mb-12 px-6">
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">Choose Your Tier</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">Investment Portfolios</h2>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory px-6 pb-12 w-full no-scrollbar">
          {[
            { name: "Silver", price: "$500", roi: "15% Monthly", features: ["Basic AI Trading", "Weekly Withdrawals", "Email Support"] },
            { name: "Gold", price: "$5,000", roi: "25% Monthly", features: ["Advanced Dojo AI", "Instant Withdrawals", "24/7 Priority Support", "Capital Insured"], popular: true },
            { name: "Diamond", price: "$20,000", roi: "40% Monthly", features: ["Quantum Execution", "Zero Fees", "Dedicated Account Manager", "Full Insurance Coverage"] }
          ].map((plan, i) => (
            <div key={i} className={`
                relative flex-shrink-0 w-[85vw] md:w-auto snap-center 
                bg-[#0a0a0a] border p-8 rounded-[2rem] flex flex-col 
                ${plan.popular ? 'border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'border-white/10'}
            `}>
              {plan.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-b-lg">Most Popular</div>}
              <h3 className="text-xl font-serif text-gray-400 mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-white mb-1">{plan.price}<span className="text-sm text-gray-600 font-normal">+</span></div>
              <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-8">Est. ROI: {plan.roi}</p>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCircle size={14} className={plan.popular ? "text-[#D4AF37]" : "text-gray-600"} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth" className={`w-full py-4 font-bold uppercase tracking-widest text-[10px] rounded-xl text-center transition-all ${plan.popular ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-white/5 text-white hover:bg-white hover:text-black'}`}>
                Start {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-black border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck size={32}/>, title: "Insured Principal", desc: "Your capital is backed by Tesla's $20B Insurance Fund." },
            { icon: <Zap size={32}/>, title: "Quantum Speed", desc: "Trades executed in 0.04ms using Dojo Compute clusters." },
            { icon: <Globe size={32}/>, title: "Global Access", desc: "Trade TSLA, CRYPTO, and FX from anywhere in the world." }
          ].map((item, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl">
              <div className="text-[#D4AF37] mb-4">{item.icon}</div>
              <h3 className="text-xl font-serif mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 border-y border-white/5 bg-[#050505] text-center">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
            <div><h3 className="text-3xl font-serif text-white">14.5K</h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Clients</p></div>
            <div><h3 className="text-3xl font-serif text-white">$850M</h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Managed</p></div>
            <div><h3 className="text-3xl font-serif text-white">0.0%</h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Hacks</p></div>
            <div><h3 className="text-3xl font-serif text-white">24/7</h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Support</p></div>
         </div>
      </section>
    </main>
  );
}
EOF

# ==========================================
# 3. BUILD THE "NEW SITE" COMPONENTS
# ==========================================
echo "✨ Building Luxury Components..."

# SPLASH SCREEN
cat << 'EOF' > src/components/intro/SplashScreen.tsx
'use client';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [exit, setExit] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => { setExit(true); setTimeout(onComplete, 1000); }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={exit ? { opacity: 0, scale: 1.1, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center flex-col"
    >
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#D4AF37] opacity-20 blur-[50px] rounded-full animate-pulse" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} className="relative z-10 flex flex-col items-center gap-4 mb-8">
          <div className="bg-[#D4AF37] p-4 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.6)]">
             <Zap size={48} className="text-black fill-black" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tighter text-center">
            INVESTMENT<span className="text-[#D4AF37]">TESLA</span>
          </h1>
        </motion.div>
      </div>
      <div className="w-64 h-1 bg-[#222] rounded-full overflow-hidden relative">
        <motion.div className="absolute top-0 left-0 h-full bg-[#D4AF37] shadow-[0_0_20px_#D4AF37]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.5, ease: "easeInOut" }} />
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-[#666] text-[10px] font-bold uppercase tracking-[0.5em] mt-4">Initializing Quantum Uplink...</motion.p>
    </motion.div>
  );
}
EOF

# LIVE PAYOUTS BUBBLE
cat << 'EOF' > src/components/landing/LivePayouts.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const winners = [
  { name: "Sarah J.", country: "🇬🇧 UK", amount: "$4,250" }, { name: "Ahmed K.", country: "🇦🇪 UAE", amount: "$12,400" },
  { name: "Chen L.", country: "🇨🇳 CN", amount: "$8,100" }, { name: "Michael B.", country: "🇺🇸 USA", amount: "$2,500" },
  { name: "Elena R.", country: "🇷🇺 RU", amount: "$15,200" }, { name: "David S.", country: "🇦🇺 AU", amount: "$3,800" },
  { name: "Kwame O.", country: "🇳🇬 NG", amount: "$6,750" }, { name: "Yuki T.", country: "🇯🇵 JP", amount: "$9,300" },
  { name: "Hans M.", country: "🇩🇪 DE", amount: "$5,100" }, { name: "Maria G.", country: "🇧🇷 BR", amount: "$1,900" },
  { name: "Lars N.", country: "🇳🇴 NO", amount: "$18,500" }, { name: "Sophie D.", country: "🇫🇷 FR", amount: "$7,200" },
  { name: "Omar F.", country: "🇸🇦 SA", amount: "$11,000" }, { name: "James P.", country: "🇨🇦 CA", amount: "$4,900" },
  { name: "Priya M.", country: "🇮🇳 IN", amount: "$3,200" }, { name: "Alessandro V.", country: "🇮🇹 IT", amount: "$6,400" },
  { name: "Isabella C.", country: "🇪🇸 ES", amount: "$5,800" }, { name: "Lucas W.", country: "🇳🇱 NL", amount: "$8,900" },
  { name: "Dimitri K.", country: "🇬🇷 GR", amount: "$2,100" }, { name: "Hassan A.", country: "🇶🇦 QA", amount: "$22,000" },
  { name: "Olivia B.", country: "🇳🇿 NZ", amount: "$3,500" }, { name: "Kim H.", country: "🇰🇷 KR", amount: "$7,600" },
  { name: "Fatima Z.", country: "🇲🇦 MA", amount: "$4,100" }, { name: "Johan B.", country: "🇿🇦 ZA", amount: "$5,300" },
  { name: "Mateo R.", country: "🇦🇷 AR", amount: "$2,800" }, { name: "Anders L.", country: "🇸🇪 SE", amount: "$9,100" },
  { name: "Viktor P.", country: "🇺🇦 UA", amount: "$3,900" }, { name: "Gabriela S.", country: "🇲🇽 MX", amount: "$1,500" },
  { name: "Mehmet Y.", country: "🇹🇷 TR", amount: "$6,200" }, { name: "Liam O.", country: "🇮🇪 IE", amount: "$5,500" },
  { name: "Zara N.", country: "🇵🇰 PK", amount: "$2,300" }, { name: "Ivan D.", country: "🇧🇬 BG", amount: "$4,700" },
  { name: "Wei Z.", country: "🇸🇬 SG", amount: "$14,800" }, { name: "Emma F.", country: "🇨🇭 CH", amount: "$25,000" },
  { name: "Tariq M.", country: "🇪🇬 EG", amount: "$3,100" }
];

export default function LivePayouts() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const showTimer = setInterval(() => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => { setIndex((prev) => (prev + 1) % winners.length); }, 500);
      }, 4000); 
    }, 8000); 
    return () => clearInterval(showTimer);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[100] pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-4 bg-[#111]/90 backdrop-blur-md border border-[#D4AF37]/30 p-4 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] pr-8"
          >
            <div className="bg-[#D4AF37]/10 p-2 rounded-full border border-[#D4AF37]/20 text-[#D4AF37]">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-white text-xs font-bold">{winners[index].name} <span className="opacity-50 font-normal">{winners[index].country}</span></p>
              <p className="text-[#D4AF37] text-sm font-bold tracking-wide">Just withdrew {winners[index].amount}</p>
              <p className="text-gray-500 text-[9px] uppercase tracking-widest mt-0.5">Verified Transaction • Just Now</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
EOF

# LUXURY NAVBAR
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
        <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          <Link href="/why-tesla" className="hover:text-white transition-colors">Why Invest</Link>
          <Link href="/insurance" className="hover:text-white transition-colors">Insurance</Link>
        </div>
        <Link href="/portal" className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all group shadow-lg">
          Enter Platform <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </nav>
  );
}
EOF

# ==========================================
# 4. BUILD THE "NEW SITE" AT / (HOMEPAGE)
# ==========================================
echo "✨ Assembling the Luxury Homepage..."

cat << 'EOF' > src/app/page.tsx
'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import SplashScreen from '@/components/intro/SplashScreen';
import LivePayouts from '@/components/landing/LivePayouts';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';

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
              The Future of Wealth
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
              {/* MAIN LINK TO PORTAL */}
              <Link href="/portal" className="w-full md:w-auto px-10 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                Enter Platform
              </Link>
              <Link href="/insurance" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                View Insurance Policy <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INFO */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/insurance" className="group relative bg-[#111] border border-white/10 p-12 rounded-[3rem] overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 cursor-pointer">
             <ShieldCheck size={48} className="text-[#D4AF37] mb-8" />
             <h2 className="text-4xl font-serif mb-4">Insured by Tesla</h2>
             <p className="text-gray-400 mb-8 leading-relaxed max-w-md">Your capital is protected by our proprietary insurance algorithm.</p>
             <span className="text-white text-xs font-bold uppercase tracking-widest border-b border-[#D4AF37] pb-1">Read Policy</span>
          </Link>
          <Link href="/why-tesla" className="group relative bg-[#111] border border-white/10 p-12 rounded-[3rem] overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 cursor-pointer">
             <TrendingUp size={48} className="text-[#D4AF37] mb-8" />
             <h2 className="text-4xl font-serif mb-4">Why Invest?</h2>
             <p className="text-gray-400 mb-8 leading-relaxed max-w-md">Outperform the S&P 500 by leveraging Tesla's market volatility.</p>
             <span className="text-white text-xs font-bold uppercase tracking-widest border-b border-[#D4AF37] pb-1">Learn More</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
EOF

echo "✅ COMPLETE: New Site at '/' | Old Site at '/portal'"