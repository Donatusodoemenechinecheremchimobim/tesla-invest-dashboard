'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* REMOVED: border-b border-white/5 */}
      <nav 
        className={`fixed w-full z-[100] transition-all duration-500 
        ${isScrolled ? 'bg-black/95 py-4 shadow-lg' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-white tracking-tighter">
            VERDE<span className="text-[#D4AF37] italic font-light">STOCK</span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex space-x-8 items-center">
            {['Personal', 'Corporate', 'Services'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-[#D4AF37] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            <Link 
              href="/portal" 
              className="hidden sm:flex px-6 py-2 bg-[#D4AF37] text-black text-[10px] font-bold uppercase rounded-full hover:bg-white transition-colors"
            >
              InvestmentTesla
            </Link>
            
            <button className="md:hidden text-[#D4AF37]" onClick={() => setIsOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-black z-[200] p-8 flex flex-col"
          >
            <div className="flex justify-between mb-20 items-center">
              <span className="font-serif text-white text-xl font-bold">VERDE<span className="text-[#D4AF37] italic font-light">STOCK</span></span>
              <button onClick={() => setIsOpen(false)} className="p-2">
                <X size={32} className="text-[#D4AF37]" />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {['Personal', 'Corporate', 'Services', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)} 
                  className="text-4xl font-serif text-white uppercase italic hover:text-[#D4AF37] transition-colors"
                >
                  {item}
                </Link>
              ))}
              
              <Link 
                href="/portal" 
                onClick={() => setIsOpen(false)} 
                className="w-full py-4 bg-[#D4AF37] text-black text-center font-bold uppercase tracking-widest text-xs rounded-xl mt-4 active:scale-95 transition-transform"
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
