'use client';

import React, { useRef } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MoneyTree from '@/components/animations/MoneyTree'; 
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { 
  Leaf, Users, History, Target, Award, 
  Globe, ArrowRight, Sparkles, Scale 
} from 'lucide-react';
import Link from 'next/link';

// --- CINEMATIC ANIMATIONS ---
const revealText: Variants = {
  hidden: { y: "100%" },
  visible: { 
    y: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // --- UPDATED TEAM DATA WITH UNIQUE IMAGES ---
  const teamMembers = [
    { 
      role: "Founder & CEO", 
      name: "Alexander V.", 
      spec: "Ex-Goldman Sachs / Quant",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" // Professional Man
    },
    { 
      role: "Head of AI", 
      name: "Dr. Elena R.", 
      spec: "PhD Neural Networks",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2669&auto=format&fit=crop" // Professional Woman
    },
    { 
      role: "Chief Security", 
      name: "Marcus T.", 
      spec: "Ex-NSA Cybersecurity",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop" // Tech/Security Lead
    }
  ];

  return (
    <main ref={containerRef} className="bg-[#050505] text-white w-full overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* --- SECTION 1: THE ORIGIN (Cinematic Hero) --- */}
      <section className="relative h-[110vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto mt-[-10vh]">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            className="overflow-hidden mb-6 flex justify-center"
          >
             <motion.div variants={revealText} className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5 backdrop-blur-md text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em]">
                <Leaf size={12} /> Since 2024
             </motion.div>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1 
              variants={revealText} 
              initial="hidden" 
              animate="visible"
              className="text-6xl sm:text-8xl md:text-[10rem] font-serif font-bold leading-[0.85] tracking-tight"
            >
              Rooted in
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h1 
              variants={revealText} 
              initial="hidden" 
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-6xl sm:text-8xl md:text-[10rem] font-serif font-bold leading-[0.85] tracking-tight text-[#D4AF37] italic"
            >
              Excellence.
            </motion.h1>
          </div>

          <motion.p 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed"
          >
            We started with a simple seed of an idea: What if institutional-grade wealth generation wasn't just for Wall Street, but accessible to the modern visionary?
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1, y: [0, 10, 0] }} 
           transition={{ delay: 1, duration: 2, repeat: Infinity }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
           <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </motion.div>
      </section>

      {/* --- SECTION 2: THE MONEY TREE (Holographic Containment) --- */}
      <section className="py-32 px-6 relative bg-[#080808] border-t border-white/5">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Visual Side: The Hologram */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative h-[600px] w-full rounded-[3rem] bg-[#0a0a0a] border border-white/5 flex items-center justify-center overflow-hidden group"
            >
               {/* Grid Background */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent_70%)]" />
               
               {/* The Component */}
               <div className="relative z-10 scale-125 md:scale-150 grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <MoneyTree />
               </div>

               {/* UI Overlays */}
               <div className="absolute top-8 left-8">
                  <p className="text-[#D4AF37] font-mono text-xs uppercase tracking-widest">Simulation_Active</p>
                  <p className="text-white font-mono text-xs">Asset_Growth_Protocol_V4</p>
               </div>
               <div className="absolute bottom-8 right-8 text-right">
                  <p className="text-white text-3xl font-mono">+128.4%</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">Proj. APY</p>
               </div>
            </motion.div>

            {/* Text Side */}
            <motion.div 
               variants={staggerContainer}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="space-y-16"
            >
               <div className="space-y-6">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20">
                     <History size={24} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif">The <span className="text-[#D4AF37] italic">Genesis.</span></h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                     Founded in 2024, <span className="text-white font-bold">VerdeStock</span> began as a black-box research unit specializing in sustainable algorithmic trading. We realized that by focusing on high-liquidity, volatility-neutral markets, we could engineer consistent returns without the chaos of traditional speculation.
                  </p>
               </div>

               <div className="space-y-6">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20">
                     <Target size={24} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif">The <span className="text-[#D4AF37] italic">Objective.</span></h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                     To democratize institutional wealth. We believe financial sovereignty is a right. Our platform bridges the gap between quantum-grade technology and daily profit realization.
                  </p>
               </div>
            </motion.div>
         </div>
      </section>

      {/* --- SECTION 3: THE TIMELINE (Horizontal Scroll Feel) --- */}
      <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#111] to-transparent pointer-events-none" />
         
         <div className="max-w-7xl mx-auto">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mb-20"
            >
               <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Our Trajectory</h2>
               <h3 className="text-5xl md:text-7xl font-serif">Milestones</h3>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 relative">
               {/* Connecting Line */}
               <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/50 to-[#D4AF37]/0" />

               {[
                  { year: "2023", title: "Inception", desc: "VerdeStock algorithms enter beta testing with $50M seed capital." },
                  { year: "2024", title: "Public Launch", desc: "Platform opens to private investors. $1B AUM reached in Q3." },
                  { year: "2025", title: "Global Scale", desc: "Expansion into Dubai & Singapore. Release of Neural Core V4." },
                  { year: "2026", title: "The Future", desc: "Full banking license acquisition and real-world asset tokenization." }
               ].map((item, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.2, duration: 0.8 }}
                     viewport={{ once: true }}
                     className="relative pt-12 group"
                  >
                     <div className="w-4 h-4 bg-[#050505] border-2 border-[#D4AF37] rounded-full absolute top-[42px] left-0 md:left-1/2 md:-translate-x-1/2 z-10 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_15px_#D4AF37]" />
                     <h4 className="text-6xl font-serif text-[#111] group-hover:text-[#D4AF37]/20 transition-colors duration-500 absolute -top-4 left-0 select-none">
                        {item.year}
                     </h4>
                     <div className="relative z-10 pl-6 md:pl-0 md:text-center mt-6">
                        <h5 className="text-2xl font-bold mb-3 text-white">{item.title}</h5>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* --- SECTION 4: THE ARCHITECTS (Team) --- */}
      <section className="py-32 px-6 bg-[#0a0a0a] border-t border-white/5">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
               <span className="inline-block py-2 px-6 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest mb-6">
                  Leadership
               </span>
               <h2 className="text-5xl md:text-8xl font-serif">The Architects</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {teamMembers.map((member, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.2, duration: 0.8 }}
                     viewport={{ once: true }}
                     className="group relative h-[500px] rounded-[2rem] overflow-hidden bg-[#111] border border-white/5 hover:border-[#D4AF37] transition-all duration-500"
                  >
                     {/* Image Placeholder with Abstract Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#0a0a0a] to-[#D4AF37]/20" />
                     <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                         {/* UNIQUE IMAGE FOR EACH MEMBER */}
                         <div 
                           className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" 
                           style={{ backgroundImage: `url('${member.image}')` }}
                         />
                     </div>

                     {/* Overlay Information */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                     
                     <div className="absolute bottom-0 left-0 w-full p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="w-12 h-1 bg-[#D4AF37] mb-6 w-0 group-hover:w-12 transition-all duration-500" />
                        <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">{member.role}</p>
                        <h3 className="text-3xl font-serif text-white mb-2">{member.name}</h3>
                        <p className="text-gray-500 font-mono text-xs">{member.spec}</p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* --- SECTION 5: GLOBAL FOOTPRINT (Stats) --- */}
      <section className="py-20 px-6 bg-[#D4AF37] text-black">
         <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-black/10">
            {[
               { label: "Assets Under Mgmt", val: "$1.2B+" },
               { label: "Active Investors", val: "14,500+" },
               { label: "Countries Served", val: "42" },
               { label: "Quarterly Returns", val: "18.4%" }
            ].map((stat, i) => (
               <div key={i} className="pt-8 md:pt-0 px-4">
                  <h3 className="text-4xl md:text-5xl font-serif font-bold mb-2">{stat.val}</h3>
                  <p className="text-black/60 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
               </div>
            ))}
         </div>
      </section>

      <Footer />
    </main>
  );
                          }
