// ==============================================================================
// app/toko/page.tsx
// ==============================================================================
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function TokoPage() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/toko")
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setShops(data.data);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-coffee-900 mb-4 uppercase tracking-tighter">
          Toko Kopi <span className="text-amber-500">Ikonik</span>
        </h1>
        <p className="text-coffee-600 font-medium max-w-2xl mx-auto">
          Jelajahi kedai-kedai kopi paling legendaris di Indonesia yang telah mengubah budaya minum kopi kita.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-coffee-400 font-bold animate-pulse">
          Memuat daftar toko...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {shops.map((shop) => (
            <div key={shop.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-coffee-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="relative w-full h-64 overflow-hidden">
                <Image 
                  src={shop.image} 
                  alt={shop.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-sm text-amber-600 shadow-sm">
                  ⭐ {shop.rating}
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs font-black text-coffee-400 uppercase tracking-widest mb-2">
                  📍 {shop.location}
                </div>
                <h2 className="text-2xl font-black text-coffee-900 mb-3">{shop.name}</h2>
                <p className="text-coffee-600 mb-6 leading-relaxed">
                  {shop.desc}
                </p>
                <div className="pt-4 border-t border-coffee-100">
                  <span className="text-xs font-bold text-coffee-400 uppercase tracking-widest block mb-1">
                    Specialty
                  </span>
                  <span className="font-bold text-coffee-800">
                    {shop.specialty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}