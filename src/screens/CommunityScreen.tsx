import { Link } from 'react-router-dom';

const CommunityScreen = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-light-primary dark:text-dark-primary min-h-screen">
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-8 p-8">
                    <div className="rounded-full bg-card-light dark:bg-card-dark p-12 shadow-lg">
                        <span className="material-symbols-outlined text-primary text-8xl">groups</span>
                    </div>
                    <div className="text-center">
                        <h1 className="font-heading text-5xl font-bold tracking-tight text-light-primary dark:text-dark-primary mb-4">Community Forum</h1>
                        <p className="text-xl text-light-secondary dark:text-dark-secondary max-w-md">
                            Coming Soon
                        </p>
                        <p className="mt-4 text-base text-light-secondary dark:text-dark-secondary max-w-md">
                            Connect with fellow learners, share your progress, and participate in language challenges.
                        </p>
                    </div>
                    <Link to="/" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors mt-4">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CommunityScreen;
