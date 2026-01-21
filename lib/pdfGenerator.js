import jsPDF from 'jspdf';

export const generatePDF = (cvData, template, includeWatermark = true) => {
  const doc = new jsPDF();
  
  // Couleur du template
  const templateColor = template.color || '#3B82F6';
  const rgb = hexToRgb(templateColor);
  
  // Header avec nom
  doc.setFillColor(rgb.r, rgb.g, rgb.b);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text(cvData.firstName + ' ' + cvData.lastName, 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text(cvData.jobTitle || '', 105, 30, { align: 'center' });
  
  // Informations de contact
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  let yPos = 50;
  
  if (cvData.email) {
    doc.text(`Email: ${cvData.email}`, 20, yPos);
    yPos += 6;
  }
  if (cvData.phone) {
    doc.text(`Tel: ${cvData.phone}`, 20, yPos);
    yPos += 6;
  }
  if (cvData.location) {
    doc.text(`Localisation: ${cvData.location}`, 20, yPos);
    yPos += 6;
  }
  
  yPos += 5;
  
  // Résumé
  if (cvData.summary) {
    doc.setFontSize(14);
    doc.setTextColor(rgb.r, rgb.g, rgb.b);
    doc.text('Profil', 20, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const summaryLines = doc.splitTextToSize(cvData.summary, 170);
    doc.text(summaryLines, 20, yPos);
    yPos += summaryLines.length * 5 + 5;
  }
  
  // Expériences
  if (cvData.experiences && cvData.experiences.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(rgb.r, rgb.g, rgb.b);
    doc.text('Expériences', 20, yPos);
    yPos += 8;
    
    cvData.experiences.forEach(exp => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'bold');
      doc.text(exp.position, 20, yPos);
      yPos += 6;
      doc.setFont(undefined, 'normal');
      doc.setFontSize(10);
      doc.text(`${exp.company} | ${exp.startDate} - ${exp.endDate || 'Présent'}`, 20, yPos);
      yPos += 6;
      if (exp.description) {
        const descLines = doc.splitTextToSize(exp.description, 170);
        doc.text(descLines, 20, yPos);
        yPos += descLines.length * 5 + 3;
      }
      yPos += 3;
    });
  }
  
  // Formation
  if (cvData.education && cvData.education.length > 0) {
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFontSize(14);
    doc.setTextColor(rgb.r, rgb.g, rgb.b);
    doc.text('Formation', 20, yPos);
    yPos += 8;
    
    cvData.education.forEach(edu => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'bold');
      doc.text(edu.degree, 20, yPos);
      yPos += 6;
      doc.setFont(undefined, 'normal');
      doc.setFontSize(10);
      doc.text(`${edu.school} | ${edu.year}`, 20, yPos);
      yPos += 8;
    });
  }
  
  // Compétences
  if (cvData.skills && cvData.skills.length > 0) {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFontSize(14);
    doc.setTextColor(rgb.r, rgb.g, rgb.b);
    doc.text('Compétences', 20, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const skillsText = cvData.skills.join(' • ');
    const skillsLines = doc.splitTextToSize(skillsText, 170);
    doc.text(skillsLines, 20, yPos);
  }
  
  // Watermark si nécessaire
  if (includeWatermark) {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('Créé avec CV Generator Pro', 105, 290, { align: 'center' });
    }
  }
  
  return doc;
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 59, g: 130, b: 246 };
}
