import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { MessageSquare, Shield, ArrowLeft, Terminal } from 'lucide-react';

const PostDetail = () => {
  const { postId } = useParams();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Helmet><title>Thread Analysis — Elite Hackers</title></Helmet>
      
      <Link to="/community" className="inline-flex items-center gap-2 text-muted font-mono text-[10px] font-bold tracking-widest uppercase hover:text-primary mb-10 transition-colors">
        <ArrowLeft size={14} /> [ RETURN TO MESH ]
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="bg-bg-card border border-border p-10 rounded-3xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-5">
              <MessageSquare size={100} />
           </div>
           
           <div className="flex items-center gap-3 text-cyan font-mono text-[10px] font-bold tracking-widest uppercase mb-4">
              <Terminal size={14} /> PACKET ID: {postId?.toUpperCase()}
           </div>
           
           <h1 className="font-display font-bold text-3xl text-primary uppercase tracking-widest mb-6">DECRYPTING THREAD...</h1>
           
           <div className="space-y-6">
              <div className="h-4 bg-border/20 rounded-full w-3/4 animate-pulse"></div>
              <div className="h-4 bg-border/20 rounded-full w-full animate-pulse"></div>
              <div className="h-4 bg-border/20 rounded-full w-2/3 animate-pulse"></div>
           </div>

           <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-4">
              <Shield size={24} className="text-primary" />
              <div className="font-mono text-[10px] text-primary font-bold uppercase tracking-widest">
                 CONTENT VERIFICATION IN PROGRESS. PLEASE WAIT FOR SYNC.
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PostDetail;