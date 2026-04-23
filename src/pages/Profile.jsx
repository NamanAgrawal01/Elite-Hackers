import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { MapPin, Calendar, Edit3, Share2, Award, Zap, Code, Shield } from 'lucide-react';
import { PlanBadge, RankBadge, XPBar } from '../components/ui/Badges';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const Profile = () => {
  const { userData, currentUser } = useAuth();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(userData?.bio || '');
  const [saving, setSaving] = useState(false);

  if (!userData) return null;

  const saveBio = async () => {
    setSaving(true);
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { bio: bioInput });
      toast.success('Bio sequence updated.');
      setIsEditingBio(false);
    } catch (err) {
      toast.error('Failed to update system memory.');
    } finally {
      setSaving(false);
    }
  };

  const shareProfile = () => {
    navigator.clipboard.writeText(`https://elitehackers.web.app/user/${userData.username}`);
    toast('Profile link copied to clipboard.', { icon: '🔗', style: { background: '#0d1117', color: '#00ff88', border: '1px solid #1a2236' }});
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) return toast.error("IMAGE EXCEEDS 1MB LIMIT");

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        setSaving(true);
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, { photoURL: reader.result });
        toast.success('AVATAR SEQUENCE UPDATED');
      } catch (err) {
        toast.error('FAILED TO SYNC AVATAR');
      } finally {
        setSaving(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <Helmet><title>{userData.username} — Elite Hackers</title></Helmet>

      {/* HEADER BANNER */}
      <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl overflow-hidden mb-8 relative group">
         <div className="h-32 bg-gradient-to-r from-primary/10 via-cyan/5 to-purple/10 w-full relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] mix-blend-overlay"></div>
            <button onClick={shareProfile} className="absolute top-4 right-4 bg-[#050508]/50 hover:bg-[#050508] p-2 rounded-lg border border-[#1a2236] text-text-muted hover:text-cyan transition-all backdrop-blur-sm z-10">
               <Share2 size={16} />
            </button>
         </div>
         
         <div className="px-8 pb-8 pt-0 relative flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-12 z-10">
            <div className="relative group/avatar">
              <img src={userData.photoURL} alt="Avatar" className="w-32 h-32 rounded-xl border-4 border-[#0d1117] bg-[#050508] object-cover shadow-[0_0_20px_rgba(0,255,136,0.2)]" />
              <label className="absolute inset-0 bg-bg-primary/60 backdrop-blur-sm rounded-xl opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center cursor-pointer transition-all border-2 border-dashed border-primary/40">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <div className="flex flex-col items-center gap-1">
                  <Edit3 size={18} className="text-primary" />
                  <span className="font-mono text-[8px] text-primary font-bold uppercase tracking-widest">UPLOAD</span>
                </div>
              </label>
            </div>
            
            <div className="flex-1 text-center md:text-left">
               <h1 className="font-display font-bold text-3xl text-text-primary tracking-widest">{userData.username}</h1>
               <div className="flex flex-wrap justify-center md:justify-start gap-4 text-text-muted font-mono text-[11px] mt-3 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-red" /> {userData.country.replace('-', ' ')}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> Joined {format(userData.joinDate?.toDate ? userData.joinDate.toDate() : new Date(), 'MMM yyyy')}</span>
                  {userData.isAdmin && <span className="flex items-center gap-1.5 text-[#ff6b35]"><Shield size={14} /> KERNEL ADMIN</span>}
               </div>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
               <PlanBadge plan={userData.plan} />
               <RankBadge rank={userData.rank} />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* LEFT COL */}
         <div className="lg:col-span-1 space-y-8">
            <div className="bg-bg-card border border-border p-6 rounded-2xl">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-mono text-[11px] font-bold tracking-widest text-text-muted uppercase">SYSTEM BIO</h3>
                  {!isEditingBio && (
                     <button onClick={() => setIsEditingBio(true)} className="text-text-muted hover:text-primary transition-colors"><Edit3 size={14}/></button>
                  )}
               </div>
               
               {isEditingBio ? (
                  <div className="space-y-3">
                     <textarea 
                       value={bioInput} 
                       onChange={(e) => setBioInput(e.target.value)}
                       maxLength={160}
                       className="w-full bg-[#050508] border border-primary/30 rounded p-3 text-[13px] font-mono text-text-primary focus:outline-none focus:border-primary resize-none"
                       rows={4}
                     />
                     <div className="flex justify-end gap-2">
                        <button onClick={() => setIsEditingBio(false)} className="text-[10px] font-mono tracking-widest text-text-muted hover:text-white px-3 py-1 uppercase">Cancel</button>
                        <button onClick={saveBio} disabled={saving} className="text-[10px] font-mono tracking-widest text-bg-primary bg-primary border border-primary px-3 py-1 rounded hover:bg-white transition-colors uppercase">Save</button>
                     </div>
                  </div>
               ) : (
                  <p className="font-mono text-[13px] text-text-secondary leading-relaxed min-h-[60px]">
                     {userData.bio || "No memory sequence recorded. Awaiting instructions."}
                  </p>
               )}
            </div>

            <div className="bg-bg-card border border-border p-6 rounded-2xl">
               <h3 className="font-mono text-[11px] font-bold tracking-widest text-text-muted uppercase mb-4">Core Telemetry</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#1a2236]">
                     <span className="font-mono text-xs text-text-secondary uppercase tracking-widest flex items-center gap-2"><Zap size={14} className="text-primary"/> XP</span>
                     <span className="font-display font-bold text-primary">{userData.totalXP}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#1a2236]">
                     <span className="font-mono text-xs text-text-secondary uppercase tracking-widest flex items-center gap-2"><Award size={14} className="text-gold"/> Level</span>
                     <span className="font-display font-bold text-gold">{userData.level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="font-mono text-xs text-text-secondary uppercase tracking-widest flex items-center gap-2"><Code size={14} className="text-cyan"/> Arsenal</span>
                     <span className="font-display font-bold text-cyan">{userData.completedLanguages?.length || 0}</span>
                  </div>
               </div>
            </div>
         </div>

         {/* RIGHT COL */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-bg-card border border-border p-8 rounded-2xl">
               <h3 className="font-display font-bold text-xl text-text-primary uppercase tracking-widest mb-6">PROGRESSION MATRIX</h3>
               <XPBar currentXP={userData.totalXP} level={userData.level} />
            </div>

            <div className="bg-bg-card border border-border p-8 rounded-2xl">
               <h3 className="font-display font-bold text-xl text-text-primary uppercase tracking-widest mb-6 border-b border-border pb-4">ACHIEVEMENTS & CERTIFICATES</h3>
               
               {(!userData.certificates || userData.certificates.length === 0) ? (
                  <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-[#1a2236] rounded-xl text-center">
                     <Award size={32} className="text-border mb-3" />
                     <p className="font-mono text-[11px] text-text-muted uppercase tracking-widest">No certifications acquired yet.</p>
                  </div>
               ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {/* Rendering logic goes here for true certs */}
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Profile;