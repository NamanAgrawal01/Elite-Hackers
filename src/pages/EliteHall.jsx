import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldAlert, 
  Terminal, 
  Cpu, 
  Lock, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight,
  Zap,
  Activity,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const ArenaCard = ({ title, level, category, status, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`bg-white border border-border p-8 rounded-3xl flex flex-col relative group transition-all h-full ${status === 'Locked' ? 'opacity-50 grayscale' : 'hover:shadow-2xl hover:border-primary/30'}`}
  >
    <div className="flex justify-between items-start mb-6">
      <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-md">
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{category}</span>
      </div>
      <div className={`px-3 py-1 rounded-md border ${status === 'In Progress' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
        <span className="text-[10px] font-bold uppercase tracking-widest">{status}</span>
      </div>
    </div>
    
    <h3 className="text-xl font-bold text-text mb-4 uppercase tracking-tight">{title}</h3>
    <p className="text-sm text-text-muted mb-10 flex-1 leading-relaxed font-semibold">
        {description}
    </p>

    <div className="space-y-6 pt-6 border-t border-border">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
            <span className="text-text-muted">Required Clearance</span>
            <span className="text-text">LEVEL {level}</span>
        </div>
        <button 
            disabled={status === 'Locked'}
            className={`w-full h-14 rounded-xl font-bold text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all ${
                status === 'Locked' 
                ? 'bg-slate-100 text-slate-400' 
                : 'bg-text text-white hover:bg-slate-800'
            }`}
        >
            {status === 'Locked' ? <><Lock size={16} /> Restricted</> : <><Terminal size={16} /> Initialize Sandbox</>}
        </button>
    </div>
  </motion.div>
);

const EliteHall = () => {
  const challenges = [
    { title: "Protocol Collision", level: 15, category: "Hardware", status: "Available", description: "Simulate and mitigate packet collisions in high-flux kernel environments." },
    { title: "Neural Identity Breach", level: 25, category: "Forensics", status: "In Progress", description: "Trace unauthorized access patterns across distributed identity clusters." },
    { title: "Decentralized Zero-Day", level: 40, category: "Systems", status: "Locked", description: "Experimental lab for analyzing unpublished vulnerabilities in consensus engines." }
  ];

  return (
    <div className="animate-fade-in space-y-12 pb-20">
      <Helmet>
        <title>Arena — Elite Hackers</title>
      </Helmet>

      <div className="p-10 bg-rose-50 border border-rose-100 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
        <div className="space-y-6 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                <ShieldAlert size={14} /> ADVERSARIAL MODE: ACTIVE
            </div>
            <h1 className="text-4xl font-bold text-text uppercase tracking-tighter leading-none mb-4">Laboratory <span className="text-rose-600">Sandboxes</span></h1>
            <p className="text-sm text-slate-500 max-w-xl font-semibold leading-relaxed uppercase tracking-tight">
                High-fidelity simulation environments for stress testing distributed systems. 
                All activities are monitored and authorized for educational use only.
            </p>
        </div>
        <div className="w-16 h-16 bg-white border border-rose-100 rounded-full flex items-center justify-center text-rose-600 shadow-xl relative z-10 shrink-0">
             <AlertTriangle size={32} className="animate-pulse" />
        </div>
        <div className="absolute -bottom-10 -right-10 opacity-[0.05] pointer-events-none">
            <ShieldAlert size={300} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map((c, i) => (
          <ArenaCard key={i} {...c} delay={i * 0.1} />
        ))}
      </div>

      <div className="bg-slate-50 border border-border p-12 rounded-[3.5rem] text-center space-y-10 relative overflow-hidden group">
         <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold text-text uppercase tracking-tighter italic">Propose a Research <span className="text-primary italic">Sandbox</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
                Verified Architects can spin up isolated compute clusters for collaborative research. 
                Full node telemetry and forensic audit logs provided.
            </p>
            <button className="btn-primary py-4 px-12 rounded-2xl text-[11px] uppercase tracking-[0.3em] inline-flex items-center gap-4 hover:shadow-2xl transition-all">
                New Project Protocol <Zap size={18} fill="currentColor" />
            </button>
         </div>
         <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
             <Activity size={200} />
         </div>
      </div>
    </div>
  );
};

export default EliteHall;
