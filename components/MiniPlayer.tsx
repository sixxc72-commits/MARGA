"use client";
import { usePlayer } from "./PlayerProvider";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

const fmt = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

export default function MiniPlayer() {
  const p = usePlayer();
  if (!p.current) return null;
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(640px,calc(100%-1.5rem))] glass rounded-2xl px-3 py-2 shadow-neon"
    >
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.current.cover} alt="" className="w-12 h-12 rounded-xl object-cover" />
        <div className="flex-1 min-w-0">
          <p className="text-sm truncate">{p.current.title}</p>
          <p className="text-xs text-white/50 truncate">{p.current.artist}</p>
          <input
            type="range"
            min={0}
            max={p.duration || 0}
            value={p.progress}
            onChange={(e) => p.seek(Number(e.target.value))}
            className="w-full accent-neon-purple h-1 mt-1"
          />
        </div>
        <div className="flex items-center gap-1">
          <button onClick={p.toggleShuffle} className={`p-2 rounded-lg hover:bg-white/10 ${p.shuffle ? "text-neon-purple" : ""}`}><Shuffle size={16}/></button>
          <button onClick={p.prev} className="p-2 rounded-lg hover:bg-white/10"><SkipBack size={18}/></button>
          <button onClick={p.togglePlay} className="p-3 rounded-full bg-neon-purple text-white shadow-neon">
            {p.isPlaying ? <Pause size={18}/> : <Play size={18}/>}
          </button>
          <button onClick={p.next} className="p-2 rounded-lg hover:bg-white/10"><SkipForward size={18}/></button>
          <button onClick={p.toggleLoop} className={`p-2 rounded-lg hover:bg-white/10 ${p.loop ? "text-neon-blue" : ""}`}><Repeat size={16}/></button>
        </div>
        <div className="hidden sm:flex items-center gap-1 ml-2">
          <Volume2 size={14} className="text-white/60"/>
          <input type="range" min={0} max={1} step={0.05} value={p.volume} onChange={(e) => p.setVolume(Number(e.target.value))} className="w-20 accent-neon-blue"/>
        </div>
      </div>
      <div className="hidden sm:flex justify-between text-[10px] text-white/40 mt-1 px-1">
        <span>{fmt(p.progress)}</span><span>{fmt(p.duration)}</span>
      </div>
    </motion.div>
  );
}
