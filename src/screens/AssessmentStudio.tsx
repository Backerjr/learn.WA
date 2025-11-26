import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { generateMockBatch, Question } from '@/services/ai';

type StudioView = 'idle' | 'generating' | 'factory';
type ToastType = 'success' | 'error';

const AssessmentStudio: React.FC = () => {
  const [view, setView] = useState<StudioView>('idle');
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(12);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [sparkleAnimation, setSparkleAnimation] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [publishState, setPublishState] = useState<'idle' | 'publishing' | 'success'>('idle');

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) return;

    setView('generating');
    setSparkleAnimation(true);
    setActiveQuestionId(null);

    await new Promise(resolve => setTimeout(resolve, 1200));

    const batch = generateMockBatch(topic, count);
    setQuestions(batch);
    setActiveQuestionId(batch[0]?.id ?? null);
    setView('factory');
    setSparkleAnimation(false);
  }, [topic, count]);

  const updateQuestion = useCallback((id: string, updater: (question: Question) => Question) => {
    setQuestions(prev => prev.map(question => (question.id === id ? updater(question) : question)));
  }, []);

  const handleOptionChange = useCallback(
    (questionId: string, optionIndex: number, value: string) => {
      updateQuestion(questionId, question => ({
        ...question,
        options: question.options.map((option, idx) => (idx === optionIndex ? value : option)),
      }));
    },
    [updateQuestion],
  );

  const handleCorrectAnswerChange = useCallback(
    (questionId: string, value: string) => {
      updateQuestion(questionId, question => ({
        ...question,
        correctAnswer: value,
      }));
    },
    [updateQuestion],
  );

  const handleReorder = useCallback(
    (targetId: string) => {
      if (!draggingId || draggingId === targetId) return;

      setQuestions(prev => {
        const currentIndex = prev.findIndex(item => item.id === draggingId);
        const targetIndex = prev.findIndex(item => item.id === targetId);
        if (currentIndex === -1 || targetIndex === -1) return prev;

        const updated = [...prev];
        const [removed] = updated.splice(currentIndex, 1);
        updated.splice(targetIndex, 0, removed);
        return updated;
      });
    },
    [draggingId],
  );

  const handlePublish = useCallback(async () => {
    if (!questions.length || publishState === 'publishing') return;

    setPublishState('publishing');
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const succeeded = Math.random() > 0.15;

      if (!succeeded) throw new Error('Temporary issue while publishing');

      showToast('Assessment published to class', 'success');
      setPublishState('success');
      setTimeout(() => setPublishState('idle'), 800);
    } catch (error) {
      showToast('Publish failed. Please try again.', 'error');
      setPublishState('idle');
    }
  }, [publishState, questions.length, showToast]);

  useEffect(() => {
    if (questions.length && !activeQuestionId) {
      setActiveQuestionId(questions[0].id);
    }
  }, [questions, activeQuestionId]);

  const selectedQuestion = useMemo(
    () => questions.find(question => question.id === activeQuestionId) ?? null,
    [questions, activeQuestionId],
  );

  const isPublishingDisabled = publishState === 'publishing' || view === 'generating' || questions.length === 0;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur">
        <div className="max-w-[1600px] mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="flex items-center gap-2 text-light-primary dark:text-dark-primary hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-medium">Mission Control</span>
            </Link>
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h1 className="font-heading text-xl font-bold text-light-primary dark:text-dark-primary">Assessment Studio</h1>
            </div>
          </div>

          <button
            onClick={handlePublish}
            disabled={isPublishingDisabled}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-white font-semibold shadow-sm hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {publishState === 'publishing' ? (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">rocket_launch</span>
                <span>Publish to Class</span>
              </>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-8 py-10 grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-950 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-light-secondary dark:text-dark-secondary">Input</p>
                <h2 className="font-heading text-2xl font-semibold text-light-primary dark:text-dark-primary">Prompt the Factory</h2>
              </div>
              {view === 'factory' && (
                <span className="text-sm text-light-secondary dark:text-dark-secondary">{questions.length} items</span>
              )}
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <label className="text-sm text-light-secondary dark:text-dark-secondary mb-2 block">Topic</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Photosynthesis, Algebraic Reasoning"
                    className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-md bg-transparent focus:border-primary outline-none text-light-primary dark:text-dark-primary"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="text-sm text-light-secondary dark:text-dark-secondary mb-2 block">Quantity</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={4}
                      max={30}
                      value={count}
                      onChange={(e) => setCount(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <span className="w-10 text-right font-semibold text-light-primary dark:text-dark-primary">{count}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!topic.trim() || view === 'generating'}
                className="w-full py-4 rounded-md border border-zinc-300 dark:border-zinc-700 bg-gradient-to-r from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 text-light-primary dark:text-dark-primary font-semibold hover:border-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {view === 'generating' ? (
                  <>
                    <span className={`material-symbols-outlined ${sparkleAnimation ? 'animate-spin' : ''}`}>refresh</span>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">auto_awesome</span>
                    <span>Generate Batch</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-950 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-light-secondary dark:text-dark-secondary">Questions</p>
                <h2 className="font-heading text-2xl font-semibold text-light-primary dark:text-dark-primary">Edit & Reorder</h2>
              </div>
              <p className="text-xs text-light-secondary dark:text-dark-secondary">Drag the handle to reorder</p>
            </div>

            {view === 'idle' && (
              <div className="text-center py-10 text-light-secondary dark:text-dark-secondary">
                Generate a batch to begin editing.
              </div>
            )}

            {view === 'generating' && (
              <div className="text-center py-10">
                <span className="material-symbols-outlined text-6xl text-primary animate-pulse block mb-4">auto_awesome</span>
                <p className="text-light-secondary dark:text-dark-secondary">Crafting fresh questions...</p>
              </div>
            )}

            {view === 'factory' && (
              <div className="grid grid-cols-1 gap-4">
                {questions.map((item, index) => {
                  const isActive = activeQuestionId === item.id;
                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => setDraggingId(item.id)}
                      onDragEnd={() => setDraggingId(null)}
                      onDrop={(event) => {
                        event.preventDefault();
                        handleReorder(item.id);
                        setDraggingId(null);
                      }}
                      onDragOver={(event) => event.preventDefault()}
                      className={`border rounded-lg p-4 transition-all cursor-grab bg-white dark:bg-zinc-900 ${
                        isActive ? 'border-primary shadow-md' : 'border-zinc-200 dark:border-zinc-800 hover:border-primary/60'
                      } ${draggingId === item.id ? 'opacity-70' : ''}`}
                      onClick={() => setActiveQuestionId(item.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-zinc-400 dark:text-zinc-500">drag_indicator</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs text-light-secondary dark:text-dark-secondary mb-1">
                            <span>Question {index + 1}</span>
                            <span className="uppercase tracking-wide">{item.difficulty ?? '—'}</span>
                          </div>
                          <p className="text-sm text-light-primary dark:text-dark-primary line-clamp-2">{item.text}</p>
                        </div>
                        {draggingId === item.id && (
                          <span className="text-xs text-primary">Moving...</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-950 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-light-secondary dark:text-dark-secondary">Editor</p>
                <h2 className="font-heading text-2xl font-semibold text-light-primary dark:text-dark-primary">Live Editing</h2>
              </div>
              {selectedQuestion && (
                <span className="text-xs text-light-secondary dark:text-dark-secondary">Autosaves instantly</span>
              )}
            </div>

            {!selectedQuestion ? (
              <div className="text-center py-12 text-light-secondary dark:text-dark-secondary">
                Select a question card to edit its content.
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-light-secondary dark:text-dark-secondary mb-2 block">Question text</label>
                  <textarea
                    value={selectedQuestion.text}
                    onChange={(e) =>
                      updateQuestion(selectedQuestion.id, question => ({ ...question, text: e.target.value }))
                    }
                    className="w-full min-h-[120px] px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-md bg-transparent focus:border-primary outline-none text-light-primary dark:text-dark-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedQuestion.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="space-y-2">
                      <label className="text-xs uppercase tracking-wide text-light-secondary dark:text-dark-secondary block">
                        Option {String.fromCharCode(65 + optionIndex)}
                      </label>
                      <input
                        value={option}
                        onChange={(e) => handleOptionChange(selectedQuestion.id, optionIndex, e.target.value)}
                        className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-md bg-transparent focus:border-primary outline-none text-light-primary dark:text-dark-primary"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-light-secondary dark:text-dark-secondary mb-2 block">Correct answer</label>
                    <select
                      value={selectedQuestion.correctAnswer}
                      onChange={(e) => handleCorrectAnswerChange(selectedQuestion.id, e.target.value)}
                      className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-md bg-transparent focus:border-primary outline-none text-light-primary dark:text-dark-primary"
                    >
                      {selectedQuestion.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {String.fromCharCode(65 + optionIndex)} — {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-light-secondary dark:text-dark-secondary mb-2 block">Tags</label>
                    <input
                      value={selectedQuestion.tags.join(', ')}
                      onChange={(e) =>
                        updateQuestion(selectedQuestion.id, question => ({
                          ...question,
                          tags: e.target.value
                            .split(',')
                            .map(tag => tag.trim())
                            .filter(Boolean),
                        }))
                      }
                      placeholder="Comma separated"
                      className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-md bg-transparent focus:border-primary outline-none text-light-primary dark:text-dark-primary"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-950 shadow-sm h-fit sticky top-6 max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-light-secondary dark:text-dark-secondary">Preview</p>
              <h2 className="font-heading text-2xl font-semibold text-light-primary dark:text-dark-primary">Live Assessment</h2>
            </div>
            <span className="text-xs text-light-secondary dark:text-dark-secondary">Updates instantly</span>
          </div>

          {questions.length === 0 ? (
            <div className="text-center py-16 text-light-secondary dark:text-dark-secondary">
              Generate questions to see the live preview.
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((item, index) => (
                <div key={item.id} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 bg-zinc-50/70 dark:bg-zinc-900">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-light-secondary dark:text-dark-secondary">
                          {item.difficulty ?? '—'}
                        </p>
                        <h3 className="text-lg font-medium text-light-primary dark:text-dark-primary">{item.text}</h3>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary">visibility</span>
                  </div>

                  <div className="space-y-2 mb-3">
                    {item.options.map((option, optionIndex) => {
                      const isCorrect = option === item.correctAnswer;
                      return (
                        <div
                          key={optionIndex}
                          className={`px-4 py-3 border rounded-md text-sm flex items-center gap-3 ${
                            isCorrect
                              ? 'border-primary bg-white dark:bg-zinc-950 shadow-sm'
                              : 'border-zinc-200 dark:border-zinc-800'
                          }`}
                        >
                          <span className="text-xs text-light-secondary dark:text-dark-secondary font-mono">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span className="text-light-primary dark:text-dark-primary">{option}</span>
                          {isCorrect && <span className="material-symbols-outlined text-primary text-base ml-auto">check_circle</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 4).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-2 py-1 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-light-secondary dark:text-dark-secondary"
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
      </div>

      {toast && (
        <div
          className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-2xl border flex items-center gap-3 animate-fade-in ${
            toast.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700'
              : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-100 border-red-200 dark:border-red-700'
          }`}
        >
          <span className="material-symbols-outlined">
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default AssessmentStudio;
