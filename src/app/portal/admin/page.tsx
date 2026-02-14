'use client';
import { useEffect, useState } from 'react';
import { Shield, Check, X, ExternalLink, User, Fingerprint, Eye } from 'lucide-react';

export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  };

  const updateStatus = async (userId: number, status: string) => {
    await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, status })
    });
    fetchPending();
  };

  useEffect(() => { fetchPending(); }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#D4AF37] font-mono">ACCESSING ENCRYPTED RECORDS...</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
          <Shield size={32} className="text-[#D4AF37]" />
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-tighter">Verification <span className="text-[#D4AF37]">Authority</span></h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">KYC Approval & SSN Review Terminal</p>
          </div>
        </div>

        <div className="grid gap-4">
          {users.map((u) => (
            <div key={u.id} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#D4AF37]">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{u.first_name} {u.last_name}</h3>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 items-center">
                <div className="text-center">
                  <p className="text-[9px] text-gray-500 uppercase mb-1">SSN (Social Security)</p>
                  <p className="font-mono text-[#D4AF37] tracking-widest bg-white/5 px-3 py-1 rounded-lg border border-white/5">{u.ssn || 'N/A'}</p>
                </div>

                <a href={u.id_document_url} target="_blank" className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-all">
                  <Eye size={14} /> View Document <ExternalLink size={12} />
                </a>

                <div className="flex gap-2">
                  <button onClick={() => updateStatus(u.id, 'approved')} className="bg-green-600/20 text-green-500 border border-green-500/50 p-3 rounded-xl hover:bg-green-600 hover:text-white transition-all">
                    <Check size={20} />
                  </button>
                  <button onClick={() => updateStatus(u.id, 'rejected')} className="bg-red-600/20 text-red-500 border border-red-500/50 p-3 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {users.length === 0 && <p className="text-center py-20 text-gray-600 uppercase text-xs tracking-[0.3em]">No pending verifications found</p>}
        </div>
      </div>
    </main>
  );
}
