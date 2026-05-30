"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { Search } from "lucide-react";

type Char = {
  mal_id: number;
  name: string;
  images: { jpg: { image_url: string } };
  favorites: number;
};

export default function CharactersPage() {
  const [items, setItems] = useState<Char[]>([]);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  const load = useCallback(async (p: number, query: string) => {
    setLoading(true);
    try {
      const url = query
        ? `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(query)}&page=${p}&limit=24`
        : `https://api.jikan.moe/v4/top/characters?page=${p}&limit=24`;
      const r = await fetch(url);
      const d = await r.json();
      setItems((prev) => (p === 1 ? d.data : [...prev, ...(d.data || [])]));
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { setPage(1); load(1, q); }, [q, load]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((p) => {
          const np = p + 1;
          load(np, q);
          return np;
        });
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [load, q, loading]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl neon-text">Characters</h1>
      <div className="mt-6 flex items-center gap-2 glass rounded-full px-4 py-2 max-w-md">
        <Search size={16} className="text-white/50"/>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari karakter..." className="bg-transparent outline-none w-full text-sm"/>
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((c) => (
          <div key={c.mal_id} className="glass rounded-2xl overflow-hidden hover:shadow-neon transition">
            <div className="aspect-[3/4] bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={c.images.jpg.image_url} alt={c.name} className="w-full h-full object-cover"/>
            </div>
            <div className="p-3">
              <p className="text-xs font-medium truncate">{c.name}</p>
              <p className="text-[10px] text-white/60">❤ {c.favorites?.toLocaleString("id-ID")}</p>
            </div>
          </div>
        ))}
      </div>
      <div ref={sentinel} className="h-16 grid place-items-center text-white/50 text-sm">
        {loading ? "Memuat..." : "Scroll untuk lebih banyak"}
      </div>
    </section>
  );
}
