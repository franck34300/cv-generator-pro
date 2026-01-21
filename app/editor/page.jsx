'use client';
import { useState } from 'react';
import { FileText, Download, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cvTemplates } from '@/lib/cvTemplates';
import { generatePDF } from '@/lib/pdfGenerator';

export default function EditorPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(cvTemplates[0]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [cvData, setCvData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experiences: [{ position: '', company: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', school: '', year: '' }],
    skills: []
  });

  const [currentSkill, setCurrentSkill] = useState('');

  const updateField = (field, value) => {
    setCvData(prev => ({ ...prev, [field]: value }));
  };

  const updateExperience = (index, field, value) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { position: '', company: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const removeExperience = (index) => {
    if (cvData.experiences.length > 1) {
      setCvData(prev => ({
        ...prev,
        experiences: prev.experiences.filter((_, i) => i !== index)
      }));
    }
  };

  const updateEducation = (index, field, value) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', school: '', year: '' }]
    }));
  };

  const removeEducation = (index) => {
    if (cvData.education.length > 1) {
      setCvData(prev => ({
        ...prev,
        education: prev.education.filter((_, i) => i !== index)
      }));
    }
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (index) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleDownloadFree = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const doc = generatePDF(cvData, selectedTemplate, true);
      doc.save(`CV_${cvData.firstName}_${cvData.lastName}_watermark.pdf`);
      setIsGenerating(false);
    }, 500);
  };

  const handleDownloadPremium = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvData,
          templateId: selectedTemplate.id
        })
      });
      
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Erreur paiement:', error);
      alert('Erreur lors du paiement. Réessayez.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-black hover:text-black"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold">Éditeur CV</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownloadFree}
              disabled={isGenerating}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Avec watermark
            </button>
            <button
              onClick={handleDownloadPremium}
              disabled={isGenerating}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Sans watermark (0,78€)
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div className="space-y-6">
            {/* Templates */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-4">Choisir un template</h3>
              <div className="grid grid-cols-3 gap-3">
                {cvTemplates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedTemplate.id === template.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-full h-20 rounded mb-2"
                      style={{ backgroundColor: template.color }}
                    />
                    <div className="text-sm font-semibold">{template.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-4">Informations personnelles</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={cvData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    value={cvData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Titre du poste"
                  value={cvData.jobTitle}
                  onChange={(e) => updateField('jobTitle', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={cvData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={cvData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <input
                  type="text"
                  placeholder="Localisation"
                  value={cvData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <textarea
                  placeholder="Résumé professionnel"
                  value={cvData.summary}
                  onChange={(e) => updateField('summary', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                />
              </div>
            </div>

            {/* Expériences */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Expériences professionnelles</h3>
                <button
                  onClick={addExperience}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter
                </button>
              </div>
              {cvData.experiences.map((exp, index) => (
                <div key={index} className="mb-6 pb-6 border-b last:border-b-0">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-semibold text-black">Expérience {index + 1}</span>
                    {cvData.experiences.length > 1 && (
                      <button
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Poste"
                      value={exp.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Entreprise"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Date début (ex: Jan 2020)"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Date fin (ex: Présent)"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                    <textarea
                      placeholder="Description des missions"
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Formation */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Formation</h3>
                <button
                  onClick={addEducation}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter
                </button>
              </div>
              {cvData.education.map((edu, index) => (
                <div key={index} className="mb-6 pb-6 border-b last:border-b-0">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-semibold text-black">Diplôme {index + 1}</span>
                    {cvData.education.length > 1 && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Diplôme"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="École / Université"
                      value={edu.school}
                      onChange={(e) => updateEducation(index, 'school', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Année (ex: 2020)"
                      value={edu.year}
                      onChange={(e) => updateEducation(index, 'year', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Compétences */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-4">Compétences</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Ajouter une compétence"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(index)}
                      className="hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-4">Prévisualisation</h3>
              <div className="border rounded-lg p-8 bg-gray-50" style={{ aspectRatio: '1/1.414' }}>
                <div 
                  className="h-24 -mx-8 -mt-8 mb-4 flex items-center justify-center text-white"
                  style={{ backgroundColor: selectedTemplate.color }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {cvData.firstName || 'Prénom'} {cvData.lastName || 'Nom'}
                    </div>
                    <div className="text-sm">{cvData.jobTitle || 'Titre du poste'}</div>
                  </div>
                </div>
                
                <div className="text-xs space-y-1 mb-4 text-black">
                  <div>{cvData.email || 'email@exemple.com'}</div>
                  <div>{cvData.phone || '+33 6 12 34 56 78'}</div>
                  <div>{cvData.location || 'Paris, France'}</div>
                </div>

                {cvData.summary && (
                  <div className="mb-4">
                    <div className="font-bold text-sm mb-1" style={{ color: selectedTemplate.color }}>
                      Profil
                    </div>
                    <div className="text-xs text-black line-clamp-3">{cvData.summary}</div>
                  </div>
                )}

                <div className="text-xs text-black text-center mt-8">
                  Aperçu simplifié · PDF complet au téléchargement
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de paiement */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Export Premium</h3>
            <p className="text-black mb-6">
              Téléchargez votre CV en PDF haute qualité sans watermark avec accès à tous les templates pour seulement 0,78€.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span>CV sans watermark · Tous les templates</span>
                <span className="font-bold">0,78€</span>
              </div>
              <div className="text-sm text-black">Paiement unique · Stripe sécurisé</div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Payer 0,78€
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
