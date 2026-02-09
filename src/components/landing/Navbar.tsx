'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Lock, Shield, CreditCard, LogIn } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Function to force navigation
  const handleNav = (path: string) => {
    setIsOpen(false);
    console.log("Navigating to:", path);
    router.push(path);
  };

  const links = [
    { name: 'Personal', href: '/personal' },
    { name: 'Insurance', href: '/insurance' },
    { name: 'Strategy', href: '/#strategy' },
    { name: 'Concierge', href: '/#concierge' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-[9999] border-b border-white/10 bg-black/90 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <div onClick={() => handleNav('/')} className="flex flex-col z-[1000] group cursor-pointer">
            <span className="text-xl font-serif tracking-widest text-white group-hover:text-[#D4AF37] transition-colors">
              INVESTMENT<span className="text-[#D4AF37] font-bold group-hover:text-white transition-colors">TESLA</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-gray-500">Private Banking</span>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            {links.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNav(link.href)}
                className="hover:text-[#D4AF37] transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* DESKTOP BUTTONS (Force Clickable) */}
          <div className="hidden md:flex items-center gap-6 z-[1000]">
            <button 
              onClick={() => handleNav('/auth')}
              className="text-xs font-bold uppercase tracking-widest hover:text-white text-gray-400 transition flex items-center gap-2"
            >
              <LogIn size={14} /> Sign In
            </button>
            
            <button 
              onClick={() => handleNav('/auth')}
              className="px-6 py-2 border border-white/20 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition duration-300 rounded-sm"
            >
              Client Access
            </button>
          </div>

          {/* MOBILE HAMBURGER */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden z-[1000] text-white p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[9990] bg-black pt-28 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.div 
                  key={link.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button 
                    onClick={() => handleNav(link.href)}
                    className="w-full text-3xl font-serif text-white flex justify-between items-center border-b border-white/10 pb-4 group text-left"
                  >
                    <span className="group-hover:text-[#D4AF37] transition-colors">{link.name}</span>
                    <ChevronRight className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </motion.div>
              ))}
              
              <button 
                onClick={() => handleNav('/auth')}
                className="mt-8 w-full py-5 bg-[#D4AF37] text-black font-bold text-center text-lg uppercase tracking-widest hover:bg-white transition"
              >
                Access Portal
              </button>
            </div>
            
            <div className="mt-auto mb-10 flex flex-col items-center gap-4 text-gray-600 text-xs uppercase tracking-widest">
              <div className="flex gap-8">
                <div className="flex items-center gap-2"><Shield size={14}/> Insured</div>
                <div className="flex items-center gap-2"><CreditCard size={14}/> Private</div>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={12} /> Secure Mobile Uplink
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
