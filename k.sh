#!/bin/bash

echo "💎 RESTORING PERSONAL PAGE, FIXING INSURANCE, & CLEANING CONCIERGE..."

# ==========================================
# 0. ENSURE LUXURY LOADER EXISTS
# ==========================================
mkdir -p src/components/ui
cat << 'EOF' > src/components/ui/LuxuryLoader.tsx
'use client';
import { motion } from 'framer-motion';

export default function LuxuryLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
    </motion.div>
  );
}
EOF

# ==========================================
# 1. RESTORE THE "LIQUID LUXURY" PERSONAL PAGE
# ==========================================
mkdir -p src/app/portal/personal
cat << 'EOF' > src/app/portal/personal/page.tsx
'use client';

import LuxuryLoader from '@/components/ui/LuxuryLoader';
import Navbar from '@/components/landing/Navbar';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { CreditCard, Globe, Key, Star, Plane, Wine, ArrowRight } from 'lucide-react';

export default function PersonalPage() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 800], [0, 15]);
  const y = useTransform(scrollY, [0, 800], [0, -100]);

  return (
    <main className="min-h-screen bg-[#020204] text-white selection:bg-[#D4AF37] selection:text-black relative overflow-x-hidden">
      <LuxuryLoader />
      <Navbar />

      {/* --- HERO --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-[150px] animate-pulse" />

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
              <Link href="/auth" className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition duration-500 rounded-full shadow-lg hover:shadow-[#D4AF37]/50 flex items-center gap-2">
                Open Account <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div style={{ rotateX: rotate, y: y }} className="perspective-1000 hidden lg:block">
              <div className="relative w-full aspect-[1.586] bg-black rounded-3xl border border-[#D4AF37]/50 shadow-[0_20px_100px_rgba(212,175,55,0.15)] overflow-hidden group hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-black to-[#0a0a0a]" />
                <div className="relative z-10 p-10 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <div className="text-2xl font-serif tracking-widest text-white">TESLA<span className="text-[#D4AF37] font-bold">BLACK</span></div>
                    <CreditCard className="text-[#D4AF37]" size={32} />
                  </div>
                  <div>
                    <div className="text-[#D4AF37] font-mono text-2xl tracking-[0.25em] mb-6 drop-shadow-md">**** **** **** 8842</div>
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-gray-500">
                      <span>Private Member</span>
                      <span>Infinite Limit</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
          </motion.div>
        </div>
      </section>

      {/* --- LIFESTYLE GRID --- */}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-[#111] border border-white/5 p-8 rounded-2xl group hover:border-[#D4AF37]/30 transition-all"
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
EOF

# ==========================================
# 2. UPGRADE OLD INSURANCE PAGE (Animations + Button)
# ==========================================
cat << 'EOF' > src/app/portal/insurance/page.tsx
'use client';

import Navbar from '@/components/landing/Navbar';
import { ShieldCheck, Lock, CheckCircle, Ban, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OldInsurancePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
         >
            <div className="inline-block relative mb-8">
               <motion.div 
                 animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                 transition={{ repeat: Infinity, duration: 3 }}
                 className="absolute inset-0 bg-[#D4AF37] blur-[50px] rounded-full opacity-20"
               />
               <div className="relative p-8 rounded-full bg-[#111] border border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                  <ShieldCheck size={80} className="text-[#D4AF37]" />
               </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif mb-6 text-white">
              Principal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white">Protection</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
               The Secure Asset Fund for Users (SAFU) is backed by Tesla's $20B reserve. 
               We prioritize the safety of your capital above all else.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <Link href="/auth" className="inline-flex items-center gap-2 px-10 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-white transition-all">
                  Get Insured Now <ArrowRight size={18} />
               </Link>
            </motion.div>
         </motion.div>
      </section>

      {/* 2. COVERAGE GRID */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
         <div className="grid md:grid-cols-2 gap-12">
            
            <motion.div 
              initial={{ x: -50, opacity: 0 }} 
              whileInView={{ x: 0, opacity: 1 }} 
              className="bg-[#0a0a0a] border border-green-500/20 rounded-3xl p-10 relative overflow-hidden hover:border-green-500/50 transition-colors"
            >
               <div className="absolute top-0 right-0 p-4 bg-green-500/10 rounded-bl-2xl border-b border-l border-green-500/20">
                  <Shield size={24} className="text-green-500" />
               </div>
               <h3 className="text-2xl font-serif mb-6 text-white">Full Coverage</h3>
               <ul className="space-y-6">
                  {["Algorithmic Errors", "Flash Crash Events", "System Breaches", "Smart Contract Failures"].map((item, i) => (
                     <li key={i} className="flex items-start gap-4">
                        <CheckCircle size={18} className="text-green-500 mt-1 shrink-0" />
                        <span className="text-gray-300 text-sm">{item}</span>
                     </li>
                  ))}
               </ul>
            </motion.div>

            <motion.div 
               initial={{ x: 50, opacity: 0 }} 
               whileInView={{ x: 0, opacity: 1 }} 
               className="bg-[#0a0a0a] border border-red-500/20 rounded-3xl p-10 relative overflow-hidden hover:border-red-500/50 transition-colors"
            >
               <div className="absolute top-0 right-0 p-4 bg-red-500/10 rounded-bl-2xl border-b border-l border-red-500/20">
                  <Ban size={24} className="text-red-500" />
               </div>
               <h3 className="text-2xl font-serif mb-6 text-white">Liabilities</h3>
               <ul className="space-y-6">
                  {["Phishing Attacks", "Lost Passwords", "Shared Credentials", "Manual Overrides"].map((item, i) => (
                     <li key={i} className="flex items-start gap-4">
                        <Ban size={18} className="text-red-500 mt-1 shrink-0" />
                        <span className="text-gray-300 text-sm">{item}</span>
                     </li>
                  ))}
               </ul>
            </motion.div>

         </div>
      </section>
    </main>
  );
}
EOF

# ==========================================
# 3. FIX CONCIERGE (OLD SITE) - REMOVE EMAIL
# ==========================================
cat << 'EOF' > src/app/portal/concierge/page.tsx
'use client';

import Navbar from '@/components/landing/Navbar';
import { Phone, MessageCircle } from 'lucide-react';

export default function OldConciergePage() {
  const WA_NUMBER = "19803487946";
  const WA_LINK = `https://wa.me/${WA_NUMBER}`;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <div className="pt-32 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-serif mb-8 text-[#D4AF37]">VIP Concierge</h1>
        <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Our dedicated support team is available 24/7 to assist Diamond Tier members. 
          Connect directly via our secure lines.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
           {/* WHATSAPP */}
           <a href={WA_LINK} target="_blank" className="bg-[#111] p-10 rounded-2xl border border-white/10 hover:border-green-500/50 hover:bg-green-500/5 transition-all group cursor-pointer">
              <MessageCircle className="mx-auto text-green-500 mb-4 group-hover:scale-110 transition-transform" size={48} />
              <h3 className="font-bold text-xl mb-2 text-white">WhatsApp Priority</h3>
              <p className="text-gray-500 mb-4">Instant response within 2 minutes.</p>
              <span className="text-green-500 font-mono text-sm">+{WA_NUMBER}</span>
           </a>

           {/* PHONE */}
           <div className="bg-[#111] p-10 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-all group">
              <Phone className="mx-auto text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" size={48} />
              <h3 className="font-bold text-xl mb-2 text-white">Emergency Line</h3>
              <p className="text-gray-500 mb-4">For urgent portfolio actions.</p>
              <span className="text-[#D4AF37] font-mono text-sm">+1 (888) 4-DOJO-AI</span>
           </div>
        </div>
      </div>
    </main>
  );
}
EOF

# ==========================================
# 4. FIX CONCIERGE (NEW SITE) - REMOVE EMAIL
# ==========================================
cat << 'EOF' > src/app/contact/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { Phone, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const WA_NUMBER = "19803487946";
  const WA_LINK = `https://wa.me/${WA_NUMBER}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <IntroNavbar />
      <div className="pt-40 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-serif mb-8">Private Concierge</h1>
        <p className="text-gray-400 mb-16">
          Our VIP support team is available 24/7 for Diamond Tier members. 
          Please use your dedicated line for immediate assistance.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
           
           {/* WHATSAPP */}
           <a href={WA_LINK} target="_blank" className="bg-[#111] p-10 rounded-3xl border border-white/10 flex flex-col items-center hover:border-green-500/50 transition-colors cursor-pointer">
              <MessageCircle className="text-green-500 mb-4" size={32} />
              <h3 className="font-bold mb-2">WhatsApp</h3>
              <p className="text-gray-400 text-sm">+{WA_NUMBER}</p>
           </a>

           {/* PHONE */}
           <div className="bg-[#111] p-10 rounded-3xl border border-white/10 flex flex-col items-center">
              <Phone className="text-[#D4AF37] mb-4" size={32} />
              <h3 className="font-bold mb-2">Priority Line</h3>
              <p className="text-gray-400 text-sm">+1 (888) 4-DOJO-AI</p>
           </div>

           {/* HQ */}
           <div className="bg-[#111] p-10 rounded-3xl border border-white/10 flex flex-col items-center">
              <MapPin className="text-[#D4AF37] mb-4" size={32} />
              <h3 className="font-bold mb-2">HQ</h3>
              <p className="text-gray-400 text-sm">Austin, Texas</p>
           </div>
        </div>
      </div>
    </main>
  );
}
EOF

# ==========================================
# 5. FIX NAVBAR - ADD "PRIVATE CLIENT" LINK & CLOSE PROPERLY
# ==========================================
cat << 'EOF' > src/components/landing/Navbar.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Menu, X, LogOut, LayoutDashboard, Crown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/portal');
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link href="/portal" className="flex items-center gap-2 group">
          <div className="bg-[#D4AF37] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Zap size={20} className="text-black fill-black" />
          </div>
          <span className="text-white font-serif font-bold text-xl tracking-wide">TESLA<span className="text-[#D4AF37]">INV</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
          <Link href="/portal/personal" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-[#D4AF37]">
             <Crown size={12}/> Private Client
          </Link>
          <Link href="/portal/strategy" className="hover:text-[#D4AF37] transition-colors">Strategy</Link>
          <Link href="/portal/insurance" className="hover:text-[#D4AF37] transition-colors">Insurance</Link>
          <Link href="/portal/concierge" className="hover:text-[#D4AF37] transition-colors">Concierge</Link>
        </div>

        <div className="flex items-center gap-4">
          
          {user ? (
            <div className="flex items-center gap-4">
               <Link 
                 href="/dashboard" 
                 className="hidden md:flex items-center gap-2 bg-[#D4AF37] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)]"
               >
                 <LayoutDashboard size={14} /> Dashboard
               </Link>

               <button onClick={handleSignOut} className="hidden md:flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-[10px] font-bold uppercase tracking-widest">
                 Sign Out
               </button>
            </div>
          ) : (
            <Link href="/auth" className="hidden md:flex items-center gap-2 bg-[#D4AF37] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all">
              Login <ArrowRight size={14} />
            </Link>
          )}

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden bg-[#111] overflow-hidden border-b border-white/10">
            <div className="flex flex-col p-6 gap-4">
               {user && (
                 <Link href="/dashboard" className="bg-[#D4AF37] text-black text-center py-3 rounded-lg font-bold uppercase tracking-widest mb-2" onClick={() => setIsOpen(false)}>
                   Access Dashboard
                 </Link>
               )}
               <Link href="/portal/personal" className="text-[#D4AF37] hover:text-white font-bold" onClick={() => setIsOpen(false)}>Private Client</Link>
               <Link href="/portal/strategy" className="text-gray-400 hover:text-[#D4AF37]" onClick={() => setIsOpen(false)}>Strategy</Link>
               <Link href="/portal/insurance" className="text-gray-400 hover:text-[#D4AF37]" onClick={() => setIsOpen(false)}>Insurance</Link>
               <Link href="/portal/concierge" className="text-gray-400 hover:text-[#D4AF37]" onClick={() => setIsOpen(false)}>Concierge</Link>
               
               <div className="h-px bg-white/10 my-2" />
               
               {user ? (
                 <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="text-red-400 flex items-center gap-2 text-sm font-bold uppercase tracking-widest"><LogOut size={16} /> Sign Out</button>
               ) : (
                 <Link href="/auth" className="text-[#D4AF37] flex items-center gap-2 text-sm font-bold uppercase tracking-widest" onClick={() => setIsOpen(false)}>Login</Link>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
EOF

echo "✅ COMPLETE: Personal Page Restored, Insurance Upgraded, Concierge Cleaned, Navbar Fixed."