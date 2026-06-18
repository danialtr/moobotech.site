"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Category, Product, ProductBadge } from "@/lib/menu";
import { formatPrice } from "@/lib/menu";
import { ProductArtwork } from "./ProductArtwork";

const badgeLabels: Record<ProductBadge, string> = {
  popular: "پرطرفدار",
  new: "جدید",
  signature: "ویژه",
};

export function ProductCard({
  product,
  category,
  index,
}: {
  product: Product;
  category: Category;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // raw pointer position in range [-0.5, 0.5]
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 18,
  });

  // glare follows the cursor
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 45%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.21, 0.6, 0.35, 1] }}
      className="perspective"
    >
      <motion.article
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.02 }}
        className="group preserve-3d relative flex h-full flex-col overflow-hidden rounded-3xl glass shadow-card"
      >
        {/* artwork */}
        <div
          className="relative h-52 w-full overflow-hidden sm:h-56"
          style={{ transform: "translateZ(40px)" }}
        >
          <ProductArtwork product={product} category={category} />

          {product.badge && (
            <span
              className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-espresso-950 shadow-lg"
              style={{ backgroundColor: category.accent }}
            >
              {badgeLabels[product.badge]}
            </span>
          )}
        </div>

        {/* details */}
        <div
          className="flex flex-1 flex-col gap-2 p-5"
          style={{ transform: "translateZ(28px)" }}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-xl font-extrabold text-cream">{product.name}</h3>
            <span className="text-xs font-medium uppercase tracking-widest text-latte/70">
              {product.nameEn}
            </span>
          </div>

          <p className="text-sm leading-6 text-cream/65">{product.description}</p>

          <div className="mt-auto flex items-center justify-between pt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="tnum text-2xl font-black text-gradient-gold">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-cream/60">تومان</span>
            </div>

            <button
              type="button"
              aria-label={`افزودن ${product.name}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold transition-all duration-300 hover:scale-110 hover:bg-gold hover:text-espresso-950"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* cursor glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />
      </motion.article>
    </motion.div>
  );
}
