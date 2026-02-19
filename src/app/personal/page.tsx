'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Shield, Lock, Award, ArrowDown, ChevronRight, Fingerprint } from 'lucide-react';
import Link from 'next/link';

// --- FIXED TYPING HERE (Added ': Variants') ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export default function PersonalPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); 
  const y2 = useTransform(scrollY, [0, 500], [0, -150]); 

  return (
    <main className="bg-[#050505] text-white overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          style={{ y: y2, scale: 1.1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635236066708-542115dc2d6a?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        </motion.div>
        
        {/* Hero Content */}
        <motion.div 
          style={{ y: y1 }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-[#D4AF37]/50" />
            <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">
              Private Client Group
            </span>
            <div className="h-[1px] w-12 bg-[#D4AF37]/50" />
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif mb-8 leading-[0.9] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
            Legacy <br /> <span className="italic font-light text-white">Architecture.</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-gray-400 text-sm md:text-xl leading-relaxed mb-12 max-w-2xl px-4 font-light">
            Wealth is not merely accumulation; it is preservation, transfer, and impact. 
            We construct digital fortresses around your capital.
          </motion.p>
          
          <motion.div variants={fadeInUp}>
            <Link 
              href="/portal" 
              className="group relative inline-flex items-center gap-4 px-12 py-5 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-white"
            >
              <span className="relative z-10">Request Access</span>
              <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1, y: [0, 10, 0] }} 
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-widest text-gray-500">Explore</span>
          <ArrowDown className="text-[#D4AF37]" size={20} />
        </motion.div>
      </section>
      
      {/* --- SERVICES GRID --- */}
      <section className="py-24 md:py-40 px-6 max-w-[1400px] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-32 text-center"
        >
           <h2 className="text-3xl md:text-5xl font-serif mb-6">The <span className="text-[#D4AF37] italic">Garrison</span> Protocol</h2>
           <p className="text-gray-500 max-w-2xl mx-auto">Our proprietary framework for high-net-worth individuals ensures that your assets are not just stored, but strategically fortified.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Trust Structures", 
              desc: "Multi-generational planning and tax-efficient vehicle deployment designed for fluid succession.", 
              icon: <Shield strokeWidth={1} size={40} /> 
            },
            { 
              title: "Physical Allocation", 
              desc: "Direct ownership of allocated gold and silver bullion stored in non-bank Swiss and Singaporean vaults.", 
              icon: <Lock strokeWidth={1} size={40} /> 
            },
            { 
              title: "Concierge Access", 
              desc: "24/7 dedicated wealth manager access via encrypted signal lines for immediate liquidity events.", 
              icon: <Award strokeWidth={1} size={40} /> 
            },
          ].map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              key={i} 
              className="group relative bg-[#0a0a0a] p-10 md:p-14 rounded-[2px] border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white mb-8 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif mb-6 group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FEATURE HIGHLIGHT --- */}
      <section className="py-20 px-6 border-t border-white/5 bg-[#080808]">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
               <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-8">
                  <Fingerprint size={14} /> Biometric Security
               </div>
               <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                  Identity is the <br/> <span className="text-[#D4AF37] italic">Ultimate Key.</span>
               </h2>
               <p className="text-gray-400 leading-relaxed mb-8">
                  We don't rely on passwords. VerdeStock employs military-grade biometric verification for all high-value withdrawals and portfolio restructuring. Your voice, your face, and your fingerprint are the only keys we accept.
               </p>
               <Link href="/portal" className="text-white border-b border-[#D4AF37] pb-1 hover:text-[#D4AF37] transition-colors uppercase text-xs tracking-widest font-bold">
                  Review Security Protocols
               </Link>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative h-[400px] md:h-[600px] bg-[url('https://images.unsplash.com/photo-1614064641938-3bcee529cfae?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center rounded-[2rem] overflow-hidden filter grayscale hover:grayscale-0 transition-all duration-700"
            >
               <div className="absolute inset-0 bg-black/40 hover:bg-transparent transition-colors duration-500" />
               <div className="absolute bottom-8 left-8">
                  <p className="text-white font-mono text-xs">SECURE_NODE_04</p>
                  <p className="text-[#D4AF37] font-mono text-xs">STATUS: LOCKED</p>
               </div>
            </motion.div>
         </div>
      </section>

      <Footer />
    </main>
  );
              }
