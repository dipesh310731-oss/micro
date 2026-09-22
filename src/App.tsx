import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { BottomNav, ActiveTab } from './components/common/BottomNav';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { AuthModal } from './components/auth/AuthModal';
import { HomeDashboard } from './components/home/HomeDashboard';
import { PetriPlateAnalyzer } from './components/petri/PetriPlateAnalyzer';
import { MicrobiologyAIChat } from './components/chat/MicrobiologyAIChat';
import { StudyExamHub } from './components/study/StudyExamHub';
import { LabTechniquesHub } from './components/lab/LabTechniquesHub';
import { MyReportsHub } from './components/reports/MyReportsHub';
import { UserProfileHub } from './components/profile/UserProfileHub';
import { ReportModal } from './components/reports/ReportModal';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import {
  UserProfile,
  SupportedLanguage,
  PetriAnalysisResult,
  SavedNote
} from './types/microbiology';
import { SAMPLE_PLATES } from './data/samplePlates';
import { deriveMorphologySummary, generatePresumptiveCandidates } from './utils/imageProcessing';

// Default initial state
const DEFAULT_USER: UserProfile = {
  id: 'usr-default',
  name: 'Microbiology Scholar',
  email: 'scholar@microanalysis.org',
  institution: 'School of Life Sciences',
  course: 'B.Sc. / M.Sc. Microbiology',
  role: 'student',
  language: 'en',
  theme: 'light',
  studyStreakDays: 5,
  completedTopics: ['top-gram-staining'],
  bookmarkedTopics: ['top-gram-staining', 'top-growth-curve'],
};

