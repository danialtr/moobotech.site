# ☕ Cafes Menu — منوی دیجیتال کافه آئورا

یک منوی دیجیتال **مدرن، فارسی و راست‌چین** برای کافه، با افکت‌های سه‌بعدی (3D tilt)،
انیمیشن‌های نرم و تصاویر باکیفیت محصولات. ساخته‌شده با Next.js و آماده‌ی استقرار روی **Vercel**.

A modern, animated **Persian (RTL)** café menu with 3D tilt cards, smooth motion and
high‑quality product imagery. Built with Next.js and ready to deploy on **Vercel**.

---

## ✨ امکانات / Features

- 🎴 **کارت‌های سه‌بعدی** — افکت tilt دنبال‌کننده‌ی موس با درخشش پویا (Framer Motion).
- 🌫️ **هیرو پارالاکس** — فنجان قهوه‌ی سه‌بعدی، دانه‌های شناور و بخار متحرک.
- 🧭 **ناوبری چسبان با Scroll‑Spy** — هایلایت خودکار دسته‌ی فعال.
- 🇮🇷 **کاملاً فارسی و راست‌چین** — فونت Vazirmatn و اعداد فارسی (۶۵٬۰۰۰ تومان).
- 🖼️ **تصاویر باکیفیت** با **fallback تضمینی** — اگر عکسی بارگذاری نشود، یک طرح گرافیکی شیک نمایش داده می‌شود (هیچ‌وقت عکس شکسته نمی‌بینید).
- 📱 **واکنش‌گرا** و بهینه برای موبایل.
- ⚡ **خروجی استاتیک** و سبک، بدون آسیب‌پذیری امنیتی (`npm audit` پاک).

## 🧱 تکنولوژی‌ها / Stack

| | |
|---|---|
| Framework | **Next.js 16** (App Router) |
| UI | **React 19** + **TypeScript** |
| Styling | **Tailwind CSS 3** |
| Animation | **Framer Motion 12** |
| Font | **Vazirmatn** (Google Fonts) |

## 🚀 اجرا روی سیستم / Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

Build کردن نسخه‌ی production:

```bash
npm run build
npm run start
```

## ▲ استقرار روی Vercel / Deploy on Vercel

1. وارد [vercel.com](https://vercel.com) شوید و روی **Add New → Project** کلیک کنید.
2. مخزن گیت‌هاب این پروژه را **Import** کنید.
3. Vercel به‌صورت خودکار Next.js را تشخیص می‌دهد — نیازی به تنظیمات نیست
   (Framework Preset: **Next.js**, Build Command: `next build`).
4. روی **Deploy** بزنید. تمام! 🎉

> این پروژه کاملاً Zero‑Config است؛ کافی است مخزن را به Vercel متصل کنید.

## 🛠️ شخصی‌سازی منو / Customizing the menu

تمام محتوای منو (نام کافه، دسته‌ها، محصولات، قیمت‌ها و عکس‌ها) در یک فایل قرار دارد:

```
lib/menu.ts
```

برای تغییر قیمت‌ها کافی است عدد `price` (به تومان) را عوض کنید — تبدیل به اعداد فارسی
به‌صورت خودکار انجام می‌شود. برای جایگزینی عکس‌ها، فقط آدرس `image` هر محصول را تغییر دهید.

## 📁 ساختار پروژه / Structure

```
app/
  layout.tsx        # تنظیمات RTL، فونت و متادیتا
  page.tsx          # صفحه‌ی اصلی
  globals.css       # استایل‌ها و ابزارهای سه‌بعدی
components/
  Hero.tsx          # بخش هیرو با افکت سه‌بعدی
  Navbar.tsx        # ناوبری چسبان + scroll‑spy
  MenuSection.tsx   # هر دسته از منو
  ProductCard.tsx   # کارت محصول با tilt سه‌بعدی
  ProductArtwork.tsx# عکس + طرح fallback
  Footer.tsx        # پاورقی
  icons.tsx         # آیکن‌های SVG
lib/
  menu.ts           # داده‌های منو (محتوای فارسی)
```

## 🍿 Movie night — `/watch`

A standalone page for watching a film together with camera + voice chat:
`public/watch.html`, served at **`/watch`** (rewrite in `next.config.mjs`).

1. Open `/watch` — it creates a private room link (`/watch?room=…`). Send it to your partner.
2. Both join with camera & mic.
3. One of you opens the movie file from their computer — it is **streamed directly
   to the other person** (they don't need a copy). Either of you can pause / seek.
4. If both of you have the same file, open it on both sides and playback switches to
   synced local copies (best quality).

Also: **Send movie to partner** (copies the file to them in the background, then both play
their own copy in sync — no stream delay), subtitles (.srt / .vtt, shared with the partner),
chat, emoji reactions, a fullscreen mode where the cameras float over the movie, and a ⚙
panel to pick microphone / camera / speaker with a live mic level meter.

How it works: WebRTC peer-to-peer via [PeerJS](https://peerjs.com) (MIT, vendored in
`public/vendor/`). The free PeerJS cloud server is only used to introduce the two
browsers; video, audio and the film go directly between them and are never uploaded.
Once connected, the movie stream and file transfer run over that existing connection
(renegotiated over the page's own data channel), so they keep working even if the
PeerJS server drops.
Streaming the film needs Chrome, Edge or Firefox on a computer. On very strict networks
a TURN server may be needed — add it to `ICE_SERVERS` at the top of the script.

---

ساخته‌شده با ☕ و عشق.
