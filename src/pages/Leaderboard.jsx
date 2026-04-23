import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Trophy, Medal, Zap } from 'lucide-react';
import { RankBadge } from '../components/ui/Badges';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const q = query(collection(db, "users"), orderBy("totalXP", "desc"), limit(100));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLeaders(data);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <Helmet><title>Hall of Fame — Elite Hackers</title></Helmet>

      <div className="text-center mb-12">
         <h1 className="font-display font-bold text-4xl text-primary tracking-widest uppercase mb-4 flex justify-center items-center gap-4">
            <Trophy className="text-gold" size={32} /> HALL OF FAME
         </h1>
         <p className="font-mono text-sm text-muted tracking-widest uppercase">The global ranking of Elite Hackers. Only the persistent survive.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
           <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* TOP 3 PODIUM */}
          <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-12">
             {/* 2nd Place */}
             {leaders[1] && (
               <div className="w-full md:w-64 bg-bg-card border border-[#c0c0c0]/30 rounded-t-2xl p-6 flex flex-col items-center relative order-2 md:order-1 h-[250px] justify-end">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#c0c0c0]/5 to-transparent pointer-events-none rounded-t-2xl"></div>
                  <div className="relative mb-4">
                     <img src={leaders[1].photoURL} alt="2nd" className="w-20 h-20 rounded-full border-4 border-[#c0c0c0] bg-[var(--bg-primary)] object-cover" />
                     <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#c0c0c0] text-[var(--bg-primary)] text-[10px] font-bold font-mono px-2 py-0.5 rounded">2ND</div>
                  </div>
                  <h3 className="font-display font-bold text-lg text-primary tracking-wider truncate w-full text-center">{leaders[1].username}</h3>
                  <div className="text-[#c0c0c0] font-mono text-sm font-bold tracking-widest flex items-center gap-1 mt-2"><Zap size={14} />{leaders[1].totalXP}</div>
               </div>
             )}

             {/* 1st Place */}
             {leaders[0] && (
               <div className="w-full md:w-72 bg-[#0a0d14] border border-gold rounded-t-2xl p-8 flex flex-col items-center relative order-1 md:order-2 h-[300px] justify-end shadow-[0_0_50px_rgba(255,215,0,0.1)] z-10 glow-gold">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-gold/10 to-transparent pointer-events-none rounded-t-2xl"></div>
                  <div className="relative mb-4">
                     <img src={leaders[0].photoURL} alt="1st" className="w-28 h-28 rounded-full border-4 border-gold bg-[var(--bg-primary)] object-cover" />
                     <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold text-[var(--bg-primary)] text-[12px] font-bold font-mono px-3 py-1 rounded shadow-lg">1ST</div>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-gold tracking-wider truncate w-full text-center">{leaders[0].username}</h3>
                  <div className="text-primary font-mono text-base font-bold tracking-widest flex items-center gap-1 mt-2"><Zap size={16} className="animate-pulse" />{leaders[0].totalXP}</div>
               </div>
             )}

             {/* 3rd Place */}
             {leaders[2] && (
               <div className="w-full md:w-64 bg-bg-card border border-[#cd7f32]/50 rounded-t-2xl p-6 flex flex-col items-center relative order-3 h-[220px] justify-end">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#cd7f32]/10 to-transparent pointer-events-none rounded-t-2xl"></div>
                  <div className="relative mb-4">
                     <img src={leaders[2].photoURL} alt="3rd" className="w-16 h-16 rounded-full border-4 border-[#cd7f32] bg-[var(--bg-primary)] object-cover" />
                     <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#cd7f32] text-[var(--bg-primary)] text-[10px] font-bold font-mono px-2 py-0.5 rounded">3RD</div>
                  </div>
                  <h3 className="font-display font-bold text-lg text-primary tracking-wider truncate w-full text-center">{leaders[2].username}</h3>
                  <div className="text-[#cd7f32] font-mono text-sm font-bold tracking-widest flex items-center gap-1 mt-2"><Zap size={14} />{leaders[2].totalXP}</div>
               </div>
             )}
          </div>

          {/* LIST RANKINGS (4th - 100th) */}
          <div className="bg-[#0b0404] border border-[var(--border)] rounded-2xl overflow-hidden">
             {leaders.slice(3).map((user, idx) => (
               <div key={user.id} className="flex items-center gap-6 p-4 border-b border-[var(--border)] last:border-0 hover:bg-[#111827] transition-colors">
                  <div className="w-12 text-center font-mono text-sm text-muted font-bold">#{idx + 4}</div>
                  <img src={user.photoURL} alt={user.username} className="w-10 h-10 rounded-full border border-border bg-[var(--bg-primary)] object-cover" />
                  <div className="flex-1">
                     <h4 className="font-display font-bold text-sm text-primary tracking-wider truncate">{user.username}</h4>
                     <RankBadge rank={user.rank} />
                  </div>
                  <div className="font-mono text-sm font-bold text-primary tracking-widest bg-primary/10 border border-primary/20 px-3 py-1.5 rounded flex items-center gap-1">
                     <Zap size={14} /> {user.totalXP}
                  </div>
               </div>
             ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;