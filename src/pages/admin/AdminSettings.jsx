import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Settings as SettingsIcon, Shield, Server, Cpu, Database, Save, AlertTriangle, Power } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSettings = () => {
    const [maintenance, setMaintenance] = useState(false);
    const [auditLog, setAuditLog] = useState(true);

    const handleSave = () => {
        toast.success("KERNEL CONFIGURATION UPDATED");
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up space-y-10">
            <Helmet><title>Core Config — ELITE HACKERS</title></Helmet>

            <div className="flex items-center justify-between pb-6 border-b border-border">
                <div>
                    <h1 className="font-display font-bold text-3xl text-primary tracking-widest uppercase mb-1">CORE CONFIGURATION</h1>
                    <p className="font-mono text-[10px] text-muted tracking-[4px] uppercase font-bold">Managing global infrastructure parameters</p>
                </div>
                <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-2">
                    <Shield size={14} className="text-primary" />
                    <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-widest">OWNER LEVEL ACCESS</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* SYSTEM TOGGLES */}
                <div className="bg-bg-card border border-border p-8 rounded-2xl space-y-8">
                    <div className="flex items-center justify-between p-6 bg-bg-primary border border-border rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red/10 rounded-lg flex items-center justify-center text-red">
                                <Power size={20} />
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-sm text-primary uppercase tracking-wide">MAINTENANCE MODE</h4>
                                <p className="font-mono text-[10px] text-muted uppercase">Lock the entire mesh for updates</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setMaintenance(!maintenance)}
                            className={`w-14 h-8 rounded-full transition-all relative ${maintenance ? 'bg-red' : 'bg-bg-card border border-border'}`}
                        >
                            <div className={`absolute top-1 w-6 h-6 rounded-full transition-all ${maintenance ? 'right-1 bg-white' : 'left-1 bg-text-muted'}`}></div>
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-bg-primary border border-border rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <Search size={20} />
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-sm text-primary uppercase tracking-wide">REAL-TIME AUDIT LOGGING</h4>
                                <p className="font-mono text-[10px] text-muted uppercase">Global forensic tracking of all events</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setAuditLog(!auditLog)}
                            className={`w-14 h-8 rounded-full transition-all relative ${auditLog ? 'bg-primary' : 'bg-bg-card border border-border'}`}
                        >
                            <div className={`absolute top-1 w-6 h-6 rounded-full transition-all ${auditLog ? 'right-1 bg-white' : 'left-1 bg-text-muted'}`}></div>
                        </button>
                    </div>
                </div>

                {/* API & INFRASTRUCTURE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-bg-card border border-border p-6 rounded-2xl space-y-4">
                        <div className="flex items-center gap-3 text-muted mb-2">
                            <Cpu size={18} />
                            <h4 className="font-display font-bold text-xs uppercase tracking-widest">Compiler Node</h4>
                        </div>
                        <input 
                            type="text" 
                            readOnly 
                            value="https://emkc.org/api/v2/piston" 
                            className="w-full bg-bg-primary border border-border rounded-lg p-3 font-mono text-xs text-muted cursor-not-allowed" 
                        />
                        <p className="font-mono text-[8px] text-muted uppercase">Connected to Piston API v2</p>
                    </div>

                    <div className="bg-bg-card border border-border p-6 rounded-2xl space-y-4">
                        <div className="flex items-center gap-3 text-muted mb-2">
                            <Database size={18} />
                            <h4 className="font-display font-bold text-xs uppercase tracking-widest">Cloud Database</h4>
                        </div>
                        <input 
                            type="text" 
                            readOnly 
                            value="FIREBASE_FIRESTORE_US_EAST" 
                            className="w-full bg-bg-primary border border-border rounded-lg p-3 font-mono text-xs text-muted cursor-not-allowed" 
                        />
                        <p className="font-mono text-[8px] text-muted uppercase">Status: SYNCHRONIZED</p>
                    </div>
                </div>

                <div className="bg-red/5 border border-red/30 p-6 rounded-2xl flex items-start gap-4">
                    <AlertTriangle size={24} className="text-red shrink-0" />
                    <div>
                        <h4 className="font-display font-bold text-sm text-red uppercase tracking-widest mb-1">DANGER ZONE</h4>
                        <p className="font-body text-[10px] text-secondary leading-relaxed uppercase tracking-widest">
                            Wiping the global cache or resetting production database nodes will result in irreversible data loss. Proceed with extreme caution.
                        </p>
                        <button className="mt-4 px-6 py-2 border border-red/50 text-red font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-red hover:text-white transition-all">
                            [ FLUSH SYSTEM CACHE ]
                        </button>
                    </div>
                </div>
            </div>

            <div className="pt-10 flex justify-end">
                <button 
                    onClick={handleSave}
                    className="px-10 h-14 bg-primary text-bg-primary font-display font-bold text-xs tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg uppercase flex items-center gap-3"
                >
                    <Save size={18} /> [ SYNC KERNEL ]
                </button>
            </div>
        </div>
    );
};

export default AdminSettings;