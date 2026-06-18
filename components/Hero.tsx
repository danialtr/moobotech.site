"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cafe, categories } from "@/lib/menu";
import { CategoryGlyph, CoffeeBean, LogoMark } from "./icons";

const orbs = [
  { top: "14%", left: "10%", size: 90, delay: 0, tint: "rgba(255,255,255,0.18)" },
  { top: "24%", left: "84%", size: 130, delay: 1.2, tint: "rgba(212,163,90,0.22)" },
  { top: "70%", left: "16%", size: 110, delay: 0.6, tint: "rgba(180,210,230,0.16)" },
  { top: "76%", left: "78%", size: 80, delay: 1.8, tint: "rgba(255,255,255,0.14)" },
];

const beans = [
  { top: "18%", left: "6%", size: 24, delay: 0 },
  { top: "30%", left: "90%", size: 30, delay: 1.1 },
  { top: "80%", left: "12%", size: 26, delay: 0.7 },
  { top: "62%", left: "92%", size: 18, delay: 1.6 },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yOrbs = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const yPanel = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-0.5, 0.5], [16, -16]), {
    stiffness: 120,
    damping: 16,
  });
  const rY = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), {
    stiffness: 120,
    damping: 16,
  });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const itemCount = categories.reduce((n, c) => n + c.products.length, 0);

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-40 sm:pt-28"
    >
      {/* floating glass orbs */}
      <motion.div style={{ y: yOrbs }} className="pointer-events-none absolute inset-0">
        {orbs.map((o, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              top: o.top,
              left: o.left,
              width: o.size,
              height: o.size,
              background: o.tint,
            }}
            animate={{ y: [0, -22, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: o.delay }}
          />
        ))}
      </motion.div>

      {/* drifting beans */}
      {beans.map((b, i) => (
        <div
          key={i}
          className="pointer-events-none absolute animate-float text-white/25"
          style={{ top: b.top, left: b.left, animationDelay: `${b.delay}s` }}
        >
          <CoffeeBean style={{ width: b.size, height: b.size }} />
        </div>
      ))}

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
        {/* glass copy panel */}
        <motion.div
          style={{ y: yPanel, opacity: fade }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="sheen relative overflow-hidden rounded-[2rem] glass-bright p-7 text-center sm:p-9 lg:text-right"
        >
          <div className="pointer-events-none absolute inset-0 gloss rounded-[2rem]" />

          <div className="relative flex items-center justify-center gap-3 lg:justify-start">
            <motion.span
              initial={{ rotate: -20, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.1 }}
              className="grid h-14 w-14 place-items-center rounded-2xl glass"
            >
              <LogoMark className="h-10 w-10" />
            </motion.span>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-cream">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
              تازه‌رُست، هر روز
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mt-5 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient-gold">{cafe.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative mt-3 text-2xl font-bold text-white sm:text-3xl"
          >
            {cafe.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="relative mx-auto mt-5 max-w-md text-base leading-8 text-cream/80 lg:mx-0"
          >
            {cafe.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="relative mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a
              href="#espresso"
              className="rounded-full bg-gradient-to-l from-gold to-espresso-400 px-7 py-3 font-bold text-espresso-950 shadow-glow transition-transform hover:scale-105"
            >
              مشاهده‌ی منو
            </a>
            <div className="flex items-center gap-2 text-sm text-cream/80">
              <span className="tnum text-2xl font-black text-gold">
                +{itemCount.toLocaleString("fa-IR")}
              </span>
              آیتم خوشمزه
            </div>
          </motion.div>
        </motion.div>

        {/* 3D liquid-glass coffee stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ opacity: fade }}
          className="perspective mx-auto"
        >
          <motion.div
            style={{ rotateX: rX, rotateY: rY }}
            className="preserve-3d relative grid h-72 w-72 place-items-center sm:h-96 sm:w-96"
          >
            {/* glass disc */}
            <div className="absolute inset-4 overflow-hidden rounded-full glass-bright">
              {/* rotating conic sheen */}
              <div
                className="absolute inset-0 animate-spinSlow opacity-50"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.35), transparent 35%, transparent 65%, rgba(212,163,90,0.3), transparent)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 gloss rounded-full" />
            </div>

            {/* orbiting beans */}
            <div
              className="absolute inset-0 animate-spinSlow"
              style={{ transform: "translateZ(20px)" }}
            >
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <span
                  key={deg}
                  className="absolute left-1/2 top-1/2 text-gold/60"
                  style={{ transform: `rotate(${deg}deg) translateY(-150px)` }}
                >
                  <CoffeeBean className="h-6 w-6" />
                </span>
              ))}
            </div>

            {/* central cup */}
            <div style={{ transform: "translateZ(70px)" }} className="relative">
              <CategoryGlyph
                icon="espresso"
                className="h-32 w-32 text-white drop-shadow-[0_10px_30px_rgba(255,255,255,0.35)] sm:h-40 sm:w-40"
              />
              <div className="absolute -top-8 left-1/2 flex -translate-x-1/2 gap-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-12 w-1.5 rounded-full bg-white/50 blur-[2px] animate-steam"
                    style={{ animationDelay: `${i * 0.8}s` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/60"
      >
        <div className="mx-auto flex h-9 w-6 justify-center rounded-full border border-white/40 p-1">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
