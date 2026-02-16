'use client';

// CHANGED: Using Landing Navbar for better Desktop View responsiveness on mobile
import Navbar from '@/components/landing/Navbar'; 
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, CheckCircle } from 'lucide-react';
import TradeTicker from '@/components/dashboard/TradeTicker';
import GrowthChart from '@/components/dashboard/GrowthChart';

export default function OldSitePortal() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden gpu-accelerated selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)] z-0" />
        
        <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl w-full">
           <motion.div 
             initial={{ opacity: 0, y: 30 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ duration: 0.8, ease: "easeOut" }}
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
                <Link href="/portal/auth" className="w-full md:w-auto px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  Access Client Portal
                </Link>
                <button className="w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-all">
                  View Performance
                </button>
              </div>
           </motion.div>

           {/* CHART CONTAINER */}
           <div className="relative w-full max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden mb-20 flex flex-col">
              
              {/* 1. Header Section */}
              <div className="w-full p-6 md:p-8 border-b border-white/5 bg-[#0a0a0a] z-10 text-left">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Live Asset Performance</h3>
                 <div className="flex flex-wrap items-baseline gap-3">
                   <p className="text-4xl md:text-5xl font-serif text-[#D4AF37] tracking-tight">+127.4%</p>
                   <span className="text-xs text-gray-500 font-sans tracking-normal uppercase">(YTD)</span>
                 </div>
                 <p className="text-sm text-gray-500 mt-1">Total Assets: <span className="text-white">$1.4T Managed</span></p>
              </div>

              {/* 2. Chart Section */}
              <div className="w-full h-[300px] md:h-[400px] relative bg-black/40">
                 <GrowthChart />
              </div>
           </div>
        </div>

        {/* TICKER */}
        <div className="absolute bottom-0 left-0 w-full z-20 border-t border-white/10 bg-black/80 backdrop-blur-md">
           <TradeTicker />
        </div>
      </section>

      {/* PLANS */}
      <section className="py-24 max-w-7xl mx-auto">
        <div className="text-center mb-12 px-6">
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">Choose Your Tier</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">Investment Portfolios</h2>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory px-6 pb-12 w-full no-scrollbar">
          {[
            { name: "Silver", price: "$500 - $4,999", roi: "120% Weekly", features: ["Basic AI Trading", "Weekly Withdrawals", "Email Support"] },
            { name: "Gold", price: "$5,000 - $19,999", roi: "200% Weekly", features: ["Advanced Dojo AI", "Instant Withdrawals", "24/7 Priority Support", "Capital Insured"], popular: true },
            { name: "Diamond", price: "$20,000+", roi: "300% Weekly", features: ["Quantum Execution", "Dedicated Account Manager", "Full Insurance Coverage"] }
          ].map((plan, i) => (
            <div key={i} className={`
                relative flex-shrink-0 w-[85vw] md:w-auto snap-center 
                bg-[#0a0a0a] border p-8 rounded-[2rem] flex flex-col 
                ${plan.popular ? 'border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.1)] scale-[1.02] z-10' : 'border-white/10'}
            `}>
              {plan.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-b-lg">Most Popular</div>}
              
              <h3 className="text-xl font-serif text-gray-400 mb-2 mt-2">{plan.name}</h3>
              
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight break-words leading-tight">
                {plan.price}
              </div>
              
              <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-8">Est. ROI: {plan.roi}</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCircle size={14} className={plan.popular ? "text-[#D4AF37]" : "text-gray-600"} />
                    {f}
                  </li>
                ))}
              </ul>
              
              <Link href="/portal/auth" className={`w-full py-4 font-bold uppercase tracking-widest text-[10px] rounded-xl text-center transition-all ${plan.popular ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-white/5 text-white hover:bg-white hover:text-black'}`}>
                Start {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-black border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck size={32}/>, title: "Insured Principal", desc: "Your capital is backed by Tesla's $20B Insurance Fund." },
            { icon: <Zap size={32}/>, title: "Quantum Speed", desc: "Trades executed in 0.04ms using Dojo Compute clusters." },
            { icon: <Globe size={32}/>, title: "Global Access", desc: "Trade TSLA, CRYPTO, and FX from anywhere in the world." }
          ].map((item, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl group hover:border-[#D4AF37]/50 transition-colors">
              <div className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
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
            <div><h3 className="text-3xl font-serif text-white">$1.2B</h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Managed</p></div>
            <div><h3 className="text-3xl font-serif text-white">0.0%</h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Hacks</p></div>
            <div><h3 className="text-3xl font-serif text-white">24/7</h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Support</p></div>
         </div>
      </section>
    </main>
  );
}
