import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClasses, EnglishClass } from '../services/api';

const CourseDiscoveryScreen = () => {
    const [view, setView] = useState('Path View');
    const [courses, setCourses] = useState<EnglishClass[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const data = await getClasses();
                setCourses(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load courses');
                console.error('Error fetching courses:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-brand-off-white text-brand-dark-gray">
            {/* TopNavBar */}
            <header className="sticky top-0 z-10 w-full border-b border-gray-200/80 bg-brand-off-white/80 backdrop-blur-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-brand-teal text-3xl">school</span>
                        <h2 className="font-heading text-xl font-bold text-brand-dark-gray">Structured Fun English</h2>
                    </div>
                    <div className="hidden items-center gap-8 md:flex">
                        <Link to="/dashboard" className="text-sm font-medium text-brand-dark-gray transition-colors hover:text-brand-teal">Dashboard</Link>
                        <Link to="/profile" className="text-sm font-medium text-brand-dark-gray transition-colors hover:text-brand-teal">Profile</Link>
                        <Link to="/profile" className="text-sm font-medium text-brand-dark-gray transition-colors hover:text-brand-teal">Settings</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-brand-dark-gray transition-colors hover:bg-gray-200/50">
                            <span className="material-symbols-outlined text-2xl">notifications</span>
                        </button>
                        <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1YZ_LL6NdUQ1PxvrM_EpxdeuY68nlrl9J93f8KKYuVhoFiy2AgrGCzr0nAhC9UX9fS5YHhemIK0WlcZFgHAPGFUEaz4CJNEXuDmq4uEiCdhMU4v6J0UT-EOMIOohZ6iSFxev1Rxkrdhr-JaB4P_4ffhqZbeGH1sapLnng7jfQX7zBA3CHFM5hhxXAEWxMSbEPHJ_7HDOHVv7MI5qLArSao0xWnTkhoQMDHH-u1Vmz-hl5wmCP1RmP3lPcQ4gU_DfFxJ4Q2_V0i24")` }}></div>
                    </div>
                </div>
            </header>

            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8">
                    {/* PageHeading */}
                    <div className="flex flex-col gap-2">
                        <p className="font-heading text-4xl font-bold tracking-tight text-brand-dark-gray">Your Learning Journey</p>
                        <p className="text-base text-gray-500">Explore your personalized path to fluency.</p>
                    </div>

                    {/* Controls: Search, Filters, View Toggle */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        {/* SearchBar */}
                        <div className="flex-grow">
                            <label className="flex h-12 w-full flex-col">
                                <div className="flex h-full w-full flex-1 items-stretch rounded-lg bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-brand-teal">
                                    <div className="flex items-center justify-center pl-4 text-gray-400">
                                        <span className="material-symbols-outlined text-2xl">search</span>
                                    </div>
                                    <input className="form-input h-full min-w-0 flex-1 resize-none overflow-hidden border-none bg-transparent px-3 text-base text-brand-dark-gray placeholder:text-gray-400 focus:outline-0 focus:ring-0" placeholder="What do you want to learn today?" />
                                </div>
                            </label>
                        </div>
                        {/* Chips / Filters */}
                        <div className="flex flex-wrap items-center gap-3">
                            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white pl-4 pr-2 shadow-sm ring-1 ring-inset ring-gray-300 transition-all hover:bg-gray-50">
                                <p className="text-sm font-medium text-brand-dark-gray">Skill Level</p>
                                <span className="material-symbols-outlined text-lg text-brand-dark-gray">expand_more</span>
                            </button>
                            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white pl-4 pr-2 shadow-sm ring-1 ring-inset ring-gray-300 transition-all hover:bg-gray-50">
                                <p className="text-sm font-medium text-brand-dark-gray">Category</p>
                                <span className="material-symbols-outlined text-lg text-brand-dark-gray">expand_more</span>
                            </button>
                            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white pl-4 pr-2 shadow-sm ring-1 ring-inset ring-gray-300 transition-all hover:bg-gray-50">
                                <p className="text-sm font-medium text-brand-dark-gray">Content-Type</p>
                                <span className="material-symbols-outlined text-lg text-brand-dark-gray">expand_more</span>
                            </button>
                        </div>
                        {/* SegmentedButtons / View Toggle */}
                        <div className="flex h-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200/80 p-1">
                            <label className="flex h-full cursor-pointer grow items-center justify-center overflow-hidden rounded-md px-3 has-[:checked]:bg-white has-[:checked]:text-brand-teal has-[:checked]:shadow-sm text-gray-500">
                                <span className="material-symbols-outlined">timeline</span>
                                <input
                                    checked={view === 'Path View'}
                                    onChange={() => setView('Path View')}
                                    className="invisible w-0"
                                    name="view-toggle"
                                    type="radio"
                                    value="Path View"
                                />
                            </label>
                            <label className="flex h-full cursor-pointer grow items-center justify-center overflow-hidden rounded-md px-3 has-[:checked]:bg-white has-[:checked]:text-brand-teal has-[:checked]:shadow-sm text-gray-500">
                                <span className="material-symbols-outlined">grid_view</span>
                                <input
                                    checked={view === 'Grid View'}
                                    onChange={() => setView('Grid View')}
                                    className="invisible w-0"
                                    name="view-toggle"
                                    type="radio"
                                    value="Grid View"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Learning Path Visual */}
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal mx-auto"></div>
                                <p className="mt-4 text-gray-500">Loading classes...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-red-500 mb-4">
                                <span className="material-symbols-outlined text-5xl">error</span>
                            </div>
                            <p className="text-red-600 font-semibold">{error}</p>
                            <p className="text-gray-500 mt-2">Make sure the API server is running on port 5000</p>
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <span className="material-symbols-outlined text-5xl">school</span>
                            </div>
                            <p className="text-gray-600 font-semibold">No classes available</p>
                            <p className="text-gray-500 mt-2">Check back later for new courses</p>
                        </div>
                    ) : (
                        <div className="relative flex flex-col items-center gap-8 pt-8">
                            {/* Dashed line connector */}
                            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 border-l-2 border-dashed border-gray-300"></div>
                            {courses.map((course) => (
                                <div key={course.id} className="relative z-[1] flex w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl sm:flex-row">
                                    <div className="h-48 w-full bg-gradient-to-br from-brand-teal to-brand-coral sm:h-auto sm:w-48 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-6xl">school</span>
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full px-2.5 py-1 text-xs font-semibold bg-brand-teal/10 text-brand-teal">{course.level}</span>
                                            <span className="rounded-full px-2.5 py-1 text-xs font-semibold bg-brand-coral/10 text-brand-coral">{course.days.length} days/week</span>
                                        </div>
                                        <h3 className="font-heading mt-3 text-lg font-semibold text-brand-dark-gray">{course.name}</h3>
                                        <p className="mt-1 flex-grow text-sm text-gray-500">
                                            Taught by {course.teacher} • {course.days.join(', ')} • {course.start_time} - {course.end_time}
                                        </p>
                                        <div className="mt-4">
                                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                <span>Enrolled: {course.enrolled}/{course.capacity}</span>
                                                <span>{Math.round((course.enrolled / course.capacity) * 100)}%</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-gray-200">
                                                <div className="h-2 rounded-full bg-brand-teal" style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}></div>
                                            </div>
                                        </div>
                                        <button 
                                            className={`mt-4 w-full rounded-lg py-2.5 text-sm font-bold transition-colors ${
                                                course.enrolled >= course.capacity 
                                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                                    : 'bg-brand-teal text-white hover:bg-brand-teal/90'
                                            }`}
                                            disabled={course.enrolled >= course.capacity}
                                        >
                                            {course.enrolled >= course.capacity ? 'Class Full' : 'Enroll Now'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CourseDiscoveryScreen;
