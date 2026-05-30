"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString("id-ID"));

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 1.8, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, to, mv]);

  return (
    <div className="text-center">
      <motion.span ref={ref} className="font-display text-4xl sm:text-5xl neon-text">
        <motion.span>{rounded}</motion.span>
      </motion.span>
      <p className="mt-2 text-white/60 text-sm uppercase tracking-widest">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 glass rounded-3xl p-8">
        <Counter to={12480} label="Total Anggota" />
        <Counter to={3120} label="Karakter Favorit" />
        <Counter to={875} label="Anime Favorit" />
        <Counter to={342} label="Online Members" />
      </div>
    </section>
  );
}