// Seed an initial demo report from sample plate
const SEED_REPORT: PetriAnalysisResult = {
  id: 'report-seed-ecoli',
  timestamp: new Date().toISOString(),
  sampleName: 'Clinical Urine Specimen - MacConkey Plate #402',
  originalImage: SAMPLE_PLATES[0].imageDataUrl,
  petriPlateDetected: true,
  plateConfidence: 94,
  imageQuality: {
    sharpness: 'Good',
    lighting: 'Optimal',
    centering: 'Centered',
  },
  colonies: SAMPLE_PLATES[0].mockColonies,
  morphology: deriveMorphologySummary(SAMPLE_PLATES[0].mockColonies),
  labInputs: SAMPLE_PLATES[0].labInputs,
  presumptiveCandidates: generatePresumptiveCandidates(
    deriveMorphologySummary(SAMPLE_PLATES[0].mockColonies),
    SAMPLE_PLATES[0].labInputs
  ),
  overallDisclaimer:
    'Possible / Presumptive Identification. Colony photography alone cannot confirm organism identity. Confirmatory biochemical and molecular tests are strictly required.',
  userNotes: 'Conducted under BSL-1 protocol. Lactose fermentation positive.',
};

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    return localStorage.getItem('microanalysis_onboarding_done') !== 'true';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState<boolean>(false);

  // Active Report for viewing/printing
  const [activeReportModal, setActiveReportModal] = useState<PetriAnalysisResult | null>(null);

  // User State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('microanalysis_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  // Language State
  const [language, setLanguage] = useState<SupportedLanguage>(user.language || 'en');

  // Reports Collection
  const [reports, setReports] = useState<PetriAnalysisResult[]>(() => {
    const saved = localStorage.getItem('microanalysis_reports');
    return saved ? JSON.parse(saved) : [SEED_REPORT];
  });

  // Saved Notes Collection
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>(() => {
    const saved = localStorage.getItem('microanalysis_notes');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'note-gram-init',
            title: 'Gram Staining Decolorization Rule (5 Marks)',
            content:
              'Acetone-alcohol (95%) must not exceed 10-15 seconds. Excess decolorization strips Crystal Violet-Iodine from Gram-positive cells resulting in false Gram-negative appearance.',
            category: 'Bacteriology',
            timestamp: new Date().toISOString(),
            examTarget: '5marks',
          },
        ];
  });

  // Persist User
  useEffect(() => {
    localStorage.setItem('microanalysis_user', JSON.stringify(user));
  }, [user]);

  // Persist Reports
  useEffect(() => {
    localStorage.setItem('microanalysis_reports', JSON.stringify(reports));
  }, [reports]);

  // Persist Notes
  useEffect(() => {
    localStorage.setItem('microanalysis_notes', JSON.stringify(savedNotes));
  }, [savedNotes]);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setUser((prev) => ({ ...prev, language: lang }));
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('microanalysis_onboarding_done', 'true');
    setShowOnboarding(false);
  };

  const handleSaveReport = (report: PetriAnalysisResult) => {
    setReports((prev) => [report, ...prev]);
  };

  const handleDeleteReport = (reportId: string) => {
    if (confirm('Delete this saved laboratory report?')) {
      setReports((prev) => prev.filter((r) => r.id !== reportId));
    }
  };

  const handleSaveNote = (note: SavedNote) => {
    setSavedNotes((prev) => [note, ...prev]);
  };

  const handleQuickAskAi = (question: string) => {
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-[#1E1E24] font-sans antialiased selection:bg-pink-200 selection:text-purple-950">
      {/* Onboarding Flow for new visitors */}
      {showOnboarding && (
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
          language={language}
        />
      )}

      {/* Main App Container */}
      <div className="flex flex-col min-h-screen">
        {/* Sticky Header */}
        <Header
          user={user}
          currentLang={language}
          onLanguageChange={handleLanguageChange}
          onOpenProfile={() => setActiveTab('profile')}
          onOpenSafetyNotice={() => setIsSafetyModalOpen(true)}
        />

        {/* Dynamic Main Workspace */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-4 pt-3 pb-8">
          {activeTab === 'home' && (
            <HomeDashboard
              language={language}
              user={user}
              recentReports={reports}
              onNavigate={(tab) => setActiveTab(tab)}
              onQuickAskAi={handleQuickAskAi}
              onOpenReport={(report) => setActiveReportModal(report)}
            />
          )}

          {activeTab === 'analyze' && (
            <PetriPlateAnalyzer
              language={language}
              onSaveReport={handleSaveReport}
              onOpenReportView={(report) => setActiveReportModal(report)}
            />
          )}

          {activeTab === 'chat' && (
            <MicrobiologyAIChat
              language={language}
              onLanguageChange={handleLanguageChange}
              onSaveToNotes={handleSaveNote}
            />
          )}

          {activeTab === 'study' && (
            <StudyExamHub
              language={language}
              onSaveNote={handleSaveNote}
              onOpenTopicInChat={(query) => {
                setActiveTab('chat');
              }}
            />
          )}

          {activeTab === 'lab' && (
            <LabTechniquesHub
              language={language}
              onAskAiAboutTechnique={(query) => {
                setActiveTab('chat');
              }}
            />
          )}

          {activeTab === 'reports' && (
            <MyReportsHub
              reports={reports}
              onSelectReport={(report) => setActiveReportModal(report)}
              onDeleteReport={handleDeleteReport}
              onNavigateToAnalyzer={() => setActiveTab('analyze')}
              language={language}
            />
          )}

          {activeTab === 'profile' && (
            <UserProfileHub
              user={user}
              onUpdateUser={setUser}
              savedNotes={savedNotes}
              reports={reports}
              onOpenReport={(report) => setActiveReportModal(report)}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              language={language}
              onLanguageChange={handleLanguageChange}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          language={language}
        />
      </div>

      {/* Auth / Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(updatedUser) => setUser(updatedUser)}
        currentUser={user}
        language={language}
      />

      {/* Printable Report Modal */}
      <ReportModal
        report={activeReportModal}
        isOpen={activeReportModal !== null}
        onClose={() => setActiveReportModal(null)}
        language={language}
      />

      {/* Standalone Safety & Biosafety Modal */}
      {isSafetyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-purple-100 space-y-4 animate-in fade-in zoom-in-95">
            <DisclaimerBanner language={language} onDismiss={() => setIsSafetyModalOpen(false)} />
            <div className="space-y-2 text-xs text-slate-700 leading-relaxed bg-[#FAF7FD] p-4 rounded-2xl border border-purple-100">
              <h4 className="font-bold text-purple-950 text-sm">
                Biosafety Level (BSL) & Ethical Standards:
              </h4>
              <p>
                1. <strong>Academic and Educational Use:</strong> Colony morphometric detection is intended strictly for student education, laboratory screening training, and research prototyping.
              </p>
              <p>
                2. <strong>Empirical Rule:</strong> Microorganism colony shapes, sizes, and colors overlap significantly among species and change depending on media formulation, incubation temperature, humidity, and colony crowding.
              </p>
              <p>
                3. <strong>Clinical Non-Diagnostic Mandate:</strong> Never administer antimicrobial therapy, alter patient management, or make clinical diagnostic decisions based solely on automated image classification.
              </p>
            </div>
            <button
              onClick={() => setIsSafetyModalOpen(false)}
              className="w-full bg-purple-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-purple-950 transition-colors"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
