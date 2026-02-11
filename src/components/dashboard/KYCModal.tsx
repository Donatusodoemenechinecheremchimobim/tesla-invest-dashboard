'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ShieldAlert, Upload, CheckCircle, X, Lock, CreditCard, FileText } from 'lucide-react';

export default function KYCModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [docType, setDocType] = useState<'passport' | 'license' | null>(null);
  const [ssn, setSsn] = useState('');

  const handleUpload = () => {
    setUploading(true);
    // Simulate encryption/upload delay
    setTimeout(() => {
      setUploading(false);
      setStep(3); // Success state
    }, 2500);
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
            className="absolute inset-0 bg-black/90 backdrop-blur-md" 
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden"
          >
            {/* CLOSE BUTTON */}
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
            
            {/* HEADER ICON */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <ShieldAlert size={32} className="text-[#D4AF37]" />
              </div>
            </div>

            {/* STEP 1: SSN & DOC SELECTION */}
            {step === 1 && (
              <>
                <h2 className="text-2xl font-serif text-center mb-2 text-white">Identity Verification</h2>
                <p className="text-gray-400 text-center text-[11px] mb-8 leading-relaxed px-4">
                  To comply with International Banking Regulations (Tesla-FinCEN), we require proof of identity for all active portfolios.
                </p>

                <div className="space-y-4">
                  
                  {/* SSN INPUT */}
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={16} />
                    <input 
                      type="text" 
                      placeholder="Social Security Number (SSN)" 
                      value={ssn}
                      onChange={(e) => setSsn(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-600 text-xs tracking-widest font-mono"
                    />
                  </div>

                  {/* DOCUMENT SELECTOR */}
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setDocType('passport')}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${docType === 'passport' ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                    >
                      <CreditCard size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Passport</span>
                    </button>
                    <button 
                      onClick={() => setDocType('license')}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${docType === 'license' ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                    >
                      <FileText size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Driver's License</span>
                    </button>
                  </div>

                  {/* CONTINUE BUTTON */}
                  <button 
                    onClick={() => { if(ssn && docType) setStep(2); }}
                    disabled={!ssn || !docType}
                    className={`w-full py-4 font-bold uppercase tracking-widest text-xs rounded-xl transition-all mt-2 ${(!ssn || !docType) ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-[#D4AF37] text-black hover:bg-white shadow-[0_0_20px_rgba(212,175,55,0.3)]'}`}
                  >
                    Continue to Upload
                  </button>

                  <p className="text-center text-[9px] text-gray-600 mt-2 uppercase tracking-widest flex justify-center items-center gap-1">
                    <Lock size={10} /> 256-Bit SSL Encrypted
                  </p>
                </div>
              </>
            )}

            {/* STEP 2: UPLOAD */}
            {step === 2 && (
              <>
                <h2 className="text-2xl font-serif text-center mb-6">Upload {docType === 'passport' ? 'Passport' : 'License'}</h2>
                
                <div 
                  onClick={handleUpload}
                  className="border-2 border-dashed border-white/20 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all group h-[200px]"
                >
                  <Upload size={32} className={`mb-4 transition-colors ${uploading ? 'text-[#D4AF37] animate-bounce' : 'text-gray-500 group-hover:text-[#D4AF37]'}`} />
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white">
                    {uploading ? "Encrypting & Uploading..." : "Tap to Select File"}
                  </p>
                  {!uploading && <p className="text-[9px] text-gray-600 mt-2">JPG, PNG, or PDF (Max 5MB)</p>}
                </div>

                <button onClick={() => setStep(1)} className="w-full mt-6 py-4 bg-transparent border border-white/10 text-gray-400 font-bold uppercase tracking-widest text-xs rounded-xl hover:text-white hover:border-white/30 transition-all">
                  Go Back
                </button>
              </>
            )}

            {/* STEP 3: SUCCESS */}
            {step === 3 && (
              <div className="text-center py-4">
                <div className="flex justify-center mb-6">
                   <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                      <CheckCircle size={32} className="text-green-500" />
                   </div>
                </div>
                <h2 className="text-2xl font-serif text-white mb-2">Verification Pending</h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Your SSN and documents have been securely transmitted to our compliance team. Approval typically takes 1-6 hours.
                </p>
                <button onClick={onClose} className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-all">
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
