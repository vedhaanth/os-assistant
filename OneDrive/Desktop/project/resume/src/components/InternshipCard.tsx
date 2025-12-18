import React from 'react';
import { MapPin, Clock, Users, Star, ExternalLink, CheckCircle, TrendingUp, AlertCircle, BookOpen, Bookmark, BookmarkCheck } from 'lucide-react';
import { MatchedInternship } from '../types';

interface InternshipCardProps {
  internship: MatchedInternship;
  language: 'en' | 'hi';
  onBookmarkToggle: (internshipId: string) => void;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({ internship, language, onBookmarkToggle }) => {
  const content = {
    en: {
      matchScore: 'Match Score',
      duration: 'Duration',
      stipend: 'Stipend',
      skills: 'Required Skills',
      matchedSkills: 'Your Matched Skills',
      applyNow: 'Apply Now',
      viewDetails: 'View Details',
      careerGuidance: 'Career Guidance',
      skillGaps: 'Skills to Develop',
      growthPotential: 'Growth Potential',
      bookmark: 'Bookmark',
      bookmarked: 'Bookmarked'
    },
    hi: {
      matchScore: 'मैच स्कोर',
      duration: 'अवधि',
      stipend: 'वेतन',
      skills: 'आवश्यक कौशल',
      matchedSkills: 'आपके मैच किए गए कौशल',
      applyNow: 'अभी आवेदन करें',
      viewDetails: 'विवरण देखें',
      careerGuidance: 'करियर मार्गदर्शन',
      skillGaps: 'विकसित करने वाले कौशल',
      growthPotential: 'विकास क्षमता',
      bookmark: 'बुकमार्क',
      bookmarked: 'बुकमार्क किया गया'
    }
  };

  const t = content[language];

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 relative">
      {/* Best Match Badge */}
      {internship.matchScore >= 80 && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
          Best Match
        </div>
      )}

      {/* Bookmark Button */}
      <button
        onClick={() => onBookmarkToggle(internship.id)}
        className={`absolute top-4 left-4 p-2 rounded-full transition-all duration-200 ${
          internship.isBookmarked
            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
            : 'bg-white text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
        } shadow-lg z-10`}
        title={internship.isBookmarked ? t.bookmarked : t.bookmark}
      >
        {internship.isBookmarked ? (
          <BookmarkCheck className="h-5 w-5" />
        ) : (
          <Bookmark className="h-5 w-5" />
        )}
      </button>
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{internship.title}</h3>
            <p className="text-lg text-blue-600 font-semibold">{internship.organization}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchScoreColor(internship.matchScore)}`}>
            {internship.matchScore}% {t.matchScore}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{internship.duration}</span>
          </div>
          {internship.stipend && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{internship.stipend}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-700 mb-4 line-clamp-3">{internship.description}</p>

        {/* AI Career Guidance */}
        {internship.careerGuidance && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h4 className="text-sm font-semibold text-blue-800 mb-1 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {t.careerGuidance}
            </h4>
            <p className="text-sm text-blue-700">{internship.careerGuidance}</p>
          </div>
        )}

        {/* Growth Potential */}
        {internship.growthPotential && (
          <div className="mb-4 flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-purple-600" />
            <span className="font-medium text-gray-700">{t.growthPotential}:</span>
            <span className="text-purple-600 font-medium">{internship.growthPotential}</span>
          </div>
        )}

        {/* Matched Skills */}
        {internship.matchedSkills.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              {t.matchedSkills}
            </h4>
            <div className="flex flex-wrap gap-2">
              {internship.matchedSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skill Gaps - Learning Opportunities */}
        {internship.skillGaps && internship.skillGaps.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-orange-800 mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              {t.skillGaps}
            </h4>
            <div className="flex flex-wrap gap-2">
              {internship.skillGaps.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-xs text-orange-600 mt-2">
              💡 Consider learning these skills to improve your match score
            </p>
          </div>
        )}

        {/* All Required Skills */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">{t.skills}</h4>
          <div className="flex flex-wrap gap-2">
            {internship.skills.map((skill, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  internship.matchedSkills.includes(skill)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Requirements Preview */}
        {internship.requirements.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Requirements</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {internship.requirements.slice(0, 3).map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{req}</span>
                </li>
              ))}
              {internship.requirements.length > 3 && (
                <li className="text-blue-600 font-medium">
                  +{internship.requirements.length - 3} more requirements
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            {t.applyNow}
            <ExternalLink className="h-4 w-4" />
          </button>
          <button className="px-4 py-3 border border-gray-300 hover:border-blue-300 text-gray-700 hover:text-blue-600 rounded-xl font-semibold transition-colors">
            {t.viewDetails}
          </button>
        </div>
      </div>
    </div>
  );
};