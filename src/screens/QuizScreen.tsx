import React, { useState } from 'react';

const QuizScreen = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>('Goes');
  const [showFeedback, setShowFeedback] = useState<null | 'correct' | 'incorrect'>(null);

  const question = {
    id: 1,
    questionText: 'Choose the correct verb form to complete the sentence.',
    sentence: 'She _______ to the store every morning.',
    options: ['Go', 'Goes', 'Going', 'Gone'],
    correctAnswer: 'Goes',
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const checkAnswer = () => {
    if (selectedOption === question.correctAnswer) {
      setShowFeedback('correct');
    } else {
      setShowFeedback('incorrect');
    }
  };

  const skipQuestion = () => {
    console.log("Question skipped");
    setShowFeedback(null);
  };

  const nextQuestion = () => {
    console.log("Next question");
    setShowFeedback(null);
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="relative flex min-h-screen w-full flex-col items-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl">
          {/* Header Bar */}
          <header className="mb-8 w-full">
            <div className="flex items-center justify-between gap-4">
              <button
                aria-label="Exit Quiz"
                className="flex items-center justify-center rounded-full border border-border-light dark:border-border-dark p-2 text-text-light/80 hover:bg-border-light dark:text-text-dark/80 dark:hover:bg-border-dark"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
              <div className="flex-grow">
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-border-light dark:bg-border-dark">
                  <div className="absolute left-0 top-0 h-full rounded-full bg-primary" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </header>

          {/* Question Card */}
          <main className="flex flex-col">
            <div className="w-full rounded-xl bg-card-light dark:bg-card-dark p-6 sm:p-8 shadow-sm">
              <span className="font-heading text-sm font-bold uppercase tracking-wider text-primary">
                Question {question.id} of 10
              </span>
              <h1 className="font-heading mt-2 text-2xl font-bold leading-tight text-text-light dark:text-text-dark sm:text-3xl">
                {question.questionText}
              </h1>
              <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">{question.sentence}</p>

              {/* Interactive Area: Multiple Choice */}
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
                    />
                    <span className="text-base font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <footer className="mt-8 flex w-full flex-col-reverse items-center justify-between gap-4 sm:flex-row">
              <button onClick={skipQuestion} className="font-bold text-skip transition-colors hover:text-skip/80">Skip</button>
              <button onClick={checkAnswer} className="w-full rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105 sm:w-auto">
                Check Answer
              </button>
            </footer>
          </main>

          {/* Feedback Overlay (Correct) */}
          {showFeedback === 'correct' && (
            <div className="fixed inset-x-0 bottom-0 w-full bg-correct/10 p-4 backdrop-blur-sm dark:bg-correct/20 sm:p-6 md:p-8">
                <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-2xl font-bold text-correct">check_circle</span>
                            <h2 className="font-heading text-2xl font-bold text-correct">Correct!</h2>
                        </div>
                        <p className="mt-1 text-text-light dark:text-text-dark">"{question.correctAnswer}" is the correct present tense form for a third-person singular subject like "She".</p>
                    </div>
                    <button onClick={nextQuestion} className="w-full flex-shrink-0 rounded-full bg-correct px-8 py-3 font-bold text-white transition-transform duration-200 hover:scale-105 sm:w-auto">
                        Next
                    </button>
                </div>
            </div>
          )}

          {/* Feedback Overlay (Incorrect) */}
          {showFeedback === 'incorrect' && (
             <div className="fixed inset-x-0 bottom-0 w-full bg-incorrect/10 p-4 backdrop-blur-sm dark:bg-incorrect/20 sm:p-6 md:p-8">
                <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-2xl font-bold text-incorrect">cancel</span>
                            <h2 className="font-heading text-2xl font-bold text-incorrect">Nice try!</h2>
                        </div>
                        <p className="mt-1 text-text-light dark:text-text-dark">The correct answer is "{question.correctAnswer}". Use the "-es" ending for third-person singular subjects.</p>
                    </div>
                    <button onClick={nextQuestion} className="w-full flex-shrink-0 rounded-full bg-incorrect px-8 py-3 font-bold text-white transition-transform duration-200 hover:scale-105 sm:w-auto">
                        Next
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
