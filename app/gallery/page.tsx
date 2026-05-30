"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Anime = {
  mal_id: number;
  title: string;
  images: { jpg: { large_image_url: string } };
  score: number;
  genres: { name: string }[];
  synopsis: string;
};

export default function GalleryPage() {
  const [items, setItems] = useState<Anime[]>([]);
  const [active, setActive] = useState<Anime | null>(null);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?limit=24")
      .then((r) => r.json())
      .then((d) => setItems(d.data || []))
      .catch(() => {});
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl neon-text">Gallery</h1>
      <p className="text-white/60 mt-2">Koleksi poster anime trending.</p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((a) => (
          <button key={a.mal_id} onClick={() => setActive(a)} className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" src={a.images.jpg.large_image_url} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition"/>
            <span className="absolute inset-x-0 bottom-0 p-2 text-xs bg-gradient-to-t from-black/90 to-transparent text-left">{a.title}</span>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur grid place-items-center p-4" onClick={() => setActive(null)}>
          <div className="glass rounded-3xl max-w-2xl w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActive(null)} className="absolute top-4 right-4 p-2 rounded-full glass"><X size={16}/></button>
            <div className="flex gap-4 flex-col sm:flex-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.images.jpg.large_image_url} alt={active.title} className="w-40 h-56 object-cover rounded-2xl"/>
              <div className="flex-1">
                <h2 className="font-display text-2xl neon-text">{active.title}</h2>
                <p className="text-sm text-white/60 mt-1">⭐ {active.score} · {active.genres?.map((g) => g.name).join(", ")}</p>
                <p className="text-sm text-white/80 mt-3 max-h-48 overflow-auto">{active.synopsis}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
