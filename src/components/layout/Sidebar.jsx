import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useTheme } from '../../context/ThemeContext';
import { RankBadge, PlanBadge, XPBar } from '../ui/Badges';
import { 
  Home, Terminal, Zap, Map, Activity, Trophy, Award, 
  Star, Briefcase, Code, Users, Shield, User, Settings, LogOut, ShieldAlert
} from 'lucide-react';

import { NAV_ITEMS } from '../../utils/constants';

const Sidebar = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, toggleTheme, themes } = useTheme();
  
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navItems = NAV_ITEMS;


  return (
    <aside className="hidden lg:flex w-[240px] h-screen bg-bg-primary border-r border-border flex-col overflow-y-auto hide-scrollbar sticky top-0">
      <div className="p-6">
        <div className="flex flex-col items-center mb-8 cursor-pointer group" onClick={() => navigate('/dashboard')}>
           <img src="/logo.png" alt="Elite Hackers" className="w-20 h-auto mb-3 group-hover:scale-110 transition-transform" />
           <div className="text-center">
             <div className="font-display font-bold text-[10px] text-primary tracking-[6px] uppercase leading-none">ELITE HACKERS</div>
             <div className="font-mono text-[7px] text-primary tracking-[3px] mt-1 uppercase font-bold opacity-70">Secured Node</div>
           </div>
        </div>
 
        {userData && (
          <div className="relative bg-bg-card border border-border rounded-xl p-4 mb-8">
            <div className="flex gap-3 items-center mb-3">
              <div className="relative">
                <img src={userData.photoURL} alt="avatar" className="w-12 h-12 rounded-full border-2 border-primary/50 object-cover" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-bg-card rounded-full"></div>
              </div>
              <div>
                <div className="font-display font-bold text-[14px] text-primary tracking-wider truncate w-[100px]">{userData.username}</div>
                <div className="flex gap-1 mt-1">
                  <PlanBadge plan={userData.plan} />
                  <RankBadge rank={userData.rank} />
                </div>
              </div>
            </div>
            <XPBar currentXP={userData.totalXP} level={userData.level} />
          </div>
        )}
 
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path.includes('#') && location.hash === item.path.split('#')[1]);
            const itemColor = item.color || 'text-secondary';
            
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-mono tracking-widest transition-all duration-200 group ${
                  isActive 
                    ? 'bg-primary/10 text-primary border-l-[3px] border-primary font-bold' 
                    : `text-secondary hover:bg-bg-elevated hover:text-primary border-l-[3px] border-transparent`
                }`}
              >
                <item.icon size={16} className={`${isActive ? 'text-primary' : itemColor} group-hover:scale-110 transition-transform`} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
 
          <NavLink
            to="/subscription"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-mono tracking-widest transition-all duration-200 group ${
              location.pathname === '/subscription'
                ? 'bg-primary/10 text-primary border-l-[3px] border-primary font-bold' 
                : 'text-secondary hover:bg-bg-elevated hover:text-primary border-l-[3px] border-transparent'
            }`}
          >
            <Shield size={16} className={`${location.pathname === '/subscription' ? 'text-primary' : 'text-muted'} group-hover:scale-110 transition-transform`} />
            <span>MY CLEARANCE</span>
          </NavLink>
 
          {userData?.isAdmin && (
            <>
              <div className="my-4 border-t border-border"></div>
              <NavLink
                to="/admin"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-mono tracking-widest transition-all duration-200 group ${
                  location.pathname.startsWith('/admin') && !location.pathname.includes('matrix')
                    ? 'bg-primary/10 text-primary border-l-[3px] border-primary font-bold' 
                    : 'text-muted hover:bg-bg-elevated hover:text-primary border-l-[3px] border-transparent'
                }`}
              >
                <ShieldAlert size={16} className="group-hover:scale-110 transition-transform" />
                <span>{userData?.isOwner ? 'OWNER PANEL' : 'ADMIN PANEL'}</span>
              </NavLink>
            </>
          )}
 
          {(userData?.plan === 'admin' || userData?.role === 'admin') && (
            <NavLink
              to="/admin-matrix"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-mono tracking-widest transition-all duration-200 group ${
                location.pathname === '/admin-matrix'
                  ? 'bg-gold/10 text-gold border-l-[3px] border-gold font-bold' 
                  : 'text-muted hover:bg-bg-elevated hover:text-gold border-l-[3px] border-transparent'
              }`}
            >
              <Shield size={16} className="text-gold group-hover:scale-110 transition-transform" />
              <span>ADMIN MATRIX</span>
            </NavLink>
          )}
        </nav>
      </div>
 
      <div className="mt-auto p-6 space-y-6 border-t border-border">
        {/* THEME TERMINAL */}
        <div className="bg-[#0b0404] border border-border p-3 rounded-xl">
           <div className="font-mono text-[8px] text-muted uppercase tracking-widest mb-3 flex items-center justify-between">
              <span>Theme Node: {theme.toUpperCase()}</span>
              <Settings size={10} className="animate-spin-slow" />
           </div>
           <div className="grid grid-cols-5 gap-2">
              {Object.entries(themes).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => toggleTheme(key)}
                  className={`w-full aspect-square rounded-md border transition-all ${theme === key ? 'border-primary scale-110 shadow-[0_0_10px_var(--primary-glow)]' : 'border-border grayscale hover:grayscale-0'}`}
                  style={{ backgroundColor: t.primary }}
                  title={t.name}
                />
              ))}
           </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2 text-red/70 hover:text-red hover:bg-red/10 rounded-lg text-[13px] font-mono tracking-widest transition-colors font-bold uppercase"
        >
          <LogOut size={16} /> [ LOGOUT ]
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
