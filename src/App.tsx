import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LearningContext } from './contexts/LearningContext';
import QuizScreen from './screens/QuizScreen';
import MissionControlScreen from './screens/MissionControlScreen';
import CoreLearningScreen from './screens/CoreLearningScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import CourseDiscoveryScreen from './screens/CourseDiscoveryScreen';
import ResourceLibraryScreen from './screens/ResourceLibraryScreen';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LearningContext>
        <div className="dark">
          <Router>
            <Routes>
              <Route path="/" element={<MissionControlScreen />} />
              <Route path="/quiz" element={<QuizScreen />} />
              <Route path="/learn" element={<CoreLearningScreen />} />
              <Route path="/profile" element={<UserProfileScreen />} />
              <Route path="/courses" element={<CourseDiscoveryScreen />} />
              <Route path="/library" element={<ResourceLibraryScreen />} />
            </Routes>
          </Router>
        </div>
      </LearningContext>
    </QueryClientProvider>
  );
}

export default App;
