import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Terminal, Shield, Zap, Globe } from 'lucide-react';

const ACTIONS = [
  { text: "Successfully breached secure server 88.23.11.9", icon: Shield, color: "text-red" },
  { text: "Acquired 'Elite Coder' badge in Rust Systems", icon: Zap, color: "text-primary" },
  { text: "New node detected in sector 7-G (Kyoto)", icon: Globe, color: "text-cyan" },
  { text: "Decryption protocol completed for 'Encrypted.vault'", icon: Terminal, color: "text-purple" },
  { text: "Kernel upgrade initiated on decentralized mesh", icon: Activity, color: "text-gold" },
  { text: "Subroutine 'Omega' successfully injected", icon: Shield, color: "text-red" },
  { text: "Latency check: 14ms (Primary Node)", icon: Globe, color: "text-cyan" },
  { text: "Encrypted handshake received from Alpha-6", icon: Zap, color: "text-primary" },
  { text: "Infiltration successful: Mastered Carbon Module", icon: Terminal, color: "text-gold" },
  { text: "Security clearance level increased for Node-71", icon: Shield, color: "text-cyan" },
  { text: "Global leaderboard shift: New #1 contender", icon: Globe, color: "text-primary" },
  { text: "Data extraction: 1.4TB from legacy mainframe", icon: Terminal, color: "text-red" },
];

const USERNAMES = [
  "ShadowByte", "QuantumFox", "NullPointer", "CyberGhost", "RootUser", "HexSlayer", "DataReaper", "VoidWalker"
];

const GlobalActivityFeed = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Initial set of logs
        const initialLogs = Array.from({ length: 4 }).map((_, i) => createLog(i));
        setLogs(initialLogs);

        // Add new log every 3-7 seconds
        const interval = setInterval(() => {
            setLogs(current => [createLog(Date.now()), ...current.slice(0, 3)]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const createLog = (id) => {
        const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
        const user = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];
        return {
            id,
            user,
            text: action.text,
            icon: action.icon,
            color: action.color,
            time: "JUST NOW"
        };
    };

    return (
        <div className="bg-[#050508] border border-border rounded-2xl overflow-hidden h-full flex flex-col">
            <div className="p-4 border-b border-border bg-bg-card flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Activity size={16} className="text-primary animate-pulse" />
                    <span className="font-display font-bold text-[10px] tracking-[4px] uppercase text-primary">Global Mesh Activity</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse delay-150"></div>
                </div>
            </div>
            
            <div className="flex-1 overflow-hidden relative">
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#050508] to-transparent z-10 pointer-events-none"></div>
                
                <div className="p-4 space-y-3">
                    <AnimatePresence initial={false}>
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -20, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: 'auto' }}
                                exit={{ opacity: 0, x: 20, height: 0 }}
                                transition={{ duration: 0.4 }}
                                className="flex gap-3 border-l-2 border-border pl-4 relative group"
                            >
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors"></div>
                                <div className="p-1.5 rounded bg-bg-card border border-border">
                                    <log.icon size={12} className={log.color} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <span className="font-mono text-[9px] font-bold text-primary tracking-wider uppercase">{log.user}</span>
                                        <span className="font-mono text-[8px] text-muted">{log.time}</span>
                                    </div>
                                    <p className="font-mono text-[10px] text-secondary leading-tight truncate uppercase tracking-widest">{log.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            
            <div className="p-2 bg-[#0d1117] border-t border-border/10 text-center">
                 <span className="font-mono text-[8px] text-muted tracking-[3px] uppercase">Encrypted Stream Protocol V4.2</span>
            </div>
        </div>
    );
};

export default GlobalActivityFeed;
