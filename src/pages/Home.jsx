import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ui/ParticleBackground';
import TypeWriter from '../components/ui/TypeWriter';
import { ChevronDown, Search, Terminal, Crosshair, Award, Shield, Trophy, Activity, Globe, Send, MessageSquare } from 'lucide-react';

import { CATEGORIES, LANGUAGES } from '../utils/constants';

const Home = () => {
  const navigate = useNavigate();
  const [navScrolled, setNavScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');


  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { title: "Real Compiler", desc: "Run code in 25+ languages directly in browser via Piston API", icon: Terminal },
    { title: "Adaptive Quizzes", desc: "AI-style quizzes that test real understanding, not memorization", icon: Crosshair },
    { title: "Verifiable Certificates", desc: "QR-verified certs you can share on LinkedIn and GitHub", icon: Award },
    { title: "Kali Linux Hub", desc: "Ethical hacking and penetration testing courses", icon: Shield },
    { title: "Live Leaderboard", desc: "Compete with coders worldwide in real time", icon: Trophy },
    { title: "Hack Arena", desc: "Survival quiz mode with streaks, multipliers, and glory", icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-primary selection:bg-primary/30 selection:text-primary">
      <Helmet>
        <title>ELITE HACKERS — Master Every Programming Language</title>
      </Helmet>

      {/* PUBLIC NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navScrolled ? 'bg-[#050508]/90 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto group-hover:scale-110 transition-all" />
            <span className="font-display font-bold text-2xl text-primary neon-text-green glitch hidden sm:block">ELITE HACKERS</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 font-mono text-sm">
            <Link to="/login" className="px-6 py-2 border border-border rounded-md hover:border-primary text-secondary hover:text-primary transition-colors uppercase tracking-wider">
              [ LOGIN ]
            </Link>
            <Link to="/login" className="px-6 py-2 bg-gradient-to-r from-primary to-cyan text-bg-primary font-bold rounded-md hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all uppercase tracking-wider">
              [ START FREE ]
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        <ParticleBackground />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-primary font-mono text-[11px] text-primary px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase bg-primary/5"
          >
            ⚡ 55+ LANGUAGES · REAL COMPILER · CERTIFICATES
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center mb-6"
          >
            <img src="/logo.png" alt="Elite Hackers" className="w-48 md:w-64 h-auto mb-8 drop-shadow-[0_0_30px_rgba(0,255,136,0.5)] animate-pulse-glow rounded-2xl" />
            <h1 className="font-display font-bold text-5xl md:text-[82px] leading-[1] tracking-tight uppercase text-center">
              MASTER THE <br/>
              <span className="text-primary neon-text-green glitch block mt-4" data-text="ART OF CODE">ART OF CODE</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-mono text-primary font-bold tracking-[8px] uppercase mb-10 text-[10px] md:text-xs"
          >
            LEARN. EXPLORE. SECURE. GROW.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
          >
            <Link to="/login" className="w-full sm:w-auto px-10 h-14 bg-gradient-to-r from-primary to-cyan text-bg-primary font-display font-bold text-[15px] tracking-widest rounded-lg hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,255,136,0.4)] transition-all flex items-center justify-center uppercase">
              [ START HACKING — IT'S FREE ]
            </Link>
            <a href="#arsenal" className="w-full sm:w-auto px-10 h-14 border border-primary text-primary font-display font-bold text-[15px] tracking-widest rounded-lg hover:bg-primary/10 transition-all flex items-center justify-center uppercase">
              [ EXPLORE 55+ LANGUAGES ]
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 animate-bounce cursor-pointer text-muted hover:text-primary transition-colors"
        >
          <a href="#stats"><ChevronDown size={32} /></a>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section id="stats" className="border-y border-border bg-[#0a0d14cd] relative z-10 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-transparent md:divide-border text-center">
          <div>
            <div className="font-display font-bold text-4xl text-primary neon-text-green mb-2">55+</div>
            <div className="font-mono text-sm text-muted tracking-widest uppercase">Languages</div>
          </div>
          <div>
            <div className="font-display font-bold text-4xl text-primary neon-text-green mb-2">10K+</div>
            <div className="font-mono text-sm text-muted tracking-widest uppercase">Students</div>
          </div>
          <div>
            <div className="font-display font-bold text-4xl text-primary neon-text-green mb-2">500+</div>
            <div className="font-mono text-sm text-muted tracking-widest uppercase">Quizzes</div>
          </div>
          <div>
            <div className="font-display font-bold text-4xl text-primary neon-text-green mb-2">100%</div>
            <div className="font-mono text-sm text-muted tracking-widest uppercase">Free to Start</div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl uppercase tracking-wider text-primary">
            WHY <span className="text-primary relative inline-block">ELITE HACKERS?<div className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary/40 glow-green hidden md:block"></div></span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-bg-card border border-border p-8 rounded-2xl hover:translate-y-[-6px] hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] transition-all ease-out duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <feature.icon className="text-primary mb-6 animate-pulse-glow" size={36} />
              <h3 className="font-display font-bold text-lg mb-3 tracking-wide">{feature.title}</h3>
              <p className="font-mono text-sm text-secondary leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LANGUAGE ARSENAL */}
      <section id="arsenal" className="py-24 max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl uppercase tracking-wider text-primary mb-10">
            THE <span className="text-cyan inline-block relative">ARSENAL<div className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan/40 glow-cyan"></div></span>
          </h2>
          
          <div className="relative max-w-2xl mx-auto mb-10">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[12px] text-muted font-bold font-mono pointer-events-none">
              {'>'} 
            </span>
            <input 
              type="text" 
              placeholder="SEARCH 55+ LANGUAGES..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1117] border border-border rounded-xl font-mono text-[14px] py-5 pr-6 pl-12 focus:outline-none focus:border-cyan focus:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all placeholder:text-muted/50 text-cyan uppercase tracking-widest"
            />
          </div>

          <div className="flex overflow-x-auto pb-4 gap-3 justify-start md:justify-center font-mono text-[11px] font-bold tracking-widest hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-none px-6 py-2 border rounded-full transition-all uppercase ${activeCategory === cat ? 'bg-cyan text-bg-primary border-cyan shadow-[0_0_15px_rgba(0,212,255,0.4)]' : 'bg-[#0d1117] text-muted border-border hover:border-text-muted'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {LANGUAGES.filter(l => (activeCategory === 'ALL' || l.category === activeCategory) && l.name.toLowerCase().includes(searchQuery.toLowerCase())).map((lang, idx) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate('/login')}
              className="group bg-bg-card border border-border rounded-[16px] p-6 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden cursor-pointer"
              style={{ '--hover-color': lang.diffColor }}
            >
              <div className={`absolute bottom-0 left-0 w-full h-1`} style={{ backgroundColor: lang.diffColor, opacity: 0.3 }} />
              
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl">{lang.icon}</span>
                <span className="text-[9px] font-mono font-bold px-2 py-1 rounded bg-[#0a0d14] border border-border text-muted tracking-widest">{lang.category}</span>
              </div>
              
              <h3 className="font-display font-bold text-lg mb-2">{lang.name}</h3>
              
              <div className="flex items-center justify-between mt-6">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded-sm border" style={{ color: lang.diffColor, borderColor: `${lang.diffColor}40`, backgroundColor: `${lang.diffColor}10` }}>
                  {lang.diffLabel}
                </span>
                <span className="text-[10px] font-mono font-bold bg-primary/10 text-primary px-2 py-1 rounded-sm border border-primary/20">
                  ⚡ {lang.xp}
                </span>
              </div>

              <div className="absolute inset-0 bg-bg-card/95 backdrop-blur-sm flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 border border-t-0 rounded-[16px]" style={{ borderColor: lang.diffColor }}>
                <span className="font-display font-bold text-sm tracking-widest uppercase" style={{ color: lang.diffColor }}>[ START COURSE → ]</span>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* DAILY CHALLENGE BANNER */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#050508] border-2 border-gold rounded-2xl p-8 md:p-12 relative overflow-hidden group glow-gold">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-gold/5 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-center md:text-left">
            <div>
              <h2 className="font-display font-bold text-2xl text-gold mb-2 flex items-center gap-3 justify-center md:justify-start">
                <span className="animate-pulse">⚡</span> DAILY CHALLENGE
              </h2>
              <p className="font-mono text-sm text-secondary tracking-widest uppercase">New challenge every 24 hours</p>
            </div>
            
            <div className="flex-col items-center">
               <span className="text-4xl block mb-2 text-center text-white">🦀 + ⚡</span>
               <div className="font-display font-bold text-lg text-white">500 BONUS XP TODAY</div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
               <div className="font-mono text-lg font-bold text-gold tracking-widest">14:03:59 remaining</div>
               <Link to="/login" className="px-8 py-3 bg-gold text-[#050508] font-display font-bold tracking-widest rounded text-sm hover:scale-105 transition-transform uppercase">
                 [ ACCEPT CHALLENGE ]
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050508] border-t border-border pt-20 pb-10 font-mono mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <Link to="/" className="font-display font-bold text-2xl text-primary neon-text-green glitch block mb-4">ELITE HACKERS</Link>
            <p className="text-[11px] text-secondary tracking-widest mb-6 leading-loose">
              Master every programming language. Hack your way to the top. Ethical use only.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-[#0d1117] border border-border rounded text-muted hover:text-primary transition-colors hover:border-primary"><Globe size={18} /></a>
              <a href="#" className="p-2 bg-[#0d1117] border border-border rounded text-muted hover:text-cyan transition-colors hover:border-cyan"><Send size={18} /></a>
              <a href="#" className="p-2 bg-[#0d1117] border border-border rounded text-muted hover:text-purple transition-colors hover:border-purple"><MessageSquare size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[12px] font-bold text-primary tracking-widest mb-6 uppercase">Platform</h4>
            <ul className="space-y-4 text-[13px] text-secondary">
              <li><Link to="/#arsenal" className="hover:text-primary transition-colors">Languages</Link></li>
              <li><Link to="/roadmaps" className="hover:text-primary transition-colors">Roadmaps</Link></li>
              <li><Link to="/compiler" className="hover:text-primary transition-colors">Compiler</Link></li>
              <li><Link to="/arena" className="hover:text-primary transition-colors">Hack Arena</Link></li>
              <li><Link to="/certificates" className="hover:text-primary transition-colors">Certificates</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-bold text-primary tracking-widest mb-6 uppercase">Resources</h4>
            <ul className="space-y-4 text-[13px] text-secondary">
              <li><Link to="/daily-challenges" className="hover:text-primary transition-colors">Daily Challenges</Link></li>
              <li><Link to="/interview-prep" className="hover:text-primary transition-colors">Interview Prep</Link></li>
              <li><Link to="/snippets" className="hover:text-primary transition-colors">Code Snippets</Link></li>
              <li><Link to="/community" className="hover:text-primary transition-colors">Community</Link></li>
              <li><Link to="/kali" className="hover:text-primary transition-colors text-red hover:text-red/80">Kali Hub</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-bold text-primary tracking-widest mb-6 uppercase">Legal</h4>
            <ul className="space-y-4 text-[13px] text-secondary">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 border-t border-border pt-8 text-center text-[10px] text-muted tracking-[2px] uppercase">
          © 2026 ELITE HACKERS · Built for Hackers
        </div>
      </footer>
    </div>
  );
};

export default Home;