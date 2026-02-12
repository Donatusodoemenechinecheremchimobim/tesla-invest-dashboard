'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';

export default function PressPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <IntroNavbar />
      <div className="pt-40 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-serif mb-16 text-center">Press Releases</h1>
        <div className="space-y-8">
           {[1,2,3].map((i) => (
             <div key={i} className="border-b border-white/10 pb-8">
               <p className="text-[#D4AF37] text-xs font-bold uppercase mb-2">Feb 1{i}, 2026</p>
               <h3 className="text-2xl font-bold">TeslaInv Reports Record Q1 Earnings Growth of 145%</h3>
             </div>
           ))}
        </div>
      </div>
    </main>
  );
}
