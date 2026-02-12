#!/bin/bash

echo "🔄 REBRANDING: UPDATING SPLASH SCREENS, NAVBARS, AND CONTENT..."

# ======================================================
# 1. UPDATE NEW SITE NAVBAR (Founders -> Founder)
# ======================================================
cat << 'EOF' > src/components/intro/IntroNavbar.tsx
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
EOF

# ======================================================
# 2. UPDATE WHATSAPP BUBBLE (Add Default Message)
# ======================================================
cat << 'EOF' > src/components/ui/WhatsAppBubble.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function WhatsAppBubble() {
  const [isVisible, setIsVisible] = useState(false);
  const WA_NUMBER = "19803487946";
  const MESSAGE = encodeURIComponent("Hello, I would like to make an inquiry regarding TeslaInvest."); // 👈 DEFAULT MESSAGE ADDED
  const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${MESSAGE}`;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.a
      href={WA_LINK}
      target="_blank"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
      <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.5)] border border-white/20">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </div>
    </motion.a>
  );
}
EOF

# ======================================================
# 3. UPDATE NEW SITE CONTACT (Remove Priority Line)
# ======================================================
cat << 'EOF' > src/app/contact/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const WA_NUMBER = "19803487946";
  const WA_LINK = `https://wa.me/${WA_NUMBER}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <IntroNavbar />
      <div className="pt-40 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-serif mb-8">Private Concierge</h1>
        <p className="text-gray-400 mb-16">
          Our VIP support team is available 24/7. 
          Please use your dedicated line for immediate assistance.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
           
           {/* WHATSAPP */}
           <a href={WA_LINK} target="_blank" className="bg-[#111] p-10 rounded-3xl border border-white/10 flex flex-col items-center hover:border-green-500/50 transition-colors cursor-pointer">
              <MessageCircle className="text-green-500 mb-4" size={32} />
              <h3 className="font-bold mb-2">WhatsApp</h3>
              <p className="text-gray-400 text-sm">+{WA_NUMBER}</p>
           </a>

           {/* HQ - REMOVED PHONE/PRIORITY LINE */}
           <div className="bg-[#111] p-10 rounded-3xl border border-white/10 flex flex-col items-center">
              <MapPin className="text-[#D4AF37] mb-4" size={32} />
              <h3 className="font-bold mb-2">Global HQ</h3>
              <p className="text-gray-400 text-sm">Austin, Texas</p>
           </div>
        </div>
      </div>
    </main>
  );
}
EOF

# ======================================================
# 4. UPDATE NEW SITE SPLASH SCREEN (TESLAINV)
# ======================================================
cat << 'EOF' > src/components/intro/SplashScreen.tsx
'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="bg-[#D4AF37] p-3 rounded-xl"
        >
          <Zap size={32} className="text-black fill-black" />
        </motion.div>
        {/* UPDATED TEXT HERE */}
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-widest">
          TESLA<span className="text-[#D4AF37]">INV</span>
        </h1>
      </div>
      
      {/* Loading Bar */}
      <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-[#D4AF37]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 font-mono text-[#D4AF37] text-xs">
        INITIALIZING DOJO NODES... {progress}%
      </div>
    </motion.div>
  );
}
EOF

# ======================================================
# 5. UPDATE PRESS PAGE (Clickable Links)
# ======================================================
cat << 'EOF' > src/app/press/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { ArrowUpRight } from 'lucide-react';

export default function PressPage() {
  const news = [
    { date: "Feb 12, 2026", title: "TeslaInv Reports Record Q1 Earnings Growth of 145%", source: "Bloomberg", link: "https://www.bloomberg.com" },
    { date: "Jan 28, 2026", title: "Dojo V4 Chip Integration Complete: Latency Drops by 40%", source: "TechCrunch", link: "https://techcrunch.com" },
    { date: "Jan 15, 2026", title: "Global Expansion: New Nodes Active in Singapore & Dubai", source: "Reuters", link: "https://www.reuters.com" },
    { date: "Dec 10, 2025", title: "The End of Hedge Funds? How AI is Taking Over.", source: "Forbes", link: "https://www.forbes.com" }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <IntroNavbar />
      <div className="pt-40 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-serif mb-16 text-center">Press Room</h1>
        
        <div className="space-y-4">
           {news.map((item, i) => (
             <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col md:flex-row md:items-center justify-between bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#D4AF37] transition-all cursor-pointer block">
               <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">{item.source}</span>
                    <span className="text-gray-600 text-[10px]">•</span>
                    <span className="text-gray-500 text-[10px] uppercase tracking-widest">{item.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
               </div>
               <ArrowUpRight className="text-gray-600 group-hover:text-[#D4AF37] transition-colors mt-4 md:mt-0" />
             </a>
           ))}
        </div>
      </div>
    </main>
  );
}
EOF

# ======================================================
# 6. UPDATE OLD SITE NAVBAR (Logo -> INVESTMENTTESLA)
# ======================================================
cat << 'EOF' > src/components/landing/Navbar.tsx
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
        
        {/* UPDATED LOGO TEXT */}
        <Link href="/portal" className="flex items-center gap-2 group">
          <div className="bg-[#D4AF37] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Zap size={20} className="text-black fill-black" />
          </div>
          <span className="text-white font-serif font-bold text-xl tracking-wide">INVESTMENT<span className="text-[#D4AF37]">TESLA</span></span>
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
EOF

# ======================================================
# 7. UPDATE OLD SITE SPLASH (via LuxuryLoader)
# ======================================================
cat << 'EOF' > src/components/ui/LuxuryLoader.tsx
'use client';
import { motion } from 'framer-motion';

export default function LuxuryLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 1, delay: 1.5 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-6" />
      {/* ADDED SPLASH TEXT FOR OLD SITE PAGES */}
      <h1 className="text-2xl font-serif font-bold text-white tracking-widest animate-pulse">
          INVESTMENT<span className="text-[#D4AF37]">TESLA</span>
      </h1>
    </motion.div>
  );
}
EOF

echo "✅ ALL CHANGES APPLIED: NAVBARS, SPLASH SCREENS, WHATSAPP, PRESS LINKS."