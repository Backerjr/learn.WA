import React from 'react';
import { Link } from 'react-router-dom';

const MissionControlScreen = () => {
    const user = {
        name: 'Alex Doe',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO6Q7JFt-oJ7Ju4UGrankXpKW1MV7ir-7jXjNBZdlChZycf4fRPQmSGSd5Om7BNawBvdwSnQ9EyZiKsZe90BazbQLBT4gZbdnVujdfcG89Ckhp2XjfMe494VvGdeOk797Tep31ByClPmHpvntsFQD4uJLvtvXLqZLYKmfkkaY3ZrH0XcEuPcw7W5BCdFX0jXaE9eB_36QxeUvxD9cMxlSSXvonvvS-kSyWigOJHW6HZruTzDJTO9JTubc4KFNg9FQmniWH0shrm7U',
        level: 12,
    };

    const stats = {
        wordsLearned: 540,
        lessonsCompleted: 72,
        hoursPracticed: 28,
    };

    const dailyGoal = {
        current: 150,
        total: 200,
        streak: 3,
    };

    const announcements = [
        {
            title: 'New Feature: Speaking Practice!',
            description: 'Practice your pronunciation with our new AI tool.',
        },
        {
            title: 'Community Challenge: Idiom of the Week',
            description: 'Join the discussion and share examples.',
        },
        {
            title: 'Scheduled Maintenance',
            description: 'A short downtime is expected this Sunday.',
        },
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-text-light-primary dark:text-text-dark-primary">
            <div className="flex min-h-screen">
                {/* SideNavBar */}
                <aside className="sticky top-0 h-screen w-64 flex-shrink-0 bg-card-light dark:bg-card-dark shadow-md">
                    <div className="flex h-full flex-col justify-between p-4">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2 p-2">
                                <span className="material-symbols-outlined text-primary text-3xl">rocket_launch</span>
                                <h1 className="font-heading text-xl font-bold">LingoQuest</h1>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Link to="/" className="flex items-center gap-3 rounded-lg bg-primary/10 dark:bg-primary/20 px-3 py-2.5 text-primary">
                                    <span className="material-symbols-outlined fill">dashboard</span>
                                    <p className="text-sm font-medium">Mission Control</p>
                                </Link>
                                <Link to="/learn" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">school</span>
                                    <p className="text-sm font-medium">Lessons</p>
                                </Link>
                                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">groups</span>
                                    <p className="text-sm font-medium">Community</p>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <Link to="/profile" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">settings</span>
                                    <p className="text-sm font-medium">Settings</p>
                                </Link>
                                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">help</span>
                                    <p className="text-sm font-medium">Help</p>
                                </a>
                            </div>
                            <div className="border-t border-black/10 dark:border-white/10 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url("${user.avatarUrl}")` }}></div>
                                    <div className="flex flex-col">
                                        <h1 className="text-base font-medium leading-normal text-text-light-primary dark:text-text-dark-primary">{user.name}</h1>
                                        <p className="text-sm font-normal leading-normal text-text-light-secondary dark:text-text-dark-secondary">Level {user.level}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="w-full p-6 lg:p-10">
                    <div className="mx-auto max-w-7xl">
                        {/* PageHeading */}
                        <div className="mb-8">
                            <h1 className="font-heading text-4xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">Welcome back, {user.name.split(' ')[0]}!</h1>
                            <p className="mt-2 text-base font-normal leading-normal text-text-light-secondary dark:text-text-dark-secondary">Let's continue your learning journey.</p>
                        </div>

                        {/* Dashboard Grid */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Left Column */}
                            <div className="flex flex-col gap-6 lg:col-span-2">
                                {/* Continue Learning Card */}
                                <div className="flex flex-col items-stretch justify-start rounded-xl bg-card-light dark:bg-card-dark shadow-sm @container lg:flex-row lg:items-start">
                                    <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl lg:w-2/5 lg:rounded-l-xl lg:rounded-r-none" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXokdVDZgSco3Rq4LPnq5NKHJ7uwO21uV68W9fylcVgw0jZGI3Kno_V818xiDCErP7WUnuP5eyOgBc8_udGwMTTo3E6LayGttYBUO1gdD8RqcMSujsF-bfu-abYk7RNF-Do1RB3JCy1eHJm4GZLCnaTmY2KxauF28oohBhHO3w0zrMzb2hpzUpx_4OAw85yhb_Icu5FYD-_r2uNu804qo6c9fO5SsO-9V_zSgIIa6N1FiD-_wST26CAEbuH5-R6_Vh9_mTih284ok")` }}></div>
                                    <div className="flex w-full flex-col justify-between gap-4 p-6 lg:w-3/5">
                                        <div>
                                            <p className="text-sm font-normal leading-normal text-text-light-secondary dark:text-text-dark-secondary">Up Next</p>
                                            <p className="mt-1 font-heading text-xl font-bold leading-tight tracking-tight text-text-light-primary dark:text-text-dark-primary">Unit 5: Mastering the Present Perfect</p>
                                            <p className="mt-2 text-base font-normal leading-normal text-text-light-secondary dark:text-text-dark-secondary">Learn how to talk about past events that are still relevant to the present.</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Approx. 15 minutes</p>
                                            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-accent-green text-white text-sm font-medium leading-normal transition-transform hover:scale-105">
                                                <span>Continue Learning</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Stats Overview Cards */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="flex flex-col gap-2 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                        <span className="material-symbols-outlined text-accent-green">translate</span>
                                        <p className="text-3xl font-bold font-heading text-text-light-primary dark:text-text-dark-primary">{stats.wordsLearned}</p>
                                        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Words Learned</p>
                                    </div>
                                    <div className="flex flex-col gap-2 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                        <span className="material-symbols-outlined text-accent-green">checklist</span>
                                        <p className="text-3xl font-bold font-heading text-text-light-primary dark:text-text-dark-primary">{stats.lessonsCompleted}</p>
                                        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Lessons Completed</p>
                                    </div>
                                    <div className="flex flex-col gap-2 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                        <span className="material-symbols-outlined text-accent-green">timer</span>
                                        <p className="text-3xl font-bold font-heading text-text-light-primary dark:text-text-dark-primary">{stats.hoursPracticed}</p>
                                        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Hours Practiced</p>
                                    </div>
                                </div>
                            </div>
                            {/* Right Column */}
                            <div className="flex flex-col gap-6 lg:col-span-1">
                                {/* Daily Goal Card */}
                                <div className="flex flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <p className="text-base font-medium leading-normal text-text-light-primary dark:text-text-dark-primary">Daily Goal</p>
                                        <p className="text-sm font-normal leading-normal text-text-light-primary dark:text-text-dark-primary">{dailyGoal.current}/{dailyGoal.total} XP</p>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-primary/10 dark:bg-primary/20">
                                        <div className="h-2 rounded-full bg-primary" style={{ width: `${(dailyGoal.current / dailyGoal.total) * 100}%` }}></div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-accent-orange">
                                        <span className="material-symbols-outlined fill text-lg">local_fire_department</span>
                                        <p className="text-sm font-medium">{dailyGoal.streak}-Day Streak!</p>
                                    </div>
                                </div>
                                {/* Review Queue Card */}
                                <div className="flex items-center justify-between gap-4 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                    <div className="flex flex-col gap-2">
                                        <p className="font-heading text-lg font-bold leading-tight text-text-light-primary dark:text-text-dark-primary">Review Queue</p>
                                        <p className="text-sm font-normal leading-normal text-text-light-secondary dark:text-text-dark-secondary">You have 12 items to review.</p>
                                        <button className="mt-2 flex w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-9 px-4 bg-primary/10 dark:bg-primary/20 text-text-light-primary dark:text-text-dark-primary text-sm font-medium leading-normal transition-colors hover:bg-primary/20 dark:hover:bg-primary/30">
                                            <span className="material-symbols-outlined text-base">refresh</span>
                                            <span>Start Review</span>
                                        </button>
                                    </div>
                                    <span className="material-symbols-outlined text-5xl text-primary/30">checklist_rtl</span>
                                </div>
                                {/* Announcements Card */}
                                <div className="flex flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                    <h3 className="font-heading text-lg font-bold text-text-light-primary dark:text-text-dark-primary">Announcements</h3>
                                    <div className="flex flex-col gap-4">
                                        {announcements.map((announcement, index) => (
                                            <React.Fragment key={index}>
                                                <div className="flex flex-col">
                                                    <p className="font-medium text-sm text-text-light-primary dark:text-text-dark-primary">{announcement.title}</p>
                                                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">{announcement.description}</p>
                                                </div>
                                                {index < announcements.length - 1 && <div className="w-full border-t border-black/10 dark:border-white/10"></div>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MissionControlScreen;
