'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ShieldAlert, Upload, CheckCircle, X } from 'lucide-react';

export default function KYCModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      setStep(3); // Success state
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(212,175,55,0.1)]"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={20} /></button>
            
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30">
                <ShieldAlert size={40} className="text-[#D4AF37]" />
              </div>
            </div>

            {step === 1 && (
              <>
                <h2 className="text-2xl font-serif text-center mb-2">Identity Verification</h2>
                <p className="text-gray-400 text-center text-sm mb-8">
                  To comply with International Banking Regulations (Tesla-FinCEN), we require proof of identity for all accounts over $500.
                </p>
                <div className="space-y-3">
                  <button onClick={() => setStep(2)} className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-all">
                    Upload ID / Passport
                  </button>
                  <button onClick={onClose} className="w-full py-4 bg-white/5 text-gray-400 font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white/10">
                    Remind Me Later
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-2xl font-serif text-center mb-6">Upload Document</h2>
                <div 
                  onClick={handleUpload}
                  className="border-2 border-dashed border-white/20 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all group"
                >
                  <Upload size={32} className="text-gray-500 mb-4 group-hover:text-[#D4AF37] transition-colors" />
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white">
                    {uploading ? "Encrypting Upload..." : "Tap to Select File"}
                  </p>
                </div>
                <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-widest">
                  Secure Quantum Encryption (256-bit)
                </p>
              </>
            )}

            {step === 3 && (
              <div className="text-center">
                <h2 className="text-2xl font-serif text-white mb-2">Verification Pending</h2>
                <p className="text-gray-400 text-sm mb-8">
                  Your documents have been submitted to our compliance team. Review typically takes 1-6 hours.
                </p>
                <button onClick={onClose} className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl">
                  Return to Dashboard
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
