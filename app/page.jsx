'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Sparkles, Download, Zap } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="p-6 border-b bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CV Generator Pro
            </span>
          </div>
          <button
            onClick={() => router.push('/editor')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
          >
            Créer mon CV
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-semibold">
          ✨ Nouveau · Générateur de CV Moderne
        </div>
        
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Créez un CV professionnel
          <br />
          en quelques minutes
        </h1>
        
        <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
          Design moderne, tous les templates inclus, export PDF sans watermark pour seulement <span className="font-bold text-blue-600">0,78€</span>. 
          Pas d&apos;abonnement, juste un paiement unique par CV.
        </p>
        
        <button
          onClick={() => router.push('/editor')}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg rounded-xl hover:scale-105 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Commencer gratuitement
        </button>
        
        <p className="text-sm text-black mt-4">
          Gratuit avec watermark · Sans inscription
        </p>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Création instantanée</h3>
            <p className="text-black">
              Éditeur intuitif avec prévisualisation en temps réel. Voyez votre CV prendre forme instantanément.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">5 templates modernes</h3>
            <p className="text-black">
              Tous les templates inclus avec le paiement unique. Design optimisé pour 2025.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Export PDF premium</h3>
            <p className="text-black">
              Téléchargez votre CV en PDF haute qualité sans watermark pour 0,78€ seulement.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Tarification simple et transparente</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
            <div className="text-sm font-semibold text-black mb-2">GRATUIT</div>
            <div className="text-4xl font-bold mb-4">0€</div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Création illimitée de CV</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Accès à tous les templates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Prévisualisation en direct</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black mt-1">•</span>
                <span className="text-black">Export avec watermark</span>
              </li>
            </ul>
            <button
              onClick={() => router.push('/editor')}
              className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-semibold"
            >
              Essayer gratuitement
            </button>
          </div>

          <div className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
              POPULAIRE
            </div>
            <div className="text-sm font-semibold mb-2">PREMIUM</div>
            <div className="text-4xl font-bold mb-1">0,78€</div>
            <div className="text-sm opacity-90 mb-6">par CV · paiement unique</div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Tout du gratuit +</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Export PDF SANS watermark</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Accès à TOUS les templates (5)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Qualité haute résolution</span>
              </li>
            </ul>
            <button
              onClick={() => router.push('/editor')}
              className="w-full py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all font-semibold"
            >
              Créer mon CV
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 text-center text-black">
          <p>© 2025 CV Generator Pro · Créé avec ❤️</p>
        </div>
      </footer>
    </div>
  );
}
