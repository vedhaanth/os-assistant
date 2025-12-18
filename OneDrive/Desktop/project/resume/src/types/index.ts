export interface UserProfile {
  educationLevel: string;
  skills: string[];
  sector: string;
  location: string;
  internshipType?: string;
  experience?: string;
  languages?: string[];
  certifications?: string[];
  projects?: string[];
}

export interface Internship {
  id: string;
  title: string;
  organization: string;
  location: string;
  duration: string;
  skills: string[];
  sector: string;
  type: string;
  description: string;
  requirements: string[];
  stipend?: string;
}

export interface MatchedInternship extends Internship {
  matchScore: number;
  matchedSkills: string[];
  skillMatch: number;
  locationMatch: boolean;
  sectorMatch: boolean;
  careerGuidance?: string;
  skillGaps?: string[];
  growthPotential?: string;
  isBookmarked?: boolean;
}

export interface ResumeData {
  name?: string;
  email?: string;
  phone?: string;
  educationLevel: string;
  skills: string[];
  sector: string;
  experience?: string;
  languages?: string[];
  certifications?: string[];
  projects?: string[];
  summary?: string;
}

export interface CareerInsights {
  skillGaps: string[];
  recommendedSkills: string[];
  careerPath: string;
  industryTrends: string[];
  learningResources: string[];
}

export interface TrendingCompany {
  id: string;
  name: string;
  logo: string;
  sector: string;
  internshipCount: number;
  rating: number;
  isHiring: boolean;
}

export interface AccessibilityFeatures {
  lowBandwidth: boolean;
  textToSpeech: boolean;
  highContrast: boolean;
  largeText: boolean;
}