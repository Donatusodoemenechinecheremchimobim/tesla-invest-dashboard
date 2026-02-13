'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import NeuralSingularity from '@/components/landing/NeuralSingularity';

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900">
      <IntroNavbar />
      
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
        
        {/* Placeholder Friendly Leader Image */}
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 100 }}
          className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-green-100"
        >
           {/* You can replace this URL with any friendly stock photo */}
           <Image 
             src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80" 
             alt="CEO" fill className="object-cover"
           />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">Our Vision</h1>
        <p className="text-[#059669] font-bold text-sm uppercase tracking-widest mb-12">
           Building a Greener Financial Future
        </p>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-left relative overflow-hidden">
           <Quote className="absolute top-6 left-6 text-green-100" size={80} />
           <div className="relative z-10 space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                 <span className="text-gray-900 font-bold">Finance shouldn't be intimidating.</span> At Verde Capital, we believe that everyone deserves access to institutional-grade growth strategies, without the complexity.
              </p>
              <p>
                 We stripped away the Wall Street jargon and built a platform powered by intelligent automation. 
                 Our goal isn't just to make you money—it's to help you build a life of freedom and security.
              </p>
           </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
         <h2 className="text-2xl font-bold mb-8">The Tech Behind the Growth</h2>
         {/* Note: NeuralSingularity should ideally be re-colored to Green too, but standard is fine for now */}
         <NeuralSingularity />
      </section>

    </main>
  );
}
