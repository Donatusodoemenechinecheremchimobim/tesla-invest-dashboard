#!/bin/bash

# 1. UPDATING PORTAL NAVBAR WITH SMART AUTH & SIGN OUT
cat << 'EOF' > src/components/portal/PortalNavbar.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UserPlus, Menu, X, Activity, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortalNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isDashboard = pathname.includes('/dashboard');

  return (
    <nav className="fixed w-full z-[100] bg-black/80 backdrop-blur-md border-b border-[#D4AF37]/10 py-5 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 items-center">
        
        {/* LEFT: LOGO */}
        <div className="flex justify-start">
          <Link href="/portal" className="text-xl md:text-2xl font-serif font-bold tracking-tighter text-white">
            INVESTMENT<span className="text-[#D4AF37] italic font-light">TESLA</span>
          </Link>
        </div>
        
        {/* CENTER: NAV LINKS */}
        <div className="hidden md:flex justify-center items-center space-x-8">
          {['Personal', 'Founders', 'Insurance'].map((item) => (
            <Link 
              key={item} 
              href={`/portal/${item.toLowerCase()}`} 
              className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 hover:text-[#D4AF37] transition-all"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* RIGHT: SMART ACTIONS */}
        <div className="flex justify-end items-center gap-4">
          {!isDashboard ? (
            <>
              <Link href="/dashboard" className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#D4AF37]">
                <UserPlus size={14} />
                <span>Open Account</span>
              </Link>
              <Link href="/dashboard" className="flex items-center gap-2 px-6 py-2.5 bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5">
                <Activity size={14} className="text-[#D4AF37] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Live Terminal</span>
              </div>
              {/* SIGN OUT BUTTON - Only on Dashboard */}
              <Link href="/portal" className="p-2.5 bg-white/5 border border-white/10 rounded-full text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all">
                <LogOut size={16} />
              </Link>
            </div>
          )}
          
          <button className="md:hidden text-[#D4AF37]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-[#D4AF37]/20 p-8 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {['Personal', 'Founders', 'Insurance'].map((item) => (
              <Link key={item} href={`/portal/${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-xl font-serif text-white uppercase italic">
                {item}
              </Link>
            ))}
            <Link href={isDashboard ? "/portal" : "/dashboard"} onClick={() => setIsOpen(false)} className="w-full py-4 bg-[#D4AF37] text-black text-center font-bold rounded-xl">
              {isDashboard ? "SIGN OUT" : "ACCESS DASHBOARD"}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
EOF

# 2. FIXING CONTACT PAGE FLOATING BUBBLES
cat << 'EOF' > src/app/contact/page.tsx
'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { MessageSquare, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-serif mb-8 tracking-tighter">Get in <span className="text-[#D4AF37] italic underline decoration-white/10">Touch.</span></h1>
        <p className="text-gray-400 max-w-lg mx-auto mb-20 font-light text-lg">Our institutional desk is available 24/7 for verified equity partners.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
           <div className="bg-[#0a0a0a] p-12 rounded-[3rem] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
              <MessageSquare className="text-[#D4AF37] mb-6 mx-auto group-hover:scale-110 transition-transform" size={48} />
              <h3 className="text-2xl font-serif mb-2 text-white">Secure Chat</h3>
              <p className="text-gray-500 text-sm">Encrypted P2P terminal messaging.</p>
           </div>
           <div className="bg-[#0a0a0a] p-12 rounded-[3rem] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
              <Phone className="text-[#D4AF37] mb-6 mx-auto group-hover:scale-110 transition-transform" size={48} />
              <h3 className="text-2xl font-serif mb-2 text-white">Priority Line</h3>
              <p className="text-gray-500 text-sm">Direct institutional voice link.</p>
           </div>
        </div>
      </section>

      {/* STACKED BUBBLES: WHATSAPP ON TOP */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-[9999]">
        {/* WhatsApp (Green) */}
        <a 
          href="https://wa.me/YOUR_NUMBER" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-all"
        >
          <Phone size={28} className="text-white fill-white" />
        </a>
        
        {/* Message (Gold) */}
        <button className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-110 active:scale-95 transition-all">
          <MessageSquare size={28} className="text-black" />
        </button>
      </div>

      <Footer />
    </main>
  );
}
EOF