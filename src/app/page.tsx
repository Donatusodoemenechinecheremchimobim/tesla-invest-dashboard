'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Globe, Shield, TrendingUp, CheckCircle, Smartphone, Lock, ChevronDown, Play, CreditCard, PieChart } from 'lucide-react';

const FadeIn = ({ children, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

const NumberTicker = ({ value }: { value: string }) => (
  <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-block">{value}</motion.span>
);

export default function IntroPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="bg-[#FAFAFA] text-[#1a1a1a] font-sans selection:bg-[#059669] selection:text-white overflow-x-hidden">
      <IntroNavbar />
      <WhatsAppBubble />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#022c22] text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-transparent to-black/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center pt-20">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#4ade80]">Global Investment Infrastructure</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-bold leading-[1.05] mb-8 tracking-tight">
                Wealth <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#059669]">Without Borders.</span>
             </h1>
             <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed font-light">
                Verde Capital bridges the gap between institutional power and personal freedom. Secure, offshore, and frictionless.
             </p>
             <div className="flex flex-wrap gap-4">
                <Link href="/portal/auth" className="px-10 py-5 bg-[#059669] hover:bg-[#047857] text-white rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_40px_rgba(5,150,105,0.4)] flex items-center gap-2">
                   Start Investing <ArrowRight size={18} />
                </Link>
                <Link href="/technology" className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/20 rounded-full font-bold transition-all flex items-center gap-2">
                   <Play size={18} fill="white" /> See The Tech
                </Link>
             </div>
          </motion.div>
        </div>
      </section>

      {/* INFINITE TICKER */}
      <div className="bg-[#059669] text-white py-4 overflow-hidden sticky top-0 z-40 shadow-xl">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 font-bold text-sm tracking-wider uppercase"
        >
          {Array(10).fill("⚡ 0% Commission on Crypto • FDIC Insured up to $250k • 24/7 Global Support • Real-Time Withdrawals ").map((t, i) => (
             <span key={i}>{t}</span>
          ))}
        </motion.div>
      </div>

      {/* BENTO GRID */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">The numbers <span className="text-[#059669]">don't lie.</span></h2>
         </FadeIn>
         <div className="grid md:grid-cols-4 gap-8 grid-rows-2 h-[600px]">
            <div className="md:col-span-2 md:row-span-2 rounded-[2.5rem] bg-[#f3f4f6] relative overflow-hidden group p-10 flex flex-col justify-end">
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
               <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800" alt="Meeting" fill className="object-cover" />
               <div className="relative z-20 text-white">
                  <h3 className="text-5xl font-bold mb-2">98%</h3>
                  <p className="text-lg opacity-90">Client Retention Rate</p>
               </div>
            </div>
            <div className="bg-[#022c22] rounded-[2.5rem] p-10 text-white flex flex-col justify-between">
               <Shield size={40} className="text-[#4ade80]" />
               <div><h3 className="text-4xl font-bold mb-1">0%</h3><p className="text-sm opacity-70">Commission Fees</p></div>
            </div>
            <div className="bg-[#059669] rounded-[2.5rem] p-10 text-white flex flex-col justify-between">
               <Globe size={40} className="text-white" />
               <div><h3 className="text-4xl font-bold mb-1">40+</h3><p className="text-sm opacity-70">Global Markets</p></div>
            </div>
            <div className="md:col-span-2 bg-white border border-gray-100 shadow-xl rounded-[2.5rem] p-10 flex items-center justify-between">
               <div><h3 className="text-3xl font-bold mb-2">13,000+</h3><p className="text-gray-500">Active Portfolios</p></div>
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center"><PieChart size={32} className="text-[#059669]" /></div>
            </div>
         </div>
      </section>

      {/* INTERACTIVE TABS */}
      <section className="py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
               <span className="text-[#059669] font-bold uppercase tracking-widest text-sm">Why Choose Verde</span>
               <h2 className="text-5xl font-bold mt-4 mb-8">Simplifying the <br/> complex.</h2>
               <div className="space-y-4">
                  {[{ title: "Smart Portfolio", desc: "Automated rebalancing." }, { title: "Private Banking", desc: "Dedicated relationship manager." }, { title: "Tax Optimization", desc: "Minimize liability." }].map((tab, i) => (
                     <div key={i} onClick={() => setActiveTab(i)} className={`p-8 rounded-3xl cursor-pointer transition-all border ${activeTab === i ? 'bg-[#020617] text-white' : 'bg-white border-gray-100'}`}>
                        <div className="flex justify-between items-center"><h3 className="text-xl font-bold">{tab.title}</h3><ChevronDown size={20} /></div>
                        {activeTab === i && <p className="mt-4 text-gray-400">{tab.desc}</p>}
                     </div>
                  ))}
               </div>
            </FadeIn>
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden bg-gray-100 shadow-2xl">
               <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800" alt="Team" fill className="object-cover" />
            </div>
         </div>
      </section>

      <footer className="bg-[#020617] text-white py-24 border-t border-white/10 px-6 text-center">
         <h2 className="text-2xl font-bold mb-6">VERDE CAPITAL</h2>
         <p className="text-gray-400">© 2026 Verde Capital. Secure. Sustainable. Professional.</p>
      </footer>
    </main>
  );
}
