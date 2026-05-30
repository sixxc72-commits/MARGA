"use client";
import { motion } from "framer-motion";
import members from "@/data/members.json";
import Link from "next/link";

export default function MembersShowcase() {
  const featured = members.slice(0, 6);
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="uppercase tracking-widest text-xs text-neon-blue">Komunitas</p>
          <h2 className="font-display text-3xl sm:text-4xl neon-text">Members Showcase</h2>
        </div>
        <Link href="/members" className="text-sm text-white/70 hover:text-white">Lihat semua →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {featured.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-4 text-center hover:shadow-neon transition"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.avatar} alt={m.name} className="w-20 h-20 mx-auto rounded-full border-2 border-neon-purple"/>
            <p className="mt-3 font-medium">{m.name}</p>
            <p className="text-xs text-white/60">{m.role} {m.badge}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
