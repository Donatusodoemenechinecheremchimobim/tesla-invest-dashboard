'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Globe, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // ADDED 'About' to both lists
  const desktopLinks = ['About', 'Personal', 'Corporate', 'Services', 'Technology', 'Press'];
  const mobileLinks = ['About', 'Personal', 'Corporate', 'Services', 'Technology', 'Press', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav 
        className={`fixed w-full z-[100] transition-all duration-500 border-b border-transparent
        ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-white/5' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* LOGO */}
          <Link href="/" className="text-xl font-serif font-bold text-white tracking-tighter shrink-0 z-50">
            VERDE<span className="text-[#D4AF37] italic font-light">STOCK</span>
          </Link>

          {/* DESKTOP LINKS (Hidden on Tablet/Mobile) */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {desktopLinks.map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-[#D4AF37] transition-colors whitespace-nowrap font-medium"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            {/* CTA Button */}
            <Link 
              href="/portal" 
              className="hidden sm:flex px-6 py-2 bg-[#D4AF37] text-black text-[10px] font-bold uppercase rounded-full hover:bg-white transition-colors whitespace-nowrap shadow-[0_0_15px_rgba(212,175,55,0.15)]"
            >
              InvestmentTesla
            </Link>
            
            {/* HAMBURGER (Visible on Tablet & Mobile) */}
            <button 
              className="lg:hidden text-[#D4AF37] p-2 hover:bg-white/5 rounded-full transition-colors" 
              onClick={() => setIsOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* PROFESSIONAL MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: '100%' }} 
            transition={{ type: "tween", ease: "circOut", duration: 0.4 }}
            className="fixed inset-0 bg-[#050505] z-[200] flex flex-col"
          >
            {/* BACKGROUND ACCENT */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />

            {/* HEADER */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 relative z-10">
              <span className="font-serif text-white text-xl font-bold">
                VERDE<span className="text-[#D4AF37] italic font-light">STOCK</span>
              </span>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* LINKS SCROLL AREA */}
            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2 relative z-10">
              {mobileLinks.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    onClick={() => setIsOpen(false)} 
                    className="group flex items-center justify-between py-4 border-b border-white/5 hover:border-[#D4AF37]/30 transition-colors"
                  >
                    <span className="text-2xl font-serif text-gray-300 group-hover:text-white transition-colors">
                      {item}
                    </span>
                    <ArrowRight size={18} className="text-[#D4AF37] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* FOOTER ACTION AREA */}
            <div className="p-6 bg-[#0a0a0a] border-t border-white/5 relative z-10 space-y-4">
              <Link 
                href="/portal" 
                onClick={() => setIsOpen(false)} 
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors shadow-lg"
              >
                Access InvestmentTesla
              </Link>
              
              <div className="flex justify-between items-center px-2 pt-2">
                 <div className="flex gap-4">
                    <span className="text-gray-600 text-[10px] flex items-center gap-1"><Globe size={10}/> Global Access</span>
                    <span className="text-gray-600 text-[10px] flex items-center gap-1"><Shield size={10}/> Encrypted</span>
                 </div>
                 <span className="text-[10px] text-gray-700 font-serif">v2.4.0</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
