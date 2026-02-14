#!/bin/bash
cat << 'EOF' > src/components/dashboard/DepositButton.tsx
'use client';
import React from 'react';
import { MessageCircle } from 'lucide-react';

const DepositButton = () => {
  const handleWhatsAppRedirect = () => {
    // International format without the '+' or '0' at the start
    const phoneNumber = "2348144462467"; 
    const businessMessage = "Hello InvestmentTesla Support, I am interested in making a deposit. Please provide the current payment details.";
    
    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(businessMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button 
      onClick={handleWhatsAppRedirect}
      className="w-full mt-6 py-4 bg-[#D4AF37] hover:bg-[#b8952e] text-black font-bold uppercase text-[10px] tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.1)] active:scale-95 group"
    >
      <MessageCircle size={16} className="group-hover:animate-pulse" />
      Contact Agent to Deposit
    </button>
  );
};

export default DepositButton;
EOF