'use client';
import { useState } from 'react';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';

export default function KYCUpload({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/user/kyc', { method: 'POST', body: formData });
    if (res.ok) {
      onUploadSuccess();
    }
    setUploading(false);
  };

  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
      <input type="file" id="kyc" className="hidden" onChange={handleFile} accept="image/*,application/pdf" />
      <label htmlFor="kyc" className="cursor-pointer flex flex-col items-center gap-2">
        {uploading ? <Loader2 className="animate-spin text-[#D4AF37]" /> : <Upload className="text-[#D4AF37]" />}
        <span className="text-[10px] font-bold uppercase tracking-widest">Upload Government ID</span>
      </label>
    </div>
  );
}
