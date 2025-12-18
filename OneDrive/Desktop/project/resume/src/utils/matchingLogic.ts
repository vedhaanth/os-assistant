import { UserProfile, Internship, MatchedInternship, ResumeData } from '../types';

interface MatchMetrics {
  skillScore: number;
  locationScore: number;
  educationScore: number;
  experienceScore: number;
  sectorScore: number;
  matchedSkills: string[];
  skillGaps: string[];
}

// Comprehensive matching system that considers all aspects of the candidate's profile
export const findMatchingInternships = (
  resumeData: ResumeData,
  internships: Internship[]
): MatchedInternship[] => {
  const matchedInternships: MatchedInternship[] = internships.map(internship => {
    // Calculate detailed match metrics
    const metrics = calculateMatchMetrics(resumeData, internship);
    
    // Calculate weighted total score (100 point scale)
    const totalScore = calculateTotalScore(metrics);
    
    // Generate career insights
    const careerGuidance = generateCareerGuidance(resumeData, internship, metrics);
    const growthPotential = assessGrowthPotential(resumeData, internship, metrics);

    return {
      ...internship,
      matchScore: totalScore,
      matchedSkills: metrics.matchedSkills,
      skillMatch: metrics.skillScore,
      locationMatch: metrics.locationScore >= 80,
      sectorMatch: metrics.sectorScore >= 80,
      careerGuidance,
      skillGaps: metrics.skillGaps,
      growthPotential
    };
  });

  // Sort by match score and return all matches for filtering
  return matchedInternships.sort((a, b) => b.matchScore - a.matchScore);
};

// Calculate detailed match metrics for each aspect
const calculateMatchMetrics = (resumeData: ResumeData, internship: Internship): MatchMetrics => {
  // 1. Skill Matching (40% of total score)
  const { matchedSkills, unmatchedSkills, skillScore } = calculateSkillMatch(
    resumeData.skills,
    internship.skills_required
  );

  // 2. Location Matching (20% of total score)
  const locationScore = calculateLocationMatch(
    { state: resumeData.state, district: resumeData.district },
    internship
  );

  // 3. Education Level Match (15% of total score)
  const educationScore = calculateEducationMatch(
    resumeData.educationLevel,
    internship.qualification
  );

  // 4. Experience Level Match (15% of total score)
  const experienceScore = calculateExperienceMatch(
    resumeData.experience,
    internship.experience_required
  );

  // 5. Sector Relevance (10% of total score)
  const sectorScore = calculateSectorMatch(
    resumeData.sector,
    internship.sector
  );

  return {
    skillScore,
    locationScore,
    educationScore,
    experienceScore,
    sectorScore,
    matchedSkills,
    skillGaps: unmatchedSkills
  };
};

// Detailed skill matching with semantic understanding
const calculateSkillMatch = (
  userSkills: string[],
  requiredSkills: string[]
): { matchedSkills: string[]; unmatchedSkills: string[]; skillScore: number } => {
  const skillSynonyms = new Map([
    ['javascript', ['js', 'node.js', 'react', 'vue', 'angular', 'typescript']],
    ['python', ['django', 'flask', 'data science', 'machine learning', 'ai']],
    ['java', ['spring', 'hibernate', 'j2ee', 'android']],
    ['web development', ['html', 'css', 'frontend', 'backend', 'full stack']],
    ['data analysis', ['sql', 'statistics', 'excel', 'power bi', 'tableau']],
    ['cloud', ['aws', 'azure', 'gcp', 'devops', 'docker', 'kubernetes']]
  ]);

  const matchedSkills: string[] = [];
  const unmatchedSkills: string[] = [];
  
  for (const requiredSkill of requiredSkills) {
    const normalizedRequired = requiredSkill.toLowerCase();
    let isMatched = false;

    // Direct match
    if (userSkills.some(userSkill => 
      userSkill.toLowerCase().includes(normalizedRequired) ||
      normalizedRequired.includes(userSkill.toLowerCase())
    )) {
      matchedSkills.push(requiredSkill);
      isMatched = true;
      continue;
    }

    // Synonym match
    for (const [baseSkill, synonyms] of skillSynonyms.entries()) {
      if (normalizedRequired.includes(baseSkill) || 
          synonyms.some(syn => normalizedRequired.includes(syn))) {
        if (userSkills.some(userSkill => {
          const normalizedUser = userSkill.toLowerCase();
          return normalizedUser.includes(baseSkill) ||
                 synonyms.some(syn => normalizedUser.includes(syn));
        })) {
          matchedSkills.push(requiredSkill);
          isMatched = true;
          break;
        }
      }
    }

    if (!isMatched) {
      unmatchedSkills.push(requiredSkill);
    }
  }

  const skillScore = (matchedSkills.length / requiredSkills.length) * 100;
  return { matchedSkills, unmatchedSkills, skillScore };
};

