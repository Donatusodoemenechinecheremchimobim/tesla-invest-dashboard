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
    <nav className="fixed w-full z-[100] bg-black/90 backdrop-blur-xl border-b border-[#D4AF37]/10 py-4 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/portal" className="text-lg md:text-2xl font-serif font-bold text-white shrink-0">
          INVESTMENT<span className="text-[#D4AF37] italic font-light">TESLA</span>
        </Link>
        
        {/* CENTER LINKS (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
          {['Personal', 'Founders', 'Insurance'].map((item) => (
            <Link key={item} href={`/portal/${item.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 hover:text-[#D4AF37]">
              {item}
            </Link>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          {!isDashboard ? (
            <Link href="/dashboard" className="px-5 py-2 bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg transition-transform active:scale-95">
              Access
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#D4AF37]/20 rounded-full bg-[#D4AF37]/5">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
                <span className="text-[9px] font-bold uppercase text-[#D4AF37]">Live</span>
              </div>
              <Link href="/portal" className="p-2 bg-white/5 rounded-full text-white">
                <LogOut size={16} />
              </Link>
            </div>
          )}
          <button className="lg:hidden text-[#D4AF37]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-black border-t border-white/5 overflow-hidden">
            <div className="flex flex-col p-6 gap-6">
              {['Personal', 'Founders', 'Insurance'].map((item) => (
                <Link key={item} href={`/portal/${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-sm uppercase tracking-widest text-white">{item}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
