'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight, Globe, Shield, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const desktopLinks = ['About', 'Personal', 'Corporate', 'Services', 'Technology', 'Press'];
  const mobileLinks = ['About', 'Personal', 'Corporate', 'Services', 'Technology', 'Press', 'Contact'];

  // Handle Scroll Transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock Body Scroll when Menu is Open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
  }, [isOpen]);

  // --- ANIMATION VARIANTS ---
  const menuVariants: Variants = {
    closed: { 
      y: "-100%",
      transition: { type: "spring", stiffness: 400, damping: 40, mass: 1 }
    },
    open: { 
      y: "0%",
      transition: { type: "spring", stiffness: 400, damping: 40, staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const linkVariants: Variants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b border-transparent
        ${isScrolled ? 'bg-[#050505]/90 backdrop-blur-md py-4 border-white/5' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* --- MAIN LOGO --- */}
          <Link href="/" className="flex items-center gap-3 shrink-0 z-[110] group relative" onClick={() => setIsOpen(false)}>
            <div className="relative w-8 h-8 md:w-10 md:h-10">
               <Image src="/favicon.ico" alt="VerdeStock" fill className="object-contain" priority />
            </div>
            <span className="text-lg md:text-xl font-serif font-bold text-white tracking-tighter">
              VERDE<span className="text-[#D4AF37] italic font-light">STOCK</span>
            </span>
          </Link>

          {/* --- DESKTOP LINKS --- */}
          <div className="hidden lg:flex items-center space-x-8">
            {desktopLinks.map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-[#D4AF37] transition-colors whitespace-nowrap font-medium relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* --- RIGHT ACTIONS --- */}
          <div className="flex items-center gap-4 z-[110]">
            <Link 
              href="/portal" 
              className="hidden sm:flex px-6 py-2 bg-[#D4AF37] text-black text-[10px] font-bold uppercase rounded-full hover:bg-white transition-colors whitespace-nowrap"
            >
              InvestmentTesla
            </Link>
            
            {/* MOBILE HAMBURGER */}
            <button 
              className="lg:hidden p-2 text-white hover:text-[#D4AF37] transition-colors" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-[#050505] z-[100] flex flex-col h-[100dvh] w-screen origin-top will-change-transform"
          >
            {/* 1. CLICKABLE BACKDROP (Closes menu if you tap empty space) */}
            <div className="absolute inset-0 z-0" onClick={() => setIsOpen(false)} />
            
            {/* 2. BACKGROUND TEXTURE */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none z-0" />

            {/* 3. MENU CONTENT CONTAINER (z-10 ensures it sits above backdrop) */}
            <div className="flex flex-col h-full relative z-10 pt-24 pb-10 px-6">
              
              {/* MOBILE HEADER (Duplicate Logo for "Home" Navigation) */}
              <div className="absolute top-6 left-6 flex items-center gap-2" onClick={() => setIsOpen(false)}>
                 <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                 <span className="text-[10px] uppercase tracking-widest text-white/50">Navigation</span>
              </div>

              {/* SCROLLABLE LINKS */}
              <div className="flex-1 flex flex-col justify-center space-y-6 overflow-y-auto">
                {mobileLinks.map((item) => (
                  <motion.div key={item} variants={linkVariants} className="overflow-hidden">
                    <Link 
                      href={`/${item.toLowerCase()}`} 
                      onClick={() => setIsOpen(false)} // <--- CRITICAL FIX: Closes menu on click
                      className="group flex items-center justify-between border-b border-white/5 pb-4"
                    >
                      <span className="text-4xl md:text-5xl font-serif text-gray-400 group-hover:text-white transition-colors duration-300">
                        {item}
                      </span>
                      <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black transition-all duration-300">
                         <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* MOBILE FOOTER CTA */}
              <motion.div variants={linkVariants} className="mt-8 bg-[#111] p-6 rounded-[2rem] border border-white/5">
                 <Link 
                    href="/portal"
                    onClick={() => setIsOpen(false)} // <--- CRITICAL FIX
                    className="w-full py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 mb-4 active:scale-95 transition-transform"
                 >
                    InvestmentTesla<ChevronRight size={16} />
                 </Link>
                 
                 <div className="flex justify-between items-center text-gray-500 text-[10px] font-mono uppercase">
                    <div className="flex gap-4">
                       <span className="flex items-center gap-1"><Globe size={12}/> Global</span>
                       <span className="flex items-center gap-1"><Shield size={12}/> Secure</span>
                    </div>
                    <span>v2.4</span>
                 </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
