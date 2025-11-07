import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CourseDiscoveryScreen = () => {
    const [view, setView] = useState('Path View');

    const courses = [
        {
            title: 'Foundations of Conversation',
            description: 'Learn the essential phrases for everyday interactions.',
            tags: ['Beginner', 'Speaking'],
            progress: 100,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJrzDB0Qy57K3fZTuGC43Go_Dcm1L8RdfOKlO2lKCswbPmND1yEvcCPCKBJ5nykEKWTLSNmkQJqmE-geWfoPD3RIg-0x-b8gYZ2uaOQzk9kpFdgwyqEoGVwVjT7HPtvUjn55mqCeyv1V_Qpg-XQFVzw_wGNHOD2uHNkWmTVcK0--8-kfRYhxo1Aab2lfRSCTMJrnP16fxJi7r16IojJtsOoa4Enz6q0YpFNizFGJvNyW_xjcR_MwZNaq0s_NJnTvRDRD7ndxxEKTg',
        },
        {
            title: 'Mastering Business Presentations',
            description: 'Confidently deliver impactful presentations in English.',
            tags: ['Intermediate', 'Business'],
            progress: 75,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-oH-Qtdd3kPNbsFvazdrBaU-YIJE99wpOccR6w_BDwdm5iryOh9_yiqNtcjQMZ8POTup_-gAeu_vCZFCArR6cDFW5A3C4eULuMrY9SDKk2D5czRwdU4MDCvh7gR5FS4Axi8aaf2zr1igBnJjYI2sNoF4uuJhamoOnFCNjL2bkVEkbq70npO7j3kw4FUsRFFd8hjcZ8SVZuJX3abVbmfHs5zjhKB_skSBBkxlti9xzxUfidkImdja-7wbmZfGwH_1TYhiS6wgJTjk',
        },
        {
            title: 'Advanced Sentence Structures',
            description: 'Refine your writing and speaking with complex grammar.',
            tags: ['Advanced', 'Grammar'],
            progress: 0,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNz078RVCviZ_SuHe4Sjxnz2hurniSiKTLuYszyfQGsTRRWBJ64XGNpsME06zqlS69TqcWwSMzqNU104oChE1XRcnJUQoKmFxPy8ibcpbVaw0Oq6XC1rDnxUS_aW90sdQuzFP55rOoTC-umYqgoOab22BNm790dm5qNXJgff7gSbtmrxYB44Z6f4OzpRIN8MDsp7oxGty_pQOrgoOS3o7-r1pM8y-_R-9mh1PxD_n-R05vIacGgkw9anuxhG3Gi8Yzk6IAemPtRBI',
        },
    ];

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
                        <Link to="/" className="text-sm font-medium text-brand-dark-gray transition-colors hover:text-brand-teal">Dashboard</Link>
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
                    <div className="relative flex flex-col items-center gap-8 pt-8">
                        {/* Dashed line connector */}
                        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 border-l-2 border-dashed border-gray-300"></div>
                        {courses.map((course, index) => (
                            <div key={index} className="relative z-[1] flex w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl sm:flex-row">
                                <div className="h-48 w-full bg-cover bg-center sm:h-auto sm:w-48" style={{ backgroundImage: `url('${course.imageUrl}')` }}></div>
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-center gap-2">
                                        {course.tags.map((tag, i) => (
                                            <span key={i} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${i === 0 ? 'bg-brand-teal/10 text-brand-teal' : 'bg-brand-coral/10 text-brand-coral'}`}>{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="font-heading mt-3 text-lg font-semibold text-brand-dark-gray">{course.title}</h3>
                                    <p className="mt-1 flex-grow text-sm text-gray-500">{course.description}</p>
                                    <div className="mt-4">
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div className="h-2 rounded-full bg-brand-teal" style={{ width: `${course.progress}%` }}></div>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-400">{course.progress > 0 ? `${course.progress}% Complete` : 'Not started'}</p>
                                    </div>
                                    <button className={`mt-4 w-full rounded-lg py-2.5 text-sm font-bold transition-colors ${course.progress === 100 ? 'bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20' : 'bg-brand-teal text-white hover:bg-brand-teal/90'}`}>
                                        {course.progress === 100 ? 'Review' : course.progress > 0 ? 'Continue' : 'Start'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseDiscoveryScreen;
