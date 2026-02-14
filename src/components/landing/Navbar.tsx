'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Zap, User } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch('/api/user/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-[100] px-6 py-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-3xl">
        <Link href="/" className="flex items-center gap-2">
          <Zap size={20} className="text-[#D4AF37] fill-[#D4AF37]" />
          <span className="font-bold tracking-tighter uppercase text-white">
            INVESTMENT<span className="text-[#D4AF37]">TESLA</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <Link 
              href="/dashboard" 
              className="bg-[#D4AF37] text-black px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
            >
              <User size={14} /> Dashboard
            </Link>
          ) : (
            <Link 
              href="/portal/auth" 
              className="text-white/50 hover:text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              Access Terminal
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
