import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase/firebase';
import { doc, updateDoc, collection, addDoc, serverTimestamp, increment } from 'firebase/firestore';
import toast from 'react-hot-toast';

import { getLevelForXP, getRankForLevel } from '../utils/progression';

const XPContext = createContext();

export const XPProvider = ({ children }) => {
  const { currentUser, userData } = useAuth();

  const calculateLevel = getLevelForXP;
  const calculateRank = getRankForLevel;


  const addXP = async (amount, reason) => {
    if (!currentUser || !userData) return;
    
    // Apply Elite multiplier if pro/elite plan is active logic here normally, ignoring for base setup
    const multiplier = (userData.plan === 'elite') ? 2 : 1;
    const finalAmount = amount * multiplier;

    const newTotalXP = userData.totalXP + finalAmount;
    const newLevel = calculateLevel(newTotalXP);
    const newRank = calculateRank(newLevel);
    const leveledUp = newLevel > userData.level;

    try {
      // 1. Update user document
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        totalXP: increment(finalAmount),
        weekXP: increment(finalAmount),
        level: newLevel,
        rank: newRank,
        lastActive: serverTimestamp()
      });

      // 2. Add to XP History subcollection
      const historyRef = collection(db, 'users', currentUser.uid, 'xpHistory');
      await addDoc(historyRef, {
        amount: finalAmount,
        reason: reason,
        timestamp: serverTimestamp()
      });

      // 3. UI Feedback
      toast.success(`+${finalAmount} XP (${reason})`, {
        icon: '⚡',
        style: { border: '1px solid #00ff88', color: '#00ff88' }
      });

      if (leveledUp) {
        toast(`⬆️ LEVEL UP! You are now Level ${newLevel}`, {
          icon: '🏆',
          duration: 5000,
          style: { background: '#ffd700', color: '#050508', border: 'none' }
        });
      }

    } catch (err) {
      console.error("Failed to add XP:", err);
    }
  };

  return (
    <XPContext.Provider value={{ addXP }}>
      {children}
    </XPContext.Provider>
  );
};

export const useXP = () => useContext(XPContext);
export default XPProvider;