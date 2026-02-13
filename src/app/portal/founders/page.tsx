'use client';

import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { Users, Crown, Globe, Award, TrendingUp } from 'lucide-react';

export default function PortalFoundersPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
        {/* Ambient Gold Glow */}
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <Crown size={14} /> The Architects
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 tracking-wide">
            Visionaries of <span className="text-[#D4AF37]">Wealth.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Behind every transaction lies a century of combined financial expertise. 
            Meet the board members who steer the course of global capital.
          </p>
        </motion.div>
      </section>

      {/* FOUNDERS GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: "Alexander V.", role: "Chairman & CEO", icon: Globe, desc: "Former Head of Derivatives at a major Swiss bank. 20+ years in quantitative finance." },
              { name: "Sarah Jenkins", role: "Chief Investment Officer", icon: TrendingUp, desc: "Pioneered the 'Green Alpha' algorithm. Expert in sustainable high-frequency trading." },
              { name: "Dr. Wei Chen", role: "Head of AI Strategy", icon: Award, desc: "PhD in Machine Learning from MIT. Architect of our proprietary neural network." }
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="group bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-[#D4AF37]/50 transition-colors relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-32 bg-[#D4AF37]/5 rounded-full blur-3xl group-hover:bg-[#D4AF37]/10 transition-colors" />
                 
                 <div className="w-20 h-20 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:border-[#D4AF37] transition-colors relative z-10">
                    <member.icon size={32} className="text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                 </div>
                 
                 <h3 className="text-2xl font-serif font-bold text-white mb-1">{member.name}</h3>
                 <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">{member.role}</p>
                 <p className="text-gray-500 leading-relaxed text-sm">{member.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* BOARD MEMBERS LIST */}
      <section className="py-20 bg-[#0A0A0A] border-t border-white/5">
         <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-serif mb-12 text-center">Executive Board</h2>
            <div className="space-y-4">
               {[
                 "Jonathan P. - Director of Risk Management",
                 "Elena R. - Head of Global Compliance",
                 "Marcus T. - Chief Technology Officer",
                 "Olivia S. - Director of Private Client Relations"
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-[#111] rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-colors">
                    <span className="font-bold text-gray-300">{item.split(' - ')[0]}</span>
                    <span className="text-[#D4AF37] text-xs uppercase tracking-widest">{item.split(' - ')[1]}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </main>
  );
}
