'use client';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#D4AF37]/20 pt-20 pb-10 px-6">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="text-[#D4AF37] fill-[#D4AF37]" size={24} />
            <span className="text-lg font-serif font-bold tracking-widest text-white">
              VERDE <span className="text-[#D4AF37]">STOCK</span>
            </span>
          </div>
          <p className="text-gray-500 text-xs leading-loose">
            The intersection of precious metals and digital finance. Institutional-grade architecture for the modern era.
          </p>
        </div>
        
        <div>
          <h4 className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-6">Legal</h4>
          <ul className="space-y-4 text-xs text-gray-400">
            <li><Link href="legal/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="legal/terms" className="hover:text-white">Terms of Service</Link></li>
            <li><Link href="legal/sipc" className="hover:text-white">SIPC Protection</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-6">Company</h4>
          <ul className="space-y-4 text-xs text-gray-400">
            <li><Link href="/personal" className="hover:text-white">Personal Wealth</Link></li>
            <li><Link href="/corporate" className="hover:text-white">Corporate</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-6">Office</h4>
          <p className="text-xs text-gray-400 leading-loose">
            214 North Tryon St<br />
            Charlotte, NC 28202<br />
            <span className="text-white mt-2 block">+1(980) 348-7946</span>
          </p>
        </div>
      </div>
      <div className="border-t border-white/5 pt-8 text-center">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest">© 2026 VerdeStock Capital Systems. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
