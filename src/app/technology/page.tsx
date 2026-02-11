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
