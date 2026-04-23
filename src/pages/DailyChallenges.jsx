import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion as Motion as Motion } from 'framer-motion';
import { Zap, Clock, Trophy, ChevronRight, Play, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import CountUp from '../components/ui/CountUp';

const DailyChallenges = () => {
    const { userData } = useAuth();
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const tomorrow = new Date();
            tomorrow.setHours(24, 0, 0, 0);
            const diff = tomorrow - now;
            
            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            
            setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const challenges = [
        { id: 1, title: "Array Mutator", lang: "JavaScript", difficulty: "Medium", xp: 500, players: "4.2k", status: "Available" },
        { id: 2, title: "Safe Memory", lang: "Rust", difficulty: "Hard", xp: 1200, players: "1.1k", status: "Locked" },
        { id: 3, title: "Query Optimizer", lang: "SQL", difficulty: "Easy", xp: 200, players: "8.9k", status: "Completed" },
    ];

    return (
        <div className="space-y-12 animate-fade-in-up">
            <Helmet><title>Challenges — ELITE HACKERS</title></Helmet>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="font-display font-bold text-4xl text-text-primary tracking-widest uppercase mb-2">
                        DAILY <span className="text-primary glow-green">CHALLENGES</span>
                    </h1>
                    <p className="font-mono text-xs text-text-muted tracking-[3px] uppercase">New missions decrypted every 24 hours</p>
                </div>
                
                <div className="bg-bg-card border border-primary/20 p-4 rounded-xl flex items-center gap-6">
                    <div className="text-center">
                        <div className="font-mono text-[9px] text-text-muted uppercase tracking-widest mb-1">Time Remaining</div>
                        <div className="font-display font-bold text-2xl text-primary tracking-widest">{timeLeft}</div>
                    </div>
                    <div className="w-[1px] h-10 bg-border"></div>
                    <div className="text-center">
                        <div className="font-mono text-[9px] text-text-muted uppercase tracking-widest mb-1">Current Streak</div>
                        <div className="font-display font-bold text-2xl text-gold tracking-widest">
                            <span className="mr-1">🔥</span>{userData?.streak || 0}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ACTIVE HERO CHALLENGE */}
                <div className="lg:col-span-2 bg-[#0d1117] border-2 border-primary rounded-2xl p-8 relative overflow-hidden group shadow-[0_0_50px_rgba(0,255,136,0.1)]">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-center md:text-left">
                            <div className="flex items-center gap-2 text-primary font-mono text-[10px] font-bold tracking-widest uppercase mb-4">
                                <Zap size={14} className="animate-pulse" /> TODAY'S MAIN OBJECTIVE
                            </div>
                            <h2 className="font-display font-bold text-3xl text-text-primary tracking-widest mb-4 uppercase leading-tight">Mastering Bitwise <br/> Manipulation in C++</h2>
                            <p className="font-body text-text-secondary max-w-md text-sm mb-8 leading-relaxed">
                                Decrypt the hidden payload by applying XOR masks to the input buffer. Efficiency is key for the 2x XP bonus.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded text-primary font-mono text-[11px] font-bold tracking-widest uppercase">
                                    +1,500 XP
                                </div>
                                <div className="px-4 py-2 border border-border rounded text-text-muted font-mono text-[11px] font-bold tracking-widest uppercase">
                                    28% PASS RATE
                                </div>
                            </div>
                        </div>
                        
                        <button className="w-full md:w-auto h-20 px-12 bg-primary text-bg-primary font-display font-bold text-lg tracking-[4px] rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] transition-all flex items-center justify-center gap-4 uppercase group">
                            [ START MISSON ] <Play size={24} className="group-hover:translate-x-1 transition-transform" fill="currentColor" />
                        </button>
                    </div>
                </div>

                {/* SIDE MISSIONS */}
                <div className="space-y-4">
                    <h3 className="font-display font-bold text-lg text-text-primary flex items-center gap-2 uppercase tracking-widest">
                        <Trophy size={18} className="text-gold" /> SIDE MISSIONS
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        {challenges.map((c) => (
                            <div key={c.id} className={`bg-bg-card border border-border p-5 rounded-xl flex items-center justify-between gap-4 transition-all ${c.status === 'Locked' ? 'opacity-50 grayscale' : 'hover:border-primary/50 cursor-pointer group'}`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-bg-primary border border-border flex items-center justify-center font-display font-bold text-xs text-primary group-hover:bg-primary/10 transition-colors">
                                        {c.lang[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-display font-bold text-sm text-text-primary tracking-wide uppercase">{c.title}</h4>
                                        <div className="flex gap-3 mt-1">
                                            <span className="font-mono text-[9px] text-text-muted uppercase font-bold">{c.lang}</span>
                                            <span className="font-mono text-[9px] text-primary uppercase font-bold tracking-widest">+{c.xp} XP</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    {c.status === 'Completed' ? (
                                        <ShieldCheck size={20} className="text-primary" />
                                    ) : (
                                        <button className="p-2 border border-border rounded hover:border-primary hover:text-primary transition-all">
                                            <ChevronRight size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* LEADERBOARD SNIPPET */}
                <div className="bg-[#050508] border border-border p-6 rounded-2xl flex flex-col">
                    <h3 className="font-display font-bold text-lg text-text-primary flex items-center gap-2 uppercase tracking-widest mb-6">
                        <Activity size={18} className="text-primary" /> TOP OPERATIVES
                    </h3>
                    <div className="space-y-4 flex-1">
                        {[
                            { name: 'neo_coder', xp: '18,450', rank: 1 },
                            { name: 'null_pointer', xp: '16,200', rank: 2 },
                            { name: 'cipher_x', xp: '14,900', rank: 3 },
                        ].map(user => (
                            <div key={user.rank} className="flex items-center justify-between p-3 bg-bg-card border border-border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <span className={`font-mono font-bold text-xs ${user.rank === 1 ? 'text-gold' : user.rank === 2 ? 'text-silver' : 'text-bronze'}`}>#{user.rank}</span>
                                    <span className="font-mono text-xs text-text-primary font-bold uppercase">{user.name}</span>
                                </div>
                                <span className="font-mono text-[10px] text-primary font-bold">{user.xp} XP</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 border border-primary/20 text-text-muted hover:text-primary hover:border-primary font-mono text-[10px] font-bold tracking-widest rounded-lg transition-all uppercase">
                        [ VIEW FULL RANKINGS ]
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DailyChallenges;