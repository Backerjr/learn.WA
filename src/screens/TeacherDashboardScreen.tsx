import { Link } from 'react-router-dom';

const TeacherDashboardScreen = () => {
    const stats = {
        totalStudents: 47,
        activeClasses: 5,
        pendingAssignments: 12,
    };

    const classes = [
        {
            id: 1,
            name: 'Beginner Conversational',
            schedule: 'Monday, Wednesday • 09:00-10:30',
            students: 12,
        },
        {
            id: 2,
            name: 'Advanced Writing',
            schedule: 'Tuesday, Thursday • 14:00-15:45',
            students: 8,
        },
        {
            id: 3,
            name: 'Business Negotiation',
            schedule: 'Friday • 18:00-20:00',
            students: 15,
        },
        {
            id: 4,
            name: 'IELTS Prep Bootcamp',
            schedule: 'Saturday, Sunday • 10:00-13:00',
            students: 20,
        },
        {
            id: 5,
            name: 'Coffee & Chat',
            schedule: 'Wednesday • 16:00-17:00',
            students: 10,
        },
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-light-primary dark:text-dark-primary min-h-screen">
            <div className="flex min-h-screen">
                <aside className="sticky top-0 h-screen w-64 flex-shrink-0 bg-card-light dark:bg-card-dark shadow-md">
                    <div className="flex h-full flex-col justify-between p-4">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2 p-2">
                                <span className="material-symbols-outlined text-primary text-3xl">rocket_launch</span>
                                <h1 className="font-heading text-xl font-bold">LingoQuest</h1>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">dashboard</span>
                                    <p className="text-sm font-medium">Mission Control</p>
                                </Link>
                                <Link to="/teacher" className="flex items-center gap-3 rounded-lg bg-primary/10 dark:bg-primary/20 px-3 py-2.5 text-primary">
                                    <span className="material-symbols-outlined fill">school</span>
                                    <p className="text-sm font-medium">Teacher Mode</p>
                                </Link>
                                <Link to="/community" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/10 dark:hover:bg-primary/20">
                                    <span className="material-symbols-outlined">groups</span>
                                    <p className="text-sm font-medium">Community</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="w-full p-6 lg:p-10">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8">
                            <h1 className="font-heading text-4xl font-bold tracking-tight text-light-primary dark:text-dark-primary">Teacher Portal</h1>
                            <p className="mt-2 text-base font-normal leading-normal text-light-secondary dark:text-dark-secondary">Manage your classes and track student progress.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
                            <div className="flex flex-col gap-2 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                <span className="material-symbols-outlined text-primary">group</span>
                                <p className="text-3xl font-bold font-heading text-light-primary dark:text-dark-primary">{stats.totalStudents}</p>
                                <p className="text-sm text-light-secondary dark:text-dark-secondary">Total Students</p>
                            </div>
                            <div className="flex flex-col gap-2 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                <span className="material-symbols-outlined text-accent-green">library_books</span>
                                <p className="text-3xl font-bold font-heading text-light-primary dark:text-dark-primary">{stats.activeClasses}</p>
                                <p className="text-sm text-light-secondary dark:text-dark-secondary">Active Classes</p>
                            </div>
                            <div className="flex flex-col gap-2 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                                <span className="material-symbols-outlined text-accent-orange">assignment</span>
                                <p className="text-3xl font-bold font-heading text-light-primary dark:text-dark-primary">{stats.pendingAssignments}</p>
                                <p className="text-sm text-light-secondary dark:text-dark-secondary">Pending Assignments</p>
                            </div>
                        </div>

                        <div className="rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm">
                            <h2 className="font-heading text-xl font-bold text-light-primary dark:text-dark-primary mb-4">Your Classes</h2>
                            <div className="space-y-3">
                                {classes.map((cls) => (
                                    <div key={cls.id} className="flex items-center justify-between p-4 rounded-lg bg-background-light dark:bg-background-dark hover:bg-primary/5 transition-colors">
                                        <div className="flex-1">
                                            <p className="font-medium text-light-primary dark:text-dark-primary">{cls.name}</p>
                                            <p className="text-sm text-light-secondary dark:text-dark-secondary">{cls.schedule}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-light-primary dark:text-dark-primary">{cls.students} students</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TeacherDashboardScreen;
