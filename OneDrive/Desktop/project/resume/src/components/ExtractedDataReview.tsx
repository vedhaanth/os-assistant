import React, { useState } from 'react';
import { CheckCircle, Edit3, User, Award, MapPin, Briefcase, Code, Languages, FileText } from 'lucide-react';
import { ResumeData } from '../types';

interface ExtractedDataReviewProps {
  language: 'en' | 'hi';
  data: ResumeData;
  onConfirm: (data: ResumeData) => void;
  onBack: () => void;
}

export const ExtractedDataReview: React.FC<ExtractedDataReviewProps> = ({
  language,
  data,
  onConfirm,
  onBack
}) => {
  const [editingData, setEditingData] = useState<ResumeData>(data);
  const [editMode, setEditMode] = useState(false);

  const content = {
    en: {
      title: 'Review Extracted Information',
      subtitle: 'Please review and edit the information extracted from your resume',
      personalInfo: 'Personal Information',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      education: 'Education Level',
      skills: 'Skills',
      sector: 'Preferred Sector',
      experience: 'Experience',
      languages: 'Languages',
      certifications: 'Certifications',
      projects: 'Projects',
      summary: 'Summary',
      editButton: 'Edit Information',
      saveButton: 'Save Changes',
      confirmButton: 'Confirm & Find Internships',
      backButton: 'Back to Upload',
      addSkill: 'Add Skill',
      addCertification: 'Add Certification',
      addProject: 'Add Project'
    },
    hi: {
      title: 'निकाली गई जानकारी की समीक्षा करें',
      subtitle: 'कृपया अपने रिज्यूमे से निकाली गई जानकारी की समीक्षा करें और संपादित करें',
      personalInfo: 'व्यक्तिगत जानकारी',
      name: 'नाम',
      email: 'ईमेल',
      phone: 'फोन',
      education: 'शिक्षा स्तर',
      skills: 'कौशल',
      sector: 'पसंदीदा क्षेत्र',
      experience: 'अनुभव',
      languages: 'भाषाएं',
      certifications: 'प्रमाणपत्र',
      projects: 'परियोजनाएं',
      summary: 'सारांश',
      editButton: 'जानकारी संपादित करें',
      saveButton: 'परिवर्तन सहेजें',
      confirmButton: 'पुष्टि करें और इंटर्नशिप खोजें',
      backButton: 'अपलोड पर वापस जाएं',
      addSkill: 'कौशल जोड़ें',
      addCertification: 'प्रमाणपत्र जोड़ें',
      addProject: 'परियोजना जोड़ें'
    }
  };

  const t = content[language];

  const educationOptions = [
    '10th Pass', '12th Pass', 'Diploma', 'Graduate', 'Postgraduate', 'PhD'
  ];

  const sectorOptions = [
    'IT', 'Healthcare', 'Education', 'Finance', 'Manufacturing', 'Retail',
    'Agriculture', 'Marketing', 'Media', 'Government', 'NGO', 'Other'
  ];

  const handleArrayAdd = (field: keyof ResumeData, value: string) => {
    if (Array.isArray(editingData[field])) {
      setEditingData({
        ...editingData,
        [field]: [...(editingData[field] as string[]), value]
      });
    }
  };

  const handleArrayRemove = (field: keyof ResumeData, index: number) => {
    if (Array.isArray(editingData[field])) {
      const newArray = [...(editingData[field] as string[])];
      newArray.splice(index, 1);
      setEditingData({
        ...editingData,
        [field]: newArray
      });
    }
  };

  const InfoCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    children: React.ReactNode;
  }> = ({ icon, title, children }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-blue-600">{icon}</div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );

  const TagList: React.FC<{
    items: string[];
    field: keyof ResumeData;
    canEdit: boolean;
    addLabel: string;
  }> = ({ items, field, canEdit, addLabel }) => (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {items.map((item, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {item}
            {canEdit && editMode && (
              <button
                onClick={() => handleArrayRemove(field, index)}
                className="text-blue-600 hover:text-red-600"
              >
                ×
              </button>
            )}
          </span>
        ))}
      </div>
      {editMode && (
        <button
          onClick={() => {
            const newItem = prompt(addLabel);
            if (newItem) handleArrayAdd(field, newItem);
          }}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          + {addLabel}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            ← {t.backButton}
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid gap-6 mb-8">
          {/* Personal Information */}
          <InfoCard icon={<User className="h-6 w-6" />} title={t.personalInfo}>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
                {editMode ? (
                  <input
                    type="text"
                    value={editingData.name || ''}
                    onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{editingData.name || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                {editMode ? (
                  <input
                    type="email"
                    value={editingData.email || ''}
                    onChange={(e) => setEditingData({ ...editingData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{editingData.email || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                {editMode ? (
                  <input
                    type="tel"
                    value={editingData.phone || ''}
                    onChange={(e) => setEditingData({ ...editingData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{editingData.phone || 'N/A'}</p>
                )}
              </div>
            </div>
          </InfoCard>

          {/* Education & Experience */}
          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard icon={<Award className="h-6 w-6" />} title={t.education}>
              {editMode ? (
                <select
                  value={editingData.educationLevel}
                  onChange={(e) => setEditingData({ ...editingData, educationLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {educationOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <p className="text-gray-800">{editingData.educationLevel}</p>
              )}
            </InfoCard>

            <InfoCard icon={<Briefcase className="h-6 w-6" />} title={t.experience}>
              {editMode ? (
                <input
                  type="text"
                  value={editingData.experience || ''}
                  onChange={(e) => setEditingData({ ...editingData, experience: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 1-2 years, Fresh Graduate"
                />
              ) : (
                <p className="text-gray-800">{editingData.experience || 'N/A'}</p>
              )}
            </InfoCard>
          </div>

          {/* Skills */}
          <InfoCard icon={<Code className="h-6 w-6" />} title={t.skills}>
            <TagList
              items={editingData.skills}
              field="skills"
              canEdit={true}
              addLabel={t.addSkill}
            />
          </InfoCard>

          {/* Sector */}
          <InfoCard icon={<MapPin className="h-6 w-6" />} title={t.sector}>
            {editMode ? (
              <select
                value={editingData.sector}
                onChange={(e) => setEditingData({ ...editingData, sector: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sectorOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <p className="text-gray-800">{editingData.sector}</p>
            )}
          </InfoCard>

          {/* Additional Information */}
          {(editingData.languages?.length || editingData.certifications?.length || editingData.projects?.length) && (
            <div className="grid md:grid-cols-3 gap-6">
              {editingData.languages && editingData.languages.length > 0 && (
                <InfoCard icon={<Languages className="h-6 w-6" />} title={t.languages}>
                  <TagList
                    items={editingData.languages}
                    field="languages"
                    canEdit={true}
                    addLabel="Add Language"
                  />
                </InfoCard>
              )}

              {editingData.certifications && editingData.certifications.length > 0 && (
                <InfoCard icon={<Award className="h-6 w-6" />} title={t.certifications}>
                  <TagList
                    items={editingData.certifications}
                    field="certifications"
                    canEdit={true}
                    addLabel={t.addCertification}
                  />
                </InfoCard>
              )}

              {editingData.projects && editingData.projects.length > 0 && (
                <InfoCard icon={<FileText className="h-6 w-6" />} title={t.projects}>
                  <TagList
                    items={editingData.projects}
                    field="projects"
                    canEdit={true}
                    addLabel={t.addProject}
                  />
                </InfoCard>
              )}
            </div>
          )}

          {/* Summary */}
          {editingData.summary && (
            <InfoCard icon={<FileText className="h-6 w-6" />} title={t.summary}>
              {editMode ? (
                <textarea
                  value={editingData.summary}
                  onChange={(e) => setEditingData({ ...editingData, summary: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800">{editingData.summary}</p>
              )}
            </InfoCard>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              if (editMode) {
                setEditMode(false);
              } else {
                setEditMode(true);
              }
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors"
          >
            <Edit3 className="h-5 w-5" />
            {editMode ? t.saveButton : t.editButton}
          </button>

          <button
            onClick={() => onConfirm(editingData)}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
          >
            <CheckCircle className="h-5 w-5" />
            {t.confirmButton}
          </button>
        </div>
      </div>
    </div>
  );
};