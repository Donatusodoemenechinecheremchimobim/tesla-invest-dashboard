import Link from 'next/link';

export default function IntroFooter() {
  return (
    <footer className="bg-black text-white py-24 border-t border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-sm">
        <div>
           <h2 className="text-xl font-serif font-bold mb-6 tracking-widest text-white">VERDE <span className="text-[#D4AF37]">CAPITAL</span></h2>
           <p className="text-gray-500 leading-relaxed text-xs">
              The intersection of precious metals and digital finance.
           </p>
        </div>
        <div>
           <h4 className="font-bold mb-6 text-[#D4AF37] uppercase tracking-widest text-xs">Legal</h4>
           <ul className="space-y-4 text-gray-400 text-xs font-medium">
              <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/sipc" className="hover:text-white transition-colors">SIPC Protection</Link></li>
           </ul>
        </div>
        <div>
           <h4 className="font-bold mb-6 text-[#D4AF37] uppercase tracking-widest text-xs">Company</h4>
           <ul className="space-y-4 text-gray-400 text-xs font-medium">
              <li><Link href="/personal" className="hover:text-white transition-colors">Personal Wealth</Link></li>
              <li><Link href="/corporate" className="hover:text-white transition-colors">Corporate</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
           </ul>
        </div>
        <div>
           <h4 className="font-bold mb-6 text-[#D4AF37] uppercase tracking-widest text-xs">Office</h4>
           <p className="text-gray-500 text-xs mb-2">214 North Tryon St</p>
           <p className="text-gray-500 text-xs mb-4">Charlotte, NC 28202</p>
           <p className="text-white font-bold text-xs">+1 (800) VERDE-VIP</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#222] text-center text-[10px] text-gray-600 uppercase tracking-widest">
         © 2026 Verde Capital Systems. All rights reserved. Member SIPC.
      </div>
    </footer>
  );
}
