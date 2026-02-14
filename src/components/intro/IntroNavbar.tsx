'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Gem } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#000000]/80 backdrop-blur-xl shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#D4AF37] p-2 rounded-2xl group-hover:rotate-45 transition-transform duration-500 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
               <Gem size={22} className="text-black fill-black" />
            </div>
            <div className="font-serif font-bold text-2xl tracking-widest text-white">
              VERDE <span className="text-[#D4AF37]">CAPITAL</span>
            </div>
          </Link>

          {/* DESKTOP LINKS - CHANGED FROM 'lg:flex' TO 'md:flex' */}
          <div className="hidden md:flex items-center gap-8 font-medium text-xs tracking-[0.2em] uppercase text-[#D4AF37]">
            {['Personal', 'Corporate', 'Services', 'Contact'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/portal/" className="hidden md:flex items-center gap-2 border border-[#D4AF37] text-[#D4AF37] px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all">
              Client Access <ArrowRight size={12} />
            </Link>
            
            {/* MOBILE MENU BUTTON - CHANGED FROM 'lg:hidden' TO 'md:hidden' */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-[#D4AF37]">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
             <div className="flex flex-col gap-8 text-3xl font-serif text-white uppercase tracking-wider">
                {['Personal', 'Corporate', 'Services', 'Contact'].map((item) => (
                   <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="hover:text-[#D4AF37] transition-colors">{item}</Link>
                ))}
                <Link href="/portal/" onClick={() => setIsOpen(false)} className="mt-8 bg-[#D4AF37] text-black text-center py-4 text-sm font-bold tracking-widest rounded-full">Client Login</Link>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
