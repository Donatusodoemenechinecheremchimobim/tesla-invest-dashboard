'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Shield, Gem, Users } from 'lucide-react';

export default function PersonalPage() {
  return (
    <main className="bg-[#FAFAFA] text-[#1a1a1a] font-sans overflow-x-hidden selection:bg-[#059669] selection:text-white">
      <IntroNavbar />
      <WhatsAppBubble />

      <section className="relative h-[90vh] bg-[#020617] text-white flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1635237739576-9634d5885f81?q=80&w=2000" alt="Luxury" fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                 <Crown size={14} className="text-[#FFD700]" />
                 <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700]">Private Client Group</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight">Legacy <br/> <span className="text-[#059669]">Architecture.</span></h1>
              <p className="text-xl text-gray-400 max-w-lg mb-10 font-light leading-relaxed">Wealth is not just about accumulation; it is about preservation.</p>
              <Link href="/portal/auth" className="inline-flex items-center gap-4 bg-[#059669] px-10 py-5 rounded-full font-bold hover:bg-[#047857] transition-all">Request Private Access <ArrowRight /></Link>
           </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto">
         <div className="grid md:grid-cols-3 gap-8">
            {[{ icon: Gem, title: "Bespoke Portfolio", desc: "Algorithmic trading strategies." }, { icon: Shield, title: "Asset Protection", desc: "Offshore trusts and legal structures." }, { icon: Users, title: "Family Office", desc: "Generational wealth transfer." }].map((item, i) => (
               <div key={i} className="p-10 rounded-[2.5rem] bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-all h-full">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-[#059669] mb-8"><item.icon size={32} /></div>
                  <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
               </div>
            ))}
         </div>
      </section>
    </main>
  );
}
