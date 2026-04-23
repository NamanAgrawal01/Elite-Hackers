import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { Check, X, DollarSign, Clock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

const AdminPayments = () => {
    const { userData } = useAuth();
    const [pending, setPending] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPending = useCallback(async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "users"), where("pendingPlan", "!=", null));
            const snapshot = await getDocs(q);
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPending(list);
        } catch (_err) {
            console.error(_err);
            toast.error("Failed to fetch pending transactions");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        Promise.resolve().then(() => fetchPending());
    }, [fetchPending]);

    const handleConfirm = useCallback(async (userId, planType) => {
        try {
            const userRef = doc(db, "users", userId);
            const isAdminship = planType === 'admin';
            
            await updateDoc(userRef, {
                plan: planType,
                role: isAdminship ? 'admin' : 'user',
                isAdmin: isAdminship,
                planActivatedAt: Timestamp.now(),
                planExpiry: Timestamp.fromMillis(Date.now() + 30 * 24 * 60 * 60 * 1000),
                pendingPlan: null,
                isSubscriptionActive: true
            });
            
            toast.success(`Access Granted: ${planType.toUpperCase()}`);
            fetchPending();
        } catch (_error) {
            console.error(_error);
            toast.error("Activation failed");
        }
    }, [fetchPending]);

    if (!userData?.isOwner) return <div className="p-20 text-center font-mono text-red">ACCESS DENIED: OWNER PRIVILEGE REQUIRED</div>;

    return (
        <div className="max-w-6xl mx-auto animate-fade-in-up">
            <Helmet><title>Finance Terminal — Elite Hackers</title></Helmet>

            <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#1a2236]">
                <div>
                    <h1 className="font-display font-bold text-3xl text-text-primary tracking-widest uppercase">FINANCIAL NODES</h1>
                    <p className="font-mono text-[10px] text-text-muted tracking-[4px] uppercase mt-2">Confirm pending subscriptions and adminships</p>
                </div>
                <div className="bg-gold/10 border border-gold/20 px-4 py-2 rounded-lg flex items-center gap-3">
                    <DollarSign size={18} className="text-gold" />
                    <span className="font-mono text-gold font-bold text-sm">OWNER AUTHENTICATED</span>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-mono text-xs text-text-muted tracking-widest animate-pulse">SCANNING LEDGER...</span>
                </div>
            ) : pending.length === 0 ? (
                <div className="bg-bg-card border border-dashed border-border rounded-2xl p-20 text-center">
                    <Clock size={48} className="text-text-muted mx-auto mb-6 opacity-20" />
                    <h3 className="font-display font-bold text-xl text-text-muted tracking-widest">NO PENDING TRANSACTIONS</h3>
                    <p className="font-mono text-xs text-text-muted mt-2">All network payments are currently synchronized.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {pending.map((user) => (
                        <div key={user.id} className="bg-bg-card border border-border p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <img src={user.photoURL} alt="User" className="w-14 h-14 rounded-full border-2 border-border" />
                                    <div className="absolute -bottom-1 -right-1 bg-bg-primary p-1 rounded-full border border-border">
                                        <User size={12} className="text-text-muted" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-lg text-text-primary uppercase tracking-wider">{user.username}</h3>
                                    <p className="font-mono text-[11px] text-text-secondary uppercase">{user.email}</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="px-2 py-0.5 bg-gold/10 border border-gold/20 text-gold font-mono text-[9px] font-bold uppercase rounded">
                                            Requesting: {user.pendingPlan?.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button 
                                    onClick={() => handleConfirm(user.id, user.pendingPlan)}
                                    className="px-6 py-3 bg-primary text-bg-primary rounded-lg font-display font-bold text-[11px] tracking-widest flex items-center gap-2 hover:scale-105 transition-transform uppercase"
                                >
                                    <Check size={16} /> [ CONFIRM PAYMENT ]
                                </button>
                                <button className="p-3 border border-red/30 text-red rounded-lg hover:bg-red/10 transition-all uppercase">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPayments;