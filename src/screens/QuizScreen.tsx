import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { quizQuestions, QuizQuestion } from '@/mocks/quizQuestions';

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<null | 'correct' | 'incorrect'>(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset state when component mounts
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowFeedback(null);
    setScore(0);
    setAnsweredQuestions([]);
  }, []);

  const question: QuizQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleBackNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const confirmation = window.confirm('Are you sure you want to leave? Your progress will be lost.');
    if (!confirmation) {
      event.preventDefault();
    }
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
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowFeedback(null);
    }
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

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-light-primary dark:text-dark-primary">
      <div className="relative flex min-h-screen w-full flex-col items-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl">
          <header className="mb-8 w-full">
            <div className="flex items-center justify-between gap-4">
              <Link
                to="/"
                onClick={handleBackNavigation}
                className="flex items-center gap-2 text-light-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Back to Mission Control</span>
              </Link>
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

            <footer className="mt-8 flex w-full flex-col-reverse items-center justify-between gap-4 sm:flex-row">
              <button
                onClick={skipQuestion}
                className="font-bold text-light-secondary dark:text-dark-secondary transition-colors hover:text-primary"
                disabled={showFeedback !== null}
              >
                Skip
              </button>
              <button
                onClick={checkAnswer}
                className="w-full rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
                disabled={!selectedOption || showFeedback !== null}
              >
                Check Answer
              </button>
            </footer>
          </main>

          {showFeedback === 'correct' && (
            <div className="fixed inset-x-0 bottom-0 w-full bg-accent-green/10 p-4 backdrop-blur-sm dark:bg-accent-green/20 sm:p-6 md:p-8">
                <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-2xl font-bold text-accent-green">check_circle</span>
                            <h2 className="font-heading text-2xl font-bold text-accent-green">Correct!</h2>
                        </div>
                        <p className="mt-1 text-light-primary dark:text-dark-primary">{question.explanation}</p>
                    </div>
                    <button
                      onClick={nextQuestion}
                      className="w-full flex-shrink-0 rounded-full bg-accent-green px-8 py-3 font-bold text-white transition-transform duration-200 hover:scale-105 sm:w-auto"
                    >
                      {currentQuestionIndex < totalQuestions - 1 ? 'Next' : 'Finish'}
                    </button>
                </div>
            </div>
          )}

          {showFeedback === 'incorrect' && (
             <div className="fixed inset-x-0 bottom-0 w-full bg-primary/10 p-4 backdrop-blur-sm dark:bg-primary/20 sm:p-6 md:p-8">
                <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-2xl font-bold text-primary">cancel</span>
                            <h2 className="font-heading text-2xl font-bold text-primary">Nice try!</h2>
                        </div>
                        <p className="mt-1 text-light-primary dark:text-dark-primary">{question.explanation}</p>
                    </div>
                    <button
                      onClick={nextQuestion}
                      className="w-full flex-shrink-0 rounded-full bg-primary px-8 py-3 font-bold text-white transition-transform duration-200 hover:scale-105 sm:w-auto"
                    >
                      {currentQuestionIndex < totalQuestions - 1 ? 'Next' : 'Finish'}
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
