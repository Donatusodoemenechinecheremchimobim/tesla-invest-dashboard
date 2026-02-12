#!/bin/bash

echo "🔧 RESTORING PERSONAL PAGE LINK & CHECKING ANIMATIONS..."

# ======================================================
# 1. FIX OLD SITE NAVBAR (Ensure 'Personal Page' is clear)
# ======================================================
cat << 'EOF' > src/components/landing/Navbar.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
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
        
        {/* LOGO -> Portal Home */}
        <Link href="/portal" className="flex items-center gap-2 group">
          <div className="bg-[#D4AF37] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Zap size={20} className="text-black fill-black" />
          </div>
          <span className="text-white font-serif font-bold text-xl tracking-wide">TESLA<span className="text-[#D4AF37]">INV</span></span>
        </Link>

        {/* OLD SITE LINKS */}
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
          <Link href="/portal/strategy" className="hover:text-[#D4AF37] transition-colors">Strategy</Link>
          <Link href="/portal/insurance" className="hover:text-[#D4AF37] transition-colors">Insurance</Link>
          <Link href="/portal/concierge" className="hover:text-[#D4AF37] transition-colors">Concierge</Link>
        </div>

        <div className="flex items-center gap-4">
          
          {user ? (
            <div className="flex items-center gap-4">
               {/* 🟢 RESTORED 'PERSONAL PAGE' BUTTON */}
               <Link 
                 href="/dashboard" 
                 className="hidden md:flex items-center gap-2 bg-[#D4AF37] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)]"
               >
                 <LayoutDashboard size={14} /> Personal Page
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden bg-[#111] overflow-hidden border-b border-white/10">
            <div className="flex flex-col p-6 gap-4">
               {user && (
                 <Link href="/dashboard" className="bg-[#D4AF37] text-black text-center py-3 rounded-lg font-bold uppercase tracking-widest mb-2" onClick={() => setIsOpen(false)}>
                   Go to Personal Page
                 </Link>
               )}
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

# ======================================================
# 2. ENSURE ANIMATIONS EXIST (Force Re-write to be safe)
# ======================================================

# Rocket Graph
cat << 'EOF' > src/components/landing/RocketGraph.tsx
'use client';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function RocketGraph() {
  return (
    <div className="relative w-full max-w-[350px] h-[350px] bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(212,175,55,0.1)]">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative w-full h-full p-8">
        <div className="absolute top-6 left-6">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Tesla Growth</p>
          <h3 className="text-3xl text-white font-serif mt-1">+420%</h3>
        </div>
        <svg className="absolute bottom-0 left-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient id="rocketGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" /><stop offset="100%" stopColor="#D4AF37" stopOpacity="0" /></linearGradient>
          </defs>
          <motion.path d="M0,350 Q100,300 175,200 T350,50 V350 H0 Z" fill="url(#rocketGradient)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} />
          <motion.path d="M0,350 Q100,300 175,200 T350,50" fill="none" stroke="#D4AF37" strokeWidth="3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
        </svg>
        <motion.div className="absolute" initial={{ offsetDistance: "0%" }} whileInView={{ offsetDistance: "100%" }} transition={{ duration: 2, ease: "easeInOut" }} style={{ offsetPath: "path('M0,350 Q100,300 175,200 T350,50')", offsetRotate: "auto" }}>
          <div className="relative -rotate-45 transform"> 
             <Rocket size={32} className="text-white fill-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
             <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.2 }} className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-6 bg-orange-500 rounded-full blur-[2px]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
EOF

# Signature Animation
cat << 'EOF' > src/components/landing/SignatureAnimation.tsx
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SignatureAnimation() {
  const [showSeal, setShowSeal] = useState(false);
  return (
    <div className="relative w-full max-w-[400px] h-[200px] flex items-center justify-center mx-auto my-12">
      <div className="absolute inset-0 bg-[#111] border border-[#333] rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] transform -rotate-2" />
      <div className="absolute inset-0 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl transform rotate-1 flex items-center justify-center overflow-hidden">
         <svg width="300" height="100" viewBox="0 0 300 100" className="overflow-visible">
            <motion.path d="M20,60 C40,50 50,80 60,60 C70,40 60,30 50,40 C40,50 60,70 80,60 C90,55 100,50 110,60 C120,70 130,50 140,60 L150,60 M160,50 L160,70 M170,60 C180,50 190,70 200,60 C210,50 220,60 230,60" fill="none" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} onAnimationComplete={() => setShowSeal(true)} />
         </svg>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5, duration: 2 }} className="text-5xl font-serif text-[#D4AF37] font-italic" style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}>TeslaInv.</motion.h2>
         </div>
         <motion.div initial={{ scale: 2, opacity: 0 }} animate={{ scale: showSeal ? 1 : 2, opacity: showSeal ? 1 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="absolute bottom-4 right-4 w-16 h-16 bg-red-800 rounded-full border-4 border-red-900 shadow-lg flex items-center justify-center rotate-12">
            <div className="w-12 h-12 border-2 border-red-900/50 rounded-full flex items-center justify-center"><span className="text-red-950 font-bold text-xs">TI</span></div>
         </motion.div>
      </div>
    </div>
  );
}
EOF

echo "✅ PERSONAL PAGE LINK RESTORED & ANIMATIONS CHECKED."