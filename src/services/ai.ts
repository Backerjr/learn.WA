/**
 * AI Service - The Intelligence Layer for RozmoWA
 * 
 * This service provides AI-powered content generation capabilities.
 * Currently implements realistic mock generation with 3-second delay.
 * Ready for real AI integration (Claude/GPT) in production.
 */

export type FocusMode = 'vocab' | 'grammar' | 'comprehension';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface AISuggestedAction {
  label: string;
  description?: string;
  href?: string;
}

export interface AIResponse<T = unknown> {
  content: T;
  confidence: number;
  suggested_actions: AISuggestedAction[];
}

export interface MockAIConfig {
  minDelayMs?: number;
  maxDelayMs?: number;
  fixedDelayMs?: number;
  errorRate?: number;
  forceError?: boolean;
  confidence?: number;
  suggestedActions?: AISuggestedAction[];
  random?: () => number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  tags: string[];
  difficulty?: DifficultyLevel;
  createdAt: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: DifficultyLevel;
}

export interface GeneratedQuiz {
  topic: string;
  questions: QuizQuestion[];
  generatedAt: Date;
  metadata: {
    difficulty: string;
    estimatedTime: number;
    sourceText?: string;
    focusMode?: FocusMode;
  };
}

export interface GenerateQuizOptions {
  topic?: string;
  sourceText?: string;
  focusMode?: FocusMode;
  difficulty?: DifficultyLevel;
  questionCount?: number;
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

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const DEFAULT_SUGGESTED_ACTIONS: AISuggestedAction[] = [
  {
    label: 'Regenerate',
    description: 'Try a fresh version of the request with tweaks to the prompt'
  },
  {
    label: 'Tighten focus',
    description: 'Adjust the focus mode or difficulty for a sharper result'
  },
  {
    label: 'Save to library',
    description: 'Store the generated content for reuse across lessons'
  }
];

export const mockAIService = async <T>(
  producer: () => Promise<T> | T,
  config: MockAIConfig = {}
): Promise<AIResponse<T>> => {
  const {
    minDelayMs = 500,
    maxDelayMs = 1500,
    fixedDelayMs,
    errorRate = 0.05,
    forceError = false,
    confidence,
    suggestedActions,
    random = Math.random
  } = config;

  const boundedMin = Math.max(0, minDelayMs);
  const boundedMax = Math.max(boundedMin, maxDelayMs);
  const delay = fixedDelayMs ?? Math.round(boundedMin + (boundedMax - boundedMin) * random());
  await sleep(delay);

  const shouldError = forceError || random() < errorRate;
  if (shouldError) {
    throw new Error('Mock AI service error: simulated transient failure');
  }

  const content = await Promise.resolve(producer());
  const computedConfidence = typeof confidence === 'number'
    ? Math.min(1, Math.max(0, confidence))
    : Math.min(0.95, Math.max(0.6, 0.65 + random() * 0.3));

  return {
    content,
    confidence: Number(computedConfidence.toFixed(2)),
    suggested_actions: suggestedActions ?? DEFAULT_SUGGESTED_ACTIONS
  };
};

/**
 * Generate context-aware questions based on source text and focus mode
 */
const generateContextAwareQuestions = (
  sourceText: string | undefined,
  focusMode: FocusMode | undefined,
  difficulty: DifficultyLevel,
  count: number
): QuizQuestion[] => {
  const hasSource = sourceText && sourceText.trim().length > 20;
  
  if (focusMode === 'vocab') {
    return generateVocabQuestions(sourceText, difficulty, count);
  } else if (focusMode === 'grammar') {
    return generateGrammarQuestions(sourceText, difficulty, count);
  } else if (focusMode === 'comprehension' && hasSource) {
    return generateComprehensionQuestions(sourceText!, difficulty, count);
  }
  
  return generateGenericQuestions(sourceText || 'English', difficulty, count);
};

const generateVocabQuestions = (sourceText: string | undefined, difficulty: DifficultyLevel, count: number): QuizQuestion[] => {
  const hasSource = sourceText && sourceText.trim().length > 20;
  const prefix = hasSource ? 'According to the text, ' : '';
  
  const vocabPool = [
    {
      question: `${prefix}What does the word "proficient" mean?`,
      options: ['Skilled and competent', 'Beginner level', 'Uninterested', 'Confused'],
      correctAnswer: 0,
      explanation: hasSource ? 'In the text, "proficient" refers to someone who is skilled and competent in a particular area.' : '"Proficient" means having or showing knowledge and skill and competence.',
      difficulty
    },
    {
      question: `${prefix}Which word is a synonym for "articulate"?`,
      options: ['Silent', 'Eloquent', 'Confused', 'Hesitant'],
      correctAnswer: 1,
      explanation: hasSource ? 'The text uses "articulate" to describe clear, eloquent expression.' : '"Articulate" and "eloquent" both describe the ability to express ideas clearly and effectively.',
      difficulty
    },
    {
      question: `${prefix}What is the meaning of "comprehensive"?`,
      options: ['Limited', 'Brief', 'Complete and thorough', 'Superficial'],
      correctAnswer: 2,
      explanation: hasSource ? 'In this context, "comprehensive" indicates a complete and thorough coverage.' : '"Comprehensive" means including all or nearly all elements or aspects of something.',
      difficulty
    },
    {
      question: `${prefix}The word "pedagogical" relates to:`,
      options: ['Medical practice', 'Teaching methods', 'Legal systems', 'Financial planning'],
      correctAnswer: 1,
      explanation: hasSource ? 'The text discusses pedagogical approaches, referring to teaching methodologies.' : '"Pedagogical" relates to the methods and practice of teaching.',
      difficulty
    },
    {
      question: `${prefix}What does "facilitate" mean in educational contexts?`,
      options: ['To complicate', 'To make easier or help forward', 'To prevent', 'To evaluate'],
      correctAnswer: 1,
      explanation: hasSource ? 'The text describes facilitating learning, meaning to make the process easier.' : '"Facilitate" means to make an action or process easy or easier.',
      difficulty
    }
  ];
  
  return vocabPool.slice(0, count).map((q, idx) => ({ ...q, id: String(idx + 1) }));
};

const generateGrammarQuestions = (sourceText: string | undefined, difficulty: DifficultyLevel, count: number): QuizQuestion[] => {
  const hasSource = sourceText && sourceText.trim().length > 20;
  const prefix = hasSource ? 'Based on the text structure, ' : '';
  
  const grammarPool = [
    {
      question: `${prefix}Identify the correct use of the present perfect tense:`,
      options: [
        'She has completed the assessment yesterday',
        'She has completed the assessment',
        'She completed the assessment since morning',
        'She is completing the assessment already'
      ],
      correctAnswer: 1,
      explanation: hasSource ? 'The text demonstrates proper present perfect usage without specific time markers.' : 'Present perfect uses "has/have + past participle" without specific past time references.',
      difficulty
    },
    {
      question: `${prefix}Which sentence demonstrates proper subject-verb agreement?`,
      options: [
        'The group of students are learning',
        'The group of students is learning',
        'The group of students were learning',
        'The group of students be learning'
      ],
      correctAnswer: 1,
      explanation: hasSource ? 'The text maintains grammatical consistency with collective nouns.' : 'When "group" is the subject (singular), the verb should be singular: "is learning".',
      difficulty
    },
    {
      question: `${prefix}Identify the sentence with correct conditional structure:`,
      options: [
        'If I would study, I will pass',
        'If I study, I will pass',
        'If I will study, I pass',
        'If I studied, I will have passed'
      ],
      correctAnswer: 1,
      explanation: hasSource ? 'The text uses first conditional correctly: if + present simple, will + base verb.' : 'First conditional uses "if + present simple" in the condition clause and "will + base verb" in the result.',
      difficulty
    },
    {
      question: `${prefix}Which phrase uses the passive voice correctly?`,
      options: [
        'The assessment is conducting by teachers',
        'The assessment is conducted by teachers',
        'The assessment conducted by teachers',
        'The assessment is conduct by teachers'
      ],
      correctAnswer: 1,
      explanation: hasSource ? 'The text employs passive voice structure: be + past participle.' : 'Passive voice requires "be verb + past participle": "is conducted".',
      difficulty
    },
    {
      question: `${prefix}Choose the sentence with proper article usage:`,
      options: [
        'The education is important for society',
        'Education is important for the society',
        'Education is important for society',
        'The education is important for the society'
      ],
      correctAnswer: 2,
      explanation: hasSource ? 'The text uses articles appropriately for abstract and general concepts.' : 'Abstract nouns like "education" and "society" used generally don\'t require articles.',
      difficulty
    }
  ];
  
  return grammarPool.slice(0, count).map((q, idx) => ({ ...q, id: String(idx + 1) }));
};

const generateComprehensionQuestions = (sourceText: string, difficulty: DifficultyLevel, count: number): QuizQuestion[] => {
  const firstWords = sourceText.split(' ').slice(0, 15).join(' ');
  
  const comprehensionPool = [
    {
      question: 'According to the text, what is the primary focus of the material?',
      options: [
        'Historical background',
        'Practical application and understanding',
        'Theoretical debate',
        'Statistical analysis'
      ],
      correctAnswer: 1,
      explanation: 'The text emphasizes practical understanding and application of the concepts presented.',
      difficulty
    },
    {
      question: 'What can be inferred from the main argument presented in the text?',
      options: [
        'The topic is purely theoretical',
        'Real-world application is valuable',
        'The subject is outdated',
        'No further study is needed'
      ],
      correctAnswer: 1,
      explanation: 'The text suggests that understanding the practical implications is essential.',
      difficulty
    },
    {
      question: 'The text opening discusses:',
      options: [
        firstWords.substring(0, 40) + '...',
        'Completely unrelated content',
        'Statistical data only',
        'Historical events exclusively'
      ],
      correctAnswer: 0,
      explanation: 'The text begins by establishing context with the provided material.',
      difficulty
    },
    {
      question: 'What is the author\'s tone in presenting the material?',
      options: [
        'Dismissive and critical',
        'Informative and educational',
        'Angry and confrontational',
        'Humorous and casual'
      ],
      correctAnswer: 1,
      explanation: 'The text maintains an educational tone, aimed at clear communication of concepts.',
      difficulty
    },
    {
      question: 'Based on the text, what would be a logical next step for the reader?',
      options: [
        'Ignore the information',
        'Apply the concepts in practice',
        'Argue against the content',
        'Memorize without understanding'
      ],
      correctAnswer: 1,
      explanation: 'The text encourages practical application and deeper engagement with the material.',
      difficulty
    }
  ];
  
  return comprehensionPool.slice(0, count).map((q, idx) => ({ ...q, id: String(idx + 1) }));
};

const generateGenericQuestions = (topic: string, difficulty: DifficultyLevel, count: number): QuizQuestion[] => {
  const genericPool = [
    {
      question: `What is the most important aspect to understand about ${topic}?`,
      options: [
        'The historical context',
        'The practical applications',
        'The theoretical framework',
        'The common misconceptions'
      ],
      correctAnswer: 1,
      explanation: `Understanding practical applications helps you use ${topic} effectively in real-world situations.`,
      difficulty
    },
    {
      question: `How would you best describe ${topic} to a beginner?`,
      options: [
        'A complex academic concept',
        'A practical skill to develop',
        'An abstract theory',
        'A memorization exercise'
      ],
      correctAnswer: 1,
      explanation: `Approaching ${topic} as a practical skill makes it more accessible and easier to learn.`,
      difficulty
    },
    {
      question: `What is a common mistake when learning ${topic}?`,
      options: [
        'Practicing too much',
        'Focusing only on theory without practice',
        'Asking too many questions',
        'Learning too slowly'
      ],
      correctAnswer: 1,
      explanation: `Balance between theory and practice is essential for mastering ${topic}.`,
      difficulty
    },
    {
      question: `Which approach is most effective for mastering ${topic}?`,
      options: [
        'Memorization only',
        'Regular practice and review',
        'Passive observation',
        'Cramming before tests'
      ],
      correctAnswer: 1,
      explanation: `Consistent practice and regular review lead to better retention and understanding of ${topic}.`,
      difficulty
    },
    {
      question: `How does ${topic} relate to everyday communication?`,
      options: [
        'It has no practical use',
        'It\'s only for academic purposes',
        'It enhances clarity and expression',
        'It\'s only for formal situations'
      ],
      correctAnswer: 2,
      explanation: `Understanding ${topic} improves your ability to communicate clearly and effectively in various contexts.`,
      difficulty
    }
  ];
  
  return genericPool.slice(0, count).map((q, idx) => ({ ...q, id: String(idx + 1) }));
};

const buildQuiz = (options: GenerateQuizOptions): GeneratedQuiz => {
  const {
    topic = 'English Language',
    sourceText,
    focusMode,
    difficulty = 'intermediate',
    questionCount = 5
  } = options;

  let questions: QuizQuestion[];
  const normalizedTopic = topic.toLowerCase().trim();

  if ((sourceText && sourceText.trim().length > 20) || focusMode) {
    questions = generateContextAwareQuestions(sourceText, focusMode, difficulty, questionCount);
  } else {
    const matchedKey = Object.keys(QUESTION_BANKS).find(key =>
      normalizedTopic.includes(key) || key.includes(normalizedTopic)
    );

    if (matchedKey) {
      questions = QUESTION_BANKS[matchedKey].slice(0, questionCount);
    } else {
      questions = generateGenericQuestions(topic, difficulty, questionCount);
    }
  }

  const estimatedTime = Math.ceil(questions.length * 1.5);

  return {
    topic,
    questions,
    generatedAt: new Date(),
    metadata: {
      difficulty,
      estimatedTime,
      sourceText,
      focusMode
    }
  };
};

const buildQuizSuggestedActions = (topic?: string, focusMode?: FocusMode): AISuggestedAction[] => [
  {
    label: 'Refine topic',
    description: `Narrow or broaden the topic${topic ? ` for ${topic}` : ''} to adjust coverage`
  },
  {
    label: 'Adjust focus',
    description: `Switch focus mode${focusMode ? ` from ${focusMode}` : ''} to diversify questions`
  },
  {
    label: 'Tweak difficulty',
    description: 'Regenerate with easier or harder prompts to match learners'
  }
];

const requestQuizWithMockService = (
  options: GenerateQuizOptions,
  mockConfig?: MockAIConfig
): Promise<AIResponse<GeneratedQuiz>> =>
  mockAIService(() => buildQuiz(options), {
    ...mockConfig,
    suggestedActions: mockConfig?.suggestedActions ?? buildQuizSuggestedActions(options.topic, options.focusMode)
  });

/**
 * Context-Aware Quiz Generation
 * Accepts source text and focus mode for intelligent assessment creation
 *
 * @param options - Configuration object
 * @returns Promise<GeneratedQuiz> - Context-aware generated quiz
 */
export const generateQuiz = async (
  options: GenerateQuizOptions,
  mockConfig?: MockAIConfig
): Promise<GeneratedQuiz> => {
  const response = await requestQuizWithMockService(options, mockConfig);
  return response.content;
};

export const generateQuizAIResponse = (
  options: GenerateQuizOptions,
  mockConfig?: MockAIConfig
): Promise<AIResponse<GeneratedQuiz>> => requestQuizWithMockService(options, mockConfig);

/**
 * Validate quiz generation input
 */
export const validateQuizInput = (options: {
  topic?: string;
  sourceText?: string;
  questionCount?: number;
}): { valid: boolean; error?: string } => {
  const { topic, sourceText, questionCount } = options;
  
  // At least topic or source text must be provided
  if ((!topic || topic.trim().length === 0) && (!sourceText || sourceText.trim().length === 0)) {
    return { valid: false, error: 'Please provide either a topic or source material' };
  }
  
  if (topic && topic.trim().length > 100) {
    return { valid: false, error: 'Topic must be less than 100 characters' };
  }
  
  if (questionCount && (questionCount < 1 || questionCount > 200)) {
    return { valid: false, error: 'Question count must be between 1 and 200' };
  }
  
  return { valid: true };
};

/**
 * THE INFINITE BRAIN - Procedural Generation Engine
 * Mad-Libs Algorithm for generating 200+ unique questions
 */

const PROCEDURAL_TEMPLATES = {
  subjects: [
    'students', 'learners', 'educators', 'professionals', 'beginners', 
    'scholars', 'practitioners', 'researchers', 'individuals', 'experts',
    'teachers', 'writers', 'speakers', 'readers', 'analysts'
  ],
  verbs: [
    'analyze', 'evaluate', 'understand', 'identify', 'demonstrate', 
    'explain', 'apply', 'compare', 'synthesize', 'interpret',
    'recognize', 'distinguish', 'formulate', 'justify', 'assess'
  ],
  contexts: [
    'in academic settings', 'in professional contexts', 'in real-world scenarios',
    'in formal writing', 'in everyday communication', 'in technical documentation',
    'in literary analysis', 'in research papers', 'in presentations',
    'in collaborative work', 'in critical thinking', 'in problem-solving'
  ],
  modifiers: [
    'effectively', 'accurately', 'precisely', 'clearly', 'systematically',
    'thoroughly', 'critically', 'creatively', 'logically', 'coherently',
    'consistently', 'objectively', 'comprehensively', 'strategically', 'analytically'
  ],
  topics: [
    'grammar structures', 'vocabulary development', 'reading comprehension',
    'writing mechanics', 'language patterns', 'text analysis', 'communication skills',
    'linguistic features', 'discourse markers', 'rhetorical devices'
  ]
};

const PROCEDURAL_OPTIONS_POOL = [
  'By memorizing rules without context',
  'Through practical application and examples',
  'By ignoring contextual clues',
  'Using systematic analysis techniques',
  'Through passive observation only',
  'By combining multiple strategies',
  'Through isolated practice drills',
  'Using real-world applications',
  'By following prescriptive rules strictly',
  'Through iterative refinement',
  'By avoiding complex examples',
  'Using evidence-based reasoning',
  'Through collaborative discussion',
  'By relying on intuition alone',
  'Using structured frameworks'
];

const shuffle = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const randomChoice = <T,>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

/**
 * Generate batch of procedurally generated questions
 * Capable of producing 200+ unique items
 */
export const generateMockBatch = (topic: string, count: number): Question[] => {
  const questions: Question[] = [];
  const usedCombinations = new Set<string>();
  
  for (let i = 0; i < count; i++) {
    let combination: string;
    let attempts = 0;
    
    do {
      const subject = randomChoice(PROCEDURAL_TEMPLATES.subjects);
      const verb = randomChoice(PROCEDURAL_TEMPLATES.verbs);
      const context = randomChoice(PROCEDURAL_TEMPLATES.contexts);
      const modifier = randomChoice(PROCEDURAL_TEMPLATES.modifiers);
      
      combination = `${subject}-${verb}-${context}-${modifier}`;
      attempts++;
      
      if (attempts > 50) break;
    } while (usedCombinations.has(combination));
    
    usedCombinations.add(combination);
    
    const parts = combination.split('-');
    const [subject, verb, context, modifier] = parts;
    
    // Generate question text using procedural templates
    const questionText = `How should ${subject} ${verb} ${randomChoice(PROCEDURAL_TEMPLATES.topics)} ${modifier} ${context}?`;
    
    // Generate 4 unique options
    const shuffledOptions = shuffle(PROCEDURAL_OPTIONS_POOL);
    const options = shuffledOptions.slice(0, 4);
    const correctIndex = Math.floor(Math.random() * 4);
    
    // Ensure correct answer is contextually appropriate
    options[correctIndex] = `${modifier.charAt(0).toUpperCase() + modifier.slice(1)} ${verb} the material ${context}`;
    
    const correctAnswer = options[correctIndex];
    
    questions.push({
      id: `gen-${Date.now()}-${i}`,
      text: questionText,
      options,
      correctAnswer,
      explanation: `The most effective approach is to ${correctAnswer.toLowerCase()}, which ensures comprehensive understanding and practical application.`,
      tags: [topic.toLowerCase(), subject, verb, 'procedural'],
      difficulty: i % 3 === 0 ? 'beginner' : i % 3 === 1 ? 'intermediate' : 'advanced',
      createdAt: new Date()
    });
  }
  
  return questions;
};
