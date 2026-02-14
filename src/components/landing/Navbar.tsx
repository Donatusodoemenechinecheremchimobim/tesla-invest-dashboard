'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Personal', href: '/personal' },
    { name: 'Corporate', href: '/corporate' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-black/95 py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 items-center">
          
          {/* LOGO */}
          <div className="flex justify-start">
            <Link href="/" className="text-xl md:text-2xl font-serif font-bold tracking-tighter text-white whitespace-nowrap">
              VERDE<span className="text-[#D4AF37] italic font-light">STOCK</span>
            </Link>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex justify-center items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-[#D4AF37] transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* RIGHT ACTIONS */}
          <div className="flex justify-end items-center gap-4">
            <Link 
              href="/portal" 
              className="hidden md:flex items-center gap-2 px-8 py-2.5 bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <Globe size={14} />
              <span>Open Account</span>
            </Link>

            {/* MOBILE MENU TOGGLE */}
            <button 
              className="md:hidden text-[#D4AF37] p-2 hover:bg-white/5 rounded-lg transition-colors" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[110] flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-serif font-bold text-white tracking-tighter">
                VERDE<span className="text-[#D4AF37] italic font-light">STOCK</span>
              </span>
              <button onClick={() => setIsOpen(false)} className="text-[#D4AF37]">
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className="text-3xl font-serif text-white uppercase tracking-widest hover:text-[#D4AF37] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <Link 
                href="/portal" 
                onClick={() => setIsOpen(false)} 
                className="w-full text-center py-5 bg-[#D4AF37] text-black text-xs font-black uppercase tracking-widest rounded-full shadow-lg"
              >
                Open Account
              </Link>
            </div>
            
            <div className="mt-auto border-t border-white/10 pt-8">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Institutional Access Only</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
