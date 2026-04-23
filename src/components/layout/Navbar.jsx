import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NotificationBell } from '../notifications/NotificationBell';
import { Zap, Moon, Sun, Menu } from 'lucide-react';

const Navbar = () => {
  const { userData } = useAuth();
  const location = useLocation();

  const getPageTitle = (pathname) => {
    const paths = pathname.split('/').filter(Boolean);
    if (paths.length === 0) return 'OVERVIEW';
    const firstPath = paths[0].toUpperCase();
    if (paths[0] === 'course') return 'COURSE TERMINAL';
    if (paths[0] === 'quiz') return 'EVALUATION ENGINE';
    return firstPath.replace(/-/g, ' ');
  };

  return (
    <header className="h-16 border-b border-[#1a2236] bg-[#050508]/80 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-6 w-full">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Icon (Desktop hidden) */}
        <button className="lg:hidden text-text-muted hover:text-primary">
          <Menu size={20} />
        </button>
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Elite Hackers" className="h-8 w-auto group-hover:scale-105 transition-transform" />
          <div className="hidden md:block">
            <h1 className="font-display font-bold text-sm tracking-[4px] text-text-primary uppercase leading-none">ELITE HACKERS</h1>
            <p className="font-mono text-[8px] text-primary tracking-[2px] mt-1 uppercase font-bold">Terminal Access</p>
          </div>
        </Link>
        <div className="ml-4 h-6 w-[1px] bg-border hidden lg:block"></div>
        <h2 className="font-display font-bold text-xs tracking-widest text-text-secondary uppercase hidden lg:flex items-center gap-2">
          <span className="text-primary opacity-30">/</span> {getPageTitle(location.pathname)}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          to="/daily-challenges" 
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-primary/30 rounded-md bg-primary/5 hover:bg-primary/20 hover:border-primary text-primary transition-all group font-mono text-[10px] uppercase font-bold tracking-widest"
        >
          <Zap size={14} className="group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_rgba(0,255,136,1)] transition-all" />
          <span className="hidden md:inline">Daily Challenge</span>
        </Link>
        
        <button className="p-2 rounded-lg bg-[#0d1117] border border-[#1a2236] text-text-muted hover:text-cyan hover:border-cyan transition-all">
          <Moon size={18} />
        </button>

        <NotificationBell />

        {userData && (
          <Link to="/profile" className="ml-2 hover:scale-105 transition-transform">
            <img src={userData.photoURL} alt="Profile" className="w-9 h-9 rounded-full border-2 border-primary/50 object-cover" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
