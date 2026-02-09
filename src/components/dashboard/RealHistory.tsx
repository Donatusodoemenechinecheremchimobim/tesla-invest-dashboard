'use client';
import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function RealHistory() {
  const [txs, setTxs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
        setLoading(false);
        return;
    }

    const q = query(
      collection(db, "transactions"), 
      where("userId", "==", user.uid), 
      orderBy("date", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setTxs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <div className="text-center p-4 text-[#D4AF37] animate-pulse text-xs">SYNCING LEDGER...</div>;
  if (txs.length === 0) return <div className="text-center p-8 text-gray-600 text-xs uppercase tracking-widest">No Transactions Found</div>;

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left">
        <tbody className="text-sm">
          {txs.map((tx) => (
            <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition">
              <td className="py-4 pl-0 md:pl-4 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.direction === 'in' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {tx.direction === 'in' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                </div>
                <div>
                  <div className="font-bold text-white text-xs md:text-sm">{tx.type}</div>
                  <div className="text-[10px] text-gray-500">{new Date(tx.date).toLocaleDateString()}</div>
                </div>
              </td>
              <td className="py-4 text-gray-400 text-xs md:text-sm hidden md:table-cell">{tx.asset || 'USD'}</td>
              <td className={`py-4 pr-0 md:pr-4 text-right font-mono text-xs md:text-sm ${tx.direction === 'in' ? 'text-green-400' : 'text-white'}`}>
                {tx.direction === 'in' ? '+' : '-'}${tx.amount?.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
