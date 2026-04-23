import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { db } from '../../firebase/firebase';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { Award, Search, ShieldCheck, User, Calendar } from 'lucide-react';

const AdminCertificates = () => {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchCerts = useCallback(async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "certificates"), orderBy("issuedAt", "desc"), limit(100));
            const snapshot = await getDocs(q);
            setCerts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        Promise.resolve().then(() => fetchCerts());
    }, [fetchCerts]);

    const filteredCerts = certs.filter(c => 
        c.username?.toLowerCase().includes(search.toLowerCase()) || 
        c.id?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto animate-fade-in-up space-y-8">
            <Helmet><title>Certification Ledger — ELITE HACKERS</title></Helmet>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-border">
                <div>
                    <h1 className="font-display font-bold text-3xl text-text-primary tracking-widest uppercase mb-1">CERTIFICATION LEDGER</h1>
                    <p className="font-mono text-[10px] text-text-muted tracking-[4px] uppercase font-bold">Validating credential authenticity over the mesh</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                        type="text" 
                        placeholder="SEARCH CREDENTIALS..." 
                        className="w-full bg-bg-card border border-border rounded-xl py-3 pl-12 pr-4 font-mono text-xs focus:border-primary outline-none transition-all uppercase"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#0b0404] border-b border-border text-left">
                            <th className="px-6 py-4 font-display font-bold text-[10px] text-text-muted tracking-widest uppercase">Registry ID</th>
                            <th className="px-6 py-4 font-display font-bold text-[10px] text-text-muted tracking-widest uppercase">Operative</th>
                            <th className="px-6 py-4 font-display font-bold text-[10px] text-text-muted tracking-widest uppercase">Domain</th>
                            <th className="px-6 py-4 font-display font-bold text-[10px] text-text-muted tracking-widest uppercase">Timestamp</th>
                            <th className="px-6 py-4 font-display font-bold text-[10px] text-text-muted tracking-widest uppercase text-right">Verification</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {loading ? (
                            [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan="5" className="h-16 bg-bg-primary/20"></td></tr>)
                        ) : filteredCerts.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-20 text-center font-mono text-xs text-text-muted uppercase tracking-widest">No certifications found in the primary registry.</td>
                            </tr>
                        ) : filteredCerts.map((cert) => (
                            <tr key={cert.id} className="hover:bg-bg-primary/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[10px] text-text-muted uppercase font-bold">{cert.id.slice(0, 12)}...</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-bg-primary border border-border flex items-center justify-center text-text-muted">
                                            <User size={14} />
                                        </div>
                                        <span className="font-display font-bold text-sm text-text-primary uppercase tracking-wide">{cert.username}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Award size={16} className="text-primary" />
                                        <span className="font-mono text-[10px] text-text-primary font-bold uppercase">{cert.title} Specialist</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-text-muted font-mono text-[10px]">
                                        <Calendar size={12} />
                                        {cert.issuedAt?.toDate ? cert.issuedAt.toDate().toLocaleDateString() : 'N/A'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/10 border border-primary/20 text-primary rounded font-mono text-[9px] font-bold uppercase tracking-widest">
                                        <ShieldCheck size={12} /> SECURED
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCertificates;