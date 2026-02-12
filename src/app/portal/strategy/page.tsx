'use client';

import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity } from 'lucide-react';

export default function OldStrategyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <div className="pt-32 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif mb-8 text-[#D4AF37]">Our Trading Strategy</h1>
        <p className="text-gray-400 text-lg max-w-3xl mb-16 leading-relaxed">
          We utilize a proprietary blend of high-frequency trading algorithms powered by Tesla's Dojo supercomputer.
          Unlike traditional funds, we do not rely on human intuition. We rely on raw data processing power.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
           {[
             { title: "Dojo Compute", desc: "1.1 Exaflops of processing power analyzes market trends in real-time.", icon: <Cpu className="text-[#D4AF37]" size={40}/> },
             { title: "Sentiment Analysis", desc: "Our AI scrapes Twitter/X and news outlets to predict market movements.", icon: <Activity className="text-[#D4AF37]" size={40}/> },
             { title: "Flash Execution", desc: "Trades are executed in 0.04ms, beating retail investors to the punch.", icon: <Zap className="text-[#D4AF37]" size={40}/> }
           ].map((item, i) => (
             <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="bg-[#111] p-8 rounded-2xl border border-white/10">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </main>
  );
}
