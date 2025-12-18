import React, { useState } from 'react';
import { Filter, SortAsc, RefreshCw, Download, Share2, Lightbulb, TrendingUp, Users, Bookmark } from 'lucide-react';
import { MatchedInternship, UserProfile } from '../types';
import { InternshipCard } from './InternshipCard';
import { TrendingCompanies } from './TrendingCompanies';
import { trendingCompanies } from '../data/trendingCompanies';

interface ResultsScreenProps {
  language: 'en' | 'hi';
  internships: MatchedInternship[];
  userProfile: UserProfile | null;
  onStartOver: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  language,
  internships,
  userProfile,
  onStartOver
}) => {
  const [sortBy, setSortBy] = useState<'match' | 'location' | 'duration'>('match');
  const [filterSector, setFilterSector] = useState<string>('all');
  const [bookmarkedInternships, setBookmarkedInternships] = useState<Set<string>>(new Set());
  const [showBookmarked, setShowBookmarked] = useState(false);

  const content = {
    en: {
      title: 'Your AI-Powered Career Recommendations',
      subtitle: 'Personalized matches based on your skills, academics, and career goals',
      results: 'results found',
      bestMatches: 'Best Matches for You',
      careerInsights: 'Career Insights & Guidance',
      inclusiveNote: 'Designed for all students - rural, tribal, and first-generation learners',
      sortBy: 'Sort by',
      filterBy: 'Filter by Sector',
      matchScore: 'Match Score',
      location: 'Location',
      duration: 'Duration',
      allSectors: 'All Sectors',
      startOver: 'Start Over',
      exportResults: 'Export Results',
      shareResults: 'Share Results',
      noResults: 'No internships match your current filters',
      adjustFilters: 'Try adjusting your filters or start over with different preferences',
      bookmarked: 'Bookmarked',
      showBookmarked: 'Show Bookmarked Only',
      showAll: 'Show All Results',
      aiInsights: {
        title: 'AI Career Insights',
        skillDevelopment: 'Focus on developing these skills for better opportunities',
        careerPath: 'Your recommended career progression path',
        industryTrends: 'Growing sectors in your area of interest'
      }
    },
    hi: {
      title: 'आपकी AI-संचालित करियर सिफारिशें',
      subtitle: 'आपके कौशल, शिक्षा और करियर लक्ष्यों के आधार पर व्यक्तिगत मैच',
      results: 'परिणाम मिले',
      bestMatches: 'आपके लिए सर्वोत्तम मैच',
      careerInsights: 'करियर अंतर्दृष्टि और मार्गदर्शन',
      inclusiveNote: 'सभी छात्रों के लिए डिज़ाइन किया गया - ग्रामीण, आदिवासी और पहली पीढ़ी के शिक्षार्थी',
      sortBy: 'इसके अनुसार क्रमबद्ध करें',
      filterBy: 'सेक्टर के अनुसार फिल्टर करें',
      matchScore: 'मैच स्कोर',
      location: 'स्थान',
      duration: 'अवधि',
      allSectors: 'सभी सेक्टर',
      startOver: 'फिर से शुरू करें',
      exportResults: 'परिणाम निर्यात करें',
      shareResults: 'परिणाम साझा करें',
      noResults: 'आपके वर्तमान फिल्टर से कोई इंटर्नशिप मैच नहीं करती',
      adjustFilters: 'अपने फिल्टर को समायोजित करने का प्रयास करें या विभिन्न प्राथमिकताओं के साथ फिर से शुरू करें',
      bookmarked: 'बुकमार्क किया गया',
      showBookmarked: 'केवल बुकमार्क किए गए दिखाएं',
      showAll: 'सभी परिणाम दिखाएं',
      aiInsights: {
        title: 'AI करियर अंतर्दृष्टि',
        skillDevelopment: 'बेहतर अवसरों के लिए इन कौशलों को विकसित करने पर ध्यान दें',
        careerPath: 'आपका अनुशंसित करियर प्रगति पथ',
        industryTrends: 'आपकी रुचि के क्षेत्र में बढ़ते सेक्टर'
      }
    }
  };

  const t = content[language];

  // Get unique sectors for filter
  const sectors = ['all', ...Array.from(new Set(internships.map(i => i.sector)))];

  // Filter and sort internships
  const filteredInternships = internships
    .filter(internship => filterSector === 'all' || internship.sector === filterSector)
    .filter(internship => !showBookmarked || bookmarkedInternships.has(internship.id))
    .map(internship => ({
      ...internship,
      isBookmarked: bookmarkedInternships.has(internship.id)
    }))
    .sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'location':
          return a.location.localeCompare(b.location);
        case 'duration':
          return a.duration.localeCompare(b.duration);
        default:
          return 0;
      }
    });

  const handleBookmarkToggle = (internshipId: string) => {
    setBookmarkedInternships(prev => {
      const newSet = new Set(prev);
      if (newSet.has(internshipId)) {
        newSet.delete(internshipId);
      } else {
        newSet.add(internshipId);
      }
      return newSet;
    });
  };

  const handleExport = () => {
    const exportData = {
      userProfile,
      recommendations: filteredInternships,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'internship-recommendations.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Internship Recommendations',
          text: `Found ${filteredInternships.length} great internship matches!`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Generate AI insights for career guidance
  const generateCareerInsights = () => {
    if (!userProfile) return null;
    
    const allSkillGaps = filteredInternships
      .flatMap(i => i.skillGaps || [])
      .filter((skill, index, arr) => arr.indexOf(skill) === index)
      .slice(0, 5);
    
    const topSectors = filteredInternships
      .map(i => i.sector)
      .filter((sector, index, arr) => arr.indexOf(sector) === index)
      .slice(0, 3);
    
    return {
      skillGaps: allSkillGaps,
      sectors: topSectors,
      averageMatch: Math.round(
        filteredInternships.reduce((sum, i) => sum + i.matchScore, 0) / filteredInternships.length
      )
    };
  };

  const careerInsights = generateCareerInsights();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="h-4 w-4" />
            {t.inclusiveNote}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{t.subtitle}</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={onStartOver}
              className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-semibold shadow-lg transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              {t.startOver}
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg transition-colors"
            >
              <Download className="h-5 w-5" />
              {t.exportResults}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition-colors"
            >
              <Share2 className="h-5 w-5" />
              {t.shareResults}
            </button>
          </div>
        </div>

        {/* AI Career Insights Panel */}
        {careerInsights && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-lg p-6 mb-8 border border-purple-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-600 rounded-full p-2">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{t.aiInsights.title}</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-purple-100">
                <h3 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Match Score
                </h3>
                <div className="text-2xl font-bold text-purple-600">
                  {careerInsights.averageMatch}%
                </div>
                <p className="text-sm text-gray-600">Average compatibility</p>
              </div>
              
              {careerInsights.skillGaps.length > 0 && (
                <div className="bg-white rounded-lg p-4 border border-orange-100">
                  <h3 className="font-semibold text-orange-800 mb-2">
                    {t.aiInsights.skillDevelopment}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {careerInsights.skillGaps.slice(0, 3).map((skill, index) => (
                      <span key={index} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">
                  {t.aiInsights.industryTrends}
                </h3>
                <div className="space-y-1">
                  {careerInsights.sectors.map((sector, index) => (
                    <div key={index} className="text-sm text-blue-700 font-medium">
                      • {sector}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trending Companies */}
        <TrendingCompanies language={language} companies={trendingCompanies} />

        {/* Filters and Sort */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-blue-600">
                <TrendingUp className="h-5 w-5" />
                <span className="font-bold text-lg">{t.bestMatches}</span>
              </div>
              <span className="font-semibold text-gray-800">
                {filteredInternships.length} {t.results}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Bookmark Filter */}
              <button
                onClick={() => setShowBookmarked(!showBookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  showBookmarked
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                }`}
              >
                <Bookmark className="h-4 w-4" />
                {showBookmarked ? t.showAll : t.showBookmarked}
                {bookmarkedInternships.size > 0 && (
                  <span className="bg-white text-yellow-600 px-2 py-1 rounded-full text-xs font-bold">
                    {bookmarkedInternships.size}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <SortAsc className="h-5 w-5 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'match' | 'location' | 'duration')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="match">{t.matchScore}</option>
                  <option value="location">{t.location}</option>
                  <option value="duration">{t.duration}</option>
                </select>
              </div>

              {/* Filter Dropdown */}
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <select
                  value={filterSector}
                  onChange={(e) => setFilterSector(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">{t.allSectors}</option>
                  {sectors.slice(1).map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredInternships.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredInternships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                language={language}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <Filter className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.noResults}</h3>
              <p className="text-gray-600 mb-6">{t.adjustFilters}</p>
              <button
                onClick={onStartOver}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                {t.startOver}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};