import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLearning } from '@/contexts/LearningContext';
import { EnglishClass, enrollStudent, getClasses } from '@/services/api';

const fallbackCourses: EnglishClass[] = [
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
  {
    id: 3,
    name: 'IELTS Bootcamp',
    level: 'Upper-Intermediate',
    teacher: 'David Kim',
    days: ['Saturday'],
    start_time: '10:00',
    end_time: '12:30',
    capacity: 16,
    enrolled: 11,
    syllabus: [],
    students: [],
  },
  {
    id: 4,
    name: 'Coffee & Conversation',
    level: 'Beginner',
    teacher: 'Emily Green',
    days: ['Friday'],
    start_time: '17:00',
    end_time: '18:00',
    capacity: 20,
    enrolled: 14,
    syllabus: [],
    students: [],
  },
];

const CourseDiscoveryScreen = () => {
  const { userProfile } = useLearning();
  const [courses, setCourses] = useState<EnglishClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [enrollingId, setEnrollingId] = useState<number | null>(null);
  const [apiHealthy, setApiHealthy] = useState(true);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getClasses();
      setCourses(data);
      setError(null);
      setApiHealthy(true);
    } catch (err) {
      setApiHealthy(false);
      setError(err instanceof Error ? err.message : 'Failed to load courses. Showing cached catalog instead.');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const displayCourses = courses.length ? courses : fallbackCourses;

  const utilization = (course: EnglishClass) => {
    const value = Math.round((course.enrolled / course.capacity) * 100);
    return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  };

  const stats = useMemo(() => {
    const total = displayCourses.length;
    const seats = displayCourses.reduce((acc, cls) => acc + cls.capacity, 0);
    const filled = displayCourses.reduce((acc, cls) => acc + cls.enrolled, 0);
    const open = Math.max(seats - filled, 0);
    const flexible = displayCourses.filter((cls) => cls.enrolled < cls.capacity).length;
    return { total, open, flexible };
  }, [displayCourses]);

  const handleEnroll = async (course: EnglishClass) => {
    if (!apiHealthy || course.enrolled >= course.capacity) {
      setNotice('API is offline. Previewing saved catalog only.');
      return;
    }
    setEnrollingId(course.id);
    try {
      await enrollStudent(course.id, { student_name: userProfile.name });
      setNotice('Seat reserved. Check Mission Control for confirmation.');
      await fetchCourses();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Could not reserve a seat right now.');
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-background-dark text-dark-primary">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute -top-32 -left-32 size-[420px] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute top-10 right-0 size-[320px] rounded-full bg-secondary/30 blur-[120px]" />
      </div>

      <header className="sticky top-0 z-20 border-b border-white/5 backdrop-blur-lg bg-background-dark/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-lg font-heading">
              SF
            </div>
            <div className="leading-tight">
              <p className="text-sm uppercase tracking-[0.2em] text-dark-secondary">Structured Fun English</p>
              <p className="font-heading text-lg text-white">Live Class Catalog</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-dark-secondary">
            <Link to="/dashboard" className="hover:text-white transition-colors">Mission Control</Link>
            <Link to="/library" className="hover:text-white transition-colors">Library</Link>
            <Link to="/studio" className="hover:text-white transition-colors">Studio</Link>
          </nav>
          <Link
            to="/dashboard"
            className="rounded-full bg-white text-background-dark px-4 py-2 text-sm font-semibold hover:translate-y-[-1px] transition-transform"
          >
            Return to console
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-12 space-y-10">
        <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr] items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-dark-secondary">
              <span className="size-2 rounded-full bg-accent-green"></span>
              Live routes wired
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl leading-tight text-white">
              Drop learners into a real class in under a minute.
            </h1>
            <p className="text-lg text-dark-secondary max-w-2xl">
              Browse the running schedule, claim a seat, and sync it back to Mission Control. If the API is offline, we keep a cached catalog ready.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => fetchCourses()}
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:translate-y-[-1px] transition-transform"
              >
                Refresh live schedule
              </button>
              <Link
                to="/library"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Open my Library
              </Link>
            </div>
            {notice && (
              <div className="flex items-center gap-2 text-sm text-accent-sky bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-base">info</span>
                <p>{notice}</p>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 text-sm text-secondary bg-secondary/10 border border-secondary/20 rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-base">warning</span>
                <p>{error}</p>
              </div>
            )}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-background-dark/60 border border-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-dark-secondary">Courses</p>
              <p className="mt-2 text-3xl font-heading text-white">{stats.total}</p>
              <p className="text-sm text-dark-secondary">Live + cached</p>
            </div>
            <div className="rounded-xl bg-background-dark/60 border border-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-dark-secondary">Open seats</p>
              <p className="mt-2 text-3xl font-heading text-white">{stats.open}</p>
              <p className="text-sm text-dark-secondary">Updated when API is live</p>
            </div>
            <div className="rounded-xl bg-background-dark/60 border border-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-dark-secondary">Flexible</p>
              <p className="mt-2 text-3xl font-heading text-white">{stats.flexible}</p>
              <p className="text-sm text-dark-secondary">Classes with space</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-dark-secondary">Class catalog</p>
              <h2 className="font-heading text-2xl text-white">Ready-to-run sessions</h2>
            </div>
            <Link to="/dashboard" className="text-sm text-accent-sky hover:text-white transition-colors">
              Jump to dashboard
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-pulse text-dark-secondary">Loading live schedule…</div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {displayCourses.map((course) => {
                const fill = utilization(course);
                const isFull = course.enrolled >= course.capacity;
                return (
                  <div key={course.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-primary/20 text-primary px-2 py-0.5 text-[11px] font-semibold">{course.level}</span>
                          <span className="rounded-full bg-secondary/20 text-secondary px-2 py-0.5 text-[11px] font-semibold">{course.days.join(' • ')}</span>
                        </div>
                        <h3 className="text-xl font-heading text-white">{course.name}</h3>
                        <p className="text-sm text-dark-secondary">With {course.teacher} • {course.start_time} - {course.end_time}</p>
                      </div>
                      <div className="rounded-xl bg-background-dark/70 border border-white/10 px-3 py-2 text-center">
                        <p className="text-xs text-dark-secondary">Seats</p>
                        <p className="text-lg font-heading text-white">{course.enrolled}/{course.capacity}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-dark-secondary">
                        <span>{fill}% booked</span>
                        <span>{course.capacity - course.enrolled} open</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${fill}%` }} />
                      </div>
                    </div>
                    <div className="mt-5 flex items-center gap-3">
                      <button
                        onClick={() => handleEnroll(course)}
                        disabled={isFull || enrollingId === course.id}
                        className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition-colors ${
                          isFull
                            ? 'bg-white/10 text-dark-secondary cursor-not-allowed'
                            : 'bg-primary text-white hover:bg-primary/90'
                        }`}
                      >
                        {isFull ? 'Class full' : enrollingId === course.id ? 'Reserving…' : 'Reserve a seat'}
                      </button>
                      <Link
                        to="/library"
                        className="rounded-full border border-white/15 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors"
                      >
                        Save to library
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CourseDiscoveryScreen;
