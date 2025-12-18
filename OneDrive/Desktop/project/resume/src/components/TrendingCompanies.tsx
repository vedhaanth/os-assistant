import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Users, TrendingUp } from 'lucide-react';
import { TrendingCompany } from '../types';

interface TrendingCompaniesProps {
  language: 'en' | 'hi';
  companies: TrendingCompany[];
}

export const TrendingCompanies: React.FC<TrendingCompaniesProps> = ({ language, companies }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      title: 'Trending Companies',
      subtitle: 'Top companies actively hiring interns',
      internships: 'internships',
      rating: 'rating',
      hiring: 'Actively Hiring',
      viewAll: 'View All Companies'
    },
    hi: {
      title: 'ट्रेंडिंग कंपनियां',
      subtitle: 'शीर्ष कंपनियां जो सक्रिय रूप से इंटर्न की भर्ती कर रही हैं',
      internships: 'इंटर्नशिप',
      rating: 'रेटिंग',
      hiring: 'सक्रिय रूप से भर्ती',
      viewAll: 'सभी कंपनियां देखें'
    }
  };

  const t = content[language];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{t.title}</h2>
            <p className="text-sm text-gray-600">{t.subtitle}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex-shrink-0 w-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl bg-white rounded-lg p-2 shadow-sm group-hover:scale-110 transition-transform">
                {company.logo}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                  {company.name}
                </h3>
                <p className="text-xs text-blue-600 font-medium">{company.sector}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-gray-600">
                  <Users className="h-3 w-3" />
                  <span>{company.internshipCount} {t.internships}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-600">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{company.rating}</span>
                </div>
              </div>

              {company.isHiring && (
                <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {t.hiring}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
          {t.viewAll} →
        </button>
      </div>
    </div>
  );
};