"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Download, MessageCircle, Phone } from "lucide-react";
import { SOCIAL } from "@/lib/config";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute block w-1 h-1 rounded-full bg-neon-purple/60"
            style={{
              left: `${(i * 37) % 100}%`,
              animation: `particle-rise ${8 + (i % 6)}s linear ${i * 0.4}s infinite`,
              filter: "blur(0.5px)"
            }}
          />
        ))}
      </div>

      {/* floating cards */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="hidden md:block absolute left-10 top-32 w-40 h-56 rounded-2xl glass shadow-neon"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="hidden md:block absolute right-10 bottom-24 w-40 h-56 rounded-2xl glass shadow-neon"
      />

      <div className="text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="uppercase tracking-[0.4em] text-xs text-white/60"
        >
          Komunitas Anime Indonesia
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl mt-4 neon-text leading-tight"
        >
          MARGA NANIME
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
          className="mt-5 text-white/70 text-base sm:text-lg"
        >
          Tempat berkumpulnya wibu modern — diskusi, ranking, karakter, dan event eksklusif tiap minggu.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a href={SOCIAL.discord} target="_blank" rel="noopener" className="px-6 py-3 rounded-full bg-neon-purple/90 hover:bg-neon-purple shadow-neon flex items-center gap-2">
            <MessageCircle size={18}/> Join Discord
          </a>
          <a href={SOCIAL.whatsapp} target="_blank" rel="noopener" className="px-6 py-3 rounded-full glass hover:shadow-neon flex items-center gap-2">
            <Phone size={18}/> Grup WhatsApp
          </a>
          <Link href="/download" className="px-6 py-3 rounded-full border border-neon-blue/60 text-neon-blue hover:bg-neon-blue/10 flex items-center gap-2">
            <Download size={18}/> Download APK
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest"
      >
        SCROLL ↓
      </motion.div>
    </section>
  );
}
