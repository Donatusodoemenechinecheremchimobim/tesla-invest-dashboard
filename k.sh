#!/bin/bash

echo "📉 REPLACING STATIC TEXT WITH LIVE MARKET TICKER..."

cat << 'EOF' > src/app/page.tsx
'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';
import IntroFooter from '@/components/intro/IntroFooter';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Globe, Shield, Smartphone, Lock, ChevronDown, Play, PieChart, Star, Crown, Activity, TrendingUp, TrendingDown } from 'lucide-react';

const FadeIn = ({ children, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const GoldImage = ({ src, alt }: any) => (
  <div className="relative w-full h-full overflow-hidden bg-[#111]">
    <Image 
      src={src} 
      alt={alt} 
      fill 
      className="object-cover opacity-80"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
    <div className="absolute inset-0 bg-[#D4AF37] mix-blend-overlay opacity-20" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
  </div>
);

// --- COMPONENT: LIVE MARKET TICKER ---
const MarketTicker = () => {
  const stocks = [
    { symbol: "XAU/USD", price: "2,402.10", change: "+1.2%", up: true },
    { symbol: "BTC/USD", price: "64,230.50", change: "+4.5%", up: true },
    { symbol: "SPX", price: "5,120.40", change: "+0.8%", up: true },
    { symbol: "NDX", price: "18,300.10", change: "-0.2%", up: false },
    { symbol: "TSLA", price: "178.20", change: "+2.1%", up: true },
    { symbol: "AAPL", price: "172.50", change: "-0.5%", up: false },
    { symbol: "ETH/USD", price: "3,450.00", change: "+3.2%", up: true },
    { symbol: "EUR/USD", price: "1.0840", change: "+0.1%", up: true },
  ];

  return (
    <div className="bg-[#D4AF37] text-black py-3 overflow-hidden border-y-4 border-black relative z-40">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }} 
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }} 
        className="flex whitespace-nowrap gap-12"
      >
        {[...stocks, ...stocks, ...stocks].map((s, i) => (
           <div key={i} className="flex items-center gap-3 font-bold text-xs tracking-wider uppercase">
              <span className="font-extrabold">{s.symbol}</span>
              <span>{s.price}</span>
              <span className={`flex items-center ${s.up ? 'text-green-900' : 'text-red-900'}`}>
                 {s.up ? <TrendingUp size={12} className="mr-1"/> : <TrendingDown size={12} className="mr-1"/>}
                 {s.change}
              </span>
              <span className="text-black/20">|</span>
           </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- COMPONENT: LIVE GOLD CHART (Main) ---
const LiveChart = () => {
  const points = [50, 80, 45, 90, 60, 100, 75, 110, 95, 130, 115, 150];
  const pathData = points.map((p, i) => `${i * 80},${150 - p}`).join(" L ");

  return (
    <div className="w-full h-[500px] bg-[#0A0A0A] rounded-[3rem] border border-[#333] p-8 md:p-12 relative overflow-hidden shadow-2xl group">
       <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
             <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-[#00ff88] rounded-full animate-pulse" />
                <span className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs">Live Market Data</span>
             </div>
             <h3 className="text-4xl md:text-5xl font-serif text-white">XAU/USD <span className="text-[#333]">|</span> Gold Spot</h3>
          </div>
          <div className="text-right">
             <p className="text-3xl font-mono text-white">$2,402.18</p>
             <p className="text-[#00ff88] text-sm font-bold flex items-center justify-end gap-1"><TrendingUp size={14}/> +1.24% (24h)</p>
          </div>
       </div>

       <div className="relative h-[300px] w-full">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 880 150" preserveAspectRatio="none">
             <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
                   <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                </linearGradient>
             </defs>
             <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                d={`M 0,150 L ${pathData} L 880,150 Z`} 
                fill="url(#goldGradient)" 
             />
             <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                d={`M 0,${150-points[0]} L ${pathData}`} 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="3" 
             />
          </svg>
          <motion.div 
             initial={{ opacity: 0, scale: 0 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ delay: 2.5 }}
             className="absolute top-[20%] right-[20%] bg-[#111] border border-[#D4AF37] p-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
             <p className="text-xs text-gray-400 uppercase">All Time High</p>
             <p className="text-xl text-white font-bold">$2,450.00</p>
          </motion.div>
       </div>

       <div className="absolute bottom-8 left-12 flex gap-4">
          {['1H', '1D', '1W', '1M', '1Y', 'ALL'].map((t, i) => (
             <span key={t} className={`text-xs font-bold cursor-pointer transition-colors ${i === 1 ? 'text-[#D4AF37] border-b border-[#D4AF37]' : 'text-gray-600 hover:text-white'}`}>{t}</span>
          ))}
       </div>
    </div>
  );
};

export default function IntroPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <main className="bg-[#050505] text-[#E5E5E5] font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      <IntroNavbar />
      <WhatsAppBubble />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-40 grayscale contrast-125 scale-105"
            >
               <source src="https://videos.pexels.com/video-files/3160244/3160244-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#D4AF37] mix-blend-overlay opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center pt-20">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
             <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#D4AF37]/10 backdrop-blur-xl border border-[#D4AF37]/30 mb-8 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <Crown size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Private Wealth</span>
             </div>
             <h1 className="text-6xl md:text-9xl font-serif font-bold leading-[0.9] mb-8 tracking-tight text-white">
                WEALTH <br/> <span className="text-[#D4AF37]">REFINED.</span>
             </h1>
             <p className="text-xl text-gray-400 mb-12 max-w-lg leading-relaxed font-light border-l-2 border-[#D4AF37] pl-8">
                Verde Capital provides institutional-grade access to global markets, secured by physical gold reserves and advanced cryptography.
             </p>
             <div className="flex flex-wrap gap-6">
                <Link href="/portal/" className="px-12 py-5 bg-[#D4AF37] text-black rounded-full font-bold transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] flex items-center gap-3">
                   Access Portal <ArrowRight size={18} />
                </Link>
                <Link href="/services" className="px-12 py-5 bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#D4AF37] rounded-full font-bold transition-all flex items-center gap-3">
                   <Play size={18} fill="white" /> View Strategy
                </Link>
             </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative hidden lg:block h-[650px] w-full rounded-[4rem] overflow-hidden border-8 border-white/5 shadow-2xl">
             <GoldImage src="https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg" alt="Stock Market Graph" />
             <div className="absolute bottom-10 left-10 right-10 bg-black/80 backdrop-blur-xl p-8 rounded-[3rem] border border-[#D4AF37]/30 flex justify-between items-end">
                <div>
                   <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-1">Live Market Feed</p>
                   <p className="text-4xl text-white font-serif">NDX 18,402.10</p>
                </div>
                <div className="text-right">
                   <p className="text-[#D4AF37] font-bold text-xl">+1.4%</p>
                   <p className="text-gray-400 text-xs">Intraday</p>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 2. REPLACED: LIVE MARKET TICKER */}
      <MarketTicker />

      {/* 3. BENTO GRID */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <FadeIn>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-20 text-center text-white">
               The <span className="text-[#D4AF37] italic">Gold</span> Standard.
            </h2>
         </FadeIn>
         
         <div className="grid md:grid-cols-4 gap-6 grid-rows-2 h-[700px]">
            <div className="md:col-span-2 md:row-span-2 rounded-[3.5rem] bg-[#111] relative overflow-hidden group border border-white/5">
               <GoldImage src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg" alt="Skyscraper" />
               <div className="absolute bottom-0 left-0 p-12 z-20">
                  <h3 className="text-7xl font-bold text-white mb-2 font-serif">99%</h3>
                  <p className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold">Client Retention</p>
               </div>
            </div>
            <div className="bg-[#D4AF37] rounded-[3.5rem] p-10 text-black flex flex-col justify-between hover:scale-[1.02] transition-transform duration-500 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
               <Shield size={48} className="text-black" />
               <div><h3 className="text-5xl font-bold mb-2">0%</h3><p className="text-xs font-bold uppercase tracking-widest opacity-70">Advisory Fees</p></div>
            </div>
            <div className="bg-[#111] rounded-[3.5rem] p-10 text-white flex flex-col justify-between border border-[#333] hover:border-[#D4AF37] transition-colors">
               <Globe size={48} className="text-[#D4AF37]" />
               <div><h3 className="text-5xl font-bold mb-2">40+</h3><p className="text-xs font-bold uppercase tracking-widest text-gray-500">Global Hubs</p></div>
            </div>
            <div className="md:col-span-2 bg-[#111] border border-[#333] rounded-[3.5rem] p-12 flex items-center justify-between hover:border-[#D4AF37] transition-colors">
               <div><h3 className="text-5xl font-serif font-bold text-white mb-2">$14.2B</h3><p className="text-gray-500 uppercase tracking-widest text-xs">Assets Under Management</p></div>
               <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37]"><PieChart size={40} /></div>
            </div>
         </div>
      </section>

      {/* 4. LIVE CHART SECTION */}
      <section className="py-32 bg-black overflow-hidden border-t border-[#222]">
         <div className="px-6 max-w-7xl mx-auto">
            <div className="mb-16 flex justify-between items-end">
               <div>
                  <span className="text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-xs">Real-Time Analytics</span>
                  <h2 className="text-5xl font-serif font-bold mt-4 text-white">Market <span className="text-[#D4AF37]">Pulse.</span></h2>
               </div>
               <Link href="/services" className="text-[#D4AF37] uppercase tracking-widest text-xs font-bold border-b border-[#D4AF37] pb-2 hover:text-white transition-colors">
                  View Full Terminal
               </Link>
            </div>
            <FadeIn>
               <LiveChart />
            </FadeIn>
         </div>
      </section>

      {/* 5. PARALLAX PHONE */}
      <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-[#222]">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1 flex justify-center relative">
               <div className="relative w-[340px] h-[680px] bg-black border-[6px] border-[#222] shadow-[0_0_80px_rgba(212,175,55,0.15)] rounded-[4rem] overflow-hidden z-10">
                  <div className="p-8 pt-14 h-full bg-[#0A0A0A]">
                     <div className="flex justify-between items-center mb-10">
                        <div className="w-10 h-10 border border-[#D4AF37] rounded-full" />
                        <div className="text-right">
                           <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest">Net Worth</p>
                           <p className="text-3xl font-serif text-white">$848,572</p>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-[#111] p-5 rounded-[2rem] border border-[#D4AF37]/30 flex justify-between items-center shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-xs">AM</div>
                              <div><p className="text-white text-sm font-bold">Dividend Payout</p><p className="text-gray-500 text-[10px]">Just Now</p></div>
                           </div>
                           <div className="text-[#D4AF37] font-bold">+$14,200</div>
                        </motion.div>
                        <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-[#111] p-5 rounded-[2rem] border border-[#D4AF37]/30 flex justify-between items-center shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-xs">TS</div>
                              <div><p className="text-white text-sm font-bold">Gold Futures</p><p className="text-gray-500 text-[10px]">2m ago</p></div>
                           </div>
                           <div className="text-[#D4AF37] font-bold">+8.4%</div>
                        </motion.div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="order-1 md:order-2">
               <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">Control in your <br/> <span className="text-[#D4AF37]">Pocket.</span></h2>
               <p className="text-lg text-gray-400 mb-10 leading-relaxed font-light">Monitor performance and execute trades from our encrypted mobile terminal.</p>
               <Link href="/portal/" className="bg-[#D4AF37] text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors">Access Terminal</Link>
            </div>
         </div>
      </section>

      {/* 6. TABS */}
      <section className="py-40 bg-black border-t border-[#222]">
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div>
               <h2 className="text-5xl font-serif font-bold mt-4 mb-10 text-white">Complexity, <br/> <span className="text-[#D4AF37]">Simplified.</span></h2>
               <div className="space-y-4">
                  {[{ title: "Managed Portfolios", desc: "Hands-off investing." }, { title: "Self-Directed Trading", desc: "0% commission." }, { title: "Private Banking", desc: "Exclusive access." }].map((tab, i) => (
                     <div key={i} onClick={() => setActiveTab(i)} className={`p-8 rounded-[3rem] cursor-pointer transition-all border ${activeTab === i ? 'border-[#D4AF37] bg-[#111]' : 'border-[#222] bg-transparent hover:bg-[#111]'}`}>
                        <div className="flex justify-between items-center">
                           <h3 className={`font-bold text-xl ${activeTab === i ? 'text-[#D4AF37]' : 'text-gray-500'}`}>{tab.title}</h3>
                           <ChevronDown size={24} className={`transition-transform ${activeTab === i ? 'rotate-180 text-[#D4AF37]' : 'text-gray-600'}`} />
                        </div>
                        {activeTab === i && <p className="mt-4 text-gray-400 text-sm leading-relaxed">{tab.desc}</p>}
                     </div>
                  ))}
               </div>
            </div>
            <div className="relative h-[650px] rounded-[4rem] overflow-hidden border border-[#333] bg-[#0A0A0A]">
               <GoldImage src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" alt="Interface" />
            </div>
         </div>
      </section>

      <IntroFooter />
    </main>
  );
}
EOF

echo "✅ STATIC MARQUEE REPLACED WITH LIVE MARKET TICKER."