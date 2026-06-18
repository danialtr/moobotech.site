"use client";

import { motion } from "framer-motion";
import type { Category } from "@/lib/menu";
import { ProductCard } from "./ProductCard";
import { CategoryGlyph } from "./icons";

export function MenuSection({ category }: { category: Category }) {
  return (
    <section
      id={category.id}
      className="relative scroll-mt-36 py-16 sm:scroll-mt-24 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center gap-4"
        >
          <div
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl glass"
            style={{ boxShadow: `0 0 40px -12px ${category.accent}` }}
          >
            <CategoryGlyph icon={category.icon} className="h-9 w-9" style={{ color: category.accent }} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-cream sm:text-4xl">{category.title}</h2>
            <p className="mt-1 text-sm text-cream/60">{category.subtitle}</p>
          </div>
          <div className="ms-auto hidden h-px flex-1 bg-gradient-to-l from-transparent via-gold/40 to-transparent sm:block" />
        </motion.div>

        {/* grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {category.products.map((product, i) => (
            <ProductCard key={product.id} product={product} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
