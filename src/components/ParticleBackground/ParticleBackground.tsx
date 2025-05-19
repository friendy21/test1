// ParticleBackground.tsx
import { useCallback, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions, Engine, Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// Define props interface for type safety
interface ParticleBackgroundProps {
  className?: string; // Optional className for custom styling
}

// Reusable ParticleBackground component
const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className }) => {
  // Initialize tsparticles engine
  // useMemo ensures engine is initialized only once
  const initialized = useMemo(() => {
    return initParticlesEngine(async (engine: Engine) => {
      // Load slim bundle for optimized performance
      await loadSlim(engine);
    }).then(() => true);
  }, []);

  // Particle configuration options
  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent", // Transparent to allow CSS background styling
        },
      },
      fpsLimit: 60, // Smooth animation at 60 FPS
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse", // Particles move away from cursor
          },
          onClick: {
            enable: true,
            mode: "push", // Add particles on click
          },
          resize: {
            enable: true, // Responsive to viewport changes
          },
        },
        modes: {
          repulse: {
            distance: 100, // Distance of repulse effect
            duration: 0.4,
          },
          push: {
            quantity: 4, // Number of particles added on click
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // White particles for a clean look
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true, // Enable connections between particles
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce", // Particles bounce off edges
          },
          random: false,
          speed: 2, // Slow, smooth movement
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800, // Particle density
          },
          value: 80, // Number of particles
        },
        opacity: {
          value: 0.5, // Semi-transparent particles
        },
        shape: {
          type: "circle", // Circular particles
        },
        size: {
          value: { min: 1, max: 5 }, // Variable particle sizes
        },
      },
      detectRetina: true, // Optimize for high-DPI displays
    }),
    []
  );

  // Callback for when particles are loaded
  const particlesLoaded = useCallback(async (container?: Container) => {
    // Optional: Add logic when particles are fully loaded
    console.log("Particles loaded:", container);
  }, []);

  // Render Particles component only if engine is initialized
  if (!initialized) return null;

  return (
    <Particles
      id="tsparticles"
      className={className}
      options={options}
      particlesLoaded={particlesLoaded}
    />
  );
};

export default ParticleBackground;