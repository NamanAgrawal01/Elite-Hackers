import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useAuth } from '../hooks/useAuth';
import { MatrixRain } from '../components/ui/MatrixRain';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  if (currentUser) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Access Granted');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        setError('INVALID CREDENTIALS — ACCESS DENIED');
      } else if (err.code === 'auth/too-many-requests') {
        setError('TOO MANY REQUESTS — STAND DOWN');
      } else {
        setError('CONNECTION FAILED — ' + err.message.toUpperCase());
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Access Granted');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('OAUTH FAILED — ACCESS DENIED');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg-primary overflow-hidden w-full font-mono">
      <Helmet>
        <title>Terminal Access — ELITE HACKERS</title>
      </Helmet>

      <MatrixRain />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[460px] mx-4"
      >
        <div className="bg-[var(--bg-card)eb] border border-primary/20 rounded-[20px] p-10 md:p-12 shadow-[0_0_80px_rgba(0,255,136,0.08),_0_0_160px_rgba(0,255,136,0.04),_inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
          
          <div className="text-center mb-8">
            <h1 className="font-display text-[28px] font-bold text-primary neon-text-green glitch cursor-default inline-block">ELITE HACKERS</h1>
            <p className="text-[11px] tracking-[4px] text-muted mt-2 font-mono">HACK. LEARN. DOMINATE.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="text-center mb-6">
              <span className="text-[12px] tracking-[6px] text-muted uppercase cursor-default block">ACCESS TERMINAL</span>
            </div>

            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-primary font-bold z-10 select-none cursor-text pointer-events-none">
                {'>'} EMAIL:
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="root@system"
                className="w-full bg-[#0a0d14cd] border border-border rounded-[10px] text-primary font-mono text-[14px] py-[14px] pr-4 pl-[80px] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,255,136,0.1),_0_0_20px_rgba(0,255,136,0.1)] transition-all placeholder:text-muted/50"
              />
            </div>

            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-primary font-bold z-10 select-none cursor-text pointer-events-none">
                {'>'} PASS:
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#0a0d14cd] border border-border rounded-[10px] text-primary font-mono text-[14px] py-[14px] pr-12 pl-[74px] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,255,136,0.1),_0_0_20px_rgba(0,255,136,0.1)] transition-all placeholder:text-muted/50 tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex justify-between items-center text-[11px]">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 border border-border rounded group-hover:border-primary transition-colors flex items-center justify-center bg-[#0a0d14cd]">
                  <input type="checkbox" className="hidden appearance-none" />
                  <svg className="w-3 h-3 text-primary opacity-0 checkmark transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-secondary group-hover:text-primary transition-colors">REMEMBER TERMINAL</span>
                <style>{`input:checked + .checkmark { opacity: 1; }`}</style>
              </label>
              
              <Link to="/forgot-password" className="text-primary hover:underline hover:text-cyan transition-colors">
                {'>'} FORGOT PASSPHRASE?
              </Link>
            </div>

            {error && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="bg-red/10 border border-red text-red text-[12px] p-3 rounded-[8px] flex items-center gap-2 font-bold"
              >
                <AlertTriangle size={14} />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] bg-gradient-to-br from-primary to-cyan text-bg-primary font-display font-[800] text-[13px] tracking-[2px] rounded-[10px] hover:scale-[1.02] hover:brightness-110 hover:shadow-[0_8px_30px_rgba(0,255,136,0.4)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center uppercase"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></div>
                  AUTHENTICATING...
                </div>
              ) : '[ ENTER ELITE HACKERS ]'}
            </button>
          </form>

          <div className="my-6 relative flex items-center justify-center">
            <div className="absolute w-full h-[1px] bg-border"></div>
            <div className="relative bg-bg-card px-4 text-[11px] text-muted font-mono tracking-widest bg-[var(--bg-card)eb]">
              ── OR ──
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-[48px] bg-[var(--bg-card)] border border-border rounded-[10px] hover:border-cyan hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all flex items-center justify-center gap-3 text-[13px] text-primary disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              <path fill="none" d="M1 1h22v22H1z"/>
            </svg>
            [ CONTINUE WITH GOOGLE ]
          </button>

          <div className="mt-8 text-center">
            <Link to="/signup" className="text-[12px] text-secondary hover:underline group inline-flex items-center gap-1 transition-all">
              {'>'} NEW RECRUIT? <span className="text-primary ml-1 group-hover:text-cyan transition-colors">[ CREATE IDENTITY ]</span>
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;