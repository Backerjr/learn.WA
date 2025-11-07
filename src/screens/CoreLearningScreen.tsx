import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CoreLearningScreen = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const lessonSteps = [
        { name: 'Introduction', status: 'completed' },
        { name: 'Vocabulary Deep Dive', status: 'completed' },
        { name: 'Comprehension Check', status: 'active' },
        { name: 'Active Practice', status: 'pending' },
        { name: 'Conclusion', status: 'pending' },
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
    ];

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <div className="relative flex min-h-screen w-full flex-col">
                <div className="flex h-full min-h-screen">
                    {/* Collapsible Lesson Stepper (Sidebar) */}
                    <aside className="flex flex-col justify-between bg-container-light dark:bg-container-dark border-r border-gray-200 dark:border-gray-700 w-72 p-6 transition-all duration-300">
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="font-heading text-lg font-bold">Lesson Plan</h2>
                                <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-text-light dark:text-text-dark">
                                    <span className="material-symbols-outlined text-xl">menu_open</span>
                                </button>
                            </div>
                            <nav className="flex flex-col gap-2">
                                {lessonSteps.map((step, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                            step.status === 'completed' ? 'bg-primary/10 text-primary' : ''
                                        } ${
                                            step.status === 'active' ? 'bg-primary/20 text-primary ring-2 ring-primary' : ''
                                        } ${
                                            step.status === 'pending' ? 'opacity-60 hover:bg-gray-100 dark:hover:bg-gray-700' : ''
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {step.status === 'completed' ? 'check_circle' : step.status === 'active' ? 'play_circle' : 'radio_button_unchecked'}
                                        </span>
                                        <span className="font-medium text-sm">{step.name}</span>
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-900/50">
                            <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRU3R3wfVXZmwCa6SWg4IUIOFZfME1ABbgRyTLoXmI4Y64GKTKSnZAwcQZ7jt9kH4gVmQDcvrgnGqbATVlRiMaUUh2-Q__RRDoR27F3tbVDHNDlWTqhsjLeaJOQ3Z08C1zNmHMSWZXP2H7coGn_Li7wSDtShm_Gk3fN_g7q1q7_fceRTmMgI2RaJxcn1fnVmsH5t6i_ksMlEd6EpWEajFDy8F5tXI2pJZk3iKEKsFoyvtL5VdWJWEQKQZT6lxvyFDWgfqBo10eSnU')" }}></div>
                            <div>
                                <p className="font-bold text-sm">Alex Doe</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Beginner Level</p>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 flex flex-col">
                        {/* Minimal Header */}
                        <header className="flex items-center justify-between px-10 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h1 className="font-heading text-xl font-bold text-text-light dark:text-text-dark">Unit 5: Mastering Business Idioms</h1>
                            <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span className="material-symbols-outlined text-xl">arrow_back</span>
                                Back to Dashboard
                            </Link>
                        </header>

                        <div className="flex-1 overflow-y-auto p-10">
                            <div className="max-w-4xl mx-auto">
                                {/* Dynamic Content Placeholder */}
                                <div className="mb-8">
                                    <div className="relative flex items-center justify-center bg-gray-900 bg-cover bg-center aspect-video rounded-xl" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCK-Wa0xW20K0wdkPLbRd8CrfMlmRt_I3cSQ_O2pWpAPYutQuPe2c4TVH4gI6h4i3kPA-X8ECBgHwHe9Jt4aXJyYcU45EUrYZP0fbiHvKRQadCNQmhyqtzGnVMsuXnr1IEAQuv_qhJhFp_dMIsHt8ESsQZ7L4mazTDYwv3plak9D1CuWgzuHgvBMUFnw7UovdUqiwGVL6egoDUYHLODokPHsCNIp-UDzLj3vK02a5idFQC1YxDtb06XXXKxArbSdw_jlYuDh_iURyA')" }}>
                                        <button className="flex shrink-0 items-center justify-center rounded-full size-20 bg-white/20 text-white backdrop-blur-sm transition-transform hover:scale-110">
                                            <span className="material-symbols-outlined text-5xl">play_arrow</span>
                                        </button>
                                        <div className="absolute inset-x-0 bottom-0 px-6 py-4">
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
                                    <p className="font-heading text-4xl font-bold text-text-light dark:text-text-dark leading-tight tracking-tight mb-2">Comprehension Check</p>
                                    <p className="text-base text-gray-600 dark:text-gray-400">Let's see what you've learned. Choose the best option to complete the sentences below.</p>
                                </div>

                                {/* Embedded Quiz Container */}
                                <div className="space-y-6">
                                    {quizQuestions.map((quiz, index) => (
                                        <div key={index} className="bg-container-light dark:bg-container-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <p className="mb-4 font-medium">{quiz.question}</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {quiz.options.map((option) => (
                                                    <button
                                                        key={option}
                                                        onClick={() => setSelectedAnswer(option)}
                                                        className={`text-left p-4 rounded-lg border transition ${
                                                            selectedAnswer === option
                                                                ? 'border-2 border-primary bg-primary/10 text-primary'
                                                                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                        }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Navigation Bar */}
                        <footer className="flex items-center justify-between px-10 py-4 border-t border-gray-200 dark:border-gray-700 mt-auto bg-background-light dark:bg-background-dark">
                            <button className="px-8 py-3 rounded-lg font-bold text-sm border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                Previous
                            </button>
                            <button className="px-8 py-3 rounded-lg font-bold text-sm text-white bg-primary hover:bg-primary/90 transition-colors">
                                Next
                            </button>
                        </footer>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CoreLearningScreen;
