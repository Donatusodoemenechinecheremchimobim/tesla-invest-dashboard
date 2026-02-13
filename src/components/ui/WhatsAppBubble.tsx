'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function WhatsAppBubble() {
  const pathname = usePathname();

  // 🛑 STOP if we are NOT on the Old Site
  if (!pathname?.startsWith('/portal')) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-6 right-6 z-[9999]"
    >
      <Link 
        href="https://wa.me/1234567890" // Replace with your number
        target="_blank"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform"
      >
        <MessageCircle size={28} className="text-white fill-white" />
      </Link>
    </motion.div>
  );
}
