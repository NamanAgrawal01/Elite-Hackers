import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <Helmet><title>Node Not Found — Elite Hackers</title></Helmet>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8"
      >
        <div className="relative">
          <h1 className="font-display font-extrabold text-[150px] text-primary/10 leading-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search size={80} className="text-primary animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-display font-bold text-3xl text-primary tracking-widest uppercase">NODE NOT FOUND</h2>
          <p className="font-mono text-xs text-muted uppercase tracking-[3px] max-w-md mx-auto leading-relaxed">
            The packet you are looking for has been intercepted or does not exist in the current neural mesh.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
          <Link to="/dashboard" className="px-8 py-4 bg-primary text-bg-primary font-display font-bold text-[11px] tracking-widest rounded-xl hover:scale-105 transition-all flex items-center gap-2 uppercase">
            <Home size={16} /> [ RETURN TO DASHBOARD ]
          </Link>
          <button onClick={() => window.history.back()} className="px-8 py-4 border border-border text-muted font-display font-bold text-[11px] tracking-widest rounded-xl hover:border-primary hover:text-primary transition-all flex items-center gap-2 uppercase">
            <ArrowLeft size={16} /> [ GO BACK ]
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;