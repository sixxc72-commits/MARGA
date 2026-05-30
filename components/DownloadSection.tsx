"use client";
import { motion } from "framer-motion";
import { Download, Star, ExternalLink } from "lucide-react";
import { PLAYSTORE_URL } from "@/lib/config";

const changelog = [
  { v: "1.4.0", note: "Music Player & Border Collection baru" },
  { v: "1.3.2", note: "Perbaikan performa & UI mobile" },
  { v: "1.3.0", note: "Hall of Fame & Ranking system" }
];

export default function DownloadSection() {
  return (
    <section id="download" className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="glass rounded-3xl p-8"
        >
          <p className="uppercase tracking-widest text-xs text-neon-blue">Aplikasi Resmi</p>
          <h2 className="font-display text-3xl sm:text-4xl mt-2 neon-text">MARGA NANIME APP</h2>
          <p className="text-white/70 mt-3">Nikmati semua fitur komunitas dalam genggaman. Tersedia gratis di Google Play.</p>

          <div className="flex items-center gap-4 mt-5 text-sm text-white/70">
            <span className="flex items-center gap-1"><Star size={16} className="text-yellow-400"/> 4.8 / 5</span>
            <span>v1.4.0</span>
            <span>Android 7+</span>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <a href={PLAYSTORE_URL} target="_blank" rel="noopener" className="px-6 py-3 rounded-full bg-neon-purple shadow-neon flex items-center gap-2">
              <Download size={18}/> Download Play Store
            </a>
            <a href={PLAYSTORE_URL} target="_blank" rel="noopener" className="px-6 py-3 rounded-full glass flex items-center gap-2">
              <ExternalLink size={18}/> Visit Play Store
            </a>
          </div>

          <div className="mt-8">
            <h3 className="text-sm uppercase tracking-widest text-white/60">Changelog</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {changelog.map((c) => (
                <li key={c.v} className="flex gap-3">
                  <span className="text-neon-purple font-mono">{c.v}</span>
                  <span className="text-white/70">{c.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="relative h-[480px] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-anime-gradient rounded-3xl" />
          <div className="relative w-56 h-[440px] rounded-[2.5rem] border-4 border-white/10 glass shadow-neon overflow-hidden">
            <div className="h-full w-full bg-gradient-to-b from-neon-purple/30 via-neon-blue/20 to-transparent flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 rounded-2xl bg-neon-purple/80 grid place-items-center text-3xl">🌸</div>
              <p className="font-display mt-4 neon-text">MARGA NANIME</p>
              <p className="text-xs text-white/70 mt-2">Komunitas anime di genggaman</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
