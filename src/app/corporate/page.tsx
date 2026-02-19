'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Globe, TrendingUp, Building2, CreditCard, ArrowRight, Zap, ShieldCheck, Activity } from 'lucide-react';
import Link from 'next/link';

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
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
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

export default function CorporatePage() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 150]); // Parallax for background
  const yText = useTransform(scrollY, [0, 500], [0, 100]); // Parallax for text

  return (
    <main className="bg-[#050505] text-white w-full overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] md:h-screen flex items-center px-6 overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/50" />
        </motion.div>
        
        {/* Content */}
        <motion.div 
          style={{ y: yText }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto w-full pt-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
             <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
             <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Corporate Solutions</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-serif mb-8 leading-[0.85] tracking-tight">
            Liquidity <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">Engineered.</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg md:text-2xl leading-relaxed mb-10 max-w-2xl font-light">
            Optimize treasury operations with AI-driven cash flow management. 
            We provide the infrastructure for the next generation of global commerce.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6">
            <Link 
              href="/portal"
              className="group relative px-10 py-5 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.2em] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10 group-hover:text-black transition-colors">Open Account</span>
            </Link>
            
            <Link 
               href="/services"
               className="group flex items-center gap-3 px-8 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-colors"
            >
               <span>View API Docs</span>
               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative Grid */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none mask-image-gradient" />
      </section>

      {/* --- INFINITE TICKER --- */}
      <div className="w-full bg-[#D4AF37] py-3 overflow-hidden flex items-center">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap gap-12 text-black font-bold text-xs uppercase tracking-widest"
        >
          {[...Array(10)].map((_, i) => (
             <React.Fragment key={i}>
                <span className="flex items-center gap-2"><Activity size={14}/> Real-Time Settlement</span>
                <span className="flex items-center gap-2"><Globe size={14}/> 140+ Currencies</span>
                <span className="flex items-center gap-2"><ShieldCheck size={14}/> Institutional Custody</span>
             </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-20">
              <h2 className="text-3xl md:text-5xl font-serif mb-6">Global <span className="text-[#D4AF37] italic">Infrastructure</span></h2>
              <div className="h-[1px] w-full bg-white/10" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: <Globe size={32} />, 
                  title: "Treasury Management", 
                  desc: "Automated sweeping of idle cash into government money market funds to maximize yield." 
                },
                { 
                  icon: <TrendingUp size={32} />, 
                  title: "Global Payroll", 
                  desc: "Execute crypto and fiat payroll in 140+ countries with instant settlement and compliance." 
                },
                { 
                  icon: <CreditCard size={32} />, 
                  title: "Corporate Cards", 
                  desc: "High-limit virtual and physical metal cards with 0% FX fees and real-time expense tracking." 
                },
                { 
                  icon: <Zap size={32} />, 
                  title: "API Integration", 
                  desc: "Connect your ERP directly to VerdeStock's liquidity engine for programmatic money movement." 
                }
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  key={i}
                  className="group bg-[#111] p-8 border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-2"
                >
                   <div className="mb-6 text-gray-500 group-hover:text-[#D4AF37] transition-colors">{item.icon}</div>
                   <h3 className="text-xl font-serif mb-4 text-white group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                   <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* --- SPLIT VISUAL SECTION --- */}
      <section className="py-20 md:py-32 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative h-[500px] w-full rounded-[2rem] overflow-hidden group"
          >
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />
             <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
             
             {/* Floating Badge */}
             <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md p-6 border border-white/10 rounded-2xl">
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">Total Volume</p>
                <p className="text-3xl font-mono text-white">$4.2B+</p>
             </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-8"
          >
             <Building2 size={40} className="text-[#D4AF37]" />
             <h2 className="text-4xl md:text-6xl font-serif leading-none">
                The Operating System <br/> for <span className="text-[#D4AF37] italic">Modern Capital.</span>
             </h2>
             <p className="text-gray-400 text-lg leading-relaxed">
                Traditional banking stacks are slow, opaque, and fragmented. VerdeStock unifies banking, treasury, and payments into a single, programmable interface.
             </p>
             
             <ul className="space-y-4 mt-4">
                {['Multi-Entity Management', 'Real-time Audit Logs', 'Role-Based Access Control'].map((feat, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-mono border-b border-white/5 pb-2">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" /> {feat}
                   </li>
                ))}
             </ul>

             <div className="pt-6">
               <Link href="/portal" className="text-white border-b border-[#D4AF37] pb-1 hover:text-[#D4AF37] transition-colors uppercase text-xs tracking-widest font-bold">
                  Schedule a Demo
               </Link>
             </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
                  }
