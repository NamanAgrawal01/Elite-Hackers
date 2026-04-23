import React, { useState } from 'react';
import LoadingScreen from '../components/ui/LoadingScreen';
import { useAuth } from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Terminal, Lock, Shield, Zap, Filter } from 'lucide-react';
import { LANGUAGES, CATEGORIES } from '../utils/constants';

const Arsenal = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  if (!userData) return <LoadingScreen />;

  const filteredLangs = LANGUAGES.filter(l => 
    (activeCategory === 'ALL' || l.category === activeCategory) && 
    l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isLocked = (index, lang) => {
    if (userData.plan !== 'free') return false;
    // Keep first 5 languages free for everyone
    const freeList = ['python', 'javascript', 'sql', 'bash', 'php'];
    return !freeList.includes(lang.id);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-10 animate-fade-in-up">
      <Helmet><title>Language Arsenal — Elite Hackers</title></Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border pb-8">
         <div>
            <h1 className="font-display font-bold text-4xl text-primary tracking-widest uppercase flex items-center gap-4">
               <Terminal className="text-primary" size={32} /> THE <span className="text-primary glow-green">ARSENAL</span>
            </h1>
            <p className="font-mono text-xs text-muted tracking-[4px] uppercase mt-2">Deploying 56+ specialized modules for full-spectrum dominance</p>
         </div>
         <div className="bg-primary/5 border border-primary/20 px-4 py-2 rounded-lg flex items-center gap-3">
            <Shield size={18} className="text-primary" />
            <span className="font-mono text-primary font-bold text-xs uppercase tracking-widest">Modules Detected: {LANGUAGES.length}</span>
         </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="flex flex-col lg:flex-row gap-6">
         <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
            <input 
               type="text" 
               placeholder="SEARCH CRYPTOGRAPHIC MODULES..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-bg-card border border-border rounded-xl font-mono text-sm py-4 pl-12 pr-6 focus:outline-none focus:border-primary transition-all placeholder:text-muted/30 uppercase tracking-widest"
            />
         </div>

         <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
               <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-3 rounded-xl font-mono text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap border ${
                     activeCategory === cat 
                     ? 'bg-primary text-bg-primary border-primary shadow-[0_0_15px_rgba(0,255,136,0.3)]' 
                     : 'bg-bg-card text-muted border-border hover:border-text-muted'
                  }`}
               >
                  {cat}
               </button>
            ))}
         </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
         {filteredLangs.map((lang, idx) => {
            const locked = isLocked(idx, lang);
            return (
               <motion.div
                  key={lang.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  onClick={() => navigate(`/course/${lang.id}`)}
                  className="group bg-bg-card border border-border rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col items-center text-center shadow-lg"
               >
                  <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: lang.diffColor }}></div>
                  
                  {locked && (
                     <div className="absolute inset-0 bg-[#050508]/80 backdrop-blur-[3px] flex flex-col items-center justify-center z-10 transition-all opacity-100 group-hover:bg-[#050508]/60">
                        <Lock size={20} className="text-primary animate-pulse mb-2" />
                        <span className="font-mono text-[8px] text-primary font-bold tracking-[3px] uppercase">UPGRADE REQUIRED</span>
                     </div>
                  )}

                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">{lang.icon}</div>
                  <h3 className="font-display font-bold text-lg text-primary mb-2 tracking-wide uppercase">{lang.name}</h3>
                  <div className="flex flex-col gap-1 w-full items-center">
                     <span className="font-mono text-[8px] text-muted font-bold tracking-widest uppercase border border-border px-2 py-0.5 rounded">{lang.category}</span>
                     <div className="flex items-center gap-2 mt-2">
                        <Zap size={10} className="text-primary" />
                        <span className="font-mono text-[10px] text-primary font-bold">{lang.xp} XP</span>
                     </div>
                  </div>

                  <div className="mt-6 w-full opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                     <div className="font-mono text-[9px] text-primary font-bold tracking-[4px] uppercase">[ DEPLOY MODULE ]</div>
                  </div>
               </motion.div>
            );
         })}
      </div>

      {filteredLangs.length === 0 && (
         <div className="py-20 text-center space-y-4 bg-bg-card border border-dashed border-border rounded-3xl">
            <div className="font-display font-bold text-2xl text-muted tracking-widest">MODULE NOT FOUND</div>
            <p className="font-mono text-xs text-muted uppercase">System scan returned 0 results for your current query.</p>
            <button onClick={() => {setSearchQuery(''); setActiveCategory('ALL');}} className="text-primary font-mono text-[10px] font-bold underline tracking-widest">[ RESET SYSTEM FILTERS ]</button>
         </div>
      )}
    </div>
  );
};

export default Arsenal;
