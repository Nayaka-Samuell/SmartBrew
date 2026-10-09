import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      {/* Background Pattern / Noise (Opsional, untuk aksen industrial) */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-500 via-zinc-900 to-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        {/* Teks Hero */}
        <div className="flex-1 space-y-8">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
            BREW <br />
            <span className="text-amber-500">LIKE A PRO.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-lg leading-relaxed">
            Tidak ada lagi tebakan. Gunakan AI untuk menemukan parameter seduhan V60 yang paling sempurna dari setiap biji kopi yang kamu miliki.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link 
              href="/ai-brewer" 
              className="w-full sm:w-auto bg-amber-500 text-black font-black uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-amber-400 hover:scale-105 transition-all duration-300"
            >
              Mulai Meracik
            </Link>
            <Link 
              href="/toko" 
              className="w-full sm:w-auto bg-transparent border-2 border-zinc-700 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-sm hover:border-white transition-colors duration-300"
            >
              Beli Biji Kopi
            </Link>
          </div>
        </div>
        
        {/* Elemen Visual/Gambar */}
        <div className="flex-1 w-full max-w-md md:max-w-full">
          <div className="aspect-square bg-zinc-900 border border-zinc-800 rounded-sm relative shadow-2xl flex items-center justify-center overflow-hidden group">
            {/* Placeholder untuk gambar alat V60 atau kopi. */}
            <div className="absolute inset-0 bg-zinc-800 animate-pulse mix-blend-overlay"></div>
            <span className="relative z-10 text-zinc-600 font-black text-2xl uppercase tracking-widest group-hover:scale-110 transition-transform duration-500">
              V60 Masterpiece
            </span>
            {/* Aksen sudut tajam */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-500 m-4"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-500 m-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
