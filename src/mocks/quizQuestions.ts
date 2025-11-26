import { createSeededRandom, pick, range } from "@/mocks/random";

export type QuizPersona = "student" | "teacher" | "admin";
export type QuizStatus = "not-started" | "in-progress" | "completed" | "payment_failed";

export interface QuizQuestion {
  id: number;
  questionText: string;
  sentence: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
  difficulty: string;
  status?: QuizStatus;
  attempts?: number;
  averageScore?: number;
  rewardPoints?: number;
}

const questionBank: Omit<QuizQuestion, "id" | "status" | "attempts" | "averageScore" | "rewardPoints">[] = [
  {
    questionText: 'Choose the correct verb form to complete the sentence.',
    sentence: 'She _______ to the store every morning.',
    options: ['Go', 'Goes', 'Going', 'Gone'],
    correctAnswer: 'Goes',
    explanation: '"Goes" is the correct present tense form for a third-person singular subject like "She".',
    category: 'Grammar',
    difficulty: 'Beginner'
  },
  {
    questionText: 'Select the correct article to complete the sentence.',
    sentence: 'I saw _______ elephant at the zoo yesterday.',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 'an',
    explanation: 'We use "an" before words that start with a vowel sound, like "elephant".',
    category: 'Grammar',
    difficulty: 'Beginner'
  },
  {
    questionText: 'Choose the correct preposition.',
    sentence: 'The meeting is scheduled _______ 3 PM.',
    options: ['in', 'on', 'at', 'by'],
    correctAnswer: 'at',
    explanation: 'We use "at" with specific times of the day.',
    category: 'Grammar',
    difficulty: 'Elementary'
  },
  {
    questionText: 'Select the correct past tense form.',
    sentence: 'Yesterday, I _______ to the library.',
    options: ['go', 'goes', 'went', 'going'],
    correctAnswer: 'went',
    explanation: '"Went" is the simple past tense of the irregular verb "go".',
    category: 'Grammar',
    difficulty: 'Elementary'
  },
  {
    questionText: 'Choose the correct form of the adjective.',
    sentence: 'This book is _______ than that one.',
    options: ['interesting', 'more interesting', 'most interesting', 'interestinger'],
    correctAnswer: 'more interesting',
    explanation: 'For adjectives with three or more syllables, we use "more" to form the comparative.',
    category: 'Grammar',
    difficulty: 'Pre-Intermediate'
  },
  {
    questionText: 'Select the correct modal verb.',
    sentence: 'You _______ wear a seatbelt when driving.',
    options: ['can', 'must', 'might', 'would'],
    correctAnswer: 'must',
    explanation: '"Must" expresses strong obligation or necessity.',
    category: 'Grammar',
    difficulty: 'Pre-Intermediate'
  },
  {
    questionText: 'Choose the correct conditional form.',
    sentence: 'If I _______ more time, I would travel around the world.',
    options: ['have', 'had', 'will have', 'would have'],
    correctAnswer: 'had',
    explanation: 'This is a second conditional sentence, which uses "if + past simple" in the condition clause.',
    category: 'Grammar',
    difficulty: 'Intermediate'
  },
  {
    questionText: 'Select the correct passive voice form.',
    sentence: 'The report _______ by the manager tomorrow.',
    options: ['is reviewed', 'was reviewed', 'will be reviewed', 'has been reviewed'],
    correctAnswer: 'will be reviewed',
    explanation: 'Future passive voice uses "will be" + past participle.',
    category: 'Grammar',
    difficulty: 'Intermediate'
  },
  {
    questionText: 'Choose the correct phrasal verb.',
    sentence: 'I need to _______ this information before the meeting.',
    options: ['look up', 'look after', 'look into', 'look for'],
    correctAnswer: 'look up',
    explanation: '"Look up" means to search for information, typically in a reference source.',
    category: 'Vocabulary',
    difficulty: 'Intermediate'
  },
  {
    questionText: 'Select the correct reported speech form.',
    sentence: 'She said, "I am going to the store." → She said that she _______ to the store.',
    options: ['is going', 'was going', 'will go', 'goes'],
    correctAnswer: 'was going',
    explanation: 'In reported speech, present continuous "am going" changes to past continuous "was going".',
    category: 'Grammar',
    difficulty: 'Upper-Intermediate'
  },
  {
    questionText: 'Choose the correct subjunctive form.',
    sentence: 'It is essential that he _______ on time for the interview.',
    options: ['is', 'be', 'will be', 'was'],
    correctAnswer: 'be',
    explanation: 'The subjunctive mood uses the base form of the verb after expressions like "it is essential that".',
    category: 'Grammar',
    difficulty: 'Advanced'
  },
  {
    questionText: 'Select the correct idiomatic expression.',
    sentence: 'After months of preparation, the project finally _______.',
    options: ['hit the nail on the head', 'came to fruition', 'broke the ice', 'spilled the beans'],
    correctAnswer: 'came to fruition',
    explanation: '"Came to fruition" means that something planned or worked on has been successfully completed or realized.',
    category: 'Vocabulary',
    difficulty: 'Advanced'
  },
  {
    questionText: 'Choose the correct word order in the question.',
    sentence: 'Which sentence is grammatically correct?',
    options: [
      'Where did you go yesterday?',
      'Where you did go yesterday?',
      'Where you went yesterday?',
      'Where did you went yesterday?'
    ],
    correctAnswer: 'Where did you go yesterday?',
    explanation: 'In questions with "did", we use the base form of the main verb.',
    category: 'Grammar',
    difficulty: 'Elementary'
  },
  {
    questionText: 'Select the correct relative pronoun.',
    sentence: 'The person _______ called you is waiting outside.',
    options: ['who', 'which', 'whom', 'whose'],
    correctAnswer: 'who',
    explanation: '"Who" is used as a subject relative pronoun for people.',
    category: 'Grammar',
    difficulty: 'Pre-Intermediate'
  },
  {
    questionText: 'Choose the correct gerund or infinitive form.',
    sentence: 'I enjoy _______ books in my free time.',
    options: ['read', 'to read', 'reading', 'reads'],
    correctAnswer: 'reading',
    explanation: 'The verb "enjoy" is followed by a gerund (verb + -ing).',
    category: 'Grammar',
    difficulty: 'Intermediate'
  },
  {
    questionText: 'Select the correct quantifier.',
    sentence: 'There are _______ students in the classroom today.',
    options: ['much', 'many', 'a lot', 'few'],
    correctAnswer: 'many',
    explanation: '"Many" is used with countable nouns in affirmative sentences to indicate a large number.',
    category: 'Grammar',
    difficulty: 'Elementary'
  },
  {
    questionText: 'Choose the correct perfect tense form.',
    sentence: 'By next year, I _______ in this company for ten years.',
    options: ['work', 'worked', 'will have worked', 'have worked'],
    correctAnswer: 'will have worked',
    explanation: 'Future perfect tense is used for actions that will be completed before a specific time in the future.',
    category: 'Grammar',
    difficulty: 'Upper-Intermediate'
  },
  {
    questionText: 'Select the correct collocation.',
    sentence: 'She has a _______ understanding of quantum physics.',
    options: ['deep', 'high', 'strong', 'big'],
    correctAnswer: 'deep',
    explanation: '"Deep understanding" is the correct collocation to express thorough comprehension.',
    category: 'Vocabulary',
    difficulty: 'Advanced'
  },
  {
    questionText: 'Choose the correct conjunction.',
    sentence: 'We decided to stay home _______ it was raining.',
    options: ['because', 'so', 'but', 'although'],
    correctAnswer: 'because',
    explanation: '"Because" introduces a reason for the decision.',
    category: 'Grammar',
    difficulty: 'Elementary'
  },
  {
    questionText: 'Select the correct tense for future plans.',
    sentence: 'I _______ to visit my grandparents this weekend.',
    options: ['am going', 'go', 'will', 'have gone'],
    correctAnswer: 'am going',
    explanation: '"Am going" expresses a planned future action.',
    category: 'Grammar',
    difficulty: 'Beginner'
  }
];

