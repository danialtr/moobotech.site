"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Single curving trunk, drawn top→bottom as the visitor scrolls. The on-curve
 * anchor points (between bezier segments) are reused as branch origins, and
 * each main branch forks into a smaller sub-branch from its tip, so the whole
 * tree stays connected while reading as 4 distinct branches.
 */
const TRUNK =
  "M 150 -10 \
   C 150 60 120 120 132 190 \
   C 144 260 188 300 176 372 \
   C 164 444 110 484 122 556 \
   C 134 628 182 668 170 740 \
   C 158 812 134 852 142 924 \
   C 148 980 150 1015 150 1060";

type Branch = { d: string; t: number; w: number };

// 4 main branches off the trunk + a forked sub-branch at each tip
const BRANCHES: Branch[] = [
  { d: "M 132 190 C 96 166 62 150 30 112", t: 0.16, w: 3.6 }, // up-left
  { d: "M 30 112 C 22 92 22 70 34 50", t: 0.26, w: 2.4 }, // fork
  { d: "M 176 372 C 220 352 256 338 286 300", t: 0.34, w: 3.6 }, // right
  { d: "M 286 300 C 296 280 296 256 282 236", t: 0.44, w: 2.4 }, // fork
  { d: "M 122 556 C 86 574 52 588 20 618", t: 0.52, w: 3.6 }, // left
  { d: "M 20 618 C 12 636 12 658 26 678", t: 0.62, w: 2.4 }, // fork
  { d: "M 170 740 C 214 720 250 706 282 668", t: 0.7, w: 3.6 }, // right
  { d: "M 282 668 C 292 648 292 624 278 606", t: 0.8, w: 2.4 }, // fork
];

type Sprout = {
  x: number;
  y: number;
  rot: number;
  t: number;
  kind: "leaf" | "cherry";
};

const SPROUTS: Sprout[] = [
  { x: 34, y: 50, rot: -110, t: 0.3, kind: "leaf" },
  { x: 30, y: 112, rot: 150, t: 0.22, kind: "cherry" },
  { x: 176, y: 372, rot: 20, t: 0.4, kind: "leaf" },
  { x: 282, y: 236, rot: -70, t: 0.48, kind: "cherry" },
  { x: 286, y: 300, rot: -10, t: 0.42, kind: "leaf" },
  { x: 20, y: 618, rot: 165, t: 0.56, kind: "cherry" },
  { x: 26, y: 678, rot: 110, t: 0.66, kind: "leaf" },
  { x: 170, y: 740, rot: 15, t: 0.74, kind: "leaf" },
  { x: 278, y: 606, rot: -75, t: 0.84, kind: "cherry" },
  { x: 142, y: 924, rot: 150, t: 0.9, kind: "cherry" },
  { x: 150, y: 1040, rot: 35, t: 0.96, kind: "leaf" },
];

function LeafShape() {
  return (
    <>
      <path d="M0 0 C 10 -13 28 -13 36 0 C 28 13 10 13 0 0 Z" fill="#c89a52" />
      <path d="M3 0 H 31" stroke="#6f4a22" strokeWidth="1.2" fill="none" />
    </>
  );
}

function CherryShape() {
  return (
    <>
      <circle cx="0" cy="0" r="6.5" fill="#a83a2e" />
      <circle cx="11" cy="3" r="6" fill="#8d2c23" />
      <circle cx="-2" cy="-2" r="1.7" fill="#edc09a" opacity="0.7" />
      <circle cx="9" cy="1.5" r="1.5" fill="#edc09a" opacity="0.6" />
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

function Branch({
  b,
  progress,
}: {
  b: Branch;
  progress: MotionValue<number>;
}) {
  const pathLength = useTransform(progress, [b.t, b.t + 0.14], [0, 1]);
  return (
    <motion.path
      d={b.d}
      fill="none"
      stroke="#caa05a"
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
      className="pointer-events-none fixed inset-y-0 left-1/2 -z-10 h-[100svh] w-[40vh] min-w-[230px] max-w-[380px] -translate-x-1/2 opacity-50"
    >
      <svg
        viewBox="0 0 300 1000"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
      >
        <motion.path
          d={TRUNK}
          fill="none"
          stroke="#caa05a"
          strokeWidth={5}
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
