"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { categories, cafe } from "@/lib/menu";
import { LogoMark } from "./icons";

export function Navbar() {
  const [active, setActive] = useState(categories[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b border-gold/25 bg-[#1a0e08] transition-shadow duration-300 ${
          scrolled ? "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]" : ""
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          {/* brand */}
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-espresso-800 ring-1 ring-gold/40">
              <LogoMark className="h-7 w-7" />
            </span>
            <span className="leading-tight">
              <span className="block text-xl font-black text-cream drop-shadow-sm sm:text-2xl">
                {cafe.name}
              </span>
              <span className="block text-[10px] font-bold tracking-[0.35em] text-gold">
                {cafe.nameEn}
              </span>
            </span>
          </a>

          {/* category pills (desktop) */}
          <nav className="hidden items-center gap-1.5 md:flex">
            {categories.map((c) => {
              const isActive = active === c.id;
              return (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    isActive ? "text-espresso-950" : "text-cream/85 hover:text-cream"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gold shadow-glow"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{c.title}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* mobile horizontal scroller */}
        <nav className="flex gap-2 overflow-x-auto px-4 pb-3 md:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((c) => {
            const isActive = active === c.id;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-gold text-espresso-950 shadow-glow"
                    : "bg-espresso-800 text-cream/85 ring-1 ring-gold/20"
                }`}
              >
                {c.title}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
