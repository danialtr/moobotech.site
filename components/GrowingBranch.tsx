"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** main winding stem, drawn top→bottom as the visitor scrolls */
const STEM =
  "M 52 -20 C 94 120 22 250 64 390 C 98 510 26 630 66 770 C 96 880 58 980 74 1080";

/** offshoot twigs: { path, threshold at which it starts drawing } */
const TWIGS: { d: string; t: number }[] = [
  { d: "M 44 270 C 86 252 120 240 162 222", t: 0.2 },
  { d: "M 58 455 C 100 472 136 488 176 504", t: 0.4 },
  { d: "M 60 650 C 100 636 132 626 170 606", t: 0.58 },
  { d: "M 68 845 C 106 862 138 876 174 890", t: 0.78 },
];

type Sprout = {
  x: number;
  y: number;
  rot: number;
  t: number;
  kind: "leaf" | "cherry";
};

const SPROUTS: Sprout[] = [
  { x: 60, y: 120, rot: -35, t: 0.1, kind: "leaf" },
  { x: 44, y: 190, rot: 60, t: 0.16, kind: "cherry" },
  { x: 162, y: 222, rot: -18, t: 0.26, kind: "leaf" },
  { x: 150, y: 250, rot: 0, t: 0.3, kind: "cherry" },
  { x: 64, y: 390, rot: 35, t: 0.38, kind: "leaf" },
  { x: 176, y: 504, rot: 12, t: 0.48, kind: "cherry" },
  { x: 178, y: 470, rot: -10, t: 0.5, kind: "leaf" },
  { x: 66, y: 770, rot: 40, t: 0.66, kind: "cherry" },
  { x: 170, y: 606, rot: -28, t: 0.62, kind: "leaf" },
  { x: 174, y: 890, rot: 8, t: 0.84, kind: "cherry" },
  { x: 74, y: 1000, rot: 30, t: 0.9, kind: "leaf" },
];

function LeafShape() {
  return (
    <>
      <path
        d="M0 0 C 10 -13 28 -13 36 0 C 28 13 10 13 0 0 Z"
        fill="#c89a52"
      />
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

function Sprout({
  s,
  progress,
}: {
  s: Sprout;
  progress: MotionValue<number>;
}) {
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

function Twig({
  d,
  t,
  progress,
}: {
  d: string;
  t: number;
  progress: MotionValue<number>;
}) {
  const pathLength = useTransform(progress, [t, t + 0.16], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#caa05a"
      strokeWidth={3}
      strokeLinecap="round"
      style={{ pathLength }}
    />
  );
}

export function GrowingBranch({ side = "left" }: { side?: "left" | "right" }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.0005,
  });
  const stemLength = useTransform(progress, [0, 0.92], [0.04, 1]);
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed top-0 -z-10 h-[100svh] w-[26vh] max-w-[210px] ${
        side === "right" ? "right-0 -scale-x-100" : "left-0"
      } ${side === "right" ? "opacity-40" : "opacity-60"}`}
    >
      <svg
        viewBox="0 0 240 1000"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
      >
        <motion.path
          d={STEM}
          fill="none"
          stroke="#caa05a"
          strokeWidth={4.5}
          strokeLinecap="round"
          style={{ pathLength: stemLength }}
        />
        {TWIGS.map((tw, i) => (
          <Twig key={i} d={tw.d} t={tw.t} progress={progress} />
        ))}
        {SPROUTS.map((s, i) => (
          <Sprout key={i} s={s} progress={progress} />
        ))}
      </svg>
    </div>
  );
}
