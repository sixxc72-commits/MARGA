"use client";
import { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";
import playlistData from "@/data/playlist.json";

export type Track = { id: number; title: string; artist: string; src: string; cover: string };

type Ctx = {
  playlist: Track[];
  current: Track;
  index: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  loop: boolean;
  shuffle: boolean;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (s: number) => void;
  setVolume: (v: number) => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  selectIndex: (i: number) => void;
};

const PlayerCtx = createContext<Ctx | null>(null);
export const usePlayer = () => {
  const c = useContext(PlayerCtx);
  if (!c) throw new Error("usePlayer must be used within PlayerProvider");
  return c;
};

export function PlayerProvider({ children }: { children: ReactNode }) {
  const playlist = playlistData as Track[];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVol] = useState(0.7);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  // hydrate persisted state
  useEffect(() => {
    try {
      const raw = localStorage.getItem("mn-player");
      if (raw) {
        const s = JSON.parse(raw);
        if (typeof s.index === "number" && s.index < playlist.length) setIndex(s.index);
        if (typeof s.volume === "number") setVol(s.volume);
        if (typeof s.loop === "boolean") setLoop(s.loop);
        if (typeof s.shuffle === "boolean") setShuffle(s.shuffle);
      }
    } catch {}
  }, [playlist.length]);

  useEffect(() => {
    try {
      localStorage.setItem("mn-player", JSON.stringify({ index, volume, loop, shuffle }));
    } catch {}
  }, [index, volume, loop, shuffle]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const current = playlist[index];

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else { el.pause(); setPlaying(false); }
  };

  const next = () => {
    if (shuffle) {
      let n = index;
      while (n === index && playlist.length > 1) n = Math.floor(Math.random() * playlist.length);
      setIndex(n);
    } else setIndex((i) => (i + 1) % playlist.length);
  };
  const prev = () => setIndex((i) => (i - 1 + playlist.length) % playlist.length);
  const seek = (s: number) => { if (audioRef.current) audioRef.current.currentTime = s; };
  const selectIndex = (i: number) => setIndex(i);

  const value = useMemo<Ctx>(() => ({
    playlist, current, index, isPlaying, progress, duration, volume, loop, shuffle,
    togglePlay, next, prev, seek, setVolume: setVol,
    toggleLoop: () => setLoop((v) => !v),
    toggleShuffle: () => setShuffle((v) => !v),
    selectIndex
  }), [playlist, current, index, isPlaying, progress, duration, volume, loop, shuffle]);

  return (
    <PlayerCtx.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={current?.src}
        loop={loop}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onEnded={() => { if (!loop) next(); }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        preload="metadata"
      />
    </PlayerCtx.Provider>
  );
}
