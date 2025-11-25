import { useState, useEffect, useMemo } from 'react';
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

    const stats = useMemo(() => ({
        wordsLearned: 540,
        lessonsCompleted: 72,
        hoursPracticed: 28,
    }), []);

    const dailyGoal = useMemo(() => ({
        current: 150,
        total: 200,
        streak: 3,
    }), []);

    const announcements = useMemo(() => ([
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
    ]), []);

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
                                <Link to="/dashboard" className="flex items-center gap-3 rounded-lg bg-primary/10 dark:bg-primary/20 px-3 py-2.5 text-primary">
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
                    <div className="mx-auto max-w-7xl space-y-8">
                        <section className="rounded-2xl bg-gradient-to-br from-primary via-zinc-900 to-zinc-800 text-white p-8 shadow-xl">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="space-y-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">Mission Control</p>
                                    <h1 className="font-heading text-4xl font-bold leading-tight">Welcome back, {userProfile.name.split(' ')[0]}.</h1>
                                    <p className="max-w-2xl text-white/80">Guide your learners, drop them into a quiz, or prep a class in seconds. Everything below leads somewhere real.</p>
                                    <div className="flex flex-wrap gap-3">
                                        <Link to="/learn" className="rounded-full bg-white text-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] hover:scale-[1.01] transition-transform shadow-lg">
                                            Start Lesson
                                        </Link>
                                        <Link to="/quiz" className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white hover:bg-white/10 transition-colors">
                                            Take Quiz
                                        </Link>
                                        <Link to="/library" className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white hover:bg-white/10 transition-colors">
                                            Resource Library
                                        </Link>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 min-w-[260px]">
                                    <div className="rounded-xl bg-white/10 p-3 text-center">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Words</p>
                                        <p className="font-heading text-3xl">{stats.wordsLearned}</p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-3 text-center">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Lessons</p>
                                        <p className="font-heading text-3xl">{stats.lessonsCompleted}</p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-3 text-center">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Hours</p>
                                        <p className="font-heading text-3xl">{stats.hoursPracticed}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { title: 'Continue Lesson', description: 'Jump back to Unit 5 with your stepper.', to: '/learn', icon: 'play_circle' },
                                { title: 'Resource Library', description: 'Filter, save, and launch real materials.', to: '/library', icon: 'collections_bookmark' },
                                { title: 'Quiz Library', description: 'Use or review stored quizzes.', to: '/quiz-library', icon: 'library_books' },
                                { title: 'Assessment Studio', description: 'Build a quiz in minutes.', to: '/teacher/create', icon: 'auto_awesome' },
                            ].map((action) => (
                                <Link
                                    key={action.title}
                                    to={action.to}
                                    className="rounded-xl border border-card-light dark:border-card-dark bg-card-light dark:bg-card-dark p-4 hover:-translate-y-1 transition-transform"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">{action.icon}</span>
                                        <div>
                                            <p className="font-heading text-lg text-light-primary dark:text-dark-primary">{action.title}</p>
                                            <p className="text-sm text-light-secondary dark:text-dark-secondary">{action.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </section>

                        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                            <div className="rounded-xl bg-card-light dark:bg-card-dark p-6 border border-card-light dark:border-card-dark space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-heading text-xl font-bold text-light-primary dark:text-dark-primary">Today’s learning path</h2>
                                    <Link to="/learn" className="text-sm text-primary hover:underline">Open lesson</Link>
                                </div>
                                <div className="grid gap-3 md:grid-cols-3">
                                    {[
                                        { label: 'Learn', detail: 'Unit 5 • Present Perfect', to: '/learn', icon: 'menu_book' },
                                        { label: 'Quiz', detail: '10-question check-in', to: '/quiz', icon: 'quiz' },
                                        { label: 'Library', detail: 'Download article toolkit', to: '/library', icon: 'download' },
                                    ].map((step) => (
                                        <Link
                                            key={step.label}
                                            to={step.to}
                                            className="rounded-lg border border-card-light dark:border-card-dark bg-background-light dark:bg-background-dark p-4 hover:border-primary transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-base">{step.icon}</span>
                                                <p className="font-medium">{step.label}</p>
                                            </div>
                                            <p className="text-sm text-light-secondary dark:text-dark-secondary mt-1">{step.detail}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-xl bg-card-light dark:bg-card-dark p-6 border border-card-light dark:border-card-dark space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-medium text-light-primary dark:text-dark-primary">Daily goal</p>
                                    <p className="text-sm text-light-primary dark:text-dark-primary">{dailyGoal.current}/{dailyGoal.total} XP</p>
                                </div>
                                <div className="h-2 w-full rounded-full bg-primary/10 dark:bg-primary/20">
                                    <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${(dailyGoal.current / dailyGoal.total) * 100}%` }}></div>
                                </div>
                                <div className="flex items-center gap-2 text-accent-orange">
                                    <span className="material-symbols-outlined fill text-lg">local_fire_department</span>
                                    <p className="text-sm font-medium">{dailyGoal.streak}-day streak • Keep it going</p>
                                </div>
                                <Link
                                    to="/quiz"
                                    className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary/10 dark:bg-primary/20 px-4 py-2 text-sm font-medium text-light-primary dark:text-dark-primary hover:bg-primary/20"
                                >
                                    <span className="material-symbols-outlined text-base">refresh</span>
                                    Review queue • 12 items
                                </Link>
                            </div>
                        </section>

                        <section className="grid gap-6 lg:grid-cols-3">
                            <div className="lg:col-span-2 rounded-xl bg-card-light dark:bg-card-dark p-6 border border-card-light dark:border-card-dark">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-heading text-xl font-bold text-light-primary dark:text-dark-primary">Classes</h2>
                                    <Link to="/courses" className="text-sm text-primary hover:underline">View all</Link>
                                </div>
                                {loading ? (
                                    <p className="text-light-secondary dark:text-dark-secondary">Loading classes...</p>
                                ) : classes.length > 0 ? (
                                    <div className="space-y-3">
                                        {classes.slice(0, 5).map((cls) => (
                                            <div key={cls.id} className="flex items-center justify-between p-4 rounded-lg bg-background-light dark:bg-background-dark hover:bg-primary/5 transition-colors border border-card-light dark:border-card-dark">
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

                            <div className="rounded-xl bg-card-light dark:bg-card-dark p-6 border border-card-light dark:border-card-dark flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-medium text-light-primary dark:text-dark-primary">Announcements</p>
                                    <Link to="/community" className="text-sm text-primary hover:underline">Community</Link>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {announcements.map((announcement, index) => (
                                        <div key={index} className="flex flex-col gap-1 pb-3 border-b border-black/10 dark:border-white/10 last:border-0 last:pb-0">
                                            <p className="text-sm font-medium leading-normal text-light-primary dark:text-dark-primary">{announcement.title}</p>
                                            <p className="text-xs font-normal leading-normal text-light-secondary dark:text-dark-secondary">{announcement.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    to="/quiz-library"
                                    className="inline-flex items-center gap-2 rounded-lg border border-card-dark px-4 py-2 text-sm font-medium hover:bg-primary/5"
                                >
                                    <span className="material-symbols-outlined text-base">task</span>
                                    Jump to quiz library
                                </Link>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MissionControlScreen;
