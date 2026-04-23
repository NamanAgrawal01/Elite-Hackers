import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { MatrixRain } from '../components/ui/MatrixRain';
import { AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError('USER NOT FOUND IN SECURE DATABASE');
      } else {
        setError('TRANSMISSION FAILED');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen py-10 flex items-center justify-center bg-bg-primary overflow-x-hidden w-full font-mono">
      <Helmet>
        <title>Reset Passphrase — ELITE HACKERS</title>
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

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="text-center mb-6">
                  <span className="text-[12px] tracking-[6px] text-text-muted uppercase cursor-default">RESET PASSPHRASE</span>
                </div>

                <form onSubmit={handleReset} className="space-y-4">
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
                      className="w-full bg-[#0a0d14cd] border border-border rounded-[10px] text-primary font-mono text-[14px] py-[14px] pr-4 pl-[80px] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,255,136,0.1),_0_0_20px_rgba(0,255,136,0.1)] transition-all"
                    />
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-red/10 border border-red text-red text-[12px] p-3 rounded-[8px] flex items-center gap-2 font-bold overflow-hidden"
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
                        TRANSMITTING...
                      </div>
                    ) : '[ TRANSMIT RESET LINK ]'}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-primary/10 border border-primary text-primary p-6 rounded-[12px] text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">✓ RESET LINK TRANSMITTED</h3>
                <p className="text-sm text-primary/80 font-mono">
                  Check your email. Link expires in 1 hour.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center">
            <Link to="/login" className="text-[12px] text-text-secondary hover:text-primary transition-colors inline-flex items-center gap-2 group">
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> 
              RETURN TO LOGIN
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;