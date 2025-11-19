import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateQuiz, validateQuizInput, GeneratedQuiz } from '@/services/ai';

/**
 * AI Quiz Creator - The Creative Studio
 * 
 * A Kinfolk-inspired interface for AI-powered quiz generation.
 * Minimal, editorial design with huge typography and extensive whitespace.
 */

type ViewState = 'input' | 'thinking' | 'results';

const AIQuizCreator: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('input');
  const [topic, setTopic] = useState('');
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuiz | null>(null);
  const [error, setError] = useState<string>('');
  const [thinkingDots, setThinkingDots] = useState('');

  // Typewriter effect for thinking state
  React.useEffect(() => {
    if (viewState === 'thinking') {
      const interval = setInterval(() => {
        setThinkingDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);
      return () => clearInterval(interval);
    }
  }, [viewState]);

  const handleGenerate = async () => {
    const validation = validateQuizInput(topic);
    if (!validation.valid) {
      setError(validation.error || 'Invalid input');
      return;
    }

    setError('');
    setViewState('thinking');
    setThinkingDots('');

    try {
      const quiz = await generateQuiz(topic);
      setGeneratedQuiz(quiz);
      setViewState('results');
    } catch (err) {
      setError('Failed to generate quiz. Please try again.');
      setViewState('input');
    }
  };

  const handleStartOver = () => {
    setViewState('input');
    setTopic('');
    setGeneratedQuiz(null);
    setError('');
  };

  const handleSaveQuiz = () => {
    // In production, this would save to the backend
    console.log('Saving quiz:', generatedQuiz);
    alert('Quiz saved successfully! ✓');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-light-primary dark:text-dark-primary hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-medium">Back to Mission Control</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h1 className="font-heading text-xl font-bold text-light-primary dark:text-dark-primary">AI Studio</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Input View */}
      {viewState === 'input' && (
        <div className="max-w-4xl mx-auto px-8 py-24">
          {/* Hero Headline */}
          <div className="mb-20">
            <h1 className="font-heading text-7xl font-bold mb-8 leading-none text-light-primary dark:text-dark-primary">
              What are we<br />teaching today?
            </h1>
            <p className="text-2xl font-light text-light-secondary dark:text-dark-secondary leading-relaxed max-w-2xl">
              Describe a topic, concept, or skill. Our AI will craft a thoughtful assessment in moments.
            </p>
          </div>

          {/* Input Field - Minimal, border-bottom only */}
          <div className="mb-16">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="e.g., Present Perfect Tense, Conditionals, Vocabulary..."
              className="w-full text-4xl font-light py-8 border-b-2 border-zinc-300 dark:border-zinc-700 bg-transparent focus:border-black dark:focus:border-white outline-none transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-600 text-light-primary dark:text-dark-primary"
              autoFocus
            />
            {error && (
              <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!topic.trim()}
            className="w-full py-8 bg-primary text-white text-xl font-medium transition-all disabled:bg-zinc-300 dark:disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed hover:opacity-90 flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            <span>Generate Quiz</span>
          </button>

          {/* Subtle hint */}
          <p className="mt-8 text-center text-sm text-light-secondary dark:text-dark-secondary">
            Press Enter or click the button to begin
          </p>
        </div>
      )}

      {/* Thinking View - Typewriter effect */}
      {viewState === 'thinking' && (
        <div className="max-w-4xl mx-auto px-8 py-32 text-center">
          <div className="mb-12">
            <span className="material-symbols-outlined text-8xl text-primary animate-pulse">
              auto_awesome
            </span>
          </div>
          
          <h2 className="font-heading text-6xl font-bold mb-8 text-light-primary dark:text-dark-primary">
            Consulting the archives{thinkingDots}
          </h2>
          
          <p className="text-xl font-light text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto">
            Analyzing topic, selecting questions, calibrating difficulty
          </p>

          {/* Minimalist progress indicator */}
          <div className="max-w-md mx-auto mt-12">
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary animate-pulse"
                style={{ width: '60%' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Results View - Masonry grid */}
      {viewState === 'results' && generatedQuiz && (
        <div className="max-w-7xl mx-auto px-8 py-24">
          {/* Header */}
          <div className="mb-16 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="font-heading text-6xl font-bold mb-4 leading-tight text-light-primary dark:text-dark-primary">
                  {generatedQuiz.topic}
                </h1>
                <p className="text-xl font-light text-light-secondary dark:text-dark-secondary">
                  {generatedQuiz.questions.length} Questions · {generatedQuiz.metadata.estimatedTime} min
                </p>
              </div>
              <button
                onClick={handleStartOver}
                className="text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors font-medium flex items-center gap-2"
              >
                <span className="material-symbols-outlined">refresh</span>
                <span>Start Over</span>
              </button>
            </div>
          </div>

          {/* Question Cards - Masonry-style grid */}
          <div className="grid grid-cols-1 gap-8 mb-16">
            {generatedQuiz.questions.map((question, index) => (
              <div
                key={question.id}
                className="border border-zinc-200 dark:border-zinc-800 p-8 hover:border-primary dark:hover:border-primary transition-all group bg-card-light dark:bg-card-dark"
              >
                {/* Question Number & Difficulty */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs uppercase tracking-widest text-light-secondary dark:text-dark-secondary">
                    Question {index + 1} of {generatedQuiz.questions.length}
                  </div>
                  <div className={`text-xs uppercase tracking-widest px-3 py-1 ${
                    question.difficulty === 'beginner' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                    question.difficulty === 'intermediate' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
                    'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                  }`}>
                    {question.difficulty}
                  </div>
                </div>

                {/* Question Text */}
                <h3 className="font-heading text-2xl font-bold mb-8 leading-relaxed text-light-primary dark:text-dark-primary">
                  {question.question}
                </h3>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`
                        p-4 border-2 transition-all
                        ${optionIndex === question.correctAnswer
                          ? 'border-primary bg-zinc-50 dark:bg-zinc-900'
                          : 'border-zinc-200 dark:border-zinc-800'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-light text-light-primary dark:text-dark-primary">{option}</span>
                        {optionIndex === question.correctAnswer && (
                          <span className="material-symbols-outlined text-primary fill">check_circle</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-xs uppercase tracking-widest text-light-secondary dark:text-dark-secondary mb-2">
                    Explanation
                  </p>
                  <p className="text-light-secondary dark:text-dark-secondary leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12 flex gap-4">
            <button
              onClick={handleSaveQuiz}
              className="flex-1 py-8 bg-primary text-white text-xl font-medium hover:opacity-90 transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined">save</span>
              <span>Save to Library</span>
            </button>
            <button
              onClick={handleStartOver}
              className="px-8 py-8 border-2 border-zinc-300 dark:border-zinc-700 text-light-primary dark:text-dark-primary text-xl font-medium hover:border-primary dark:hover:border-primary transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined">refresh</span>
              <span>Create Another</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIQuizCreator;
