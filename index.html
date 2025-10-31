import { useState, useEffect } from 'react';
import { Progress, UserStats } from './types';
import { skillTree } from './data/lessons';
import { ALL_ACHIEVEMENTS } from './data/achievements';
import SkillTree from './components/SkillTree';
import LessonView from './components/LessonView';
import Header from './components/Header';
import LessonPlanner from './components/LessonPlanner';
import RozmowaWall from './components/RozmowaWall';
import ProgressionDashboard from './components/ProgressionDashboard';
import SocialHub from './components/SocialHub';
import ElegantDashboard from './components/ElegantDashboard';
import './App.css';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import OfferPage from './components/OfferPage';
import ContactPage from './components/ContactPage';
import AppPage from './components/AppPage';

const INITIAL_PROGRESS: Progress = {
  completedLessons: [],
  xp: 0,
  streak: 1,
  hearts: 5,
  lastActiveDate: new Date().toDateString(),
  // Enhanced progression features
  level: 1,
  dailyGoal: 20, // 20 XP per day
  dailyXP: 0,
  achievements: [],
  weeklyStreak: 0
};

const INITIAL_STATS: UserStats = {
  currentLesson: null,
  exerciseIndex: 0
};

type ViewMode = 'learning' | 'planner' | 'wall' | 'progress' | 'social' | 'elegant' | 'home' | 'about' | 'offer' | 'contact' | 'app';

function App() {
  const [progress, setProgress] = useState<Progress>(INITIAL_PROGRESS);
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_STATS);
  const [viewMode, setViewMode] = useState<ViewMode>('home');

  useEffect(() => {
    const savedProgress = localStorage.getItem('progress');
    const savedStats = localStorage.getItem('userStats');
    
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      const today = new Date().toDateString();
      
      if (parsed.lastActiveDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (parsed.lastActiveDate === yesterday) {
          parsed.streak += 1;
        } else {
          parsed.streak = 1;
        }
        parsed.lastActiveDate = today;
      }
      
      setProgress(parsed);
    }
    
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  const startLesson = (lessonId: string) => {
    setUserStats({ currentLesson: lessonId, exerciseIndex: 0 });
  };

  const completeLesson = (lessonId: string, earnedXP: number) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: [...prev.completedLessons, lessonId],
      xp: prev.xp + earnedXP
    }));
    setUserStats({ currentLesson: null, exerciseIndex: 0 });
  };

  const loseHeart = () => {
    setProgress(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1)
    }));
  };

  const exitLesson = () => {
    setUserStats({ currentLesson: null, exerciseIndex: 0 });
  };

  const currentLesson = userStats.currentLesson
    ? skillTree
        .flatMap(unit => unit.lessons)
        .find(lesson => lesson.id === userStats.currentLesson)
    : null;

  const handleNavigation = (page: string) => {
    setViewMode(page as ViewMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Header
        progress={progress}
        currentView={viewMode as string}
        onViewChange={(view) => setViewMode(view as ViewMode)}
      />
      
      {!currentLesson ? (
        <>
          {viewMode === 'learning' && (
            <SkillTree 
              units={skillTree} 
              progress={progress}
              onStartLesson={startLesson}
            />
          )}
          {viewMode === 'progress' && (
            <ProgressionDashboard 
              progress={progress}
              achievements={ALL_ACHIEVEMENTS}
            />
          )}
          {viewMode === 'social' && (
            <SocialHub progress={progress} />
          )}
          {viewMode === 'elegant' && (
            <ElegantDashboard 
              progress={progress}
              onProgressUpdate={setProgress}
            />
          )}
          {viewMode === 'planner' && <LessonPlanner />}
          {viewMode === 'wall' && <RozmowaWall />}
          
          {/* Website Pages */}
          {viewMode === 'home' && <LandingPage onNavigate={handleNavigation} />}
          {viewMode === 'about' && <AboutPage onNavigate={handleNavigation} />}
          {viewMode === 'offer' && <OfferPage onNavigate={handleNavigation} />}
          {viewMode === 'contact' && <ContactPage onNavigate={handleNavigation} />}
          {viewMode === 'app' && <AppPage onNavigate={handleNavigation} onStartApp={() => setViewMode('elegant')} />}

          <footer className="app-footer">
            <p className="footer-dedication">
              Dedicated to the one who teaches the world how to listen.
            </p>
          </footer>
        </>
      ) : (
        <LessonView
          lesson={currentLesson}
          exerciseIndex={userStats.exerciseIndex}
          onComplete={completeLesson}
          onLoseHeart={loseHeart}
          onExit={exitLesson}
          onNextExercise={(index) => setUserStats(prev => ({ ...prev, exerciseIndex: index }))}
        />
      )}
    </div>
  );
}

export default App;