// Location matching with hierarchical scoring
const calculateLocationMatch = (
  userLocation: { state?: string; district?: string },
  internship: Internship
): number => {
  if (internship.type === 'Remote') return 100;
  if (!userLocation.state || userLocation.state === 'Unknown') return 0;

  if (internship.state.toLowerCase() === userLocation.state.toLowerCase()) {
    // Same state, check district
    if (internship.district.toLowerCase() === userLocation.district?.toLowerCase()) {
      return 100; // Exact location match
    }
    return 80; // Same state, different district
  }

  // Check neighboring states (could be expanded with actual state adjacency data)
  const neighboringStates = {
    'Maharashtra': ['Gujarat', 'Madhya Pradesh', 'Karnataka', 'Telangana'],
    'Karnataka': ['Maharashtra', 'Tamil Nadu', 'Andhra Pradesh', 'Kerala'],
    // Add more state relationships as needed
  };

  const userStateNeighbors = neighboringStates[userLocation.state] || [];
  if (userStateNeighbors.includes(internship.state)) {
    return 50; // Neighboring state
  }

  return 30; // Different state
};

// Education level matching with progression consideration
const calculateEducationMatch = (userLevel: string, requiredLevel: string): number => {
  const educationLevels = [
    '10th Pass',
    '12th Pass',
    'Diploma',
    'Graduate',
    'Postgraduate',
    'PhD'
  ];

  const userIndex = educationLevels.indexOf(userLevel);
  const requiredIndex = educationLevels.indexOf(requiredLevel);

  if (userIndex === -1 || requiredIndex === -1) return 0;
  if (userIndex >= requiredIndex) return 100;
  
  // Partial credit for being close to required level
  const levelDiff = requiredIndex - userIndex;
  return Math.max(0, 100 - (levelDiff * 25));
};

// Experience level matching
const calculateExperienceMatch = (userExp: string = 'Fresher', requiredExp: string): number => {
  const expLevels = {
    'Fresher': 0,
    '0-1 years': 0.5,
    '1-3 years': 2,
    '3-5 years': 4,
    '5-10 years': 7.5,
    '10+ years': 11
  };

  const userYears = expLevels[userExp as keyof typeof expLevels] || 0;
  const requiredYears = expLevels[requiredExp as keyof typeof expLevels] || 0;

  if (userYears >= requiredYears) return 100;
  
  // Partial credit for being close to required experience
  const yearDiff = requiredYears - userYears;
  return Math.max(0, 100 - (yearDiff * 20));
};

// Sector relevance matching
const calculateSectorMatch = (userSector: string, internshipSector: string): number => {
  if (userSector === internshipSector) return 100;

  // Related sectors get partial credit
  const sectorRelations = {
    'IT': ['Technology', 'Software', 'Data Science', 'Engineering'],
    'Marketing': ['Sales', 'Digital Marketing', 'Advertising', 'Media'],
    'Finance': ['Banking', 'Investment', 'Accounting', 'Business'],
    'Healthcare': ['Medical', 'Biotech', 'Pharmaceutical', 'Life Sciences']
  };

  const relatedSectors = sectorRelations[userSector as keyof typeof sectorRelations] || [];
  if (relatedSectors.includes(internshipSector)) return 70;

  return 30; // Different sector
};

// Calculate final weighted score
const calculateTotalScore = (metrics: MatchMetrics): number => {
  return Math.round(
    (metrics.skillScore * 0.4) +      // 40% weight for skills
    (metrics.locationScore * 0.2) +    // 20% weight for location
    (metrics.educationScore * 0.15) +  // 15% weight for education
    (metrics.experienceScore * 0.15) + // 15% weight for experience
    (metrics.sectorScore * 0.1)        // 10% weight for sector
  );
};

// Generate personalized career guidance
const generateCareerGuidance = (
  resumeData: ResumeData,
  internship: Internship,
  metrics: MatchMetrics
): string => {
  if (metrics.skillScore >= 80 && metrics.locationScore >= 80) {
    return `Excellent match! Your ${resumeData.educationLevel} background and skills in ${metrics.matchedSkills.join(', ')} align perfectly with this role.`;
  }
  
  if (metrics.skillScore >= 60) {
    return `Good opportunity! While you have strong skills in ${metrics.matchedSkills.join(', ')}, consider developing expertise in ${metrics.skillGaps.join(', ')}.`;
  }
  
  return `Growth opportunity! This role could help you develop new skills in ${metrics.skillGaps.join(', ')} and expand your expertise.`;
};

// Assess growth potential
const assessGrowthPotential = (
  resumeData: ResumeData,
  internship: Internship,
  metrics: MatchMetrics
): string => {
  if (metrics.skillScore >= 80 && metrics.sectorScore >= 80) {
    return 'High - Direct career path alignment';
  }
  
  if (metrics.skillScore >= 60 && metrics.skillGaps.length <= 2) {
    return 'High - Skills enhancement opportunity';
  }
  
  if (metrics.sectorScore >= 70) {
    return 'Medium - Good sector exposure';
  }
  
  return 'Medium - Career exploration opportunity';
};