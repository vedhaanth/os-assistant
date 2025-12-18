import React from 'react';
import { FileText, PencilLine, Upload, ArrowRight, User, Briefcase } from 'lucide-react';
import { TrendingCompanies } from './TrendingCompanies';
import { trendingCompanies } from '../data/trendingCompanies';

interface DashboardProps {
  language: 'en' | 'hi';
  onSelectMethod: (method: 'manual' | 'upload') => void;
  onNavigate?: (screen: 'search' | 'stats') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ language, onSelectMethod, onNavigate }) => {
  const content = {
    en: {
      title: 'Find Your Perfect Internship',
      subtitle: 'Choose how you\'d like to get started',
      manual: {
        title: 'Manual Entry',
        description: 'Fill out a simple form with your details',
        features: ['Step-by-step guidance', 'Quick and easy', 'Complete control'],
        button: 'Start Manual Entry'
      },
      upload: {
        title: 'Upload Resume',
        description: 'Upload your resume and let AI extract your information',
        features: ['Automatic extraction', 'Save time', 'Smart matching'],
        button: 'Upload Resume'
      },
      stats: {
        title: 'PM Internship Scheme',
        internships: '50,000+ Internships Available',
        companies: '10,000+ Partner Organizations',
        success: '95% Placement Success Rate'
      }
    },
    hi: {
      title: 'अपनी परफेक्ट इंटर्नशिप खोजें',
      subtitle: 'चुनें कि आप कैसे शुरुआत करना चाहेंगे',
      manual: {
        title: 'मैन्युअल एंट्री',
        description: 'अपनी जानकारी के साथ एक सरल फॉर्म भरें',
        features: ['चरणबद्ध मार्गदर्शन', 'त्वरित और आसान', 'पूरा नियंत्रण'],
        button: 'मैन्युअल एंट्री शुरू करें'
      },
      upload: {
        title: 'रिज्यूमे अपलोड करें',
        description: 'अपना रिज्यूमे अपलोड करें और AI को आपकी जानकारी निकालने दें',
        features: ['ऑटोमैटिक एक्सट्रैक्शन', 'समय बचाएं', 'स्मार्ट मैचिंग'],
        button: 'रिज्यूमे अपलोड करें'
      },
      stats: {
        title: 'पीएम इंटर्नशिप योजना',
        internships: '50,000+ इंटर्नशिप उपलब्ध',
        companies: '10,000+ पार्टनर संगठन',
        success: '95% प्लेसमेंट सफलता दर'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-600 rounded-full p-3">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {t.title}
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-8">{t.subtitle}</p>

          {/* Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">{t.stats.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{t.stats.internships.split(' ')[0]}</div>
                <div className="text-sm text-gray-600">{t.stats.internships.split(' ').slice(1).join(' ')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{t.stats.companies.split(' ')[0]}</div>
                <div className="text-sm text-gray-600">{t.stats.companies.split(' ').slice(1).join(' ')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{t.stats.success.split(' ')[0]}</div>
                <div className="text-sm text-gray-600">{t.stats.success.split(' ').slice(1).join(' ')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trending Companies */}
        <TrendingCompanies language={language} companies={trendingCompanies} />

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Manual Entry Option */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <PencilLine className="h-8 w-8" />
                <h2 className="text-2xl font-bold">{t.manual.title}</h2>
              </div>
              <p className="text-blue-100">{t.manual.description}</p>
            </div>

            <div className="p-6">
              <ul className="space-y-3 mb-6">
                {t.manual.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectMethod('manual')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {t.manual.button}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Resume Upload Option */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <Upload className="h-8 w-8" />
                <h2 className="text-2xl font-bold">{t.upload.title}</h2>
              </div>
              <p className="text-orange-100">{t.upload.description}</p>
            </div>

            <div className="p-6">
              <ul className="space-y-3 mb-6">
                {t.upload.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectMethod('upload')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {t.upload.button}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-12 mb-8">
          <button
            onClick={() => onNavigate?.('search')}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            {language === 'en' ? 'Search Internships' : 'इंटर्नशिप खोजें'}
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => onNavigate?.('stats')}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            {language === 'en' ? 'View Statistics' : 'आंकड़े देखें'}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <User className="h-5 w-5 text-blue-600" />
            <span className="text-gray-700 font-medium">
              {language === 'en' ? 'Trusted by 1M+ Students' : '1M+ छात्रों द्वारा विश्वसनीय'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};