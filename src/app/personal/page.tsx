'use client';
import LuxuryLoader from '@/components/ui/LuxuryLoader';
import Navbar from '@/components/landing/Navbar';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { CreditCard, Globe, Key, Star, Plane, Wine } from 'lucide-react';

export default function PersonalPage() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 800], [0, 15]);
  const y = useTransform(scrollY, [0, 800], [0, -100]);

  return (
    <main className="min-h-screen bg-[#020204] text-white selection:bg-[#D4AF37] selection:text-black relative">
      <LuxuryLoader />
      <Navbar />

      {/* --- HERO --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Color Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-[150px] animate-pulse-slow" />

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto px-6 items-center relative z-10 pt-20">
          
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-6 block">
              Private Client Services
            </span>
            <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 leading-none">
              Liquid <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F9E29C]">Luxury.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-md leading-relaxed font-light">
              Banking isn't just about storage. It's about <strong className="text-white">access</strong>. 
              From liquidity management to procuring rare assets, we handle the details while you handle the vision.
            </p>
            <div className="flex gap-6">
              <Link href="/auth" className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition duration-500 rounded-full shadow-lg hover:shadow-[#D4AF37]/50">
                Open Account
              </Link>
            </div>
          </motion.div>

          {/* 3D FLOATING CARD */}
          <motion.div style={{ rotateX: rotate, y: y }} className="perspective-1000">
             <div className="relative w-full aspect-[1.586] bg-black rounded-3xl border border-[#D4AF37]/50 shadow-[0_20px_100px_rgba(212,175,55,0.15)] overflow-hidden group hover:scale-105 transition-transform duration-700">
               {/* Card Texture */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-black to-[#0a0a0a]" />
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
               
               {/* Content */}
               <div className="relative z-10 p-10 flex flex-col justify-between h-full">
                 <div className="flex justify-between items-start">
                   <div className="text-2xl font-serif tracking-widest text-white">TESLA<span className="text-[#D4AF37] font-bold">BLACK</span></div>
                   <CreditCard className="text-[#D4AF37]" size={32} />
                 </div>
                 
                 <div>
                   <div className="text-[#D4AF37] font-mono text-2xl tracking-[0.25em] mb-6 drop-shadow-md">
                     **** **** **** 8842
                   </div>
                   <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-gray-500">
                     <span>Elon Reeve Musk</span>
                     <span>Infinite Limit</span>
                   </div>
                 </div>
               </div>
               
               {/* Holographic Shine */}
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- LIFESTYLE GRID (Colorful) --- */}
      <section className="py-32 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif text-white">Beyond Banking</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Your membership grants you access to a global network of luxury partners.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Globe, color: "text-blue-400", title: "Global FX", desc: "Spend in 180+ currencies with 0% fees. Real-time interbank rates." },
              { icon: Key, color: "text-[#D4AF37]", title: "Vault Storage", desc: "Physical gold and crypto custody in Swiss nuclear bunkers." },
              { icon: Plane, color: "text-purple-400", title: "Jet Charter", desc: "Priority booking on Gulfstream fleets via our concierge app." },
              { icon: Wine, color: "text-red-400", title: "Rare Access", desc: "Sourcing of vintage wines, art, and exclusive event entry." },
              { icon: Star, color: "text-yellow-400", title: "Concierge", desc: "24/7 dedicated lifestyle manager for travel and dining." },
              { icon: CreditCard, color: "text-white", title: "Metal Cards", desc: "Laser-etched titanium cards for you and your family." }
            ].map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="prism-card p-8 rounded-2xl group"
              >
                <s.icon className={`${s.color} mb-6 w-10 h-10 group-hover:scale-110 transition-transform`} />
                <h3 className="text-xl font-serif text-white mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black py-12 text-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">
        <p>© 2026 Investment Tesla Private Banking.</p>
      </footer>
    </main>
  );
}
