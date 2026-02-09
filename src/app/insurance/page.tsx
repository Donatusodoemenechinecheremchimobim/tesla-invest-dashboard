'use client';
import LuxuryLoader from '@/components/ui/LuxuryLoader';
import Navbar from '@/components/landing/Navbar';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Shield, Lock, Activity, Umbrella, ChevronRight, AlertTriangle } from 'lucide-react';

export default function InsurancePage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { y: 100, opacity: 0, scale: 0.9 },
    show: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <main className="min-h-screen bg-[#020204] text-white selection:bg-[#D4AF37] selection:text-black overflow-hidden relative">
      <LuxuryLoader />
      <Navbar />
      
      {/* VIBRANT BACKGROUND */}
      <div className="nebula-bg" />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px]" />
        <motion.div style={{ y: y1 }} className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px]" />

        <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }} 
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} 
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md mb-8">
              <Shield className="text-[#D4AF37] w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">Quantum Shield™ Active</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-serif mb-8 leading-[0.9]">
              WEALTH <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-[#D4AF37]">IMMORTALITY.</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              We don't just insure assets. We insure <strong className="text-white">probabilities.</strong> 
              Using predictive AI, we neutralize threats to your capital before they manifest in reality.
            </p>
            
            <Link href="/auth" className="group relative inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.4)]">
              <span>Activate Shield</span>
              <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black/20 transition">
                <ChevronRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- THREAT DETECTION GRID --- */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl font-serif mb-2 text-white">Coverage Protocols</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full" />
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              { 
                icon: Lock, 
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "hover:border-blue-500",
                title: "Digital Sovereignty", 
                desc: "Complete indemnity against quantum decryption, wallet draining, and identity theft up to $1B." 
              },
              { 
                icon: Activity, 
                color: "text-green-400",
                bg: "bg-green-500/10",
                border: "hover:border-green-500",
                title: "Bio-Legacy Defense", 
                desc: "Insurance for cryogenic suspension, DNA storage, and genetic sequencing for future generations." 
              },
              { 
                icon: AlertTriangle, 
                color: "text-red-400",
                bg: "bg-red-500/10",
                border: "hover:border-red-500",
                title: "Geopolitical Shield", 
                desc: "Asset extraction teams on standby in 140 countries. We move your gold when governments fail." 
              },
              { 
                icon: Umbrella, 
                color: "text-[#D4AF37]",
                bg: "bg-yellow-500/10",
                border: "hover:border-[#D4AF37]",
                title: "Hyper-Climate", 
                desc: "AI triggers instant payouts for real estate based on satellite weather data. No claims process needed." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={item}
                className={`prism-card p-10 rounded-3xl ${item.border} group`}
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`${item.color} w-8 h-8`} />
                </div>
                <h3 className="text-3xl font-serif text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm tracking-wide mb-8">{item.desc}</p>
                
                <Link href="/auth" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                  Review Policy <ChevronRight size={12} className="text-[#D4AF37]" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Assets Secured", val: "$142B" },
            { label: "Claim Time", val: "0.04s" },
            { label: "Global Agents", val: "4,200" },
            { label: "Solvency Ratio", val: "99.9%" }
          ].map((s, i) => (
            <div key={i}>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{s.val}</h3>
              <p className="text-[#D4AF37] text-xs uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-black py-12 text-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">
        <p>© 2026 Investment Tesla Insurance Ltd.</p>
      </footer>
    </main>
  );
}
