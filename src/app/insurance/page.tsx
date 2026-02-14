'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import IntroFooter from '@/components/intro/IntroFooter';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Umbrella, Lock, ArrowRight } from 'lucide-react';

const GoldImage = ({ src, alt }: any) => (
  <div className="relative w-full h-full overflow-hidden">
    <Image src={src} alt={alt} fill className="object-cover" />
    <div className="absolute inset-0 bg-[#D4AF37] mix-blend-overlay opacity-30" />
    <div className="absolute inset-0 bg-black/40" />
  </div>
);

export default function InsurancePage() {
  return (
    <main className="bg-[#050505] text-[#E5E5E5] font-sans selection:bg-[#D4AF37] selection:text-black">
      <IntroNavbar />
      <WhatsAppBubble />
      
      {/* 1. HERO */}
      <section className="relative h-[80vh] flex items-center bg-black border-b border-[#333]">
         <div className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000" alt="Insurance" fill className="object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
         </div>
         <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
               <span className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Verde Risk Management</span>
               <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 text-white">
                  Total <br/> <span className="text-[#D4AF37]">Protection.</span>
               </h1>
               <p className="text-xl text-gray-400 max-w-lg mb-12 leading-relaxed font-light">
                  Comprehensive coverage for your life, assets, and legacy. From kidnapping insurance to art preservation.
               </p>
               <Link href="/portal/" className="inline-flex items-center gap-4 bg-[#D4AF37] text-black px-10 py-5 font-bold uppercase tracking-widest hover:bg-white transition-all">
                  Get a Quote <ArrowRight size={16}/>
               </Link>
            </motion.div>
         </div>
      </section>

      {/* 2. INSURANCE GRID */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <div className="grid md:grid-cols-3 gap-8">
            {[
               { icon: Shield, title: "Life & Health", desc: "Premium international health coverage and term life policies up to $50M." },
               { icon: Umbrella, title: "Asset Protection", desc: "Coverage for yachts, aircraft, real estate, and fine art collections." },
               { icon: Lock, title: "Cyber Security", desc: "Identity theft protection and digital asset recovery services." }
            ].map((item, i) => (
               <div key={i} className="p-10 bg-[#111] border border-[#333] hover:border-[#D4AF37] transition-all h-[500px] flex flex-col justify-between group rounded-[3rem]">
                  <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-black mb-8"><item.icon size={32} /></div>
                  <div>
                     <h3 className="text-4xl font-serif text-white mb-4">{item.title}</h3>
                     <p className="text-gray-500 text-lg font-light leading-relaxed">{item.desc}</p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      <IntroFooter />
    </main>
  );
}
