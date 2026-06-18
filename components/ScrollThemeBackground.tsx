"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { categories } from "@/lib/menu";

/**
 * A fixed background layer whose color smoothly morphs as the visitor scrolls
 * through the menu — travelling from warm (espresso) to cold (iced) tones and
 * onward through each section's signature colour.
 */
export function ScrollThemeBackground() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.0005,
  });

  const themeColors = categories.map((c) => c.themeColor);
  const accents = categories.map((c) => c.accent);

  // evenly spaced stops: a warm intro, one per section, then hold the last
  const n = themeColors.length;
  const stops = [0, ...themeColors.map((_, i) => (i + 1) / (n + 1)), 1];
  const bgRange = [themeColors[0], ...themeColors, themeColors[n - 1]];
  const glowRange = [accents[0], ...accents, accents[n - 1]];

  const backgroundColor = useTransform(progress, stops, bgRange);
  const glow = useTransform(progress, stops, glowRange);

  return (
    <>
      <motion.div className="fixed inset-0 -z-30" style={{ backgroundColor }} />
      {/* drifting ambient glow that shifts hue with the section */}
      <motion.div
        aria-hidden
        className="fixed left-1/2 top-[-20vh] -z-20 h-[70vh] w-[140vw] -translate-x-1/2 rounded-full opacity-25 blur-[130px]"
        style={{ backgroundColor: glow }}
      />
      <motion.div
        aria-hidden
        className="fixed bottom-[-25vh] right-[-10vw] -z-20 h-[60vh] w-[80vw] rounded-full opacity-15 blur-[140px]"
        style={{ backgroundColor: glow }}
      />
    </>
  );
}
