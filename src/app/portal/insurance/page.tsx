'use client';

import React, { useRef } from 'react';
import Navbar from '@/components/portal/PortalNavbar';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { 
  ShieldCheck, Lock, Fingerprint, Globe, 
  Server, ChevronRight, Activity, FileCheck 
} from 'lucide-react';
import Link from 'next/link';

// --- PREMIUM "VAULT" ANIMATION CURVES ---
const vaultCurve = [0.16, 1, 0.3, 1] as const; 

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: vaultCurve } }
};

const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: vaultCurve } }
};

export default function InsurancePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main ref={containerRef} className="bg-[#050505] text-white min-h-screen overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      {/* --- 1. CINEMATIC HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y: yParallax, opacity: opacityFade }} className="absolute inset-0 z-0">
          {/* Abstract dark vault/safe background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
        </motion.div>

        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="visible" 
          className="relative z-10 text-center max-w-5xl mx-auto px-6"
        >
          <motion.div variants={slideUp} className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.15)] relative">
               <ShieldCheck size={32} className="text-[#D4AF37]" />
               <div className="absolute inset-0 rounded-full border border-[#D4AF37] animate-ping opacity-20" />
            </div>
          </motion.div>
          
          <motion.h1 variants={slideUp} className="text-5xl sm:text-7xl md:text-[7rem] font-serif mb-6 leading-[0.9] tracking-tighter">
            Insured <br/><span className="text-[#D4AF37] italic">Excellence.</span>
          </motion.h1>
          
          <motion.p variants={slideUp} className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
            Absolute peace of mind. Your capital is protected by military-grade encryption and backed by our global clearing partners.
          </motion.p>
        </motion.div>
      </section>

      {/* --- 2. LIVE POLICY WIDGET (The "Black Card") --- */}
      <section className="py-12 md:py-24 px-6 max-w-4xl mx-auto relative z-20 mt-[-10vh]">
         <motion.div 
           initial="hidden" 
           whileInView="visible" 
           viewport={{ once: true }} 
           variants={fadeScale}
           className="bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden group"
         >
            {/* Ambient animated gradient inside the card */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

            <div className="relative z-10">
               <div className="flex justify-between items-start mb-12">
                  <div>
                     <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold mb-2">Live Status</p>
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                        <span className="font-mono text-green-500 text-sm tracking-widest">ACTIVE_POLICY_SECURE</span>
                     </div>
                  </div>
                  <ShieldCheck size={40} className="text-[#D4AF37] opacity-50" />
               </div>

               <div className="space-y-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 group/item">
                     <div>
                        <span className="block text-[11px] uppercase tracking-widest text-gray-500 mb-1">Insurance Provider</span>
                        <span className="text-xl md:text-2xl font-serif text-white group-hover/item:text-[#D4AF37] transition-colors">Tesla Assurance Corp</span>
                     </div>
                     <FileCheck className="text-gray-600 hidden md:block" size={20} />
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 group/item">
                     <div>
                        <span className="block text-[11px] uppercase tracking-widest text-gray-500 mb-1">Maximum Coverage Limit</span>
                        <span className="text-3xl md:text-5xl font-mono text-[#D4AF37] tracking-tight">$250,000.00</span>
                     </div>
                     <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 md:mt-0">Per Account</span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-end justify-between">
                     <div>
                        <span className="block text-[11px] uppercase tracking-widest text-gray-500 mb-1">Underwriting Entity</span>
                        <span className="text-lg font-serif text-gray-300">Lloyd's Syndicates (Global)</span>
                     </div>
                     <div className="flex items-center gap-2 mt-4 md:mt-0 text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <Lock size={12} />
                        <span className="text-[10px] uppercase tracking-widest font-bold">Encrypted Ledger</span>
                     </div>
                  </div>
               </div>
            </div>
         </motion.div>
      </section>

      {/* --- 3. THE ARCHITECTURE OF TRUST (Bento Grid) --- */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative">
         <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={staggerContainer}
            className="mb-20 text-center md:text-left"
         >
            <motion.h2 variants={slideUp} className="text-3xl md:text-5xl font-serif mb-6">The Architecture of <span className="text-[#D4AF37] italic">Trust.</span></motion.h2>
            <motion.p variants={slideUp} className="text-gray-400 text-lg max-w-2xl">Insurance is only as strong as the infrastructure holding it. We deploy a multi-layered fortress around your assets.</motion.p>
         </motion.div>

         <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer} 
            className="grid md:grid-cols-3 gap-6"
         >
            {[
               { icon: <Fingerprint size={28}/>, title: "Zero-Knowledge", desc: "Your identity and asset allocation are cryptographically shielded. Even we cannot access your private keys without your biometric signature." },
               { icon: <Server size={28}/>, title: "Cold Storage", desc: "98% of all physical and digital reserves are held in air-gapped, offline hardware vaults geographically distributed across Swiss bunkers." },
               { icon: <Globe size={28}/>, title: "Global Redundancy", desc: "Our ledgers are synchronized across 42 independent nodes globally. A single point of failure is mathematically impossible." }
            ].map((feature, idx) => (
               <motion.div 
                 key={idx} 
                 variants={slideUp} 
                 className="bg-[#111] border border-white/5 p-10 rounded-[2rem] hover:border-[#D4AF37]/40 transition-colors duration-500 group"
               >
                  <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center text-gray-500 mb-8 group-hover:text-[#D4AF37] group-hover:scale-110 transition-all duration-500">
                     {feature.icon}
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
               </motion.div>
            ))}
         </motion.div>
      </section>

      {/* --- 4. DATA VISUALIZATION SECTION --- */}
      <section className="py-24 md:py-32 px-6 bg-[#080808] border-y border-white/5 overflow-hidden">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={staggerContainer}
              className="order-2 lg:order-1"
            >
               <motion.div variants={slideUp} className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                  <Activity size={14} /> Real-Time Audit
               </motion.div>
               <motion.h2 variants={slideUp} className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                  Verifiable <br/><span className="text-gray-600">Reserves.</span>
               </motion.h2>
               <motion.p variants={slideUp} className="text-gray-400 text-lg leading-relaxed mb-8">
                  Trust is good, but mathematical proof is better. Our insurance policy is backed by publicly verifiable proof-of-reserves, audited quarterly by top-tier global accounting firms.
               </p>
               <motion.ul variants={staggerContainer} className="space-y-4">
                  {['SOC 2 Type II Certified', 'ISO 27001 Compliant', 'Quarterly Penetration Testing'].map((item, i) => (
                     <motion.li key={i} variants={slideUp} className="flex items-center gap-3 text-sm text-gray-300 font-mono">
                        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" /> {item}
                     </motion.li>
                  ))}
               </motion.ul>
            </motion.div>

            {/* Abstract Graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1.5, ease: vaultCurve }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 h-[400px] md:h-[500px] bg-[#111] rounded-[3rem] border border-white/5 relative overflow-hidden flex items-center justify-center"
            >
               <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
               
               {/* Animated Rings */}
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute w-96 h-96 border border-white/5 rounded-full" />
               <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute w-72 h-72 border border-white/10 rounded-full border-dashed" />
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-48 h-48 border border-[#D4AF37]/30 rounded-full" />
               
               <div className="w-24 h-24 bg-black border border-[#D4AF37] rounded-full z-10 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                  <ShieldCheck size={40} className="text-[#D4AF37]" />
               </div>
            </motion.div>
         </div>
      </section>

      {/* --- 5. BOTTOM CTA --- */}
      <section className="py-32 text-center px-6 relative">
         <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 to-transparent pointer-events-none" />
         <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={slideUp}
            className="relative z-10 max-w-2xl mx-auto"
         >
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Secure Your Legacy.</h2>
            <Link href="/portal" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
               Return to Dashboard <ChevronRight size={16} />
            </Link>
         </motion.div>
      </section>

    </main>
  );
                }
