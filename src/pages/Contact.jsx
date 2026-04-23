import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, Send, Globe, Phone, MapPin, Loader2, Zap, Shield } from 'lucide-react';
import { motion as Motion as Motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Transmission Received. Stand by for uplink.');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-20 px-6 animate-fade-in space-y-24 pb-32">
      <Helmet>
        <title>Uplink Portal — Elite Hackers</title>
      </Helmet>

      {/* Header */}
      <div className="text-center space-y-8 max-w-3xl mx-auto">
        <Motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm"
        >
          <Zap size={14} /> Establish Connection
        </Motion.div>
        <h1 className="text-5xl md:text-7xl font-bold text-text tracking-tighter uppercase leading-none">Global <span className="text-primary italic">Uplink</span> Portal</h1>
        <p className="text-lg text-slate-500 font-bold uppercase tracking-tight italic">
          Need a custom learning cluster or specialized system auditing? 
          Initialize a secure connection with our supervisor nodes.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-text uppercase tracking-tight italic">Direct <span className="text-primary">Channels</span></h3>
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest leading-loose">Reach our operators through verified communication protocols.</p>
            </div>

            <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 bg-white border border-border rounded-xl flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:border-primary/20 transition-all shadow-sm">
                        <Mail size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-text uppercase text-[10px] tracking-widest mb-1.5 text-slate-300">Email_Address</h4>
                        <p className="text-text font-bold text-base italic">hq@elitehackers.web.app</p>
                    </div>
                </div>
                <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 bg-white border border-border rounded-xl flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:border-primary/20 transition-all shadow-sm">
                        <Globe size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-text uppercase text-[10px] tracking-widest mb-1.5 text-slate-300">Global_Nodes</h4>
                        <p className="text-text font-bold text-base italic">Bangalore / Hyderabad / Remote</p>
                    </div>
                </div>
                <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 bg-white border border-border rounded-xl flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:border-primary/20 transition-all shadow-sm">
                        <MessageSquare size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-text uppercase text-[10px] tracking-widest mb-1.5 text-slate-300">Discord_Relay</h4>
                        <p className="text-primary font-bold text-base italic hover:underline cursor-pointer">Elite_Community_Alpha</p>
                    </div>
                </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[2.5rem] space-y-4 shadow-sm">
                <Shield size={24} className="text-primary" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed font-mono">
                  All transmissions are signed via RSA-2048 and logged in the forensic registry for security.
                </p>
            </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border border-border rounded-[3.5rem] p-12 shadow-2xl space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 text-primary opacity-[0.03] group-hover:scale-110 transition-transform pointer-events-none">
                    <Send size={300} />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Identify Handle</label>
                        <input 
                            required
                            type="text" 
                            className="input-field" 
                            placeholder="e.g. Neo_Architect"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Uplink Email</label>
                        <input 
                            required
                            type="email" 
                            className="input-field" 
                            placeholder="neo@matrix.net"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Transmission Category</label>
                    <select className="input-field appearance-none">
                        <option>General Inquiry</option>
                        <option>Custom Cluster Request</option>
                        <option>Enterprise Onboarding</option>
                        <option>Platform Bug Report</option>
                        <option>Partnership Protocol</option>
                    </select>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Payload (Message)</label>
                    <textarea 
                        required
                        className="input-field min-h-[160px] py-4" 
                        placeholder="Enter your transmission details here..."
                    ></textarea>
                </div>

                <button 
                    disabled={loading}
                    className="btn-primary w-full h-16 text-xs uppercase tracking-[.4em] italic shadow-indigo-100"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Send Transmission</>}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
