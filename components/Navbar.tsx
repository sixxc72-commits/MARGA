"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Music2 } from "lucide-react";
import { usePlayer } from "./PlayerProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/members", label: "Members" },
  { href: "/characters", label: "Characters" },
  { href: "/gallery", label: "Gallery" },
  { href: "/ranking", label: "Ranking" },
  { href: "/about", label: "About" },
  { href: "/download", label: "Download APK" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { togglePlay, isPlaying } = usePlayer();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-xl bg-deep/70 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="text-neon-purple group-hover:rotate-12 transition" />
          <span className="font-display text-xl tracking-widest neon-text">MARGA NANIME</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-white/70 hover:text-white transition relative">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            aria-label="Toggle music"
            className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full glass hover:shadow-neon transition"
          >
            <Music2 size={18} className={isPlaying ? "text-neon-purple animate-pulse" : ""} />
          </button>
          <button
            className="lg:hidden w-10 h-10 grid place-items-center rounded-full glass"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden px-5 pb-5"
          >
            <ul className="glass rounded-2xl p-3 flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    onClick={() => setOpen(false)}
                    href={l.href}
                    className="block px-4 py-3 rounded-xl hover:bg-white/5"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
