import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: 'en' | 'hi';
  onLanguageChange: (language: 'en' | 'hi') => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onLanguageChange }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-full shadow-lg p-1 flex items-center gap-1">
        <Globe className="h-4 w-4 text-gray-600 ml-2" />
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            language === 'en'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => onLanguageChange('hi')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            language === 'hi'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          हिं
        </button>
      </div>
    </div>
  );
};