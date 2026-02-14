#!/bin/bash
cat << 'EOF' > src/components/dashboard/KYCModal.tsx
'use client';
import { useState } from 'react';
import { Upload, Loader2, X } from 'lucide-react';

export default function KYCModal({ isOpen, onClose, onComplete }: any) {
  const [ssn, setSsn] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || ssn.length !== 9) return;
    
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('ssn', ssn);
      formData.append('documentType', 'license');

      const res = await fetch('/api/user/kyc', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        onComplete();
        onClose();
      }
    } catch (err) {
      console.error("KYC Submission Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
      <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 relative">
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-500 hover:text-white">
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold uppercase mb-6 tracking-tight">Identity Verification</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="SOCIAL SECURITY NUMBER" 
            maxLength={9}
            className="w-full bg-black border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-[#D4AF37] font-mono" 
            value={ssn} 
            onChange={e => setSsn(e.target.value.replace(/\D/g, ''))} 
            required 
          />
          
          <label className="block p-10 border-2 border-dashed border-white/10 rounded-xl text-center cursor-pointer hover:border-[#D4AF37]/50 transition-all bg-black">
            <Upload size={24} className="mx-auto mb-2 text-gray-600" />
            <span className="text-[10px] uppercase font-bold text-gray-500">{file ? file.name : "Upload Document"}</span>
            <input type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} required />
          </label>

          <button type="submit" disabled={submitting} className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase text-[10px] rounded-xl flex items-center justify-center">
            {submitting ? <Loader2 className="animate-spin" /> : "Verify Identity"}
          </button>
        </form>
      </div>
    </div>
  );
}
EOF