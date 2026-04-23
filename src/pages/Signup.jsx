import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { MatrixRain } from '../components/ui/MatrixRain';
import { Eye, EyeOff, AlertTriangle, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('united-states');
  const [referral, setReferral] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  
  const navigate = useNavigate();

  // Validate Username uniquely
  useEffect(() => {
    if (username.length < 3) {
      Promise.resolve().then(() => setUsernameAvailable(null));
      return;
    }
    const checkUsername = async () => {
      setCheckingUsername(true);
      try {
        const q = query(collection(db, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        setUsernameAvailable(querySnapshot.empty);
      } catch (err) {
        console.error("Username check failed", err);
      } finally {
        setCheckingUsername(false);
      }
    };
    const timer = setTimeout(checkUsername, 500);
    return () => clearTimeout(timer);
  }, [username]);

  // Password strength meter
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length > 5) strength += 1;
    if (pass.length > 8) strength += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) strength += 1;
    return strength; // 0,1,2,3,4
  };
  const passStrength = getStrength(password);
  const strengthColors = ['bg-red', 'bg-orange', 'bg-yellow', 'bg-primary'];
  const strengthLabels = ['WEAK', 'FAIR', 'STRONG', 'UNBREAKABLE'];

  const validateSignup = () => {
    if (username.length < 3 || username.length > 20 || !/^[A-Za-z0-9_]+$/.test(username)) {
      setError("CODENAME MUST BE 3-20 ALPHANUMERIC CHARS"); return false;
    }
    if (usernameAvailable === false) {
      setError("CODENAME ALREADY IN USE"); return false;
    }
    if (password !== confirmPassword) {
      setError("PASSPHRASES DO NOT MATCH"); return false;
    }
    if (passStrength === 0 && password.length > 0) {
      setError("PASSPHRASE TOO WEAK"); return false;
    }
    if (!termsAccepted) {
      setError("YOU MUST ACCEPT THE ELITE HACKERS PROTOCOL"); return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateSignup()) return;
    setLoading(true);

    try {
      // Create auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update Auth Profile
      await updateProfile(user, { displayName: username });

      let rewardXP = 0;
      let refValid = false;

      if (referral.length === 8) {
        rewardXP = 100;
        refValid = true;
      }

      const userDocData = {
        uid: user.uid,
        username: username,
        email: email,
        photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + username,
        level: 1,
        totalXP: rewardXP,
        rank: "Script Kiddie",
        plan: "free",
        planExpiry: null,
        planActivatedAt: null,
        isSubscriptionActive: false,
        isAdmin: false,
        adminRole: null,
        suspended: false,
        completedLanguages: [],
        certificates: [],
        achievements: [],
        joinDate: Timestamp.now(),
        country: country,
        bio: "",
        streak: 0,
        lastActive: Timestamp.now(),
        referredBy: refValid ? referral : null,
        weekXP: rewardXP,
        weekStart: Timestamp.now()
      };

      await setDoc(doc(db, "users", user.uid), userDocData);

      toast.success('IDENTITY INITIALIZED');
      // Adding a small delay to ensure Firestore syncs before navigation
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 500);

    } catch (err) {
      console.error(err);
      setLoading(false);
      if (err.code === 'auth/email-already-in-use') {
        setError("EMAIL ALREADY IN SYSTEM");
      } else if (err.code === 'auth/weak-password') {
        setError("PASSPHRASE TOO WEAK (MIN 6 CHARS)");
      } else {
        setError("CREATION FAILED: " + err.message.toUpperCase());
      }
    }
  };

  return (
    <div className="relative min-h-screen py-10 flex items-center justify-center bg-bg-primary overflow-x-hidden w-full font-mono">
      <Helmet>
        <title>Create Identity — ELITE HACKERS</title>
      </Helmet>

      <MatrixRain />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[460px] mx-4"
      >
        <div className="bg-[#0d1117eb] border border-primary/20 rounded-[20px] p-8 md:p-10 shadow-[0_0_80px_rgba(0,255,136,0.08),_inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
          
          <div className="text-center mb-6">
            <h1 className="font-display text-[24px] font-bold text-primary neon-text-green glitch inline-block">ELITE HACKERS</h1>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="text-center mb-4">
              <span className="text-[12px] tracking-[6px] text-muted uppercase">CREATE IDENTITY</span>
            </div>

            {/* CODENAME */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-primary font-bold z-10 select-none pointer-events-none">
                {'>'} CODENAME:
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                required
                maxLength={20}
                placeholder="neo_01"
                className="w-full bg-[#0a0d14cd] border border-border rounded-[10px] text-primary font-mono text-[14px] py-[14px] pr-12 pl-[100px] focus:outline-none focus:border-primary transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                {checkingUsername ? (
                  <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                ) : usernameAvailable === true ? (
                  <Check size={16} className="text-primary" />
                ) : usernameAvailable === false ? (
                  <X size={16} className="text-red" />
                ) : null}
              </div>
            </div>

            {/* EMAIL */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-primary font-bold z-10 select-none pointer-events-none">
                {'>'} EMAIL:
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="root@system"
                className="w-full bg-[#0a0d14cd] border border-border rounded-[10px] text-primary font-mono text-[14px] py-[14px] pr-4 pl-[80px] focus:outline-none focus:border-primary transition-all"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <div className="relative group mb-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-primary font-bold z-10 select-none pointer-events-none">
                  {'>'} PASSPHRASE:
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#0a0d14cd] border border-border rounded-[10px] text-primary font-mono text-[14px] py-[14px] pr-12 pl-[110px] focus:outline-none focus:border-primary transition-all tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {/* Strength Meter */}
              {password.length > 0 && (
                <div className="flex gap-1 items-center px-1">
                  <div className="flex flex-1 gap-1 h-1.5">
                    {[0, 1, 2, 3].map(i => (
                      <div 
                        key={i} 
                        className={`flex-1 rounded-sm transition-colors duration-300 ${i < passStrength ? strengthColors[passStrength - 1 > 0 ? passStrength - 1 : 0] : 'bg-[#1a2236]'}`} 
                      />
                    ))}
                  </div>
                  <span className={`text-[9px] font-bold tracking-widest ml-2 ${passStrength > 0 ? strengthColors[passStrength - 1 > 0 ? passStrength - 1 : 0].replace('bg-', 'text-') : 'text-red'}`}>
                    {passStrength > 0 ? strengthLabels[passStrength - 1] : 'WEAK'}
                  </span>
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-primary font-bold z-10 select-none pointer-events-none">
                {'>'} CONFIRM PASS:
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#0a0d14cd] border border-border rounded-[10px] text-primary font-mono text-[14px] py-[14px] pr-12 pl-[125px] focus:outline-none focus:border-primary transition-all tracking-widest"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                {confirmPassword.length > 0 && (
                  password === confirmPassword ? <Check size={16} className="text-primary" /> : <X size={16} className="text-red" />
                )}
              </div>
            </div>

            {/* COUNTRY */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-primary font-bold z-10 select-none pointer-events-none">
                {'>'} COUNTRY:
              </span>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-[#0a0d14cd] border border-border rounded-[10px] text-primary font-mono text-[14px] py-[14px] pr-4 pl-[90px] focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
              >
                <option value="united-states">🇺🇸 United States</option>
                <option value="india">🇮🇳 India</option>
                <option value="united-kingdom">🇬🇧 United Kingdom</option>
                <option value="canada">🇨🇦 Canada</option>
                <option value="australia">🇦🇺 Australia</option>
                <option value="germany">🇩🇪 Germany</option>
                <option value="unknown">🌐 Other</option>
              </select>
            </div>

            {/* REFERRAL */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-muted font-bold z-10 select-none pointer-events-none">
                {'>'} REFERRAL CODE:
              </span>
              <input
                type="text"
                value={referral}
                onChange={(e) => setReferral(e.target.value.toUpperCase())}
                placeholder="(OPTIONAL)"
                maxLength={8}
                className="w-full bg-[#0a0d14cd] border border-border rounded-[10px] text-primary font-mono text-[14px] py-[14px] pr-4 pl-[135px] focus:outline-none focus:border-primary transition-all"
              />
            </div>

            {/* TERMS CHECKBOX */}
            <label className="flex items-start gap-3 cursor-pointer group mt-4">
              <div className="mt-0.5 w-4 h-4 shrink-0 border border-border rounded group-hover:border-primary transition-colors flex items-center justify-center bg-[#0a0d14cd]">
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="hidden appearance-none" />
                <svg className={`w-3 h-3 text-primary transition-opacity ${termsAccepted ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span className="text-[10px] text-secondary leading-relaxed">
                I accept the Elite Hackers Protocol and confirm I will use this platform for ethical purposes only.
              </span>
            </label>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-red/10 border border-red text-red text-[12px] p-3 rounded-[8px] flex items-center gap-2 font-bold mt-2 overflow-hidden"
                >
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 h-[52px] bg-gradient-to-br from-primary to-cyan text-bg-primary font-display font-[800] text-[13px] tracking-[2px] rounded-[10px] hover:scale-[1.02] hover:brightness-110 hover:shadow-[0_8px_30px_rgba(0,255,136,0.4)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center uppercase"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></div>
                  INITIALIZING...
                </div>
              ) : '[ INITIALIZE IDENTITY ]'}
            </button>
          </form>

          <div className="mt-8 text-center text-[12px] text-secondary">
            ALREADY RECRUITED? <Link to="/login" className="text-primary hover:text-cyan hover:underline ml-1 transition-colors">[ LOGIN TERMINAL ]</Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Signup;