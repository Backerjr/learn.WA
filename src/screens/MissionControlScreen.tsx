import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLearning } from '@/contexts/LearningContext';
import { getClasses, EnglishClass } from '@/services/api';

const MissionControlScreen = () => {
    const { userProfile } = useLearning();
    const [classes, setClasses] = useState<EnglishClass[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await getClasses();
                setClasses(data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

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
        <div className="bg-background-light dark:bg-background-dark font-display text-light-primary dark:text-dark-primary">
            <div className="flex min-h-screen">
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
                                <Link to="/courses" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">library_books</span>
                                    <p className="text-sm font-medium">Classes</p>
                                </Link>
                                <Link to="/quiz" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">quiz</span>
                                    <p className="text-sm font-medium">Quiz</p>
                                </Link>
                                <Link to="/library" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">collections_bookmark</span>
                                    <p className="text-sm font-medium">Resources</p>
                                </Link>
                                <Link to="/community" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">groups</span>
                                    <p className="text-sm font-medium">Community</p>
                                </Link>
                                <Link to="/teacher" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">school</span>
                                    <p className="text-sm font-medium">Teacher Mode</p>
                                </Link>
                                <Link to="/teacher/create" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">edit_note</span>
                                    <p className="text-sm font-medium">Assessment Engine</p>
                                </Link>
                                <Link to="/studio" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
                                    <span className="material-symbols-outlined fill">auto_awesome</span>
                                    <p className="text-sm font-medium">The Studio</p>
                                </Link>
                                <Link to="/quiz-library" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">collections_bookmark</span>
                                    <p className="text-sm font-medium">Quiz Library</p>
                                </Link>
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
                                    <div className="bg-primary flex items-center justify-center aspect-square bg-cover rounded-full size-10 text-white font-bold">
                                        {userProfile.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="text-base font-medium leading-normal text-light-primary dark:text-dark-primary">{userProfile.name}</h1>
                                        <p className="text-sm font-normal leading-normal text-light-secondary dark:text-dark-secondary">Level {userProfile.level}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="w-full p-6 lg:p-10">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8">
                            <h1 className="font-heading text-4xl font-bold tracking-tight text-light-primary dark:text-dark-primary">Welcome back, {userProfile.name.split(' ')[0]}!</h1>
                            <p className="mt-2 text-base font-normal leading-normal text-light-secondary dark:text-dark-secondary">Let's continue your learning journey.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="flex flex-col gap-6 lg:col-span-2">
                                <div className="flex flex-col items-stretch justify-start rounded-xl bg-card-light dark:bg-card-dark shadow-sm @container lg:flex-row lg:items-start">
                                    <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl lg:w-2/5 lg:rounded-l-xl lg:rounded-r-none bg-gradient-to-br from-primary to-accent-green flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-6xl">school</span>
                                    </div>
                                    <div className="flex w-full flex-col justify-between gap-4 p-6 lg:w-3/5">
                                        <div>
                                            <p className="text-sm font-normal leading-normal text-light-secondary dark:text-dark-secondary">Up Next</p>
                                            <p className="mt-1 font-heading text-xl font-bold leading-tight tracking-tight text-light-primary dark:text-dark-primary">Unit 5: Mastering the Present Perfect</p>
                                            <p className="mt-2 text-base font-normal leading-normal text-light-secondary dark:text-dark-secondary">Learn how to talk about past events that are still relevant to the present.</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-light-secondary dark:text-dark-secondary">Approx. 15 minutes</p>
                                            <Link to="/learn" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-accent-green text-white text-sm font-medium leading-normal transition-transform hover:scale-105">
                                                <span>Continue Learning</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="flex flex-col gap-2 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                        <span className="material-symbols-outlined text-accent-green">translate</span>
                                        <p className="text-3xl font-bold font-heading text-light-primary dark:text-dark-primary">{stats.wordsLearned}</p>
                                        <p className="text-sm text-light-secondary dark:text-dark-secondary">Words Learned</p>
                                    </div>
                                    <div className="flex flex-col gap-2 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                        <span className="material-symbols-outlined text-accent-green">checklist</span>
                                        <p className="text-3xl font-bold font-heading text-light-primary dark:text-dark-primary">{stats.lessonsCompleted}</p>
                                        <p className="text-sm text-light-secondary dark:text-dark-secondary">Lessons Completed</p>
                                    </div>
                                    <div className="flex flex-col gap-2 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                        <span className="material-symbols-outlined text-accent-green">timer</span>
                                        <p className="text-3xl font-bold font-heading text-light-primary dark:text-dark-primary">{stats.hoursPracticed}</p>
                                        <p className="text-sm text-light-secondary dark:text-dark-secondary">Hours Practiced</p>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="font-heading text-xl font-bold text-light-primary dark:text-dark-primary">Available Classes</h2>
                                        <Link to="/courses" className="text-sm text-primary hover:underline">View All</Link>
                                    </div>
                                    {loading ? (
                                        <p className="text-light-secondary dark:text-dark-secondary">Loading classes...</p>
                                    ) : classes.length > 0 ? (
                                        <div className="space-y-3">
                                            {classes.slice(0, 5).map((cls) => (
                                                <div key={cls.id} className="flex items-center justify-between p-3 rounded-lg bg-background-light dark:bg-background-dark hover:bg-primary/5 transition-colors">
                                                    <div className="flex-1">
                                                        <p className="font-medium text-light-primary dark:text-dark-primary">{cls.name}</p>
                                                        <p className="text-sm text-light-secondary dark:text-dark-secondary">
                                                            {cls.teacher} • {cls.days.join(', ')} • {cls.start_time}
                                                        </p>
                                                    </div>
                                                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                                        {cls.level}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-light-secondary dark:text-dark-secondary">No classes available. Start the backend server to load classes.</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 lg:col-span-1">
                                <div className="flex flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <p className="text-base font-medium leading-normal text-light-primary dark:text-dark-primary">Daily Goal</p>
                                        <p className="text-sm font-normal leading-normal text-light-primary dark:text-dark-primary">{dailyGoal.current}/{dailyGoal.total} XP</p>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-primary/10 dark:bg-primary/20">
                                        <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${(dailyGoal.current / dailyGoal.total) * 100}%` }}></div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-accent-orange">
                                        <span className="material-symbols-outlined fill text-lg">local_fire_department</span>
                                        <p className="text-sm font-medium">{dailyGoal.streak}-Day Streak!</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                    <div className="flex flex-col gap-2">
                                        <p className="font-heading text-lg font-bold leading-tight text-light-primary dark:text-dark-primary">Review Queue</p>
                                        <p className="text-sm font-normal leading-normal text-light-secondary dark:text-dark-secondary">You have 12 items to review.</p>
                                        <Link to="/quiz" className="mt-2 flex w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-9 px-4 bg-primary/10 dark:bg-primary/20 text-light-primary dark:text-dark-primary text-sm font-medium leading-normal transition-colors hover:bg-primary/20 dark:hover:bg-primary/30">
                                            <span className="material-symbols-outlined text-base">refresh</span>
                                            <span>Start Review</span>
                                        </Link>
                                    </div>
                                    <span className="material-symbols-outlined text-5xl text-primary/30">checklist_rtl</span>
                                </div>

                                <div className="flex flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                    <p className="text-base font-medium leading-normal text-light-primary dark:text-dark-primary">Announcements</p>
                                    <div className="flex flex-col gap-3">
                                        {announcements.map((announcement, index) => (
                                            <div key={index} className="flex flex-col gap-1 pb-3 border-b border-black/10 dark:border-white/10 last:border-0 last:pb-0">
                                                <p className="text-sm font-medium leading-normal text-light-primary dark:text-dark-primary">{announcement.title}</p>
                                                <p className="text-xs font-normal leading-normal text-light-secondary dark:text-dark-secondary">{announcement.description}</p>
                                            </div>
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
