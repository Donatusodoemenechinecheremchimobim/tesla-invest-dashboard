'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortalNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isDashboard = pathname.includes('/dashboard');

  const navLinks = [
    { name: 'Personal', href: '/portal/personal' },
    { name: 'Founders', href: '/portal/founders' },
    { name: 'Insurance', href: '/portal/insurance' },
  ];

  return (
    <nav className="fixed w-full z-[100] bg-black/90 backdrop-blur-xl border-b border-[#D4AF37]/10 py-4 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        
        {/* LOGO */}
        <Link href="/portal" className="text-lg md:text-2xl font-serif font-bold text-white shrink-0">
          INVESTMENT<span className="text-[#D4AF37] italic font-light">TESLA</span>
        </Link>
        
        {/* CENTER LINKS (Desktop) - Changed lg:flex to md:flex */}
        <div className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-[10px] uppercase tracking-[0.25em] font-bold transition-colors ${
                pathname === link.href ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-[#D4AF37]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          {!isDashboard ? (
            <Link href="/portal" className="px-5 py-2 bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg transition-transform active:scale-95">
              Access
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#D4AF37]/20 rounded-full bg-[#D4AF37]/5">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
                <span className="text-[9px] font-bold uppercase text-[#D4AF37]">Live</span>
              </div>
              <button 
                onClick={() => window.location.href = '/portal'} 
                className="p-2 bg-white/5 rounded-full text-white hover:bg-red-500/20 hover:text-red-500 transition-all"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
          
          {/* MOBILE MENU TOGGLE - Changed lg:hidden to md:hidden */}
          <button className="md:hidden text-[#D4AF37]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER - Changed lg:hidden to md:hidden */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }} 
            className="md:hidden bg-black border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className={`text-sm uppercase tracking-widest font-bold ${
                    pathname === link.href ? 'text-[#D4AF37]' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
