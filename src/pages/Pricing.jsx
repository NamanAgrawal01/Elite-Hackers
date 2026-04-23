import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Check, Zap, Shield, Crown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PLANS = [
  {
    id: 'free',
    name: 'Recruit',
    price: '$0',
    icon: Zap,
    color: 'text-primary',
    border: 'border-primary',
    bg: 'bg-primary',
    features: [
      'Access to 5 Core Languages',
      'Basic Compiler Engine (Normal Priority)',
      'Community Forum Access',
      'Standard Quizzes'
    ]
  },
  {
    id: 'pro',
    name: 'Professional Hacker',
    price: '$15',
    period: '/mo',
    icon: Shield,
    color: 'text-cyan',
    border: 'border-cyan',
    bg: 'bg-cyan',
    popular: true,
    features: [
      'Access to ALL 55+ Languages',
      'High-Priority Sandbox Compilation',
      'Verifiable PDF Certificates',
      'Daily Challenge Streak Multipliers',
      'Pro Supporter Badge'
    ]
  },
  {
    id: 'elite',
    name: 'Elite Sentinel',
    price: '$49',
    period: '/mo',
    icon: Crown,
    color: 'text-gold',
    border: 'border-gold',
    bg: 'bg-gold',
    features: [
      'Everything in Professional',
      'Classified Kali Linux Hub Access',
      'Malware Analysis Sandboxes',
      '1-on-1 Code Audits',
      '2x Global XP Multiplier',
      'Elite Animated Profile Badge'
    ]
  },
  {
    id: 'admin',
    name: 'Admin Clearance',
    price: '$500',
    period: '/lifetime',
    icon: Shield,
    color: 'text-red',
    border: 'border-red',
    bg: 'bg-red',
    features: [
      'Access to Base Admin Matrix',
      'User Search & Basic Logs',
      'Manage Community Posts',
      'Lifetime Security Clearance',
      'Admin Terminal Badge'
    ]
  }
];

const Pricing = () => {
  const { userData, currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const initiateUpgrade = (plan) => {
    if (!userData) return navigate('/login');
    if (userData.plan === plan.id) return toast.error('ALREADY AT THIS CLEARANCE');
    if (userData.pendingPlan === plan.id) return toast.info('VERIFICATION IN PROGRESS');
    
    setSelectedPlan(plan);
    setShowQR(true);
  };

  const handleUpgrade = async () => {
    setLoading(selectedPlan.id);
    setShowQR(false);
    
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        pendingPlan: selectedPlan.id
      });
      toast.success(`REQUEST DISPATCHED: SCAN LOGGED`, {
        duration: 5000,
        icon: '🛰️'
      });
      setLoading(null);
    } catch (err) {
      console.error(err);
      toast.error('TRANSMISSION FAILED');
      setLoading(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 animate-fade-in-up relative">
      <Helmet><title>Security Clearances — ELITE HACKERS</title></Helmet>

      {/* QR MODAL */}
      {showQR && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#050508]/90 backdrop-blur-md" onClick={() => setShowQR(false)}></div>
          <div className="relative bg-[#0d1117] border border-primary/30 rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(0,255,136,0.2)] animate-float">
            <h3 className="font-display font-bold text-xl text-primary tracking-widest uppercase mb-2">SECURE PAYMENT</h3>
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-6">SCAN TO INITIALIZE UPGRADE TO {selectedPlan?.name}</p>
            
            <div className="bg-white p-4 rounded-xl mb-6 mx-auto w-fit">
              <img src="/payments-qr.png" alt="Payment QR" className="w-48 h-48" onError={(e) => e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EliteHackersPayment'} />
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleUpgrade}
                className="w-full py-4 bg-primary text-bg-primary font-display font-bold tracking-[4px] text-xs rounded-xl hover:scale-105 transition-all uppercase"
              >
                [ I HAVE PAID ]
              </button>
              <button 
                onClick={() => setShowQR(false)}
                className="w-full py-2 font-mono text-[10px] text-text-muted hover:text-white transition-colors uppercase tracking-widest"
              >
                Cancel Transmission
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-16 px-4">
         <h1 className="font-display font-bold text-4xl text-text-primary tracking-widest uppercase mb-4">SECURITY <span className="text-primary glow-green">CLEARANCE TIERS</span></h1>
         <p className="font-mono text-sm text-text-muted tracking-widest uppercase max-w-2xl mx-auto mb-6">Upgrade your node. All payments are verified manually by the Owner for maximum security.</p>
         <Link to="/subscription" className="inline-flex items-center gap-2 font-mono text-[10px] text-primary hover:underline uppercase tracking-widest">
            {'>'} CHECK CURRENT NODE CLEARANCE STATUS
         </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {PLANS.map((plan) => {
          const isCurrent = userData?.plan === plan.id;
          const isPending = userData?.pendingPlan === plan.id;
          return (
            <div 
              key={plan.id}
              className={`relative bg-bg-card rounded-2xl p-8 flex flex-col ${plan.popular ? 'border-2 border-cyan shadow-[0_0_30px_rgba(0,212,255,0.15)] glow-cyan' : 'border border-[#1a2236]'}`}
            >
               {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan text-[#050508] font-bold font-mono text-[10px] tracking-widest uppercase px-4 py-1 rounded-full">
                     RECOMMENDED
                  </div>
               )}
               
               <plan.icon size={32} className={`mb-6 ${plan.color}`} />
               
               <h3 className="font-display font-bold text-xl tracking-widest uppercase mb-2">{plan.name}</h3>
               
               <div className="mb-8 flex items-end gap-1">
                  <span className={`font-display font-bold text-4xl ${plan.color}`}>{plan.price}</span>
                  {plan.period && <span className="font-mono text-text-muted mb-1 text-[10px] uppercase ml-1">{plan.period}</span>}
               </div>

               <div className="flex-1">
                  <ul className="space-y-4 mb-8">
                     {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3">
                           <Check size={16} className={`${plan.color} shrink-0 mt-0.5`} />
                           <span className="font-mono text-[10px] text-text-secondary leading-relaxed uppercase tracking-widest">{feat}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               <button 
                 onClick={() => initiateUpgrade(plan)}
                 disabled={isCurrent || loading === plan.id || isPending}
                 className={`w-full py-4 rounded-xl font-display font-bold tracking-widest uppercase transition-all flex justify-center items-center gap-2 text-xs border ${
                   isCurrent 
                     ? 'bg-[#1a2236] text-text-muted border-transparent cursor-not-allowed' 
                     : isPending
                     ? 'bg-gold/10 text-gold border-gold/30 cursor-wait animate-pulse'
                     : `${plan.bg} text-[#050508] border-transparent hover:scale-[1.02] active:scale-95 shadow-lg`
                 }`}
               >
                  {loading === plan.id ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : isCurrent ? 'ACTIVE' : isPending ? 'PENDING VERIFICATION' : 'REQUEST ENTRANCE'}
               </button>
            </div>
          );
        })}
      </div>
      
      <div className="mt-16 bg-[#0d1117] border border-border p-10 rounded-2xl text-center max-w-3xl mx-auto">
         <h4 className="font-display font-bold text-lg text-text-primary tracking-widest uppercase mb-4">Manual Payment Protocol</h4>
         <p className="font-mono text-xs text-text-muted leading-relaxed uppercase tracking-widest mb-0">
            After scanning the QR and clicking "I HAVE PAID", your node status will enter the "Pending" state. Verification usually takes 1-4 hours. You will receive a system broadcast once the Owner confirms your payment.
         </p>
      </div>
    </div>
  );
};

export default Pricing;