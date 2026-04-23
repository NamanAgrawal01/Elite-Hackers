import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useXP } from '../context/XPContext';
import { Shield, ShieldAlert, Zap, Skull, Crosshair, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded list of hard hacking/sysadmin questions for survival mode
const ARENA_BANK = [
  { q: "Which port is used by default for SSH communication?", a: ["21", "22", "80", "443"], correct: 1 },
  { q: "In Linux, what command recursively changes file permissions?", a: ["chmod -R", "chown -r", "chmod -r", "chattr -R"], correct: 0 },
  { q: "What does XSS stand for?", a: ["Cross-System Scripting", "XML Site Scripting", "Cross-Site Scripting", "Cross-Server Setup"], correct: 2 },
  { q: "Which HTTP header defends against Clickjacking?", a: ["X-Frame-Options", "Content-Security-Policy", "X-XSS-Protection", "Strict-Transport-Security"], correct: 0 },
  { q: "What is the primary vulnerability in strcpy() in C?", a: ["Memory Leak", "Buffer Overflow", "Null Pointer Dereference", "Format String Bug"], correct: 1 },
  { q: "What is the default hash algorithm for Linux /etc/shadow?", a: ["MD5", "SHA-256", "SHA-512", "Argon2"], correct: 2 },
  { q: "Which layer of the OSI model handles routing?", a: ["Data Link", "Network", "Transport", "Session"], correct: 1 },
  { q: "What is the Nmap flag for Service/Version detection?", a: ["-sS", "-sV", "-O", "-A"], correct: 1 },
  { q: "Which tool is used for wireless password cracking?", a: ["Wireshark", "John the Ripper", "Aircrack-ng", "Metasploit"], correct: 2 },
  { q: "What is the purpose of a Salt in hashing?", a: ["Speed up hashing", "Encrypt the hash", "Prevent Rainbow Table attacks", "Compress the data"], correct: 2 },
  { q: "Which SQL clause is most vulnerable to injection?", a: ["SELECT", "WHERE", "JOIN", "ORDER BY"], correct: 1 },
  { q: "What does the 'S' in HTTPS stand for?", a: ["Secure", "System", "Server", "Standard"], correct: 0 },
  { q: "Which command lists listening ports on Linux?", a: ["ps aux", "netstat -l", "ifconfig", "ls -l"], correct: 1 },
  { q: "What is a 'Zero Day' vulnerability?", a: ["A 24-hour bug", "An unpatched flaw", "A patched exploit", "A hardware error"], correct: 1 },
  { q: "Which encoding is commonly used in URL obfuscation?", a: ["Base64", "ASCII", "Hexadecimal", "UTF-8"], correct: 2 },
  { q: "What is the maximum length of an IPv4 address in bits?", a: ["32", "64", "128", "256"], correct: 0 },
  { q: "Which file contains user account info in Linux?", a: ["/etc/hosts", "/etc/passwd", "/etc/shadow", "/etc/group"], correct: 1 },
  { q: "What does CSRF stand for?", a: ["Cross-Site Resource Fetch", "Cross-Server Request Failure", "Cross-Site Request Forgery", "Cross-System Request Flow"], correct: 2 },
  { q: "Which tool is a popular web proxy for pentesting?", a: ["Burp Suite", "Postman", "Chrome DevTools", "CURL"], correct: 0 },
  { q: "What is the result of '1' + 1 in JavaScript?", a: ["2", "11", "NaN", "TypeError"], correct: 1 },
  { q: "Which protocol is used for resolving domain names?", a: ["DHCP", "DNS", "SNMP", "BGP"], correct: 1 },
  { q: "What is the purpose of the 'chmod 777' command?", a: ["Read only for owner", "Full access for everyone", "Write only for group", "No access"], correct: 1 },
  { q: "Which header is used for JWT authentication?", a: ["Authorization", "Authenticate", "Proxy-Auth", "Cookie"], correct: 0 },
  { q: "What is the default port for PostgreSQL?", a: ["3306", "5432", "27017", "6379"], correct: 1 },
  { q: "Which command displays your IP address on Windows?", a: ["ifconfig", "ipconfig", "netstat", "route"], correct: 1 },
];

const HackArena = () => {
  const { addXP } = useXP();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1.0);
  const [xpPool, setXpPool] = useState(0);
  
  const [currentIdx, setCurrentIdx] = useState(0);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setLives(3);
    setStreak(0);
    setMultiplier(1.0);
    setXpPool(0);
    setCurrentIdx(0);
  };

  const handleAnswer = (optIdx) => {
    const isCorrect = optIdx === ARENA_BANK[currentIdx].correct;
    
    if (isCorrect) {
       const newStreak = streak + 1;
       const newMulti = Math.min(3.0, 1.0 + (newStreak * 0.1)); // Cap multiplier at 3.0x
       const reward = Math.floor(25 * newMulti);
       
       setStreak(newStreak);
       setMultiplier(Number(newMulti.toFixed(1)));
       setXpPool(prev => prev + reward);
       
       // Advance question
       setCurrentIdx(prev => (prev + 1) % ARENA_BANK.length); // Loop around for prototype
    } else {
       const newLives = lives - 1;
       setLives(newLives);
       setStreak(0);
       setMultiplier(1.0);
       
       if (newLives <= 0) {
          endGame();
       } else {
          setCurrentIdx(prev => (prev + 1) % ARENA_BANK.length);
       }
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    if (xpPool > 0) {
       addXP(xpPool, "Hack Arena Survival Run");
    }
  };

  if (gameOver) {
     return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center animate-fade-in-up">
           <Helmet><title>Arena Post-Mortem — Elite Hackers</title></Helmet>
           <div className="bg-[#0b0404] border border-red/30 p-10 rounded-2xl max-w-md w-full text-center relative overflow-hidden glow-red">
               <Skull size={48} className="text-red mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,0,60,0.8)]" />
               <h2 className="font-display font-bold text-3xl tracking-widest text-red mb-2 uppercase">SYSTEM TERMINATED</h2>
               <p className="font-mono text-sm text-text-muted mb-8 tracking-widest uppercase">Intrusion Repelled</p>
               
               <div className="bg-[#050508] border border-border p-6 rounded-xl mb-8">
                  <div className="flex justify-between items-center mb-4 border-b border-[#1a2236] pb-4">
                     <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">XP Extracted</span>
                     <span className="font-mono text-lg font-bold text-primary glow-green">+{xpPool}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">Peak Streak</span>
                     <span className="font-bold font-mono text-gold tracking-widest">{streak}</span>
                  </div>
               </div>

               <button onClick={startGame} className="w-full py-4 border border-red text-red hover:bg-red hover:text-white rounded font-display tracking-widest uppercase font-bold transition-all shadow-[0_0_15px_rgba(255,0,60,0.3)]">
                  [ RE-ENGAGE ]
               </button>
           </div>
        </div>
     );
  }

  if (!isPlaying) {
     return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center animate-fade-in-up px-4">
           <Helmet><title>Hack Arena — Elite Hackers</title></Helmet>
           <div className="bg-[#050508] border border-[#1a2236] max-w-4xl w-full rounded-2xl flex flex-col md:flex-row overflow-hidden relative group glow-cyan">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0"></div>
              
              <div className="md:w-1/2 p-10 flex flex-col justify-center relative z-10 border-r border-[#1a2236]">
                 <div className="inline-flex items-center gap-2 text-cyan font-mono text-[10px] tracking-widest uppercase font-bold mb-4 bg-cyan/10 border border-cyan/20 px-3 py-1.5 rounded-sm w-max">
                    <Crosshair size={14} /> SURVIVAL INSTANCE
                 </div>
                 <h1 className="font-display font-bold text-4xl text-text-primary tracking-widest uppercase mb-4">HACK ARENA</h1>
                 <p className="font-mono text-sm text-text-muted leading-relaxed mb-8">
                    Enter the gauntlet. Infinite questions. 3 lives. Multipliers scale with your streak. How long can you survive the global defense grid?
                 </p>
                 <button onClick={startGame} className="px-8 py-4 bg-cyan text-[#050508] rounded font-display font-bold tracking-widest uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] transition-all flex items-center justify-center gap-3">
                    [ INITIATE BREACH ] <Zap size={16} />
                 </button>
              </div>

              <div className="md:w-1/2 bg-[#0a0d14] p-10 relative z-10">
                 <h3 className="font-mono text-[10px] text-text-muted tracking-widest uppercase font-bold mb-6 border-b border-[#1a2236] pb-3">PROTOCOL RULES</h3>
                 <ul className="space-y-6">
                    <li className="flex gap-4 items-start">
                       <Shield size={20} className="text-primary shrink-0" />
                       <div>
                          <p className="font-mono text-xs font-bold text-text-primary uppercase tracking-widest mb-1">Defense Grid (3 Lives)</p>
                          <p className="font-mono text-[10px] text-text-secondary leading-relaxed">Three incorrect answers trigger a system lockdown. Protect your connection.</p>
                       </div>
                    </li>
                    <li className="flex gap-4 items-start">
                       <Zap size={20} className="text-cyan shrink-0" />
                       <div>
                          <p className="font-mono text-xs font-bold text-text-primary uppercase tracking-widest mb-1">Dynamic Multiplier</p>
                          <p className="font-mono text-[10px] text-text-secondary leading-relaxed">Successive correct answers scale XP gains exponentially up to 3.0x.</p>
                       </div>
                    </li>
                    <li className="flex gap-4 items-start">
                       <Award size={20} className="text-gold shrink-0" />
                       <div>
                          <p className="font-mono text-xs font-bold text-text-primary uppercase tracking-widest mb-1">Extraction</p>
                          <p className="font-mono text-[10px] text-text-secondary leading-relaxed">XP is securely extracted and applied to your main profile upon termination.</p>
                       </div>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
     );
  }

  const q = ARENA_BANK[currentIdx];

  return (
    <div className="max-w-4xl mx-auto py-10 animate-fade-in-up">
      <Helmet><title>Active Breach — Elite Hackers</title></Helmet>

      {/* ARENA HUD */}
      <div className="flex flex-wrap justify-between items-end mb-8 gap-4 bg-[#0a0d14] border border-[#1a2236] p-4 rounded-xl">
         <div>
            <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase font-bold block mb-1">XP POOL</span>
            <span className="font-display font-bold text-2xl text-primary glow-green">{xpPool}</span>
         </div>
         <div className="text-center">
            <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase font-bold block mb-1">MULTIPLIER</span>
            <span className="font-mono font-bold text-cyan text-xl bg-cyan/10 px-3 py-1 rounded border border-cyan/30 flex items-center justify-center gap-1">
               {multiplier.toFixed(1)}x {multiplier >= 1.5 && <Zap size={14} className="animate-pulse" />}
            </span>
         </div>
         <div className="text-right">
            <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase font-bold block mb-2">SYSTEM INTEGRITY</span>
            <div className="flex gap-2 justify-end">
               {[1, 2, 3].map(i => (
                 <ShieldAlert key={i} size={20} className={i <= lives ? 'text-primary drop-shadow-[0_0_5px_rgba(0,255,136,0.8)]' : 'text-[#1a2236]'} />
               ))}
            </div>
         </div>
      </div>

      {/* QUESTION INJECTION */}
      <motion.div 
        key={currentIdx}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-bg-card border border-border p-8 rounded-2xl relative overflow-hidden"
      >
         <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan via-primary to-cyan"></div>
         <h2 className="font-display font-bold text-2xl text-text-primary tracking-wide mb-8 leading-relaxed mt-4">
            {q.q}
         </h2>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {q.a.map((opt, idx) => (
               <button 
                 key={idx}
                 onClick={() => handleAnswer(idx)}
                 className="text-left p-6 border border-[#1a2236] rounded-xl font-mono text-[13px] tracking-widest text-text-secondary hover:text-cyan hover:border-cyan hover:bg-cyan/5 transition-all group relative overflow-hidden"
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cyan/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="relative z-10 block pr-4">{opt}</span>
               </button>
            ))}
         </div>
      </motion.div>
    </div>
  );
};

export default HackArena;