import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type Resource = {
    id: string;
    title: string;
    type: 'Video' | 'Audio' | 'PDF' | 'Quiz' | 'Article';
    topic: string;
    course: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    format: string;
    length: string;
    description: string;
    imageUrl: string;
    featured?: boolean;
    link: string;
    tags: string[];
};

type Filters = {
    type: string;
    course: string;
    topic: string;
    level: string;
};

const filterOptions: Record<keyof Filters, string[]> = {
    type: ['All', 'Video', 'Audio', 'PDF', 'Quiz', 'Article'],
    course: ['All', 'Speaking Lab', 'Grammar Lab', 'Business Track', 'Exam Prep'],
    topic: ['All', 'Pronunciation', 'Grammar', 'Vocabulary', 'Listening', 'Writing'],
    level: ['All', 'Beginner', 'Intermediate', 'Advanced'],
};

const ResourceLibraryScreen = () => {
    const resources = useMemo<Resource[]>(() => [
        {
            id: 'th-pronunciation',
            title: "Pronunciation Lab: /θ/ & /ð/",
            type: 'Audio',
            topic: 'Pronunciation',
            course: 'Speaking Lab',
            level: 'Beginner',
            format: 'Coach-led drill',
            length: '8 min',
            description: 'Targeted drills and minimal pairs to fix the TH sound with instant feedback prompts.',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR4TATvHgFXtKX2k1rn5ULdxVrgjNMM5sTyOyxZfD9i3-9r4t1ssWCSEsz-UUWV-xALXlXI3myW3JHaVRMUyj5-Qblcxsw858dlqyazTf1eTgYYXEcMYaGP1kZESpju8vWOd5Pav6Nls9qzdkfeov-AEYyqFPuk0c3D7OaY15XwlEQhfwC050dM7XHx00E2Eeisij8JhHylCekgvKeD_DGao4DDO7LkPt7-O2JajVv0NaEfh-GAXyp6ye-fMCDNHg5I6eSJfDwF8s',
            featured: true,
            link: '/learn',
            tags: ['accent', 'speaking', 'coaching'],
        },
        {
            id: 'present-perfect',
            title: 'Mastering the Present Perfect',
            type: 'Video',
            topic: 'Grammar',
            course: 'Grammar Lab',
            level: 'Intermediate',
            format: '10-card micro-lesson',
            length: '12 min',
            description: 'When to use present perfect vs past simple with native-speed examples.',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU9RMR83VxhZDVWEfTEeRUMW-SwmuiKSn8kPP3N3yI0kxYvs0zzwQMcMqshyILAIWorMsIS0lmPAv4ft6yRCXO7R0wbZvhzZQrkFbIBU9fL_m2lwGv2gYihXq5heNx6Wp_9NC4Uyqv4_oUlF0qD1gh7i77jcnWcxdo6osuPzXB3AfB4ryU_meX2iBcnD7K2CvhK30vcLEw9TsDGaxU4igiCcEPuE05q3dIqjLPfNB-tYDa6j5BgOqzkObnXdr52PpQ219F_mzfZxg',
            link: '/learn',
            tags: ['tenses', 'examples', 'usage'],
        },
        {
            id: 'negotiation-kit',
            title: 'Business English: Negotiation Kit',
            type: 'Video',
            topic: 'Speaking',
            course: 'Business Track',
            level: 'Advanced',
            format: 'Playbook + demo clips',
            length: '15 min',
            description: 'Frameworks and phrases for proposals, concessions, and closing language.',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtQOW3R-tqRCMKEjE5AuHOmH2irBzg3yG2bty06EPnY5_lMy6sSu5F9GyS61he2l4KC5u0oz8Sn8nUYsvsnbraLnCrrzTGg7gxHu5-otvgYscVrvF0hOCk7jR8eSbGngvrgTSCB2O_pRxqf46Q62TF8hiGjpysH2STayi1VtVw97yQJntHbVOoz4qu813pw-wjfC1ERWhv9-jcjz5tj25FhNlogywOH-kjp8M9squ1aJDtrGLDWMgCQcKVBzEAqo6kQinMInt3RVo',
            link: '/courses',
            tags: ['business', 'roleplay', 'phrases'],
        },
        {
            id: 'phrasal-verbs',
            title: 'Phrasal Verbs Lightning Quiz',
            type: 'Quiz',
            topic: 'Vocabulary',
            course: 'Grammar Lab',
            level: 'Intermediate',
            format: 'Rapid-fire checks',
            length: '10 Qs',
            description: 'Timed quiz covering separable vs non-separable phrasal verbs with feedback.',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_-oeFvRA1ub5KGk_-dOHN6HOZMsAhfFVi6dFTR0QqrwZnVZEF5CiDCJBPgosECoT7FOBU38WBvaMyxbh54aE6yfprEC1WLXcb_13j0Cq7d5jthKfeonXR-mKOH0Ev3HyhDSyreVJ_dYWb6oDjZk69IiPBh5aufwdmJXS8nHRE0Zz9vDFgOOwFmrK-b_iBM075G0Cj1M_JvzsUHD5q_2cbobP7OcoayoDEaZ_fHvfrfed9xWBMPkAnrZAktBNzw2U8UezGwuevCY0',
            link: '/quiz',
            tags: ['timed', 'practice', 'feedback'],
        },
        {
            id: 'articles-pdf',
            title: 'Article A/An/The Toolkit',
            type: 'PDF',
            topic: 'Grammar',
            course: 'Grammar Lab',
            level: 'Beginner',
            format: 'Printable guide',
            length: '6 pages',
            description: 'Simple rules + classroom activities to teach articles with visuals and drills.',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5F_-G7gJ0KkjtHWRVsFzv4jzuqzEuVqnvkeTo9NERJTyQm3sL1clPBz3k80ZR1Kuq11R2c5OAFlIuxuIG2_Vf4uFcpHb9QkWPlGJ6aeWOi2cXIsYE686XF6RpTqKul6_XssJmNcEWrOTR5C1F2X3IdK60rDLaJWJ3OpTSUX5xHVW_m3IS21wEpA_8Zswt9yQMs4Lk_Vd2fYKsVu3ONT0PcloUJ-qlxuiUb4XK_ClDLaFmUIGDE4UZaZKATlTou36nHkuhLlSMYZs',
            link: '/library',
            tags: ['lesson-plan', 'printable', 'rules'],
        },
        {
            id: 'news-report',
            title: 'Listening Lab: News Brief',
            type: 'Audio',
            topic: 'Listening',
            course: 'Exam Prep',
            level: 'Intermediate',
            format: 'Guided transcript',
            length: '9 min',
            description: 'Authentic news clip with comprehension checks and shadowing practice.',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0WIVJSX2aNPgAxd4ZUySK3_pqtPAZYoUe2P86SoEXd346OjnoztZQ4oa8UdXWYtnfZHwLzm-tBCGmBMbvVe6gJlijBT25HgHkBBvxKBHU701ykpvLGDDHRBubBB435jsQxOnQuS3YBbdULK5ebLs0fth7R76wd35mTVa2RqjtzKWxnyBW-x1fuEkFNpU2glMF6L7Gx3H1E5pFKDYFINFApshICt3RPzQtbeO6KRFwCJh9O-GUJ2YzZjp9SU20kNRrLTLfo7HeH5w',
            featured: true,
            link: '/learn',
            tags: ['exam', 'listening', 'transcript'],
        },
        {
            id: 'advanced-vocab',
            title: 'Advanced Vocabulary Deck',
            type: 'PDF',
            topic: 'Vocabulary',
            course: 'Business Track',
            level: 'Advanced',
            format: 'Flashcard pack',
            length: '40 terms',
            description: 'Executive vocabulary with collocations and example scripts for meetings.',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbP8FdLoJdmVvizvgC4JJZk0p-vQsBI1UknxDnGwaF21h-qNsiAuRXG2q6Spm9a1DxIr7FSSwO9Fu8lhKR0sPAI2q_NopaQ8RNGuaKBsg-7RglFUkUZefqrWGADRIhMiamjFxW6be0I_EoNiF4jad6fAN-tqs7W5EXYll9gTCVgHujJADgcorNlmpwvM4F2nwkRQIztQt7Qe0MlhKSZZPuqzSGZUI6eRsDm9CLm7OtfG3XA2rsgT4ZImexXqF6vIC792ym7eIdn9Q',
            link: '/library',
            tags: ['meetings', 'collocations', 'slides'],
        },
        {
            id: 'email-tone',
            title: 'Writing Emails: Tone Lab',
            type: 'Article',
            topic: 'Writing',
            course: 'Business Track',
            level: 'Intermediate',
            format: 'Interactive article',
            length: '7 min',
            description: 'Compare formal vs informal tone with rewrite prompts you can assign to learners.',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY9LoGL-Xptld2aUyKOzXSdIfYCjJPxBqIq4FMhDNeVUoT9aXlgKJGyKKL--3kb5YqFKXLtvZ5b4JgJFX1YowtSNUZ4B6art9B2nrkRF9lYu3yN5RrwcG-tlDaPmEZiGWmOWy-E_ZaCHsdhXu9iJ5UgawMcT63cI8fp6lZkDYW0zOFHgalEmZ7UjVuWaDvdHsFyZEx0eFV7HIQHhy9QhKI_9ut6_6maSWkL8DQDk1R0UAvxYVnfjFzvInNcaoa_RYmgQMZUR42GtY',
            link: '/learn',
            tags: ['writing', 'rewrite', 'tone'],
        },
    ], []);

    const [search, setSearch] = useState('');
    const [draftFilters, setDraftFilters] = useState<Filters>({ type: 'All', course: 'All', topic: 'All', level: 'All' });
    const [appliedFilters, setAppliedFilters] = useState<Filters>(draftFilters);
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
    const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
    const [toast, setToast] = useState<string | null>(null);

    const setFilter = useCallback((key: keyof Filters, value: string) => {
        setDraftFilters((prev) => ({ ...prev, [key]: value }));
    }, []);

    const applyFilters = useCallback(() => {
        setAppliedFilters(draftFilters);
    }, [draftFilters]);

    const clearFilters = useCallback(() => {
        const reset: Filters = { type: 'All', course: 'All', topic: 'All', level: 'All' };
        setDraftFilters(reset);
        setAppliedFilters(reset);
        setSearch('');
        setSelectedResource(null);
    }, []);

    const filteredResources = useMemo(() => {
        return resources.filter((resource) => {
            const matchesSearch =
                !search ||
                resource.title.toLowerCase().includes(search.toLowerCase()) ||
                resource.description.toLowerCase().includes(search.toLowerCase()) ||
                resource.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

            const matchesType = appliedFilters.type === 'All' || resource.type === appliedFilters.type;
            const matchesCourse = appliedFilters.course === 'All' || resource.course === appliedFilters.course;
            const matchesTopic = appliedFilters.topic === 'All' || resource.topic === appliedFilters.topic;
            const matchesLevel = appliedFilters.level === 'All' || resource.level === appliedFilters.level;

            return matchesSearch && matchesType && matchesCourse && matchesTopic && matchesLevel;
        });
    }, [resources, search, appliedFilters]);

    const toggleBookmark = useCallback((resource: Resource) => {
        setBookmarks((prev) => {
            const next = new Set(prev);
            const alreadySaved = next.has(resource.id);
            if (alreadySaved) {
                next.delete(resource.id);
                setToast('Removed from your collection');
            } else {
                next.add(resource.id);
                setToast('Saved to your collection');
            }
            setTimeout(() => setToast(null), 1800);
            return next;
        });
    }, []);

    const handleSelectResource = useCallback((resource: Resource) => {
        setSelectedResource(resource);
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-light-primary dark:text-dark-primary">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* TopNavBar */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-card-light dark:border-card-dark px-6 md:px-10 lg:px-20 py-4">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3 text-light-primary dark:text-dark-primary">
                                <div className="size-8 text-primary">
                                    <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"></path><path clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill="currentColor" fillRule="evenodd"></path></svg>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold font-heading">Structured Fun English</h2>
                                    <p className="text-xs text-light-secondary dark:text-dark-secondary">Teacher & learner toolkit</p>
                                </div>
                            </div>
                            <nav className="hidden lg:flex items-center gap-9">
                                <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
                                <Link to="/library" className="text-sm font-medium text-primary">Library</Link>
                                <Link to="/courses" className="text-sm font-medium hover:text-primary transition-colors">Courses</Link>
                                <Link to="/community" className="text-sm font-medium hover:text-primary transition-colors">Community</Link>
                            </nav>
                        </div>
                        <div className="flex flex-1 justify-end items-center gap-4">
                            <label className="hidden md:flex flex-col min-w-56 !h-10 max-w-72">
                                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                    <div className="text-light-secondary dark:text-dark-secondary flex bg-card-light dark:bg-card-dark items-center justify-center pl-3 rounded-l-lg border-r-0">
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-light-primary dark:text-dark-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-card-light dark:bg-card-dark h-full placeholder:text-light-secondary dark:placeholder:text-dark-secondary px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                                        placeholder="Search topics, tags, formats"
                                    />
                                </div>
                            </label>
                            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-card-light dark:bg-card-dark text-light-primary dark:text-dark-primary text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBBHSutUDkIlfGRsn46FbQjKlYFVwm-gr_V-yLVsYCBlKaGE48W7mEdkpr-XCPAqOXYEpqazEdhEHREjAjg3lkHJiYTf6j56C0YDCvGJJTYnnrC5qa8OGUHIFuliQOn95kPWlN-aBZd4Pmcz1_lgviP0HH2QQillqqDn79qQ8fQEqKe0lOrW7GOmEjEsX-C4quKnay0jSHf2b_hhISmBTsTPK4jwiu1kmVpk5sj9QeJCzhv6LWwY475yLDBK2qBjVt67dwe2-Ps0Pw")` }}></div>
                        </div>
                    </header>

                    <main className="px-6 md:px-10 lg:px-20 py-8 md:py-12">
                        <div className="layout-content-container grid gap-8 lg:grid-cols-[2fr_1fr] max-w-7xl mx-auto flex-1">
                            {/* Library Column */}
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-wrap justify-between gap-4 p-4 bg-card-light dark:bg-card-dark border border-card-light dark:border-card-dark">
                                    <div className="flex min-w-72 flex-col gap-1">
                                        <p className="font-heading text-4xl font-bold tracking-tight text-light-primary dark:text-dark-primary">Resource Library</p>
                                        <p className="text-light-secondary dark:text-dark-secondary text-base font-normal leading-normal">Search, filter, and launch materials without the mockup dead-ends.</p>
                                    </div>
                                    <div className="flex items-end gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase text-light-secondary dark:text-dark-secondary">Results</span>
                                            <span className="text-2xl font-heading">{filteredResources.length}</span>
                                        </div>
                                        <Link to="/quiz-library" className="flex h-11 items-center gap-2 rounded-lg border border-primary px-4 text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-base">collections_bookmark</span>
                                            Quiz Library
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 border border-card-light dark:border-card-dark bg-card-light dark:bg-card-dark p-4">
                                    <div className="flex flex-wrap gap-3">
                                        {(Object.keys(filterOptions) as (keyof Filters)[]).map((key) => (
                                            <label key={key} className="flex items-center gap-2 rounded-md border border-card-light dark:border-card-dark bg-background-light dark:bg-background-dark px-3 py-2 text-sm">
                                                <span className="material-symbols-outlined text-light-secondary dark:text-dark-secondary text-base">
                                                    {key === 'type' ? 'category' : key === 'course' ? 'school' : key === 'topic' ? 'label' : 'signal_cellular_alt'}
                                                </span>
                                                <span className="capitalize">{key}</span>
                                                <select
                                                    value={draftFilters[key]}
                                                    onChange={(e) => setFilter(key, e.target.value)}
                                                    className="bg-transparent text-sm font-medium focus:outline-none"
                                                >
                                                    {filterOptions[key].map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <button
                                            onClick={applyFilters}
                                            className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary pl-4 pr-4 text-white transition-opacity hover:opacity-90"
                                        >
                                            <span className="material-symbols-outlined">filter_list</span>
                                            <p className="text-sm font-medium">Apply Filters</p>
                                        </button>
                                        <button
                                            onClick={clearFilters}
                                            className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-card-dark px-3 text-sm font-medium hover:bg-primary/5"
                                        >
                                            <span className="material-symbols-outlined text-base">restart_alt</span>
                                            Reset
                                        </button>
                                        {Object.entries(appliedFilters).map(([key, value]) => value !== 'All' && (
                                            <span key={key} className="flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                                                {key}: {value}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {filteredResources.map((resource) => (
                                        <div
                                            key={resource.id}
                                            className={`group flex flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark border border-card-light dark:border-card-dark p-4 transition-transform hover:-translate-y-1 ${resource.featured ? 'ring-2 ring-primary/30' : ''}`}
                                            onClick={() => handleSelectResource(resource)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSelectResource(resource)}
                                        >
                                            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden" style={{ backgroundImage: `url("${resource.imageUrl}")` }}></div>
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex flex-col gap-1">
                                                    {resource.featured && <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">Featured</span>}
                                                    <p className="text-lg font-bold leading-tight font-heading">{resource.title}</p>
                                                    <p className="text-light-secondary dark:text-dark-secondary text-sm font-normal">{resource.description}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleBookmark(resource);
                                                    }}
                                                    className="rounded-full p-2 hover:bg-primary/10 transition-colors"
                                                    aria-label="Toggle saved"
                                                >
                                                    <span className={`material-symbols-outlined ${bookmarks.has(resource.id) ? 'fill text-primary' : 'text-light-secondary dark:text-dark-secondary'}`}>
                                                        bookmark
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{resource.type}</span>
                                                <span className="text-xs text-light-secondary dark:text-dark-secondary">{resource.format}</span>
                                                <span className="text-xs text-light-secondary dark:text-dark-secondary">• {resource.length}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="rounded-full bg-card-dark/5 px-2 py-1 text-[11px] text-light-secondary dark:text-dark-secondary">{resource.topic}</span>
                                                <span className="rounded-full bg-card-dark/5 px-2 py-1 text-[11px] text-light-secondary dark:text-dark-secondary">{resource.course}</span>
                                                <span className="rounded-full bg-card-dark/5 px-2 py-1 text-[11px] text-light-secondary dark:text-dark-secondary">{resource.level}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <aside className="rounded-xl border border-card-light dark:border-card-dark bg-card-light dark:bg-card-dark p-5 h-fit sticky top-8">
                                {selectedResource ? (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-xs uppercase text-light-secondary dark:text-dark-secondary">Resource Detail</p>
                                                <h3 className="font-heading text-2xl font-bold leading-tight">{selectedResource.title}</h3>
                                            </div>
                                            <button
                                                onClick={() => setSelectedResource(null)}
                                                className="rounded-full p-2 hover:bg-primary/10 transition-colors"
                                                aria-label="Close details"
                                            >
                                                <span className="material-symbols-outlined">close</span>
                                            </button>
                                        </div>

                                        <div className="rounded-lg bg-background-light dark:bg-background-dark p-3 border border-card-light dark:border-card-dark">
                                            <p className="text-sm text-light-secondary dark:text-dark-secondary leading-relaxed">{selectedResource.description}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {selectedResource.tags.map((tag) => (
                                                <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">{tag}</span>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-xs text-light-secondary dark:text-dark-secondary">
                                            <div className="rounded-lg border border-card-light dark:border-card-dark px-3 py-2">
                                                <p className="font-medium text-light-primary dark:text-dark-primary">{selectedResource.type}</p>
                                                <p>{selectedResource.format}</p>
                                            </div>
                                            <div className="rounded-lg border border-card-light dark:border-card-dark px-3 py-2">
                                                <p className="font-medium text-light-primary dark:text-dark-primary">{selectedResource.course}</p>
                                                <p>{selectedResource.level}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Link
                                                to={selectedResource.link}
                                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                                            >
                                                <span className="material-symbols-outlined text-base">play_arrow</span>
                                                Open in learning flow
                                            </Link>
                                            <button
                                                onClick={() => toggleBookmark(selectedResource)}
                                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-card-dark px-4 py-3 text-sm font-semibold hover:bg-primary/5 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-base">{bookmarks.has(selectedResource.id) ? 'bookmark' : 'bookmark_add'}</span>
                                                {bookmarks.has(selectedResource.id) ? 'Saved for later' : 'Save to teach later'}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3 text-light-secondary dark:text-dark-secondary">
                                        <h3 className="font-heading text-lg font-bold text-light-primary dark:text-dark-primary">Select a resource</h3>
                                        <p className="text-sm">Click any card to see the summary, tags, and launch actions.</p>
                                        <ul className="text-sm space-y-2">
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-base">mouse</span>Preview content instantly</li>
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-base">bookmark_add</span>Save to your private collection</li>
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-base">arrow_forward</span>Jump directly into the learning or quiz flow</li>
                                        </ul>
                                    </div>
                                )}
                            </aside>
                        </div>
                    </main>
                </div>
            </div>

            {toast && (
                <div className="fixed bottom-6 right-6 bg-card-light dark:bg-card-dark border border-card-light dark:border-card-dark px-4 py-3 shadow-lg flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span>{toast}</span>
                </div>
            )}
        </div>
    );
};

export default ResourceLibraryScreen;
