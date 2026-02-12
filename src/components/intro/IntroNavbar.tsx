'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Menu, X, ChevronRight } from 'lucide-react';

export default function IntroNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Founder", href: "/founders" }, // 👈 CHANGED TO SINGULAR
    { name: "Technology", href: "/technology" },
    { name: "Insurance", href: "/insurance" },
    { name: "About", href: "/about" },
    { name: "Press", href: "/press" },
    { name: "Concierge", href: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-3 group z-50">
            <div className="bg-[#D4AF37] p-1.5 rounded-lg group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <Zap size={20} className="text-black fill-black" />
            </div>
            <span className="text-white font-serif font-bold text-xl tracking-wide">TESLA<span className="text-[#D4AF37]">INV</span></span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            {links.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/portal" className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all group shadow-lg">
              Client Portal <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white hover:text-[#D4AF37] transition-colors z-50">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col"
          >
            <div className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={link.href} onClick={() => setIsOpen(false)} className="flex items-center justify-between p-6 border-b border-white/10 text-xl font-serif text-white hover:text-[#D4AF37] transition-colors group">
                    {link.name}
                    <ChevronRight size={16} className="text-gray-600 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
                <Link href="/portal" onClick={() => setIsOpen(false)} className="flex w-full items-center justify-center gap-2 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs py-5 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  Access Client Portal <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
