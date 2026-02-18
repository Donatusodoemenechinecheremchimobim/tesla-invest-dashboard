'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar'; // Fixed import to use the working Navbar
import Footer from '@/components/landing/Footer';
import { ArrowUpRight, Calendar, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PressPage() {
  const [news, setNews] = useState<any[]>([]);

  // This effect runs on load to generate dates relative to "Today"
  useEffect(() => {
    const today = new Date();
    const formatDate = (daysAgo: number) => {
      const date = new Date(today);
      date.setDate(today.getDate() - daysAgo);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const dynamicNews = [
      { 
        offset: 0, // 0 days ago (Today)
        title: "TeslaInv Reports Record Q1 Earnings Growth of 145%", 
        source: "Bloomberg", 
        link: "https://www.bloomberg.com",
        category: "Earnings"
      },
      { 
        offset: 2, // 2 days ago
        title: "Dojo V4 Chip Integration Complete: Latency Drops by 40%", 
        source: "TechCrunch", 
        link: "https://techcrunch.com",
        category: "Technology"
      },
      { 
        offset: 5, // 5 days ago
        title: "Global Expansion: New Nodes Active in Singapore & Dubai", 
        source: "Reuters", 
        link: "https://www.reuters.com",
        category: "Expansion"
      },
      { 
        offset: 12, // 12 days ago
        title: "The End of Hedge Funds? How AI is Taking Over.", 
        source: "Forbes", 
        link: "https://www.forbes.com",
        category: "Opinion"
      },
      { 
        offset: 18, 
        title: "Regulatory Approval Granted for EU Crypto Derivatives", 
        source: "Financial Times", 
        link: "https://www.ft.com",
        category: "Regulation"
      },
      { 
        offset: 25, 
        title: "VerdeStock Partners with SpaceX for Satellite Uplink", 
        source: "SpaceNews", 
        link: "https://spacenews.com",
        category: "Partnership"
      }
    ];

    const formattedNews = dynamicNews.map(item => ({
      ...item,
      date: formatDate(item.offset) // Generates the date string
    }));

    setNews(formattedNews);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">Media Coverage</span>
          <h1 className="text-5xl md:text-7xl font-serif mt-4 mb-6">Press Room</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Latest updates, official announcements, and market insights from global financial outlets.</p>
        </div>
        
        {/* BOX FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {news.map((item, i) => (
             <motion.a 
               key={i} 
               href={item.link} 
               target="_blank" 
               rel="noopener noreferrer" 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group flex flex-col justify-between bg-[#111] p-8 rounded-[2rem] border border-white/5 hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-300 cursor-pointer h-full"
             >
               <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-gray-300 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                      {item.source}
                    </span>
                    <ArrowUpRight className="text-gray-600 w-5 h-5 group-hover:text-[#D4AF37] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <h3 className="text-xl font-bold leading-snug text-white mb-4 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
               </div>

               <div className="flex items-center gap-2 mt-6 pt-6 border-t border-white/5">
                 <Calendar size={12} className="text-gray-500" />
                 <span className="text-gray-500 text-[10px] uppercase tracking-widest">{item.date}</span>
                 <span className="text-gray-700 mx-2">|</span>
                 <span className="text-gray-500 text-[10px] uppercase tracking-widest">{item.category}</span>
               </div>
             </motion.a>
           ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
