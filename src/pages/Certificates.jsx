import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { Award, Download, CheckCircle, ShieldAlert } from 'lucide-react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const Certificates = () => {
  const { userData } = useAuth();
  const [downloading, setDownloading] = useState(null);

  // Mocking certificates if empty for display purposes in the MVP.
  const certs = userData?.certificates?.length > 0 ? userData.certificates : [
    { id: "CERT-0X1A2F9", name: "Python Security Architecture", date: new Date(), level: "Intermediate" }
  ];

  const generatePDF = async (cert) => {
    setDownloading(cert.id);
    try {
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      
      // Black Background
      doc.setFillColor(5, 5, 8);
      doc.rect(0, 0, 297, 210, 'F');
      
      // Cyber Border
      doc.setDrawColor(0, 255, 136);
      doc.setLineWidth(1);
      doc.rect(10, 10, 277, 190);
      doc.setLineWidth(3);
      doc.rect(13, 13, 271, 184);
      
      // Text Configuration
      doc.setTextColor(0, 255, 136);
      doc.setFont("courier", "bold");
      doc.setFontSize(30);
      doc.text("ELITE HACKERS", 148, 40, { align: 'center' });
      
      doc.setTextColor(226, 232, 240);
      doc.setFontSize(16);
      doc.text("CERTIFICATE OF EXPERTISE", 148, 55, { align: 'center' });
      
      doc.setFont("courier", "normal");
      doc.setFontSize(14);
      doc.text("THIS CERTIFIES THAT", 148, 80, { align: 'center' });
      
      doc.setFont("courier", "bold");
      doc.setFontSize(36);
      doc.setTextColor(0, 212, 255);
      doc.text(userData.username.toUpperCase(), 148, 105, { align: 'center' });
      
      doc.setTextColor(226, 232, 240);
      doc.setFont("courier", "normal");
      doc.setFontSize(12);
      doc.text("HAS SUCCESSFULLY COMPLETED THE SECURITY EVALUATION FOR:", 148, 130, { align: 'center' });
      
      doc.setFont("courier", "bold");
      doc.setFontSize(24);
      doc.setTextColor(0, 255, 136);
      doc.text(cert.name.toUpperCase(), 148, 150, { align: 'center' });

      // Generate verification QR code
      const verifyUrl = `https://elitehackers.web.app/verify/${cert.id}`;
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, { color: { dark: '#00ff88', light: '#050508' } });
      
      doc.addImage(qrDataUrl, 'PNG', 240, 150, 35, 35);
      
      doc.setFont("courier", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`CERT ID: ${cert.id}`, 20, 175);
      doc.text(`DATE: ${format(cert.date, 'MMM dd, yyyy')}`, 20, 185);

      doc.save(`${userData.username}_${cert.name.replace(/ /g, '_')}_Cert.pdf`);
      toast.success('Certificate compiled and downloaded.', { icon: '📄' });
    } catch (err) {
      console.error(err);
      toast.error('PDF compilation failed.');
    } finally {
      setDownloading(null);
    }
  };

  if (!userData) return null;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <Helmet><title>Certifications — Elite Hackers</title></Helmet>

      <div className="flex items-center gap-4 mb-8">
         <div className="w-12 h-12 bg-primary/10 rounded-xl border border-primary/30 flex items-center justify-center">
            <Award className="text-primary" size={24} />
         </div>
         <div>
            <h1 className="font-display font-bold text-3xl text-text-primary tracking-widest uppercase">CERTIFICATE AUTHORITY</h1>
            <p className="font-mono text-sm text-text-muted tracking-widest uppercase">View and download your cryptographic proofs of completion.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {certs.map(cert => (
            <div key={cert.id} className="bg-bg-card border border-border p-8 rounded-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors pointer-events-none"></div>
               
               <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold tracking-widest text-[#00d4ff] bg-[#00d4ff]/10 border border-[#00d4ff]/30 px-2 py-1 rounded">
                     <ShieldAlert size={12} /> {cert.level}
                  </div>
                  <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                     {format(cert.date, 'MMM dd, yyyy')}
                  </div>
               </div>

               <h3 className="font-display font-bold text-2xl text-text-primary uppercase tracking-wider mb-2 relative z-10">{cert.name}</h3>
               <p className="font-mono text-xs text-text-secondary tracking-widest mb-8 relative z-10">CERT ID: {cert.id}</p>

               <div className="flex gap-4 relative z-10">
                  <button 
                     onClick={() => generatePDF(cert)}
                     disabled={downloading === cert.id}
                     className="flex-1 flex items-center justify-center gap-2 bg-primary text-[#050508] font-bold font-mono tracking-widest text-[11px] uppercase py-3 rounded hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,255,136,0.2)] disabled:opacity-50"
                  >
                     {downloading === cert.id ? 'COMPILING PDF...' : <><Download size={16} /> DOWNLOAD PDF</>}
                  </button>
                  <button onClick={() => {
                        navigator.clipboard.writeText(`https://elitehackers.web.app/verify/${cert.id}`);
                        toast.success('Verification URL copied');
                     }} 
                     className="px-6 border border-border text-text-muted hover:text-cyan hover:border-cyan rounded font-bold font-mono tracking-widest text-[11px] uppercase transition-colors flex items-center gap-2"
                  >
                     <CheckCircle size={16} /> VERIFY URL
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default Certificates;