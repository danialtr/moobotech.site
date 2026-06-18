import type { CategoryIcon } from "@/lib/menu";
import type { JSX, SVGProps } from "react";

export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <defs>
        <linearGradient id="logoG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fde7c6" />
          <stop offset="0.5" stopColor="#e8b878" />
          <stop offset="1" stopColor="#b07b3a" />
        </linearGradient>
        <linearGradient id="logoGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
      </defs>
      {/* glassy badge */}
      <circle cx="32" cy="32" r="30" fill="url(#logoGlass)" opacity="0.5" />
      <circle cx="32" cy="32" r="29" stroke="url(#logoG)" strokeWidth="2.4" />
      {/* steam */}
      <path
        d="M26 11c-3 3-3 6 0 9M32 9c-3 3-3 6 0 9M38 11c-3 3-3 6 0 9"
        stroke="url(#logoG)"
        strokeWidth="2.3"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* cup body */}
      <path
        d="M21 29h22v8a11 11 0 0 1-11 11 11 11 0 0 1-11-11z"
        fill="url(#logoG)"
      />
      {/* handle */}
      <path
        d="M43 32h4a5 5 0 0 1 0 10h-2"
        stroke="url(#logoG)"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      {/* saucer */}
      <path
        d="M17 52h30"
        stroke="url(#logoG)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CoffeeBean(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <ellipse cx="16" cy="16" rx="9" ry="13" fill="currentColor" />
      <path
        d="M16 4c-4 5-4 19 0 24M11 7c4 4 4 14 0 18M21 7c-4 4-4 14 0 18"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---- Category line-art icons used inside the fallback artwork ---- */

function EspressoCup(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" {...props}>
      <path d="M22 44h46v18a23 23 0 0 1-23 23h0a23 23 0 0 1-23-23V44Z" stroke="currentColor" strokeWidth="3.5" />
      <path d="M68 50h8a10 10 0 0 1 0 20h-5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M34 14c-4 5-4 9 0 14M46 10c-4 5-4 9 0 14M58 14c-4 5-4 9 0 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <line x1="20" y1="92" x2="74" y2="92" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function IcedGlass(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" {...props}>
      <path d="M30 28h40l-5 56a6 6 0 0 1-6 5H41a6 6 0 0 1-6-5l-5-56Z" stroke="currentColor" strokeWidth="3.5" />
      <line x1="62" y1="14" x2="55" y2="60" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="40" y="44" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2.6" opacity="0.85" />
      <rect x="52" y="56" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2.6" opacity="0.85" />
      <path d="M28 40h44" stroke="currentColor" strokeWidth="3" opacity="0.7" />
    </svg>
  );
}

function TeaCup(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" {...props}>
      <path d="M20 46h44v10a22 22 0 0 1-22 22h0a22 22 0 0 1-22-22V46Z" stroke="currentColor" strokeWidth="3.5" />
      <path d="M64 50h9a9 9 0 0 1 0 18h-4" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M42 18c5 6 0 12-3 16 5 4 4 10 0 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <line x1="18" y1="90" x2="68" y2="90" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function SignatureGlass(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" {...props}>
      <path d="M34 22h32v52a8 8 0 0 1-8 8H42a8 8 0 0 1-8-8V22Z" stroke="currentColor" strokeWidth="3.5" />
      <path d="M34 40c8 4 24 4 32 0" stroke="currentColor" strokeWidth="3" opacity="0.8" />
      <line x1="58" y1="10" x2="58" y2="30" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="58" cy="9" r="4" stroke="currentColor" strokeWidth="3" />
      <circle cx="46" cy="60" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="55" cy="70" r="2.4" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function DessertSlice(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" {...props}>
      <path d="M24 50h52l-4 30a6 6 0 0 1-6 5H34a6 6 0 0 1-6-5l-4-30Z" stroke="currentColor" strokeWidth="3.5" />
      <path d="M24 50c0-10 12-16 26-16s26 6 26 16" stroke="currentColor" strokeWidth="3.5" />
      <path d="M30 64c8 4 32 4 40 0" stroke="currentColor" strokeWidth="2.6" opacity="0.8" />
      <circle cx="50" cy="24" r="5" stroke="currentColor" strokeWidth="3" />
      <line x1="50" y1="29" x2="50" y2="36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const map: Record<CategoryIcon, (p: SVGProps<SVGSVGElement>) => JSX.Element> = {
  espresso: EspressoCup,
  iced: IcedGlass,
  tea: TeaCup,
  signature: SignatureGlass,
  dessert: DessertSlice,
};

export function CategoryGlyph({
  icon,
  ...props
}: { icon: CategoryIcon } & SVGProps<SVGSVGElement>) {
  const Comp = map[icon];
  return <Comp {...props} />;
}
