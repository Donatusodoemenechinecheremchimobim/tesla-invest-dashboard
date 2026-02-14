'use client';

import Navbar from '@/components/portal/PortalNavbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, TrendingUp, Zap, Globe, CheckCircle } from 'lucide-react';
import TradeTicker from '@/components/dashboard/TradeTicker';
import GrowthChart from '@/components/dashboard/GrowthChart';

export default function OldSitePortal() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden gpu-accelerated selection:bg-[#D4AF37] selection:text-black">
      {/* ALIGNED NAVBAR */}
      <Navbar />

      {/* HERO SECTION - Aligned Center with consistent Max-Width */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)] z-0" />
        
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full flex flex-col items-center">
           <motion.div 
             initial={{ opacity: 0, y: 30 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="max-w-4xl"
           >
              <span className="inline-block py-1.5 px-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
                Official Tesla Investment Partner
              </span>
              <h1 className="text-6xl md:text-[7.5rem] font-serif mb-8 leading-[0.9] tracking-tight">
                The Future of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 italic">Wealth Generation.</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                Join the world's first algorithmic trading ecosystem powered by Tesla's Dojo Supercomputer.
              </p>

              <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-full mb-20">
                <Link href="/portal/auth" className="w-full md:w-auto px-10 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                  Access Client Portal
                </Link>
                <button className="w-full md:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-all">
                  View Performance
                </button>
              </div>
           </motion.div>

           {/* CHART CONTAINER - Balanced Alignment */}
           <div className="relative w-full max-w-5xl mx-auto h-[350px] md:h-[450px] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-6 md:p-12 shadow-2xl overflow-hidden mb-24">
              <div className="absolute top-8 left-10 z-10">
                 <h3 className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Live Performance Pulse</h3>
                 <p className="text-left text-4xl font-serif text-[#D4AF37] tracking-tighter">+127.4% <span className="text-xs text-gray-600 font-sans tracking-normal ml-2">(YTD)</span></p>
              </div>
              <div className="w-full h-full opacity-90" style={{ transform: 'translateZ(0)' }}>
                 <GrowthChart />
              </div>
           </div>
        </div>

        {/* TICKER - Fixed Bottom Alignment */}
        <div className="absolute bottom-0 left-0 w-full z-20 border-t border-white/10 bg-black/80 backdrop-blur-xl">
           <TradeTicker />
        </div>
      </section>

      {/* PORTFOLIOS SECTION - Grid Alignment */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em]">Strategic Allocation</span>
          <h2 className="text-5xl md:text-7xl font-serif mt-6">Investment Portfolios</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pb-12">
          {[
            { name: "Silver", price: "$500-$4999", roi: "120% Weekly", features: ["Basic AI Trading", "Weekly Withdrawals", "Email Support"] },
            { name: "Gold", price: "$5,000-$19,999", roi: "200% Weekly", features: ["Advanced Dojo AI", "Instant Withdrawals", "24/7 Priority Support", "Capital Insured"], popular: true },
            { name: "Diamond", price: "$20,000+", roi: "300% Weekly", features: ["Quantum Execution", "Dedicated Account Manager", "Full Insurance Coverage"] }
          ].map((plan, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`
                relative bg-[#0a0a0a] border p-12 rounded-[2.5rem] flex flex-col h-full
                ${plan.popular ? 'border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.05)] ring-1 ring-[#D4AF37]/20' : 'border-white/5'}
            `}>
              {plan.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-b-xl shadow-lg">Most Popular</div>}
              <h3 className="text-2xl font-serif text-gray-500 mb-2">{plan.name}</h3>
              <div className="text-5xl font-bold text-white mb-2">{plan.price}<span className="text-xl text-gray-700 font-light ml-1">+</span></div>
              <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] mb-10">Target ROI: {plan.roi}</p>
              
              <ul className="space-y-5 mb-12 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-4 text-[13px] text-gray-500 font-light">
                    <CheckCircle size={16} className={plan.popular ? "text-[#D4AF37]" : "text-gray-700"} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/portal/auth" className={`w-full py-5 font-bold uppercase tracking-[0.2em] text-[10px] rounded-2xl text-center transition-all ${plan.popular ? 'bg-[#D4AF37] text-black hover:bg-white shadow-xl' : 'bg-white/5 text-white hover:bg-white hover:text-black'}`}>
                Open {plan.name} Account
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORE FEATURES - Multi-Column Alignment */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-black border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: <ShieldCheck size={36}/>, title: "Insured Principal", desc: "Your capital is backed by Tesla's $20B Insurance Fund, ensuring zero-loss risk environments." },
            { icon: <Zap size={36}/>, title: "Quantum Speed", desc: "Trades executed in 0.04ms using proprietary Dojo Compute clusters for maximum spread advantage." },
            { icon: <Globe size={36}/>, title: "Global Access", desc: "Trade institutional TSLA, CRYPTO, and FX spreads from any encrypted terminal globally." }
          ].map((item, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] hover:border-[#D4AF37]/20 transition-all">
              <div className="text-[#D4AF37] mb-8">{item.icon}</div>
              <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS BAR - Balanced Grid */}
      <section className="py-24 border-y border-white/5 bg-[#050505] text-center">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto px-6">
            <div><h3 className="text-4xl md:text-5xl font-serif text-white tracking-tighter">14.5K</h3><p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] mt-3">Elite Clients</p></div>
            <div><h3 className="text-4xl md:text-5xl font-serif text-white tracking-tighter">$850M+</h3><p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] mt-3">Capital Managed</p></div>
            <div><h3 className="text-4xl md:text-5xl font-serif text-white tracking-tighter">0.00%</h3><p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] mt-3">Security Breaches</p></div>
            <div><h3 className="text-4xl md:text-5xl font-serif text-white tracking-tighter">24/7</h3><p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] mt-3">Global Concierge</p></div>
         </div>
      </section>
    </main>
  );
}
