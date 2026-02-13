'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import TechRoots from '@/components/animations/TechRoots'; // 👈 IMPORTED
import { motion } from 'framer-motion';
import { Cpu, Server, Zap, Globe, Lock, BarChart3 } from 'lucide-react';

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 selection:bg-[#059669] selection:text-white">
      <IntroNavbar />
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block py-2 px-4 rounded-full bg-green-50 text-[#059669] text-xs font-bold uppercase tracking-wider mb-6 border border-green-100">
            Proprietary Architecture
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 tracking-tight">
            Growth Technology.
          </h1>
          
          {/* ANIMATION HERE */}
          <div className="mb-12">
             <TechRoots />
          </div>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Verde Capital runs on a custom-built AI engine that processes 400TB of market data daily. 
            Deep roots in data ensure stability in any market storm.
          </p>
        </motion.div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
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
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-200 transition-all group"
            >
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="text-[#059669]" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
