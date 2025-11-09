import React, { useState } from 'react';

const UserProfileScreen = () => {
    const [activeTab, setActiveTab] = useState('Profile');

    const user = {
        name: 'Alex Doe',
        level: 'B2 Intermediate',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEAReWtBuv1yZZddu5QLW5oaPitnu_zQJlHALM2R7erz35ghcSzeyz4v9uNHbnRCDzB-htni1bQlBYpRmWWRMfUhL8RNAQAlXgznpb5b4FNucIHevcCcy-xMmlB9Lm8u68aWrkY-8WXxpUPTDoab06gRJCIvU90z9XYu_W9wosY2mUBhf4mr9K5__lLs8OdBKto8B2YJC3411Y_iKvU8I3CasXx37jHIcW67DyYbxsKtQxDnbGA1nzw9ZC3cpJNXkE0CfMwJWwS8A',
        email: 'alex.doe@example.com',
    };

    const courses = [
        {
            course: 'Advanced English Grammar',
            lesson: 'Lesson 5: The Subjunctive Mood',
            progress: 75,
        },
        {
            course: 'Business Idioms',
            lesson: 'Unit 2: Negotiation Phrases',
            progress: 40,
        },
    ];

    const tabs = ['Profile', 'Statistics', 'Achievements'];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    <div className="flex flex-1 justify-center py-5 sm:py-8 md:py-10">
                        <div className="layout-content-container flex flex-col max-w-5xl flex-1 px-4 md:px-0">
                            {/* ProfileHeader */}
                            <div className="p-4 @container">
                                <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                                    <div className="flex items-center gap-5">
                                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-24 w-24 md:h-32 md:w-32 flex-shrink-0" style={{ backgroundImage: `url("${user.avatarUrl}")` }}></div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-text-light dark:text-text-dark text-2xl md:text-3xl font-bold leading-tight tracking-tight font-heading">{user.name}</p>
                                            <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal">{user.level}</p>
                                        </div>
                                    </div>
                                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-wide w-full @[480px]:w-auto hover:bg-primary/90 transition-colors">
                                        <span className="truncate">Edit Profile</span>
                                    </button>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="pb-3 mt-4">
                                <div className="flex border-b border-card-light dark:border-card-dark px-4 gap-8">
                                    {tabs.map((tab) => (
                                        <a
                                            key={tab}
                                            href="#"
                                            onClick={() => setActiveTab(tab)}
                                            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors ${
                                                activeTab === tab
                                                    ? 'border-b-primary text-text-light dark:text-text-dark'
                                                    : 'border-b-transparent text-text-muted-light dark:text-text-muted-dark hover:border-primary/50 hover:text-text-light dark:hover:text-text-dark'
                                            }`}
                                        >
                                            <p className="text-sm font-bold leading-normal tracking-wide">{tab}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Profile Tab Content */}
                            {activeTab === 'Profile' && (
                                <div className="flex flex-col gap-8">
                                    {/* Courses In Progress */}
                                    <div>
                                        <h2 className="text-text-light dark:text-text-dark text-2xl font-bold leading-tight tracking-tight font-heading px-4 pb-3 pt-5">Courses In Progress</h2>
                                        <div className="grid grid-cols-1 @[640px]:grid-cols-2 gap-4">
                                            {courses.map((course, index) => (
                                                <div key={index} className="p-4 w-full">
                                                    <div className="flex flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark/80 p-6 shadow-sm">
                                                        <div className="flex flex-col gap-1">
                                                            <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">{course.course}</p>
                                                            <p className="text-text-light dark:text-text-dark text-lg font-bold leading-tight font-heading">{course.lesson}</p>
                                                        </div>
                                                        <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                                                            <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">{course.progress}% Complete</p>
                                                            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-5 bg-primary/20 text-primary dark:bg-primary/30 dark:text-white text-sm font-bold leading-normal w-fit hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors">
                                                                <span className="truncate">Continue</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Settings Section */}
                                    <div>
                                        <h2 className="text-text-light dark:text-text-dark text-2xl font-bold leading-tight tracking-tight font-heading px-4 pb-3 pt-5">Settings</h2>
                                        <div className="p-4">
                                            <form className="flex flex-col gap-6 rounded-xl bg-card-light dark:bg-card-dark/80 p-6 shadow-sm">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1" htmlFor="email">Email Address</label>
                                                        <input className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary transition" id="email" type="email" defaultValue={user.email} />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1" htmlFor="password">New Password</label>
                                                        <input className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary transition" id="password" placeholder="••••••••" type="password" />
                                                    </div>
                                                </div>
                                                <div className="border-t border-gray-300 dark:border-gray-600 pt-6">
                                                    <h3 className="text-lg font-bold font-heading text-text-light dark:text-text-dark">Notifications</h3>
                                                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-1 mb-4">How would you like to be notified?</p>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-3">
                                                            <input defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" id="email-notifs" name="notifications" type="checkbox" />
                                                            <label className="text-sm" htmlFor="email-notifs">Email</label>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <input className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" id="push-notifs" name="notifications" type="checkbox" />
                                                            <label className="text-sm" htmlFor="push-notifs">Push Notifications</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end mt-2">
                                                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-wide hover:bg-primary/90 transition-colors" type="submit">
                                                        <span className="truncate">Save Changes</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileScreen;
