'use client';

import Navbar from '@/components/landing/Navbar';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Crown, Globe, Award, TrendingUp, Zap } from 'lucide-react';

export default function PortalFoundersPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* 1. CHIEF ARCHITECT SECTION (ELON MUSK) */}
      <section className="pt-40 pb-10 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Circular Profile - Always in Color */}
          <div className="relative w-48 h-48 mb-8">
            <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37] border-dashed animate-spin-slow opacity-50" />
            <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg" 
                alt="Chief Architect" 
                fill 
                className="object-cover transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#D4AF37] p-2 rounded-full text-black shadow-lg">
               <Zap size={20} fill="black" />
            </div>
          </div>

          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-2">Chief Architect</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tighter">ELON MUSK</h1>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed italic">
            "The future of global capital belongs to those who dare to architect it with absolute precision."
          </p>
        </motion.div>
      </section>

      {/* 2. EXECUTIVE BOARD GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
         <div className="text-center mb-16">
           <h2 className="text-2xl font-serif text-gray-400 uppercase tracking-widest">Executive Council</h2>
         </div>
         
         <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: "Alexander V.", role: "Managing Director", icon: Globe, desc: "Specializes in quantitative arbitrage and risk mitigation." },
              { name: "Sarah Jenkins", role: "CIO", icon: TrendingUp, desc: "Architect of the Green Alpha algorithmic core." },
              { name: "Dr. Wei Chen", role: "Head of AI", icon: Award, desc: "Leading our proprietary neural network development." }
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-[#D4AF37]/50 transition-colors relative"
              >
                 <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-6 border border-white/10">
                    <member.icon size={28} className="text-[#D4AF37]" />
                 </div>
                 <h3 className="text-xl font-serif font-bold text-white mb-1">{member.name}</h3>
                 <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-4">{member.role}</p>
                 <p className="text-gray-500 leading-relaxed text-sm">{member.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* 3. ADVISORY LIST */}
      <section className="py-20 bg-[#0A0A0A] border-t border-white/5">
         <div className="max-w-4xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-4">
               {[
                 "Jonathan P. - Strategy",
                 "Elena R. - Compliance",
                 "Marcus T. - Tech Ops",
                 "Olivia S. - Relations"
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-5 bg-[#111] rounded-xl border border-white/5">
                    <span className="font-bold text-gray-400 text-sm">{item.split(' - ')[0]}</span>
                    <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest">{item.split(' - ')[1]}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </main>
  );
}
