#!/bin/bash
cat << 'EOF' > src/components/landing/Navbar.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "portal_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/portal/auth";
  };

  const navLinks = [
    { name: 'Personal', href: '/portal/personal' },
    { name: 'Strategy', href: '/portal/strategy' },
    { name: 'Insurance', href: '/portal/insurance' },
    { name: 'Founders', href: '/portal/founders' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-20 lg:h-24 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/portal" className="text-white font-bold text-lg lg:text-xl tracking-tighter shrink-0">
          <span className="uppercase tracking-[0.2em] lg:tracking-[0.3em] font-black text-[#D4AF37]">InvestmentTesla</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/dashboard" className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#D4AF37]/40 px-5 py-2 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all">
            Dashboard
          </Link>
          <button onClick={handleLogout} className="text-gray-500 hover:text-white transition-colors">
            <LogOut size={18} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden bg-black border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]"
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-white/5" />
          <Link href="/dashboard" className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em]">
            Dashboard
          </Link>
          <button onClick={handleLogout} className="text-red-500 text-left text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
EOF