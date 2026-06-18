"use client";

import { useState } from "react";
import type { Category, Product } from "@/lib/menu";
import { CategoryGlyph } from "./icons";

export function ProductArtwork({
  product,
  category,
}: {
  product: Product;
  category: Category;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${category.gradient}`}
    >
      {/* Guaranteed fallback artwork (always rendered underneath) */}
      <div className="absolute inset-0 grid place-items-center">
        <CategoryGlyph
          icon={category.icon}
          className="h-2/3 w-2/3 opacity-25"
          style={{ color: category.accent }}
        />
      </div>

      {/* soft radial light */}
      <div
        className="absolute -top-10 right-1/2 h-40 w-40 translate-x-1/2 rounded-full blur-3xl"
        style={{ background: category.accent, opacity: 0.25 }}
      />

      {/* steam wisps for the fallback */}
      {status !== "loaded" && (
        <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-16 w-1.5 rounded-full bg-white/30 blur-[2px] animate-steam"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          ))}
        </div>
      )}

      {/* Real photo on top — fades in when it loads, removed on error */}
      {status !== "error" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            status === "loaded" ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
        />
      )}

      {/* bottom gradient for legibility */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-espresso-950 via-espresso-950/40 to-transparent" />
    </div>
  );
}
