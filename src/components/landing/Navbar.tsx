'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/95 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 items-center">
        
        {/* LEFT: VERDESTOCK LOGO */}
        <div className="flex justify-start">
          <Link href="/" className="text-xl md:text-2xl font-serif font-bold tracking-tighter text-white whitespace-nowrap">
            VERDE<span className="text-[#D4AF37] italic font-light">STOCK</span>
          </Link>
        </div>

        {/* CENTER: INTERNAL NAVIGATION */}
        <div className="hidden md:flex justify-center items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-[#D4AF37] transition-all whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* RIGHT: PORTAL ACCESS (NOW /PORTAL) */}
        <div className="flex justify-end items-center gap-4">
          <Link 
            href="/portal" 
            className="hidden md:flex items-center gap-2 px-8 py-2.5 bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <Globe size={14} />
            <span>Open Account</span>
          </Link>

          <button className="md:hidden text-[#D4AF37]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-[110] flex flex-col items-center justify-center space-y-10">
          <button className="absolute top-8 right-8 text-white" onClick={() => setIsOpen(false)}><X size={32} /></button>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className="text-2xl font-serif text-white uppercase tracking-widest hover:text-[#D4AF37]"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/portal" 
            onClick={() => setIsOpen(false)} 
            className="text-2xl font-serif text-[#D4AF37] uppercase tracking-widest border border-[#D4AF37] px-10 py-3 rounded-full"
          >
            Open Account
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
