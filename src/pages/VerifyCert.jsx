import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ShieldCheck, ShieldAlert, Award, User, Calendar, ExternalLink, QrCode } from 'lucide-react';
import { MatrixRain } from '../components/ui/MatrixRain';
import { format } from 'date-fns';

const VerifyCert = () => {
    const { certId } = useParams();
    const [certData, setCertData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCert = async () => {
            setLoading(true);
            try {
                // In a real system, certifications should be in a separate collection for public verification
                const certRef = doc(db, "certificates", certId);
                const snapshot = await getDoc(certRef);
                
                if (snapshot.exists()) {
                    setCertData(snapshot.data());
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchCert();
    }, [certId]);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#050508] p-6 overflow-hidden">
            <Helmet><title>Verify Certificate — ELITE HACKERS</title></Helmet>
            <MatrixRain />

            <div className="relative z-10 w-full max-w-2xl bg-[#0d1117]/80 backdrop-blur-xl border border-border rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,255,136,0.1)]">
                <div className="h-2 bg-gradient-to-r from-primary via-cyan to-purple w-full"></div>
                
                <div className="p-10 md:p-16">
                    {loading ? (
                        <div className="flex flex-col items-center gap-6 py-10">
                            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <span className="font-mono text-xs text-primary tracking-[4px] uppercase animate-pulse">Scanning Blockchain...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 bg-red/10 rounded-full flex items-center justify-center mx-auto text-red border border-red/20 shadow-[0_0_30px_rgba(255,0,0,0.2)]">
                                <ShieldAlert size={40} />
                            </div>
                            <div>
                                <h1 className="font-display font-bold text-3xl text-text-primary uppercase tracking-widest mb-4">VERIFICATION FAILED</h1>
                                <p className="font-mono text-sm text-text-muted leading-relaxed uppercase tracking-widest">
                                    The provided certification ID is invalid or has been revoked from the ELITE HACKERS registry.
                                </p>
                            </div>
                            <Link to="/" className="inline-block px-10 py-4 bg-bg-card border border-border text-text-muted rounded-xl hover:text-primary hover:border-primary transition-all font-mono text-xs uppercase tracking-[3px]">
                                [ RETURN TO BASE ]
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            <div className="text-center space-y-4">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary border border-primary/20 shadow-[0_0_30px_rgba(0,255,136,0.2)] mb-6">
                                    <ShieldCheck size={40} />
                                </div>
                                <h1 className="font-display font-bold text-3xl text-text-primary uppercase tracking-widest">CERTIFICATE VERIFIED</h1>
                                <p className="font-mono text-[10px] text-primary tracking-[6px] uppercase font-bold">Authenticated Terminal Record</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-border">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <User size={18} className="text-text-muted" />
                                        <div>
                                            <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest font-bold">Recipient</div>
                                            <div className="text-text-primary font-display font-bold text-lg uppercase">{certData.username}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Award size={18} className="text-primary" />
                                        <div>
                                            <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest font-bold">Credential</div>
                                            <div className="text-text-primary font-display font-bold text-lg uppercase">{certData.title} Master</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Calendar size={18} className="text-cyan" />
                                        <div>
                                            <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest font-bold">Issued At</div>
                                            <div className="text-text-primary font-display font-bold text-lg uppercase">{format(certData.issuedAt?.toDate ? certData.issuedAt.toDate() : new Date(), 'dd MMM yyyy')}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <QrCode size={18} className="text-purple" />
                                        <div>
                                            <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest font-bold">Registry ID</div>
                                            <div className="text-text-primary font-mono text-[11px] font-bold uppercase truncate max-w-[150px]">{certId}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button className="w-full py-4 bg-primary text-bg-primary font-display font-bold text-xs tracking-[4px] rounded-xl hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-3 uppercase">
                                    <ExternalLink size={18} /> [ VIEW FULL CREDENTIAL ]
                                </button>
                                <Link to="/dashboard" className="text-center font-mono text-[10px] text-text-muted hover:text-primary transition-colors uppercase tracking-widest">
                                    Enter Platform Node
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Branding Footer */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-opacity flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="h-6 w-auto grayscale" />
                <span className="font-display font-bold text-[10px] text-text-primary tracking-[8px] uppercase">ELITE HACKERS</span>
            </div>
        </div>
    );
};

export default VerifyCert;