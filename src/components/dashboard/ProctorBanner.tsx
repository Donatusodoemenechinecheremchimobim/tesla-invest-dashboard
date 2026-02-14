'use client';
import { Shield, Camera } from 'lucide-react';

export default function ProctorBanner() {
  return (
    <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-4 rounded-2xl flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="bg-[#D4AF37] p-2 rounded-lg">
          <Shield size={16} className="text-black" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Active Proctoring Enabled</p>
          <p className="text-[9px] text-gray-500 uppercase font-bold">Encrypted biometric stream is active</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-[9px] font-bold uppercase text-gray-400 tracking-tighter flex items-center gap-1">
          <Camera size={12} /> Live
        </span>
      </div>
    </div>
  );
}
