"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EnsiklopediaPage() {
  const [beans, setBeans] = useState<any[]>([]);
  const [processes, setProcesses] = useState<any[]>([]);
  const [roasts, setRoasts] = useState<any[]>([]);
  const [brews, setBrews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8000/api/ensiklopedia").then(res => res.json()),
      fetch("http://localhost:8000/api/ensiklopedia/proses").then(res => res.json()),
      fetch("http://localhost:8000/api/ensiklopedia/sangrai").then(res => res.json()),
      fetch("http://localhost:8000/api/ensiklopedia/seduh").then(res => res.json())
    ]).then(([beansData, processesData, roastsData, brewsData]) => {
      if (beansData.status === "success") setBeans(beansData.data);
      if (processesData.status === "success") setProcesses(processesData.data);
      if (roastsData.status === "success") setRoasts(roastsData.data);
      if (brewsData.status === "success") setBrews(brewsData.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-amber-900 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="text-amber-500/80 tracking-widest uppercase font-medium text-sm animate-pulse">Menyeduh Pengetahuan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-amber-500/30 selection:text-amber-200">
      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-[#0a0a0a] to-[#0a0a0a] -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-sm mb-6 border border-amber-500/30 px-6 py-2 rounded-full bg-amber-500/10 backdrop-blur-sm">Masterclass Kopi</span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
              Ensiklopedia <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">Mahakarya</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              Sebuah perjalanan sensorik dari biji hingga ke cangkir. Temukan rahasia di balik kompleksitas rasa dan seni menyeduh kopi yang sempurna.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-32 space-y-32">
        {/* ── Biji Kopi (Bento Grid) ──────────────────────────────────────── */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                Genetika <span className="text-amber-500">Rasa</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl text-lg">Pondasi utama dari sebuah cangkir kopi. Dua spesies dominan yang membentuk kebudayaan kopi dunia.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beans.map((bean) => (
              <Link href={`/ensiklopedia/${bean.id}`} key={bean.id}>
                <div className="group relative h-[500px] rounded-[2rem] overflow-hidden bg-zinc-900 cursor-pointer">
                  <div className="absolute inset-0">
                    <Image 
                      src={bean.image} 
                      alt={bean.name} 
                      fill 
                      className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
                  </div>
                  
                  <div className="absolute inset-0 p-10 flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-4">
                    <div className="mb-4">
                      <span className="inline-block text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest bg-white/10 text-amber-300 backdrop-blur-md border border-white/10">
                        {bean.note}
                      </span>
                    </div>
                    <h3 className="text-5xl font-black text-white mb-4 tracking-tight drop-shadow-xl">
                      {bean.name}
                    </h3>
                    <p className="text-zinc-300 font-medium mb-8 leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Eksplorasi mendalam tentang profil rasa, ketinggian tanam, dan karakteristik unik dari {bean.name}.
                    </p>
                    <div className="flex items-center gap-3 text-amber-500 font-bold uppercase tracking-widest text-sm">
                      Mulai Penjelajahan 
                      <span className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-[#0a0a0a] transition-colors">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Proses Pasca Panen ──────────────────────────────────────── */}
        <section>
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Seni <span className="text-amber-500">Pasca-Panen</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl text-lg">Metode yang mengukir karakter rasa. Sentuhan manusia dan alam yang mengubah buah ceri menjadi biji kopi kaya rasa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processes.map((p, i) => (
              <div
                key={p.id}
                className="group relative bg-zinc-900/50 rounded-3xl overflow-hidden border border-white/5 hover:bg-zinc-800/80 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill 
                    className="object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-xl border border-white/10">{p.icon}</span>
                    <span className="text-white/30 font-black text-4xl">0{i+1}</span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{p.name}</h3>
                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed flex-grow">
                    {p.desc}
                  </p>
                  
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div>
                      <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Profil Rasa</span>
                      <span className="text-sm text-zinc-200">{p.flavor}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tingkat Sangrai ──────────────────────────────────────── */}
        <section>
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Transformasi <span className="text-amber-500">Api</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl text-lg">Di dalam mesin sangrai, panas membuka potensi tersembunyi dari setiap biji kopi hijau.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roasts.map((roast) => (
              <div key={roast.id} className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 group hover:border-amber-500/30 transition-all duration-500">
                <div className={`h-3 w-full ${roast.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">{roast.name}</h3>
                    <div className={`w-8 h-8 rounded-full ${roast.color} shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center`}>
                       <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 h-20">
                    {roast.desc}
                  </p>
                  <div className="bg-black/30 rounded-2xl p-5 border border-white/5">
                    <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Dominasi Rasa</span>
                    <span className="text-sm text-zinc-200 block leading-relaxed">{roast.flavor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Metode Seduh ──────────────────────────────────────── */}
        <section>
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Ritual <span className="text-amber-500">Ekstraksi</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl text-lg">Setiap alat menceritakan kisah yang berbeda dari biji kopi yang sama.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brews.map((brew) => (
              <div key={brew.id} className="group p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-[#0a0a0a] border border-white/5 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-500">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-amber-500/10 transition-all duration-500">
                  {brew.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">{brew.name}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {brew.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
