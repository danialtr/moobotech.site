"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CoffeeBean } from "./icons";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";

type Seed = {
  left: number; // %
  size: number; // px
  yStart: number; // vh
  yEnd: number; // vh
  spin: number; // deg
  depth: number; // 0 (far) .. 1 (near)
};

// Hand-tuned so beans tumble down the screen at different speeds (parallax)
const SEEDS: Seed[] = [
  { left: 6, size: 34, yStart: -18, yEnd: 128, spin: 320, depth: 0.9 },
  { left: 20, size: 20, yStart: -30, yEnd: 120, spin: -260, depth: 0.4 },
  { left: 34, size: 28, yStart: -12, yEnd: 134, spin: 200, depth: 0.7 },
  { left: 48, size: 16, yStart: -40, yEnd: 116, spin: -180, depth: 0.3 },
  { left: 62, size: 32, yStart: -22, yEnd: 130, spin: 300, depth: 0.85 },
  { left: 76, size: 22, yStart: -34, yEnd: 122, spin: -240, depth: 0.5 },
  { left: 88, size: 26, yStart: -16, yEnd: 132, spin: 220, depth: 0.65 },
  { left: 13, size: 18, yStart: -45, yEnd: 118, spin: -300, depth: 0.35 },
  { left: 55, size: 24, yStart: -28, yEnd: 126, spin: 260, depth: 0.6 },
  { left: 30, size: 30, yStart: -10, yEnd: 136, spin: -210, depth: 0.8 },
];

function Bean({
  seed,
  progress,
}: {
  seed: Seed;
  progress: MotionValue<number>;
}) {
  // deeper (nearer) beans travel further → parallax depth
  const travel = 0.5 + seed.depth * 0.5;
  const y = useTransform(
    progress,
    [0, 1],
    [`${seed.yStart}vh`, `${seed.yStart + (seed.yEnd - seed.yStart) * travel}vh`]
  );
  const rotate = useTransform(progress, [0, 1], [0, seed.spin]);
  const rotateX = useTransform(progress, [0, 1], [0, seed.spin * 0.6]);

  return (
    <motion.span
      aria-hidden
      className="absolute top-0 text-[#c98a45]"
      style={{
        left: `${seed.left}%`,
        y,
        rotate,
        rotateX,
        z: (seed.depth - 0.5) * 220,
        opacity: 0.55 + seed.depth * 0.4,
        filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.5)) blur(${(1 - seed.depth) * 0.8}px)`,
      }}
    >
      <CoffeeBean style={{ width: seed.size, height: seed.size }} />
    </motion.span>
  );
}

export function FallingBeans() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.0005,
  });
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  const seeds = isMobile ? SEEDS.slice(0, 6) : SEEDS;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ perspective: "900px" }}
    >
      {seeds.map((seed, i) => (
        <Bean key={i} seed={seed} progress={progress} />
      ))}
    </div>
  );
}
