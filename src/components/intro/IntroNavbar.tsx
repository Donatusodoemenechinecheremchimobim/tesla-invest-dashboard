'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Leaf, ArrowRight, ChevronDown } from 'lucide-react';
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
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 \${scrolled ? 'bg-[#022c22]/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#059669] p-2 rounded-xl group-hover:rotate-12 transition-transform">
               <Leaf size={24} fill="white" />
            </div>
            <div className="font-sans font-bold text-xl tracking-tight">
              VERDE <span className="text-[#4ade80]">CAPITAL</span>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm">
            <Link href="/personal" className="hover:text-[#4ade80] transition-colors">Personal</Link>
            <Link href="/corporate" className="hover:text-[#4ade80] transition-colors">Corporate</Link>
            <Link href="/services" className="hover:text-[#4ade80] transition-colors">Services</Link>
            <Link href="/portal/insurance" className="hover:text-[#4ade80] transition-colors">Insurance</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/portal/auth" className="hidden md:flex items-center gap-2 bg-white text-[#022c22] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#4ade80] transition-all">
              Client Login <ArrowRight size={14} />
            </Link>
            
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white">
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
            className="fixed inset-0 z-40 bg-[#022c22] pt-24 px-6 lg:hidden"
          >
             <div className="flex flex-col gap-6 text-2xl font-bold text-white">
                <Link href="/personal" onClick={() => setIsOpen(false)}>Personal</Link>
                <Link href="/corporate" onClick={() => setIsOpen(false)}>Corporate</Link>
                <Link href="/services" onClick={() => setIsOpen(false)}>Services</Link>
                <Link href="/portal/insurance" onClick={() => setIsOpen(false)}>Insurance</Link>
                <Link href="/portal/auth" onClick={() => setIsOpen(false)} className="mt-8 bg-[#059669] text-center py-4 rounded-xl text-lg">Client Login</Link>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
