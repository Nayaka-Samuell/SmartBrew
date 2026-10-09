// ==============================================================================
// components/Navbar.tsx — Navigasi Global Smart Brewer & Co.
// Server Component (tidak membutuhkan "use client")
// ==============================================================================

import Link from "next/link";

// Definisi item navigasi
const NAV_LINKS = [
  { href: "/",             label: "🏠 Home"          },
  { href: "/ensiklopedia", label: "📖 Ensiklopedia"   },
  { href: "/toko",         label: "🛒 Toko"           },
  { href: "/beli",         label: "🛍️ Penjualan"     },
  { href: "/ai-brewer",   label: "🤖 AI Brewer"      },
];

export default function Navbar() {
  return (
    <header className="bg-coffee-900 text-cream shadow-lg sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ── Brand / Logo ─────────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight
                     hover:text-coffee-300 transition-colors duration-200"
        >
          <span className="text-2xl">☕</span>
          <span>Smart Brewer <span className="text-coffee-400">&amp; Co.</span></span>
        </Link>

        {/* ── Navigation Links ─────────────────────────────────────────── */}
        <ul className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-coffee-200
                           hover:bg-coffee-800 hover:text-cream transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

