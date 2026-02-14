'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Shield } from 'lucide-react';

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
    // Fixed: Removed border-b to eliminate white/gold line
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-[#050505]/95 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <Shield className="text-[#D4AF37] fill-[#D4AF37]" size={28} />
          <span className="text-xl font-serif font-bold tracking-widest text-white">
            VERDE <span className="text-[#D4AF37]">STOCK</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-[11px] uppercase tracking-[0.25em] font-bold text-gray-300 hover:text-[#D4AF37] transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <Link href="/portal" className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest rounded hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            InvestmentTesla
          </Link>
        </div>

        <button className="md:hidden text-[#D4AF37]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-[#050505] z-[110] flex flex-col items-center justify-center space-y-8">
          <button className="absolute top-8 right-8 text-gray-400" onClick={() => setIsOpen(false)}><X size={32} /></button>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white hover:text-[#D4AF37]">{link.name}</Link>
          ))}
          <Link href="/portal" className="px-8 py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded mt-8">
            Access Portal
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
