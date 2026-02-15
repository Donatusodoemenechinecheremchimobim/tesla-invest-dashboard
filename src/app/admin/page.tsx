'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // <--- FIXED IMPORT
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCw, User, Lock, Grid, CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (authenticated) fetchUsers();
  }, [authenticated]);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setUsers(data);
    setLoading(false);
  };

  const toggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'approved' ? 'locked' : 'approved';
    
    // Optimistic UI update
    setUsers(users.map(u => u.id === userId ? { ...u, deposit_status: newStatus } : u));

    await supabase
      .from('profiles')
      .update({ deposit_status: newStatus })
      .eq('id', userId);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123') { // Simple passcode for demo
      setAuthenticated(true);
    } else {
      alert('Access Denied');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-[#111] p-8 rounded-2xl border border-red-900/30 text-center">
          <ShieldAlert size={48} className="text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-6">Restricted Access</h1>
          <input 
            type="password" 
            placeholder="Enter Passcode" 
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full bg-black border border-white/10 p-3 rounded-lg text-white mb-4 text-center focus:border-red-500 outline-none"
          />
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg">
            Authenticate
          </button>
        </form>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Grid className="text-indigo-500" /> Master Control
        </h1>
        <button onClick={fetchUsers} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs uppercase border-b border-white/10">
              <th className="p-4">User Identity</th>
              <th className="p-4">KYC Status</th>
              <th className="p-4">Deposit Access</th>
              <th className="p-4">Balance</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map((user) => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4">
                  <div className="font-bold text-white">{user.full_name || 'Unknown'}</div>
                  <div className="text-xs text-gray-500">{user.id}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    user.kyc_status === 'verified' ? 'bg-green-900 text-green-400' : 
                    user.kyc_status === 'submitted' ? 'bg-yellow-900 text-yellow-400' : 'bg-red-900 text-red-400'
                  }`}>
                    {user.kyc_status || 'Pending'}
                  </span>
                </td>
                <td className="p-4">
                  {user.deposit_status === 'approved' ? (
                    <div className="flex items-center gap-2 text-green-500">
                      <CheckCircle size={16} /> Unlocked
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-500">
                      <Lock size={16} /> Locked
                    </div>
                  )}
                </td>
                <td className="p-4 font-mono">
                  ${user.balance?.toLocaleString()}
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => toggleStatus(user.id, user.deposit_status)}
                    className={`px-4 py-2 rounded font-bold text-xs uppercase transition ${
                      user.deposit_status === 'approved' 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {user.deposit_status === 'approved' ? 'Lock Deposit' : 'Approve Deposit'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
