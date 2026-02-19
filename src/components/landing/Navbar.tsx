'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Ensure you have this import
import { Menu, X, ArrowRight, Globe, Shield, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const desktopLinks = ['About', 'Personal', 'Corporate', 'Services', 'Technology', 'Press'];
  const mobileLinks = ['About', 'Personal', 'Corporate', 'Services', 'Technology', 'Press', 'Contact'];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // --- ANIMATION VARIANTS ---
  const menuVars = {
    initial: { x: '100%' },
    animate: { 
      x: 0,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } // "Apple-style" smooth easing
    },
    exit: { 
      x: '100%',
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
  };

  const linkVars = {
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
    open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } }
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-[100] transition-all duration-500 border-b border-transparent
        ${isScrolled ? 'bg-black/80 backdrop-blur-xl py-4 border-white/5' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* --- LOGO --- */}
          <Link href="/" className="flex items-center gap-3 shrink-0 z-50 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
               {/* Make sure icon.png is in your public folder */}
               <Image 
                 src="/icon.png" 
                 alt="VerdeStock Logo" 
                 fill
                 className="object-contain group-hover:scale-110 transition-transform duration-300"
               />
            </div>
            <span className="text-lg md:text-xl font-serif font-bold text-white tracking-tighter">
              VERDE<span className="text-[#D4AF37] italic font-light">STOCK</span>
            </span>
          </Link>

          {/* --- DESKTOP LINKS (Hidden on Mobile) --- */}
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
          <div className="flex items-center gap-4">
            <Link 
              href="/portal" 
              className="hidden sm:flex px-6 py-2 bg-[#D4AF37] text-black text-[10px] font-bold uppercase rounded-full hover:bg-white transition-colors whitespace-nowrap shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              InvestmentTesla
            </Link>
            
            {/* Mobile Toggle */}
            <button 
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50" 
              onClick={() => setIsOpen(true)}
            >
              <Menu size={28} className="text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-[#050505] z-[200] flex flex-col h-screen w-screen origin-top"
          >
            {/* Close Button Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5">
               <div className="flex items-center gap-2 opacity-50">
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest text-white">Menu Active</span>
               </div>
               <button 
                onClick={() => setIsOpen(false)} 
                className="p-3 bg-white/5 rounded-full text-white hover:bg-white/10 hover:rotate-90 transition-all duration-300"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links Container */}
            <motion.div 
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col justify-center px-8 flex-1 gap-6"
            >
              {mobileLinks.map((item) => (
                <div key={item} className="overflow-hidden">
                  <motion.div variants={linkVars}>
                    <Link 
                      href={`/${item.toLowerCase()}`} 
                      onClick={() => setIsOpen(false)} 
                      className="group flex items-center justify-between"
                    >
                      <span className="text-5xl font-serif text-gray-400 group-hover:text-white group-hover:translate-x-4 transition-all duration-500 ease-out">
                        {item}
                      </span>
                      <ChevronRight className="text-[#D4AF37] opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" size={32} />
                    </Link>
                  </motion.div>
                </div>
              ))}
            </motion.div>

            {/* Footer Area */}
            <div className="p-8 bg-[#0a0a0a] border-t border-white/5">
               <Link 
                  href="/portal"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-5 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 mb-6 active:scale-95 transition-transform"
               >
                  Access Portal <ArrowRight size={16} />
               </Link>
               
               <div className="flex justify-between items-center text-gray-500 text-[10px] font-mono uppercase">
                  <div className="flex gap-4">
                     <span className="flex items-center gap-1"><Globe size={12}/> Global</span>
                     <span className="flex items-center gap-1"><Shield size={12}/> Secure</span>
                  </div>
                  <span>VerdeStock v2.4</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
