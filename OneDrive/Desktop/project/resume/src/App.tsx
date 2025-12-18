import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { LoginScreen } from './components/LoginScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Dashboard } from './components/Dashboard';
import { ResumeUpload } from './components/ResumeUpload';
import { ExtractedDataReview } from './components/ExtractedDataReview';
import { LanguageToggle } from './components/LanguageToggle';
import { StepForm } from './components/StepForm';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { UserProfile, MatchedInternship, ResumeData } from './types';
import { findMatchingInternships } from './utils/matchingLogic';
import { internships } from './data/internships';
import InternshipSearch from './components/InternshipSearch';
import InternshipStats from './components/InternshipStats';

type Screen = 'login' | 'welcome' | 'dashboard' | 'manual' | 'upload' | 'review' | 'loading' | 'results' | 'search' | 'stats';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [matchedInternships, setMatchedInternships] = useState<MatchedInternship[]>([]);
  const [extractedData, setExtractedData] = useState<ResumeData | null>(null);

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang);
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setCurrentScreen('welcome');
  };

  const handleSkipLogin = () => {
    setCurrentScreen('welcome');
  };

  const handleGetStarted = () => {
    setCurrentScreen('dashboard');
  };

  const handleSelectMethod = (method: 'manual' | 'upload') => {
    if (method === 'manual') {
      setCurrentScreen('manual');
    } else {
      setCurrentScreen('upload');
    }
  };

  const handleExtractedData = (data: ResumeData) => {
    setExtractedData(data);
    setCurrentScreen('review');
  };

  const handleConfirmExtractedData = (data: ResumeData) => {
    // Convert ResumeData to UserProfile
    const profile: UserProfile = {
      educationLevel: data.educationLevel,
      skills: data.skills,
      sector: data.sector,
      location: 'All India', // Default since not extracted
      internshipType: 'Any',
      experience: data.experience,
      languages: data.languages,
      certifications: data.certifications
    };

    handleFormSubmit(profile);
  };

  const handleFormSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentScreen('loading');

    // Simulate AI processing
    setTimeout(() => {
      const matches = findMatchingInternships(profile, internships);
      setMatchedInternships(matches);
      setCurrentScreen('results');
    }, 3000);
  };

  const handleStartOver = () => {
    setCurrentScreen('dashboard');
    setUserProfile(null);
    setMatchedInternships([]);
    setExtractedData(null);
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <>
            <CssBaseline />
            <LoginScreen
              language={language}
              onLogin={handleLogin}
              onSkipLogin={handleSkipLogin}
            />
          </>
        );

      case 'welcome':
        return (
          <>
            <CssBaseline />
            <WelcomeScreen
              language={language}
              onGetStarted={handleGetStarted}
            />
          </>
        );

      case 'dashboard':
        return (
          <>
            <CssBaseline />
            <Dashboard
              language={language}
              onSelectMethod={handleSelectMethod}
            />
          </>
        );

      case 'search':
        return (
          <>
            <CssBaseline />
            <InternshipSearch />
          </>
        );

      case 'stats':
        return (
          <>
            <CssBaseline />
            <InternshipStats />
          </>
        );

      case 'manual':
        return (
          <>
            <CssBaseline />
            <StepForm
              language={language}
              onSubmit={handleFormSubmit}
              onBack={handleBackToDashboard}
            />
          </>
        );

      case 'upload':
        return (
          <>
            <CssBaseline />
            <ResumeUpload
              language={language}
              onExtractedData={handleExtractedData}
              onBack={handleBackToDashboard}
            />
          </>
        );

      case 'review':
        return extractedData ? (
          <>
            <CssBaseline />
            <ExtractedDataReview
              language={language}
              data={extractedData}
              onConfirm={handleConfirmExtractedData}
              onBack={() => setCurrentScreen('upload')}
            />
          </>
        ) : null;

      case 'loading':
        return (
          <>
            <CssBaseline />
            <LoadingScreen
              language={language}
              userProfile={userProfile}
            />
          </>
        );

      case 'results':
        return (
          <>
            <CssBaseline />
            <ResultsScreen
              language={language}
              internships={matchedInternships}
              userProfile={userProfile}
              onStartOver={handleStartOver}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <LanguageToggle
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      {renderCurrentScreen()}
    </div>
  );
}

export default App;
