import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { User, Shield, Terminal, ArrowLeft } from 'lucide-react';

const PublicProfile = () => {
  const { username } = useParams();

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-center">
      <Helmet><title>Node Info: {username} — Elite Hackers</title></Helmet>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="w-24 h-24 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <User size={48} className="text-primary" />
        </div>

        <h1 className="font-display font-bold text-4xl text-primary tracking-widest uppercase">NODE: {username?.toUpperCase()}</h1>
        <div className="flex items-center justify-center gap-4">
          <span className="font-mono text-[10px] text-primary border border-primary/30 px-3 py-1 rounded-sm uppercase font-bold tracking-widest">RANK: CLASSIFIED</span>
          <span className="font-mono text-[10px] text-gold border border-gold/30 px-3 py-1 rounded-sm uppercase font-bold tracking-widest">CLEARANCE: LVL 1</span>
        </div>

        <div className="bg-bg-card border border-border p-12 rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Shield size={40} className="text-muted mx-auto mb-6 opacity-30" />
          <h2 className="font-display font-bold text-xl text-primary uppercase tracking-widest mb-4">ENCRYPTION ACTIVE</h2>
          <p className="font-mono text-xs text-muted leading-relaxed uppercase tracking-widest max-w-md mx-auto">
            This node's profile telemetry is currently encrypted. Public visibility is restricted to authorized mesh members.
          </p>
        </div>

        <div className="pt-8">
           <Link to="/leaderboard" className="inline-flex items-center gap-2 text-primary font-mono text-[10px] font-bold tracking-widest uppercase hover:gap-3 transition-all">
             <ArrowLeft size={14} /> [ RETURN TO HALL OF FAME ]
           </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PublicProfile;