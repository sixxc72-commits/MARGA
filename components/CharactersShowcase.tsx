"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Char = { mal_id: number; name: string; images: { jpg: { image_url: string } }; favorites: number };

export default function CharactersShowcase() {
  const [chars, setChars] = useState<Char[]>([]);
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/characters?limit=8")
      .then((r) => r.json())
      .then((d) => setChars(d.data || []))
      .catch(() => {});
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="uppercase tracking-widest text-xs text-neon-blue">Powered by Jikan API</p>
          <h2 className="font-display text-3xl sm:text-4xl neon-text">Top Karakter Anime</h2>
        </div>
        <Link href="/characters" className="text-sm text-white/70 hover:text-white">Jelajahi →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(chars.length ? chars : Array.from({ length: 8 })).map((c: any, i) => (
          <motion.div
            key={c?.mal_id ?? i}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="glass rounded-2xl overflow-hidden hover:shadow-neon transition"
          >
            <div className="aspect-[3/4] bg-white/5">
              {c?.images?.jpg?.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.images.jpg.image_url} alt={c.name} className="w-full h-full object-cover"/>
              )}
            </div>
            <div className="p-3">
              <p className="text-sm font-medium truncate">{c?.name ?? "Loading..."}</p>
              <p className="text-xs text-white/60">❤ {c?.favorites?.toLocaleString("id-ID") ?? "—"}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
