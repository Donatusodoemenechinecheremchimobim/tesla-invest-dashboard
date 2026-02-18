'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // REMOVED 'Trading' from both lists
  const desktopLinks = ['Personal', 'Corporate', 'Services', 'Technology', 'Press'];
  const mobileLinks = ['Personal', 'Corporate', 'Services', 'Technology', 'Press', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed w-full z-[100] transition-all duration-500 
        ${isScrolled ? 'bg-black/95 py-4 shadow-lg' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* LOGO */}
          <Link href="/" className="text-xl font-serif font-bold text-white tracking-tighter shrink-0 z-50">
            VERDE<span className="text-[#D4AF37] italic font-light">STOCK</span>
          </Link>

          {/* DESKTOP LINKS (Hidden on Tablet/Mobile, Visible on Large Screens) */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {desktopLinks.map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-[#D4AF37] transition-colors whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            {/* Button hides on very small phones (xs), shows on sm+ */}
            <Link 
              href="/portal" 
              className="hidden sm:flex px-6 py-2 bg-[#D4AF37] text-black text-[10px] font-bold uppercase rounded-full hover:bg-white transition-colors whitespace-nowrap"
            >
              InvestmentTesla
            </Link>
            
            {/* HAMBURGER (Shows on Tablet & Mobile) */}
            <button className="lg:hidden text-[#D4AF37] p-1" onClick={() => setIsOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-black z-[200] p-8 flex flex-col overflow-y-auto"
          >
            {/* Mobile Header */}
            <div className="flex justify-between mb-10 items-center">
              <span className="font-serif text-white text-xl font-bold">VERDE<span className="text-[#D4AF37] italic font-light">STOCK</span></span>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-white/5 rounded-full">
                <X size={28} className="text-[#D4AF37]" />
              </button>
            </div>
            
            {/* Mobile Links List */}
            <div className="flex flex-col gap-6">
              {mobileLinks.map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)} 
                  className="text-3xl font-serif text-white uppercase italic hover:text-[#D4AF37] transition-colors border-b border-white/5 pb-2"
                >
                  {item}
                </Link>
              ))}
              
              <Link 
                href="/portal" 
                onClick={() => setIsOpen(false)} 
                className="w-full py-4 bg-[#D4AF37] text-black text-center font-bold uppercase tracking-widest text-xs rounded-xl mt-6 active:scale-95 transition-transform"
              >
                InvestmentTesla
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
