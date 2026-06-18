"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** frosted, translucent stroke so the tree reads like glass etching */
const STROKE = "url(#treeGrad)";

/**
 * Single curving trunk drawn top→bottom on scroll. Every branch starts from an
 * exact point on the trunk (or its parent branch) and forks again, so the tree
 * stays fully connected while reading as many branches.
 */
const TRUNK =
  "M 150 -10 \
   C 150 50 120 100 132 160 \
   C 144 220 188 250 176 300 \
   C 164 370 108 400 120 440 \
   C 132 510 192 540 180 580 \
   C 168 650 110 680 122 720 \
   C 134 790 182 820 170 860 \
   C 160 920 150 970 150 1060";

type Branch = { d: string; t: number; w: number };

// 6 main branches off the trunk, each forking into a sub-branch (12 total)
const BRANCHES: Branch[] = [
  { d: "M 132 160 C 100 142 70 128 42 100", t: 0.15, w: 3 },
  { d: "M 42 100 C 34 80 34 60 46 42", t: 0.23, w: 2 },
  { d: "M 176 300 C 212 284 246 270 276 244", t: 0.3, w: 3 },
  { d: "M 276 244 C 286 224 286 202 272 184", t: 0.38, w: 2 },
  { d: "M 120 440 C 86 458 54 470 24 496", t: 0.44, w: 3 },
  { d: "M 24 496 C 16 514 16 536 30 556", t: 0.52, w: 2 },
  { d: "M 180 580 C 216 596 250 610 280 636", t: 0.58, w: 3 },
  { d: "M 280 636 C 290 656 290 678 276 696", t: 0.66, w: 2 },
  { d: "M 122 720 C 88 736 56 748 26 774", t: 0.72, w: 3 },
  { d: "M 26 774 C 18 792 18 814 32 834", t: 0.8, w: 2 },
  { d: "M 170 860 C 206 844 240 832 270 808", t: 0.84, w: 3 },
  { d: "M 270 808 C 280 788 280 766 266 748", t: 0.92, w: 2 },
];

type Sprout = {
  x: number;
  y: number;
  rot: number;
  t: number;
  kind: "leaf" | "cherry";
};

const SPROUTS: Sprout[] = [
  { x: 46, y: 42, rot: -120, t: 0.28, kind: "leaf" },
  { x: 42, y: 100, rot: 160, t: 0.2, kind: "cherry" },
  { x: 276, y: 244, rot: -10, t: 0.34, kind: "leaf" },
  { x: 272, y: 184, rot: -60, t: 0.42, kind: "cherry" },
  { x: 24, y: 496, rot: 150, t: 0.48, kind: "cherry" },
  { x: 30, y: 556, rot: 165, t: 0.56, kind: "leaf" },
  { x: 280, y: 636, rot: -10, t: 0.62, kind: "leaf" },
  { x: 276, y: 696, rot: -75, t: 0.7, kind: "cherry" },
  { x: 26, y: 774, rot: 150, t: 0.76, kind: "cherry" },
  { x: 32, y: 834, rot: 160, t: 0.84, kind: "leaf" },
  { x: 270, y: 808, rot: -10, t: 0.88, kind: "leaf" },
  { x: 266, y: 748, rot: -70, t: 0.94, kind: "cherry" },
  { x: 150, y: 1040, rot: 35, t: 0.97, kind: "leaf" },
];

function LeafShape() {
  return (
    <>
      <path
        d="M0 0 C 10 -13 28 -13 36 0 C 28 13 10 13 0 0 Z"
        fill="rgba(206,236,214,0.55)"
      />
      <path
        d="M3 0 H 31"
        stroke="rgba(120,160,130,0.45)"
        strokeWidth="1.1"
        fill="none"
      />
    </>
  );
}

function CherryShape() {
  return (
    <>
      <circle cx="0" cy="0" r="6.2" fill="rgba(212,118,108,0.55)" />
      <circle cx="11" cy="3" r="5.6" fill="rgba(186,96,86,0.55)" />
      <circle cx="-2" cy="-2" r="1.6" fill="rgba(255,235,228,0.6)" />
    </>
  );
}

function Sprout({ s, progress }: { s: Sprout; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [s.t - 0.06, s.t], [0, 1]);
  const lift = useTransform(progress, [s.t - 0.06, s.t], [12, 0]);
  return (
    <g transform={`translate(${s.x} ${s.y}) rotate(${s.rot})`}>
      <motion.g style={{ opacity, y: lift }}>
        {s.kind === "leaf" ? <LeafShape /> : <CherryShape />}
      </motion.g>
    </g>
  );
}

function Branch({ b, progress }: { b: Branch; progress: MotionValue<number> }) {
  const pathLength = useTransform(progress, [b.t, b.t + 0.14], [0, 1]);
  return (
    <motion.path
      d={b.d}
      fill="none"
      stroke={STROKE}
      strokeWidth={b.w}
      strokeLinecap="round"
      style={{ pathLength }}
    />
  );
}

export function GrowingBranch() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.0005,
  });
  const trunkLength = useTransform(progress, [0, 0.94], [0.03, 1]);
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-1/2 z-30 h-[100svh] w-[42vh] min-w-[250px] max-w-[400px] -translate-x-1/2 opacity-40"
    >
      <svg
        viewBox="0 0 300 1000"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.18))" }}
      >
        <defs>
          <linearGradient id="treeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6f5ea" />
            <stop offset="0.55" stopColor="#bfe3cb" />
            <stop offset="1" stopColor="#a8d6ba" />
          </linearGradient>
        </defs>
        <motion.path
          d={TRUNK}
          fill="none"
          stroke={STROKE}
          strokeWidth={4.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: trunkLength }}
        />
        {BRANCHES.map((b, i) => (
          <Branch key={i} b={b} progress={progress} />
        ))}
        {SPROUTS.map((s, i) => (
          <Sprout key={i} s={s} progress={progress} />
        ))}
      </svg>
    </div>
  );
}
