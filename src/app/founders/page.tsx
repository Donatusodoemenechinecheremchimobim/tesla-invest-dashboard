'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';

export default function FoundersPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <section className="pt-40 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-6xl font-serif mb-8 text-[#D4AF37]">The Founders</h1>
        <p className="text-gray-400">Restoring original InvestmentTesla board of directors and visionaries.</p>
      </section>
    </main>
  );
}
