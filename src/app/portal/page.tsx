'use client';

import Navbar from '@/components/landing/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, TrendingUp, Zap, Globe, CheckCircle, Diamond, Crown, Sparkles } from 'lucide-react';
import TradeTicker from '@/components/dashboard/TradeTicker';
import GrowthChart from '@/components/dashboard/GrowthChart';

export default function OldSitePortal() {
  const portfolios = [
    { 
      name: "Silver", 
      price: "$500 - $4,999", 
      roi: "120% Weekly", 
      icon: <Sparkles className="text-gray-400" size={24} />,
      features: ["Basic AI Trading", "Weekly Withdrawals", "24/7 Email Support"],
      color: "border-white/10"
    },
    { 
      name: "Gold", 
      price: "$5,000 - $19,999", 
      roi: "200% Weekly", 
      icon: <Crown className="text-[#D4AF37]" size={28} />,
      features: ["Advanced Dojo AI", "Instant Withdrawals", "Priority Support", "Capital Insured"], 
      popular: true,
      color: "border-[#D4AF37]"
    },
    { 
      name: "Diamond", 
      price: "$20,000+", 
      roi: "300% Weekly", 
      icon: <Diamond className="text-cyan-400" size={24} />,
      features: ["Quantum Execution", "Dedicated Manager", "Full Insurance", "Private Events"],
      color: "border-white/10"
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden gpu-accelerated selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)] z-0" />
        
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full flex flex-col items-center">
           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
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

           <div className="relative w-full max-w-5xl mx-auto h-[350px] md:h-[450px] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-6 md:p-12 shadow-2xl overflow-hidden mb-24">
              <div className="absolute top-8 left-10 z-10 text-left">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Live Performance Pulse</h3>
                 <p className="text-4xl font-serif text-[#D4AF37] tracking-tighter">+127.4% <span className="text-xs text-gray-600 font-sans tracking-normal ml-2">(YTD)</span></p>
              </div>
              <div className="w-full h-full opacity-90">
                 <GrowthChart />
              </div>
           </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20 border-t border-white/10 bg-black/80 backdrop-blur-xl">
           <TradeTicker />
        </div>
      </section>

      {/* REFINED PORTFOLIOS SECTION */}
      <section className="py-40 max-w-7xl mx-auto px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none opacity-50" />
        
        <div className="text-center mb-24 relative z-10">
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">Strategic Allocation</span>
          <h2 className="text-5xl md:text-8xl font-serif mt-4 tracking-tighter">Investment <span className="italic text-gray-500">Tiers</span></h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 pb-12 relative z-10">
          {portfolios.map((plan, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`
                group relative bg-gradient-to-b from-[#111] to-black border p-1 rounded-[3rem] transition-all duration-500
                ${plan.popular ? 'border-[#D4AF37] shadow-[0_20px_80px_rgba(212,175,55,0.15)] scale-105 z-20' : 'border-white/5 hover:border-white/20'}
            `}>
              <div className="bg-black rounded-[2.9rem] p-12 h-full flex flex-col">
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-xl">
                    Institutional Choice
                  </div>
                )}
                
                <div className="mb-10 flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/50 transition-colors">
                    {plan.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Tier</p>
                    <h3 className={`text-2xl font-serif ${plan.popular ? 'text-[#D4AF37]' : 'text-white'}`}>{plan.name}</h3>
                  </div>
                </div>

                <div className="mb-10">
                  <div className="text-sm text-gray-500 uppercase tracking-widest mb-2">Deposit Range</div>
                  <div className="text-3xl font-bold text-white tracking-tighter group-hover:text-[#D4AF37] transition-colors">{plan.price}</div>
                </div>

                <div className="mb-12 p-6 rounded-[2rem] bg-[#0a0a0a] border border-white/5 relative overflow-hidden group-hover:border-[#D4AF37]/30 transition-all">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
                    <TrendingUp size={40} className="text-[#D4AF37]" />
                  </div>
                  <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-1">Fixed ROI Performance</div>
                  <div className="text-4xl font-serif font-bold text-white italic">{plan.roi}</div>
                </div>
                
                <ul className="space-y-6 mb-12 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-4 text-[13px] text-gray-400 font-light group-hover:text-white transition-colors">
                      <div className={`w-1.5 h-1.5 rounded-full ${plan.popular ? 'bg-[#D4AF37]' : 'bg-gray-700'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="/portal/auth" className={`
                  group/btn relative w-full py-5 font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl text-center overflow-hidden transition-all
                  ${plan.popular 
                    ? 'bg-[#D4AF37] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]' 
                    : 'bg-white/5 text-white hover:bg-white hover:text-black'}
                `}>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Initiate {plan.name} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-black border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-12 text-left">
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

      {/* STATS BAR */}
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
