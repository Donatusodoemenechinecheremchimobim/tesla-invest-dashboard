'use client';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white overflow-hidden">
      <Navbar />
      <div className="aurora-bg" />
      
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl md:text-8xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
            THE MASTER PLAN
          </h1>
          
          <div className="space-y-12 text-lg md:text-xl text-gray-400 leading-relaxed">
            <p>
              <strong className="text-white">Tesla Quantum Invest</strong> is not a bank. We are a technological fortress designed to maximize wealth through the ecosystem of Elon Musk.
            </p>
            <p>
              While traditional firms trade on quarterly reports, our <span className="text-cyan-400">Neural Engine</span> analyzes SpaceX launch trajectories, Starlink bandwidth saturation, and Tesla FSD beta miles to predict market movements before Wall Street wakes up.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">Phase 1</h3>
                <p>Accumulate high-velocity assets in TSLA and Lithium futures using AI-driven arbitrage.</p>
              </div>
              <div className="p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">Phase 2</h3>
                <p>Deploy capital into SpaceX private equity rounds exclusively available to our Black Tier members.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
