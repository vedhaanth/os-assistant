import React from 'react';
import { Brain, Search, Target, CheckCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface LoadingScreenProps {
  language: 'en' | 'hi';
  userProfile: UserProfile | null;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ language, userProfile }) => {
  const content = {
    en: {
      title: 'AI is Finding Your Perfect Career Matches',
      subtitle: 'Analyzing 50,000+ internships with advanced AI to find the top 3-5 most relevant opportunities for you',
      steps: [
        { icon: <Search className="h-6 w-6" />, text: 'Scanning 50,000+ verified internships across India' },
        { icon: <Brain className="h-6 w-6" />, text: 'AI analyzing your skills, education & preferences' },
        { icon: <Target className="h-6 w-6" />, text: 'Calculating personalized match scores' },
        { icon: <CheckCircle className="h-6 w-6" />, text: 'Generating career guidance & skill insights' }
      ],
      inclusiveMessage: 'Designed for all students - including rural, tribal, and first-generation learners',
      profile: {
        education: 'Education',
        skills: 'Skills',
        sector: 'Sector',
        location: 'Location'
      }
    },
    hi: {
      title: 'AI आपके परफेक्ट करियर मैच खोज रही है',
      subtitle: 'आपके लिए शीर्ष 3-5 सबसे प्रासंगिक अवसर खोजने के लिए उन्नत AI के साथ 50,000+ इंटर्नशिप का विश्लेषण',
      steps: [
        { icon: <Search className="h-6 w-6" />, text: 'पूरे भारत में 50,000+ सत्यापित इंटर्नशिप स्कैन कर रहे हैं' },
        { icon: <Brain className="h-6 w-6" />, text: 'AI आपके कौशल, शिक्षा और प्राथमिकताओं का विश्लेषण कर रही है' },
        { icon: <Target className="h-6 w-6" />, text: 'व्यक्तिगत मैच स्कोर की गणना कर रहे हैं' },
        { icon: <CheckCircle className="h-6 w-6" />, text: 'करियर मार्गदर्शन और कौशल अंतर्दृष्टि तैयार कर रहे हैं' }
      ],
      inclusiveMessage: 'सभी छात्रों के लिए डिज़ाइन किया गया - ग्रामीण, आदिवासी और पहली पीढ़ी के शिक्षार्थियों सहित',
      profile: {
        education: 'शिक्षा',
        skills: 'कौशल',
        sector: 'क्षेत्र',
        location: 'स्थान'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Main Loading Animation */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-2 border-4 border-orange-200 rounded-full"></div>
              <div className="absolute inset-2 border-4 border-orange-500 rounded-full border-t-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t.title}</h1>
          <p className="text-gray-600 mb-8">{t.subtitle}</p>
          
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="h-4 w-4" />
            {t.inclusiveMessage}
          </div>
        </div>

        {/* Processing Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-4">
            {t.steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <div className="text-blue-600 animate-pulse">
                  {step.icon}
                </div>
                <span className="text-gray-700 font-medium">{step.text}</span>
                <div className="ml-auto">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile Summary */}
        {userProfile && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              AI is analyzing your profile
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">{t.profile.education}:</span>
                <span className="ml-2 font-medium">{userProfile.educationLevel}</span>
              </div>
              <div>
                <span className="text-gray-500">{t.profile.sector}:</span>
                <span className="ml-2 font-medium">{userProfile.sector}</span>
              </div>
              <div>
                <span className="text-gray-500">{t.profile.location}:</span>
                <span className="ml-2 font-medium">{userProfile.location}</span>
              </div>
              <div>
                <span className="text-gray-500">{t.profile.skills}:</span>
                <span className="ml-2 font-medium">{userProfile.skills.length} selected</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};