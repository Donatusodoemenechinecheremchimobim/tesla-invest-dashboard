'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, ArrowRight, ArrowLeft, Leaf } from 'lucide-react';
import CameraCapture from '@/components/auth/CameraCapture';

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  // Form Data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [idType, setIdType] = useState('National ID');
  const [docFile, setDocFile] = useState<File | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        let idImageUrl = '';

        if (docFile) {
           const fileExt = docFile.name.split('.').pop();
           const fileName = `${Date.now()}-id.${fileExt}`;
           const { error: uploadError } = await supabase.storage.from('verification').upload(fileName, docFile);
           if (uploadError) throw new Error(`Upload Failed: ${uploadError.message}`);
           const { data: publicUrlData } = supabase.storage.from('verification').getPublicUrl(fileName);
           idImageUrl = publicUrlData.publicUrl;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              id_type: idType,
              id_image_url: idImageUrl, // Matches new SQL
              avatar_url: '', // Profile pic (empty for now)
            },
          },
        });
        
        if (signUpError) throw signUpError;
        alert("Welcome to Verde Capital! Your account is created.");
        setMode('login');

      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        router.push('/portal'); 
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-gray-100 p-8 rounded-3xl shadow-xl"
      >
        <div className="text-center mb-8">
           <div className="inline-flex bg-green-50 p-3 rounded-xl mb-4 text-[#059669]">
              <Leaf size={32} fill="currentColor" />
           </div>
           <h1 className="text-3xl font-bold text-gray-900 mb-2">
             {mode === 'login' ? 'Welcome Back' : 'Join Verde'}
           </h1>
           <p className="text-gray-500 text-xs uppercase tracking-widest">
             Secure Investment Portal
           </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          {mode === 'signup' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <label className="text-gray-500 text-xs font-bold uppercase mb-1 block">Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-[#059669] focus:outline-none" required />
              </div>
              <div>
                <label className="text-gray-500 text-xs font-bold uppercase mb-1 block">ID Document</label>
                <select value={idType} onChange={(e) => setIdType(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-[#059669] focus:outline-none">
                  <option>National ID Card</option>
                  <option>Passport</option>
                  <option>Driver License</option>
                </select>
              </div>
              <CameraCapture onCapture={(file) => setDocFile(file)} />
            </motion.div>
          )}

          <div>
            <label className="text-gray-500 text-xs font-bold uppercase mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-[#059669] focus:outline-none" required />
          </div>

          <div>
            <label className="text-gray-500 text-xs font-bold uppercase mb-1 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-[#059669] focus:outline-none" required />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#059669] text-white font-bold py-4 rounded-xl hover:bg-[#047857] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-100">
            {loading ? <Loader2 className="animate-spin" /> : (mode === 'login' ? 'Access Dashboard' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-gray-500 hover:text-[#059669] text-xs font-bold uppercase">
            {mode === 'login' ? "Create an Account" : "Back to Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
