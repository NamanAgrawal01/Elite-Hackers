import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Terminal, Crosshair, Brain, Shield } from 'lucide-react';

const CHALLENGES = [
  {
    category: 'DATA STRUCTURES',
    items: [
      { q: "Binary Tree Level Order Traversal", diff: "Medium", xp: 300 },
      { q: "Reverse a Linked List (Recursive)", diff: "Easy", xp: 150 },
      { q: "Implementing a Hash Map from Scratch", diff: "Hard", xp: 500 }
    ]
  },
  {
    category: 'SYSTEM DESIGN',
    items: [
      { q: "Design a High-Availability Rate Limiter", diff: "Medium", xp: 400 },
      { q: "Scaling a WebSocket Notification Server", diff: "Hard", xp: 600 },
      { q: "Database Sharding Strategies", diff: "Medium", xp: 350 }
    ]
  },
  {
    category: 'HACKING & SECURITY',
    items: [
      { q: "XSS Mitigation in Modern Frameworks", diff: "Medium", xp: 400 },
      { q: "Understanding SQL Injection in ORMs", diff: "Easy", xp: 200 },
      { q: "Bypassing WAFs with Packet Smuggling", diff: "Hard", xp: 1000 }
    ]
  }
];

const InterviewPrep = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = activeTab === 'ALL' 
    ? CHALLENGES 
    : CHALLENGES.filter(c => c.category === activeTab);

  return (
    <div className="space-y-12 animate-fade-in-up">
      <Helmet><title>Interview Prep — ELITE HACKERS</title></Helmet>

      <div>
        <h1 className="font-display font-bold text-4xl text-primary tracking-widest uppercase mb-4">
          INTERVIEW <span className="text-cyan glow-cyan">PREP</span>
        </h1>
        <p className="font-body text-secondary max-w-2xl text-lg">
          Master the challenges asked by Top Tech Companies and Security Firms. No fluff, just core engineering.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          {['ALL', 'DATA STRUCTURES', 'SYSTEM DESIGN', 'HACKING & SECURITY'].map(tab => (
             <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded font-mono text-[11px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${activeTab === tab ? 'bg-cyan text-bg-primary border-cyan' : 'bg-bg-card border border-border text-muted hover:border-text-secondary'}`}
             >
               {tab}
             </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
           <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
           <input 
            type="text" 
            placeholder="SEARCH CHALLENGES..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-card border border-border rounded py-2 pl-10 pr-4 font-mono text-xs text-cyan focus:outline-none focus:border-cyan transition-all uppercase"
           />
        </div>
      </div>

      <div className="space-y-12">
        {filtered.map((cat, idx) => (
          <div key={idx} className="space-y-6">
            <h2 className="font-display font-bold text-lg text-primary flex items-center gap-3">
              <span className="w-8 h-[1px] bg-cyan"></span> {cat.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.items.filter(i => i.q.toLowerCase().includes(search.toLowerCase())).map((item, iIdx) => (
                <div key={iIdx} className="bg-bg-card border border-border p-6 rounded-xl hover:border-cyan/50 transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded border uppercase ${item.diff === 'Hard' ? 'text-red border-red/30 bg-red/5' : item.diff === 'Medium' ? 'text-gold border-gold/30 bg-gold/5' : 'text-primary border-primary/30 bg-primary/5'}`}>
                      {item.diff}
                    </span>
                    <span className="font-mono text-[10px] text-primary">⚡ {item.xp} XP</span>
                  </div>
                  <h3 className="font-display font-bold text-sm text-primary tracking-wide mb-6 group-hover:text-cyan transition-colors">
                    {item.q}
                  </h3>
                  <div className="flex items-center justify-between font-mono text-[9px] text-muted uppercase tracking-widest">
                    <span>Terminal Ready</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrep;