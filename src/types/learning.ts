// Learning types for the application

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  level: string;
  progress: number; // 0-100
  completed: boolean;
  category: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface UserProgress {
  totalLessonsCompleted: number;
  todayMinutes: number;
  totalSpeakingMinutes: number;
  currentStreak: number;
  longestStreak: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  level: string;
  joinedAt: Date;
  progress: UserProgress;
  achievements: Achievement[];
}
