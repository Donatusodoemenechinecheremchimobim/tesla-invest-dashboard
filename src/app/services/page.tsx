'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import IntroFooter from '@/components/intro/IntroFooter';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bitcoin, Home, LineChart, Landmark, Wallet, Box, ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, icon: Icon, desc, color }: any) => (
  <motion.div 
    whileHover={{ y: -10 }} 
    className="p-10 bg-[#111] border border-[#333] hover:border-[#D4AF37] h-[450px] flex flex-col justify-between group transition-all rounded-[3.5rem] relative overflow-hidden"
  >
    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#D4AF37] rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity" />
    <div className="relative z-10 text-white">
      <div className="w-20 h-20 border border-[#D4AF37] flex items-center justify-center mb-8 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors rounded-2xl">
         <Icon size={36} />
      </div>
      <h3 className="text-4xl font-serif mb-4 text-white">{title}</h3>
      <p className="text-gray-400 text-lg leading-relaxed font-light">{desc}</p>
    </div>
    <div className="flex items-center gap-2 text-[#D4AF37] font-bold uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0">
       Learn More <ArrowRight size={14} />
    </div>
  </motion.div>
);

export default function ServicesPage() {
  return (
    <main className="bg-[#050505] text-[#E5E5E5] min-h-screen selection:bg-[#D4AF37] selection:text-black">
      <IntroNavbar />
      <WhatsAppBubble />
      
      {/* 1. HERO */}
      <section className="pt-40 pb-32 px-6 max-w-7xl mx-auto text-center border-b border-[#333]">
         <h1 className="text-6xl md:text-9xl font-serif font-bold mb-12 text-white">
            Full Stack <br/> <span className="text-[#D4AF37]">Finance.</span>
         </h1>
         <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-20 leading-relaxed font-light">
            From traditional equities to decentralized finance, Verde Capital provides a unified platform for all your wealth management needs.
         </p>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
               title="Crypto Assets" 
               icon={Bitcoin} 
               desc="Institutional-grade custody and trading for Bitcoin, Ethereum, and major alts. 100% Cold Storage." 
            />
            <ServiceCard 
               title="Real Estate" 
               icon={Home} 
               desc="Access to fractionalized ownership in commercial properties across Dubai, London, and NYC." 
            />
            <ServiceCard 
               title="Equities" 
               icon={LineChart} 
               desc="Direct market access to NYSE, NASDAQ, and LSE with sub-millisecond execution." 
            />
            <ServiceCard 
               title="Offshore Banking" 
               icon={Landmark} 
               desc="Multi-currency accounts in tax-neutral jurisdictions for total financial privacy." 
            />
            <ServiceCard 
               title="Private Credit" 
               icon={Wallet} 
               desc="High-yield fixed income opportunities not available on public markets." 
            />
            <div className="p-10 bg-[#D4AF37] flex flex-col items-center justify-center text-center h-[450px] rounded-[3.5rem] group cursor-pointer hover:bg-white transition-colors">
               <h3 className="text-4xl font-serif font-bold mb-8 text-black">Start Today</h3>
               <Link href="/portal/" className="px-12 py-5 bg-black text-white font-bold uppercase tracking-widest hover:scale-105 transition-transform rounded-full">
                  Open Account
               </Link>
            </div>
         </div>
      </section>
      
      <IntroFooter />
    </main>
  );
}
