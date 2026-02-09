'use client';
import LuxuryLoader from '@/components/ui/LuxuryLoader';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import WhyTesla from '@/components/landing/WhyTesla';
import Strategy from '@/components/landing/Strategy';
import Membership from '@/components/landing/Membership';
import Concierge from '@/components/landing/Concierge';
import MarketTicker from '@/components/landing/MarketTicker';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] selection:bg-[#D4AF37] selection:text-black">
      <LuxuryLoader />
      <Navbar />
      
      <div className="pt-20">
        <MarketTicker />
        <Hero />
        
        {/* Animated Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        
        <WhyTesla />
        <Strategy />
        <Membership />
        <Concierge />
        
        <footer className="border-t border-white/10 bg-black py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col">
              <span className="text-lg font-serif text-white">INVESTMENT<span className="text-[#D4AF37]">TESLA</span></span>
              <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">© 2026 Reserves</span>
            </div>
            <div className="flex gap-6 text-[10px] text-gray-500 uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-white transition">Privacy Protocol</a>
              <a href="#" className="hover:text-white transition">Legal</a>
              <a href="#" className="hover:text-white transition">Status</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
