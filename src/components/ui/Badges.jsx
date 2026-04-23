import { getXPForLevel } from '../../utils/progression';

export const RankBadge = ({ rank = "Script Kiddie" }) => {
  let colorClass = "bg-border text-secondary";
  
  if (rank.includes("Monkey") || rank.includes("Junior")) colorClass = "bg-primary/20 text-primary border-primary/30";
  else if (rank.includes("Senior") || rank.includes("Ninja")) colorClass = "bg-cyan/20 text-cyan border-cyan/30";
  else if (rank.includes("Sentinel") || rank.includes("God")) colorClass = "bg-gold/20 text-gold border-gold/30 gold-shimmer";

  return (
    <span className={`inline-block px-2 py-0.5 rounded-[4px] border text-[9px] font-bold font-mono tracking-wider uppercase ${colorClass}`}>
      {rank}
    </span>
  );
};

export const PlanBadge = ({ plan = "free" }) => {
  if (plan === 'free') return <span className="text-[9px] text-muted font-bold tracking-widest bg-border/50 px-1.5 py-0.5 rounded uppercase">FREE</span>;
  if (plan === 'pro') return <span className="text-[9px] text-[#050508] bg-cyan border border-cyan glow-cyan font-bold tracking-widest px-1.5 py-0.5 rounded uppercase">PRO</span>;
  if (plan === 'elite') return <span className="text-[9px] text-[#050508] border border-gold gold-shimmer font-bold tracking-widest px-1.5 py-0.5 rounded uppercase">ELITE ⚡</span>;
  return null;
};

export const XPBar = ({ currentXP = 0, level = 1 }) => {
  const currentLevelBaseXP = getXPForLevel(level);
  const nextLevelBaseXP = getXPForLevel(level + 1);
  
  const xpInCurrentLevel = currentXP - currentLevelBaseXP;
  const xpNeededForNext = nextLevelBaseXP - currentLevelBaseXP;
  const progressPercent = Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForNext) * 100));


  return (
    <div className="w-full mt-3">
      <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-wider mb-1 px-0.5">
        <span className="text-primary">Lv.{level}</span>
        <span className="text-muted">+{Math.ceil(xpNeededForNext - xpInCurrentLevel)} XP TO LV.{level + 1}</span>
      </div>
      <div className="h-[6px] w-full bg-[#0d1117] border border-[#1a2236] rounded-full overflow-hidden flex">
        <div 
          className="h-full bg-gradient-to-r from-[#00ff8840] to-primary transition-all duration-1000 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
};
