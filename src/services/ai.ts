/**
 * AI Service - The Intelligence Layer for RozmoWA
 * 
 * This service provides AI-powered content generation capabilities.
 * Currently implements realistic mock generation with 3-second delay.
 * Ready for real AI integration (Claude/GPT) in production.
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface GeneratedQuiz {
  topic: string;
  questions: QuizQuestion[];
  generatedAt: Date;
  metadata: {
    difficulty: string;
    estimatedTime: number; // in minutes
  };
}

/**
 * Contextual question banks for realistic mock generation
 * Organized by topic for intelligent matching
 */
const QUESTION_BANKS: Record<string, QuizQuestion[]> = {
  'present perfect': [
    {
      id: '1',
      question: 'Which sentence correctly uses the present perfect tense?',
      options: [
        'I have visited Paris last year.',
        'I have visited Paris three times.',
        'I am visiting Paris now.',
        'I visited Paris yesterday.'
      ],
      correctAnswer: 1,
      explanation: 'Present perfect connects past actions to the present without specific time markers like "last year" or "yesterday".',
      difficulty: 'intermediate'
    },
    {
      id: '2',
      question: 'Complete: "She ___ her homework yet."',
      options: ["hasn't finished", "didn't finish", "doesn't finish", "won't finish"],
      correctAnswer: 0,
      explanation: '"Yet" is typically used with present perfect in negative sentences and questions to indicate something hasn\'t happened up to now.',
      difficulty: 'beginner'
    },
    {
      id: '3',
      question: 'Which time expression is commonly used with present perfect?',
      options: ['yesterday', 'last week', 'already', 'ago'],
      correctAnswer: 2,
      explanation: '"Already" is used with present perfect to emphasize that something happened sooner than expected.',
      difficulty: 'intermediate'
    },
    {
      id: '4',
      question: 'What is the present perfect form of "go"?',
      options: ['has went', 'have gone', 'has going', 'have go'],
      correctAnswer: 1,
      explanation: 'Present perfect uses "have/has" + past participle. "Gone" is the past participle of "go".',
      difficulty: 'beginner'
    },
    {
      id: '5',
      question: 'When should we use present perfect instead of simple past?',
      options: [
        'When the exact time is specified',
        'When the action is connected to the present',
        'When describing habits',
        'When talking about future plans'
      ],
      correctAnswer: 1,
      explanation: 'Present perfect emphasizes the connection between a past action and the present moment or its current relevance.',
      difficulty: 'advanced'
    }
  ],
  
  'past simple': [
    {
      id: '1',
      question: 'Which sentence is in the past simple tense?',
      options: [
        'I have eaten breakfast.',
        'I am eating breakfast.',
        'I ate breakfast this morning.',
        'I will eat breakfast.'
      ],
      correctAnswer: 2,
      explanation: 'Past simple describes completed actions at a specific time in the past.',
      difficulty: 'beginner'
    },
    {
      id: '2',
      question: 'What is the past simple form of "buy"?',
      options: ['buyed', 'bought', 'buyed', 'buying'],
      correctAnswer: 1,
      explanation: '"Bought" is the irregular past simple form of "buy".',
      difficulty: 'beginner'
    },
    {
      id: '3',
      question: 'Complete: "They ___ to the cinema last night."',
      options: ['go', 'goes', 'went', 'going'],
      correctAnswer: 2,
      explanation: '"Went" is the past simple form of "go", used for completed actions in the past.',
      difficulty: 'beginner'
    },
    {
      id: '4',
      question: 'Which time expression is used with past simple?',
      options: ['since', 'for', 'yesterday', 'yet'],
      correctAnswer: 2,
      explanation: '"Yesterday" indicates a specific time in the past, which requires past simple tense.',
      difficulty: 'intermediate'
    },
    {
      id: '5',
      question: 'How do you form negative sentences in past simple?',
      options: [
        'subject + did + not + base verb',
        'subject + do + not + past verb',
        'subject + have + not + past participle',
        'subject + was + not + verb-ing'
      ],
      correctAnswer: 0,
      explanation: 'Past simple negatives use "did not" (didn\'t) + base form of the verb.',
      difficulty: 'intermediate'
    }
  ],

  'conditionals': [
    {
      id: '1',
      question: 'Which is a first conditional sentence?',
      options: [
        'If I had money, I would travel.',
        'If it rains, I will stay home.',
        'If I were you, I would study more.',
        'If I had studied, I would have passed.'
      ],
      correctAnswer: 1,
      explanation: 'First conditional uses "if + present simple, will + base verb" for real future possibilities.',
      difficulty: 'intermediate'
    },
    {
      id: '2',
      question: 'Complete the second conditional: "If I ___ rich, I would buy a yacht."',
      options: ['am', 'was', 'were', 'will be'],
      correctAnswer: 2,
      explanation: 'Second conditional uses "were" for all subjects when talking about hypothetical situations.',
      difficulty: 'intermediate'
    },
    {
      id: '3',
      question: 'What does the zero conditional express?',
      options: [
        'Future possibilities',
        'Hypothetical situations',
        'General truths and facts',
        'Past regrets'
      ],
      correctAnswer: 2,
      explanation: 'Zero conditional (if + present, present) expresses general truths, scientific facts, and habits.',
      difficulty: 'advanced'
    },
    {
      id: '4',
      question: 'Which conditional talks about past situations that didn\'t happen?',
      options: ['Zero conditional', 'First conditional', 'Second conditional', 'Third conditional'],
      correctAnswer: 3,
      explanation: 'Third conditional (if + past perfect, would have + past participle) discusses unreal past situations.',
      difficulty: 'advanced'
    },
    {
      id: '5',
      question: 'Complete: "If you heat ice, it ___."',
      options: ['will melt', 'would melt', 'melts', 'melted'],
      correctAnswer: 2,
      explanation: 'Zero conditional uses present simple in both clauses for scientific facts and general truths.',
      difficulty: 'intermediate'
    }
  ],

  'vocabulary': [
    {
      id: '1',
      question: 'What is a synonym for "happy"?',
      options: ['sad', 'joyful', 'angry', 'tired'],
      correctAnswer: 1,
      explanation: '"Joyful" means full of happiness and is a direct synonym of "happy".',
      difficulty: 'beginner'
    },
    {
      id: '2',
      question: 'Which word means "to make something better"?',
      options: ['worsen', 'improve', 'destroy', 'ignore'],
      correctAnswer: 1,
      explanation: '"Improve" means to make something better in quality, value, or extent.',
      difficulty: 'beginner'
    },
    {
      id: '3',
      question: 'What is the opposite of "ancient"?',
      options: ['old', 'modern', 'historic', 'traditional'],
      correctAnswer: 1,
      explanation: '"Modern" refers to the present or recent times, opposite of "ancient" (very old).',
      difficulty: 'intermediate'
    },
    {
      id: '4',
      question: 'Which word describes someone who talks a lot?',
      options: ['quiet', 'shy', 'talkative', 'silent'],
      correctAnswer: 2,
      explanation: '"Talkative" describes a person who enjoys talking and speaks frequently.',
      difficulty: 'intermediate'
    },
    {
      id: '5',
      question: 'What does "procrastinate" mean?',
      options: [
        'To finish early',
        'To delay or postpone',
        'To work quickly',
        'To organize efficiently'
      ],
      correctAnswer: 1,
      explanation: '"Procrastinate" means to delay or postpone action, especially without good reason.',
      difficulty: 'advanced'
    }
  ]
};

