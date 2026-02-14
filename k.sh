#!/bin/bash
cat << 'EOF' > src/components/landing/Navbar.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const handleLogout = () => {
    document.cookie = "portal_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/portal/auth";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-10 h-24 flex items-center justify-between">
        <div className="flex items-center gap-14">
          {/* Brand link leads to your portal environment */}
          <Link href="/portal" className="text-white font-bold text-xl tracking-tighter">
            <span className="uppercase tracking-[0.3em] font-black text-[#D4AF37]">InvestmentTesla</span>
          </Link>
          
          <div className="hidden xl:flex items-center gap-8">
            <Link href="/portal/personal" className="text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em]">Personal</Link>
            <Link href="/portal/strategy" className="text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em]">Strategy</Link>
            <Link href="/portal/insurance" className="text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em]">Insurance</Link>
            <Link href="/portal/founders" className="text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em]">Founders</Link>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#D4AF37]/40 px-5 py-2 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all">
            Dashboard
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <LogOut size={14} /> 
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
EOF