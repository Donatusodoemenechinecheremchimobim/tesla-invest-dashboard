'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf, ArrowRight } from 'lucide-react';

export default function IntroNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const links = [
    { name: "Our Vision", href: "/founders" },
    { name: "Growth Tech", href: "/technology" },
    { name: "Security", href: "/insurance" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-2 group z-50">
            <div className="bg-[#059669] p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-green-200">
              <Leaf size={20} className="text-white fill-white" />
            </div>
            <span className="text-gray-900 font-sans font-bold text-xl tracking-tight">
              Verde<span className="text-[#059669]">Capital</span>
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {links.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-[#059669] transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* 👇 UPDATED: NOW POINTS TO /portal/ */}
            <Link href="/portal/" className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#059669] hover:shadow-lg transition-all shadow-md">
              InvestmentTesla <ArrowRight size={12} />
            </Link>
            
            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-gray-900 z-50">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden flex flex-col"
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-2xl font-bold text-gray-900 py-4 border-b border-gray-100">
                  {link.name}
                </Link>
              ))}
              {/* 👇 UPDATED MOBILE LINK TOO */}
              <Link href="/portal/" onClick={() => setIsOpen(false)} className="mt-8 w-full bg-[#059669] text-white py-4 rounded-xl text-center font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2">
                Access InvestmentTesla <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
