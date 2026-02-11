'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import SplashScreen from '@/components/intro/SplashScreen';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, TrendingUp, Zap, Globe, CheckCircle } from 'lucide-react';
import TradeTicker from '@/components/dashboard/TradeTicker';
import GrowthChart from '@/components/dashboard/GrowthChart';

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* MAIN SITE CONTENT */}
      <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden gpu-accelerated selection:bg-[#D4AF37] selection:text-black">
        <Navbar />

        {/* 1. HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)] z-0" />
          
          <div className="relative z-10 text-center px-6 max-w-5xl w-full">
             <motion.div 
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ delay: 3.2, duration: 1, ease: "easeOut" }} // Delay matches Splash length
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

             {/* 📈 GROWTH CHART */}
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

        {/* 2. INVESTMENT PLANS (SWIPEABLE) */}
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

        {/* 3. FEATURES */}
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
    </>
  );
}
