"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Bean {
  id: string;
  name: string;
  origin: string;
  price: number;
  image: string;
  process: string;
  roast: string;
  tasting_notes: string[];
  description: string;
}

export default function ShopPage() {
  const [beans, setBeans] = useState<Bean[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"biji" | "bubuk">("biji");

  useEffect(() => {
    fetch("http://localhost:8000/api/shop/beans")
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setBeans(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal memuat katalog:", err);
        setLoading(false);
      });
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-amber-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-amber-500 tracking-[0.3em] uppercase font-bold text-xs animate-pulse">Menyiapkan Etalase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* ── Navbar Spacer (Jika ada navbar global) ────────────────── */}
      <div className="h-24"></div>

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="relative px-6 py-20 overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/15 via-[#050505] to-[#050505] -z-10"></div>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Toko Kopi Premium
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            Eksklusivitas <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 italic font-serif">Dalam Cangkir</span>
          </h1>
          
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
            Kami menghadirkan koleksi pilihan <strong className="text-white">Biji Kopi Bagus</strong> dari kebun terbaik dunia dan <strong className="text-white">Kopi Bubuk Authentic</strong> yang digiling seketika sebelum dikirim untuk menjaga kesegaran aromanya.
          </p>

          {/* Toggle Kategori */}
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => setActiveTab("biji")}
              className={`px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === "biji" 
                  ? "bg-amber-500 text-black shadow-[0_0_30px_rgba(245,158,11,0.3)]" 
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              Biji Kopi Bagus
            </button>
            <button 
              onClick={() => setActiveTab("bubuk")}
              className={`px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === "bubuk" 
                  ? "bg-amber-500 text-black shadow-[0_0_30px_rgba(245,158,11,0.3)]" 
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              Kopi Bubuk Authentic
            </button>
          </div>
        </div>
      </section>

      {/* ── Grid Etalase ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {beans.map((bean) => (
            <div key={bean.id} className="group relative bg-[#0a0a0a] rounded-[2.5rem] p-4 lg:p-6 border border-white/5 hover:border-amber-500/50 hover:bg-[#0c0c0c] transition-all duration-700 flex flex-col h-full hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.1)]">
              
              {/* Gambar Produk */}
              <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-zinc-900 mb-8">
                <Image 
                  src={bean.image} 
                  alt={bean.name} 
                  fill 
                  className="object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Badge Origin */}
                <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                  <div className="bg-black/50 backdrop-blur-md border border-white/10 text-zinc-300 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    {bean.origin}
                  </div>
                </div>

                {/* Indikator Tipe (Biji/Bubuk) */}
                <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
                  <div className="bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                    {activeTab === "biji" ? "Whole Bean" : "Ground Coffee"}
                  </div>
                </div>
              </div>
              
              {/* Info Produk */}
              <div className="flex flex-col flex-grow px-2 lg:px-4">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-3xl font-black text-white leading-tight tracking-tight">{bean.name}</h3>
                  <div className="text-right">
                    <span className="block text-2xl font-black text-amber-500 whitespace-nowrap">
                      {formatPrice(bean.price)}
                    </span>
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1 block">
                      / 200g
                    </span>
                  </div>
                </div>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                  {bean.description}
                </p>
                
                {/* Specs */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group-hover:bg-amber-500/5 transition-colors duration-500">
                    <span className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">Proses</span>
                    <span className="text-sm text-zinc-200 font-bold">{bean.process}</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group-hover:bg-amber-500/5 transition-colors duration-500">
                    <span className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">Sangrai</span>
                    <span className="text-sm text-zinc-200 font-bold">{bean.roast}</span>
                  </div>
                </div>

                {/* Tasting Notes */}
                <div className="mb-10">
                  <span className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    Karakteristik Rasa
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {bean.tasting_notes.map((note, idx) => (
                      <span key={idx} className="bg-zinc-900 text-zinc-300 border border-zinc-800 text-xs px-4 py-2 rounded-full font-bold">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tombol Beli */}
                <button className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-amber-500 hover:text-black transition-all duration-300 flex items-center justify-center gap-3 group/btn">
                  Beli {activeTab === "biji" ? "Biji Kopi" : "Kopi Bubuk"}
                  <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
              
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
