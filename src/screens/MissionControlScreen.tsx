import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLearning } from '@/contexts/LearningContext';
import { EnglishClass, getClasses } from '@/services/api';

const fallbackClasses: EnglishClass[] = [
  {
    id: 1,
    name: 'Present Perfect Launch Lab',
    level: 'Intermediate',
    teacher: 'Anna Smith',
    days: ['Monday', 'Wednesday'],
    start_time: '09:00',
    end_time: '10:30',
    capacity: 12,
    enrolled: 6,
    syllabus: [],
    students: [],
  },
  {
    id: 2,
    name: 'Executive Writing Studio',
    level: 'Advanced',
    teacher: 'J. Lopez',
    days: ['Tuesday'],
    start_time: '14:00',
    end_time: '15:30',
    capacity: 10,
    enrolled: 9,
    syllabus: [],
    students: [],
  },
];

const MissionControlScreen = () => {
  const { userProfile } = useLearning();
  const [classes, setClasses] = useState<EnglishClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        setClasses(data);
        setError(null);
      } catch (err) {
        setError('Live classes unavailable. Showing cached data.');
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const stats = useMemo(
    () => ({
      wordsLearned: 540,
      lessonsCompleted: 72,
      hoursPracticed: 28,
    }),
    []
  );

  const dailyGoal = useMemo(
    () => ({
      current: 150,
      total: 200,
      streak: 3,
    }),
    []
  );

  const announcements = useMemo(
    () => [
      {
        title: 'Assessment Studio refresh',
        description: 'Save generated quizzes directly into your Quiz Library.',
      },
      {
        title: 'Live catalog sync',
        description: 'Courses now render even when the API is offline.',
      },
      {
        title: 'Library pinning',
        description: 'Save resources to classes to keep them launch-ready.',
      },
    ],
    []
  );

  const classList = classes.length ? classes : fallbackClasses;

  return (
    <div className="min-h-screen bg-background-dark text-dark-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-20 -left-32 size-[360px] rounded-full bg-primary/25 blur-[120px]" />
        <div className="absolute top-10 right-0 size-[280px] rounded-full bg-secondary/25 blur-[120px]" />
      </div>

      <header className="relative z-10 border-b border-white/5 bg-background-dark/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-lg font-heading">
              SF
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-dark-secondary">Mission Control</p>
              <p className="font-heading text-lg text-white">{userProfile.name}</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-dark-secondary">
            <Link to="/courses" className="hover:text-white transition-colors">Classes</Link>
            <Link to="/library" className="hover:text-white transition-colors">Library</Link>
            <Link to="/quiz-library" className="hover:text-white transition-colors">Quiz Library</Link>
            <Link to="/studio" className="hover:text-white transition-colors">Studio</Link>
          </nav>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/10 border border-white/10 px-3 py-2 text-sm text-white">{userProfile.level}</div>
            <Link
              to="/profile"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-10 space-y-10">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-dark-secondary">Control Room</p>
              <h1 className="font-heading text-4xl text-white leading-tight">
                Welcome back, {userProfile.name.split(' ')[0]}.
              </h1>
              <p className="text-dark-secondary max-w-2xl">
                Run classes, attach resources, and launch assessments. Everything here is wired to live routes—even if the backend blips.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/courses"
                  className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:translate-y-[-1px] transition-transform"
                >
                  Go to class catalog
                </Link>
                <Link
                  to="/library"
                  className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Open library
                </Link>
                <Link
                  to="/studio"
                  className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Build a quiz
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 min-w-[260px]">
              <div className="rounded-2xl bg-background-dark/60 border border-white/10 p-3 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-dark-secondary">Words</p>
                <p className="font-heading text-3xl text-white">{stats.wordsLearned}</p>
              </div>
              <div className="rounded-2xl bg-background-dark/60 border border-white/10 p-3 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-dark-secondary">Lessons</p>
                <p className="font-heading text-3xl text-white">{stats.lessonsCompleted}</p>
              </div>
              <div className="rounded-2xl bg-background-dark/60 border border-white/10 p-3 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-dark-secondary">Hours</p>
                <p className="font-heading text-3xl text-white">{stats.hoursPracticed}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Continue lesson', description: 'Jump back to your stepper', to: '/learn', icon: 'play_circle' },
            { title: 'Resource Library', description: 'Pin resources to classes', to: '/library', icon: 'collections_bookmark' },
            { title: 'Quiz Library', description: 'Launch a saved quiz', to: '/quiz-library', icon: 'library_books' },
          ].map((action) => (
            <Link
              key={action.title}
              to={action.to}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-white/30 transition-colors flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-xl text-white/80">{action.icon}</span>
              <div>
                <p className="font-heading text-lg text-white">{action.title}</p>
                <p className="text-sm text-dark-secondary">{action.description}</p>
              </div>
            </Link>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl text-white">Today’s learning path</h2>
              <Link to="/learn" className="text-sm text-accent-sky hover:text-white transition-colors">Open lesson</Link>
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
                  className="rounded-xl border border-white/10 bg-background-dark/60 p-4 hover:border-white/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-white/80">{step.icon}</span>
                    <p className="font-medium text-white">{step.label}</p>
                  </div>
                  <p className="text-sm text-dark-secondary mt-1">{step.detail}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-white">Daily goal</p>
              <p className="text-sm text-white">{dailyGoal.current}/{dailyGoal.total} XP</p>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${(dailyGoal.current / dailyGoal.total) * 100}%` }}></div>
            </div>
            <div className="flex items-center gap-2 text-accent-orange">
              <span className="material-symbols-outlined fill text-lg">local_fire_department</span>
              <p className="text-sm font-medium">{dailyGoal.streak}-day streak • Keep it going</p>
            </div>
            <Link
              to="/quiz"
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary/15 px-4 py-3 text-sm font-medium text-white hover:bg-primary/25 transition-colors"
            >
              <span className="material-symbols-outlined text-base">refresh</span>
              Review queue • 12 items
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl text-white">Classes</h2>
              <Link to="/courses" className="text-sm text-accent-sky hover:text-white transition-colors">View all</Link>
            </div>
            {loading ? (
              <p className="text-dark-secondary">Loading classes...</p>
            ) : (
              <div className="space-y-3">
                {classList.slice(0, 5).map((cls) => (
                  <div key={cls.id} className="flex items-center justify-between p-4 rounded-xl bg-background-dark/60 border border-white/10 hover:border-white/30 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-white">{cls.name}</p>
                      <p className="text-sm text-dark-secondary">
                        {cls.teacher} • {cls.days.join(', ')} • {cls.start_time}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-white font-medium">
                        {cls.level}
                      </span>
                      <span className="text-xs text-dark-secondary">{cls.enrolled}/{cls.capacity} seats</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {error && <p className="mt-3 text-sm text-secondary">{error}</p>}
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-white">Announcements</p>
              <Link to="/community" className="text-sm text-accent-sky hover:text-white transition-colors">Community</Link>
            </div>
            <div className="flex flex-col gap-3">
              {announcements.map((announcement, index) => (
                <div key={index} className="flex flex-col gap-1 pb-3 border-b border-white/10 last:border-0 last:pb-0">
                  <p className="text-sm font-medium leading-normal text-white">{announcement.title}</p>
                  <p className="text-xs font-normal leading-normal text-dark-secondary">{announcement.description}</p>
                </div>
              ))}
            </div>
            <Link
              to="/quiz-library"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-base">task</span>
              Jump to quiz library
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MissionControlScreen;
