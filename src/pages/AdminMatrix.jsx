import React from 'react';
import LoadingScreen from '../components/ui/LoadingScreen';
import { useAuth } from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { Shield, Terminal, Users, FileText, Activity, Lock, Unlock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminMatrix = () => {
  const { userData } = useAuth();
  
  if (!userData) return <LoadingScreen />;

  // Check if user has 'admin' plan OR is a staff admin
  const hasAdminship = userData.plan === 'admin' || userData.role === 'admin';

  if (!hasAdminship) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <Helmet><title>Access Denied — Elite Hackers</title></Helmet>
        <Lock size={64} className="text-red mx-auto mb-6 opacity-50" />
        <h1 className="font-display font-bold text-4xl text-primary tracking-tighter uppercase mb-4">ACCESS DENIED</h1>
        <p className="font-mono text-sm text-secondary max-w-lg mx-auto mb-8 uppercase tracking-widest leading-relaxed">
          The Administrative Matrix requires level 4 security clearance. Your current node does not possess the required credentials.
        </p>
        <Link to="/pricing" className="inline-block px-8 py-4 bg-primary text-bg-primary font-display font-bold tracking-widest rounded-xl hover:scale-105 transition-all uppercase">
          [ ACQUIRE CLEARANCE ]
        </Link>
      </div>
    );
  }

  const capabilities = [
    { 
      title: 'COMMUNITY MODERATION', 
      desc: 'Bypass post restrictions and flag/remove suspicious packets from the global feed.',
      icon: Users,
      link: '/community',
      color: 'text-cyan',
      border: 'border-cyan/30'
    },
    { 
      title: 'USER TELEMETRY', 
      desc: 'View public profiles with enhanced metadata visibility (Public data only).',
      icon: Eye,
      link: '/leaderboard',
      color: 'text-primary',
      border: 'border-primary/30'
    },
    { 
      title: 'RESOURCE MANAGEMENT', 
      desc: 'Access early-release course modules and experimental sandbox environments.',
      icon: FileText,
      link: '/kali',
      color: 'text-gold',
      border: 'border-gold/30'
    },
    { 
      title: 'SYSTEM LOGS', 
      desc: 'Monitor real-time system activity and network broadcasts.',
      icon: Activity,
      link: '/dashboard',
      color: 'text-purple',
      border: 'border-purple/30'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-12 animate-fade-in-up">
      <Helmet><title>Admin Matrix — Elite Hackers</title></Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-border">
         <div>
            <div className="flex items-center gap-3 text-gold font-mono text-[10px] font-bold tracking-[5px] uppercase mb-2">
               <Shield size={16} /> ADMIN CLEARANCE GRANTED
            </div>
            <h1 className="font-display font-bold text-4xl text-primary tracking-widest uppercase">ADMIN <span className="text-primary glow-green">MATRIX</span></h1>
            <p className="font-mono text-xs text-muted mt-2 uppercase tracking-widest">Authorized Node: {userData.username} // Status: SUPERUSER_ACTIVE</p>
         </div>
         <div className="bg-[var(--bg-card)] border border-gold/30 px-6 py-3 rounded-xl flex items-center gap-4">
            <div className="w-3 h-3 bg-gold rounded-full animate-ping"></div>
            <span className="font-mono text-gold text-xs font-bold uppercase tracking-widest">TERMINAL SECURED</span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {capabilities.map((cap, i) => (
            <Link 
               key={i} 
               to={cap.link}
               className={`bg-bg-card border ${cap.border} p-8 rounded-2xl flex flex-col hover:-translate-y-1 transition-all group overflow-hidden relative`}
            >
               <div className={`absolute top-0 right-0 w-32 h-32 bg-current opacity-[0.03] rounded-full translate-x-1/2 -translate-y-1/2 ${cap.color}`}></div>
               <cap.icon size={32} className={`${cap.color} mb-6 group-hover:scale-110 transition-transform`} />
               <h3 className="font-display font-bold text-xl text-primary uppercase tracking-widest mb-3">{cap.title}</h3>
               <p className="font-mono text-[11px] text-secondary leading-relaxed uppercase tracking-widest mb-6">
                  {cap.desc}
               </p>
               <div className="mt-auto flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-muted group-hover:text-white transition-colors">
                  [ INITIALIZE MODULE ] <Unlock size={12} />
               </div>
            </Link>
         ))}
      </div>

      <div className="bg-[var(--bg-primary)] border border-border rounded-2xl p-8 overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')]"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-primary">
                  <Terminal size={20} />
                  <h3 className="font-display font-bold text-lg uppercase tracking-widest">ADMIN TERMINAL PROTOCOL</h3>
               </div>
               <p className="font-mono text-xs text-muted leading-relaxed uppercase tracking-widest max-w-2xl">
                  As an Admin Clearance holder, you represent the elite tier of the mesh. Your actions are logged and audited. Maintain network integrity and support the recruitment of new nodes.
               </p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
               <button className="px-8 py-3 bg-primary text-bg-primary font-display font-bold text-[10px] tracking-widest rounded-lg hover:brightness-110 transition-all uppercase">
                  [ DOWNLOAD ADMIN ASSETS ]
               </button>
               <button className="px-8 py-3 border border-border text-muted font-display font-bold text-[10px] tracking-widest rounded-lg hover:border-white hover:text-white transition-all uppercase">
                  [ SYSTEM DIAGNOSTICS ]
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminMatrix;
