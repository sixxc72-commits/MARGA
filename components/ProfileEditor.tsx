"use client";
import { useEffect, useState } from "react";
import borders from "@/data/borders.json";

type Profile = {
  name: string;
  bio: string;
  avatar: string;
  social: string;
  border: string;
};

const DEFAULT: Profile = {
  name: "Wibu Baru",
  bio: "Pecinta anime sejati.",
  avatar: "",
  social: "",
  border: "b1"
};

const rarityColor: Record<string, string> = {
  Common: "border-zinc-400",
  Rare: "border-sky-400",
  Epic: "border-purple-400",
  Legendary: "border-amber-400",
  Mythic: "border-rose-400"
};

export default function ProfileEditor() {
  const [profile, setProfile] = useState<Profile>(DEFAULT);
  const [owned, setOwned] = useState<string[]>(["b1"]);

  useEffect(() => {
    try {
      const p = localStorage.getItem("mn-profile");
      if (p) setProfile({ ...DEFAULT, ...JSON.parse(p) });
      const o = localStorage.getItem("mn-borders");
      if (o) setOwned(JSON.parse(o));
    } catch {}
  }, []);

  const save = (next: Profile) => {
    setProfile(next);
    try { localStorage.setItem("mn-profile", JSON.stringify(next)); } catch {}
  };

  const acquire = (id: string) => {
    const next = Array.from(new Set([...owned, id]));
    setOwned(next);
    try { localStorage.setItem("mn-borders", JSON.stringify(next)); } catch {}
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => save({ ...profile, avatar: String(reader.result) });
    reader.readAsDataURL(f);
  };

  const activeBorder = borders.find((b) => b.id === profile.border);

  return (
    <div className="mt-10 glass rounded-3xl p-6">
      <h2 className="font-display text-2xl neon-text">Profil Saya</h2>
      <p className="text-white/60 text-sm">Disimpan otomatis di perangkat ini.</p>

      <div className="mt-6 grid md:grid-cols-[180px,1fr] gap-6">
        <div className="text-center">
          <div
            className="w-32 h-32 mx-auto rounded-full border-4 grid place-items-center overflow-hidden"
            style={{ borderColor: activeBorder?.color ?? "#a855f7", boxShadow: `0 0 25px ${activeBorder?.color ?? "#a855f7"}80` }}
          >
            {profile.avatar
              ? <img src={profile.avatar} alt="" className="w-full h-full object-cover"/>
              : <span className="text-3xl">🌸</span>}
          </div>
          <label className="mt-3 inline-block text-xs px-3 py-1.5 rounded-full glass cursor-pointer">
            Upload Foto / GIF
            <input type="file" accept="image/*,image/gif" hidden onChange={onUpload}/>
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <label className="text-sm">
            <span className="text-white/60">Nama</span>
            <input value={profile.name} onChange={(e) => save({ ...profile, name: e.target.value })}
              className="mt-1 w-full glass rounded-xl px-3 py-2 bg-transparent outline-none"/>
          </label>
          <label className="text-sm">
            <span className="text-white/60">Sosial Media</span>
            <input value={profile.social} onChange={(e) => save({ ...profile, social: e.target.value })}
              placeholder="@username"
              className="mt-1 w-full glass rounded-xl px-3 py-2 bg-transparent outline-none"/>
          </label>
          <label className="text-sm sm:col-span-2">
            <span className="text-white/60">Bio</span>
            <textarea value={profile.bio} onChange={(e) => save({ ...profile, bio: e.target.value })}
              rows={3}
              className="mt-1 w-full glass rounded-xl px-3 py-2 bg-transparent outline-none resize-none"/>
          </label>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-display text-lg">Border Collection</h3>
        <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-3">
          {borders.map((b) => {
            const isOwned = owned.includes(b.id);
            const isActive = profile.border === b.id;
            return (
              <button
                key={b.id}
                onClick={() => {
                  if (!isOwned) acquire(b.id);
                  save({ ...profile, border: b.id });
                }}
                className={`glass rounded-2xl p-3 text-center border-2 ${isActive ? "shadow-neon" : "border-transparent"} ${rarityColor[b.rarity]}`}
              >
                <div
                  className="w-12 h-12 mx-auto rounded-full border-4"
                  style={{ borderColor: b.color, boxShadow: `0 0 12px ${b.color}80` }}
                />
                <p className="mt-2 text-xs">{b.name}</p>
                <p className="text-[10px] text-white/50">{b.rarity}</p>
                <p className="text-[10px] mt-1 text-neon-purple">
                  {isActive ? "Equipped" : isOwned ? "Equip" : "Tap to unlock"}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
