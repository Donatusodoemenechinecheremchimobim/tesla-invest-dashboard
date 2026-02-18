'use client';
import Navbar from '@/components/landing/Navbar'; // Fixed Import
import Footer from '@/components/landing/Footer'; // Added Footer
import TechRoots from '@/components/animations/TechRoots';
import { motion } from 'framer-motion';
import { Cpu, Server, Zap, Globe, Lock, BarChart3 } from 'lucide-react';

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block py-2 px-4 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-6 border border-[#D4AF37]/30">
            Proprietary Architecture
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-white tracking-tight">
            Growth <span className="text-[#D4AF37] italic">Technology.</span>
          </h1>
          
          {/* ANIMATION HERE */}
          <div className="mb-12">
             <TechRoots />
          </div>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            <span className="text-white font-bold">VerdeStock</span> runs on a custom-built AI engine that processes 400TB of market data daily. 
            Deep roots in data ensure stability in any market storm.
          </p>
        </motion.div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Cpu, title: "Neural Core V4", desc: "Our central AI model predicts volatility 0.4ms faster than standard HFT systems." },
            { icon: Globe, title: "Global Nodes", desc: "Distributed servers in London, Tokyo, and NYC ensure 100% uptime." },
            { icon: Lock, title: "Quantum-Ready", desc: "Encryption standards designed to withstand next-generation decryption attacks." },
            { icon: BarChart3, title: "Predictive Analytics", desc: "We don't just react to the market; we model its future state." },
            { icon: Zap, title: "Green Energy", desc: "Our data centers are 100% powered by renewable energy sources." },
            { icon: Server, title: "Redundant Storage", desc: "Client data is mirrored across three continents for absolute safety." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111] p-8 rounded-[2rem] border border-white/5 shadow-none hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:border-[#D4AF37] transition-all group"
            >
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-[#D4AF37]/20">
                <item.icon className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-white group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
