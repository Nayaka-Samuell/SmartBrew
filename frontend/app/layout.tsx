import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Brewer & Co.",
  description: "Brew Like A Pro. Rekomendasi Seduhan AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 min-h-screen selection:bg-amber-500 selection:text-black`}>
        {/* Navbar Lengket */}
        <nav className="sticky top-0 z-50 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-black tracking-tighter text-white hover:text-amber-500 transition-colors">
              SMART BREWER<span className="text-amber-500">.</span>
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex gap-8 font-bold text-sm tracking-wide text-zinc-300">
              <Link href="/" className="hover:text-amber-500 transition-colors uppercase">Home</Link>
              <Link href="/ensiklopedia" className="hover:text-amber-500 transition-colors uppercase">Ensiklopedia</Link>
              <Link href="/toko" className="hover:text-amber-500 transition-colors uppercase">Toko</Link>
              <Link href="/beli" className="hover:text-amber-500 transition-colors uppercase">Beli Biji</Link>
              <Link href="/ai-brewer" className="hover:text-amber-500 transition-colors uppercase">AI Brewer</Link>
            </div>
            
            {/* Mobile menu could go here */}
            <div className="md:hidden">
               <button className="text-zinc-300 hover:text-amber-500 font-bold uppercase text-sm">Menu</button>
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
