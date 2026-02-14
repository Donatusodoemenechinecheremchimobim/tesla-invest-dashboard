'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import IntroFooter from '@/components/intro/IntroFooter';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Shield, Gem, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PersonalPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className="bg-[#050505] text-[#E5E5E5] font-sans overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      <IntroNavbar />
      <WhatsAppBubble />
      
      {/* HERO - DARKER OVERLAY & SMOOTHER IMAGE */}
      <section className="relative h-screen flex items-center overflow-hidden bg-black border-b border-[#333]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.pexels.com/photos/5998132/pexels-photo-5998132.jpeg" 
            alt="Luxury Abstract" 
            fill 
            className="object-cover opacity-40" 
          />
          {/* Increased Overlay Opacity for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/70 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1 border border-[#D4AF37] mb-8 rounded-full bg-black/60 backdrop-blur-md shadow-lg">
                 <Crown size={12} className="text-[#D4AF37]" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Private Client Group</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight text-white drop-shadow-xl">
                 Legacy <br/> <span className="text-[#D4AF37]">Architecture.</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg mb-10 font-light leading-relaxed border-l-2 border-[#D4AF37] pl-6 drop-shadow-md">
                 Wealth is not just about accumulation; it is about preservation, transfer, and impact. We build fortresses around your capital.
              </p>
              <Link href="/portal/" className="inline-flex items-center gap-4 bg-[#D4AF37] text-black px-10 py-5 font-bold uppercase tracking-widest hover:bg-white transition-all rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                 Request Access <ArrowRight size={16}/>
              </Link>
           </motion.div>
        </div>
      </section>

      {/* 3 PILLARS */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-[#050505]">
         <div className="grid md:grid-cols-3 gap-8">
            {[
               { icon: Gem, title: "Bespoke Portfolio", desc: "Algorithmic strategies tailored to your specific timeline." }, 
               { icon: Shield, title: "Asset Protection", desc: "Offshore trusts and legal structures designed for immunity." }, 
               { icon: Users, title: "Family Office", desc: "Generational wealth transfer and philanthropic planning." }
            ].map((item, i) => (
               <div key={i} className="p-10 bg-[#111] border border-[#333] hover:border-[#D4AF37] transition-all h-full rounded-[3rem] group">
                  <div className="w-16 h-16 bg-[#D4AF37] flex items-center justify-center text-black mb-8 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                     <item.icon size={32} />
                  </div>
                  <h3 className="text-3xl font-serif text-white mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-lg font-light leading-relaxed">{item.desc}</p>
               </div>
            ))}
         </div>
      </section>
      <IntroFooter />
    </main>
  );
}
