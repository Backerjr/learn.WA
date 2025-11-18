import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLearning } from '@/contexts/LearningContext';

const CoreLearningScreen = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(2);
    const { lessons, userProfile } = useLearning();

    const lessonSteps = [
        { name: 'Introduction', status: currentStepIndex > 0 ? 'completed' : currentStepIndex === 0 ? 'active' : 'pending' },
        { name: 'Vocabulary Deep Dive', status: currentStepIndex > 1 ? 'completed' : currentStepIndex === 1 ? 'active' : 'pending' },
        { name: 'Comprehension Check', status: currentStepIndex > 2 ? 'completed' : currentStepIndex === 2 ? 'active' : 'pending' },
        { name: 'Active Practice', status: currentStepIndex > 3 ? 'completed' : currentStepIndex === 3 ? 'active' : 'pending' },
        { name: 'Conclusion', status: currentStepIndex > 4 ? 'completed' : currentStepIndex === 4 ? 'active' : 'pending' },
    ];

    const quizQuestions = [
        {
            question: '1. When a project is successful, you can say you "hit a ___."',
            options: ['Home run', 'Wall', 'Bullseye', 'Jackpot'],
            correctAnswer: 'Home run',
        },
        {
            question: '2. "Let\'s touch ___ next week to discuss the quarterly report."',
            options: ['Ground', 'Hands', 'Base', 'Up'],
            correctAnswer: 'Base',
        },
        {
            question: '3. When you need to make a quick decision, you might say "let\'s call it a ___."',
            options: ['Day', 'Night', 'Deal', 'Time'],
            correctAnswer: 'Day',
        },
        {
            question: '4. To start fresh with a new approach, you "go back to the ___."',
            options: ['Start', 'Beginning', 'Drawing board', 'First step'],
            correctAnswer: 'Drawing board',
        },
    ];

    const handleNextStep = () => {
        if (currentStepIndex < lessonSteps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    };

    const handlePreviousStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <div className="relative flex min-h-screen w-full flex-col">
                <div className="flex h-full min-h-screen">
                    <aside className="flex flex-col justify-between bg-card-light dark:bg-card-dark border-r border-border-light dark:border-border-dark w-72 p-6 transition-all duration-300">
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="font-heading text-lg font-bold">Lesson Plan</h2>
                                <button className="p-1 rounded-md hover:bg-primary/10 dark:hover:bg-primary/20 text-text-light dark:text-text-dark">
                                    <span className="material-symbols-outlined text-xl">menu_open</span>
                                </button>
                            </div>
                            <nav className="flex flex-col gap-2">
                                {lessonSteps.map((step, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentStepIndex(index)}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                            step.status === 'completed' ? 'bg-accent-green/10 text-accent-green' : ''
                                        } ${
                                            step.status === 'active' ? 'bg-primary/20 text-primary ring-2 ring-primary' : ''
                                        } ${
                                            step.status === 'pending' ? 'opacity-60 hover:bg-border-light dark:hover:bg-border-dark' : ''
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {step.status === 'completed' ? 'check_circle' : step.status === 'active' ? 'play_circle' : 'radio_button_unchecked'}
                                        </span>
                                        <span className="font-medium text-sm">{step.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-background-light dark:bg-background-dark">
                            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                {userProfile.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-sm">{userProfile.name}</p>
                                <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">{userProfile.level}</p>
                            </div>
                        </div>
                    </aside>

                    <main className="flex-1 flex flex-col">
                        <header className="flex items-center justify-between px-10 py-4 border-b border-border-light dark:border-border-dark">
                            <h1 className="font-heading text-xl font-bold text-text-light dark:text-text-dark">Unit 5: Mastering Business Idioms</h1>
                            <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg hover:bg-border-light dark:hover:bg-border-dark">
                                <span className="material-symbols-outlined text-xl">arrow_back</span>
                                Back to Dashboard
                            </Link>
                        </header>

                        <div className="flex-1 overflow-y-auto p-10">
                            <div className="max-w-4xl mx-auto">
                                <div className="mb-8">
                                    <div className="relative flex items-center justify-center bg-card-dark bg-cover bg-center aspect-video rounded-xl overflow-hidden">
                                        <button className="flex shrink-0 items-center justify-center rounded-full size-20 bg-white/20 text-white backdrop-blur-sm transition-transform hover:scale-110">
                                            <span className="material-symbols-outlined text-5xl">play_arrow</span>
                                        </button>
                                        <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-gradient-to-t from-black/60 to-transparent">
                                            <div className="flex items-center gap-3">
                                                <div className="relative flex-1 h-1.5 bg-white/30 rounded-full">
                                                    <div className="absolute top-0 left-0 h-full w-1/3 bg-white rounded-full"></div>
                                                    <div className="absolute top-1/2 -translate-y-1/2 left-1/3 -ml-2 size-4 rounded-full bg-white shadow-lg"></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-1">
                                                <p className="text-white text-xs font-medium">1:24</p>
                                                <p className="text-white text-xs font-medium">4:58</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h2 className="font-heading text-2xl font-bold mb-4">Comprehension Check</h2>
                                    <p className="text-base text-text-light-secondary dark:text-text-dark-secondary mb-6">
                                        Test your understanding of the business idioms covered in this lesson. Select the word that best completes each sentence.
                                    </p>
                                    
                                    <div className="space-y-6">
                                        {quizQuestions.map((q, index) => (
                                            <div key={index} className="bg-card-light dark:bg-card-dark rounded-xl p-6">
                                                <p className="font-medium text-lg mb-4">{q.question}</p>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {q.options.map((option) => (
                                                        <label
                                                            key={option}
                                                            className="flex items-center gap-3 p-3 rounded-lg border-2 border-border-light dark:border-border-dark cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/10 dark:has-[:checked]:bg-primary/20"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name={`question-${index}`}
                                                                value={option}
                                                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                                                className="h-4 w-4 text-primary"
                                                            />
                                                            <span className="text-sm font-medium">{option}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-border-light dark:border-border-dark">
                                    <button
                                        onClick={handlePreviousStep}
                                        disabled={currentStepIndex === 0}
                                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-card-light dark:bg-card-dark hover:bg-border-light dark:hover:bg-border-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <span className="material-symbols-outlined">arrow_back</span>
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleNextStep}
                                        disabled={currentStepIndex === lessonSteps.length - 1}
                                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CoreLearningScreen;
