import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizScreen from './screens/QuizScreen';
import MissionControlScreen from './screens/MissionControlScreen';
import CoreLearningScreen from './screens/CoreLearningScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import CourseDiscoveryScreen from './screens/CourseDiscoveryScreen';
import ResourceLibraryScreen from './screens/ResourceLibraryScreen';

function App() {
  return (
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
  );
}

export default App;
