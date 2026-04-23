import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Skull, AlertOctagon, Mail } from 'lucide-react';

const Suspended = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508] p-6 font-mono">
      <Helmet><title>Identity Terminated — Elite Hackers</title></Helmet>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red/5 border border-red/30 p-12 rounded-3xl max-w-xl w-full text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-red shadow-[0_0_20px_rgba(255,0,0,0.5)]"></div>
        
        <div className="mb-8 relative inline-block">
          <Skull size={80} className="text-red animate-pulse" />
          <AlertOctagon size={24} className="absolute -top-2 -right-2 text-white bg-red rounded-full" />
        </div>

        <h1 className="font-display font-bold text-4xl text-white tracking-widest uppercase mb-4">IDENTITY TERMINATED</h1>
        <div className="text-red font-bold text-[10px] tracking-[5px] uppercase mb-8">VIOLATION DETECTED // NODE BLACKLISTED</div>
        
        <p className="text-sm text-muted leading-relaxed uppercase tracking-wider mb-10">
          Your access to the Elite Hackers neural mesh has been permanently revoked due to a critical security protocol violation. All associated data packets have been purged.
        </p>

        <div className="space-y-4">
           <a href="mailto:support@elitehackers.web.app" className="inline-flex items-center gap-3 text-red font-bold text-xs uppercase tracking-widest hover:underline">
             <Mail size={16} /> CONTACT KERNEL ADMINS
           </a>
           <div className="text-[9px] text-muted uppercase tracking-[4px] pt-10">ERROR_CODE: ELITE_BAN_505</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Suspended;