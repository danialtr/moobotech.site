import type { Category, Product, ProductBadge } from "@/lib/menu";
import { formatPrice } from "@/lib/menu";
import { ProductArtwork } from "./ProductArtwork";
import { Reveal } from "./Reveal";

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
  return (
    <Reveal delay={(index % 3) * 90} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass shadow-card transition-transform duration-300 will-change-transform hover:-translate-y-1.5 hover:scale-[1.015] active:scale-[0.97]">
        {/* artwork */}
        <div className="relative h-52 w-full overflow-hidden sm:h-56">
          <ProductArtwork product={product} category={category} />

          {product.badge && (
            <span
              className="absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-bold text-espresso-950 shadow-lg"
              style={{ backgroundColor: category.accent }}
            >
              {badgeLabels[product.badge]}
            </span>
          )}
        </div>

        {/* details */}
        <div className="flex flex-1 flex-col gap-2 p-5">
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
          </div>
        </div>

        {/* glossy liquid-glass highlight */}
        <div className="pointer-events-none absolute inset-0 z-10 gloss rounded-3xl opacity-70" />
      </article>
    </Reveal>
  );
}
