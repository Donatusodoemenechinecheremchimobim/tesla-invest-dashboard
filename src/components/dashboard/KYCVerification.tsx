'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // <--- FIXED IMPORT
import { Lock, Loader2, Upload, FileText, CheckCircle } from 'lucide-react';

export default function KYCVerification({ user, onSuccess }: { user: any, onSuccess: () => void }) {
  const [ssn, setSsn] = useState('');
  const [idType, setIdType] = useState<'passport' | 'license'>('passport');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [kycSubmitting, setKycSubmitting] = useState(false);

  const handleSsnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 9);
    setSsn(val);
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ssn.length !== 9 || !idFile) return;
    setKycSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const filename = `${session.user.id}/${idType}_${Date.now()}`;
      await supabase.storage.from('user-kyc').upload(filename, idFile);

      await supabase.from('profiles').update({ 
        kyc_status: 'submitted' 
      }).eq('id', session.user.id);

      onSuccess();
    } catch (err) {
      console.error(err);
      alert('Upload failed. Please try again.');
    } finally {
      setKycSubmitting(false);
    }
  };

  if (user?.kyc_status === 'submitted' || user?.kyc_status === 'verified') {
    return (
      <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-4">
        <CheckCircle size={24} className="text-green-500" />
        <div>
           <h4 className="font-bold text-green-500">Submission Received</h4>
           <p className="text-xs text-green-400">Your documents are under review. Deposit access will be unlocked upon approval.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 rounded-[2rem]">
       <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
         <FileText className="text-[#D4AF37]" size={20}/> Submit KYC Documents
       </h3>
       
       <form onSubmit={handleKycSubmit} className="space-y-6">
          
          <div className="flex gap-4">
             <button type="button" onClick={() => setIdType('passport')} className={`flex-1 py-3 rounded-xl border text-xs font-bold uppercase ${idType === 'passport' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-transparent border-white/10 text-gray-500'}`}>Passport</button>
             <button type="button" onClick={() => setIdType('license')} className={`flex-1 py-3 rounded-xl border text-xs font-bold uppercase ${idType === 'license' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-transparent border-white/10 text-gray-500'}`}>Driver's License</button>
          </div>

          <div>
             <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Social Security Number (9 Digits)</label>
             <input 
                type="text" 
                value={ssn}
                onChange={handleSsnChange}
                placeholder="XXX-XX-XXXX"
                className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none tracking-widest"
             />
          </div>

          <div className="relative">
             <input 
               type="file" 
               accept="image/*"
               onChange={(e) => setIdFile(e.target.files?.[0] || null)}
               className="hidden" 
               id="id-upload"
             />
             <label htmlFor="id-upload" className="w-full bg-black border border-white/10 border-dashed rounded-xl p-6 flex items-center justify-center gap-2 text-gray-400 cursor-pointer hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                <Upload size={16} /> {idFile ? idFile.name : `Upload ${idType === 'passport' ? 'Passport' : 'License'} Image`}
             </label>
          </div>

          <button disabled={kycSubmitting || ssn.length !== 9 || !idFile} className="w-full py-4 bg-white/10 hover:bg-[#D4AF37] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-xl font-bold uppercase tracking-widest text-xs flex justify-center items-center gap-2">
            {kycSubmitting && <Loader2 className="animate-spin" size={16} />}
            {kycSubmitting ? 'Uploading to Secure Bucket...' : 'Submit Verification'}
          </button>
       </form>
    </section>
  );
}
