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
