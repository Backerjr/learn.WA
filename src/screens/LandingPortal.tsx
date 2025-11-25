import { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Mesh } from 'three';

const FluidBackground = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} scale={3.8} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#1f2b5c"
        metalness={0.7}
        roughness={0.15}
        distort={0.45}
        speed={2}
      />
    </mesh>
  );
};

const LandingPortal = () => {
  const [launching, setLaunching] = useState(false);
  const navigate = useNavigate();

  const handleLaunch = useCallback(() => {
    setLaunching((prev) => {
      if (!prev) {
        setTimeout(() => navigate('/dashboard'), 1200);
        return true;
      }
      return prev;
    });
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-background-dark text-dark-primary overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#4FD1C5" />
          <FluidBackground />
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark/30 via-background-dark/80 to-background-dark pointer-events-none" />

      <div className="relative z-10">
        <header className="flex items-center justify-between px-6 md:px-12 pt-8">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-lg font-heading">
              SF
            </div>
            <div className="leading-tight">
              <p className="text-sm uppercase tracking-[0.18em] text-dark-secondary">Structured Fun English</p>
              <p className="font-heading text-xl text-white">Teaching OS</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.16em] text-dark-secondary">
            <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
            <Link to="/library" className="hover:text-white transition-colors">Library</Link>
            <Link to="/studio" className="hover:text-white transition-colors">Studio</Link>
            <Link to="/quiz" className="hover:text-white transition-colors">Quiz</Link>
          </nav>
          <button
            onClick={handleLaunch}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:translate-y-[-1px] transition-transform"
          >
            <span className="material-symbols-outlined text-base">rocket_launch</span>
            {launching ? 'Launching...' : 'Enter Mission Control'}
          </button>
        </header>

        <main className="px-6 md:px-12 pb-16 pt-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.p
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-xs uppercase tracking-[0.28em] text-dark-secondary"
                >
                  From browse to launch in under five seconds
                </motion.p>
                <motion.h1
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  className="font-heading text-5xl sm:text-6xl leading-[1.05] text-white"
                >
                  Ship lessons, quizzes, and classes from one launch bay.
                </motion.h1>
                <motion.p
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-dark-secondary max-w-2xl"
                >
                  Mission Control routes you to live dashboards, the class catalog, the library, and the assessment studio. Every CTA is wired—no dead ends.
                </motion.p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleLaunch}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:translate-y-[-1px] transition-transform"
                >
                  Launch Mission Control
                </button>
                <Link
                  to="/courses"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Browse classes
                </Link>
                <Link
                  to="/library"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Open library
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Courses live', value: '12', hint: 'synced from API' },
                  { label: 'Quizzes saved', value: '38', hint: 'Quiz Library' },
                  { label: 'Resources ready', value: '24', hint: 'Library shelf' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-dark-secondary">{item.label}</p>
                    <p className="text-3xl font-heading text-white mt-2">{item.value}</p>
                    <p className="text-sm text-dark-secondary">{item.hint}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-6 shadow-xl shadow-black/20">
              <p className="text-xs uppercase tracking-[0.3em] text-dark-secondary">What you can do</p>
              <div className="space-y-3">
                {[
                  { title: 'Mission Control', desc: 'Monitor progress, goals, and announcements.', to: '/dashboard' },
                  { title: 'Class Catalog', desc: 'Reserve seats for your learners instantly.', to: '/courses' },
                  { title: 'Assessment Studio', desc: 'Generate and bank quizzes in minutes.', to: '/studio' },
                  { title: 'Resource Library', desc: 'Save articles, drills, and videos per class.', to: '/library' },
                ].map((action) => (
                  <Link
                    key={action.title}
                    to={action.to}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 hover:border-white/30 transition-colors"
                  >
                    <div>
                      <p className="text-white font-heading">{action.title}</p>
                      <p className="text-sm text-dark-secondary">{action.desc}</p>
                    </div>
                    <span className="material-symbols-outlined text-white/70">arrow_outward</span>
                  </Link>
                ))}
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 flex items-center gap-3 text-sm text-white">
                <span className="material-symbols-outlined text-base">bolt</span>
                <p>{launching ? 'Routing you to Mission Control…' : 'Every route is live. Hit launch when ready.'}</p>
              </div>
            </div>
          </div>

          <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-dark-secondary">First minute, zero friction</p>
                <h2 className="text-2xl font-heading text-white">Your guided runway</h2>
              </div>
              <Link to="/quiz-library" className="text-sm text-accent-sky hover:text-white transition-colors">
                View quiz library
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { step: '01', title: 'Pick a class', desc: 'Reserve a seat directly from the live catalog.' },
                { step: '02', title: 'Attach resources', desc: 'Drop PDFs, drills, and audio into the class library.' },
                { step: '03', title: 'Launch a quiz', desc: 'Generate questions, save to Quiz Library, and assign.' },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white">{item.step}</span>
                    <p className="text-lg font-heading text-white">{item.title}</p>
                  </div>
                  <p className="text-sm text-dark-secondary mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default LandingPortal;
