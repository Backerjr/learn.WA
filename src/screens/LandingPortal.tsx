import { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Mesh } from 'three';

// --- 3D Scene Components ---

/**
 * Renders the distorted 3D background mesh to simulate the "Liquid Gold/Ink" effect.
 * Uses MeshDistortMaterial for a fluid, organic look.
 */
const FluidBackground = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    // Subtle rotation and distortion change over time
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} scale={3.5} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#202020" // Dark grey base
        metalness={0.8}
        roughness={0.2}
        distort={0.5} // High distortion for fluid look
        speed={2}     // High speed for dynamic motion
      />
    </mesh>
  );
};

// --- HTML Overlay and Interaction ---

const PortalOverlay = ({ handleInteraction, loading }: { handleInteraction: () => void; loading: boolean }) => (
  <div className="absolute inset-0 z-10 flex flex-col text-white">
    <header className="flex items-center justify-between px-6 md:px-12 pt-10">
      <div className="flex items-center gap-3">
        <div className="size-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center font-heading text-xl">SF</div>
        <div className="flex flex-col leading-tight">
          <span className="font-heading text-lg">Structured Fun English</span>
          <span className="text-xs uppercase tracking-[0.15em] text-white/70">Teachers + Learners</span>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.15em]">
        <Link to="/learn" className="hover:text-holo-silver transition-colors">Learn</Link>
        <Link to="/library" className="hover:text-holo-silver transition-colors">Library</Link>
        <Link to="/quiz" className="hover:text-holo-silver transition-colors">Quiz</Link>
        <Link to="/teacher" className="hover:text-holo-silver transition-colors">Teacher</Link>
      </nav>
      <button
        onClick={handleInteraction}
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.15em] backdrop-blur-md hover:bg-white/20"
      >
        <span className="material-symbols-outlined text-base">rocket_launch</span>
        {loading ? 'Launching...' : 'Launch'}
      </button>
    </header>

    <div className="flex flex-1 flex-col justify-center gap-8 px-6 md:px-12 pb-16 pointer-events-auto">
      <div className="max-w-4xl space-y-5">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-white/70"
        >
          From first lesson to ready-to-use assessments
        </motion.p>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="font-editorial text-5xl sm:text-6xl md:text-7xl leading-[1.05] drop-shadow-lg"
        >
          A cinematic launch pad for teachers and learners to move from browsing to doing.
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl text-lg text-white/80"
        >
          Step into Mission Control, pick a lesson, send students to a quiz, and keep their resources in one working place—no more mock screens.
        </motion.p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleInteraction}
            className="rounded-full bg-white text-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] hover:scale-[1.01] transition-transform shadow-lg"
          >
            Enter Mission Control
          </button>
          <Link
            to="/library"
            className="rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white hover:bg-white/15 transition-colors"
          >
            Browse Library
          </Link>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/60">
            <span className="size-2 rounded-full bg-emerald-300"></span>
            Live routes wired
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 max-w-5xl">
        {[
          { title: 'Learn', description: 'Jump straight to your lesson flow and stepper.', to: '/learn', icon: 'school' },
          { title: 'Resource Library', description: 'Filterable, savable resources with real actions.', to: '/library', icon: 'library_books' },
          { title: 'Quiz & Studio', description: 'Launch a quiz or build one in minutes.', to: '/quiz', icon: 'quiz' },
        ].map((card) => (
          <Link
            key={card.title}
            to={card.to}
            className="rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-md transition hover:border-white/40 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl">{card.icon}</span>
              <div>
                <p className="font-heading text-lg">{card.title}</p>
                <p className="text-sm text-white/80">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-3 max-w-5xl">
        <p className="uppercase text-xs tracking-[0.2em] text-white/60">Ready to start</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-white/10 p-3 text-sm">
            <p className="text-white/70">Next stop</p>
            <p className="font-heading text-xl">Mission Control</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3 text-sm">
            <p className="text-white/70">Secondary</p>
            <p className="font-heading text-xl">Resource Library</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3 text-sm">
            <p className="text-white/70">Quick win</p>
            <p className="font-heading text-xl">Start Quiz</p>
          </div>
        </div>
      </div>
    </div>

    <motion.p
      className="pb-6 text-center font-data text-xs md:text-sm text-holo-silver uppercase tracking-widest pointer-events-none"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      {loading ? 'Routing you to Mission Control...' : 'Every CTA below leads somewhere real.'}
    </motion.p>
  </div>
);


const LandingPortal = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInteraction = useCallback(() => {
    setLoading((prev) => {
      if (!prev) {
        // Navigate after the zoom animation is complete (approx 1.5s)
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
        return true;
      }
      return prev;
    });
  }, [navigate]);

  const zoomVariants = {
    initial: {
      scale: 1,
      opacity: 1,
    },
    zoom: {
      scale: 50,
      opacity: 0,
      transition: {
        duration: 1.5,
        ease: [0.42, 0, 0.58, 1] as const, // Cubic bezier for easeInOut
      },
    },
  };

  return (
    <div className="relative h-screen w-screen bg-space-black overflow-hidden">
      {/* Framer Motion wrapper for the zoom effect */}
      <motion.div
        className="h-full w-full"
        variants={zoomVariants}
        initial="initial"
        animate={loading ? 'zoom' : 'initial'}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          {/* Main light source - Neon Teal */}
          <pointLight position={[10, 10, 10]} intensity={1} color="#00FFC6" />
          <FluidBackground />
        </Canvas>
      </motion.div>

      {/* HTML Interface Overlay */}
      <PortalOverlay handleInteraction={handleInteraction} loading={loading} />
    </div>
  );
};

export default LandingPortal;
