import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Target, Users, Zap, Award, Globe, Code2, Cpu } from 'lucide-react';
import { motion as Motion as Motion } from 'framer-motion';

const Feature = ({ icon: Icon, title, description }) => (
  <div className="elite-card p-8 group hover:border-primary/30 transition-all shadow-sm">
    <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-110 shadow-sm">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-text mb-3 uppercase tracking-tight">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed font-semibold">{description}</p>
  </div>
);

const About = () => {
  return (
    <div className="max-w-6xl mx-auto py-20 px-6 animate-fade-in space-y-24 pb-32">
      <Helmet>
        <title>About Us — Elite Hackers</title>
      </Helmet>

      {/* Hero Section */}
      <div className="text-center space-y-8 max-w-3xl mx-auto">
        <Motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm"
        >
          <Shield size={14} /> The Elite Standard
        </Motion.div>
        <h1 className="text-5xl md:text-7xl font-bold text-text tracking-tighter uppercase leading-none">Architecting the <br /><span className="text-primary italic">Next Generation</span></h1>
        <p className="text-lg text-slate-500 font-bold uppercase tracking-tight italic">
          Elite Hackers is more than a platform; it's a decentralized hub for high-fidelity engineering, 
          security auditing, and advanced system architecture.
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center p-10 bg-slate-50 border border-border rounded-[2.5rem] shadow-inner">
            <div className="text-4xl font-bold text-text mb-2 italic">15k+</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Nodes</div>
        </div>
        <div className="text-center p-10 bg-slate-50 border border-border rounded-[2.5rem] shadow-inner">
            <div className="text-4xl font-bold text-text mb-2 italic">55+</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Language Arrays</div>
        </div>
        <div className="text-center p-10 bg-slate-50 border border-border rounded-[2.5rem] shadow-inner">
            <div className="text-4xl font-bold text-text mb-2 italic">99.9%</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uptime Precision</div>
        </div>
        <div className="text-center p-10 bg-slate-50 border border-border rounded-[2.5rem] shadow-inner">
            <div className="text-4xl font-bold text-text mb-2 italic">∞</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Potential</div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10 order-2 lg:order-1">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-text uppercase tracking-tighter italic">Our Operational <span className="text-primary">Vision</span></h2>
            <p className="text-slate-500 text-lg leading-relaxed font-bold italic">
              In an era of entropic security, we provide the structured mastery needed to defend decentralized 
              identities and architect resilient systems. Our mission is to democratize high-level technological skills 
              through immersive, laboratory-driven learning.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="flex gap-6 items-start">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0 text-primary border border-indigo-100 shadow-sm">
                    <Zap size={18} fill="currentColor" />
                </div>
                <div>
                    <h4 className="font-bold text-text uppercase text-sm mb-1">Rapid Evolution</h4>
                    <p className="text-slate-400 text-xs font-semibold leading-relaxed">Our curriculum adapts faster than the zero-day exploits we study.</p>
                </div>
            </div>
             <div className="flex gap-6 items-start">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0 text-primary border border-indigo-100 shadow-sm">
                    <Globe size={18} />
                </div>
                <div>
                    <h4 className="font-bold text-text uppercase text-sm mb-1">Global Presence</h4>
                    <p className="text-slate-400 text-xs font-semibold leading-relaxed">A distributed community spanning over 120 global nodes.</p>
                </div>
            </div>
          </div>
        </div>
        <div className="relative group order-1 lg:order-2">
            <div className="absolute -inset-4 bg-indigo-100/50 rounded-[4rem] blur-2xl group-hover:bg-indigo-200/50 transition-all duration-500 opacity-50"></div>
            <div className="bg-white border border-border p-12 rounded-[3.5rem] relative shadow-2xl space-y-8">
                 <div className="flex gap-4">
                    <div className="w-3 h-3 rounded-full bg-rose-400 shadow-sm shadow-rose-200"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-200"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-200"></div>
                 </div>
                 <div className="space-y-4 font-mono text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                    <p className="flex items-center gap-4"><span className="text-primary italic">{">>>"}</span> Identity_Shell: Initiated</p>
                    <p className="flex items-center gap-4"><span className="text-primary italic">{">>>"}</span> Payload: Mastery_Array.pkg</p>
                    <p className="flex items-center gap-4"><span className="text-primary italic">{">>>"}</span> Decryption: In Progress [85%]</p>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-4">
                        <Motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            className="h-full bg-primary"
                        />
                    </div>
                 </div>
            </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-16">
        <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-text uppercase tracking-tighter">Core <span className="text-primary">Protocols</span></h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">The foundational ethics of Elite Hackers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature 
                icon={Code2} 
                title="Sovereign Code" 
                description="We believe in the power of open, resilient source code as the bedrock of digital freedom."
            />
            <Feature 
                icon={Cpu} 
                title="Edge Engineering" 
                description="Pushing the boundaries of hardware-software synergy through experimental payloads."
            />
            <Feature 
                icon={Target} 
                title="Precision Auditing" 
                description="High-fidelity analysis of complex systems to identify and neutralize entropic bottlenecks."
            />
        </div>
      </div>
    </div>
  );
};

export default About;
