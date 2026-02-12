'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Menu, X, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // 1. CHECK IF USER IS LOGGED IN
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. HANDLE SIGN OUT
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/portal'); // Stay on Old Site
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO -> LINKS STRICTLY TO /portal (OLD SITE HOME) */}
        <Link href="/portal" className="flex items-center gap-2 group">
          <div className="bg-[#D4AF37] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Zap size={20} className="text-black fill-black" />
          </div>
          <span className="text-white font-serif font-bold text-xl tracking-wide">TESLA<span className="text-[#D4AF37]">INV</span></span>
        </Link>

        {/* OLD SITE LINKS */}
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
          <Link href="/portal/strategy" className="hover:text-[#D4AF37] transition-colors">Strategy</Link>
          <Link href="/portal/insurance" className="hover:text-[#D4AF37] transition-colors">Insurance</Link>
          <Link href="/portal/concierge" className="hover:text-[#D4AF37] transition-colors">Concierge</Link>
        </div>

        <div className="flex items-center gap-4">
          
          {/* DYNAMIC AUTH BUTTON */}
          {user ? (
            <button 
              onClick={handleSignOut}
              className="hidden md:flex items-center gap-2 bg-white/10 border border-white/20 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-red-500/20 hover:border-red-500 hover:text-red-500 transition-all"
            >
              Sign Out <LogOut size={14} />
            </button>
          ) : (
            <Link 
              href="/auth" 
              className="hidden md:flex items-center gap-2 bg-[#D4AF37] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all"
            >
              Login <ArrowRight size={14} />
            </Link>
          )}

          {/* MOBILE TOGGLE */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden bg-[#111] overflow-hidden border-b border-white/10">
            <div className="flex flex-col p-6 gap-4">
               <Link href="/portal/strategy" className="text-gray-400 hover:text-[#D4AF37]" onClick={() => setIsOpen(false)}>Strategy</Link>
               <Link href="/portal/insurance" className="text-gray-400 hover:text-[#D4AF37]" onClick={() => setIsOpen(false)}>Insurance</Link>
               <Link href="/portal/concierge" className="text-gray-400 hover:text-[#D4AF37]" onClick={() => setIsOpen(false)}>Concierge</Link>
               
               <div className="h-px bg-white/10 my-2" />
               
               {user ? (
                 <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="text-red-400 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                   <LogOut size={16} /> Sign Out
                 </button>
               ) : (
                 <Link href="/auth" className="text-[#D4AF37] flex items-center gap-2 text-sm font-bold uppercase tracking-widest" onClick={() => setIsOpen(false)}>
                   <User size={16} /> Login to Dashboard
                 </Link>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
