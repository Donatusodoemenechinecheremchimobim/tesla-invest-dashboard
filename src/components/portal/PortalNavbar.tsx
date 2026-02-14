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
