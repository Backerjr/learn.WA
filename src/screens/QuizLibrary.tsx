import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { QuizLibrary as QuizStore, Quiz } from '@/services/bank';

/**
 * THE LIBRARY VIEW
 * High-End Digital Asset Manager with Magazine-style Cover Cards
 */

const QuizLibrary: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [difficultyFilters, setDifficultyFilters] = useState<string[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);

  const refreshLibrary = useCallback(() => {
    setQuizzes(QuizStore.getAll());
  }, []);

  useEffect(() => {
    refreshLibrary();
  }, [refreshLibrary]);

  const handleDelete = useCallback((id: string) => {
    if (confirm('Delete this quiz? This action cannot be undone.')) {
      QuizStore.remove(id);
      refreshLibrary();
      if (selectedQuiz?.id === id) {
        setSelectedQuiz(null);
      }
    }
  }, [refreshLibrary, selectedQuiz]);

  const dateFormatter = useMemo(() => new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }), []);

  const formatDate = useCallback((date: Date) => dateFormatter.format(date), [dateFormatter]);

  const handleSelectQuiz = useCallback((quiz: Quiz) => {
    setSelectedQuiz(quiz);
  }, []);

  const clearSelection = useCallback(() => setSelectedQuiz(null), []);

  const availableCategories = useMemo(
    () => Array.from(new Set(quizzes.flatMap(quiz => quiz.metadata.tags || []))),
    [quizzes]
  );

  const toggleFilter = useCallback((value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => (prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]));
  }, []);

  const difficultyBadgeClasses = useCallback((difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 border border-red-200 dark:border-red-700';
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700';
    }
  }, []);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter(quiz => {
      const difficultyMatch =
        difficultyFilters.length === 0 || difficultyFilters.includes(quiz.metadata.difficulty);
      const categoryMatch =
        categoryFilters.length === 0 || quiz.metadata.tags.some(tag => categoryFilters.includes(tag));
      return difficultyMatch && categoryMatch;
    });
  }, [categoryFilters, difficultyFilters, quizzes]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 text-light-primary dark:text-dark-primary hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-medium">Mission Control</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">collections_bookmark</span>
              <h1 className="font-heading text-xl font-bold text-light-primary dark:text-dark-primary">Quiz Library</h1>
            </div>
            <Link 
              to="/studio"
              className="px-4 py-2 border-2 border-zinc-800 dark:border-zinc-200 text-light-primary dark:text-dark-primary text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
            >
              Create New
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {quizzes.length === 0 ? (
          <div className="text-center py-24">
            <span className="material-symbols-outlined text-9xl text-zinc-300 dark:text-zinc-700 mb-6 block">
              collections_bookmark
            </span>
            <h2 className="font-heading text-4xl font-bold mb-4 text-light-primary dark:text-dark-primary">
              Your Library is Empty
            </h2>
            <p className="text-xl text-light-secondary dark:text-dark-secondary mb-8">
              Create your first quiz in The Studio
            </p>
            <Link
              to="/studio"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-zinc-800 dark:border-zinc-200 text-light-primary dark:text-dark-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
            >
              <span className="material-symbols-outlined">add</span>
              <span>Go to Studio</span>
            </Link>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-12">
              <h2 className="font-heading text-5xl font-bold mb-4 text-light-primary dark:text-dark-primary">
                Your Collection
              </h2>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-xl text-light-secondary dark:text-dark-secondary">
                  {filteredQuizzes.length} {filteredQuizzes.length === 1 ? 'quiz' : 'quizzes'} available
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 p-1 bg-white dark:bg-zinc-900">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">grid_view</span>
                      <span className="hidden sm:inline">Grid</span>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm transition-colors ${
                        viewMode === 'list'
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">view_list</span>
                      <span className="hidden sm:inline">List</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['beginner', 'intermediate', 'advanced'].map(level => (
                      <button
                        key={level}
                        onClick={() => toggleFilter(level, setDifficultyFilters)}
                        className={`px-4 py-2 rounded-full border text-sm transition-all ${
                          difficultyFilters.includes(level)
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'border-zinc-200 dark:border-zinc-800 text-light-secondary dark:text-dark-secondary hover:border-zinc-400 dark:hover:border-zinc-600'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {availableCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => toggleFilter(category, setCategoryFilters)}
                        className={`px-4 py-2 rounded-full border text-sm transition-all ${
                          categoryFilters.includes(category)
                            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent shadow-sm'
                            : 'border-zinc-200 dark:border-zinc-800 text-light-secondary dark:text-dark-secondary hover:border-zinc-400 dark:hover:border-zinc-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {filteredQuizzes.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-lg">
                <span className="material-symbols-outlined text-6xl text-zinc-300 dark:text-zinc-700 block mb-4">filter_alt_off</span>
                <h3 className="font-heading text-2xl font-bold mb-2 text-light-primary dark:text-dark-primary">No results</h3>
                <p className="text-light-secondary dark:text-dark-secondary mb-6">Try adjusting your filters to see quizzes here.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {difficultyFilters.length > 0 && (
                    <button
                      className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
                      onClick={() => setDifficultyFilters([])}
                    >
                      Clear difficulty filters
                    </button>
                  )}
                  {categoryFilters.length > 0 && (
                    <button
                      className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
                      onClick={() => setCategoryFilters([])}
                    >
                      Clear category filters
                    </button>
                  )}
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="group cursor-pointer"
                    onClick={() => handleSelectQuiz(quiz)}
                  >
                    {/* Cover Card */}
                    <div
                      className="aspect-[3/4] relative overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-all mb-4"
                      style={{ backgroundColor: quiz.coverColor || '#f4f4f5' }}
                    >
                      {/* Cover Design */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        {/* Top Badge */}
                        <div className="flex justify-between items-start">
                          <span className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 font-serif">
                            Quiz
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${difficultyBadgeClasses(quiz.metadata.difficulty)}`}>
                            {quiz.metadata.difficulty}
                          </span>
                        </div>

                        {/* Title */}
                        <div>
                          <h3 className="font-heading text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-100 leading-tight">
                            {quiz.title}
                          </h3>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {quiz.questions.length} questions
                          </p>
                        </div>

                        {/* Bottom Info */}
                        <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
                          <div>Created {formatDate(quiz.metadata.createdAt)}</div>
                          {quiz.metadata.lastUsed && (
                            <div>Last used {formatDate(quiz.metadata.lastUsed)}</div>
                          )}
                          {quiz.metadata.avgScore !== undefined && (
                            <div className="flex items-center gap-2">
                              <span>Avg Score:</span>
                              <span className="font-medium">{Math.round(quiz.metadata.avgScore)}%</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 dark:group-hover:bg-zinc-100/10 transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-zinc-900/0 group-hover:text-zinc-900/50 dark:group-hover:text-zinc-100/50 transition-all">
                          visibility
                        </span>
                      </div>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap gap-2">
                      {quiz.metadata.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 text-light-secondary dark:text-dark-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuizzes.map(quiz => (
                  <div
                    key={quiz.id}
                    className="flex flex-col gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleSelectQuiz(quiz)}
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${difficultyBadgeClasses(quiz.metadata.difficulty)}`}>
                            {quiz.metadata.difficulty}
                          </span>
                          <p className="text-xs text-light-secondary dark:text-dark-secondary">{quiz.questions.length} questions</p>
                          {quiz.metadata.avgScore !== undefined && (
                            <p className="text-xs text-light-secondary dark:text-dark-secondary">Avg {Math.round(quiz.metadata.avgScore)}%</p>
                          )}
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-light-primary dark:text-dark-primary mt-2">{quiz.title}</h3>
                        <p className="text-sm text-light-secondary dark:text-dark-secondary mt-1 line-clamp-2">{quiz.description}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-light-secondary dark:text-dark-secondary">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">schedule</span>
                          <span>{formatDate(quiz.metadata.createdAt)}</span>
                        </div>
                        {quiz.metadata.lastUsed && (
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">history</span>
                            <span>{formatDate(quiz.metadata.lastUsed)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quiz.metadata.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs bg-zinc-100 dark:bg-zinc-800 text-light-secondary dark:text-dark-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quiz Detail Modal */}
      {selectedQuiz && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="bg-background-light dark:bg-background-dark border-2 border-zinc-300 dark:border-zinc-700 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-2 text-light-primary dark:text-dark-primary">
                  {selectedQuiz.title}
                </h2>
                <p className="text-light-secondary dark:text-dark-secondary">
                  {selectedQuiz.description}
                </p>
              </div>
              <button
                onClick={clearSelection}
                className="text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="space-y-6">
                {selectedQuiz.questions.map((question, idx) => (
                  <div
                    key={question.id}
                    className="border border-zinc-200 dark:border-zinc-800 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="font-serif text-xs uppercase tracking-wider text-light-secondary dark:text-dark-secondary">
                        Question {idx + 1}
                      </span>
                      {question.difficulty && (
                        <span className={`text-xs px-2 py-1 ${
                          question.difficulty === 'beginner' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                          question.difficulty === 'intermediate' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
                          'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                        }`}>
                          {question.difficulty}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-medium mb-4 text-light-primary dark:text-dark-primary">
                      {question.text}
                    </h3>

                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIdx) => (
                        <div
                          key={optionIdx}
                          className={`px-4 py-3 border ${
                            option === question.correctAnswer
                              ? 'border-primary bg-zinc-50 dark:bg-zinc-900'
                              : 'border-zinc-200 dark:border-zinc-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-light-secondary dark:text-dark-secondary font-mono">
                              {String.fromCharCode(65 + optionIdx)}
                            </span>
                            <span className="text-light-primary dark:text-dark-primary">{option}</span>
                            {option === question.correctAnswer && (
                              <span className="material-symbols-outlined text-primary text-base ml-auto">check_circle</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
                      <p className="font-serif text-xs uppercase tracking-wider text-light-secondary dark:text-dark-secondary mb-2">
                        Explanation
                      </p>
                      <p className="text-sm text-light-secondary dark:text-dark-secondary">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t border-zinc-200 dark:border-zinc-800 flex gap-4">
              <button
                onClick={() => {
                  QuizStore.updateUsage(selectedQuiz.id);
                  alert('Quiz marked as used!');
                }}
                className="flex-1 py-3 border-2 border-zinc-800 dark:border-zinc-200 text-light-primary dark:text-dark-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
              >
                Use Quiz
              </button>
              <button
                onClick={() => handleDelete(selectedQuiz.id)}
                className="px-6 py-3 border-2 border-red-300 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizLibrary;
