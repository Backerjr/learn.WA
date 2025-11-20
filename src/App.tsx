import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import NEW Screens
import LandingPortal from './screens/LandingPortal';

// Import EXISTING Screens (now accessed via new paths/dashboard)
import MissionControlScreen from './screens/MissionControlScreen';
import QuizScreen from './screens/QuizScreen';
import CoreLearningScreen from './screens/CoreLearningScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import CourseDiscoveryScreen from './screens/CourseDiscoveryScreen';
import ResourceLibraryScreen from './screens/ResourceLibraryScreen';

// Placeholder Screens (to prevent crashes on missing links)
const TeacherDashboardScreen = () => <div className="p-10 text-white bg-space-black h-screen font-data">Teacher Mode Dashboard - Building the Constellation Map...</div>;
const CommunityScreen = () => <div className="p-10 text-white bg-space-black h-screen font-data">Community - Building the Galactic Network...</div>;


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Assuming LearningContext is defined elsewhere or will be re-added */}
      {/* <LearningContext> */}
        <div className="dark">
          <Router>
            <Routes>
              {/* PHASE 4: NEW LANDING PAGE */}
              <Route path="/" element={<LandingPortal />} />
              
              {/* EXISTING SCREENS (now under /dashboard or specific routes) */}
              <Route path="/dashboard" element={<MissionControlScreen />} />
              <Route path="/learn" element={<CoreLearningScreen />} />
              <Route path="/courses" element={<CourseDiscoveryScreen />} />
              <Route path="/profile" element={<UserProfileScreen />} />
              <Route path="/library" element={<ResourceLibraryScreen />} />
              
              {/* NAVIGATION FIXES */}
              <Route path="/quiz" element={<QuizScreen />} />
              <Route path="/teacher" element={<TeacherDashboardScreen />} />
              <Route path="/community" element={<CommunityScreen />} />

            </Routes>
          </Router>
        </div>
      {/* </LearningContext> */}
    </QueryClientProvider>
  );
}

export default App;