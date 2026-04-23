import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { Users, UserPlus, Trophy, Terminal, Search, Shield, Globe, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_SQUADS = [
    { id: 's1', name: 'Fsociety', members: 42, xp: 852000, rank: 1, type: 'PUBLIC' },
    { id: 's2', name: 'Zero Days', members: 15, xp: 624100, rank: 2, type: 'PRIVATE' },
    { id: 's3', name: 'Binary Reapers', members: 89, xp: 512000, rank: 3, type: 'PUBLIC' },
    { id: 's4', name: 'Null Sect', members: 5, xp: 489000, rank: 4, type: 'PUBLIC' },
];

const CommunitySquads = () => {
    const { userData } = useAuth();
    const [search, setSearch] = useState('');

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-fade-in-up">
            <Helmet><title>Squad Matrix — ELITE HACKERS</title></Helmet>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-border">
                <div>
                    <h1 className="font-display font-bold text-3xl text-text-primary tracking-widest uppercase mb-1">SQUAD MATRIX</h1>
                    <p className="font-mono text-[10px] text-text-muted tracking-[4px] uppercase font-bold">Unify coordinates with elite hacker collectives</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-3 bg-[#0d1117] border border-border text-text-muted hover:text-primary hover:border-primary transition-all font-mono text-[10px] font-bold tracking-widest uppercase rounded-lg">
                        [ CREATE SQUAD ]
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-3 bg-primary text-bg-primary font-display font-bold text-[10px] tracking-widest uppercase rounded-lg hover:scale-105 transition-all shadow-lg">
                        [ JOIN RANDOM ]
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* LEFT COL: LEADERBOARD PREVIEW */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-border bg-bg-primary/50 flex items-center gap-2">
                            <Trophy size={16} className="text-gold" />
                            <span className="font-mono text-[10px] font-bold tracking-widest uppercase">HALL OF SQUADS</span>
                        </div>
                        <div className="p-4 space-y-4">
                            {MOCK_SQUADS.slice(0, 3).map((s) => (
                                <div key={s.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className={`font-mono text-[10px] font-bold ${s.rank === 1 ? 'text-gold' : 'text-text-muted'}`}>#{s.rank}</span>
                                        <span className="font-display font-bold text-xs text-text-primary uppercase">{s.name}</span>
                                    </div>
                                    <span className="font-mono text-[10px] text-primary">{(s.xp / 1000).toFixed(1)}K</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0b0404] border border-red/20 rounded-2xl p-6 text-center">
                        <Shield size={32} className="text-red mx-auto mb-4 opacity-50" />
                        <h3 className="font-display font-bold text-sm text-text-primary tracking-widest uppercase mb-2">RESTRICTED NODES</h3>
                        <p className="font-mono text-[10px] text-text-muted leading-relaxed uppercase">Join a squad to unlock shared cache and collective XP pooling.</p>
                    </div>
                </div>

                {/* RIGHT COL: SQUAD FEED / SEARCH */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input 
                            type="text" 
                            placeholder="SEARCH ACTIVE COLLECTIVES..." 
                            className="w-full bg-bg-card border border-border rounded-xl py-4 pl-12 pr-4 font-mono text-xs focus:border-cyan outline-none transition-all uppercase tracking-widest"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {MOCK_SQUADS.map((s) => (
                            <motion.div 
                                key={s.id}
                                whileHover={{ y: -4 }}
                                className="bg-bg-card border border-border p-6 rounded-2xl hover:border-primary/30 transition-all group cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-bg-primary border border-border rounded-xl flex items-center justify-center text-primary group-hover:shadow-[0_0_15px_rgba(0,255,136,0.2)] transition-all">
                                        <Terminal size={24} />
                                    </div>
                                    <span className={`font-mono text-[9px] font-bold px-2 py-1 rounded bg-bg-primary border ${s.type === 'PUBLIC' ? 'text-primary border-primary/20' : 'text-gold border-gold/20'}`}>
                                        {s.type}
                                    </span>
                                </div>
                                <h3 className="font-display font-bold text-xl text-text-primary uppercase tracking-widest mb-1">{s.name}</h3>
                                <div className="flex items-center gap-4 font-mono text-[10px] text-text-secondary uppercase">
                                    <span className="flex items-center gap-1.5"><Users size={12} /> {s.members} Operatives</span>
                                    <span className="flex items-center gap-1.5"><Globe size={12} /> Global rank #{s.rank}</span>
                                </div>
                                <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
                                    <div className="font-mono text-xs font-bold text-primary">{(s.xp / 1000).toFixed(0)}K TOTAL XP</div>
                                    <button className="text-[10px] font-mono font-bold text-text-muted group-hover:text-primary transition-colors tracking-[2px] uppercase">
                                        [ VIEW INTEL ]
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunitySquads;