const statusPool: QuizStatus[] = ["completed", "in-progress", "not-started", "payment_failed"];

const buildQuizQuestion = (
  id: number,
  persona: QuizPersona,
  rand: ReturnType<typeof createSeededRandom>,
): QuizQuestion => {
  const template = pick(questionBank, rand);
  const status = pick(statusPool, rand);
  const attempts = status === "not-started" ? 0 : 1 + Math.floor(rand() * 3);
  const averageScore = status === "completed" ? 80 + Math.floor(rand() * 20) : 40 + Math.floor(rand() * 40);
  const rewardPoints = 10 + Math.floor(rand() * 90);

  return {
    ...template,
    id,
    questionText: `${template.questionText} [${persona}]`,
    sentence: template.sentence,
    status,
    attempts,
    averageScore,
    rewardPoints,
  };
};

export const createQuizQuestions = (persona: QuizPersona = "student", seed = 707): QuizQuestion[] => {
  const rand = createSeededRandom(seed);
  return range(10).map((index) => buildQuizQuestion(index + 1, persona, rand));
};

export const createRandomQuizQuestions = (count = 8, seed = 202): QuizQuestion[] => {
  const rand = createSeededRandom(seed);
  return range(count).map((index) => buildQuizQuestion(index + 1, pick(["student", "teacher", "admin"], rand), rand));
};

export const quizQuestions = createQuizQuestions();
