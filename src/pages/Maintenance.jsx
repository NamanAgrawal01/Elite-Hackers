import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Settings, Shield, Terminal } from 'lucide-react';
import { MatrixRain } from '../components/ui/MatrixRain';

const Maintenance = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg-primary overflow-hidden font-mono">
      <Helmet><title>System Maintenance — Elite Hackers</title></Helmet>
      <MatrixRain />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-10 bg-[#0d1117eb] border border-gold/30 rounded-2xl max-w-lg w-full text-center backdrop-blur-xl"
      >
        <div className="relative inline-block mb-8">
           <Settings size={64} className="text-gold animate-spin-slow" />
           <Shield size={24} className="absolute -bottom-2 -right-2 text-primary" />
        </div>
        
        <h1 className="font-display font-bold text-3xl text-primary tracking-widest uppercase mb-4">SYSTEM UPGRADE</h1>
        <div className="flex items-center justify-center gap-3 text-gold font-bold text-[10px] tracking-[4px] uppercase mb-8">
           <Terminal size={14} /> RECONSTRUCTING NODES...
        </div>
        
        <p className="text-sm text-secondary leading-relaxed uppercase tracking-wider mb-8">
          The Administrative Matrix is currently undergoing a scheduled kernel upgrade. All neural connections have been temporarily throttled to ensure data integrity.
        </p>
        
        <div className="w-full h-1 bg-border rounded-full overflow-hidden">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: '100%' }}
             transition={{ duration: 10, repeat: Infinity }}
             className="h-full bg-gold shadow-[0_0_10px_rgba(255,191,0,0.5)]"
           />
        </div>
      </motion.div>
    </div>
  );
};

export default Maintenance;