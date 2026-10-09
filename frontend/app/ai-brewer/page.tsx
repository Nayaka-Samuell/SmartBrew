"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Settings, Droplet, Wind, RefreshCw, Thermometer, Info } from "lucide-react";

const COUNTRIES = [
  'Indonesia', 'Sumatra', 'Java', 'Bali', 'Sulawesi', 'Papua', 'Flores',
  'Ethiopia', 'Kenya', 'Rwanda', 'Burundi', 'Tanzania', 'Uganda',
  'Colombia', 'Brazil', 'Costa Rica', 'Guatemala', 'Panama', 'Peru', 'Ecuador', 'Honduras',
  'Vietnam', 'India', 'Yemen', 'Myanmar'
].sort();

export default function AIBrewerPage() {
  const [formData, setFormData] = useState({
    country: "Indonesia",
    process: "Natural / Dry",
    aroma: "8.0",
    aftertaste: "7.5",
    acidity: "7.8",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ suhu_air: string; ukuran_gilingan: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/racik-resep`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: formData.country,
          process: formData.process,
          aroma: parseFloat(formData.aroma),
          aftertaste: parseFloat(formData.aftertaste),
          acidity: parseFloat(formData.acidity),
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data dari server.");
      }

      const data = await response.json();
      if (data.status === "success" && data.data) {
        setResult(data.data);
      } else {
        throw new Error(data.message || "Respon tidak valid.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 overflow-hidden">
      {/* Kolom Kiri: Form Input */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 flex items-center gap-3">
          AI <span className="text-amber-500">BREWER.</span>
          <Coffee className="w-10 h-10 text-amber-500" />
        </h1>
        <p className="text-zinc-400 font-medium mb-8">
          Masukkan profil rasa biji kopi Anda. Engine kami akan meracik suhu air dan ukuran gilingan paling presisi untuk metode V60.
        </p>

        <form onSubmit={handlePredict} className="space-y-6 bg-zinc-900/50 p-6 md:p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm shadow-xl">
          {/* Country */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 uppercase tracking-widest">
              <span className="text-amber-500">🌎</span> Country
            </label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full bg-zinc-950/80 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors appearance-none"
            >
              {COUNTRIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Process */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 uppercase tracking-widest">
              <Settings className="w-4 h-4 text-amber-500" /> Process
            </label>
            <select
              value={formData.process}
              onChange={(e) => setFormData({ ...formData, process: e.target.value })}
              className="w-full bg-zinc-950/80 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors appearance-none"
            >
              <option value="Natural / Dry">Natural / Dry</option>
              <option value="Washed / Wet">Washed / Wet</option>
              <option value="Honey">Honey</option>
              <option value="Anaerobic">Anaerobic</option>
              <option value="Experimental">Experimental</option>
            </select>
          </div>

          {/* Sliders / Inputs for Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <label className="flex items-center justify-center gap-1 text-xs font-bold text-zinc-300 uppercase tracking-widest">
                <Wind className="w-3 h-3 text-amber-500" /> Aroma
              </label>
              <input
                type="number"
                step="0.1"
                min="6.0"
                max="10.0"
                value={formData.aroma}
                onChange={(e) => setFormData({ ...formData, aroma: e.target.value })}
                className="w-full bg-zinc-950/80 border border-zinc-700 rounded-xl px-4 py-3 text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors text-center font-black text-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center justify-center gap-1 text-xs font-bold text-zinc-300 uppercase tracking-widest">
                <RefreshCw className="w-3 h-3 text-amber-500" /> Aftertaste
              </label>
              <input
                type="number"
                step="0.1"
                min="6.0"
                max="10.0"
                value={formData.aftertaste}
                onChange={(e) => setFormData({ ...formData, aftertaste: e.target.value })}
                className="w-full bg-zinc-950/80 border border-zinc-700 rounded-xl px-4 py-3 text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors text-center font-black text-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center justify-center gap-1 text-xs font-bold text-zinc-300 uppercase tracking-widest">
                <Droplet className="w-3 h-3 text-amber-500" /> Acidity
              </label>
              <input
                type="number"
                step="0.1"
                min="6.0"
                max="10.0"
                value={formData.acidity}
                onChange={(e) => setFormData({ ...formData, acidity: e.target.value })}
                className="w-full bg-zinc-950/80 border border-zinc-700 rounded-xl px-4 py-3 text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors text-center font-black text-xl"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Coffee className="w-5 h-5" />
            )}
            {loading ? "Meracik..." : "Racik Resep"}
          </motion.button>
        </form>
      </motion.div>

      {/* Kolom Kanan: Hasil */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="flex items-center justify-center relative"
      >
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full bg-red-950/30 border border-red-900/50 backdrop-blur-md text-red-200 p-8 rounded-2xl text-center shadow-2xl"
            >
              <Info className="w-12 h-12 mx-auto text-red-500 mb-4" />
              <p className="font-bold uppercase tracking-widest text-xl mb-2">Error</p>
              <p className="text-zinc-400">{error}</p>
            </motion.div>
          )}

          {result && !error && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="w-full bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-[100px] pointer-events-none group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-700"></div>
              
              <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                Resep <span className="text-amber-500">Optimal</span>
                <Coffee className="w-8 h-8 text-amber-500" />
              </h2>
              
              <div className="space-y-8 relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50 flex items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <Thermometer className="w-8 h-8 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Suhu Air</p>
                    <p className="text-4xl font-black text-white">{result.suhu_air}</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50 flex items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <Settings className="w-8 h-8 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Grind Size</p>
                    <p className="text-4xl font-black text-amber-500">{result.ukuran_gilingan}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {!result && !error && !loading && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl group border border-zinc-800"
            >
              {/* If image missing, we add a fallback bg gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950"></div>
              <Image 
                src="/v60-coffee.jpg" 
                alt="V60 Coffee Brewing Cinematic" 
                fill
                className="object-cover w-full h-full opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent flex items-end p-10">
                <div className="text-zinc-300 font-bold uppercase tracking-widest text-sm drop-shadow-md">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Menunggu Input <br/> 
                    <span className="text-amber-500 text-2xl mt-2 block font-black">Siap Meracik...</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
