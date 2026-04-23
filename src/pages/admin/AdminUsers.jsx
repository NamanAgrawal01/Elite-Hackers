import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { db } from '../../firebase/firebase';
import { collection, query, getDocs, doc, updateDoc, orderBy, limit } from 'firebase/firestore';
import { Search, Shield, Ban, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

const AdminUsers = () => {
    const { userData: adminData } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "users"), orderBy("joinDate", "desc"), limit(50));
            const snapshot = await getDocs(q);
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(list);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load user matrix");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        Promise.resolve().then(() => fetchUsers());
    }, [fetchUsers]);

    const toggleSuspension = async (userId, currentStatus) => {
        try {
            await updateDoc(doc(db, "users", userId), {
                isSuspended: !currentStatus
            });
            toast.success(`User ${!currentStatus ? 'Suspended' : 'Restored'}`);
            fetchUsers();
        } catch (error) {
            console.error(error);
            toast.error("Operation failed");
        }
    };

    const makeStaff = async (userId, role) => {
        if (!adminData?.isOwner) {
            toast.error("Only Owner can assign staff roles");
            return;
        }
        try {
            await updateDoc(doc(db, "users", userId), {
                role: role,
                isAdmin: role === 'admin'
            });
            toast.success(`Role updated to ${role.toUpperCase()}`);
            fetchUsers();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update role");
        }
    };

    const filteredUsers = users.filter(u => 
        u.username?.toLowerCase().includes(search.toLowerCase()) || 
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto animate-fade-in-up space-y-8">
            <Helmet><title>User Matrix — ELITE HACKERS</title></Helmet>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="font-display font-bold text-3xl text-text-primary tracking-widest uppercase mb-1">USER MATRIX</h1>
                    <p className="font-mono text-[10px] text-text-muted tracking-[4px] uppercase">Managing personnel access and permissions</p>
                </div>
                
                <div className="relative w-full md:w-80">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                        type="text" 
                        placeholder="SEARCH OPERATIVES..." 
                        className="w-full bg-bg-card border border-border rounded-xl py-4 pl-12 pr-4 font-mono text-xs focus:border-primary outline-none transition-all uppercase"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-mono text-[10px] text-text-muted tracking-[4px]">SCANNING SUBNET...</span>
                </div>
            ) : (
                <div className="bg-bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#0b0404] border-b border-border text-left">
                                <th className="px-6 py-4 font-display font-bold text-[10px] text-text-muted tracking-widest uppercase">Operative</th>
                                <th className="px-6 py-4 font-display font-bold text-[10px] text-text-muted tracking-widest uppercase">Clearance</th>
                                <th className="px-6 py-4 font-display font-bold text-[10px] text-text-muted tracking-widest uppercase">Node Level</th>
                                <th className="px-6 py-4 font-display font-bold text-[10px] text-text-muted tracking-widest uppercase">Status</th>
                                <th className="px-6 py-4 font-display font-bold text-[10px] text-text-muted tracking-widest uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-bg-primary/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img src={user.photoURL} className="w-10 h-10 rounded-full border border-border" alt="" />
                                            <div>
                                                <div className="font-display font-bold text-sm text-text-primary tracking-wide uppercase">{user.username}</div>
                                                <div className="font-mono text-[9px] text-text-muted">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded font-mono text-[9px] font-bold uppercase tracking-widest border ${user.role === 'owner' ? 'bg-primary/10 border-primary/30 text-primary' : user.role === 'admin' ? 'bg-red/10 border-red/30 text-red' : 'bg-bg-primary border-border text-text-muted'}`}>
                                            {user.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-display font-bold text-xs text-text-primary">LVL {user.level || 1}</div>
                                        <div className="font-mono text-[9px] text-text-muted tracking-widest uppercase mt-0.5">{user.totalXP || 0} XP</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.isSuspended ? (
                                            <span className="flex items-center gap-2 text-red font-mono text-[9px] font-bold uppercase tracking-widest">
                                                <Ban size={12} /> SUSPENDED
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2 text-primary font-mono text-[9px] font-bold uppercase tracking-widest">
                                                <CheckCircle2 size={12} /> ACTIVE
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => toggleSuspension(user.id, user.isSuspended)}
                                                className={`p-2 rounded border transition-all ${user.isSuspended ? 'border-primary/30 text-primary hover:bg-primary/10' : 'border-red/30 text-red hover:bg-red/10'}`}
                                                title={user.isSuspended ? 'Restore' : 'Suspend'}
                                            >
                                                {user.isSuspended ? <CheckCircle2 size={16} /> : <Ban size={16} />}
                                            </button>
                                            
                                            {adminData?.isOwner && user.role !== 'owner' && (
                                                <button 
                                                    onClick={() => makeStaff(user.id, user.role === 'admin' ? 'user' : 'admin')}
                                                    className={`p-2 rounded border transition-all ${user.role === 'admin' ? 'border-gold/30 text-gold hover:bg-gold/10' : 'border-primary/30 text-primary hover:bg-primary/10'}`}
                                                    title={user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                                                >
                                                    <Shield size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;