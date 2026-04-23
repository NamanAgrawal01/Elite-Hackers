import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { db } from '../../firebase/firebase';
import { collection, query, getDocs, addDoc, orderBy } from 'firebase/firestore';
import { Plus, Edit3, Trash2, ChevronRight, Code, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminContent = () => {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    
    // New Language Form State
    const [newLang, setNewLang] = useState({ 
        name: '', 
        id: '', 
        category: 'Development', 
        level: 'Beginner',
        icon: 'Terminal' 
    });

    const fetchLanguages = useCallback(async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "languages"), orderBy("name"));
            const snapshot = await getDocs(q);
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLanguages(list);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        Promise.resolve().then(() => fetchLanguages());
    }, [fetchLanguages]);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "languages"), {
                ...newLang,
                createdAt: new Date(),
                modules: []
            });
            toast.success("New Language Node Created");
            setIsAdding(false);
            fetchLanguages();
        } catch (error) {
            console.error(error);
            toast.error("Deployment Failed");
        }
    };

    return (
        <div className="max-w-7xl mx-auto animate-fade-in-up space-y-8">
            <Helmet><title>Content Engine — ELITE HACKERS</title></Helmet>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-border">
                <div>
                    <h1 className="font-display font-bold text-3xl text-primary tracking-widest uppercase mb-1">CONTENT ENGINE</h1>
                    <p className="font-mono text-[10px] text-muted tracking-[4px] uppercase font-bold">Injecting knowledge into the mesh</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-3 px-8 h-12 bg-primary text-bg-primary font-display font-bold text-xs tracking-widest rounded-lg hover:scale-105 transition-all shadow-lg uppercase"
                >
                    <Plus size={18} /> [ CREATE NEW NODE ]
                </button>
            </div>

            {isAdding && (
                <div className="bg-bg-card border border-primary/30 p-8 rounded-2xl animate-fade-in-up">
                    <h3 className="font-display font-bold text-lg text-primary uppercase tracking-widest mb-6">Initialize New Language Node</h3>
                    <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="font-mono text-[10px] text-muted uppercase font-bold tracking-widest">Display Name</label>
                            <input 
                                type="text" 
                                required
                                value={newLang.name}
                                onChange={e => setNewLang({...newLang, name: e.target.value, id: e.target.value.toLowerCase().replace(/\s/g, '-')})}
                                className="w-full bg-bg-primary border border-border rounded-lg p-3 font-mono text-sm text-primary focus:border-primary outline-none" 
                                placeholder="e.g. Python"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-mono text-[10px] text-muted uppercase font-bold tracking-widest">ID (Auto-generated)</label>
                            <input 
                                type="text" 
                                readOnly
                                value={newLang.id}
                                className="w-full bg-[#050508] border border-border rounded-lg p-3 font-mono text-sm text-muted cursor-not-allowed" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-mono text-[10px] text-muted uppercase font-bold tracking-widest">Category</label>
                            <select 
                                className="w-full bg-bg-primary border border-border rounded-lg p-3 font-mono text-sm text-primary focus:border-primary outline-none"
                                value={newLang.category}
                                onChange={e => setNewLang({...newLang, category: e.target.value})}
                            >
                                <option>Development</option>
                                <option>Security</option>
                                <option>Systems</option>
                                <option>Data Science</option>
                            </select>
                        </div>
                        <div className="flex items-end gap-3">
                            <button type="submit" className="flex-1 h-12 bg-primary text-bg-primary font-display font-bold text-[10px] tracking-widest rounded-lg uppercase">Deploy</button>
                            <button type="button" onClick={() => setIsAdding(false)} className="h-12 px-6 border border-border text-muted rounded-lg font-display font-bold text-[10px] tracking-widest uppercase">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1,2,3].map(i => <div key={i} className="h-40 bg-bg-card border border-border rounded-2xl animate-pulse"></div>)
                ) : languages.map(lang => (
                    <div key={lang.id} className="bg-bg-card border border-border p-6 rounded-2xl hover:border-primary/30 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Globe size={48} />
                        </div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-bg-primary border border-border rounded-xl flex items-center justify-center text-primary">
                                <Code size={24} />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-muted hover:text-cyan transition-all"><Edit3 size={16} /></button>
                                <button className="p-2 text-muted hover:text-red transition-all"><Trash2 size={16} /></button>
                            </div>
                        </div>
                        <h3 className="font-display font-bold text-xl text-primary uppercase tracking-widest mb-2">{lang.name}</h3>
                        <div className="flex gap-4">
                            <span className="font-mono text-[9px] text-muted uppercase tracking-widest font-bold">{lang.category}</span>
                            <span className="font-mono text-[9px] text-primary uppercase tracking-widest font-bold">{lang.modules?.length || 0} MODULES</span>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
                            <span className="font-mono text-[10px] text-muted uppercase tracking-widest">Clearance: LVL 1</span>
                            <button className="text-primary font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                                [ EDIT CONTENT ] <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminContent;