'use client';
import React, { useRef } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { 
  Cpu, Server, Zap, Globe, Lock, BarChart3, 
  Code2, Network, Terminal, Database, ShieldCheck, Layers 
} from 'lucide-react';
import Link from 'next/link';

// --- ANIMATION VARIANTS ---
const smoothReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerGrid: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

export default function TechnologyPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main ref={containerRef} className="bg-[#050505] text-white w-full overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* --- HERO SECTION: THE ENGINE --- */}
      <section className="relative h-[120vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Cinematic Background */}
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050505]/80 to-[#050505]" />
        </motion.div>

        {/* Floating Code/Data Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           <motion.div 
             animate={{ y: [-100, 1000] }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute left-[10%] top-0 text-[#D4AF37]/10 font-mono text-xs"
           >
              01010101010101010101 <br/>
              SYSTEM_INIT_SEQ_001 <br/>
              01001011010100010101
           </motion.div>
           <motion.div 
             animate={{ y: [-200, 1200] }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             className="absolute right-[10%] top-0 text-[#D4AF37]/10 font-mono text-xs text-right"
           >
              ENCRYPTION_KEY_SHA256 <br/>
              VERDE_CORE_V4_ACTIVE <br/>
              11001010101011010101
           </motion.div>
        </div>

        {/* Content */}
        <motion.div 
          variants={smoothReveal}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl w-full text-center mt-[-10vh]"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5 mb-8 backdrop-blur-md">
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]" />
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">System Status: Operational</span>
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[11rem] font-serif mb-6 leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600">
            NEURAL <br /> CORE.
          </h1>
          
          <p className="text-gray-400 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed mb-12">
            VerdeStock is not just a platform; it is a proprietary predictive engine processing <span className="text-white font-bold">400TB</span> of market data daily.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 pt-8">
             {[
               { label: "Latency", val: "< 0.4ms" },
               { label: "Uptime", val: "99.999%" },
               { label: "Encryption", val: "AES-256" },
               { label: "Throughput", val: "100k TPS" }
             ].map((stat, i) => (
               <div key={i} className="text-center">
                 <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
                 <p className="text-2xl md:text-3xl font-mono text-white">{stat.val}</p>
               </div>
             ))}
          </div>
        </motion.div>
      </section>

      {/* --- STICKY SCROLL SECTION: THE ARCHITECTURE --- */}
      <section className="relative py-32 px-6 border-y border-white/5 bg-[#080808]">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
            {/* Visual Side */}
            <div className="relative h-[600px] lg:h-[800px] w-full rounded-[2rem] overflow-hidden border border-white/10 group sticky top-24">
               {/* Animated Grid Background */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
               
               {/* Image Layer */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef526b01201b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" />
               
               {/* Overlay Data */}
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
               
               <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
                     <div>
                        <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1">Active Nodes</p>
                        <p className="text-4xl font-mono text-white">8,421</p>
                     </div>
                     <ActivityGraph />
                  </div>
                  <div className="flex gap-4 text-[10px] text-gray-500 font-mono uppercase">
                     <span>Region: Global</span>
                     <span>Load: 42%</span>
                     <span>Temp: Optimal</span>
                  </div>
               </div>
            </div>

            {/* Text Side */}
            <div className="space-y-32 py-10">
               {[
                  {
                     title: "Predictive Analytics",
                     icon: <BarChart3 className="text-[#D4AF37]" size={32} />,
                     desc: "We don't just react to the market; we model its future state. Our Neural Core V4 ingests sentiment analysis, order book depth, and macro-economic indicators to predict volatility vectors before they happen."
                  },
                  {
                     title: "Quantum-Resistant",
                     icon: <ShieldCheck className="text-[#D4AF37]" size={32} />,
                     desc: "Security built for the next decade. We utilize lattice-based cryptography to future-proof your assets against next-generation decryption attacks. Your wealth is secured by math, not just passwords."
                  },
                  {
                     title: "Global Mesh Network",
                     icon: <Globe className="text-[#D4AF37]" size={32} />,
                     desc: "Distributed redundancy across London, Tokyo, Singapore, and New York. If one node goes dark, the network self-heals instantly, ensuring zero downtime for critical transactions."
                  }
               ].map((item, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-20%" }}
                     transition={{ duration: 0.8 }}
                  >
                     <div className="w-16 h-16 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center mb-6">
                        {item.icon}
                     </div>
                     <h2 className="text-3xl md:text-5xl font-serif mb-6">{item.title}</h2>
                     <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* --- SPECS GRID (BENTO STYLE) --- */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
           <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Technical Specifications</h2>
           <h3 className="text-4xl md:text-6xl font-serif">Under the Hood</h3>
        </div>

        <motion.div 
           variants={staggerGrid}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]"
        >
           {/* LARGE CARD */}
           <motion.div variants={smoothReveal} className="lg:col-span-2 lg:row-span-2 bg-[#111] rounded-[2rem] p-10 border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-700" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                 <div className="p-4 bg-black/50 backdrop-blur w-fit rounded-xl border border-white/10">
                    <Cpu size={32} className="text-[#D4AF37]" />
                 </div>
                 <div>
                    <h4 className="text-3xl font-serif mb-4">Processing Power</h4>
                    <p className="text-gray-400 leading-relaxed">Leveraging FPGA-accelerated execution engines to process arbitrage opportunities across 40+ exchanges simultaneously.</p>
                 </div>
              </div>
           </motion.div>

           {/* MEDIUM CARDS */}
           {[
              { icon: <Zap/>, title: "Green Compute", desc: "100% renewable energy data centers." },
              { icon: <Server/>, title: "Mirror Storage", desc: "Triple-redundant data sharding." },
              { icon: <Lock/>, title: "Cold Storage", desc: "Air-gapped hardware vaults." },
              { icon: <Network/>, title: "API First", desc: "Webhooks for real-time events." },
           ].map((card, i) => (
              <motion.div 
                key={i} 
                variants={smoothReveal}
                className="bg-[#0a0a0a] rounded-[2rem] p-8 border border-white/5 flex flex-col justify-between hover:border-[#D4AF37]/30 transition-colors group"
              >
                 <div className="flex justify-between items-start">
                    <div className="text-gray-500 group-hover:text-[#D4AF37] transition-colors">{card.icon}</div>
                    <span className="text-[10px] font-mono text-gray-700">SPEC_0{i+1}</span>
                 </div>
                 <div>
                    <h4 className="text-xl font-serif mb-2 text-white group-hover:text-[#D4AF37] transition-colors">{card.title}</h4>
                    <p className="text-sm text-gray-500">{card.desc}</p>
                 </div>
              </motion.div>
           ))}

           {/* WIDE CARD */}
           <motion.div variants={smoothReveal} className="lg:col-span-2 bg-[#D4AF37] rounded-[2rem] p-8 flex items-center justify-between text-black relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="relative z-10">
                 <h4 className="text-2xl font-serif font-bold mb-2">Developer Documentation</h4>
                 <p className="text-black/70 text-sm max-w-sm">Access our SDKs, API keys, and sandbox environment to build on top of VerdeStock.</p>
              </div>
              <div className="relative z-10 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                 <Terminal size={20} />
              </div>
           </motion.div>

        </motion.div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-32 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 to-transparent pointer-events-none" />
         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-5xl md:text-8xl font-serif mb-10">Future Proof.</h2>
            <Link 
               href="/portal" 
               className="inline-block px-12 py-5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] transition-colors duration-300"
            >
               Deploy Capital
            </Link>
         </div>
      </section>

      <Footer />
    </main>
  );
}

// --- MICRO COMPONENT: SIMPLE GRAPH ---
function ActivityGraph() {
   return (
      <div className="flex items-end gap-1 h-8">
         {[40, 70, 45, 90, 60, 80, 50, 95].map((h, i) => (
            <motion.div 
               key={i}
               initial={{ height: "20%" }}
               animate={{ height: `${h}%` }}
               transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
               className="w-1 bg-[#D4AF37]"
            />
         ))}
      </div>
   )
                     }
