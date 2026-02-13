#!/bin/bash

echo "💎 CREATING FOUNDERS PAGE FOR PORTAL & UPDATING NAVBAR..."

# ======================================================
# 1. CREATE THE FOUNDERS PAGE (Black & Gold Theme)
# ======================================================
mkdir -p src/app/portal/founders
cat << 'EOF' > src/app/portal/founders/page.tsx
'use client';

import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { Users, Crown, Globe, Award, TrendingUp } from 'lucide-react';

export default function PortalFoundersPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
        {/* Ambient Gold Glow */}
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <Crown size={14} /> The Architects
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 tracking-wide">
            Visionaries of <span className="text-[#D4AF37]">Wealth.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Behind every transaction lies a century of combined financial expertise. 
            Meet the board members who steer the course of global capital.
          </p>
        </motion.div>
      </section>

      {/* FOUNDERS GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: "Alexander V.", role: "Chairman & CEO", icon: Globe, desc: "Former Head of Derivatives at a major Swiss bank. 20+ years in quantitative finance." },
              { name: "Sarah Jenkins", role: "Chief Investment Officer", icon: TrendingUp, desc: "Pioneered the 'Green Alpha' algorithm. Expert in sustainable high-frequency trading." },
              { name: "Dr. Wei Chen", role: "Head of AI Strategy", icon: Award, desc: "PhD in Machine Learning from MIT. Architect of our proprietary neural network." }
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="group bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-[#D4AF37]/50 transition-colors relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-32 bg-[#D4AF37]/5 rounded-full blur-3xl group-hover:bg-[#D4AF37]/10 transition-colors" />
                 
                 <div className="w-20 h-20 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:border-[#D4AF37] transition-colors relative z-10">
                    <member.icon size={32} className="text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                 </div>
                 
                 <h3 className="text-2xl font-serif font-bold text-white mb-1">{member.name}</h3>
                 <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">{member.role}</p>
                 <p className="text-gray-500 leading-relaxed text-sm">{member.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* BOARD MEMBERS LIST */}
      <section className="py-20 bg-[#0A0A0A] border-t border-white/5">
         <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-serif mb-12 text-center">Executive Board</h2>
            <div className="space-y-4">
               {[
                 "Jonathan P. - Director of Risk Management",
                 "Elena R. - Head of Global Compliance",
                 "Marcus T. - Chief Technology Officer",
                 "Olivia S. - Director of Private Client Relations"
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-[#111] rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-colors">
                    <span className="font-bold text-gray-300">{item.split(' - ')[0]}</span>
                    <span className="text-[#D4AF37] text-xs uppercase tracking-widest">{item.split(' - ')[1]}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </main>
  );
}
EOF

# ======================================================
# 2. UPDATE NAVBAR (Add Founders Link)
# ======================================================
cat << 'EOF' > src/components/landing/Navbar.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Menu, X, LayoutDashboard, Crown, Users } from 'lucide-react';
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
    router.push('/portal/auth');
    router.refresh();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <Link href="/portal" className="flex items-center gap-2 group z-50">
            <div className="bg-[#D4AF37] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <Zap size={20} className="text-black fill-black" />
            </div>
            <span className="text-white font-serif font-bold text-xl tracking-wide">
              INVESTMENT<span className="text-[#D4AF37]">TESLA</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            <Link href="/portal/founders" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
               <Users size={12}/> Founders
            </Link>
            <Link href="/portal/personal" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-[#D4AF37]">
               <Crown size={12}/> Private Client
            </Link>
            <Link href="/portal/strategy" className="hover:text-[#D4AF37] transition-colors">Strategy</Link>
            <Link href="/portal/insurance" className="hover:text-[#D4AF37] transition-colors">Insurance</Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                 <Link href="/dashboard" className="flex items-center gap-2 bg-[#D4AF37] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all">
                   <LayoutDashboard size={14} /> Dashboard
                 </Link>
                 <button onClick={handleSignOut} className="text-gray-400 hover:text-red-500 text-[10px] font-bold uppercase tracking-widest">
                   Sign Out
                 </button>
              </div>
            ) : (
              <Link href="/portal/auth" className="hidden md:flex items-center gap-2 bg-[#D4AF37] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all">
                Login <ArrowRight size={14} />
              </Link>
            )}

            {/* Mobile Toggle Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white z-50 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden flex flex-col gap-6"
          >
            <Link href="/portal/founders" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white border-b border-white/10 pb-4">Founders</Link>
            <Link href="/portal/personal" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white border-b border-white/10 pb-4">Private Client</Link>
            <Link href="/portal/strategy" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white border-b border-white/10 pb-4">Strategy</Link>
            <Link href="/portal/insurance" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white border-b border-white/10 pb-4">Insurance</Link>
            
            <div className="mt-8">
              {user ? (
                 <Link href="/dashboard" onClick={() => setIsOpen(false)} className="w-full block bg-[#D4AF37] text-black text-center py-4 rounded-xl font-bold uppercase tracking-widest">
                   Access Dashboard
                 </Link>
              ) : (
                 <Link href="/portal/auth" onClick={() => setIsOpen(false)} className="w-full block bg-[#D4AF37] text-black text-center py-4 rounded-xl font-bold uppercase tracking-widest">
                   Client Login
                 </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
EOF

echo "✅ FOUNDERS PAGE ADDED & NAVBAR UPDATED."