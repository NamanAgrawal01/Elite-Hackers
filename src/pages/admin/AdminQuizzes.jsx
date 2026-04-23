import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { db } from '../../firebase/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { Target, Search, Plus, Edit3, Trash2 } from 'lucide-react';

const AdminQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchQuizzes = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "quizzes"), orderBy("languageId"));
                const snapshot = await getDocs(q);
                const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setQuizzes(list);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuizzes();
    }, []);

    const filteredQuizzes = quizzes.filter(q => 
        q.languageId?.toLowerCase().includes(search.toLowerCase()) || 
        q.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto animate-fade-in-up space-y-8">
            <Helmet><title>Evaluation Core — ELITE HACKERS</title></Helmet>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-border">
                <div>
                    <h1 className="font-display font-bold text-3xl text-text-primary tracking-widest uppercase mb-1">EVALUATION CORE</h1>
                    <p className="font-mono text-[10px] text-text-muted tracking-[4px] uppercase font-bold">Standardizing terminal proficiency</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input 
                            type="text" 
                            placeholder="FILTER QUIZZES..." 
                            className="bg-bg-card border border-border rounded-xl py-3 pl-12 pr-4 font-mono text-xs focus:border-purple-500 outline-none transition-all uppercase"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1,2,3].map(i => <div key={i} className="h-48 bg-bg-card border border-border rounded-2xl animate-pulse"></div>)
                ) : filteredQuizzes.map(item => (
                    <div key={item.id} className="bg-bg-card border border-border p-6 rounded-2xl group hover:border-primary/40 transition-all flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary">
                                <Target size={24} />
                            </div>
                            <div className="flex gap-1">
                                <button className="p-2 text-text-muted hover:text-cyan transition-all"><Edit3 size={16} /></button>
                                <button className="p-2 text-text-muted hover:text-red transition-all"><Trash2 size={16} /></button>
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-[9px] text-primary font-bold tracking-widest uppercase mb-1">{item.languageId}</div>
                            <h3 className="font-display font-bold text-xl text-text-primary tracking-wide mb-4 whitespace-nowrap overflow-hidden text-ellipsis">{item.title || 'Standard Assessment'}</h3>
                            <div className="flex gap-6 mb-8">
                                <div className="flex flex-col">
                                    <span className="font-mono text-[8px] text-text-muted uppercase tracking-widest mb-1">QUESTIONS</span>
                                    <span className="font-display font-bold text-lg text-text-primary">{item.questions?.length || 0}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-mono text-[8px] text-text-muted uppercase tracking-widest mb-1">TOTAL XP</span>
                                    <span className="font-display font-bold text-lg text-primary">+{item.rewardXP || 1000}</span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-[#050508] border border-border text-text-muted font-mono text-[10px] font-bold tracking-widest uppercase rounded-lg group-hover:border-primary/30 group-hover:text-primary transition-all">
                            [ MODIFY ASSESSMENT ]
                        </button>
                    </div>
                ))}

                <button 
                  onClick={() => toast('Evaluation Creator coming soon to main terminal.', { icon: '🛠️' })}
                  className="h-full min-h-[250px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                >
                    <Plus size={32} className="text-text-muted group-hover:text-primary transition-all" />
                    <span className="font-display font-bold text-xs text-text-muted group-hover:text-primary tracking-widest uppercase">ADD NEW ASSESSMENT</span>
                </button>
            </div>
        </div>
    );
};

export default AdminQuizzes;