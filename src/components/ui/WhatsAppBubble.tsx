'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function WhatsAppBubble() {
  // CONFIGURATION
  const phoneNumber = "19803487946"; // 👈 Replace with your real number
  const message = encodeURIComponent("Hello, I would like to inquire about investment opportunities.");

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-6 right-6 z-[9999]"
    >
      <Link 
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)]"
      >
        <MessageCircle size={30} className="text-white fill-white" />
      </Link>
    </motion.div>
  );
}
