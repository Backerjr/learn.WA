import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const ResourceLibraryScreen = () => {
    const resources = useMemo(() => [
        {
            title: "Pronunciation Practice: 'TH' Sound",
            type: "Audio - Drills and exercises to perfect your pronunciation.",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR4TATvHgFXtKX2k1rn5ULdxVrgjNMM5sTyOyxZfD9i3-9r4t1ssWCSEsz-UUWV-xALXlXI3myW3JHaVRMUyj5-Qblcxsw858dlqyazTf1eTgYYXEcMYaGP1kZESpju8vWOd5Pav6Nls9qzdkfeov-AEYyqFPuk0c3D7OaY15XwlEQhfwC050dM7XHx00E2Eeisij8JhHylCekgvKeD_DGao4DDO7LkPt7-O2JajVv0NaEfh-GAXyp6ye-fMCDNHg5I6eSJfDwF8s",
            featured: true,
            gridSpan: 'col-span-2 row-span-2'
        },
        {
            title: "Mastering the Present Perfect",
            type: "Video - Learn when and how to use this tense.",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCU9RMR83VxhZDVWEfTEeRUMW-SwmuiKSn8kPP3N3yI0kxYvs0zzwQMcMqshyILAIWorMsIS0lmPAv4ft6yRCXO7R0wbZvhzZQrkFbIBU9fL_m2lwGv2gYihXq5heNx6Wp_9NC4Uyqv4_oUlF0qD1gh7i77jcnWcxdo6osuPzXB3AfB4ryU_meX2iBcnD7K2CvhK30vcLEw9TsDGaxU4igiCcEPuE05q3dIqjLPfNB-tYDa6j5BgOqzkObnXdr52PpQ219F_mzfZxg",
            gridSpan: 'col-span-2'
        },
        {
            title: "Business English: Negotiations",
            type: "Video - Key phrases for successful negotiations.",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtQOW3R-tqRCMKEjE5AuHOmH2irBzg3yG2bty06EPnY5_lMy6sSu5F9GyS61he2l4KC5u0oz8Sn8nUYsvsnbraLnCrrzTGg7gxHu5-otvgYscVrvF0hOCk7jR8eSbGngvrgTSCB2O_pRxqf46Q62TF8hiGjpysH2STayi1VtVw97yQJntHbVOoz4qu813pw-wjfC1ERWhv9-jcjz5tj25FhNlogywOH-kjp8M9squ1aJDtrGLDWMgCQcKVBzEAqo6kQinMInt3RVo",
            gridSpan: 'col-span-2'
        },
        {
            title: "Phrasal Verbs Quiz",
            type: "Quiz - Test your knowledge of common phrasal verbs.",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_-oeFvRA1ub5KGk_-dOHN6HOZMsAhfFVi6dFTR0QqrwZnVZEF5CiDCJBPgosECoT7FOBU38WBvaMyxbh54aE6yfprEC1WLXcb_13j0Cq7d5jthKfeonXR-mKOH0Ev3HyhDSyreVJ_dYWb6oDjZk69IiPBh5aufwdmJXS8nHRE0Zz9vDFgOOwFmrK-b_iBM075G0Cj1M_JvzsUHD5q_2cbobP7OcoayoDEaZ_fHvfrfed9xWBMPkAnrZAktBNzw2U8UezGwuevCY0",
            gridSpan: 'col-span-2'
        },
        {
            title: "Beginner Grammar: Articles",
            type: "PDF - A complete guide to using 'a', 'an', and 'the'.",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5F_-G7gJ0KkjtHWRVsFzv4jzuqzEuVqnvkeTo9NERJTyQm3sL1clPBz3k80ZR1Kuq11R2c5OAFlIuxuIG2_Vf4uFcpHb9QkWPlGJ6aeWOi2cXIsYE686XF6RpTqKul6_XssJmNcEWrOTR5C1F2X3IdK60rDLaJWJ3OpTSUX5xHVW_m3IS21wEpA_8Zswt9yQMs4Lk_Vd2fYKsVu3ONT0PcloUJ-qlxuiUb4XK_ClDLaFmUIGDE4UZaZKATlTou36nHkuhLlSMYZs",
            gridSpan: 'col-span-2'
        },
        {
            title: "Listening Comprehension: A News Report",
            type: "Audio - Listen to a report and answer questions.",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0WIVJSX2aNPgAxd4ZUySK3_pqtPAZYoUe2P86SoEXd346OjnoztZQ4oa8UdXWYtnfZHwLzm-tBCGmBMbvVe6gJlijBT25HgHkBBvxKBHU701ykpvLGDDHRBubBB435jsQxOnQuS3YBbdULK5ebLs0fth7R76wd35mTVa2RqjtzKWxnyBW-x1fuEkFNpU2glMF6L7Gx3H1E5pFKDYFINFApshICt3RPzQtbeO6KRFwCJh9O-GUJ2YzZjp9SU20kNRrLTLfo7HeH5w",
            gridSpan: 'col-span-2 lg:col-span-4'
        },
        {
            title: "Advanced Vocabulary PDF",
            type: "PDF - Expand your vocabulary with advanced words.",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbP8FdLoJdmVvizvgC4JJZk0p-vQsBI1UknxDnGwaF21h-qNsiAuRXG2q6Spm9a1DxIr7FSSwO9Fu8lhKR0sPAI2q_NopaQ8RNGuaKBsg-7RglFUkUZefqrWGADRIhMiamjFxW6be0I_EoNiF4jad6fAN-tqs7W5EXYll9gTCVgHujJADgcorNlmpwvM4F2nwkRQIztQt7Qe0MlhKSZZPuqzSGZUI6eRsDm9CLm7OtfG3XA2rsgT4ZImexXqF6vIC792ym7eIdn9Q",
            gridSpan: 'col-span-2'
        },
        {
            title: "Writing Emails: Formal vs Informal",
            type: "Video - Understand the key differences in tone.",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY9LoGL-Xptld2aUyKOzXSdIfYCjJPxBqIq4FMhDNeVUoT9aXlgKJGyKKL--3kb5YqFKXLtvZ5b4JgJFX1YowtSNUZ4B6art9B2nrkRF9lYu3yN5RrwcG-tlDaPmEZiGWmOWy-E_ZaCHsdhXu9iJ5UgawMcT63cI8fp6lZkDYW0zOFHgalEmZ7UjVuWaDvdHsFyZEx0eFV7HIQHhy9QhKI_9ut6_6maSWkL8DQDk1R0UAvxYVnfjFzvInNcaoa_RYmgQMZUR42GtY",
            gridSpan: 'col-span-2'
        },
    ], []);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-light-primary dark:text-dark-primary">
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* TopNavBar */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-card-light dark:border-card-dark px-6 md:px-10 lg:px-20 py-4">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3 text-light-primary dark:text-dark-primary">
                                <div className="size-8 text-primary">
                                    <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"></path><path clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill="currentColor" fillRule="evenodd"></path></svg>
                                </div>
                                <h2 className="text-lg font-bold font-heading">Structured Fun English</h2>
                            </div>
                            <nav className="hidden lg:flex items-center gap-9">
                                <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
                                <Link to="/library" className="text-sm font-medium text-primary">Library</Link>
                                <Link to="/courses" className="text-sm font-medium hover:text-primary transition-colors">Courses</Link>
                                <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Community</a>
                            </nav>
                        </div>
                        <div className="flex flex-1 justify-end items-center gap-4">
                            <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
                                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                    <div className="text-light-secondary dark:text-dark-secondary flex bg-card-light dark:bg-card-dark items-center justify-center pl-3 rounded-l-lg border-r-0">
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-light-primary dark:text-dark-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-card-light dark:bg-card-dark h-full placeholder:text-light-secondary dark:placeholder:text-dark-secondary px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Search" />
                                </div>
                            </label>
                            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-card-light dark:bg-card-dark text-light-primary dark:text-dark-primary text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBBHSutUDkIlfGRsn46FbQjKlYFVwm-gr_V-yLVsYCBlKaGE48W7mEdkpr-XCPAqOXYEpqazEdhEHREjAjg3lkHJiYTf6j56C0YDCvGJJTYnnrC5qa8OGUHIFuliQOn95kPWlN-aBZd4Pmcz1_lgviP0HH2QQillqqDn79qQ8fQEqKe0lOrW7GOmEjEsX-C4quKnay0jSHf2b_hhISmBTsTPK4jwiu1kmVpk5sj9QeJCzhv6LWwY475yLDBK2qBjVt67dwe2-Ps0Pw")` }}></div>
                        </div>
                    </header>
                    <main className="px-6 md:px-10 lg:px-20 py-8 md:py-12">
                        <div className="layout-content-container flex flex-col max-w-7xl mx-auto flex-1">
                            {/* PageHeading */}
                            <div className="flex flex-wrap justify-between gap-4 p-4">
                                <div className="flex min-w-72 flex-col gap-2">
                                    <p className="font-heading text-4xl font-bold tracking-tight text-light-primary dark:text-dark-primary">Resource Library</p>
                                    <p className="text-light-secondary dark:text-dark-secondary text-base font-normal leading-normal">A repository of all your supplementary learning materials.</p>
                                </div>
                            </div>
                            {/* Chips/Filters */}
                            <div className="flex gap-2 md:gap-3 p-3 flex-wrap border-b border-card-light dark:border-card-dark mb-8">
                                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-card-light dark:bg-card-dark pl-4 pr-3 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-light-secondary dark:text-dark-secondary">category</span>
                                    <p className="text-sm font-medium">Resource Type</p>
                                    <span className="material-symbols-outlined text-light-secondary dark:text-dark-secondary">expand_more</span>
                                </button>
                                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-card-light dark:bg-card-dark pl-4 pr-3 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-light-secondary dark:text-dark-secondary">school</span>
                                    <p className="text-sm font-medium">Course</p>
                                    <span className="material-symbols-outlined text-light-secondary dark:text-dark-secondary">expand_more</span>
                                </button>
                                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-card-light dark:bg-card-dark pl-4 pr-3 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-light-secondary dark:text-dark-secondary">label</span>
                                    <p className="text-sm font-medium">Topic</p>
                                    <span className="material-symbols-outlined text-light-secondary dark:text-dark-secondary">expand_more</span>
                                </button>
                                <div className="flex-grow"></div>
                                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary pl-4 pr-4 text-white transition-opacity hover:opacity-90">
                                    <span className="material-symbols-outlined">filter_list</span>
                                    <p className="text-sm font-medium">Apply Filters</p>
                                </button>
                            </div>
                            {/* Bento Box Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
                                {resources.map((resource, index) => (
                                    <div key={index} className={`${resource.gridSpan} group flex cursor-pointer flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark p-4 transition-transform hover:-translate-y-1`}>
                                        <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden" style={{ backgroundImage: `url("${resource.imageUrl}")` }}></div>
                                        <div className="flex flex-col gap-1">
                                            {resource.featured && <span className="text-xs font-semibold text-secondary">FEATURED</span>}
                                            <p className="text-lg font-bold leading-tight font-heading">{resource.title}</p>
                                            <p className="text-light-secondary dark:text-dark-secondary text-sm font-normal">{resource.type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ResourceLibraryScreen;
