'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Zap, Lock, MessageCircle, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import TradingTicker from '@/components/TradingTicker';

export default function Home() {
  const [notification, setNotif] = useState("User @Alex just earned $4,200 from Tesla");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setLang] = useState("EN");

  useEffect(() => {
    const messages = [
      "User @Sarah just withdrew $12,000",
      "User @Mike invested 5 BTC",
      "User @Chen earned $850 from Gold"
    ];
    let i = 0;
    const interval = setInterval(() => {
      setNotif(messages[i]);
      i = (i + 1) % messages.length;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-600 font-sans">
      {/* 1. The Trading Ticker */}
      <TradingTicker />

      {/* 2. Responsive Navbar (Pushed down by 50px ticker) */}
      <nav className="fixed w-full p-6 flex justify-between items-center glass z-50 top-[50px] left-0 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-bold tracking-tighter italic">INVESTMENT<span className="text-red-600">TESLA</span></h1>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
           {/* Language Selector */}
           <div className="relative">
             <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition">
               <Globe size={16}/> {currentLang} <ChevronDown size={14}/>
             </button>
             {langOpen && (
               <div className="absolute top-8 right-0 bg-zinc-900 border border-zinc-800 rounded-lg p-2 w-32 shadow-xl flex flex-col gap-1">
                 {['EN (English)', 'ES (Español)', 'FR (Français)', 'DE (Deutsch)'].map(l => (
                   <button key={l} onClick={() => {setLang(l.split(' ')[0]); setLangOpen(false)}} className="text-left text-xs p-2 hover:bg-zinc-800 rounded text-zinc-300">{l}</button>
                 ))}
               </div>
             )}
           </div>

           <Link href="/auth" className="text-sm text-gray-300 hover:text-white transition">Log In</Link>
           <Link href="/auth" className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full font-bold transition shadow-[0_0_20px_rgba(220,38,38,0.5)]">Get Started</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          <Link href="/auth" className="text-2xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
          <Link href="/auth" className="text-2xl font-bold text-red-500" onClick={() => setIsMobileMenuOpen(false)}>Start Investing</Link>
          <div className="flex gap-4 mt-8">
            {['EN', 'ES', 'FR'].map(l => (
              <button key={l} onClick={() => {setLang(l); setIsMobileMenuOpen(false)}} className={`p-2 rounded border ${currentLang === l ? 'border-red-500 text-red-500' : 'border-zinc-800 text-zinc-500'}`}>{l}</button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center text-center px-4 pt-48 pb-20 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-mono tracking-widest uppercase">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/> Live Market Data
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
            TRADES BECOME<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600">A LIFESTYLE.</span>
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Experience the world's most advanced investment engine. <br className="hidden md:block" />
            Zero latency. Institutional-grade security. <span className="text-white font-medium">100% Guaranteed Uptime.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-4">
            <Link href="/auth" className="px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-full hover:bg-red-700 transition shadow-[0_0_30px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2">
              Start Investing <Zap size={18} fill="currentColor"/>
            </Link>
            <button className="px-8 py-4 glass text-white font-bold text-lg rounded-full hover:bg-white/5 transition border border-white/10">
              View Markets
            </button>
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-8">
        {[
          { icon: Shield, title: "DDoS Invulnerable", desc: "Our infrastructure runs on global edge networks. Zero downtime, guaranteed." },
          { icon: Zap, title: "High Frequency", desc: "Trades execute in milliseconds using our proprietary matching engine." },
          { icon: Lock, title: "Bank-Grade Vault", desc: "Assets are stored in cold wallets with multi-sig authentication." }
        ].map((f, i) => (
          <div key={i} className="glass p-8 rounded-3xl border border-white/5 hover:border-red-500/30 transition group">
            <f.icon className="w-10 h-10 text-zinc-500 group-hover:text-red-500 transition mb-6" />
            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Live Social Proof Notification */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed bottom-8 left-8 glass px-5 py-3 rounded-full flex items-center gap-4 z-50 border-l-4 border-green-500 hidden md:flex"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
        <div>
          <span className="block text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Live Activity</span>
          <span className="text-xs font-bold text-white">{notification}</span>
        </div>
      </motion.div>

      {/* WhatsApp Floating Bubble */}
      <a href="https://wa.me/2348144462467" target="_blank" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#25D366] p-4 rounded-full hover:scale-110 transition shadow-[0_0_30px_rgba(37,211,102,0.4)] z-50 group">
        <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:rotate-12 transition" />
      </a>
    </main>
  );
}