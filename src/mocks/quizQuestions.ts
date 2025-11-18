export interface QuizQuestion {
  id: number;
  questionText: string;
  sentence: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
  difficulty: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    questionText: 'Choose the correct verb form to complete the sentence.',
    sentence: 'She _______ to the store every morning.',
    options: ['Go', 'Goes', 'Going', 'Gone'],
    correctAnswer: 'Goes',
    explanation: '"Goes" is the correct present tense form for a third-person singular subject like "She".',
    category: 'Grammar',
    difficulty: 'Beginner'
  },
  {
    id: 2,
    questionText: 'Select the correct article to complete the sentence.',
    sentence: 'I saw _______ elephant at the zoo yesterday.',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 'an',
    explanation: 'We use "an" before words that start with a vowel sound, like "elephant".',
    category: 'Grammar',
    difficulty: 'Beginner'
  },
  {
    id: 3,
    questionText: 'Choose the correct preposition.',
    sentence: 'The meeting is scheduled _______ 3 PM.',
    options: ['in', 'on', 'at', 'by'],
    correctAnswer: 'at',
    explanation: 'We use "at" with specific times of the day.',
    category: 'Grammar',
    difficulty: 'Elementary'
  },
  {
    id: 4,
    questionText: 'Select the correct past tense form.',
    sentence: 'Yesterday, I _______ to the library.',
    options: ['go', 'goes', 'went', 'going'],
    correctAnswer: 'went',
    explanation: '"Went" is the simple past tense of the irregular verb "go".',
    category: 'Grammar',
    difficulty: 'Elementary'
  },
  {
    id: 5,
    questionText: 'Choose the correct form of the adjective.',
    sentence: 'This book is _______ than that one.',
    options: ['interesting', 'more interesting', 'most interesting', 'interestinger'],
    correctAnswer: 'more interesting',
    explanation: 'For adjectives with three or more syllables, we use "more" to form the comparative.',
    category: 'Grammar',
    difficulty: 'Pre-Intermediate'
  },
  {
    id: 6,
    questionText: 'Select the correct modal verb.',
    sentence: 'You _______ wear a seatbelt when driving.',
    options: ['can', 'must', 'might', 'would'],
    correctAnswer: 'must',
    explanation: '"Must" expresses strong obligation or necessity.',
    category: 'Grammar',
    difficulty: 'Pre-Intermediate'
  },
  {
    id: 7,
    questionText: 'Choose the correct conditional form.',
    sentence: 'If I _______ more time, I would travel around the world.',
    options: ['have', 'had', 'will have', 'would have'],
    correctAnswer: 'had',
    explanation: 'This is a second conditional sentence, which uses "if + past simple" in the condition clause.',
    category: 'Grammar',
    difficulty: 'Intermediate'
  },
  {
    id: 8,
    questionText: 'Select the correct passive voice form.',
    sentence: 'The report _______ by the manager tomorrow.',
    options: ['is reviewed', 'was reviewed', 'will be reviewed', 'has been reviewed'],
    correctAnswer: 'will be reviewed',
    explanation: 'Future passive voice uses "will be" + past participle.',
    category: 'Grammar',
    difficulty: 'Intermediate'
  },
  {
    id: 9,
    questionText: 'Choose the correct phrasal verb.',
    sentence: 'I need to _______ this information before the meeting.',
    options: ['look up', 'look after', 'look into', 'look for'],
    correctAnswer: 'look up',
    explanation: '"Look up" means to search for information, typically in a reference source.',
    category: 'Vocabulary',
    difficulty: 'Intermediate'
  },
  {
    id: 10,
    questionText: 'Select the correct reported speech form.',
    sentence: 'She said, "I am going to the store." → She said that she _______ to the store.',
    options: ['is going', 'was going', 'will go', 'goes'],
    correctAnswer: 'was going',
    explanation: 'In reported speech, present continuous "am going" changes to past continuous "was going".',
    category: 'Grammar',
    difficulty: 'Upper-Intermediate'
  },
  {
    id: 11,
    questionText: 'Choose the correct subjunctive form.',
    sentence: 'It is essential that he _______ on time for the interview.',
    options: ['is', 'be', 'will be', 'was'],
    correctAnswer: 'be',
    explanation: 'The subjunctive mood uses the base form of the verb after expressions like "it is essential that".',
    category: 'Grammar',
    difficulty: 'Advanced'
  },
  {
    id: 12,
    questionText: 'Select the correct idiomatic expression.',
    sentence: 'After months of preparation, the project finally _______.',
    options: ['hit the nail on the head', 'came to fruition', 'broke the ice', 'spilled the beans'],
    correctAnswer: 'came to fruition',
    explanation: '"Came to fruition" means that something planned or worked on has been successfully completed or realized.',
    category: 'Vocabulary',
    difficulty: 'Advanced'
  },
  {
    id: 13,
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
    id: 14,
    questionText: 'Select the correct relative pronoun.',
    sentence: 'The person _______ called you is waiting outside.',
    options: ['who', 'which', 'whom', 'whose'],
    correctAnswer: 'who',
    explanation: '"Who" is used as a subject relative pronoun for people.',
    category: 'Grammar',
    difficulty: 'Pre-Intermediate'
  },
  {
    id: 15,
    questionText: 'Choose the correct gerund or infinitive form.',
    sentence: 'I enjoy _______ books in my free time.',
    options: ['read', 'to read', 'reading', 'reads'],
    correctAnswer: 'reading',
    explanation: 'The verb "enjoy" is followed by a gerund (verb + -ing).',
    category: 'Grammar',
    difficulty: 'Intermediate'
  },
  {
    id: 16,
    questionText: 'Select the correct quantifier.',
    sentence: 'There are _______ students in the classroom today.',
    options: ['much', 'many', 'a lot', 'few'],
    correctAnswer: 'many',
    explanation: '"Many" is used with countable nouns in affirmative sentences to indicate a large number.',
    category: 'Grammar',
    difficulty: 'Elementary'
  },
  {
    id: 17,
    questionText: 'Choose the correct perfect tense form.',
    sentence: 'By next year, I _______ in this company for ten years.',
    options: ['work', 'worked', 'will have worked', 'have worked'],
    correctAnswer: 'will have worked',
    explanation: 'Future perfect tense is used for actions that will be completed before a specific time in the future.',
    category: 'Grammar',
    difficulty: 'Upper-Intermediate'
  },
  {
    id: 18,
    questionText: 'Select the correct collocation.',
    sentence: 'She has a _______ understanding of quantum physics.',
    options: ['deep', 'high', 'strong', 'big'],
    correctAnswer: 'deep',
    explanation: '"Deep understanding" is the correct collocation to express thorough comprehension.',
    category: 'Vocabulary',
    difficulty: 'Advanced'
  },
  {
    id: 19,
    questionText: 'Choose the correct conjunction.',
    sentence: 'I will go to the party _______ I finish my homework.',
    options: ['because', 'although', 'if', 'unless'],
    correctAnswer: 'if',
    explanation: '"If" introduces a condition that must be met for the main action to occur.',
    category: 'Grammar',
    difficulty: 'Pre-Intermediate'
  },
  {
    id: 20,
    questionText: 'Select the correct word to complete the sentence.',
    sentence: 'The company\'s profits have increased _______ over the past year.',
    options: ['substantially', 'substantially', 'substantive', 'substance'],
    correctAnswer: 'substantially',
    explanation: '"Substantially" is an adverb meaning "to a great or significant extent".',
    category: 'Vocabulary',
    difficulty: 'Upper-Intermediate'
  }
];
