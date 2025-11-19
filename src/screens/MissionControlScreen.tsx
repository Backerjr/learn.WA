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
                                
                                <div className="my-3 border-t border-zinc-200 dark:border-zinc-800"></div>
                                
                                <Link to="/teacher" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">school</span>
                                    <p className="text-sm font-medium">Teacher Mode</p>
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

                <main className="w-full">
                    {/* Hero Section with Background Image */}
                    <div className="relative h-[500px] overflow-hidden">
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ 
                                backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&auto=format&fit=crop')"
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                        </div>
                        
                        <div className="relative h-full flex flex-col justify-center px-10 lg:px-16 max-w-7xl">
                            <div className="backdrop-blur-md bg-white/10 dark:bg-white/5 px-6 py-3 rounded-full w-fit mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined fill text-accent-orange text-base">local_fire_department</span>
                                <p className="text-sm font-medium text-white">{dailyGoal.streak}-Day Streak!</p>
                                <span className="text-white/50 mx-2">•</span>
                                <p className="text-sm text-white/90">{dailyGoal.current}/{dailyGoal.total} XP Today</p>
                            </div>
                            
                            <h1 className="font-heading text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-3xl">
                                Welcome back,<br />{userProfile.name.split(' ')[0]}!
                            </h1>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl font-light leading-relaxed">
                                Continue your English mastery journey. Your next lesson awaits.
                            </p>
                            
                            <div className="flex gap-4">
                                <Link 
                                    to="/learn" 
                                    className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all transform hover:scale-105 flex items-center gap-2"
                                >
                                    <span>Continue Learning</span>
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                                <Link 
                                    to="/quiz" 
                                    className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all border border-white/30"
                                >
                                    <span>Start Review</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="flex flex-col gap-6 lg:col-span-2">
                                {/* Course Cards with Images */}
                                <div>
                                    <h2 className="font-heading text-2xl font-bold text-light-primary dark:text-dark-primary mb-6">Your Learning Path</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Link 
                                            to="/learn" 
                                            className="group relative h-72 rounded-xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105"
                                        >
                                            <div 
                                                className="absolute inset-0 bg-cover bg-center"
                                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop')" }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                                            </div>
                                            <div className="relative h-full flex flex-col justify-end p-6">
                                                <span className="text-xs uppercase tracking-wider text-white/70 mb-2">Up Next</span>
                                                <h3 className="font-heading text-2xl font-bold text-white mb-2">Present Perfect Tense</h3>
                                                <p className="text-sm text-white/80 mb-4">Master timing and context</p>
                                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                                    <span className="material-symbols-outlined text-base">schedule</span>
                                                    <span>15 min</span>
                                                </div>
                                            </div>
                                        </Link>

                                        <Link 
                                            to="/courses" 
                                            className="group relative h-72 rounded-xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105"
                                        >
                                            <div 
                                                className="absolute inset-0 bg-cover bg-center"
                                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop')" }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                                            </div>
                                            <div className="relative h-full flex flex-col justify-end p-6">
                                                <span className="text-xs uppercase tracking-wider text-white/70 mb-2">Explore</span>
                                                <h3 className="font-heading text-2xl font-bold text-white mb-2">All Classes</h3>
                                                <p className="text-sm text-white/80 mb-4">{classes.length} classes available</p>
                                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                                    <span className="material-symbols-outlined text-base">groups</span>
                                                    <span>Join a class</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="flex flex-col gap-2 rounded-xl bg-gradient-to-br from-accent-green/10 to-accent-green/5 p-6 shadow-sm border border-accent-green/20 transition-transform duration-300 hover:scale-105">
                                        <span className="material-symbols-outlined text-accent-green">translate</span>
                                        <p className="text-3xl font-bold font-heading text-light-primary dark:text-dark-primary">{stats.wordsLearned}</p>
                                        <p className="text-sm text-light-secondary dark:text-dark-secondary">Words Learned</p>
                                    </div>
                                    <div className="flex flex-col gap-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 shadow-sm border border-primary/20 transition-transform duration-300 hover:scale-105">
                                        <span className="material-symbols-outlined text-primary">checklist</span>
                                        <p className="text-3xl font-bold font-heading text-light-primary dark:text-dark-primary">{stats.lessonsCompleted}</p>
                                        <p className="text-sm text-light-secondary dark:text-dark-secondary">Lessons Completed</p>
                                    </div>
                                    <div className="flex flex-col gap-2 rounded-xl bg-gradient-to-br from-accent-orange/10 to-accent-orange/5 p-6 shadow-sm border border-accent-orange/20 transition-transform duration-300 hover:scale-105">
                                        <span className="material-symbols-outlined text-accent-orange">timer</span>
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
                                <div className="flex flex-col gap-4 rounded-xl backdrop-blur-md bg-gradient-to-br from-primary/20 to-accent-green/20 p-6 shadow-lg border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <p className="text-base font-medium leading-normal text-light-primary dark:text-dark-primary">Daily Goal</p>
                                        <p className="text-sm font-normal leading-normal text-light-primary dark:text-dark-primary">{dailyGoal.current}/{dailyGoal.total} XP</p>
                                    </div>
                                    <div className="h-3 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                                        <div className="h-3 rounded-full bg-gradient-to-r from-primary to-accent-green transition-all" style={{ width: `${(dailyGoal.current / dailyGoal.total) * 100}%` }}></div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-accent-orange">
                                        <span className="material-symbols-outlined fill text-lg">local_fire_department</span>
                                        <p className="text-sm font-medium">{dailyGoal.streak}-Day Streak!</p>
                                    </div>
                                </div>

                                <Link 
                                    to="/quiz" 
                                    className="group flex items-center justify-between gap-4 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    <div className="flex flex-col gap-2">
                                        <p className="font-heading text-lg font-bold leading-tight text-light-primary dark:text-dark-primary">Review Queue</p>
                                        <p className="text-sm font-normal leading-normal text-light-secondary dark:text-dark-secondary">12 items waiting</p>
                                        <div className="mt-2 flex w-fit items-center gap-2 text-primary">
                                            <span className="material-symbols-outlined text-base">refresh</span>
                                            <span className="text-sm font-medium">Start Review</span>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-5xl text-primary/30 group-hover:text-primary/50 transition-colors">checklist_rtl</span>
                                </Link>

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
