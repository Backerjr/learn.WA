import React from 'react';
import { Link } from 'react-router-dom';

const MissionControlScreen = () => {
    const user = {
        name: 'Alex Doe',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO6Q7JFt-oJ7Ju4UGrankXpKW1MV7ir-7jXjNBZdlChZycf4fRPQmSGSd5Om7BNawBvdwSnQ9EyZiKsZe90BazbQLBT4gZbdnVujdfcG89Ckhp2XjfMe494VvGdeOk797Tep31ByClPmHpvntsFQD4uJLvtvXLqZLYKmfkkaY3ZrH0XcEuPcw7W5BCdFX0jXaE9eB_36QxeUvxD9cMxlSSXvonvvS-kSyWigOJHW6HZruTzDJTO9JTubc4KFNg9FQmniWH0shrm7U',
        level: 12,
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-text-light-primary dark:text-text-dark-primary">
            <div className="flex min-h-screen">
                {/* SideNavBar - FIXED */}
                <aside className="sticky top-0 h-screen w-64 flex-shrink-0 bg-card-light dark:bg-card-dark shadow-md">
                    <div className="flex h-full flex-col justify-between p-4">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2 p-2">
                                <span className="material-symbols-outlined text-primary text-3xl">rocket_launch</span>
                                <h1 className="font-heading text-xl font-bold">RozmoWA</h1>
                            </div>
                            <nav className="flex flex-col gap-1">
                                <Link to="/" className="flex items-center gap-3 rounded-lg bg-primary/10 dark:bg-primary/20 px-3 py-2.5 text-primary">
                                    <span className="material-symbols-outlined fill">dashboard</span>
                                    <p className="text-sm font-medium">Mission Control</p>
                                </Link>
                                <Link to="/learn" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20 text-text-light-primary dark:text-text-dark-primary">
                                    <span className="material-symbols-outlined">school</span>
                                    <p className="text-sm font-medium">Lessons</p>
                                </Link>
                                <Link to="/courses" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20 text-text-light-primary dark:text-text-dark-primary">
                                    <span className="material-symbols-outlined">class</span>
                                    <p className="text-sm font-medium">Classes</p>
                                </Link>
                                <Link to="/quiz" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20 text-text-light-primary dark:text-text-dark-primary">
                                    <span className="material-symbols-outlined">quiz</span>
                                    <p className="text-sm font-medium">Quiz</p>
                                </Link>
                                <Link to="/community" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20 text-text-light-primary dark:text-text-dark-primary">
                                    <span className="material-symbols-outlined">groups</span>
                                    <p className="text-sm font-medium">Community</p>
                                </Link>
                            </nav>
                        </div>
                        <div className="flex flex-col gap-4">
                            {/* Teacher Mode Section */}
                            <div className="border-t border-black/10 dark:border-white/10 pt-4">
                                <p className="px-3 text-xs font-bold text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-wider mb-2">Instructor</p>
                                <Link to="/teacher" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-accent-orange/10 text-text-light-primary dark:text-text-dark-primary">
                                    <span className="material-symbols-outlined text-accent-orange">podium</span>
                                    <p className="text-sm font-medium">Teacher Mode</p>
                                </Link>
                            </div>

                            {/* User Profile Snippet */}
                            <div className="border-t border-black/10 dark:border-white/10 pt-4">
                                <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url("${user.avatarUrl}")` }}></div>
                                    <div className="flex flex-col">
                                        <h1 className="text-base font-medium leading-normal">{user.name}</h1>
                                        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Level {user.level}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 bg-background-light dark:bg-background-dark p-8">
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                         <div className="w-full max-w-4xl h-64 rounded-2xl bg-cover bg-center shadow-lg relative overflow-hidden group" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop")' }}>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-left">
                                <h1 className="text-4xl font-serif font-bold text-white mb-2">Welcome back, Alex.</h1>
                                <p className="text-white/90 text-lg">Your streak is on fire. Ready to master Business English?</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                            <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                <span className="material-symbols-outlined text-4xl text-primary mb-4">school</span>
                                <h3 className="text-xl font-bold mb-2">Continue Lesson</h3>
                                <p className="text-sm text-text-light-secondary">Unit 5: Present Perfect</p>
                            </div>
                            <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                <span className="material-symbols-outlined text-4xl text-secondary">class</span>
                                <h3 className="text-xl font-bold mb-2">Upcoming Class</h3>
                                <p className="text-sm text-text-light-secondary">Today, 4:00 PM with Anna</p>
                            </div>
                             <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                <span className="material-symbols-outlined text-4xl text-accent-green">analytics</span>
                                <h3 className="text-xl font-bold mb-2">Weekly Progress</h3>
                                <p className="text-sm text-text-light-secondary">You learned 42 new words!</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MissionControlScreen;
