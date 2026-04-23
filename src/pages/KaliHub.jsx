import React from 'react';
import LoadingScreen from '../components/ui/LoadingScreen';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, Lock, Terminal, Crosshair, Network, Key, Wifi, Server } from 'lucide-react';

const TOOLS = [
  { name: 'Nmap Scanner', icon: Network, desc: 'Network exploration and security auditing utility.' },
  { name: 'Metasploit', icon: Crosshair, desc: 'Exploit framework for penetration testing.' },
  { name: 'Wireshark', icon: Server, desc: 'Network protocol analyzer for deep packet inspection.' },
  { name: 'Burp Suite', icon: Shield, desc: 'Web vulnerability scanner and proxy tool.' },
  { name: 'Hashcat', icon: Key, desc: 'Advanced password recovery and cracking utility.' },
  { name: 'Aircrack-ng', icon: Wifi, desc: '802.11 WEP and WPA-PSK keys cracking program.' },
];

const KaliHub = () => {
  const { userData } = useAuth();
  
  if (!userData) return <LoadingScreen />;

  const isLocked = userData.plan === 'free';

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <Helmet><title>Kali Linux Hub — Elite Hackers</title></Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pb-6 border-b border-[var(--border)]">
         <div>
            <div className="inline-flex items-center gap-2 text-red font-mono text-[10px] tracking-widest uppercase font-bold mb-2 bg-red/10 border border-red/20 px-3 py-1.5 rounded-sm">
               <Shield size={14} /> HIGH SECURITY AREA
            </div>
            <h1 className="font-display font-bold text-3xl text-primary tracking-widest uppercase">KALI LINUX HUB</h1>
         </div>
      </div>

      {isLocked ? (
         <div className="bg-[#0b0404] border border-red/30 p-12 rounded-2xl text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDAsNjAsMC4wNSkiLz48L3N2Zz4=')] mix-blend-overlay"></div>
            
            <Lock size={48} className="mx-auto text-red mb-6 drop-shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
            <h2 className="font-display font-bold text-3xl text-primary tracking-widest uppercase mb-4 relative z-10">ACCESS CLASSIFIED</h2>
            <p className="font-mono text-sm text-secondary leading-relaxed max-w-xl mx-auto mb-8 relative z-10">
               The Kali Hub contains advanced enterprise penetration testing configurations, isolated virtual topologies, and live malware analysis sandboxes. Authorized personnel only.
            </p>
            
            <Link to="/pricing" className="inline-flex items-center gap-3 px-8 py-4 bg-red text-white uppercase font-display font-bold tracking-widest rounded-md hover:brightness-110 shadow-[0_0_20px_rgba(255,0,60,0.3)] transition-all relative z-10">
               <UnlockIcon /> UPGRADE CLEARANCE TO ENTER
            </Link>
         </div>
      ) : (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl flex flex-col overflow-hidden h-[450px]">
               <div className="h-10 bg-[var(--bg-card)] border-b border-[var(--border)] flex items-center px-4">
                  <span className="font-mono text-[10px] text-muted font-bold tracking-widest uppercase">root@kali: ~</span>
               </div>
               <div className="flex-1 p-6 font-mono text-xs text-secondary whitespace-pre-wrap overflow-y-auto">
                  <span className="text-primary font-bold">root@kali</span>:<span className="text-cyan">~</span># nmap -sS -O target_network<br/>
                  <br/>
                  Starting Nmap 7.92 ( https://nmap.org ) at {new Date().toISOString()}<br/>
                  Nmap scan report for target (192.168.1.100)<br/>
                  Host is up (0.0020s latency).<br/>
                  Not shown: 996 closed tcp ports (reset)<br/>
                  PORT    STATE SERVICE<br/>
                  22/tcp  <span className="text-primary">open</span>  ssh<br/>
                  80/tcp  <span className="text-primary">open</span>  http<br/>
                  443/tcp <span className="text-primary">open</span>  https<br/>
                  <br/>
                  <span className="animate-pulse border-r-4 border-text-muted inline-block w-2 h-4 align-middle mr-1"></span>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {TOOLS.map((tool, idx) => (
                 <motion.button 
                   key={idx}
                   whileHover={{ scale: 1.02 }}
                   className="bg-bg-card border border-border p-6 rounded-xl text-left hover:border-red/50 hover:shadow-[0_0_20px_rgba(255,0,60,0.1)] transition-all group group relative overflow-hidden"
                 >
                   <div className="absolute inset-0 bg-gradient-to-br from-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <tool.icon size={24} className="text-red mb-4 group-hover:scale-110 transition-transform relative z-10" />
                   <h3 className="font-display font-bold text-base text-primary uppercase tracking-wide mb-2 relative z-10">{tool.name}</h3>
                   <p className="font-mono text-[10px] text-muted leading-relaxed relative z-10">{tool.desc}</p>
                 </motion.button>
               ))}
            </div>
         </div>
      )}
    </div>
  );
};

const UnlockIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>;

export default KaliHub;