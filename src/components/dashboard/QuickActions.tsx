'use client';

import { ArrowUpRight, ArrowDownLeft, Send, CreditCard } from 'lucide-react';

export default function QuickActions() {
  
  // 📞 THE WHATSAPP LINK
  // We add a pre-filled message so the user doesn't have to type.
  const whatsappLink = "https://wa.me/19803487946?text=Hello%2C%20I%20would%20like%20to%20make%20a%20deposit%20into%20my%20investment%20account.";

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      
      {/* 🟢 DEPOSIT BUTTON -> WHATSAPP */}
      <a 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center gap-3 p-4 bg-white text-black rounded-xl font-bold uppercase tracking-wider hover:bg-[#D4AF37] transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      >
        <div className="p-1 bg-black rounded-full text-white group-hover:bg-black/80">
           <ArrowDownLeft size={18} />
        </div>
        <span>Deposit</span>
      </a>

      {/* 🔴 WITHDRAW BUTTON (Kept standard for now, or link to page) */}
      <button 
        className="group flex items-center justify-center gap-3 p-4 bg-[#111] border border-white/10 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-[#222] transition-all hover:scale-[1.02]"
      >
        <div className="p-1 bg-white/10 rounded-full text-gray-400 group-hover:text-white">
           <ArrowUpRight size={18} />
        </div>
        <span>Withdraw</span>
      </button>

    </div>
  );
}
