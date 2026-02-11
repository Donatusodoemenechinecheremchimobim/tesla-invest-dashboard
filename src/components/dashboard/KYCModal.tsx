'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldAlert, Upload, CheckCircle, X, Lock, CreditCard, FileText, Eye, EyeOff, Loader2, AlertTriangle } from 'lucide-react';

export default function KYCModal({ isOpen, onClose, status }: { isOpen: boolean; onClose: () => void; status: string }) {
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [ssn, setSsn] = useState('');
  const [showSSN, setShowSSN] = useState(false);
  const [docType, setDocType] = useState<'passport' | 'license' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  // If rejected, show retry message
  useEffect(() => {
    if (status === 'rejected') setStep(1); 
  }, [status]);

  const validateAndContinue = () => {
    const ssnClean = ssn.replace(/[^0-9]/g, '');
    if (ssnClean.length !== 9) { setError("SSN must be exactly 9 digits."); return; }
    if (!docType) { setError("Please select a document type."); return; }
    setError('');
    setStep(2);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleRealUpload = async () => {
    if (!file || !docType || !ssn) return;
    setUploading(true); setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${docType}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('kyc_documents').upload(fileName, file);
      if (uploadError) throw uploadError;

      // 🛑 UPDATE STATUS TO 'pending'
      const { error: dbError } = await supabase.from('profiles').update({ 
          ssn: ssn, 
          document_type: docType,
          kyc_status: 'pending', // 👈 VITAL CHANGE
          is_verified: false 
        }).eq('id', user.id);

      if (dbError) throw dbError;
      setStep(3);
    } catch (err: any) {
      console.error(err);
      setError("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
          
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden">
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
            
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                {status === 'rejected' ? <AlertTriangle size={32} className="text-red-500" /> : <ShieldAlert size={32} className="text-[#D4AF37]" />}
              </div>
            </div>

            {step === 1 && (
              <>
                <h2 className="text-2xl font-serif text-center mb-2 text-white">
                  {status === 'rejected' ? 'Verification Failed' : 'Identity Verification'}
                </h2>
                <p className={`text-center text-[11px] mb-8 leading-relaxed px-4 ${status === 'rejected' ? 'text-red-400' : 'text-gray-400'}`}>
                  {status === 'rejected' 
                    ? "Your previous documents were rejected. Please upload clear, valid government identification." 
                    : "Federal regulations require a valid SSN and Government ID for all investment accounts."}
                </p>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">Social Security Number</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={16} />
                      <input type={showSSN ? "text" : "password"} placeholder="XXX-XX-XXXX" value={ssn} onChange={(e) => { const val = e.target.value.replace(/[^0-9-]/g, ''); if (val.length <= 11) setSsn(val); setError(''); }} className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white outline-none transition-all placeholder:text-gray-700 text-sm font-mono tracking-widest focus:border-[#D4AF37]" />
                      <button type="button" onClick={() => setShowSSN(!showSSN)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white p-1">{showSSN ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">Select Document Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => { setDocType('passport'); setError(''); }} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${docType === 'passport' ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}><CreditCard size={20} /> <span className="text-[10px] font-bold uppercase tracking-widest">Passport</span></button>
                      <button onClick={() => { setDocType('license'); setError(''); }} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${docType === 'license' ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}><FileText size={20} /> <span className="text-[10px] font-bold uppercase tracking-widest">License</span></button>
                    </div>
                  </div>

                  {error && <p className="text-red-400 text-xs text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>}
                  <button onClick={validateAndContinue} className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all mt-2">Continue to Upload</button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-2xl font-serif text-center mb-6">Upload Document</h2>
                <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-10 flex flex-col items-center justify-center hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all group h-[200px]">
                  <input type="file" accept="image/*,.pdf" onChange={onFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                  {file ? (
                    <div className="flex flex-col items-center"><FileText size={40} className="text-[#D4AF37] mb-2" /><p className="text-xs font-bold text-white text-center">{file.name}</p><p className="text-[10px] text-gray-500 mt-1">Ready to upload</p></div>
                  ) : (
                    <><Upload size={32} className="mb-4 text-gray-500 group-hover:text-[#D4AF37] transition-colors" /><p className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white">Tap to Select File</p></>
                  )}
                </div>
                <button onClick={handleRealUpload} disabled={!file || uploading} className={`w-full mt-6 py-4 font-bold uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2 ${!file ? 'bg-white/5 text-gray-600' : 'bg-[#D4AF37] text-black hover:bg-white'}`}>{uploading ? <Loader2 className="animate-spin" size={16}/> : (uploading ? "Encrypting..." : "Submit Verification")}</button>
                {!uploading && <button onClick={() => { setStep(1); setFile(null); }} className="w-full mt-2 py-4 text-gray-500 font-bold uppercase tracking-widest text-[10px] hover:text-white">Back</button>}
              </>
            )}

            {step === 3 && (
              <div className="text-center py-4">
                <div className="flex justify-center mb-6"><div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center"><CheckCircle size={32} className="text-green-500" /></div></div>
                <h2 className="text-2xl font-serif text-white mb-2">Documents Sent</h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Your status is now <span className="text-[#D4AF37] font-bold">Pending Review</span>.</p>
                <button onClick={onClose} className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-all">Return to Dashboard</button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
