import React, { useMemo } from 'react';
import { format, subDays, startOfWeek, addDays, isSameDay } from 'date-fns';

export const StreakCalendar = ({ xpHistory = [] }) => {
  const weeks = 12;
  const daysInWeek = 7;
  const today = new Date();
  
  // Create a map of date string "YYYY-MM-DD" to XP earned
  const xpMap = useMemo(() => {
    const map = {};
    xpHistory.forEach(record => {
      if(record.timestamp) {
        const dateStr = format(record.timestamp.toDate ? record.timestamp.toDate() : new Date(record.timestamp), 'yyyy-MM-dd');
        map[dateStr] = (map[dateStr] || 0) + record.amount;
      }
    });
    return map;
  }, [xpHistory]);

  const getColor = (xp) => {
    if (xp === 0) return '#0d1117';
    if (xp <= 100) return '#003d20';
    if (xp <= 500) return '#00802b';
    if (xp <= 1000) return '#00cc45';
    return '#00ff88'; // 1000+
  };

  const getBorderColor = (xp) => {
    if (xp === 0) return '#1a2236';
    return 'transparent';
  };

  const calendarData = useMemo(() => {
    const data = [];
    const endDate = today;
    const startDate = subDays(endDate, (weeks * daysInWeek) - 1);
    const startOfFirstWeek = startOfWeek(startDate, { weekStartsOn: 1 }); // Monday start

    for (let i = 0; i < weeks; i++) {
      const week = [];
      for (let j = 0; j < daysInWeek; j++) {
        const currentDate = addDays(startOfFirstWeek, (i * daysInWeek) + j);
        if (currentDate <= today) {
          const dateStr = format(currentDate, 'yyyy-MM-dd');
          const xp = xpMap[dateStr] || 0;
          week.push({ date: currentDate, dateStr, xp });
        } else {
          week.push(null);
        }
      }
      data.push(week);
    }
    return data;
  }, [xpMap]);

  return (
    <div className="w-full bg-bg-card border border-border rounded-2xl p-6 overflow-hidden">
      <div className="flex items-center gap-4 text-text-primary mb-6 font-display">
        <h3 className="font-bold text-lg tracking-widest uppercase">YOUR STREAK</h3>
        <span className="text-primary glow-green font-bold text-sm border-l border-border pl-4">🔥 Current Streak: 0 days</span>
      </div>
      
      <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-2">
        {calendarData.map((week, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-1.5">
            {week.map((day, dIdx) => {
              if (!day) return <div key={dIdx} className="w-[14px] h-[14px] rounded-sm bg-transparent"></div>;
              return (
                <div 
                  key={day.dateStr} 
                  className="w-[14px] h-[14px] rounded-[3px] transition-transform hover:scale-125 cursor-pointer relative group"
                  style={{ backgroundColor: getColor(day.xp), border: `1px solid ${getBorderColor(day.xp)}` }}
                >
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-bg-elevated border border-border text-white text-[10px] px-2 py-1 rounded shadow-xl -top-8 -left-1/2 transform -translate-x-1/2 whitespace-nowrap z-50 pointer-events-none font-mono">
                    <span className="text-text-muted">{format(day.date, 'MMM d')}</span><br/>
                    <span className="font-bold text-primary">+{day.xp} XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-end gap-2 mt-4 text-[10px] font-mono text-text-muted">
        <span>Less</span>
        <div className="w-3 h-3 rounded-[2px] bg-[#0d1117] border border-[#1a2236]"></div>
        <div className="w-3 h-3 rounded-[2px] bg-[#003d20]"></div>
        <div className="w-3 h-3 rounded-[2px] bg-[#00802b]"></div>
        <div className="w-3 h-3 rounded-[2px] bg-[#00cc45]"></div>
        <div className="w-3 h-3 rounded-[2px] bg-[#00ff88]"></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default StreakCalendar;
