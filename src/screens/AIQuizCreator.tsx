import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateQuiz, validateQuizInput, GeneratedQuiz, FocusMode, DifficultyLevel, Question } from '@/services/ai';
import { QuizLibrary as QuizStore } from '@/services/bank';

/**
 * Context-Aware Assessment Engine
 * 
 * Professional educator tool with split-view editorial interface.
 * Source material editor meets intelligent configuration.
 */

type ViewState = 'input' | 'thinking' | 'editor';

const AIQuizCreator: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('input');
  const [sourceText, setSourceText] = useState('');
  const [topic, setTopic] = useState('');
  const [focusMode, setFocusMode] = useState<FocusMode>('comprehension');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('intermediate');
  const [questionCount, setQuestionCount] = useState(5);
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuiz | null>(null);
  const [error, setError] = useState<string>('');
  const [thinkingDots, setThinkingDots] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  React.useEffect(() => {
    if (viewState === 'thinking') {
      const interval = setInterval(() => {
        setThinkingDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);
      return () => clearInterval(interval);
    }
  }, [viewState]);

  const handleGenerate = async () => {
    const validation = validateQuizInput({ topic, sourceText, questionCount });
    if (!validation.valid) {
      setError(validation.error || 'Invalid input');
      return;
    }

    setError('');
    setViewState('thinking');
    setThinkingDots('');

    try {
      const quiz = await generateQuiz({
        topic: topic || undefined,
        sourceText: sourceText || undefined,
        focusMode,
        difficulty,
        questionCount
      });
      setGeneratedQuiz(quiz);
      setViewState('editor');
    } catch (err) {
      setError('Failed to generate assessment. Please try again.');
      setViewState('input');
    }
  };

  const handleStartOver = () => {
    setViewState('input');
    setSourceText('');
    setTopic('');
    setGeneratedQuiz(null);
    setError('');
    setEditingQuestionId(null);
  };

  const handleSaveToLibrary = () => {
    if (!generatedQuiz) return;

    const mappedQuestions: Question[] = generatedQuiz.questions.map((q) => ({
      id: `${q.id}-${Date.now()}`,
      text: q.question,
      options: q.options,
      correctAnswer: q.options[q.correctAnswer],
      explanation: q.explanation || 'Generated via Assessment Engine.',
      tags: [
        generatedQuiz.metadata.focusMode || focusMode,
        generatedQuiz.topic || topic || 'general',
      ].filter(Boolean) as string[],
      difficulty: q.difficulty,
      createdAt: new Date(),
    }));

    QuizStore.createQuizFromSelection(
      generatedQuiz.topic || topic || 'Generated Quiz',
      `Generated via Assessment Engine • ${generatedQuiz.metadata.focusMode || focusMode}`,
      mappedQuestions,
      [generatedQuiz.topic || topic || 'assessment']
    );

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleQuestionEdit = (questionId: string, newText: string) => {
    if (!generatedQuiz) return;
    
    setGeneratedQuiz({
      ...generatedQuiz,
      questions: generatedQuiz.questions.map(q =>
        q.id === questionId ? { ...q, question: newText } : q
      )
    });
    setEditingQuestionId(null);
  };

  const handleRegenerate = async (questionId: string) => {
    setRegeneratingId(questionId);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRegeneratingId(null);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 text-light-primary dark:text-dark-primary hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-medium">Back to Mission Control</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h1 className="font-heading text-xl font-bold text-light-primary dark:text-dark-primary">Context-Aware Assessment Engine</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Split View: Input Interface */}
      {viewState === 'input' && (
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="mb-16">
            <h1 className="font-heading text-6xl font-bold mb-6 leading-tight text-light-primary dark:text-dark-primary">
              Collaborate with<br />an intelligent editor
            </h1>
            <p className="text-xl font-light text-light-secondary dark:text-dark-secondary leading-relaxed max-w-3xl">
              Provide source material or context. The engine will craft targeted assessments that feel handwritten.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Source Material Editor */}
            <div className="space-y-6">
              <div>
                <label className="font-serif text-sm uppercase tracking-wider text-light-secondary dark:text-dark-secondary mb-4 block">
                  Source Material
                </label>
                <textarea
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder="Paste article, passage, or reading material here..."
                  rows={16}
                  className="w-full p-6 border border-zinc-200 dark:border-zinc-800 bg-transparent focus:border-zinc-400 dark:focus:border-zinc-600 outline-none transition-all text-light-primary dark:text-dark-primary font-light leading-relaxed resize-none placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
                />
              </div>
              
              <div>
                <label className="font-serif text-sm uppercase tracking-wider text-light-secondary dark:text-dark-secondary mb-3 block">
                  Context / Topic (Optional)
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., American Literature, Environmental Science..."
                  className="w-full px-6 py-4 border-b-2 border-zinc-300 dark:border-zinc-700 bg-transparent focus:border-zinc-500 dark:focus:border-zinc-500 outline-none transition-all text-light-primary dark:text-dark-primary placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
                />
              </div>
            </div>

            {/* Right: Configuration Panel */}
            <div className="space-y-8 lg:pl-8 lg:border-l border-zinc-200 dark:border-zinc-800">
              <div>
                <label className="font-serif text-sm uppercase tracking-wider text-light-secondary dark:text-dark-secondary mb-4 block">
                  Assessment Focus
                </label>
                <div className="space-y-3">
                  {(['vocab', 'grammar', 'comprehension'] as FocusMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setFocusMode(mode)}
                      className={`w-full px-6 py-4 border-2 transition-all text-left ${
                        focusMode === mode
                          ? 'border-zinc-800 dark:border-zinc-200 bg-zinc-50 dark:bg-zinc-900'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                      }`}
                    >
                      <div className="font-medium text-light-primary dark:text-dark-primary capitalize">{mode}</div>
                      <div className="text-xs text-light-secondary dark:text-dark-secondary mt-1">
                        {mode === 'vocab' && 'Definitions, synonyms, word meaning'}
                        {mode === 'grammar' && 'Structure, tense, syntax patterns'}
                        {mode === 'comprehension' && 'Understanding, inference, analysis'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-serif text-sm uppercase tracking-wider text-light-secondary dark:text-dark-secondary mb-4 block">
                  Difficulty Level
                </label>
                <div className="flex gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`flex-1 px-4 py-3 border-2 transition-all text-sm capitalize ${
                        difficulty === level
                          ? 'border-zinc-800 dark:border-zinc-200 bg-zinc-50 dark:bg-zinc-900'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                      } text-light-primary dark:text-dark-primary`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-serif text-sm uppercase tracking-wider text-light-secondary dark:text-dark-secondary mb-4 block">
                  Question Count
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 5)))}
                  className="w-full px-6 py-4 border-2 border-zinc-200 dark:border-zinc-800 bg-transparent focus:border-zinc-400 dark:focus:border-zinc-600 outline-none transition-all text-light-primary dark:text-dark-primary"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400 px-6 py-4 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10">{error}</p>
              )}

              {/* Craft Assessment Button - Subtle, Editorial */}
              <button
                onClick={handleGenerate}
                disabled={!sourceText.trim() && !topic.trim()}
                className="w-full py-6 border-2 border-zinc-800 dark:border-zinc-200 bg-transparent text-light-primary dark:text-dark-primary font-medium transition-all disabled:border-zinc-300 dark:disabled:border-zinc-700 disabled:text-zinc-400 dark:disabled:text-zinc-600 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-900 flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-xl">edit_note</span>
                <span>Craft Assessment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thinking State */}
      {viewState === 'thinking' && (
        <div className="max-w-4xl mx-auto px-8 py-32 text-center">
          <div className="mb-12">
            <span className="material-symbols-outlined text-8xl text-primary animate-pulse">
              auto_awesome
            </span>
          </div>
          
          <h2 className="font-heading text-5xl font-bold mb-8 text-light-primary dark:text-dark-primary">
            Analyzing context{thinkingDots}
          </h2>
          
          <p className="text-lg font-light text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto">
            Crafting intelligent questions that feel handwritten
          </p>

          <div className="max-w-md mx-auto mt-12">
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-pulse" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      )}

      {/* Editor View: Editable Question Cards */}
      {viewState === 'editor' && generatedQuiz && (
        <div className="max-w-6xl mx-auto px-8 py-16">
          {/* Header */}
          <div className="mb-12 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="font-heading text-5xl font-bold mb-4 leading-tight text-light-primary dark:text-dark-primary">
                  {generatedQuiz.topic || 'Assessment Draft'}
                </h1>
                <div className="flex items-center gap-6 text-sm text-light-secondary dark:text-dark-secondary">
                  <span>{generatedQuiz.questions.length} Questions</span>
                  <span>·</span>
                  <span>{generatedQuiz.metadata.estimatedTime} min</span>
                  {generatedQuiz.metadata.focusMode && (
                    <>
                      <span>·</span>
                      <span className="capitalize">{generatedQuiz.metadata.focusMode} Focus</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={handleStartOver}
                className="text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors text-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
                <span>Start Over</span>
              </button>
            </div>
          </div>

          {/* Editable Question Cards */}
          <div className="space-y-6 mb-12">
            {generatedQuiz.questions.map((question, index) => (
              <div
                key={question.id}
                className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-900">
                  <span className="font-serif text-xs uppercase tracking-wider text-light-secondary dark:text-dark-secondary">
                    Question {index + 1}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 ${
                      question.difficulty === 'beginner' ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20' :
                      question.difficulty === 'intermediate' ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' :
                      'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                    }`}>
                      {question.difficulty}
                    </span>
                    <button
                      onClick={() => handleRegenerate(question.id)}
                      disabled={regeneratingId === question.id}
                      className="text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors disabled:opacity-50"
                      title="Regenerate question"
                    >
                      {regeneratingId === question.id ? (
                        <span className="material-symbols-outlined text-lg animate-spin">refresh</span>
                      ) : (
                        <span className="material-symbols-outlined text-lg">refresh</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Question Content */}
                <div className="p-6 space-y-6">
                  {/* Editable Question Text */}
                  {editingQuestionId === question.id ? (
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) => handleQuestionEdit(question.id, e.target.value)}
                      onBlur={() => setEditingQuestionId(null)}
                      onKeyDown={(e) => e.key === 'Enter' && setEditingQuestionId(null)}
                      className="w-full text-xl font-medium px-4 py-3 border-2 border-primary bg-zinc-50 dark:bg-zinc-900 text-light-primary dark:text-dark-primary outline-none"
                      autoFocus
                    />
                  ) : (
                    <h3
                      onClick={() => setEditingQuestionId(question.id)}
                      className="text-xl font-medium leading-relaxed text-light-primary dark:text-dark-primary cursor-text hover:bg-zinc-50 dark:hover:bg-zinc-900 px-4 py-3 -mx-4 -my-3 transition-colors"
                    >
                      {question.question}
                    </h3>
                  )}

                  {/* Options */}
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`flex items-start gap-3 px-4 py-3 border ${
                          optionIndex === question.correctAnswer
                            ? 'border-primary bg-zinc-50 dark:bg-zinc-900'
                            : 'border-zinc-200 dark:border-zinc-800'
                        }`}
                      >
                        <span className="text-xs text-light-secondary dark:text-dark-secondary mt-1 font-mono">
                          {String.fromCharCode(65 + optionIndex)}
                        </span>
                        <span className="flex-1 text-light-primary dark:text-dark-primary">{option}</span>
                        {optionIndex === question.correctAnswer && (
                          <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
                    <p className="font-serif text-xs uppercase tracking-wider text-light-secondary dark:text-dark-secondary mb-2">
                      Rationale
                    </p>
                    <p className="text-sm text-light-secondary dark:text-dark-secondary leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex gap-4">
            <button
              onClick={handleSaveToLibrary}
              className="flex-1 py-5 border-2 border-zinc-800 dark:border-zinc-200 bg-transparent text-light-primary dark:text-dark-primary font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined">library_add</span>
              <span>Save to Class Library</span>
            </button>
            <button
              onClick={handleStartOver}
              className="px-8 py-5 border-2 border-zinc-300 dark:border-zinc-700 text-light-secondary dark:text-dark-secondary hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              <span>New</span>
            </button>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-8 right-8 px-6 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-fade-in">
          <span className="material-symbols-outlined text-green-400 dark:text-green-600">check_circle</span>
          <span className="font-medium">Saved to Quiz Library</span>
        </div>
      )}
    </div>
  );
};

export default AIQuizCreator;
