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
