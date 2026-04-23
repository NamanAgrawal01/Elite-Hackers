import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { User, Shield, CreditCard, Bell, Monitor, Lock, Trash2, Key, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Settings = () => {
  const { userData, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('ACCOUNT');

  const tabs = [
    { id: 'ACCOUNT', label: 'ACCOUNT PROFILE', icon: User },
    { id: 'SECURITY', label: 'SECURITY & ADM', icon: Shield },
    { id: 'PAYMENTS', label: 'PAYMENTS & CLEARANCE', icon: CreditCard },
    { id: 'SYSTEM', label: 'SYSTEM REFS', icon: Monitor },
  ];

  const handleSave = () => {
    toast.success('SETTINGS SYNCHRONIZED');
  };

  return (
    <div className="animate-fade-in-up space-y-10">
      <Helmet><title>Settings Panel — ELITE HACKERS</title></Helmet>

      <div>
        <h1 className="font-display font-bold text-4xl text-text-primary tracking-widest uppercase mb-2">
            SYSTEM <span className="text-primary glow-green">SETTINGS</span>
        </h1>
        <p className="font-mono text-xs text-text-muted tracking-[3px] uppercase">Configure your node parameters</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* TAB NAVIGATION */}
        <nav className="flex flex-row lg:flex-col gap-2 w-full lg:w-72">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 px-6 py-4 rounded-xl font-mono text-[11px] font-bold tracking-widest transition-all ${
                activeTab === tab.id 
                ? 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_20px_rgba(0,255,136,0.05)]' 
                : 'bg-bg-card border border-border text-text-muted hover:border-text-secondary hover:text-text-primary'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* CONTENT AREA */}
        <main className="flex-1 bg-bg-card border border-border rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          {activeTab === 'ACCOUNT' && (
            <div className="space-y-8 animate-slide-in-right">
              <div className="flex items-center gap-6 mb-10 pb-8 border-b border-border">
                <img src={userData?.photoURL} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-primary/50" />
                <div>
                  <h3 className="font-display font-bold text-xl text-text-primary uppercase tracking-wide">{userData?.username}</h3>
                  <p className="font-mono text-[11px] text-text-muted uppercase">UID: {currentUser?.uid.slice(0, 12)}...</p>
                </div>
                <button className="ml-auto px-6 py-2 border border-border rounded-lg font-mono text-[10px] font-bold text-text-secondary hover:text-primary hover:border-primary transition-all">
                  [ ROTATE AVATAR ]
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-text-muted uppercase font-bold tracking-widest ml-1">PRIMARY IDENTIFIER</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="text" readOnly value={userData?.email} className="w-full bg-bg-primary border border-border rounded-xl py-4 pl-12 pr-4 font-mono text-sm text-text-muted cursor-not-allowed" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-text-muted uppercase font-bold tracking-widest ml-1">CODENAME (READ-ONLY)</label>
                  <div className="relative">
                    <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="text" readOnly value={userData?.username} className="w-full bg-bg-primary border border-border rounded-xl py-4 pl-12 pr-4 font-mono text-sm text-text-muted cursor-not-allowed" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] text-text-muted uppercase font-bold tracking-widest ml-1">DIGITAL BIO</label>
                <textarea 
                  placeholder="Tell the mesh about yourself..." 
                  className="w-full bg-bg-primary border border-border rounded-xl p-4 font-mono text-sm text-text-primary focus:border-primary outline-none min-h-[120px] transition-all"
                  defaultValue={userData?.bio}
                ></textarea>
              </div>

              <div className="pt-6">
                <button onClick={handleSave} className="px-10 py-4 bg-primary text-bg-primary font-display font-bold text-xs tracking-[4px] rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg uppercase">
                  [ SYNC CHANGES ]
                </button>
              </div>
            </div>
          )}

          {activeTab === 'SECURITY' && (
            <div className="space-y-8 animate-slide-in-right">
              <h3 className="font-display font-bold text-lg text-text-primary flex items-center gap-3 mb-6 uppercase tracking-widest">
                <Lock size={20} className="text-red" /> SECURITY PROTOCOLS
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-bg-primary border border-border p-6 rounded-xl flex items-center justify-between group hover:border-red/30 transition-all">
                   <div>
                      <h4 className="font-display font-bold text-sm text-text-primary uppercase tracking-wide">Multi-Factor Authentication</h4>
                      <p className="font-mono text-[10px] text-text-muted mt-1 uppercase">Add extra layer of protection</p>
                   </div>
                   <button className="px-4 py-2 border border-border rounded text-[10px] font-mono font-bold text-text-muted hover:text-red hover:border-red transition-all">
                      [ ENCRYPT ]
                   </button>
                </div>
                <div className="bg-bg-primary border border-border p-6 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all">
                   <div>
                      <h4 className="font-display font-bold text-sm text-text-primary uppercase tracking-wide">Change Passphrase</h4>
                      <p className="font-mono text-[10px] text-text-muted mt-1 uppercase">Rotate your primary entry key</p>
                   </div>
                   <button className="px-4 py-2 border border-border rounded text-[10px] font-mono font-bold text-text-muted hover:text-primary hover:border-primary transition-all">
                      [ ROTATE ]
                   </button>
                </div>
              </div>

              <div className="pt-10 border-t border-border">
                <h3 className="font-display font-bold text-lg text-red flex items-center gap-3 mb-4 uppercase tracking-widest">
                  <Trash2 size={20} /> SELF-DESTRUCT
                </h3>
                <p className="font-body text-xs text-text-secondary max-w-lg mb-6 leading-relaxed uppercase tracking-widest">
                  Permanently wipe your node, certificates, and XP from the ELITE HACKERS mesh. This cannot be undone.
                </p>
                <button className="px-8 py-4 bg-red/10 border border-red/30 text-red font-display font-bold text-xs tracking-widest rounded-xl hover:bg-red hover:text-white transition-all uppercase">
                  [ TERMINATE ACCOUNT ]
                </button>
              </div>
            </div>
          )}

          {activeTab === 'PAYMENTS' && (
             <div className="space-y-8 animate-slide-in-right">
                <div className="bg-bg-primary border border-border p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20">
                         <Shield size={32} />
                      </div>
                      <div>
                         <h3 className="font-display font-bold text-xl text-text-primary uppercase tracking-widest">{userData?.plan?.toUpperCase() || 'FREE'}</h3>
                         <p className="font-mono text-[10px] text-text-muted mt-1 uppercase tracking-widest font-bold">CURRENT CLEARANCE LEVEL</p>
                      </div>
                   </div>
                   <button className="px-8 py-3 bg-primary text-bg-primary font-display font-bold text-[10px] tracking-widest rounded focus:ring-2 ring-primary/50 hover:brightness-110 active:scale-95 transition-all uppercase">
                      [ VIEW UPGRADES ]
                   </button>
                </div>

                <div className="space-y-4">
                   <h4 className="font-display font-bold text-xs text-text-muted tracking-widest uppercase ml-1">Payment History</h4>
                   {userData?.plan === 'free' ? (
                      <div className="bg-bg-primary border border-border p-12 rounded-2xl flex flex-col items-center justify-center text-center opacity-50">
                         <CreditCard size={32} className="text-text-muted mb-4 opacity-20" />
                         <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest font-bold">No Recent Transactions Detected</p>
                      </div>
                   ) : (
                      <div className="space-y-3">
                         <div className="bg-bg-primary border border-border p-4 rounded-xl flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                               <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                  <Shield size={16} />
                               </div>
                               <div>
                                  <h5 className="font-display font-bold text-[11px] text-text-primary uppercase tracking-widest">{userData.plan.toUpperCase()} CLEARANCE</h5>
                                  <p className="font-mono text-[9px] text-text-muted uppercase mt-1">Transaction ID: TXN-{currentUser.uid.slice(0, 8).toUpperCase()}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="font-mono text-[11px] font-bold text-primary tracking-widest">VERIFIED</div>
                               <div className="font-mono text-[9px] text-text-muted uppercase mt-1">LIFETIME ACCESS</div>
                            </div>
                         </div>
                         <p className="font-mono text-[8px] text-text-muted uppercase tracking-[2px] mt-4 px-2">
                            Note: All payments are processed manually. Verification logs are stored in the secure distributed ledger.
                         </p>
                      </div>
                   )}
                </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;