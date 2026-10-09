// ==============================================================================
// app/ensiklopedia/[id]/page.tsx — Detail Kopi
// Client Component
// ==============================================================================
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DetailKopiPage() {
  const { id } = useParams();
  const [bean, setBean] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/ensiklopedia/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Data kopi tidak ditemukan");
        return res.json();
      })
      .then(data => {
        setBean(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-coffee-600 animate-pulse">Memuat Data Detail...</p>
      </div>
    );
  }

  if (error || !bean) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-black text-red-600">Terjadi Kesalahan</h1>
        <p className="text-coffee-700">{error}</p>
        <Link href="/ensiklopedia" className="px-6 py-3 bg-amber-500 text-black font-bold rounded-sm uppercase tracking-widest hover:bg-amber-400">
          Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] bg-black">
        <Image 
          src={bean.image} 
          alt={bean.name} 
          fill 
          className="object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 to-transparent"></div>
        <div className="absolute bottom-10 left-0 w-full px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/ensiklopedia" className="text-sm font-bold text-coffee-800 uppercase tracking-widest mb-4 inline-block hover:text-amber-600">
              &larr; Kembali ke Ensiklopedia
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-coffee-900 drop-shadow-sm uppercase tracking-tighter">
              {bean.name}
            </h1>
            <p className="text-xl font-bold text-coffee-600 italic mt-2">
              {bean.sciName}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-black text-coffee-900 mb-4 border-b border-coffee-200 pb-2">Deskripsi</h2>
            <p className="text-coffee-700 leading-relaxed text-lg">
              {bean.detail}
            </p>
          </div>
          
          <div className={`p-6 rounded-xl border ${bean.bg}`}>
            <h3 className="text-xl font-bold text-coffee-900 mb-4">Profil Karakteristik</h3>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-coffee-200 pb-2">
                <span className="font-bold text-coffee-700">Aroma</span>
                <span className="text-coffee-600 text-right">{bean.aroma}</span>
              </li>
              <li className="flex justify-between border-b border-coffee-200 pb-2">
                <span className="font-bold text-coffee-700">Rasa (Flavor)</span>
                <span className="text-coffee-600 text-right">{bean.flavor}</span>
              </li>
              <li className="flex justify-between border-b border-coffee-200 pb-2">
                <span className="font-bold text-coffee-700">Body / Kekentalan</span>
                <span className="text-coffee-600 text-right">{bean.body}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee-100">
            <h3 className="text-sm font-black text-coffee-400 uppercase tracking-widest mb-1">Ketinggian Tumbuh</h3>
            <p className="text-2xl font-bold text-coffee-900">{bean.altitude}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee-100">
            <h3 className="text-sm font-black text-coffee-400 uppercase tracking-widest mb-1">Kandungan Kafein</h3>
            <p className="text-2xl font-bold text-coffee-900">{bean.caffeine}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee-100">
            <h3 className="text-sm font-black text-coffee-400 uppercase tracking-widest mb-1">Status Kopi</h3>
            <p className="text-lg font-bold text-coffee-900 leading-snug">{bean.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}