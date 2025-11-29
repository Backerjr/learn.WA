import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LearningContext } from './contexts/LearningContext';

// Lazy-loaded Screens
const LandingPortal = lazy(() => import('./screens/LandingPortal'));
const MissionControlScreen = lazy(() => import('./screens/MissionControlScreen'));
const QuizScreen = lazy(() => import('./screens/QuizScreen'));
const CoreLearningScreen = lazy(() => import('./screens/CoreLearningScreen'));
const UserProfileScreen = lazy(() => import('./screens/UserProfileScreen'));
const CourseDiscoveryScreen = lazy(() => import('./screens/CourseDiscoveryScreen'));
const ResourceLibraryScreen = lazy(() => import('./screens/ResourceLibraryScreen'));
const AIQuizCreatorScreen = lazy(() => import('./screens/AIQuizCreator'));
const AssessmentStudio = lazy(() => import('./screens/AssessmentStudio'));
const QuizLibrary = lazy(() => import('./screens/QuizLibrary'));
const TeacherDashboardScreen = lazy(() => import('./screens/TeacherDashboardScreen'));
const FlashcardUploader = lazy(() => import('./screens/FlashcardUploader'));
const CommunityScreen = () => <div className="p-10 text-white bg-space-black h-screen font-data">Community - Building the Galactic Network...</div>;


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LearningContext>
        <div className="dark">
          <Router>
            <Suspense fallback={<div className="p-10 text-white bg-space-black h-screen font-data">Loading...</div>}>
              <Routes>
                {/* PHASE 4: NEW LANDING PAGE */}
                <Route path="/" element={<LandingPortal />} />
                
                {/* EXISTING SCREENS (now under /dashboard or specific routes) */}
                <Route path="/dashboard" element={<MissionControlScreen />} />
                <Route path="/learn" element={<CoreLearningScreen />} />
                <Route path="/courses" element={<CourseDiscoveryScreen />} />
                <Route path="/profile" element={<UserProfileScreen />} />
                <Route path="/library" element={<ResourceLibraryScreen />} />
                <Route path="/quiz-library" element={<QuizLibrary />} />
                <Route path="/studio" element={<AIQuizCreatorScreen />} />
                
                {/* NAVIGATION FIXES */}
                <Route path="/quiz" element={<QuizScreen />} />
                <Route path="/teacher" element={<TeacherDashboardScreen />} />
                <Route path="/teacher/create" element={<AssessmentStudio />} />
                <Route path="/community" element={<CommunityScreen />} />
                <Route path="/flashcard-uploader" element={<FlashcardUploader />} />

              </Routes>
            </Suspense>
          </Router>
        </div>
      </LearningContext>
    </QueryClientProvider>
  );
}

export default App;
