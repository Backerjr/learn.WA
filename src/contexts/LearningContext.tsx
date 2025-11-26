// LearningContext.tsx - Web-compatible learning context with localStorage
import createContextHook from "@nkzw/create-context-hook";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import { mockLessons } from "@/mocks/lessons";
import { mockUserProfile } from "@/mocks/user";
import { Lesson, UserProfile } from "@/types/learning";

const STORAGE_KEY = "rozmowa_user_data";

// Web-compatible storage utilities
const storage = {
  async getItem(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  },
  async setItem(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }
};

export const [LearningContext, useLearning] = createContextHook(() => {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);

  const userDataQuery = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const stored = await storage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          userProfile: {
            ...parsed.userProfile,
            joinedAt: new Date(parsed.userProfile.joinedAt),
            achievements: parsed.userProfile.achievements.map((a: any) => ({
              ...a,
              unlockedAt: a.unlockedAt ? new Date(a.unlockedAt) : undefined,
            })),
          },
          lessons: parsed.lessons.map((lesson: any) => ({
            ...lesson,
            lastAccessed: lesson.lastAccessed ? new Date(lesson.lastAccessed) : undefined,
          })),
        };
      }
      return { userProfile: mockUserProfile, lessons: mockLessons };
    },
  });

  const saveDataMutation = useMutation({
    mutationFn: async (data: { userProfile: UserProfile; lessons: Lesson[] }) => {
      await storage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    },
  });
  const { mutate: saveData } = saveDataMutation;

  useEffect(() => {
    if (userDataQuery.data) {
      setUserProfile(userDataQuery.data.userProfile);
      setLessons(userDataQuery.data.lessons);
    }
  }, [userDataQuery.data]);

  const updateLessonProgress = useCallback((lessonId: string, progress: number, completed: boolean) => {
    const updatedLessons = lessons.map((lesson) =>
      lesson.id === lessonId ? { ...lesson, progress, completed } : lesson
    );
    setLessons(updatedLessons);

    const completedCountDiff = completed && !lessons.find((l) => l.id === lessonId)?.completed ? 1 : 0;

    const updatedProfile = {
      ...userProfile,
      progress: {
        ...userProfile.progress,
        totalLessonsCompleted: userProfile.progress.totalLessonsCompleted + completedCountDiff,
      },
    };
    setUserProfile(updatedProfile);

    saveData({ userProfile: updatedProfile, lessons: updatedLessons });
  }, [lessons, userProfile, saveData]);

  const updateDailyProgress = useCallback((minutesToAdd: number) => {
    const updatedProfile = {
      ...userProfile,
      progress: {
        ...userProfile.progress,
        todayMinutes: userProfile.progress.todayMinutes + minutesToAdd,
        totalSpeakingMinutes: userProfile.progress.totalSpeakingMinutes + minutesToAdd,
      },
    };
    setUserProfile(updatedProfile);
    saveData({ userProfile: updatedProfile, lessons });
  }, [userProfile, lessons, saveData]);

  const updateStreak = useCallback((newStreak: number) => {
    const updatedProfile = {
      ...userProfile,
      progress: {
        ...userProfile.progress,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, userProfile.progress.longestStreak),
      },
    };
    setUserProfile(updatedProfile);
    saveData({ userProfile: updatedProfile, lessons });
  }, [userProfile, lessons, saveData]);

  return useMemo(() => ({
    lessons,
    userProfile,
    updateLessonProgress,
    updateDailyProgress,
    updateStreak,
    isLoading: userDataQuery.isLoading,
  }), [lessons, userProfile, updateLessonProgress, updateDailyProgress, updateStreak, userDataQuery.isLoading]);
});
