"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  const items = [
    { t: "Sejarah", d: "MARGA NANIME berdiri tahun 2022 sebagai ruang aman bagi wibu Indonesia." },
    { t: "Visi", d: "Menjadi komunitas anime terdepan di Indonesia yang inklusif dan modern." },
    { t: "Misi", d: "Mengadakan event rutin, ranking sehat, dan ruang diskusi berkualitas." }
  ];
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <p className="uppercase tracking-widest text-xs text-neon-blue">Tentang</p>
        <h2 className="font-display text-3xl sm:text-4xl neon-text">Tentang MARGA NANIME</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-6 hover:shadow-neon transition"
          >
            <h3 className="font-display text-xl neon-text">{it.t}</h3>
            <p className="text-white/70 mt-3 text-sm leading-relaxed">{it.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
