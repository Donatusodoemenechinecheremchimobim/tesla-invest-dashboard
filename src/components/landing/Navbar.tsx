'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Menu, X, LogOut, LayoutDashboard, Crown } from 'lucide-react';
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
    router.push('/portal');
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link href="/portal" className="flex items-center gap-2 group">
          <div className="bg-[#D4AF37] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Zap size={20} className="text-black fill-black" />
          </div>
          <span className="text-white font-serif font-bold text-xl tracking-wide">TESLA<span className="text-[#D4AF37]">INV</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
          <Link href="/portal/personal" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-[#D4AF37]">
             <Crown size={12}/> Private Client
          </Link>
          <Link href="/portal/strategy" className="hover:text-[#D4AF37] transition-colors">Strategy</Link>
          <Link href="/portal/insurance" className="hover:text-[#D4AF37] transition-colors">Insurance</Link>
          <Link href="/portal/concierge" className="hover:text-[#D4AF37] transition-colors">Concierge</Link>
        </div>

        <div className="flex items-center gap-4">
          
          {user ? (
            <div className="flex items-center gap-4">
               <Link 
                 href="/dashboard" 
                 className="hidden md:flex items-center gap-2 bg-[#D4AF37] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)]"
               >
                 <LayoutDashboard size={14} /> Dashboard
               </Link>

               <button onClick={handleSignOut} className="hidden md:flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-[10px] font-bold uppercase tracking-widest">
                 Sign Out
               </button>
            </div>
          ) : (
            <Link href="/auth" className="hidden md:flex items-center gap-2 bg-[#D4AF37] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all">
              Login <ArrowRight size={14} />
            </Link>
          )}

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden bg-[#111] overflow-hidden border-b border-white/10">
            <div className="flex flex-col p-6 gap-4">
               {user && (
                 <Link href="/dashboard" className="bg-[#D4AF37] text-black text-center py-3 rounded-lg font-bold uppercase tracking-widest mb-2" onClick={() => setIsOpen(false)}>
                   Access Dashboard
                 </Link>
               )}
               <Link href="/portal/personal" className="text-[#D4AF37] hover:text-white font-bold" onClick={() => setIsOpen(false)}>Private Client</Link>
               <Link href="/portal/strategy" className="text-gray-400 hover:text-[#D4AF37]" onClick={() => setIsOpen(false)}>Strategy</Link>
               <Link href="/portal/insurance" className="text-gray-400 hover:text-[#D4AF37]" onClick={() => setIsOpen(false)}>Insurance</Link>
               <Link href="/portal/concierge" className="text-gray-400 hover:text-[#D4AF37]" onClick={() => setIsOpen(false)}>Concierge</Link>
               
               <div className="h-px bg-white/10 my-2" />
               
               {user ? (
                 <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="text-red-400 flex items-center gap-2 text-sm font-bold uppercase tracking-widest"><LogOut size={16} /> Sign Out</button>
               ) : (
                 <Link href="/auth" className="text-[#D4AF37] flex items-center gap-2 text-sm font-bold uppercase tracking-widest" onClick={() => setIsOpen(false)}>Login</Link>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
