import { categories } from "@/lib/menu";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollThemeBackground } from "@/components/ScrollThemeBackground";
import { FallingBeans } from "@/components/FallingBeans";
import { GrowingBranch } from "@/components/GrowingBranch";
import { MusicPlayer } from "@/components/MusicPlayer";

export default function Home() {
  return (
    <>
      {/* animated, scroll-linked warm→cold ambience */}
      <ScrollThemeBackground />
      <GrowingBranch />
      <FallingBeans />

      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />

        <div className="relative">
          <div className="mx-auto max-w-6xl px-6">
            <div className="h-px w-full bg-gradient-to-l from-transparent via-gold/30 to-transparent" />
          </div>

          {categories.map((category) => (
            <MenuSection key={category.id} category={category} />
          ))}
        </div>

        <Footer />
      </main>

      <MusicPlayer />
    </>
  );
}
