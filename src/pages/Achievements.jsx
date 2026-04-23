import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star, Award, Zap, Shield, Target, Lock, CheckCircle2, Code, ShieldAlert, Terminal } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ALL_ACHIEVEMENTS = [
  { id: 'first-login', title: 'SYSTEM INITIALIZED', desc: 'Successfully created your digital identity.', icon: Zap, color: 'text-primary' },
  { id: 'pro-clearance', title: 'SECURITY CLEARANCE: PRO', desc: 'Upgraded to a Professional hacking node.', icon: Shield, color: 'text-cyan' },
  { id: 'first-compilation', title: 'CODEBREAKER', desc: 'Compiled and executed your first code payload.', icon: Target, color: 'text-purple' },
  { id: 'streak-7', title: 'WEEKLY PERSISTENCE', desc: 'Maintained a 7-day hacking streak.', icon: Award, color: 'text-gold' },
  { id: 'arena-god', title: 'ARENA LEGEND', desc: 'Achieved a 50x multiplier in Hack Arena.', icon: Star, color: 'text-red' },
  { id: 'arsenal-10', title: 'POLYGLOT PROTOCOL', desc: 'Mastered 10 different programming modules.', icon: Code, color: 'text-primary' },
  { id: 'admin-matrix', title: 'MATRIX OVERRIDE', desc: 'Gained access to the Admin Matrix clearance.', icon: Shield, color: 'text-gold' },
  { id: 'bug-hunter', title: 'VULNERABILITY RESEARCHER', desc: 'Identified and fixed 5 security flaws in challenges.', icon: ShieldAlert, color: 'text-red' },
  { id: 'dark-mode', title: 'VOID DWELLER', desc: 'Successfully navigated the dark mesh for 24 hours.', icon: Terminal, color: 'text-text-muted' },
];

const Achievements = () => {
    const { userData } = useAuth();
    const userAchievements = userData?.achievements || [];

    return (
        <div className="space-y-12 animate-fade-in-up">
            <Helmet><title>Achievements — ELITE HACKERS</title></Helmet>

            <div className="text-center md:text-left">
                <h1 className="font-display font-bold text-4xl text-text-primary tracking-widest uppercase mb-2">
                    DIGITAL <span className="text-primary glow-green">ACHIEVEMENTS</span>
                </h1>
                <p className="font-mono text-xs text-text-muted tracking-[3px] uppercase">Proof of your engineering domination</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ALL_ACHIEVEMENTS.map((ach, idx) => {
                    const isUnlocked = userAchievements.includes(ach.id) || idx < 2; // Mocking first 2 as unlocked
                    return (
                        <div key={ach.id} className={`relative bg-bg-card border p-8 rounded-2xl flex flex-col items-center text-center group transition-all duration-500 overflow-hidden ${isUnlocked ? 'border-primary/30 hover:border-primary/60 shadow-[0_0_30px_rgba(0,255,136,0.05)]' : 'border-border opacity-60'}`}>
                            
                            {!isUnlocked && (
                                <div className="absolute inset-0 bg-bg-primary/40 backdrop-blur-[1px] flex items-center justify-center z-10">
                                    <Lock size={24} className="text-text-muted opacity-50" />
                                </div>
                            )}

                            <div className={`p-5 rounded-2xl bg-bg-primary border border-border mb-6 group-hover:scale-110 transition-transform ${ach.color} ${isUnlocked ? 'glow-green' : ''}`}>
                                <ach.icon size={36} />
                            </div>

                            <h3 className={`font-display font-bold text-lg tracking-widest uppercase mb-2 ${isUnlocked ? 'text-text-primary' : 'text-text-muted'}`}>
                                {ach.title}
                            </h3>
                            <p className="font-body text-xs text-text-secondary leading-relaxed uppercase tracking-wider">
                                {ach.desc}
                            </p>

                            <div className="mt-8 pt-6 border-t border-border w-full flex justify-between items-center px-2">
                                <span className="font-mono text-[9px] text-text-muted font-bold tracking-widest uppercase">
                                    {isUnlocked ? 'STATUS: DECRYPTED' : 'STATUS: ENCRYPTED'}
                                </span>
                                {isUnlocked && <CheckCircle2 size={16} className="text-primary" />}
                            </div>

                            {/* Background Glow decorative */}
                            <div className={`absolute -bottom-10 -right-10 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity rounded-full ${ach.color.replace('text-', 'bg-')}`}></div>
                        </div>
                    );
                })}
            </div>

            {/* STATS SUMMARY */}
            <div className="bg-[#0d1117] border border-border rounded-2xl p-10 flex flex-col md:flex-row items-center justify-around gap-8">
               <div className="text-center">
                  <div className="font-display font-bold text-4xl text-primary mb-2">
                     {userAchievements.length < 2 ? 2 : userAchievements.length} / {ALL_ACHIEVEMENTS.length}
                  </div>
                  <div className="font-mono text-[10px] text-text-muted uppercase tracking-[4px]">Unlocked</div>
               </div>
               <div className="w-[1px] h-12 bg-border hidden md:block"></div>
               <div className="text-center">
                  <div className="font-display font-bold text-4xl text-gold mb-2">940</div>
                  <div className="font-mono text-[10px] text-text-muted uppercase tracking-[4px]">Achievement XP</div>
               </div>
               <div className="w-[1px] h-12 bg-border hidden md:block"></div>
               <div className="text-center">
                  <div className="font-display font-bold text-4xl text-cyan mb-2">Top 5%</div>
                  <div className="font-mono text-[10px] text-text-muted uppercase tracking-[4px]">Elite Status</div>
               </div>
            </div>
        </div>
    );
};

export default Achievements;