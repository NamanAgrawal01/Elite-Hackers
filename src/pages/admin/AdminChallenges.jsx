import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { db } from '../../firebase/firebase';
import { collection, query, orderBy, getDocs, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { Plus, Trash2, Edit3, Shield, Zap, Terminal, Clock, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminChallenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        xp: 500,
        type: 'coding',
        difficulty: 'intermediate',
        active: true
    });

    const fetchChallenges = useCallback(async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "daily_challenges"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setChallenges(list);
        } catch (_err) {
            console.error(_err);
            toast.error("Failed to fetch challenges");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchChallenges();
    }, [fetchChallenges]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "daily_challenges"), {
                ...formData,
                createdAt: serverTimestamp()
            });
            toast.success("Challenge Deployed!");
            setIsAdding(false);
            setFormData({ title: '', desc: '', xp: 500, type: 'coding', difficulty: 'intermediate', active: true });
            fetchChallenges();
        } catch (_err) {
            toast.error("Deployment failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Abort this challenge mission?")) return;
        try {
            await deleteDoc(doc(db, "daily_challenges", id));
            toast.success("Mission Aborted");
            fetchChallenges();
        } catch (_err) {
            toast.error("Deactivation failed");
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
            <Helmet><title>Operation Control — Elite Hackers</title></Helmet>

            <div className="flex justify-between items-center pb-6 border-b border-[#1a2236]">
                <div>
                    <h1 className="font-display font-bold text-3xl text-primary tracking-widest uppercase">DAILY OPERATIONS</h1>
                    <p className="font-mono text-[10px] text-muted tracking-[4px] uppercase mt-1">Deploy and monitor global survival challenges</p>
                </div>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-bg-primary rounded-lg font-display font-bold text-[11px] tracking-widest uppercase hover:scale-105 transition-all"
                >
                    {isAdding ? <><X size={16} /> [ CANCEL ]</> : <><Plus size={16} /> [ DEPLOY NEW TASK ]</>}
                </button>
            </div>

            {isAdding && (
                <div className="bg-bg-card border border-primary/30 p-8 rounded-2xl animate-fade-in">
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block font-mono text-[10px] text-muted uppercase mb-2">Operational Title</label>
                            <input 
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                className="w-full bg-[#050508] border border-[#1a2236] rounded-lg p-3 font-mono text-sm text-primary focus:border-primary focus:outline-none"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block font-mono text-[10px] text-muted uppercase mb-2">Mission Briefing</label>
                            <textarea 
                                value={formData.desc}
                                onChange={e => setFormData({...formData, desc: e.target.value})}
                                className="w-full bg-[#050508] border border-[#1a2236] rounded-lg p-3 font-mono text-sm text-secondary h-24 focus:border-primary focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-mono text-[10px] text-muted uppercase mb-2">XP Reward</label>
                            <input 
                                type="number"
                                value={formData.xp}
                                onChange={e => setFormData({...formData, xp: parseInt(e.target.value)})}
                                className="w-full bg-[#050508] border border-[#1a2236] rounded-lg p-3 font-mono text-sm text-gold"
                            />
                        </div>
                        <div>
                            <label className="block font-mono text-[10px] text-muted uppercase mb-2">Mission Type</label>
                            <select 
                                value={formData.type}
                                onChange={e => setFormData({...formData, type: e.target.value})}
                                className="w-full bg-[#050508] border border-[#1a2236] rounded-lg p-3 font-mono text-sm text-cyan"
                            >
                                <option value="coding">Coding Infiltration</option>
                                <option value="security">Security Audit</option>
                                <option value="logic">Logic Override</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button type="submit" className="px-10 py-4 bg-primary text-bg-primary rounded-xl font-display font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all">
                                [ INITIALIZE DEPLOYMENT ]
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="py-20 text-center animate-pulse">
                        <Terminal size={40} className="text-primary mx-auto mb-4" />
                        <div className="font-mono text-xs text-muted uppercase">Scanning Ops Ledger...</div>
                    </div>
                ) : challenges.length === 0 ? (
                    <div className="bg-bg-card border border-dashed border-border p-20 text-center rounded-2xl">
                        <Shield size={40} className="text-muted mx-auto mb-4 opacity-20" />
                        <div className="font-display font-bold text-lg text-muted">NO ACTIVE OPERATIONS</div>
                    </div>
                ) : (
                    challenges.map(chal => (
                        <div key={chal.id} className="bg-bg-card border border-border p-6 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    {chal.type === 'coding' ? <Terminal size={24} /> : <Shield size={24} />}
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-lg text-primary uppercase tracking-widest">{chal.title}</h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="font-mono text-[9px] text-gold font-bold uppercase">⚡ {chal.xp} XP</span>
                                        <span className="font-mono text-[9px] text-cyan font-bold uppercase border border-cyan/30 px-2 py-0.5 rounded">{chal.difficulty}</span>
                                        <span className="font-mono text-[9px] text-muted uppercase">Detected: {chal.createdAt?.toDate().toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-muted hover:text-primary transition-colors"><Edit3 size={18} /></button>
                                <button onClick={() => handleDelete(chal.id)} className="p-2 text-muted hover:text-red transition-colors"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminChallenges;