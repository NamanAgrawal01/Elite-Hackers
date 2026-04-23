import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ROADMAPS } from '../utils/constants';

const Roadmaps = () => {
    return (
        <div className="space-y-12 animate-fade-in-up">
            <Helmet><title>Learning Roadmaps — ELITE HACKERS</title></Helmet>

            <div className="pb-8 border-b border-border">
                <h1 className="font-display font-bold text-4xl text-text-primary tracking-widest uppercase mb-4">
                    LEARNING <span className="text-primary glow-green">ROADMAPS</span>
                </h1>
                <p className="font-mono text-[10px] text-text-muted tracking-[6px] uppercase font-bold">Structural trajectories for elite operative specialization</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {ROADMAPS.map((road, idx) => (
                    <motion.div 
                        key={road.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-all group relative overflow-hidden flex flex-col h-full"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <road.icon size={160} />
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className={`p-4 rounded-xl bg-bg-primary border border-border shadow-lg ${road.color} group-hover:scale-110 transition-transform`}>
                                <road.icon size={36} />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-2xl text-text-primary tracking-wide uppercase">
                                    {road.title}
                                </h3>
                                <span className="font-mono text-[9px] text-primary tracking-[4px] uppercase font-bold">NODE NETWORK ACTIVE</span>
                            </div>
                        </div>

                        <p className="font-mono text-[11px] text-text-secondary mb-10 leading-relaxed uppercase tracking-widest">
                            {road.desc}
                        </p>

                        <div className="flex-1 space-y-0 relative">
                            {road.steps.map((step, sIdx) => (
                                <div key={sIdx} className="relative pl-10 pb-6 group/step">
                                    {sIdx < road.steps.length - 1 && (
                                        <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-border group-hover/step:bg-primary/30 transition-colors"></div>
                                    )}
                                    <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center font-mono text-[9px] font-bold z-10 transition-all ${sIdx === 0 ? 'bg-primary border-primary text-bg-primary shadow-[0_0_10px_var(--primary-glow)]' : 'bg-bg-primary border-border text-text-muted group-hover/step:border-primary/50'}`}>
                                        {sIdx + 1}
                                    </div>
                                    <div className="font-display font-bold text-[13px] text-text-primary tracking-widest uppercase group-hover/step:text-primary transition-colors">{step}</div>
                                </div>
                            ))}
                        </div>

                        <Link to={`/roadmaps/${road.id}`} className="w-full mt-10 py-5 bg-bg-primary border border-primary/30 text-primary font-display font-bold text-xs tracking-[4px] rounded-xl hover:bg-primary hover:text-bg-primary transition-all uppercase text-center shadow-lg">
                            [ INITIATE PATH ]
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Roadmaps;