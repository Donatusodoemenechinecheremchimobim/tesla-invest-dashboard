'use client';
import Link from 'next/link';
import { LayoutDashboard, UserPlus } from 'lucide-react';

export default function PortalNavbar() {
  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-[#D4AF37]/10 py-5 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        
        {/* LEFT: LOGO */}
        <div className="flex justify-start">
          <Link href="/portal" className="text-xl md:text-2xl font-serif font-bold tracking-tighter text-white whitespace-nowrap">
            INVESTMENT<span className="text-[#D4AF37] italic font-light">TESLA</span>
          </Link>
        </div>
        
        {/* CENTER: NAV */}
        <div className="hidden md:flex justify-center items-center space-x-10">
          {['Personal', 'Founders', 'Insurance'].map((item) => (
            <Link 
              key={item} 
              href={`/portal/${item.toLowerCase()}`} 
              className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 hover:text-[#D4AF37] transition-all whitespace-nowrap"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex justify-end items-center gap-6">
          <Link 
            href="/portal/auth" 
            className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 hover:text-[#D4AF37] transition-colors"
          >
            <UserPlus size={14} />
            <span>Open Account</span>
          </Link>

          <Link 
            href="/portal/auth" 
            className="flex items-center gap-2 px-6 py-2.5 bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)]"
          >
            <LayoutDashboard size={14} />
            <span className="hidden lg:inline">Dashboard</span>
          </Link>
        </div>
        
      </div>
    </nav>
  );
}
