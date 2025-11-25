import React, { useState } from 'react';
import { quizQuestions, QuizQuestion } from '@/mocks/quizQuestions';

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<null | 'correct' | 'incorrect' | 'skipped'>(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const question: QuizQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const checkAnswer = () => {
    if (!selectedOption) return;
    
    const isCorrect = selectedOption === question.correctAnswer;
    setShowFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect && !answeredQuestions.includes(currentQuestionIndex)) {
      setScore(score + 1);
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
    }
  };

  const skipQuestion = () => {
    setSelectedOption(null);
    setShowFeedback('skipped');
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowFeedback(null);
    } else {
      alert(`Quiz completed! Your score: ${score}/${totalQuestions}`);
    }
  };

  const nextLabel = currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz';
  const nextEnabled = showFeedback !== null;

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-light-primary dark:text-dark-primary">
      <div className="relative flex min-h-screen w-full flex-col items-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl">
          <header className="mb-8 w-full">
            <div className="flex items-center justify-between gap-4">
              <button
                aria-label="Exit Quiz"
                className="flex items-center justify-center rounded-full border border-border-light dark:border-border-dark p-2 text-light-primary/80 hover:bg-border-light dark:text-dark-primary/80 dark:hover:bg-border-dark"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
              <div className="flex-grow">
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-border-light dark:bg-border-dark">
                  <div className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              <div className="text-sm font-medium text-light-secondary dark:text-dark-secondary">
                Score: {score}/{totalQuestions}
              </div>
            </div>
          </header>

          <main className="flex flex-col">
            <div className="w-full rounded-xl bg-card-light dark:bg-card-dark p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-bold uppercase tracking-wider text-primary">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                  {question.difficulty}
                </span>
              </div>
              <h1 className="font-heading mt-2 text-2xl font-bold leading-tight text-light-primary dark:text-dark-primary sm:text-3xl">
                {question.questionText}
              </h1>
              <p className="mt-4 text-lg text-light-primary/80 dark:text-dark-primary/80">{question.sentence}</p>

              <div className="mt-8 flex flex-col gap-3">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-4 rounded-lg border-2 border-border-light p-4 transition-all duration-200 hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/10 dark:border-border-dark dark:hover:border-primary dark:has-[:checked]:border-primary dark:has-[:checked]:bg-primary/20"
                  >
                    <input
                      className="h-5 w-5 flex-shrink-0 appearance-none rounded-full border-2 border-border-light bg-transparent ring-offset-card-light checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:border-border-dark dark:ring-offset-card-dark"
                      name="quiz-option"
                      type="radio"
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleOptionChange}
                      disabled={showFeedback !== null}
                    />
                    <span className="text-base font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <footer className="mt-8 w-full space-y-3">
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button 
                  onClick={skipQuestion} 
                  className="font-bold text-light-secondary dark:text-dark-secondary transition-colors hover:text-primary disabled:opacity-50"
                  disabled={showFeedback !== null}
                >
                  Skip for now
                </button>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end w-full sm:w-auto">
                  <button 
                    onClick={checkAnswer} 
                    className="w-full sm:w-auto rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedOption || showFeedback !== null}
                  >
                    Check Answer
                  </button>
                  <button
                    onClick={nextQuestion}
                    className="w-full sm:w-auto rounded-full border-2 border-primary px-8 py-3 text-sm font-bold text-primary transition-transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!nextEnabled}
                  >
                    {nextLabel}
                  </button>
                </div>
              </div>
              <p className="text-xs text-light-secondary dark:text-dark-secondary text-center sm:text-right">Check or skip to unlock the next question.</p>
            </footer>
          </main>

          {showFeedback && (
            <div className={`mt-6 rounded-xl border ${showFeedback === 'correct' ? 'border-accent-green/40 bg-accent-green/10' : showFeedback === 'incorrect' ? 'border-primary/40 bg-primary/10' : 'border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark'} p-5`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className={`material-symbols-outlined text-2xl ${showFeedback === 'correct' ? 'text-accent-green' : showFeedback === 'incorrect' ? 'text-primary' : 'text-light-secondary dark:text-dark-secondary'}`}>
                    {showFeedback === 'correct' ? 'check_circle' : showFeedback === 'incorrect' ? 'cancel' : 'arrow_forward'}
                  </span>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-light-primary dark:text-dark-primary">
                      {showFeedback === 'correct' ? 'Correct' : showFeedback === 'incorrect' ? 'Nice try' : 'Skipped'}
                    </h2>
                    <p className="text-sm text-light-secondary dark:text-dark-secondary">
                      {showFeedback === 'skipped' ? 'No score change. Use Next to keep moving.' : question.explanation}
                    </p>
                  </div>
                </div>
                <button
                  onClick={nextQuestion}
                  className="w-full sm:w-auto rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-transform duration-200 hover:scale-105"
                >
                  {nextLabel}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
