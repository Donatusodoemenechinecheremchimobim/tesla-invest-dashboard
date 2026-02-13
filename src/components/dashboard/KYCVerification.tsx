'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, Loader2 } from 'lucide-react'; // 👈 REMOVED UNUSED ICONS
import CameraCapture from '@/components/auth/CameraCapture';

export default function KYCVerification({ user, onVerificationComplete }: { user: any, onVerificationComplete: () => void }) {
  const [ssn, setSsn] = useState('');
  const [idType, setIdType] = useState('Passport');
  const [docFile, setDocFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // If already verified, don't show anything
  if (user?.verification_status === 'approved') return null;

  // If pending, show the "Waiting for Approval" message
  if (user?.verification_status === 'pending_review' || isSubmitted) {
     return (
       <div className="bg-[#111] border border-yellow-500/30 p-8 rounded-3xl text-center">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
             <Loader2 className="text-yellow-500 animate-spin" size={32} />
          </div>
          <h2 className="text-2xl font-serif text-white mb-2">Verification In Progress</h2>
          <p className="text-gray-400 max-w-md mx-auto">
             Your documents are currently under review by our compliance team. 
             Deposit functionality will be unlocked upon approval.
          </p>
       </div>
     );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFile || !ssn) return alert("Please complete all fields.");
    
    setLoading(true);
    try {
       // 1. Upload ID
       const fileExt = docFile.name.split('.').pop();
       const fileName = `${user.id}-kyc.${fileExt}`;
       const { error: uploadError } = await supabase.storage.from('verification').upload(fileName, docFile);
       if (uploadError) throw uploadError;
       
       const { data: publicUrlData } = supabase.storage.from('verification').getPublicUrl(fileName);

       // 2. Update Profile
       const { error: updateError } = await supabase
         .from('profiles')
         .update({
            ssn: ssn,
            id_type: idType,
            id_image_url: publicUrlData.publicUrl,
            verification_status: 'pending_review'
         })
         .eq('id', user.id);

       if (updateError) throw updateError;
       
       setIsSubmitted(true);
       onVerificationComplete();

    } catch (error: any) {
       alert(error.message || "An error occurred during upload.");
    } finally {
       setLoading(false);
    }
  };

  return (
    <div className="bg-[#111] border border-red-500/30 p-6 md:p-8 rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
         <Lock size={120} className="text-red-500" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
           <div className="p-3 bg-red-500/10 rounded-full text-red-500 border border-red-500/20">
              <Lock size={24} />
           </div>
           <div>
              <h2 className="text-xl font-bold text-white">Deposit Locked</h2>
              <p className="text-red-400 text-xs uppercase tracking-widest font-bold">Identity Verification Required</p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
           <div>
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Social Security Number (SSN)</label>
              <input 
                type="text" 
                placeholder="XXX-XX-XXXX" 
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
                required
              />
           </div>

           <div>
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Document Type</label>
              <select 
                value={idType} 
                onChange={(e) => setIdType(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none appearance-none"
              >
                 <option>Passport</option>
                 <option>Driver's License</option>
              </select>
           </div>

           <div>
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Upload Document</label>
              <CameraCapture onCapture={(file) => setDocFile(file)} />
           </div>

           <button 
             type="submit" 
             disabled={loading}
             className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2"
           >
             {loading ? <Loader2 className="animate-spin" /> : 'Submit for Review'}
           </button>
        </form>
      </div>
    </div>
  );
}
