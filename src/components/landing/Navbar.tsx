'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Menu, X, LayoutDashboard, Crown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/portal/auth');
    router.refresh();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <Link href="/portal" className="flex items-center gap-2 group z-50">
            <div className="bg-[#D4AF37] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <Zap size={20} className="text-black fill-black" />
            </div>
            <span className="text-white font-serif font-bold text-xl tracking-wide">
              INVESTMENT<span className="text-[#D4AF37]">TESLA</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            <Link href="/portal/personal" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-[#D4AF37]">
               <Crown size={12}/> Private Client
            </Link>
            <Link href="/portal/strategy" className="hover:text-[#D4AF37] transition-colors">Strategy</Link>
            <Link href="/portal/insurance" className="hover:text-[#D4AF37] transition-colors">Insurance</Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                 <Link href="/dashboard" className="flex items-center gap-2 bg-[#D4AF37] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all">
                   <LayoutDashboard size={14} /> Dashboard
                 </Link>
                 <button onClick={handleSignOut} className="text-gray-400 hover:text-red-500 text-[10px] font-bold uppercase tracking-widest">
                   Sign Out
                 </button>
              </div>
            ) : (
              <Link href="/portal/auth" className="hidden md:flex items-center gap-2 bg-[#D4AF37] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all">
                Login <ArrowRight size={14} />
              </Link>
            )}

            {/* Mobile Toggle Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white z-50 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU (Was missing before!) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden flex flex-col gap-6"
          >
            <Link href="/portal/personal" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white border-b border-white/10 pb-4">Private Client</Link>
            <Link href="/portal/strategy" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white border-b border-white/10 pb-4">Strategy</Link>
            <Link href="/portal/insurance" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white border-b border-white/10 pb-4">Insurance</Link>
            
            <div className="mt-8">
              {user ? (
                 <Link href="/dashboard" onClick={() => setIsOpen(false)} className="w-full block bg-[#D4AF37] text-black text-center py-4 rounded-xl font-bold uppercase tracking-widest">
                   Access Dashboard
                 </Link>
              ) : (
                 <Link href="/portal/auth" onClick={() => setIsOpen(false)} className="w-full block bg-[#D4AF37] text-black text-center py-4 rounded-xl font-bold uppercase tracking-widest">
                   Client Login
                 </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
