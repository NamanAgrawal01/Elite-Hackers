import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, MessageCircle, Share2, Plus, Filter, Search } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const POSTS = [
  {
    id: 1,
    author: "root_warrior",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=root",
    title: "How to bypass modern WAFs with chunked encoding",
    content: "I've been experimenting with HTTP/1.1 chunked transfer encoding to bypass web application firewalls...",
    tags: ["SECURITY", "WEB"],
    upvotes: 420,
    comments: 69,
    timestamp: "2h ago"
  },
  {
    id: 2,
    author: "rust_aficionado",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rust",
    title: "Memory safety in low-level kernel modules",
    content: "Is it viable to rewrite Linux kernel modules in Rust while maintaining ABI compatibility?",
    tags: ["RUST", "SYSTEMS"],
    upvotes: 156,
    comments: 24,
    timestamp: "5h ago"
  },
  {
    id: 3,
    author: "bug_hunter_99",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bug",
    title: "Found a critical 0-day in a secondary database driver",
    content: "Just submitted a vulnerability report for a widely used SQL driver. Here's a sterilized POC...",
    tags: ["SQL", "ZERO-DAY"],
    upvotes: 890,
    comments: 142,
    timestamp: "8h ago"
  }
];

const Community = () => {
    const { userData } = useAuth();
    const [search, setSearch] = useState('');

    return (
        <div className="space-y-10 animate-fade-in-up">
            <Helmet><title>Community Hub — ELITE HACKERS</title></Helmet>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="font-display font-bold text-4xl text-text-primary tracking-widest uppercase mb-2">
                        COMMUNITY <span className="text-purple-500 glow-purple">HUB</span>
                    </h1>
                    <p className="font-mono text-xs text-text-muted tracking-[3px] uppercase">Secure nodes communicating across the mesh</p>
                </div>
                
                <button className="flex items-center gap-3 px-8 h-14 bg-purple-600 text-text-primary font-display font-bold text-sm tracking-widest rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(191,90,242,0.3)] uppercase">
                    <Plus size={20} /> [ INITIALIZE NEW THREAD ]
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* SEARCH & FILTERS SIDEBAR */}
                <aside className="w-full lg:w-80 space-y-6">
                   <div className="bg-bg-card border border-border p-6 rounded-2xl space-y-4">
                      <div className="relative">
                         <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                         <input 
                            type="text" 
                            placeholder="SEARCH THREADS..." 
                            className="w-full bg-bg-primary border border-border rounded-lg py-3 pl-12 pr-4 font-mono text-xs focus:border-purple-500 outline-none transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                         />
                      </div>
                      
                      <div className="pt-4 space-y-4">
                         <h4 className="font-display font-bold text-[10px] text-text-muted tracking-widest uppercase">Popular Classifications</h4>
                         <div className="flex flex-wrap gap-2">
                            {['SECURITY', 'RUST', 'WEB', 'SYSTEMS', 'SQL', 'LINUX'].map(tag => (
                               <button key={tag} className="px-3 py-1 bg-bg-primary border border-border text-text-secondary font-mono text-[9px] font-bold rounded uppercase hover:border-purple-500 hover:text-purple-500 transition-all">
                                  #{tag}
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="bg-gradient-to-br from-purple-900/20 to-bg-card border border-purple-500/30 p-6 rounded-2xl">
                      <h4 className="font-display font-bold text-xs text-purple-400 tracking-widest uppercase mb-4">Network Activity</h4>
                      <p className="font-mono text-[10px] text-text-secondary leading-loose uppercase">
                         1,245 Nodes Online<br/>
                         14 New Threads Today<br/>
                         892 Handshakes Completed
                      </p>
                   </div>
                </aside>

                {/* POSTS LIST */}
                <main className="flex-1 space-y-4">
                    {POSTS.map((post, idx) => (
                        <div key={post.id} className="bg-bg-card border border-border rounded-2xl p-6 hover:border-purple-500/40 transition-all group cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <MessageSquare size={64} />
                            </div>

                            <div className="flex gap-4 mb-6 relative z-10">
                                <img src={post.avatar} alt="Author" className="w-10 h-10 rounded-full border border-border" />
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs text-purple-400 font-bold uppercase">{post.author}</span>
                                        <span className="text-[10px] text-text-muted font-mono">• {post.timestamp}</span>
                                    </div>
                                    <div className="flex gap-2 mt-1">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[8px] font-mono font-bold text-text-muted tracking-widest uppercase px-1.5 py-0.5 border border-border rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <h2 className="font-display font-bold text-xl text-text-primary tracking-wide mb-4 group-hover:text-purple-400 transition-colors">
                                {post.title}
                            </h2>
                            <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2 max-w-3xl">
                                {post.content}
                            </p>

                            <div className="mt-8 pt-6 border-t border-border flex items-center gap-8 relative z-10">
                                <button className="flex items-center gap-2 text-text-muted hover:text-purple-400 transition-all font-mono text-[10px] font-bold uppercase tracking-widest">
                                    <ThumbsUp size={16} /> {post.upvotes} UPVOTES
                                </button>
                                <button className="flex items-center gap-2 text-text-muted hover:text-cyan transition-all font-mono text-[10px] font-bold uppercase tracking-widest">
                                    <MessageCircle size={16} /> {post.comments} RESPONSES
                                </button>
                                <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-all font-mono text-[10px] font-bold uppercase tracking-widest ml-auto">
                                    <Share2 size={16} /> SHARE HANDSHAKE
                                </button>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default Community;