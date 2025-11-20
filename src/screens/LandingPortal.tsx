import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- 3D Scene Components ---

/**
 * Renders the distorted 3D background mesh to simulate the "Liquid Gold/Ink" effect.
 * Uses MeshDistortMaterial for a fluid, organic look.
 */
const FluidBackground = () => {
  const meshRef = useRef();

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

const PortalOverlay = ({ startZoom, loading }) => {
  const navigate = useNavigate();

  const handleInteraction = () => {
    if (!loading) {
      startZoom();
      // Navigate after the zoom animation is complete (approx 1.5s)
      setTimeout(() => {
        navigate('/dashboard'); 
      }, 1500);
    }
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* The Colossal Monolith Letter 'A' */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center cursor-pointer pointer-events-auto"
        initial={{ opacity: 1 }}
        animate={{ opacity: loading ? 0.2 : 1 }}
        onClick={handleInteraction}
      >
        <h1
          className="font-editorial text-[18rem] md:text-[24rem] select-none"
          style={{
            // Colossal Serif 'A' - Glowing/Refracting effect
            WebkitTextStroke: '1px #00FFC6', // Neon Teal Stroke
            WebkitTextFillColor: 'transparent', // Transparent fill
            textShadow: '0 0 10px rgba(0, 255, 198, 0.4)', // Soft neon shadow
          }}
        >
          A
        </h1>
      </motion.div>

      {/* Footer/Hint Text */}
      <motion.p
        className="absolute bottom-10 left-1/2 -translate-x-1/2 font-data text-xs md:text-sm text-holo-silver uppercase tracking-widest animate-pulseNeon pointer-events-none"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {loading ? 'Entering Hyperspace...' : 'Click the Monolith to Enter'}
      </motion.p>
    </div>
  );
};


const LandingPortal = () => {
  const [loading, setLoading] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  const startZoom = () => {
    setLoading(true);
    // Use Framer Motion style animation on a hidden element to drive the scale change
    // This provides the smooth, controlled zoom/transition effect.
    return {
      scale: [1, 50],
      opacity: [1, 0],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
      onComplete: () => console.log('Zoom complete')
    };
  };

  return (
    <div className="relative h-screen w-screen bg-space-black overflow-hidden">
      {/* Framer Motion wrapper for the zoom effect */}
      <motion.div
        className="h-full w-full"
        animate={loading ? startZoom() : {}}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          {/* Main light source - Neon Teal */}
          <pointLight position={[10, 10, 10]} intensity={1} color="#00FFC6" />
          <FluidBackground />
        </Canvas>
      </motion.div>

      {/* HTML Interface Overlay */}
      <PortalOverlay startZoom={startZoom} loading={loading} />
    </div>
  );
};

export default LandingPortal;