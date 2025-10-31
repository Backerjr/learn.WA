export type ExerciseType = 
  | 'multiple_choice' 
  | 'type_answer' 
  | 'listen_and_select'
  | 'listen_and_type'
  | 'drag_words'
  | 'image_match'
  | 'fill_blanks';

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt_en: string;
  prompt_pl: string;
  options?: string[];
  correctAnswer: string;
  hint_pl?: string;
  audioText?: string;
  // New exercise type fields
  words?: string[];  // For drag_words: words to arrange
  pairs?: { en: string; pl: string; image?: string }[];  // For image_match
  sentence?: string;  // For fill_blanks: sentence with ___ placeholders
  blanks?: string[];  // For fill_blanks: correct words for blanks
}

export interface Lesson {
  id: string;
  title_pl: string;
  title_en: string;
  icon?: string;  // Emoji or icon for the lesson
  description_pl?: string;  // Poetic description in Polish
  description_en?: string;  // Poetic description in English
  exercises: Exercise[];
  xp: number;
}

export interface Unit {
  id: string;
  title_pl: string;
  title_en: string;
  cefr: string;
  description_pl?: string;  // Poetic description in Polish
  description_en?: string;  // Poetic description in English
  lessons: Lesson[];
}

export interface Progress {
  completedLessons: string[];
  xp: number;
  streak: number;
  hearts: number;
  lastActiveDate: string;
  // Enhanced progression features
  level: number;
  dailyGoal: number;
  dailyXP: number;
  achievements: string[];
  weeklyStreak: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'xp' | 'streak' | 'lessons' | 'perfect';
  unlocked: boolean;
}

export interface SocialStats {
  friends: Friend[];
  leaderboard: LeaderboardEntry[];
  publicProfile: boolean;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  level: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export interface UserStats {
  currentLesson: string | null;
  exerciseIndex: number;
}
