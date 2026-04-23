import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { db } from '../../firebase/firebase';
import { collection, query, getDocs, addDoc, orderBy, limit, deleteDoc, doc } from 'firebase/firestore';
import { Bell, Megaphone, Plus, Trash2, Send, Clock, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminAnnouncements = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newMsg, setNewMsg] = useState({ title: '', body: '', type: 'all' });

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"), limit(10));
      const snapshot = await getDocs(q);
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => fetchAnnouncements());
  }, [fetchAnnouncements]);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "announcements"), {
        ...newMsg,
        createdAt: new Date(),
        author: 'SYSTEM OPERATOR'
      });
      toast.success("Broadcast Dispatched!");
      setNewMsg({ title: '', body: '', type: 'all' });
      setIsAdding(false);
      fetchAnnouncements();
    } catch (error) {
      console.error(error);
      toast.error("Signal Broadcast Failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in-up space-y-8">
      <Helmet><title>System Broadcasts — ELITE HACKERS</title></Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-border">
          <div>
              <h1 className="font-display font-bold text-3xl text-primary tracking-widest uppercase mb-1">SYSTEM BROADCASTS</h1>
              <p className="font-mono text-[10px] text-muted tracking-[4px] uppercase font-bold">Deploying global network signals</p>
          </div>
          <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-3 px-8 h-12 bg-blue-600 text-white font-display font-bold text-xs tracking-widest rounded-lg hover:bg-blue-500 transition-all shadow-lg uppercase"
          >
              <Megaphone size={18} /> [ NEW BROADCAST ]
          </button>
      </div>

      {isAdding && (
          <div className="bg-bg-card border border-blue-500/30 p-8 rounded-2xl animate-fade-in-up">
              <h3 className="font-display font-bold text-lg text-primary uppercase tracking-widest mb-6">Dispatch Global Signal</h3>
              <form onSubmit={handlePost} className="space-y-6">
                  <div className="space-y-2">
                      <label className="font-mono text-[10px] text-muted uppercase font-bold tracking-widest">Signal Header</label>
                      <input 
                          type="text" 
                          required
                          value={newMsg.title}
                          onChange={e => setNewMsg({...newMsg, title: e.target.value})}
                          className="w-full bg-bg-primary border border-border rounded-lg p-4 font-mono text-sm text-primary focus:border-blue-500 outline-none" 
                          placeholder="Broadcast title..."
                      />
                  </div>
                  <div className="space-y-2">
                      <label className="font-mono text-[10px] text-muted uppercase font-bold tracking-widest">Content Payload</label>
                      <textarea 
                          required
                          value={newMsg.body}
                          onChange={e => setNewMsg({...newMsg, body: e.target.value})}
                          className="w-full bg-bg-primary border border-border rounded-lg p-4 font-mono text-sm text-primary focus:border-blue-500 outline-none h-32" 
                          placeholder="Your global message..."
                      />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                      <button type="button" onClick={() => setIsAdding(false)} className="px-8 h-12 border border-border text-muted rounded-lg font-display font-bold text-xs tracking-widest uppercase">Abort</button>
                      <button type="submit" className="px-10 h-12 bg-blue-600 text-white font-display font-bold text-xs tracking-widest rounded-lg uppercase flex items-center gap-2">
                          <Send size={16} /> [ TRANSMIT ]
                      </button>
                  </div>
              </form>
          </div>
      )}

      <div className="space-y-4">
        {loading ? (
             [1,2].map(i => <div key={i} className="h-32 bg-bg-card border border-border rounded-2xl animate-pulse"></div>)
        ) : messages.length === 0 ? (
          <div className="bg-[#0b0404] border border-dashed border-border p-20 text-center">
             <ShieldAlert size={48} className="text-muted mx-auto mb-4 opacity-20" />
             <p className="font-mono text-xs text-muted uppercase tracking-widest">No active signals in the mesh.</p>
          </div>
        ) : messages.map((msg) => (
           <div key={msg.id} className="bg-bg-card border border-border p-6 rounded-2xl flex flex-col md:flex-row gap-6 hover:border-blue-500/30 transition-all group relative overflow-hidden">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
                  <Bell size={24} />
              </div>
              <div className="flex-1">
                 <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-bold text-lg text-primary uppercase tracking-wide">{msg.title}</h3>
                    <span className="font-mono text-[9px] text-muted border border-border px-2 py-0.5 rounded uppercase">ALL NODES</span>
                 </div>
                 <p className="font-body text-sm text-secondary leading-relaxed max-w-4xl">{msg.body}</p>
                 <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center gap-2 text-muted font-mono text-[9px] uppercase tracking-widest">
                       <Clock size={12} /> {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : 'Just now'}
                    </div>
                    <div className="flex items-center gap-2 text-muted font-mono text-[9px] uppercase tracking-widest ml-auto">
                       BY: {msg.author}
                    </div>
                 </div>
              </div>
              <div className="flex items-start">
                 <button 
                  onClick={async () => {
                    await deleteDoc(doc(db, "announcements", msg.id));
                    fetchAnnouncements();
                    toast.success("Signal Purged");
                  }}
                  className="p-3 text-muted hover:text-red transition-all border border-transparent hover:border-red/20 rounded-lg"
                 >
                    <Trash2 size={18} />
                 </button>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnnouncements;