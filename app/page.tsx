import { categories } from "@/lib/menu";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Navbar />
      <Hero />

      <div className="relative">
        {/* divider */}
        <div className="mx-auto max-w-6xl px-6">
          <div className="h-px w-full bg-gradient-to-l from-transparent via-gold/30 to-transparent" />
        </div>

        {categories.map((category) => (
          <MenuSection key={category.id} category={category} />
        ))}
      </div>

      <Footer />
    </main>
  );
}
