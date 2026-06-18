"use client";

import { useEffect, useRef } from "react";
import { categories } from "@/lib/menu";

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function mix(a: RGB, b: RGB, t: number): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

interface Anchor {
  y: number;
  theme: RGB;
  accent: RGB;
}

/**
 * Fixed background whose colour matches the section currently filling the
 * screen. Each section's colour is anchored to its real document position and
 * interpolated by the viewport centre, so the warm→cold shift stays perfectly
 * in sync with what the visitor sees while scrolling (mobile included).
 */
export function ScrollThemeBackground() {
  const bgRef = useRef<HTMLDivElement>(null);
  const glowTop = useRef<HTMLDivElement>(null);
  const glowBottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const themeRgb = categories.map((c) => hexToRgb(c.themeColor));
    const accentRgb = categories.map((c) => hexToRgb(c.accent));
    let anchors: Anchor[] = [];

    const build = () => {
      const arr: Anchor[] = [
        { y: 0, theme: themeRgb[0], accent: accentRgb[0] },
      ];
      categories.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        arr.push({
          y: top + el.offsetHeight / 2,
          theme: themeRgb[i],
          accent: accentRgb[i],
        });
      });
      const last = themeRgb.length - 1;
      arr.push({
        y: document.documentElement.scrollHeight,
        theme: themeRgb[last],
        accent: accentRgb[last],
      });
      anchors = arr.sort((p, q) => p.y - q.y);
    };

    const apply = () => {
      if (anchors.length < 2) return;
      const ref = window.scrollY + window.innerHeight / 2;
      let i = 0;
      while (i < anchors.length - 2 && anchors[i + 1].y < ref) i++;
      const a = anchors[i];
      const b = anchors[i + 1];
      const span = b.y - a.y || 1;
      const t = Math.max(0, Math.min(1, (ref - a.y) / span));
      const bg = mix(a.theme, b.theme, t);
      const ac = mix(a.accent, b.accent, t);
      if (bgRef.current) bgRef.current.style.backgroundColor = bg;
      if (glowTop.current) glowTop.current.style.backgroundColor = ac;
      if (glowBottom.current) glowBottom.current.style.backgroundColor = ac;
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        apply();
      });
    };
    const rebuild = () => {
      build();
      apply();
    };

    rebuild();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", rebuild);
    window.addEventListener("load", rebuild);
    const t1 = window.setTimeout(rebuild, 400);
    const t2 = window.setTimeout(rebuild, 1200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", rebuild);
      window.removeEventListener("load", rebuild);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={bgRef}
        className="fixed inset-0 -z-30"
        style={{ backgroundColor: categories[0].themeColor }}
      />
      <div
        ref={glowTop}
        aria-hidden
        className="fixed left-1/2 top-[-20vh] -z-20 h-[70vh] w-[140vw] -translate-x-1/2 rounded-full opacity-25 blur-[130px]"
        style={{ backgroundColor: categories[0].accent }}
      />
      <div
        ref={glowBottom}
        aria-hidden
        className="fixed bottom-[-25vh] right-[-10vw] -z-20 h-[60vh] w-[80vw] rounded-full opacity-15 blur-[140px]"
        style={{ backgroundColor: categories[0].accent }}
      />
    </>
  );
}
