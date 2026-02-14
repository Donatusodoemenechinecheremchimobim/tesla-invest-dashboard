'use client';
import Navbar from '@/components/landing/Navbar';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <div className="pt-32 max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-serif mb-12 tracking-tighter">About <span className="text-[#D4AF37]">InvestmentTesla</span></h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Card */}
          <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2rem] hover:border-[#D4AF37]/30 transition-all">
            <h3 className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-[0.2em] mb-4">Our Mission</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              At InvestmentTesla, we provide elite financial management and strategic growth opportunities for our global clientele.
            </p>
          </div>
          
          {/* Add more cards here as per your original design */}
        </div>
      </div>
    </main>
  );
}
