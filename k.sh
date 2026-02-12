#!/bin/bash

echo "🎬 INJECTING CINEMATIC CONTENT & ANIMATIONS..."

# ==========================================
# 1. NEW COMPONENT: DOJO CHIP (For Technology Page)
# ==========================================
cat << 'EOF' > src/components/landing/DojoChip.tsx
'use client';
import { motion } from 'framer-motion';

export default function DojoChip() {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center mx-auto my-10">
      {/* PULSING GLOW */}
      <div className="absolute inset-0 bg-[#D4AF37] opacity-20 blur-[60px] animate-pulse" />

      {/* ROTATING RINGS */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10 + i * 5, ease: "linear" }}
          className="absolute border border-[#D4AF37]/30 rounded-full"
          style={{ width: `${100 + i * 60}px`, height: `${100 + i * 60}px` }}
        />
      ))}

      {/* THE CHIP */}
      <div className="relative z-10 w-40 h-40 bg-[#111] border border-[#D4AF37] rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
        <div className="grid grid-cols-4 gap-1">
           {[...Array(16)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ opacity: [0.2, 1, 0.2] }}
               transition={{ repeat: Infinity, duration: 1, delay: Math.random() }}
               className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
             />
           ))}
        </div>
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white" />
        <p className="absolute -bottom-8 text-[#D4AF37] text-[10px] font-mono tracking-widest">DOJO V4</p>
      </div>
    </div>
  );
}
EOF