/**
 * Generate generic questions when topic is not in the question bank
 */
const generateGenericQuestions = (topic: string): QuizQuestion[] => {
  return [
    {
      id: '1',
      question: `What is the most important aspect to understand about ${topic}?`,
      options: [
        'The historical context',
        'The practical applications',
        'The theoretical framework',
        'The common misconceptions'
      ],
      correctAnswer: 1,
      explanation: `Understanding practical applications helps you use ${topic} effectively in real-world situations.`,
      difficulty: 'intermediate'
    },
    {
      id: '2',
      question: `How would you best describe ${topic} to a beginner?`,
      options: [
        'A complex academic concept',
        'A practical skill to develop',
        'An abstract theory',
        'A memorization exercise'
      ],
      correctAnswer: 1,
      explanation: `Approaching ${topic} as a practical skill makes it more accessible and easier to learn.`,
      difficulty: 'beginner'
    },
    {
      id: '3',
      question: `What is a common mistake when learning ${topic}?`,
      options: [
        'Practicing too much',
        'Focusing only on theory without practice',
        'Asking too many questions',
        'Learning too slowly'
      ],
      correctAnswer: 1,
      explanation: `Balance between theory and practice is essential for mastering ${topic}.`,
      difficulty: 'intermediate'
    },
    {
      id: '4',
      question: `Which approach is most effective for mastering ${topic}?`,
      options: [
        'Memorization only',
        'Regular practice and review',
        'Passive observation',
        'Cramming before tests'
      ],
      correctAnswer: 1,
      explanation: `Consistent practice and regular review lead to better retention and understanding of ${topic}.`,
      difficulty: 'intermediate'
    },
    {
      id: '5',
      question: `How does ${topic} relate to everyday communication?`,
      options: [
        'It has no practical use',
        'It\'s only for academic purposes',
        'It enhances clarity and expression',
        'It\'s only for formal situations'
      ],
      correctAnswer: 2,
      explanation: `Understanding ${topic} improves your ability to communicate clearly and effectively in various contexts.`,
      difficulty: 'advanced'
    }
  ];
};

/**
 * Main AI quiz generation function
 * Simulates 3-second AI processing with realistic output
 * 
 * @param topic - The topic for quiz generation
 * @returns Promise<GeneratedQuiz> - Generated quiz with 5 questions
 */
export const generateQuiz = async (topic: string): Promise<GeneratedQuiz> => {
  // Simulate AI thinking time (3 seconds for realistic feel)
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Normalize topic for matching
  const normalizedTopic = topic.toLowerCase().trim();
  
  // Find matching question bank
  let questions: QuizQuestion[];
  const matchedKey = Object.keys(QUESTION_BANKS).find(key => 
    normalizedTopic.includes(key) || key.includes(normalizedTopic)
  );

  if (matchedKey) {
    questions = QUESTION_BANKS[matchedKey];
  } else {
    questions = generateGenericQuestions(topic);
  }

  // Calculate estimated time (1 minute per question)
  const estimatedTime = questions.length;

  return {
    topic,
    questions,
    generatedAt: new Date(),
    metadata: {
      difficulty: 'mixed', // Contains beginner to advanced
      estimatedTime
    }
  };
};

/**
 * Validate quiz generation input
 */
export const validateQuizInput = (topic: string): { valid: boolean; error?: string } => {
  if (!topic || topic.trim().length === 0) {
    return { valid: false, error: 'Please enter a topic' };
  }
  
  if (topic.trim().length < 2) {
    return { valid: false, error: 'Topic must be at least 2 characters' };
  }
  
  if (topic.trim().length > 100) {
    return { valid: false, error: 'Topic must be less than 100 characters' };
  }
  
  return { valid: true };
};
