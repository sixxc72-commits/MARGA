"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Anime = { mal_id: number; title: string; images: { jpg: { large_image_url: string } } };

export default function GalleryPreview() {
  const [list, setList] = useState<Anime[]>([]);
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?limit=8")
      .then((r) => r.json())
      .then((d) => setList(d.data || []))
      .catch(() => {});
  }, []);
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="uppercase tracking-widest text-xs text-neon-blue">Galeri</p>
          <h2 className="font-display text-3xl sm:text-4xl neon-text">Trending Anime</h2>
        </div>
        <Link href="/gallery" className="text-sm text-white/70 hover:text-white">Lihat galeri →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(list.length ? list : Array.from({ length: 8 })).map((a: any, i) => (
          <motion.div
            key={a?.mal_id ?? i}
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass"
          >
            {a?.images?.jpg?.large_image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.images.jpg.large_image_url} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3">
              <p className="text-sm font-medium">{a?.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