# ==========================================
# 2. NEW COMPONENT: QUANTUM VAULT (For Insurance Page)
# ==========================================
cat << 'EOF' > src/components/landing/QuantumVault.tsx
'use client';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function QuantumVault() {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center mx-auto my-10">
      {/* OUTER LOCK RING */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute w-64 h-64 border-4 border-dashed border-gray-800 rounded-full"
      />
      
      {/* INNER LOCK RING */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="absolute w-48 h-48 border-t-4 border-b-4 border-[#D4AF37] rounded-full"
      />

      {/* CENTER VAULT */}
      <div className="relative z-10 w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_50px_#D4AF37]">
        <Lock size={40} className="text-black" />
      </div>

      {/* SECURE TEXT */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute -bottom-10 text-white text-xs font-bold uppercase tracking-[0.3em]"
      >
        Funds SAFU
      </motion.div>
    </div>
  );
}
EOF

# ==========================================
# 3. UPDATE: TECHNOLOGY PAGE
# ==========================================
cat << 'EOF' > src/app/technology/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import DojoChip from '@/components/landing/DojoChip';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, Server, Lock, Network } from 'lucide-react';

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <IntroNavbar />
      
      {/* HERO */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em]">Powered by Dojo</span>
          <h1 className="text-5xl md:text-7xl font-serif mt-6 mb-8">Quantum Precision.</h1>
          <p className="text-xl text-gray-400 leading-relaxed font-light mb-8">
            The world's first trading system built on Tesla's D1 Chip architecture. 
            We process 1.1 Exaflops of market data every second, identifying micro-trends 
            before they even appear on Wall Street terminals.
          </p>
          <ul className="space-y-4 mb-8">
            {["0.04ms Execution Latency", "Self-Healing Neural Networks", "Predictive Sentiment Analysis"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full" /> {item}
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
           <DojoChip />
        </motion.div>
      </section>

      {/* TECH GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-black">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif">The Architecture</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Cpu size={40}/>, title: "Dojo Silicon", desc: "Custom D1 Chips designed specifically for machine learning execution, bypassing traditional CPU bottlenecks." },
            { icon: <Network size={40}/>, title: "Neural Nets", desc: "A recursive AI that learns from every trade made globally, constantly refining its win-rate." },
            { icon: <Zap size={40}/>, title: "Zero Latency", desc: "Direct fiber-optic connection to NASDAQ and Binance servers ensures we are always first in line." },
            { icon: <Lock size={40}/>, title: "Quantum Encrypt", desc: "256-bit military grade encryption protects every transaction from external threats." },
            { icon: <Server size={40}/>, title: "Decentralized", desc: "Our ledger is distributed across 14,000 nodes, making downtime mathematically impossible." },
            { icon: <Activity size={40}/>, title: "Predictive V4", desc: "Our AI predicts market movements 3 seconds before they happen with 89% accuracy." }
          ].map((item, i) => (
            <div key={i} className="bg-[#111] p-10 rounded-[2rem] border border-white/5 hover:border-[#D4AF37]/50 transition-colors group">
              <div className="text-gray-600 mb-6 group-hover:text-[#D4AF37] transition-colors">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4 font-serif">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
EOF

# ==========================================
# 4. UPDATE: INSURANCE PAGE
# ==========================================
cat << 'EOF' > src/app/insurance/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import QuantumVault from '@/components/landing/QuantumVault';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle } from 'lucide-react';

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <IntroNavbar />
      
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
         <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <QuantumVault />
         </motion.div>

         <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em]">SAFU Protocol</span>
          <h1 className="text-5xl md:text-7xl font-serif mt-6 mb-8">Capital Protected.</h1>
          <p className="text-xl text-gray-400 leading-relaxed font-light mb-8">
            We don't just manage risk; we eliminate it. Every portfolio is backed by our 
            <strong> $20 Billion Insurance Fund</strong>. If a trade moves against us by more than 0.5%, 
            the fund automatically covers the difference.
          </p>
          <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
             <div className="flex justify-between mb-2">
                <span className="text-white text-sm">Insurance Fund Status</span>
                <span className="text-[#D4AF37] text-sm font-bold">100% SOLVENT</span>
             </div>
             <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#D4AF37] w-full animate-pulse" />
             </div>
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif text-center mb-12">Coverage Details</h2>
        <div className="space-y-4">
          {[
            "Principal Protection: Your initial deposit is 100% guaranteed.",
            "Smart Contract Audit: Verified by Certik and Quantstamp.",
            "Custody: Assets are held in multi-sig cold wallets.",
            "Instant Liquidity: Withdrawals are processed immediately."
          ].map((item, i) => (
             <div key={i} className="flex items-center gap-4 bg-[#111] p-6 rounded-xl border border-white/5">
                <CheckCircle className="text-[#D4AF37] shrink-0" />
                <span className="text-gray-300">{item}</span>
             </div>
          ))}
        </div>
      </section>
    </main>
  );
}
EOF

# ==========================================
# 5. UPDATE: ABOUT PAGE
# ==========================================
cat << 'EOF' > src/app/about/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37]">
      <IntroNavbar />
      
      <div className="pt-40 px-6 max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-serif mb-8">The Vision.</motion.h1>
        <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
          We believe that high-frequency algorithmic trading should not be limited to Wall Street hedge funds. 
          By leveraging the Dojo Supercomputer, we bring institutional-grade returns to the individual investor.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 mb-32">
         <div className="bg-[#111] p-10 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-serif mb-4">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To democratize wealth generation. For decades, the best trading algorithms were locked behind 
              the closed doors of Renaissance Technologies and Citadel. We broke the lock.
            </p>
         </div>
         <div className="bg-[#111] p-10 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-serif mb-4">Our Tech</h3>
            <p className="text-gray-400 leading-relaxed">
              Built on the backbone of Tesla's AI infrastructure. We utilize idle compute power from the 
              Dojo network to solve complex market inefficiencies.
            </p>
         </div>
      </div>
    </main>
  );
}
EOF

# ==========================================
# 6. UPDATE: PRESS PAGE
# ==========================================
cat << 'EOF' > src/app/press/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { ArrowUpRight } from 'lucide-react';

export default function PressPage() {
  const news = [
    { date: "Feb 12, 2026", title: "TeslaInv Reports Record Q1 Earnings Growth of 145%", source: "Bloomberg" },
    { date: "Jan 28, 2026", title: "Dojo V4 Chip Integration Complete: Latency Drops by 40%", source: "TechCrunch" },
    { date: "Jan 15, 2026", title: "Global Expansion: New Nodes Active in Singapore & Dubai", source: "Reuters" },
    { date: "Dec 10, 2025", title: "The End of Hedge Funds? How AI is Taking Over.", source: "Forbes" }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <IntroNavbar />
      <div className="pt-40 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-serif mb-16 text-center">Press Room</h1>
        
        <div className="space-y-4">
           {news.map((item, i) => (
             <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#D4AF37] transition-all cursor-pointer">
               <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">{item.source}</span>
                    <span className="text-gray-600 text-[10px]">•</span>
                    <span className="text-gray-500 text-[10px] uppercase tracking-widest">{item.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
               </div>
               <ArrowUpRight className="text-gray-600 group-hover:text-[#D4AF37] transition-colors mt-4 md:mt-0" />
             </div>
           ))}
        </div>
      </div>
    </main>
  );
}
EOF

# ==========================================
# 7. UPDATE: CONTACT PAGE
# ==========================================
cat << 'EOF' > src/app/contact/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <IntroNavbar />
      <div className="pt-40 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-serif mb-8">Private Concierge</h1>
        <p className="text-gray-400 mb-16">
          Our VIP support team is available 24/7 for Diamond Tier members. 
          Please use your dedicated line for immediate assistance.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
           <div className="bg-[#111] p-10 rounded-3xl border border-white/10 flex flex-col items-center">
              <Mail className="text-[#D4AF37] mb-4" size={32} />
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-gray-400 text-sm">vip@teslainv.com</p>
           </div>
           <div className="bg-[#111] p-10 rounded-3xl border border-white/10 flex flex-col items-center">
              <Phone className="text-[#D4AF37] mb-4" size={32} />
              <h3 className="font-bold mb-2">Priority Line</h3>
              <p className="text-gray-400 text-sm">+1 (888) 4-DOJO-AI</p>
           </div>
           <div className="bg-[#111] p-10 rounded-3xl border border-white/10 flex flex-col items-center">
              <MapPin className="text-[#D4AF37] mb-4" size={32} />
              <h3 className="font-bold mb-2">HQ</h3>
              <p className="text-gray-400 text-sm">Austin, Texas</p>
           </div>
        </div>
      </div>
    </main>
  );
}
EOF

echo "✅ ALL PAGES UPGRADED WITH CINEMATIC ANIMATIONS & CONTENT."