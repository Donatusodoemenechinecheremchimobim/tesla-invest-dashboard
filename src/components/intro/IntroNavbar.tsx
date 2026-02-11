'use client';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export default function IntroNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-[#D4AF37] p-1.5 rounded-lg group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <Zap size={20} className="text-black fill-black" />
          </div>
          <span className="text-white font-serif font-bold text-xl tracking-wide">TESLA<span className="text-[#D4AF37]">INV</span></span>
        </Link>
        
        {/* NEW LINKS ADDED HERE */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          <Link href="/technology" className="hover:text-white transition-colors">Technology</Link>
          <Link href="/insurance" className="hover:text-white transition-colors">Insurance</Link>
          <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>

        <Link href="/portal" className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all group shadow-lg">
          Client Portal <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </nav>
  );
}
