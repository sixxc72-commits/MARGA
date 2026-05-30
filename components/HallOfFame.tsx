"use client";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import members from "@/data/members.json";

const top = members.slice(0, 5).map((m, i) => ({ ...m, score: 9800 - i * 720 }));

export default function HallOfFame() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <p className="uppercase tracking-widest text-xs text-neon-blue">Ranking</p>
        <h2 className="font-display text-3xl sm:text-4xl neon-text">Hall of Fame</h2>
      </div>
      <div className="space-y-3">
        {top.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-4 flex items-center gap-4 hover:shadow-neon transition"
          >
            <div className={`w-10 h-10 grid place-items-center rounded-full font-display ${i === 0 ? "bg-yellow-400/30 text-yellow-300" : i === 1 ? "bg-zinc-300/20 text-zinc-200" : i === 2 ? "bg-orange-400/20 text-orange-300" : "bg-white/5"}`}>
              {i < 3 ? <Trophy size={18}/> : i + 1}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full border border-neon-purple/60"/>
            <div className="flex-1">
              <p className="font-medium">{m.name} <span className="text-white/40 text-xs">· {m.role}</span></p>
              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-neon-purple to-neon-blue" style={{ width: `${(m.score / 9800) * 100}%` }}/>
              </div>
            </div>
            <p className="font-display neon-text">{m.score.toLocaleString("id-ID")}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
