import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// Read once at load; visitors who ask for less motion get a still starfield
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ParticleClass = () => {
  const [init, setInit] = useState(false);

  // The engine only needs to be set up once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000",
        },
      },
      // 60 is smooth enough for slow-drifting dots and halves the work on
      // 120Hz screens, which matters for phone batteries
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: !prefersReducedMotion,
            mode: "grab",
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: !prefersReducedMotion,
          outModes: {
            default: OutMode.out,
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          // Scales the count to the screen's area: 80 particles on a
          // 1920x1080 screen, proportionally fewer on smaller screens
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (!init) return null;

  return <Particles id="tsparticles" options={options} />;
};

export default ParticleClass
