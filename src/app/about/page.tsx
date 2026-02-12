'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <IntroNavbar />
      <div className="pt-40 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-serif mb-8">The TeslaInv Vision</h1>
        <p className="text-xl text-gray-400">We believe that high-frequency algorithmic trading should not be limited to Wall Street hedge funds. By leveraging the Dojo Supercomputer, we bring institutional-grade returns to the individual investor.</p>
      </div>
    </main>
  );
}
