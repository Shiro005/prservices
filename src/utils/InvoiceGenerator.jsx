import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateInvoice = (client) => {
  return new Promise((resolve) => {
    // Initialize jsPDF
    const doc = new jsPDF();
    
    // Add logo and header
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('PR SERVICES', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('123 Business Street, City, State - 123456', 105, 28, { align: 'center' });
    doc.text('Phone: +91 9876543210 | Email: info@prservices.com', 105, 34, { align: 'center' });
    
    // Add invoice title
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 105, 45, { align: 'center' });
    
    // Add client details
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(client.clientName, 20, 66);
    doc.text(`Mobile: ${client.mobileNumber}`, 20, 72);
    
    // Add invoice details
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice Date:', 150, 60);
    doc.text('Invoice No:', 150, 66);
    doc.setFont('helvetica', 'normal');
    doc.text(client.date, 180, 60);
    doc.text(`PR-${Math.floor(1000 + Math.random() * 9000)}`, 180, 66);
    
    // Add line separator
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 80, 190, 80);
    
    // Add service table
    doc.autoTable({
      startY: 85,
      head: [['Description', 'Amount (₹)']],
      body: [
        [client.services, client.amount],
        ['Amount in Words:', client.amountInWords],
        ['Payment Mode:', client.paymentMode.toUpperCase()],
      ],
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 'auto', fontStyle: 'bold' },
        1: { cellWidth: 'auto' }
      },
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: 'linebreak'
      },
      margin: { left: 20 }
    });
    
    // Add total
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: ₹${client.amount}`, 160, doc.lastAutoTable.finalY + 15);
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for your business!', 105, doc.lastAutoTable.finalY + 30, { align: 'center' });
    doc.text('For any queries, please contact +91 9876543210', 105, doc.lastAutoTable.finalY + 36, { align: 'center' });
    
    // Add watermark
    doc.setFontSize(60);
    doc.setTextColor(230, 230, 230);
    doc.setFont('helvetica', 'bold');
    doc.text('PR SERVICES', 105, 150, { align: 'center', angle: 45 });
    
    // Save the PDF
    doc.save(`PRServices_Invoice_${client.clientName}_${client.date}.pdf`);
    resolve();
  });
};