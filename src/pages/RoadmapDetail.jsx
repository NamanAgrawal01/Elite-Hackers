import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, CheckCircle2, Lock, Play, Layers } from 'lucide-react';

const ROADMAP_DATA = {
    'full-stack-engineer': {
        title: 'Full-Stack Engineer',
        modules: [
            { id: 'm1', name: 'Web Fundamentals', lessons: ['Semantic HTML', 'CSS Architectures', 'Modern JS Patterns'], xp: 500 },
            { id: 'm2', name: 'Reactive UI', lessons: ['React Components', 'State Management', 'Hooks Deep Dive'], xp: 800 },
            { id: 'm3', name: 'Backend Core', lessons: ['Node.js Runtimes', 'RESTful APIs', 'Middleware Logic'], xp: 1200 },
        ]
    },
    'cyber-security': {
        title: 'Offensive Security',
        modules: [
            { id: 'c1', name: 'Reconnaissance', lessons: ['Network Mapping', 'Open Source Intel', 'Enumeration'], xp: 600 },
            { id: 'c2', name: 'Exploitation', lessons: ['Buffer Overflows', 'SQL Injection', 'Cross-Site Scripting'], xp: 1500 },
            { id: 'c3', name: 'Persistence', lessons: ['Privilege Escalation', 'Backdoors', 'Cleanup'], xp: 1200 },
        ]
    }
};

const RoadmapDetail = () => {
    const { id } = useParams();
    const roadmap = ROADMAP_DATA[id] || ROADMAP_DATA['full-stack-engineer'];

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-fade-in-up">
            <Helmet><title>{roadmap.title} Path — ELITE HACKERS</title></Helmet>

            <Link to="/roadmaps" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-all font-mono text-xs uppercase tracking-widest group">
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> [ BACK TO ALL ROADMAPS ]
            </Link>

            <div className="bg-bg-card border border-border rounded-3xl p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <Layers size={24} className="text-primary" />
                        <span className="font-mono text-[10px] text-primary font-bold tracking-[6px] uppercase">Path Initialization</span>
                    </div>
                    <h1 className="font-display font-bold text-4xl text-primary tracking-widest uppercase mb-6">{roadmap.title}</h1>
                    <div className="flex gap-10">
                        <div>
                            <div className="text-muted font-mono text-[9px] uppercase tracking-widest mb-1">Modules</div>
                            <div className="text-primary font-display font-bold text-xl">{roadmap.modules.length} Nodes</div>
                        </div>
                        <div>
                            <div className="text-muted font-mono text-[9px] uppercase tracking-widest mb-1">Avg Time</div>
                            <div className="text-primary font-display font-bold text-xl">12 Weeks</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {roadmap.modules.map((mod, idx) => (
                    <div key={mod.id} className="bg-bg-card border border-border rounded-2xl overflow-hidden group">
                        <div className="p-6 flex items-center justify-between border-b border-border bg-[#050508]/50">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center font-mono text-sm text-primary font-bold">
                                    {idx + 1}
                                </div>
                                <h3 className="font-display font-bold text-lg text-primary tracking-wide uppercase">{mod.name}</h3>
                            </div>
                            <span className="font-mono text-[10px] text-primary font-bold">+{mod.xp} XP</span>
                        </div>
                        <div className="p-6 space-y-4">
                            {mod.lessons.map((lesson, lIdx) => (
                                <div key={lIdx} className="flex items-center justify-between group/lesson">
                                    <div className="flex items-center gap-4">
                                        <CheckCircle2 size={16} className={lIdx === 0 ? 'text-primary' : 'text-muted opacity-30'} />
                                        <span className={`font-mono text-[11px] tracking-widest uppercase ${lIdx === 0 ? 'text-primary' : 'text-secondary'}`}>
                                            {lesson}
                                        </span>
                                    </div>
                                    {lIdx === 0 ? (
                                        <button className="px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary font-mono text-[9px] font-bold rounded uppercase hover:bg-primary hover:text-bg-primary transition-all">
                                            [ DEPLOY LESSON ]
                                        </button>
                                    ) : (
                                        <Lock size={14} className="text-muted opacity-20" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-10 border-t border-border flex justify-between items-center">
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest">Enrollment Status: SECURED</p>
                <button className="px-10 py-4 bg-primary text-bg-primary font-display font-bold text-xs tracking-[4px] rounded-xl hover:scale-105 transition-all shadow-lg uppercase">
                    [ START FULL PATH ]
                </button>
            </div>
        </div>
    );
};

export default RoadmapDetail;