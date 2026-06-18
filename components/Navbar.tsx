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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`flex items-center justify-between gap-4 rounded-2xl px-4 transition-all duration-500 ${
            scrolled ? "glass py-2 shadow-card" : "py-1"
          }`}
        >
          {/* brand */}
          <a href="#top" className="flex items-center gap-2.5">
            <LogoMark className="h-9 w-9" />
            <div className="leading-tight">
              <p className="text-base font-black text-cream">{cafe.name}</p>
              <p className="text-[10px] tracking-[0.3em] text-gold/80">{cafe.nameEn}</p>
            </div>
          </a>

          {/* category pills */}
          <nav className="hidden items-center gap-1 md:flex">
            {categories.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="relative rounded-full px-3.5 py-1.5 text-sm font-semibold text-cream/70 transition-colors hover:text-cream"
              >
                {active === c.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gold/15 ring-1 ring-gold/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{c.title}</span>
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#espresso"
            className="hidden rounded-full bg-gradient-to-l from-gold to-espresso-500 px-5 py-2 text-sm font-bold text-espresso-950 shadow-glow transition-transform hover:scale-105 sm:inline-block"
          >
            سفارش
          </a>
        </div>

        {/* mobile horizontal scroller */}
        <nav className="mt-2 flex gap-2 overflow-x-auto pb-1 md:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                active === c.id
                  ? "bg-gold/20 text-cream ring-1 ring-gold/40"
                  : "glass text-cream/70"
              }`}
            >
              {c.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
