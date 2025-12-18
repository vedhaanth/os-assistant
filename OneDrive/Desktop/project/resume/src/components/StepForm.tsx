import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, GraduationCap, Code, Building, MapPin, Clock, User } from 'lucide-react';
import { UserProfile } from '../types';
import { ProgressBar } from './ProgressBar';

interface StepFormProps {
  language: 'en' | 'hi';
  onSubmit: (profile: UserProfile) => void;
  onBack: () => void;
}

export const StepForm: React.FC<StepFormProps> = ({ language, onSubmit, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    educationLevel: '',
    skills: [],
    sector: '',
    location: '',
    internshipType: 'Any'
  });

  const totalSteps = 5;

  const content = {
    en: {
      backToDashboard: 'Back to Dashboard',
      step1: {
        title: 'Education Level',
        subtitle: 'What is your current education level?',
        options: [
          '10th Pass',
          '12th Pass',
          'Diploma',
          'Graduate',
          'Postgraduate',
          'PhD'
        ]
      },
      step2: {
        title: 'Your Skills',
        subtitle: 'Select your skills and expertise areas',
        categories: {
          technical: 'Technical Skills',
          business: 'Business Skills',
          creative: 'Creative Skills',
          communication: 'Communication Skills'
        }
      },
      step3: {
        title: 'Sector Interest',
        subtitle: 'Which sector interests you the most?',
        options: [
          { value: 'IT', icon: '💻' },
          { value: 'Healthcare', icon: '🏥' },
          { value: 'Education', icon: '📚' },
          { value: 'Finance', icon: '💰' },
          { value: 'Manufacturing', icon: '🏭' },
          { value: 'Retail', icon: '🛍️' },
          { value: 'Agriculture', icon: '🌾' },
          { value: 'Marketing', icon: '📢' },
          { value: 'Media', icon: '📺' },
          { value: 'Government', icon: '🏛️' },
          { value: 'NGO', icon: '🤝' },
          { value: 'Other', icon: '🔧' }
        ]
      },
      step4: {
        title: 'Preferred Location',
        subtitle: 'Where would you like to do your internship?',
        states: [
          'All India',
          'Andhra Pradesh',
          'Bihar',
          'Delhi',
          'Gujarat',
          'Haryana',
          'Karnataka',
          'Kerala',
          'Madhya Pradesh',
          'Maharashtra',
          'Punjab',
          'Rajasthan',
          'Tamil Nadu',
          'Telangana',
          'Uttar Pradesh',
          'West Bengal'
        ]
      },
      step5: {
        title: 'Internship Type',
        subtitle: 'What type of internship do you prefer?',
        options: [
          { value: 'On-site', icon: '🏢', desc: 'Work from office' },
          { value: 'Remote', icon: '🏠', desc: 'Work from home' },
          { value: 'Hybrid', icon: '🔄', desc: 'Mix of both' },
          { value: 'Any', icon: '✨', desc: 'No preference' }
        ]
      },
      buttons: {
        next: 'Next',
        previous: 'Previous',
        submit: 'Find Internships'
      }
    },
    hi: {
      backToDashboard: 'डैशबोर्ड पर वापस जाएं',
      step1: {
        title: 'शिक्षा स्तर',
        subtitle: 'आपका वर्तमान शिक्षा स्तर क्या है?',
        options: [
          '10वीं पास',
          '12वीं पास',
          'डिप्लोमा',
          'स्नातक',
          'स्नातकोत्तर',
          'पीएचडी'
        ]
      },
      step2: {
        title: 'आपके कौशल',
        subtitle: 'अपने कौशल और विशेषज्ञता क्षेत्रों का चयन करें',
        categories: {
          technical: 'तकनीकी कौशल',
          business: 'व्यावसायिक कौशल',
          creative: 'रचनात्मक कौशल',
          communication: 'संचार कौशल'
        }
      },
      step3: {
        title: 'क्षेत्रीय रुचि',
        subtitle: 'आपको कौन सा क्षेत्र सबसे ज्यादा दिलचस्प लगता है?',
        options: [
          { value: 'IT', icon: '💻' },
          { value: 'Healthcare', icon: '🏥' },
          { value: 'Education', icon: '📚' },
          { value: 'Finance', icon: '💰' },
          { value: 'Manufacturing', icon: '🏭' },
          { value: 'Retail', icon: '🛍️' },
          { value: 'Agriculture', icon: '🌾' },
          { value: 'Marketing', icon: '📢' },
          { value: 'Media', icon: '📺' },
          { value: 'Government', icon: '🏛️' },
          { value: 'NGO', icon: '🤝' },
          { value: 'Other', icon: '🔧' }
        ]
      },
      step4: {
        title: 'पसंदीदा स्थान',
        subtitle: 'आप अपनी इंटर्नशिप कहाँ करना चाहेंगे?',
        states: [
          'पूरा भारत',
          'आंध्र प्रदेश',
          'बिहार',
          'दिल्ली',
          'गुजरात',
          'हरियाणा',
          'कर्नाटक',
          'केरल',
          'मध्य प्रदेश',
          'महाराष्ट्र',
          'पंजाब',
          'राजस्थान',
          'तमिल नाडु',
          'तेलंगाना',
          'उत्तर प्रदेश',
          'पश्चिम बंगाल'
        ]
      },
      step5: {
        title: 'इंटर्नशिप प्रकार',
        subtitle: 'आप किस प्रकार की इंटर्नशिप पसंद करते हैं?',
        options: [
          { value: 'On-site', icon: '🏢', desc: 'ऑफिस से काम करें' },
          { value: 'Remote', icon: '🏠', desc: 'घर से काम करें' },
          { value: 'Hybrid', icon: '🔄', desc: 'दोनों का मिश्रण' },
          { value: 'Any', icon: '✨', desc: 'कोई प्राथमिकता नहीं' }
        ]
      },
      buttons: {
        next: 'आगे',
        previous: 'पिछला',
        submit: 'इंटर्नशिप खोजें'
      }
    }
  };

  const t = content[language];

  const skillsData = {
    technical: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'HTML/CSS', 'C++', 'PHP', 'Git'],
    business: ['MS Office', 'Excel', 'Project Management', 'Data Analysis', 'Business Analysis', 'CRM', 'SAP', 'Accounting', 'Sales', 'Marketing'],
    creative: ['Photoshop', 'Illustrator', 'Video Editing', 'Content Writing', 'Graphic Design', 'UI/UX Design', 'Photography', 'Social Media', 'Copywriting', 'Animation'],
    communication: ['English', 'Hindi', 'Public Speaking', 'Presentation', 'Customer Service', 'Team Leadership', 'Negotiation', 'Writing', 'Translation', 'Teaching']
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(profile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkillToggle = (skill: string) => {
    const currentSkills = profile.skills;
    if (currentSkills.includes(skill)) {
      setProfile({
        ...profile,
        skills: currentSkills.filter(s => s !== skill)
      });
    } else {
      setProfile({
        ...profile,
        skills: [...currentSkills, skill]
      });
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return profile.educationLevel !== '';
      case 2:
        return profile.skills.length > 0;
      case 3:
        return profile.sector !== '';
      case 4:
        return profile.location !== '';
      case 5:
        return profile.internshipType !== '';
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">{t.step1.title}</h2>
                <p className="text-gray-600">{t.step1.subtitle}</p>
              </div>
            </div>
            <div className="grid gap-3">
              {t.step1.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setProfile({ ...profile, educationLevel: option })}
                  className={`p-4 text-left rounded-xl border-2 transition-all ${
                    profile.educationLevel === option
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Code className="h-8 w-8 text-blue-600" />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">{t.step2.title}</h2>
                <p className="text-gray-600">{t.step2.subtitle}</p>
              </div>
            </div>
            {Object.entries(skillsData).map(([category, skills]) => (
              <div key={category} className="space-y-3">
                <h3 className="font-semibold text-gray-800">
                  {t.step2.categories[category as keyof typeof t.step2.categories]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        profile.skills.includes(skill)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Selected: {profile.skills.length} skills
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Building className="h-8 w-8 text-blue-600" />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">{t.step3.title}</h2>
                <p className="text-gray-600">{t.step3.subtitle}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {t.step3.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setProfile({ ...profile, sector: option.value })}
                  className={`p-4 text-center rounded-xl border-2 transition-all ${
                    profile.sector === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 text-gray-700'
                  }`}
                >
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="font-medium">{option.value}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">{t.step4.title}</h2>
                <p className="text-gray-600">{t.step4.subtitle}</p>
              </div>
            </div>
            <div className="grid gap-2 max-h-96 overflow-y-auto">
              {t.step4.states.map((state) => (
                <button
                  key={state}
                  onClick={() => setProfile({ ...profile, location: state })}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    profile.location === state
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 text-gray-700'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">{t.step5.title}</h2>
                <p className="text-gray-600">{t.step5.subtitle}</p>
              </div>
            </div>
            <div className="grid gap-4">
              {t.step5.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setProfile({ ...profile, internshipType: option.value })}
                  className={`p-4 text-left rounded-xl border-2 transition-all ${
                    profile.internshipType === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{option.icon}</div>
                    <div>
                      <div className="font-semibold">{option.value}</div>
                      <div className="text-sm opacity-70">{option.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
        >
          ← {t.backToDashboard}
        </button>

        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {renderStep()}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            {t.buttons.previous}
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentStep === totalSteps ? t.buttons.submit : t.buttons.next}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};