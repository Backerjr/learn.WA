import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { generateMockBatch, Question } from '@/services/ai';
import { QuestionBank, QuizLibrary } from '@/services/bank';

/**
 * THE VOGUE STUDIO - Split-Pane Editorial Design
 * Infinite generation meets curated banking
 */

type StudioView = 'idle' | 'generating' | 'factory';

const AssessmentStudio: React.FC = () => {
  const [view, setView] = useState<StudioView>('idle');
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(20);
  const [generatedItems, setGeneratedItems] = useState<Question[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bankItems, setBankItems] = useState<Question[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sparkleAnimation, setSparkleAnimation] = useState(false);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  const refreshBank = useCallback(() => {
    setBankItems(QuestionBank.getAll());
  }, []);

  useEffect(() => {
    refreshBank();
  }, [refreshBank]);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) return;

    setView('generating');
    setSparkleAnimation(true);
    setSelectedIds(new Set());

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const batch = generateMockBatch(topic, count);
    setGeneratedItems(batch);
    setView('factory');
    setSparkleAnimation(false);
  }, [topic, count]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleAddToBank = useCallback(() => {
    const selected = generatedItems.filter(item => selectedIds.has(item.id));
    if (selected.length === 0) return;

    QuestionBank.saveBatch(selected);
    refreshBank();
    
    setSaveNotification(`${selected.length} items added to Bank`);
    setTimeout(() => setSaveNotification(null), 3000);
    
    setSelectedIds(new Set());
  }, [generatedItems, selectedIds, refreshBank]);

  const handleSaveAsQuiz = useCallback(() => {
    const selected = generatedItems.filter(item => selectedIds.has(item.id));
    
    if (selected.length === 0) return;

    const title = `${topic} Assessment`;
    const description = `Generated on ${new Date().toLocaleDateString()}`;
    
    QuizLibrary.createQuizFromSelection(title, description, selected, [topic]);
    
    setSaveNotification('Quiz saved to Library');
    setTimeout(() => setSaveNotification(null), 3000);
    
    setSelectedIds(new Set());
  }, [generatedItems, selectedIds, topic]);

  const filteredBank = useMemo(() => (
    searchQuery ? QuestionBank.search(searchQuery) : bankItems
  ), [searchQuery, bankItems]);

  const selectedCount = useMemo(() => selectedIds.size, [selectedIds]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-light-primary dark:text-dark-primary hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-medium">Mission Control</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h1 className="font-heading text-xl font-bold text-light-primary dark:text-dark-primary">The Studio</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Split-Pane Layout */}
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-12 min-h-[calc(100vh-80px)]">
          
          {/* LEFT PANE: THE FACTORY */}
          <div className="col-span-3 border-r border-zinc-200 dark:border-zinc-800 p-8">
            <div className="sticky top-8 space-y-8">
              <div>
                <h2 className="font-serif text-xs uppercase tracking-widest text-light-secondary dark:text-dark-secondary mb-6">
                  The Factory
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="font-serif text-xs uppercase tracking-wider text-light-secondary dark:text-dark-secondary mb-3 block">
                      Topic
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Grammar, Vocabulary..."
                      className="w-full px-4 py-3 border-b-2 border-zinc-300 dark:border-zinc-700 bg-transparent focus:border-zinc-600 dark:focus:border-zinc-400 outline-none text-light-primary dark:text-dark-primary placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="font-serif text-xs uppercase tracking-wider text-light-secondary dark:text-dark-secondary mb-3 block">
                      Quantity (1-200)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="200"
                      value={count}
                      onChange={(e) => setCount(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-2xl font-light text-light-primary dark:text-dark-primary">{count}</span>
                      <span className="text-xs text-light-secondary dark:text-dark-secondary">items</span>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={!topic.trim() || view === 'generating'}
                    className="w-full py-4 border-2 border-zinc-800 dark:border-zinc-200 bg-transparent text-light-primary dark:text-dark-primary font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {view === 'generating' ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">refresh</span>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">auto_awesome</span>
                        <span>Generate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              {view === 'factory' && selectedCount > 0 && (
                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                  <div className="text-xs text-light-secondary dark:text-dark-secondary mb-4">
                    {selectedCount} selected
                  </div>
                  
                  <button
                    onClick={handleAddToBank}
                    className="w-full py-3 border border-zinc-300 dark:border-zinc-700 text-light-primary dark:text-dark-primary text-sm hover:border-zinc-500 dark:hover:border-zinc-500 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">bookmark</span>
                    <span>Add to Bank</span>
                  </button>

                  <button
                    onClick={handleSaveAsQuiz}
                    className="w-full py-3 bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">library_add</span>
                    <span>Save as Quiz</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* CENTER: MASONRY GRID */}
          <div className="col-span-6 p-8 overflow-y-auto max-h-[calc(100vh-80px)]">
            {view === 'idle' && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md">
                  <span className="material-symbols-outlined text-8xl text-zinc-300 dark:text-zinc-700 mb-6 block">
                    science
                  </span>
                  <h2 className="font-heading text-4xl font-bold mb-4 text-light-primary dark:text-dark-primary">
                    The Infinite Engine
                  </h2>
                  <p className="text-lg text-light-secondary dark:text-dark-secondary">
                    Generate up to 200 unique questions per batch. Select, curate, and save to your personal bank.
                  </p>
                </div>
              </div>
            )}

            {view === 'generating' && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className={`mb-8 ${sparkleAnimation ? 'animate-pulse' : ''}`}>
                    <span className="material-symbols-outlined text-9xl text-primary">
                      auto_awesome
                    </span>
                  </div>
                  <h2 className="font-heading text-5xl font-bold text-light-primary dark:text-dark-primary">
                    Synthesizing...
                  </h2>
                </div>
              </div>
            )}

            {view === 'factory' && (
              <div>
                <div className="mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                  <h2 className="font-heading text-4xl font-bold mb-2 text-light-primary dark:text-dark-primary">
                    {generatedItems.length} Fresh Items
                  </h2>
                  <p className="text-light-secondary dark:text-dark-secondary">
                    Click to select · Bookmark to save · Export as quiz
                  </p>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {generatedItems.map((item) => {
                    const isSelected = selectedIds.has(item.id);
                    
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleSelection(item.id)}
                        className={`border-2 transition-all cursor-pointer group ${
                          isSelected
                            ? 'border-zinc-800 dark:border-zinc-200 bg-zinc-50 dark:bg-zinc-900'
                            : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                        }`}
                      >
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className={`material-symbols-outlined text-2xl transition-all ${
                                isSelected ? 'text-primary fill' : 'text-zinc-400 dark:text-zinc-600'
                              }`}>
                                {isSelected ? 'bookmark' : 'bookmark'}
                              </span>
                              {item.difficulty && (
                                <span className={`text-xs px-2 py-1 ${
                                  item.difficulty === 'beginner' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                                  item.difficulty === 'intermediate' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
                                  'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                                }`}>
                                  {item.difficulty}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Question */}
                          <h3 className="text-lg font-medium mb-4 leading-relaxed text-light-primary dark:text-dark-primary">
                            {item.text}
                          </h3>

                          {/* Options */}
                          <div className="space-y-2 mb-4">
                            {item.options.map((option, idx) => (
                              <div
                                key={idx}
                                className={`px-4 py-2 border text-sm ${
                                  option === item.correctAnswer
                                    ? 'border-primary bg-zinc-100 dark:bg-zinc-800'
                                    : 'border-zinc-200 dark:border-zinc-800'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-light-secondary dark:text-dark-secondary font-mono">
                                    {String.fromCharCode(65 + idx)}
                                  </span>
                                  <span className="text-light-primary dark:text-dark-primary">{option}</span>
                                  {option === item.correctAnswer && (
                                    <span className="material-symbols-outlined text-primary text-sm ml-auto">check_circle</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {item.tags.slice(0, 4).map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 text-light-secondary dark:text-dark-secondary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANE: THE BANK */}
          <div className="col-span-3 border-l border-zinc-200 dark:border-zinc-800 p-8 overflow-y-auto max-h-[calc(100vh-80px)]">
            <div className="sticky top-0 mb-6">
              <h2 className="font-serif text-xs uppercase tracking-widest text-light-secondary dark:text-dark-secondary mb-6">
                The Bank
              </h2>
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 bg-transparent focus:border-zinc-500 dark:focus:border-zinc-500 outline-none text-sm text-light-primary dark:text-dark-primary placeholder:text-zinc-400 dark:placeholder:text-zinc-600 mb-4"
              />

              <div className="text-xs text-light-secondary dark:text-dark-secondary">
                {filteredBank.length} items
              </div>
            </div>

            {/* Bank Items */}
            <div className="space-y-3">
              {filteredBank.length === 0 ? (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-4xl text-zinc-300 dark:text-zinc-700 mb-3 block">
                    bookmark_border
                  </span>
                  <p className="text-sm text-light-secondary dark:text-dark-secondary">
                    No saved items yet
                  </p>
                </div>
              ) : (
                filteredBank.map((item) => (
                  <div
                    key={item.id}
                    className="border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group"
                  >
                    <div className="text-sm font-medium mb-2 text-light-primary dark:text-dark-primary line-clamp-2">
                      {item.text}
                    </div>
                    <div className="flex items-center gap-2">
                      {item.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-light-secondary dark:text-dark-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Notification Toast */}
      {saveNotification && (
        <div className="fixed bottom-8 right-8 px-6 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-fade-in">
          <span className="material-symbols-outlined text-green-400 dark:text-green-600">check_circle</span>
          <span className="font-medium">{saveNotification}</span>
        </div>
      )}
    </div>
  );
};

export default AssessmentStudio;
