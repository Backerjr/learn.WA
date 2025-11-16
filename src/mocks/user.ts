import { UserProfile } from "@/types/learning";

export const mockUserProfile: UserProfile = {
  id: "user-1",
  name: "Student",
  email: "student@learn.wa",
  level: "Intermediate",
  joinedAt: new Date(),
  progress: {
    totalLessonsCompleted: 0,
    todayMinutes: 0,
    totalSpeakingMinutes: 0,
    currentStreak: 0,
    longestStreak: 0
  },
  achievements: [
    {
      id: "achievement-1",
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯"
    },
    {
      id: "achievement-2",
      title: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "🔥"
    },
    {
      id: "achievement-3",
      title: "Speaking Pro",
      description: "Complete 100 minutes of speaking practice",
      icon: "🎤"
    }
  ]
};
