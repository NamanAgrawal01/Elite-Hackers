import React from 'react';
import LoadingScreen from '../../components/ui/LoadingScreen';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Users, FileText, Settings, ShieldAlert, Activity, DollarSign, Award, Target, Bell } from 'lucide-react';
import CountUp from '../../components/ui/CountUp';
import { useAuth } from '../../hooks/useAuth';

const ADMIN_MODULES = [
  { title: "User Matrix", path: "/admin/users", icon: Users, desc: "Manage accounts, ranks, suspensions, and roles", color: "text-cyan" },
  { title: "Financial Node", path: "/admin/payments", icon: DollarSign, desc: "Track revenue and confirm subscriptions", color: "text-gold", ownerOnly: true },
  { title: "Content Engine", path: "/admin/content", icon: FileText, desc: "Deploy new courses and modules", color: "text-primary" },
  { title: "Evaluation Core", path: "/admin/quizzes", icon: Target, desc: "Edit quizzes and Arena questions", color: "text-purple" },
  { title: "Cert Authority", path: "/admin/certificates", icon: Award, desc: "Revoke or manually issue certs", color: "text-orange-500" },
  { title: "System Broadcasts", path: "/admin/announcements", icon: Bell, desc: "Push global notifications", color: "text-blue-500" },
  { title: "Core Configuration", path: "/admin/settings", icon: Settings, desc: "API keys and maintenance", color: "text-secondary", ownerOnly: true },
];

const METRICS = [
  { label: "Active Nodes", val: 12450, icon: Activity },
  { label: "Monthly Rev ($)", val: 145000, icon: DollarSign, ownerOnly: true },
  { label: "Certs Issued", val: 890, icon: Award },
  { label: "Threat Level", val: 2, icon: ShieldAlert, suffix: '%' }
];

const AdminOverview = () => {
  const { userData } = useAuth();
  if (!userData) return <LoadingScreen />;

  const modules = ADMIN_MODULES.filter(m => !m.ownerOnly || userData?.isOwner);
  const metrics = METRICS.filter(m => !m.ownerOnly || userData?.isOwner);

  return (
    <div className="max-w-7xl mx-auto animate-fade-in-up">
      <Helmet><title>{userData?.isOwner ? 'Owner Engine' : 'Admin Kernel'} — Elite Hackers</title></Helmet>

      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#1a2236]">
         <div>
            <div className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase font-bold mb-2 border px-3 py-1.5 rounded-sm ${userData?.isOwner ? 'text-primary border-primary/20 bg-primary/10' : 'text-[#ff6b35] border-[#ff6b35]/20 bg-[#ff6b35]/10'}`}>
               <ShieldAlert size={14} /> {userData?.isOwner ? 'OWNER ACCESS GRANTED' : 'ADMIN KERNEL ACTIVE'}
            </div>
            <h1 className="font-display font-bold text-3xl text-primary tracking-widest uppercase">
               {userData?.isOwner ? 'OWNER CONTROL CENTER' : 'COMMAND CENTER'}
            </h1>
         </div>
         <div className="text-right font-mono text-[10px] text-muted tracking-widest uppercase">
            System Up Time<br/>
            <span className="text-primary font-bold text-sm">99.999%</span>
         </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
         {metrics.map((m, i) => (
            <div key={i} className="bg-[#0b0404] border border-[#1a2236] p-6 rounded-xl relative overflow-hidden group hover:border-primary/30 transition-all">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
               <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className="font-mono text-[10px] text-muted font-bold tracking-widest uppercase">{m.label}</span>
                  <m.icon size={18} className="text-primary" />
               </div>
               <div className="font-display font-bold text-3xl text-primary relative z-10">
                  <CountUp end={m.val} />{m.suffix}
               </div>
            </div>
         ))}
      </div>

      {/* MODULES GRID */}
      <div>
         <h2 className="font-mono text-[12px] font-bold text-muted tracking-widest uppercase mb-4">Control Matrices</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {modules.map((mod, i) => (
               <Link 
                  key={i}
                  to={mod.path}
                   className={`bg-bg-card border border-[#1a2236] p-6 rounded-xl hover:-translate-y-1 transition-all group ${mod.ownerOnly ? 'hover:border-primary/50' : 'hover:border-[#ff6b35]/50'}`}
               >
                  <mod.icon size={28} className={`${mod.color} mb-6 group-hover:scale-110 transition-transform`} />
                  <h3 className="font-display font-bold text-lg text-primary tracking-wide mb-2">{mod.title}</h3>
                  <p className="font-mono text-[11px] text-secondary leading-relaxed tracking-widest uppercase">{mod.desc}</p>
               </Link>
            ))}
         </div>
      </div>
    </div>
  );
};

export default AdminOverview;