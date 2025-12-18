import React from 'react';
import { ArrowRight, Briefcase, Users, Award, MapPin } from 'lucide-react';

interface WelcomeScreenProps {
  language: 'en' | 'hi';
  onGetStarted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ language, onGetStarted }) => {
  const content = {
    en: {
      title: 'PM Internship Scheme',
      subtitle: 'AI-Powered Career Matching for Every Student',
      description: 'Get the top 3-5 most relevant internship recommendations using advanced AI personalization. Designed for all students including rural, tribal, and first-generation learners.',
      features: [
        {
          icon: <Briefcase className="h-6 w-6" />,
          title: 'AI Personalization',
          description: 'Advanced matching with skills, academics, interests & location'
        },
        {
          icon: <Users className="h-6 w-6" />,
          title: 'Inclusive Design',
          description: 'Works on low-data devices, supports rural & tribal students'
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: 'Career Guidance',
          description: 'Get skill-gap insights and personalized career advice'
        },
        {
          icon: <MapPin className="h-6 w-6" />,
          title: 'Best Matches Only',
          description: 'Show only 3-5 most relevant opportunities per student'
        }
      ],
      getStarted: 'Get Started',
      poweredBy: 'Powered by Government of India'
    },
    hi: {
      title: 'पीएम इंटर्नशिप योजना',
      subtitle: 'हर छात्र के लिए AI-संचालित करियर मैचिंग',
      description: 'उन्नत AI व्यक्तिगतकरण का उपयोग करके शीर्ष 3-5 सबसे प्रासंगिक इंटर्नशिप सिफारिशें प्राप्त करें। ग्रामीण, आदिवासी और पहली पीढ़ी के शिक्षार्थियों सहित सभी छात्रों के लिए डिज़ाइन किया गया।',
      features: [
        {
          icon: <Briefcase className="h-6 w-6" />,
          title: 'AI व्यक्तिगतकरण',
          description: 'कौशल, शिक्षा, रुचियों और स्थान के साथ उन्नत मैचिंग'
        },
        {
          icon: <Users className="h-6 w-6" />,
          title: 'समावेशी डिज़ाइन',
          description: 'कम डेटा डिवाइस पर काम करता है, ग्रामीण और आदिवासी छात्रों का समर्थन करता है'
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: 'करियर मार्गदर्शन',
          description: 'कौशल-अंतर अंतर्दृष्टि और व्यक्तिगत करियर सलाह प्राप्त करें'
        },
        {
          icon: <MapPin className="h-6 w-6" />,
          title: 'केवल सर्वोत्तम मैच',
          description: 'प्रति छात्र केवल 3-5 सबसे प्रासंगिक अवसर दिखाएं'
        }
      ],
      getStarted: 'शुरू करें',
      poweredBy: 'भारत सरकार द्वारा संचालित'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 shadow-lg">
              <Briefcase className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t.title}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-4">
            {t.subtitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.description}
          </p>
          
          {/* Key Benefits Banner */}
          <div className="mt-6 inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-medium">
            <Award className="h-5 w-5" />
            {language === 'en' ? 'Mobile-First • Low-Data Friendly • Rural Inclusive' : 'मोबाइल-फर्स्ट • कम डेटा फ्रेंडली • ग्रामीण समावेशी'}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="text-blue-600 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mb-8">
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-2xl text-xl font-semibold shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            {t.getStarted}
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">{t.poweredBy}</p>
          <div className="mt-2 flex justify-center items-center gap-4 text-xs text-gray-400">
            <span>🌐 Works Offline</span>
            <span>📱 Mobile Optimized</span>
            <span>🎯 AI-Powered</span>
            <span>🤝 Inclusive Design</span>
          </div>
        </div>
      </div>
    </div>
  );
};