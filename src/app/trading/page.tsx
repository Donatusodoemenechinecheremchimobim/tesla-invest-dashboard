'use client';
import Navbar from '@/components/landing/Navbar';
import MarketTicker from '@/components/landing/MarketTicker';
import { motion } from 'framer-motion';

export default function TradingPage() {
  return (
    <main className="min-h-screen bg-[#020204] text-white">
      <Navbar />
      <div className="pt-20">
        <MarketTicker />
        
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold mb-6">LIVE <span className="text-cyan-400">MARKETS</span></h1>
            <p className="text-gray-400 max-w-2xl mb-12">
              Our quantum engine processes 40,000 data points per second to give you the edge.
            </p>
          </motion.div>

          {/* Fake Trading Interface */}
          <div className="w-full aspect-video bg-black border border-white/10 rounded-3xl relative overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2664&auto=format&fit=crop')] bg-cover opacity-30" />
            <div className="relative z-10 text-center">
               <div className="text-2xl font-mono text-cyan-400 mb-4 animate-pulse">CONNECTING TO NODE...</div>
               <button className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-full hover:scale-105 transition">
                 Launch Terminal
               </button>
            </div>
            
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
