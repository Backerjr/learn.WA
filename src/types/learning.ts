// Learning types for the application

export type LessonEnrollmentStatus = "not_enrolled" | "trial" | "active" | "completed" | "payment_failed";
export type LessonPaymentStatus = "paid" | "refunded" | "pending" | "failed";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  level: string;
  progress: number; // 0-100
  completed: boolean;
  category: string;
  enrollmentStatus?: LessonEnrollmentStatus;
  price?: number;
  currency?: string;
  paymentStatus?: LessonPaymentStatus;
  lastAccessed?: Date;
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
