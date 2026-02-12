'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <IntroNavbar />
      <div className="pt-40 px-6 max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-serif mb-8">Contact Concierge</h1>
        <p className="text-gray-400 mb-12">Our VIP support team is available 24/7 for Diamond Tier members.</p>
        <div className="bg-[#111] p-10 rounded-3xl border border-white/10">
          <p className="text-[#D4AF37] text-xl font-bold">support@teslainv.com</p>
          <p className="text-white mt-4">+1 (888) 4-DOJO-AI</p>
        </div>
      </div>
    </main>
  );
}
