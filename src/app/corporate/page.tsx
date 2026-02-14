'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import IntroFooter from '@/components/intro/IntroFooter';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, TrendingUp, Globe, Building2, DollarSign } from 'lucide-react';

const FadeIn = ({ children, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

export default function CorporatePage() {
  return (
    <main className="bg-[#050505] text-[#E5E5E5] font-sans selection:bg-[#D4AF37] selection:text-black">
      <IntroNavbar />
      <WhatsAppBubble />
      
      {/* 1. HERO */}
      <section className="relative h-screen flex items-center bg-black border-b border-[#333]">
         <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" alt="Corporate" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
         </div>
         <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
               <span className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Verde Corporate Solutions</span>
               <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 text-white tracking-tight leading-none">
                  Liquidity <br/> <span className="text-[#D4AF37]">Engineered.</span>
               </h1>
               <p className="text-xl text-gray-400 mb-12 leading-relaxed font-light">
                  Optimize your company's treasury with AI-driven cash flow management, high-yield corporate accounts, and instant global payroll.
               </p>
               <div className="flex gap-4">
                  <Link href="/portal/" className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-10 py-5 font-bold uppercase tracking-widest hover:bg-white transition-colors">
                     Open Corporate Account <ArrowRight size={16} />
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 2. DASHBOARD MOCKUP */}
      <section className="py-32 px-6 bg-[#0A0A0A]">
         <div className="max-w-7xl mx-auto">
            <div className="relative rounded-[3rem] border border-[#333] bg-[#111] p-2 overflow-hidden shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37]" />
               <div className="bg-black rounded-[3.5rem] p-12 min-h-[600px] flex flex-col md:flex-row gap-12">
                  {/* Sidebar */}
                  <div className="w-64 hidden md:block border-r border-[#333] pr-8">
                     <div className="w-10 h-10 bg-[#D4AF37] mb-12 rounded-lg" />
                     {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-[#222] rounded w-full mb-6" />)}
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                     <div className="flex justify-between items-end mb-12">
                        <div>
                           <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-2">Total Treasury Balance</p>
                           <h3 className="text-5xl text-white font-serif">$14,205,000.00</h3>
                        </div>
                        <button className="bg-[#D4AF37] text-black px-6 py-3 font-bold uppercase text-xs">New Wire</button>
                     </div>
                     <div className="grid grid-cols-3 gap-6 mb-12">
                        {[1,2,3].map(i => <div key={i} className="h-32 bg-[#111] border border-[#333] rounded-[2.5rem]" />)}
                     </div>
                     <div className="h-64 bg-[#111] border border-[#333] rounded-[2.5rem] flex items-end px-8 pb-0 gap-4">
                        {[40, 60, 35, 70, 50, 80, 65, 90, 75, 100].map((h, i) => (
                           <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-[#D4AF37] rounded-t-lg opacity-80" />
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. SOLUTIONS GRID */}
      <section className="py-32 bg-black border-t border-[#333]">
         <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
               <h2 className="text-4xl md:text-5xl font-serif text-white mb-20 text-center">Enterprise <span className="text-[#D4AF37]">Solutions.</span></h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-16">
               {[
                  { title: "Treasury Management", desc: "Maximize yield on idle cash with automated sweeps into money market funds." },
                  { title: "Payroll Solutions", desc: "Seamless integration with major payroll providers for instant, fee-free disbursement." },
                  { title: "Corporate Credit", desc: "Revolving lines of credit up to $50M backed by your receivables." },
                  { title: "Mergers & Acquisitions", desc: "Advisory services and bridge financing for strategic expansion." }
               ].map((sol, i) => (
                  <div key={i} className="flex gap-8 group p-8 border border-transparent hover:border-[#D4AF37] hover:bg-[#111] transition-all rounded-[2rem]">
                     <div className="w-16 h-16 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                        <Briefcase size={28} />
                     </div>
                     <div>
                        <h3 className="text-3xl font-serif text-white mb-4">{sol.title}</h3>
                        <p className="text-gray-500 leading-relaxed text-lg font-light">{sol.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <IntroFooter />
    </main>
  );
}
