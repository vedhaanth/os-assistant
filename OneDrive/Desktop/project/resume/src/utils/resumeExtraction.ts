import { ResumeData } from '../types';

// Mock resume extraction service
// In real implementation, this would call an AI service or use libraries like pdf-parse, mammoth, etc.

export const extractDataFromResume = async (file: File): Promise<ResumeData> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock extracted data based on file name or random generation
  // This would be replaced with actual extraction logic
  
  const mockData: ResumeData = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 9876543210',
    educationLevel: 'Graduate',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'MS Office'],
    sector: 'IT',
    experience: '1-2 years',
    languages: ['English', 'Hindi'],
    certifications: ['Google Analytics', 'AWS Cloud Practitioner'],
    projects: ['E-commerce Website', 'Task Management App'],
    summary: 'Recent computer science graduate with experience in web development and data analysis. Passionate about creating user-friendly applications and solving complex problems through technology.'
  };

  return mockData;
};

export const parseSkillsFromText = (text: string): string[] => {
  // Common skills keywords to look for
  const skillKeywords = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Angular', 'Vue',
    'Node.js', 'Express', 'MongoDB', 'MySQL', 'PostgreSQL', 'HTML', 'CSS',
    'Photoshop', 'Illustrator', 'AutoCAD', 'Excel', 'Word', 'PowerPoint',
    'Communication', 'Leadership', 'Project Management', 'Data Analysis',
    'Machine Learning', 'AI', 'Cloud Computing', 'AWS', 'Azure', 'Docker'
  ];

  const foundSkills: string[] = [];
  const lowerText = text.toLowerCase();

  skillKeywords.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });

  return foundSkills;
};

export const detectEducationLevel = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('phd') || lowerText.includes('doctorate')) return 'PhD';
  if (lowerText.includes('master') || lowerText.includes('m.tech') || lowerText.includes('mba')) return 'Postgraduate';
  if (lowerText.includes('bachelor') || lowerText.includes('b.tech') || lowerText.includes('b.sc')) return 'Graduate';
  if (lowerText.includes('diploma')) return 'Diploma';
  if (lowerText.includes('12th') || lowerText.includes('intermediate')) return '12th Pass';
  if (lowerText.includes('10th') || lowerText.includes('matriculation')) return '10th Pass';
  
  return 'Graduate'; // default
};

export const detectSector = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('software') || lowerText.includes('developer') || lowerText.includes('programming')) return 'IT';
  if (lowerText.includes('marketing') || lowerText.includes('sales')) return 'Marketing';
  if (lowerText.includes('finance') || lowerText.includes('accounting')) return 'Finance';
  if (lowerText.includes('healthcare') || lowerText.includes('medical')) return 'Healthcare';
  if (lowerText.includes('education') || lowerText.includes('teaching')) return 'Education';
  if (lowerText.includes('design') || lowerText.includes('creative')) return 'Media';
  
  return 'Other'; // default
};