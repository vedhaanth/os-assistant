import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { ResumeData } from '../types';

interface ResumeUploadProps {
  language: 'en' | 'hi';
  onExtractedData: (data: ResumeData) => void;
  onBack: () => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ language, onExtractedData, onBack }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const content = {
    en: {
      title: 'Upload Your Resume',
      subtitle: 'Upload your resume and let our AI extract your information automatically',
      dragText: 'Drag and drop your resume here',
      orText: 'or',
      browseText: 'Browse Files',
      supportedFormats: 'Supported formats: PDF, DOC, DOCX (Max 5MB)',
      uploading: 'Uploading...',
      extracting: 'Extracting information...',
      extracted: 'Information extracted successfully!',
      error: 'Error uploading file. Please try again.',
      backButton: 'Back to Dashboard',
      continueButton: 'Continue with Extracted Data'
    },
    hi: {
      title: 'अपना रिज्यूमे अपलोड करें',
      subtitle: 'अपना रिज्यूमे अपलोड करें और हमारी AI को आपकी जानकारी अपने आप निकालने दें',
      dragText: 'अपना रिज्यूमे यहाँ ड्रैग और ड्रॉप करें',
      orText: 'या',
      browseText: 'फाइलें ब्राउज़ करें',
      supportedFormats: 'समर्थित फॉर्मेट: PDF, DOC, DOCX (अधिकतम 5MB)',
      uploading: 'अपलोड हो रहा है...',
      extracting: 'जानकारी निकाली जा रही है...',
      extracted: 'जानकारी सफलतापूर्वक निकाली गई!',
      error: 'फाइल अपलोड करने में त्रुटि। कृपया पुनः प्रयास करें।',
      backButton: 'डैशबोर्ड पर वापस जाएं',
      continueButton: 'निकाली गई जानकारी के साथ जारी रखें'
    }
  };

  const t = content[language];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (file.size > maxSize) {
      alert(language === 'en' ? 'File size must be less than 5MB' : 'फाइल का साइज़ 5MB से कम होना चाहिए');
      return;
    }
    
    if (!allowedTypes.includes(file.type)) {
      alert(language === 'en' ? 'Only PDF, DOC, and DOCX files are supported' : 'केवल PDF, DOC, और DOCX फाइलें समर्थित हैं');
      return;
    }

    setUploadedFile(file);
    setUploading(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUploading(false);
    
    // Simulate extraction
    setExtracting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data (in real implementation, this would come from AI service)
    const extractedData: ResumeData = {
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
      summary: 'Recent computer science graduate with experience in web development and data analysis.'
    };
    
    setExtracting(false);
    onExtractedData(extractedData);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (extracting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.extracting}</h2>
          <p className="text-gray-600">Processing your resume with AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
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

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!uploadedFile ? (
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-700 mb-2">{t.dragText}</p>
              <p className="text-gray-500 mb-6">{t.orText}</p>
              
              <button
                onClick={onButtonClick}
                disabled={uploading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
              >
                {uploading ? t.uploading : t.browseText}
              </button>
              
              <p className="text-sm text-gray-400 mt-4">{t.supportedFormats}</p>
            </div>
          ) : (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.extracted}</h3>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <FileText className="h-5 w-5" />
                  <span>{uploadedFile.name}</span>
                </div>
              </div>
              
              <button
                onClick={() => onExtractedData({
                  educationLevel: 'Graduate',
                  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'MS Office'],
                  sector: 'IT',
                  experience: '1-2 years',
                  languages: ['English', 'Hindi'],
                  certifications: ['Google Analytics', 'AWS Cloud Practitioner'],
                  projects: ['E-commerce Website', 'Task Management App'],
                  summary: 'Recent computer science graduate with experience in web development and data analysis.'
                })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                {t.continueButton}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};