import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { Shield, Clock, Calendar, CheckCircle, AlertCircle, Zap, Crown, Terminal, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const SubscriptionStatus = () => {
  const { userData } = useAuth();
  const [isScanning, setIsScanning] = useState(true);
  const [blockNumber] = useState(() => Math.floor(Math.random() * 1000000));

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!userData) return null;

  const planInfo = {
    free: { name: 'Recruit', color: 'text-text-muted', icon: Zap, bg: 'bg-bg-card' },
    pro: { name: 'Professional Hacker', color: 'text-cyan', icon: Shield, bg: 'bg-cyan/5' },
    elite: { name: 'Elite Sentinel', color: 'text-gold', icon: Crown, bg: 'bg-gold/5' },
    admin: { name: 'Admin Clearance', color: 'text-red', icon: Shield, bg: 'bg-red/5' },
  };

  const currentPlan = planInfo[userData.plan] || planInfo.free;
  const expiryDate = userData.planExpiry?.toDate ? userData.planExpiry.toDate() : null;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <Helmet><title>Node Clearance Status — Elite Hackers</title></Helmet>

      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-border">
         <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Search size={24} />
         </div>
         <div>
            <h1 className="font-display font-bold text-3xl text-text-primary tracking-widest uppercase">CLEARANCE <span className="text-primary">CHECKER</span></h1>
            <p className="font-mono text-[10px] text-text-muted tracking-[4px] uppercase mt-1">Verifying node credentials against distributed ledger</p>
         </div>
      </div>

      {isScanning ? (
        <div className="bg-bg-card border border-border rounded-3xl p-20 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent animate-pulse"></div>
           <Terminal size={48} className="text-primary animate-bounce" />
           <div className="space-y-2 text-center">
              <div className="font-mono text-sm text-primary font-bold tracking-widest animate-pulse">SCANNING NETWORK NODES...</div>
              <div className="font-mono text-[10px] text-text-muted uppercase">Querying Block: {blockNumber}</div>
           </div>
           <div className="w-64 h-1 bg-border rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-primary"
              />
           </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* MAIN STATUS CARD */}
          <div className={`relative border border-border rounded-3xl p-8 md:p-12 overflow-hidden ${currentPlan.bg}`}>
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <currentPlan.icon size={120} />
             </div>

             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left space-y-4">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-primary border border-border rounded-full font-mono text-[10px] font-bold text-text-muted tracking-widest uppercase">
                      <ActivityIcon /> SYSTEM STATUS: {userData.isSubscriptionActive ? 'ENCRYPTED' : 'STANDBY'}
                   </div>
                   <h2 className={`font-display font-bold text-4xl md:text-5xl tracking-tighter uppercase ${currentPlan.color}`}>
                      {currentPlan.name}
                   </h2>
                   <p className="font-mono text-sm text-text-secondary max-w-md uppercase tracking-wide leading-relaxed">
                      Your node is currently operating under the <span className={currentPlan.color}>{currentPlan.name}</span> protocol. 
                      {userData.isSubscriptionActive ? ' Access to all designated modules is unlocked.' : ' Upgrade required for full system access.'}
                   </p>
                </div>

                <div className="bg-bg-primary/50 backdrop-blur-md border border-border p-6 rounded-2xl w-full md:w-72 space-y-4 shadow-xl">
                   <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="font-mono text-[10px] text-text-muted uppercase font-bold tracking-widest flex items-center gap-2">
                         <Clock size={14} /> EXPIRES
                      </span>
                      <span className="font-mono text-xs text-text-primary font-bold">
                         {expiryDate ? format(expiryDate, 'dd MMM yyyy') : 'NEVER'}
                      </span>
                   </div>
                   <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="font-mono text-[10px] text-text-muted uppercase font-bold tracking-widest flex items-center gap-2">
                         <Calendar size={14} /> SINCE
                      </span>
                      <span className="font-mono text-xs text-text-primary font-bold">
                         {userData.planActivatedAt ? format(userData.planActivatedAt.toDate(), 'dd MMM yyyy') : 'N/A'}
                      </span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] text-text-muted uppercase font-bold tracking-widest flex items-center gap-2">
                         <Shield size={14} /> STATUS
                      </span>
                      <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${userData.isSubscriptionActive ? 'bg-primary/20 text-primary' : 'bg-red/20 text-red'}`}>
                         {userData.isSubscriptionActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                   </div>
                </div>
             </div>
          </div>

          {/* PENDING STATUS */}
          {userData.pendingPlan && (
            <div className="bg-gold/10 border border-gold/30 p-6 rounded-2xl flex items-center gap-6 animate-pulse">
               <div className="p-3 bg-gold/20 rounded-full text-gold">
                  <Clock size={24} />
               </div>
               <div>
                  <h4 className="font-display font-bold text-gold uppercase tracking-widest">UPGRADE IN PROGRESS</h4>
                  <p className="font-mono text-[10px] text-gold/80 uppercase tracking-widest">
                     Our nodes are verifying your payment for the <span className="font-bold underline">{userData.pendingPlan.toUpperCase()}</span> plan.
                  </p>
               </div>
            </div>
          )}

          {/* BENEFITS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-bg-card border border-border p-8 rounded-3xl">
                <h3 className="font-display font-bold text-lg text-text-primary uppercase tracking-widest mb-6 flex items-center gap-3">
                   <CheckCircle size={20} className="text-primary" /> ACTIVE PRIVILEGES
                </h3>
                <ul className="space-y-4">
                   {getBenefits(userData.plan).map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                         <div className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_rgba(0,255,136,0.5)]"></div>
                         <span className="font-mono text-[11px] text-text-secondary uppercase tracking-widest">{benefit}</span>
                      </li>
                   ))}
                </ul>
             </div>

             <div className="bg-[#050508] border border-border p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="font-display font-bold text-lg text-text-primary uppercase tracking-widest mb-4">NEED MORE POWER?</h3>
                <p className="font-mono text-[11px] text-text-muted leading-relaxed uppercase tracking-widest mb-8">
                   Unlock the full potential of the Elite Hackers mesh by upgrading your security clearance.
                </p>
                <Link to="/pricing" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-bg-primary font-display font-bold tracking-widest rounded-xl hover:scale-105 transition-all uppercase text-xs">
                   [ UPGRADE CLEARANCE ]
                </Link>
             </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const getBenefits = (plan) => {
  const benefits = {
    free: ['5 Core Languages', 'Standard Priority Compiler', 'Community Access', 'Basic Quizzes'],
    pro: ['ALL 55+ Languages', 'High-Priority Compiler', 'PDF Certificates', 'Streak Multipliers', 'Pro Badge'],
    elite: ['Everything in Pro', 'Kali Linux Hub Access', 'Malware Sandboxes', '1-on-1 Audits', 'XP Boost'],
    admin: ['Full Admin Terminal', 'User Management', 'Community Moderation', 'Lifetime Access', 'Staff Badge']
  };
  return benefits[plan] || benefits.free;
};

const ActivityIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

export default SubscriptionStatus;
