import React, { useEffect, useState } from 'react';
import LoadingScreen from '../components/ui/LoadingScreen';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Zap, Target, Code, Award, ChevronRight, Lock, Shield, Terminal, Activity, ShieldAlert } from 'lucide-react';
import CountUp from '../components/ui/CountUp';
import StreakCalendar from '../components/ui/StreakCalendar';
import { format } from 'date-fns';

import { LANGUAGES } from '../utils/constants';
import GlobalActivityFeed from '../components/dashboard/GlobalActivityFeed';

// Mock data moved outside to ensure component purity
const XP_HISTORY_MOCK = [
  { id: 1, reason: "Infiltration: Home Network", amount: 50, timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  { id: 2, reason: "Data Extraction: Python Mesh", amount: 200, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: 3, reason: "Streak Bonus: 3 Days", amount: 500, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) },
  { id: 4, reason: "Protocol Initialized", amount: 1000, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72) },
];

const Dashboard = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    // Sync date on mount if needed, or just keep it static for the render cycle
    // Sync removed for purity
  }, []);
  
  if (!userData) return <LoadingScreen />;

  const stats = [
    { label: 'TOTAL XP', value: userData.totalXP || 0, icon: Zap, color: 'text-primary', delay: 0 },
    { label: 'CURRENT LEVEL', value: userData.level || 1, icon: Target, color: 'text-cyan', delay: 0.1, suffix: ` — ${userData.rank || 'Recruit'}` },
    { label: 'LANGUAGES DONE', value: userData.completedLanguages?.length || 0, icon: Code, color: 'text-gold', delay: 0.2 },
    { label: 'CERTIFICATES', value: userData.certificates?.length || 0, icon: Award, color: 'text-purple', delay: 0.3 }
  ];

  // Map progress to actual language data if available, otherwise use mock for UI
  const inProgressLangs = userData.completedLanguages?.length > 0
    ? LANGUAGES.filter(l => userData.completedLanguages.includes(l.id)).slice(0, 2)
    : [LANGUAGES[0], LANGUAGES[2]];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <Helmet>
        <title>Dashboard — ELITE HACKERS</title>
      </Helmet>

      {/* GREETING & PLAN STATUS ROW */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-primary uppercase tracking-wider mb-2 flex items-center gap-3">
            WELCOME BACK, <span className="text-primary glow-green">{userData.username?.toUpperCase()}</span>
          </h1>
          <p className="font-mono text-secondary text-sm flex items-center gap-2 tracking-widest">
            {format(currentDate, 'MMMM d, yyyy')} <span className="text-border">|</span> Node Status: {userData.isSuspended ? 'SUSPENDED' : 'ONLINE'}
            {userData.streak > 0 && (
               <span className="text-gold glow-gold font-bold ml-2">🔥 {userData.streak} Day Streak!</span>
            )}
          </p>
        </div>

        {/* Plan Status Banner */}
        <div className={`w-full xl:w-auto px-6 py-4 rounded-2xl border flex items-center gap-6 relative overflow-hidden group ${userData.pendingPlan ? 'bg-gold/10 border-gold/30' : 'bg-primary/5 border-primary/20'}`}>
           <div className={`p-3 rounded-lg bg-bg-primary border border-border ${userData.pendingPlan ? 'text-gold' : 'text-primary'}`}>
              <Shield size={20} />
           </div>
           <div>
              <div className="font-mono text-[9px] text-muted uppercase tracking-[3px] font-bold mb-1">Clearance Level</div>
              <div className="flex items-center gap-3">
                 <span className={`font-display font-bold text-xl tracking-widest uppercase ${userData.pendingPlan ? 'text-gold' : 'text-primary'}`}>
                    {userData.plan === 'free' ? 'RECRUIT' : userData.plan === 'pro' ? 'PRO HACKER' : userData.plan === 'elite' ? 'ELITE SENTINEL' : 'ADMIN STAFF'}
                 </span>
                 {userData.pendingPlan && (
                    <span className="animate-pulse bg-gold text-[#050508] font-mono text-[8px] px-1.5 py-0.5 rounded font-bold uppercase">
                       UPGRADE PENDING
                    </span>
                 )}
              </div>
           </div>
           <ChevronRight size={20} className="text-muted ml-auto group-hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/pricing')} />
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.delay }}
            className="bg-bg-card border border-border p-6 rounded-[16px] hover:-translate-y-1 hover:border-primary/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] text-muted font-bold tracking-widest leading-loose">
                {stat.label.split(' ').join('\\n')}
              </span>
              <stat.icon size={20} className={`${stat.color} group-hover:scale-110 transition-transform`} />
            </div>
            <div className="font-display font-bold text-3xl text-primary">
              <CountUp end={stat.value} />
            </div>
            {stat.suffix && (
              <div className="font-mono text-[10px] text-secondary mt-1">{stat.suffix}</div>
            )}
          </motion.div>
        ))}
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CONTINUE LEARNING */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-display font-bold text-lg text-primary tracking-widest uppercase flex items-center gap-2">
             <Activity size={18} className="text-primary" /> ACTIVE INFILTRATIONS
          </h2>
          
          <div className="flex flex-col gap-4">
            {inProgressLangs.map((course, idx) => (
              <div key={idx} className="bg-bg-elevated border border-border rounded-xl p-5 flex items-center gap-6 hover:border-primary/30 transition-colors group">
                <div className="text-4xl">{course.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="font-display font-bold text-lg tracking-wider uppercase">{course.name}</h3>
                    <span className="font-mono text-primary text-[11px] font-bold tracking-widest">{course.name === 'Python' ? '45' : '78'}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0d1117] rounded-full overflow-hidden mb-2 border border-[#1a2236]">
                    <div className="h-full bg-primary" style={{ width: `${course.name === 'Python' ? '45' : '78'}%` }}></div>
                   </div>
                  <div className="font-mono text-[10px] text-muted uppercase tracking-widest">
                    Synchronizing Cache...
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="px-6 py-2.5 border border-cyan text-cyan rounded-md text-[11px] font-mono font-bold uppercase tracking-widest group-hover:bg-cyan/10 transition-colors flex items-center gap-2"
                >
                  [ RESUME ] <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* MISSIONS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
             {[
                { title: "Firewall Breach", desc: "Complete 3 Network Security Quizzes", xp: 300, icon: Shield },
                { title: "Ghost in the Machine", desc: "Run 10 scripts in the compiler", xp: 150, icon: Terminal }
             ].map((mission, i) => (
                <div key={i} className="bg-bg-card border border-border p-4 rounded-xl flex items-center gap-4 group hover:border-gold/30 transition-all cursor-pointer">
                   <div className="p-3 bg-gold/10 rounded-lg text-gold group-hover:scale-110 transition-transform">
                      <mission.icon size={18} />
                   </div>
                   <div>
                      <h4 className="font-display font-bold text-[11px] text-primary uppercase tracking-widest">{mission.title}</h4>
                      <p className="font-mono text-[9px] text-muted uppercase mt-1">{mission.desc}</p>
                   </div>
                   <div className="ml-auto font-mono text-[10px] text-gold font-bold">+{mission.xp}</div>
                </div>
             ))}
          </div>
        </div>

        {/* SECURITY STATUS & FEED */}
        <div className="space-y-6">
          <div className="bg-[#050508] border border-border rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldAlert size={48} className="text-primary" />
             </div>
             <h2 className="font-display font-bold text-[10px] text-muted tracking-[4px] uppercase mb-4">Node Security Score</h2>
             <div className="flex items-center gap-6">
                <div className="relative w-20 h-20">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-[#1a2236]" />
                      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={226} strokeDashoffset={226 - (226 * 0.85)} className="text-primary" />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-xl text-primary">85%</div>
                </div>
                <div>
                   <div className="font-mono text-xs text-primary font-bold uppercase mb-1">OPTIMIZED</div>
                   <p className="font-mono text-[9px] text-muted uppercase tracking-widest leading-relaxed">No critical vulnerabilities detected in your current profile.</p>
                </div>
             </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-primary tracking-widest uppercase">GLOBAL MESH FEED</h2>
            <div className="h-[300px]">
               <GlobalActivityFeed />
            </div>
            
            {/* TOP NODES WIDGET */}
            <div className="bg-[#050508] border border-border rounded-2xl p-6">
               <h3 className="font-display font-bold text-[10px] text-muted tracking-[4px] uppercase mb-4 flex justify-between items-center">
                  TOP NODES <span className="text-primary text-[8px] animate-pulse">LIVE</span>
               </h3>
               <div className="space-y-3">
                  {[
                     { name: "SHADOW_BYTE", level: 99, xp: "1.2M", color: "text-primary" },
                     { name: "NULL_PTR", level: 84, xp: "850K", color: "text-cyan" },
                     { name: "QUANTUM_FOX", level: 72, xp: "620K", color: "text-purple" }
                  ].map((user, i) => (
                     <div key={i} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                           <span className="font-mono text-[10px] text-muted">0{i+1}</span>
                           <span className={`font-display font-bold text-xs tracking-widest ${user.color} group-hover:underline`}>{user.name}</span>
                        </div>
                        <div className="text-right">
                           <div className="font-mono text-[9px] text-primary font-bold">LVL {user.level}</div>
                           <div className="font-mono text-[8px] text-muted uppercase">{user.xp} XP</div>
                        </div>
                     </div>
                  ))}
               </div>
               <button onClick={() => navigate('/leaderboard')} className="w-full mt-6 py-2 border border-[#1a2236] text-muted font-mono text-[8px] tracking-[3px] uppercase hover:text-primary hover:border-primary/30 transition-all rounded">
                  [ VIEW FULL REGISTRY ]
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* DAILY CHALLENGE SECTION */}
      <div className="w-full bg-gradient-to-r from-bg-card to-[#111827] border border-border rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
        
        <div>
          <div className="flex items-center gap-2 mb-2 text-primary font-mono text-[10px] font-bold tracking-[6px] uppercase">
             <Zap size={14} className="animate-pulse" /> SYSTEM OVERRIDE ACTIVE
          </div>
          <h2 className="font-display font-bold text-2xl text-primary tracking-widest mb-2 uppercase">DAILY SURVIVAL TASK</h2>
          <p className="font-mono text-[11px] text-secondary uppercase tracking-widest leading-relaxed">Decrypt the central mainframe using advanced SQL injection patterns.</p>
        </div>
        
        <button onClick={() => navigate('/daily-challenges')} className="px-10 py-5 bg-primary text-bg-primary font-display font-[800] text-xs tracking-[4px] uppercase rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)] shrink-0">
          [ DEPLOY NOW ]
        </button>
      </div>

      {/* YOUR STREAK */}
      <StreakCalendar xpHistory={XP_HISTORY_MOCK} />


      {/* FOURTH ROW: THE FULL ARSENAL PREVIEW */}
      <div className="space-y-4">
         <div className="flex justify-between items-center">
            <h2 className="font-display font-bold text-lg text-primary tracking-widest uppercase">THE FULL ARSENAL</h2>
            <button onClick={() => navigate('/arsenal')} className="text-[10px] font-mono tracking-widest text-muted hover:text-primary transition-colors">[ EXPLORE ALL ]</button>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {LANGUAGES.slice(0, 18).map((lang, i) => (
              <div 
                key={lang.id} 
                onClick={() => navigate(`/course/${lang.id}`)}
                className="bg-bg-card border border-border p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer relative overflow-hidden group"
              >
                {userData.plan === 'free' && i > 4 && (
                  <div className="absolute inset-0 bg-[#050508]/80 backdrop-blur-[2px] flex items-center justify-center z-10 transition-all opacity-100 group-hover:bg-[#050508]/40">
                    <div className="flex flex-col items-center gap-2">
                       <Lock size={16} className="text-primary animate-pulse" />
                       <span className="font-mono text-[8px] text-primary font-bold tracking-widest uppercase">UPGRADE REQUIRED</span>
                    </div>
                  </div>
                )}
                <span className="text-2xl mb-2">{lang.icon}</span>
                <span className="font-display font-bold text-xs tracking-wider uppercase">{lang.name}</span>
                <div className="mt-2 w-full h-[2px] bg-border group-hover:bg-primary/30 transition-colors"></div>
              </div>
            ))}
         </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
      