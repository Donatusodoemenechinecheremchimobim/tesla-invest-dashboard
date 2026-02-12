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
