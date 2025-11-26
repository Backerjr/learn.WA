import { createSeededRandom, pick, range } from "@/mocks/random";
import { Achievement, UserProfile } from "@/types/learning";

export type Persona = "student" | "teacher" | "admin";

const personaConfigs: Record<Persona, { level: string; baseEmail: string; name: string }> = {
  student: { level: "Intermediate", baseEmail: "student@learn.wa", name: "Curious Student" },
  teacher: { level: "Advanced", baseEmail: "teacher@learn.wa", name: "Dedicated Teacher" },
  admin: { level: "Expert", baseEmail: "admin@learn.wa", name: "Program Admin" },
};

const achievementCatalog: Achievement[] = [
  {
    id: "achievement-1",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
  },
  {
    id: "achievement-2",
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "🔥",
  },
  {
    id: "achievement-3",
    title: "Speaking Pro",
    description: "Complete 100 minutes of speaking practice",
    icon: "🎤",
  },
  {
    id: "achievement-4",
    title: "Feedback Fan",
    description: "Leave feedback on 5 lessons",
    icon: "💬",
  },
  {
    id: "achievement-5",
    title: "Community Builder",
    description: "Mentor another learner",
    icon: "🤝",
  },
];

const getAchievements = (rand: ReturnType<typeof createSeededRandom>): Achievement[] => {
  const unlockedCount = 2 + Math.floor(rand() * 3);
  const unlocked = achievementCatalog.slice(0, unlockedCount).map((achievement, index) => ({
    ...achievement,
    unlockedAt: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000),
  }));

  return unlocked;
};

const getProgress = (persona: Persona, rand: ReturnType<typeof createSeededRandom>) => {
  const personaMultiplier = persona === "student" ? 1 : persona === "teacher" ? 2 : 3;
  const totalLessonsCompleted = 3 * personaMultiplier + Math.floor(rand() * 4);
  const todayMinutes = 10 * personaMultiplier + Math.floor(rand() * 20);
  const totalSpeakingMinutes = 60 * personaMultiplier + Math.floor(rand() * 80);
  const streakBase = persona === "admin" ? 10 : persona === "teacher" ? 7 : 4;
  const currentStreak = streakBase + Math.floor(rand() * 5);
  const longestStreak = Math.max(currentStreak + Math.floor(rand() * 3), streakBase + 3);

  return {
    totalLessonsCompleted,
    todayMinutes,
    totalSpeakingMinutes,
    currentStreak,
    longestStreak,
  };
};

export const createUserProfile = (persona: Persona = "student", seed = 101): UserProfile => {
  const rand = createSeededRandom(seed);
  const config = personaConfigs[persona];

  return {
    id: `${persona}-${Math.floor(rand() * 10000)}`,
    name: `${config.name}`,
    email: config.baseEmail,
    level: config.level,
    joinedAt: new Date(Date.now() - Math.floor(rand() * 20) * 24 * 60 * 60 * 1000),
    progress: getProgress(persona, rand),
    achievements: getAchievements(rand),
  };
};

export const createRandomUserProfiles = (count = 3, seed = 404): UserProfile[] => {
  const rand = createSeededRandom(seed);
  return range(count).map(() => createUserProfile(pick(["student", "teacher", "admin"], rand), Math.floor(rand() * 10000)));
};

export const mockUserProfile = createUserProfile();
