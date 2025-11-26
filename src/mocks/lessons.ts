import { createSeededRandom, pick, range } from "@/mocks/random";
import { Lesson, LessonEnrollmentStatus, LessonPaymentStatus } from "@/types/learning";

export type LessonPersona = "student" | "teacher" | "admin";

interface LessonTemplate {
  title: string;
  description: string;
  duration: number;
  level: string;
  category: string;
}

const templates: LessonTemplate[] = [
  {
    title: "Introduction to English Basics",
    description: "Learn fundamental English grammar and vocabulary",
    duration: 30,
    level: "Beginner",
    category: "Grammar",
  },
  {
    title: "Everyday Conversations",
    description: "Practice common phrases and dialogues",
    duration: 25,
    level: "Beginner",
    category: "Speaking",
  },
  {
    title: "Business English Essentials",
    description: "Professional communication skills",
    duration: 40,
    level: "Intermediate",
    category: "Business",
  },
  {
    title: "Advanced Grammar Structures",
    description: "Master complex grammatical concepts",
    duration: 45,
    level: "Advanced",
    category: "Grammar",
  },
  {
    title: "Pronunciation Practice",
    description: "Improve your English accent and clarity",
    duration: 20,
    level: "All Levels",
    category: "Pronunciation",
  },
];

const enrollmentStates: LessonEnrollmentStatus[] = [
  "completed",
  "active",
  "trial",
  "payment_failed",
  "not_enrolled",
];

const paymentStates: LessonPaymentStatus[] = ["paid", "pending", "failed", "refunded"];

const buildLesson = (
  id: string,
  template: LessonTemplate,
  persona: LessonPersona,
  rand: ReturnType<typeof createSeededRandom>,
  index: number,
): Lesson => {
  const enrollmentStatus = pick(enrollmentStates, rand);
  const paymentStatus = enrollmentStatus === "payment_failed" ? "failed" : pick(paymentStates, rand);
  const completed = enrollmentStatus === "completed";
  const zeroProgress = enrollmentStatus === "not_enrolled" || enrollmentStatus === "payment_failed";
  const progress = completed ? 100 : zeroProgress ? 0 : Math.floor(rand() * 80) + 10;
  const price = 15 + Math.floor(rand() * 60);
  const currency = "USD";

  return {
    id,
    title: `${template.title} (${persona.toUpperCase()} track)`,
    description: `${template.description} tailored for ${persona}s`,
    duration: template.duration + Math.floor(rand() * 10),
    level: template.level,
    progress: Math.min(progress, 100),
    completed,
    category: template.category,
    enrollmentStatus,
    price,
    currency,
    paymentStatus,
    lastAccessed: new Date(Date.now() - (index + 1) * 60 * 60 * 1000),
  };
};

export const createLessons = (persona: LessonPersona = "student", seed = 2024): Lesson[] => {
  const rand = createSeededRandom(seed);

  return templates.map((template, index) => buildLesson(`${persona}-${index + 1}`, template, persona, rand, index));
};

export const createRandomLessons = (count = 7, seed = 9090): Lesson[] => {
  const rand = createSeededRandom(seed);
  return range(count).map((i) => buildLesson(`random-${i}`, pick(templates, rand), pick(["student", "teacher", "admin"], rand), rand, i));
};

export const mockLessons = createLessons();
