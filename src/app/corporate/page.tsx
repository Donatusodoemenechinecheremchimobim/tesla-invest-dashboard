'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import IntroFooter from '@/components/intro/IntroFooter';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';

export default function CorporatePage() {
  return (
    <main className="bg-[#050505] text-[#E5E5E5] font-sans selection:bg-[#D4AF37] selection:text-black">
      <IntroNavbar />
      <WhatsAppBubble />
      
      {/* HERO - DARK CORPORATE BUILDING */}
      <section className="relative h-screen flex items-center bg-black border-b border-[#333]">
         <div className="absolute inset-0">
            <Image 
               src="https://images.pexels.com/photos/830891/pexels-photo-830891.jpeg" 
               alt="Corporate Night" 
               fill 
               className="object-cover opacity-30" 
            />
            {/* Darker Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
         </div>
         <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
               <span className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Verde Corporate Solutions</span>
               <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 text-white tracking-tight leading-none drop-shadow-2xl">
                  Liquidity <br/> <span className="text-[#D4AF37]">Engineered.</span>
               </h1>
               <p className="text-xl text-gray-300 mb-12 leading-relaxed font-light drop-shadow-md">
                  Optimize your company's treasury with AI-driven cash flow management, high-yield corporate accounts, and instant global payroll.
               </p>
               <div className="flex gap-4">
                  <Link href="/portal/" className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-10 py-5 font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                     Open Corporate Account <ArrowRight size={16} />
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>

      {/* SOLUTIONS GRID */}
      <section className="py-32 bg-black border-t border-[#333]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16">
               {[
                  { title: "Treasury Management", desc: "Maximize yield on idle cash with automated sweeps into money market funds." },
                  { title: "Payroll Solutions", desc: "Seamless integration with major payroll providers for instant, fee-free disbursement." },
                  { title: "Corporate Credit", desc: "Revolving lines of credit up to $50M backed by your receivables." },
                  { title: "Mergers & Acquisitions", desc: "Advisory services and bridge financing for strategic expansion." }
               ].map((sol, i) => (
                  <div key={i} className="flex gap-8 group p-8 border border-transparent hover:border-[#D4AF37] hover:bg-[#111] transition-all rounded-[3.5rem]">
                     <div className="w-16 h-16 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors rounded-full">
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
