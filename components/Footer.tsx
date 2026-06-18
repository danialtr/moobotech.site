import { cafe } from "@/lib/menu";
import { LogoMark } from "./icons";

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-gold/15 bg-espresso-950/60 py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-10 w-10" />
            <div>
              <p className="text-lg font-black text-cream">{cafe.name}</p>
              <p className="text-[10px] tracking-[0.3em] text-gold/80">{cafe.nameEn}</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-7 text-cream/60">{cafe.description}</p>
        </div>

        <div className="space-y-3 text-sm text-cream/70">
          <h3 className="text-base font-bold text-gold">ساعات کاری و آدرس</h3>
          <p className="flex items-start gap-2">
            <span className="text-gold">⏰</span> {cafe.hours}
          </p>
          <p className="flex items-start gap-2">
            <span className="text-gold">📍</span> {cafe.address}
          </p>
        </div>

        <div className="space-y-3 text-sm text-cream/70">
          <h3 className="text-base font-bold text-gold">ارتباط با ما</h3>
          <p className="flex items-center gap-2">
            <span className="text-gold">📞</span>
            <span className="tnum">{cafe.phone}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-gold">📷</span> {cafe.instagram}
          </p>
          <a
            href="#top"
            className="mt-2 inline-block rounded-full border border-gold/40 px-5 py-2 font-semibold text-gold transition-colors hover:bg-gold hover:text-espresso-950"
          >
            بازگشت به بالا ↑
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6">
        <p className="border-t border-gold/10 pt-6 text-center text-xs text-cream/40">
          © {new Date().toLocaleDateString("fa-IR", { year: "numeric" })} {cafe.name} — تمامی حقوق محفوظ است. ساخته‌شده با ☕ و عشق.
        </p>
      </div>
    </footer>
  );
}
