import React from 'react';
import { Bell } from 'lucide-react';
import { motion as Motion as Motion, AnimatePresence } from 'framer-motion';

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const unreadCount = 2; // Dummy mock for now until full context implementation

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-[#0d1117] border border-[#1a2236] text-text-muted hover:text-primary hover:border-primary transition-all duration-200"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red rounded-full shadow-[0_0_8px_rgba(255,0,60,0.8)] animate-pulse"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <Motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 bg-[#0d1117]/95 backdrop-blur-xl border border-primary/20 rounded-xl shadow-2xl overflow-hidden z-50 origin-top-right text-left"
          >
            <div className="flex justify-between items-center p-4 border-b border-[#1a2236]">
              <h3 className="font-display font-bold text-sm tracking-widest text-primary">NOTIFICATIONS</h3>
              <button className="text-[10px] uppercase font-mono font-bold text-text-secondary hover:text-cyan transition-colors">MARK ALL READ</button>
            </div>
            <div className="max-h-[300px] overflow-y-auto hide-scrollbar p-2">
              <div className="p-3 bg-[#111827] rounded-lg mb-2 cursor-pointer border border-[#1a2236] hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] w-2 h-2 rounded-full bg-primary inline-block"></span>
                  <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-widest">SYSTEM ALERT</span>
                  <span className="text-[10px] text-text-muted ml-auto font-mono">2m ago</span>
                </div>
                <p className="text-[12px] text-text-primary px-4 font-mono">Welcome to Elite Hackers. Your neural interface is initialized.</p>
              </div>
            </div>
            <div className="p-3 border-t border-[#1a2236] text-center">
              <button className="text-[10px] uppercase font-mono font-bold text-text-muted hover:text-primary transition-colors">VIEW ALL</button>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
