import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import LoadingScreen from '../components/ui/LoadingScreen';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUser = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      // Clear previous user data listener if user changes or signs out
      if (unsubscribeUser) {
        unsubscribeUser();
        unsubscribeUser = null;
      }

      setCurrentUser(user);
      
      if (user) {
        unsubscribeUser = onSnapshot(doc(db, "users", user.uid), async (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            
            // Auto-expiry check safely
            try {
              if (data.plan !== 'free' && data.planExpiry && typeof data.planExpiry.toMillis === 'function') {
                if (data.planExpiry.toMillis() < Date.now()) {
                  await updateDoc(doc(db, "users", user.uid), {
                    plan: 'free',
                    role: 'user',
                    isAdmin: false,
                    isSubscriptionActive: false,
                    pendingPlan: null
                  });
                }
              }
            } catch (e) { 
              console.warn("Expiry check bypassed", e); 
            }

            const OWNER_EMAIL = "namanagrawal267@gmail.com";
            setUserData({ 
              id: docSnapshot.id, 
              ...data,
              isOwner: (data.role === 'owner' || user.email === OWNER_EMAIL),
              isStaff: (data.role === 'admin' || data.role === 'owner' || user.email === OWNER_EMAIL)
            });
          } else {
            setUserData(null);
          }
          setLoading(false);
        }, (error) => {
          console.error("AuthContext user data fetch error:", error);
          setLoading(false);
        });
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUser) unsubscribeUser();
    };
  }, []);

  const value = {
    currentUser,
    userData,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;