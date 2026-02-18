'use client';

import Navbar from '@/components/landing/Navbar'; 
import Footer from '@/components/landing/Footer'; 
import MoneyTree from '@/components/animations/MoneyTree';
import { motion } from 'framer-motion';
import { Leaf, Users, History, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-8">
            <Leaf size={14} /> Our Origins
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-white tracking-tight">
            Rooted in <span className="text-[#D4AF37] italic">Trust.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-16 font-light">
            We started with a simple seed of an idea: 
            What if high-frequency trading wasn't just for Wall Street, but for everyone?
          </p>
        </motion.div>

        {/* THE MONEY TREE ANIMATION */}
        <div className="mb-24">
           <MoneyTree />
           <p className="text-xs text-[#D4AF37] mt-4 font-mono uppercase tracking-widest">Simulating Asset Growth Protocol...</p>
        </div>

        {/* STORY GRID */}
        <div className="grid md:grid-cols-2 gap-12 text-left">
           <div className="bg-[#111] p-8 rounded-[2rem] border border-white/5 hover:border-[#D4AF37] shadow-none hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all">
              <History className="text-[#D4AF37] mb-6" size={32} />
              <h3 className="text-2xl font-serif font-bold mb-4">The Beginning</h3>
              
              {/* CORRECTED: Uses "VerdeStock" here */}
              <p className="text-gray-500 leading-relaxed text-sm">
                 Founded in 2024, <span className="text-white font-bold">VerdeStock</span> began as a specialized research unit in sustainable algorithmic trading. 
                 We realized that by focusing on stable, high-liquidity markets, we could generate consistent returns without the chaos.
              </p>
           </div>
           
           <div className="bg-[#111] p-8 rounded-[2rem] border border-white/5 hover:border-[#D4AF37] shadow-none hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all">
              <Target className="text-[#D4AF37] mb-6" size={32} />
              <h3 className="text-2xl font-serif font-bold mb-4">The Mission</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                 To democratize wealth generation. We believe financial freedom is a right, not a privilege. 
                 Our platform bridges the gap between complex tech and simple, daily profits.
              </p>
           </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 bg-black border-t border-white/5">
         <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif font-bold mb-12">Cultivated by Experts</h2>
            <div className="grid md:grid-cols-3 gap-8">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="group relative overflow-hidden rounded-[2rem] aspect-square bg-[#111] border border-white/5 hover:border-[#D4AF37]/50 transition-colors">
                    {/* Placeholder for Team Images */}
                    <div className="absolute inset-0 flex items-center justify-center text-[#D4AF37]/20 group-hover:text-[#D4AF37] transition-colors">
                       <Users size={48} />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-8 text-left">
                       <h4 className="text-white font-bold text-lg">Executive Member</h4>
                       <p className="text-[#D4AF37] text-[10px] uppercase tracking-wider font-bold mt-1">Strategy & Growth</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>
      <Footer />
    </main>
  );
}
