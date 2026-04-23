import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export const generateCertificate = async ({ name, course, date, certId }) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Background
  doc.setFillColor(15, 23, 42); // Elite Primary
  doc.rect(0, 0, 297, 210, 'F');

  // Decorative Border
  doc.setDrawColor(37, 99, 235); // Elite Accent
  doc.setLineWidth(1);
  doc.rect(5, 5, 287, 200);
  doc.setLineWidth(0.5);
  doc.rect(7, 7, 283, 196);

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(40);
  doc.text("CERTIFICATE", 148.5, 45, { align: "center" });
  doc.setFontSize(15);
  doc.setFont("helvetica", "normal");
  doc.text("OF ACHIEVEMENT AND COMPLETION", 148.5, 55, { align: "center" });

  // Body
  doc.setFontSize(14);
  doc.setTextColor(200, 200, 200);
  doc.text("THIS IS TO CERTIFY THAT", 148.5, 85, { align: "center" });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(48);
  doc.setFont("helvetica", "bold");
  doc.text(name.toUpperCase(), 148.5, 105, { align: "center" });

  doc.setTextColor(200, 200, 200);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("HAS SUCCESSFULLY COMPLETED THE REQUIREMENTS FOR", 148.5, 120, { align: "center" });

  doc.setTextColor(37, 99, 235); // Elite Accent
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text(course, 148.5, 135, { align: "center" });

  // Date and ID
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`DATE ISSUED: ${date}`, 40, 175);
  doc.text(`VERIFICATION ID: ${certId}`, 40, 182);

  // Signature areas
  doc.setDrawColor(100, 100, 100);
  doc.line(180, 175, 250, 175);
  doc.text("AUTHORIZED SIGNATORY", 188, 182);
  doc.setFont("times", "italic");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("Elite Hackers Board", 185, 170);

  // QR Code
  const qrData = `https://elite-hackers.web.app/verify/${certId}`;
  const qrDataUrl = await QRCode.toDataURL(qrData);
  doc.addImage(qrDataUrl, 'PNG', 245, 15, 35, 35);

  // Download
  doc.save(`${name.replace(/\s+/g, '_')}_Certificate.pdf`);
};
