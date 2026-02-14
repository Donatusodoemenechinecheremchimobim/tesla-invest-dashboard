'use client';
import React from 'react';
import { MessageCircle } from 'lucide-react';

const DepositButton = () => {
  const handleContact = () => {
    // This opens WhatsApp directly to your agent line
    const agentNumber = "+2348144462467"; 
    const message = "Hello, I would like to make a deposit into my InvestmentTesla account.";
    window.open(`https://wa.me/${agentNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button 
      onClick={handleContact}
      style={{ zIndex: 9999, position: 'relative' }}
      className="w-full mt-6 py-4 bg-[#D4AF37] hover:bg-[#b8952e] text-black font-bold uppercase text-[10px] tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-[0.98]"
    >
      <MessageCircle size={16} />
      Contact Agent to Deposit
    </button>
  );
};

export default DepositButton;
