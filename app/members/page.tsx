"use client";
import { useMemo, useState } from "react";
import members from "@/data/members.json";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import ProfileEditor from "@/components/ProfileEditor";

const roles = ["All", "Founder", "Admin", "Moderator", "Elite Member", "Member"];

export default function MembersPage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("All");
  const [sort, setSort] = useState<"name" | "date">("name");

  const list = useMemo(() => {
    return [...members]
      .filter((m) => (role === "All" ? true : m.role === role))
      .filter((m) => m.name.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) =>
        sort === "name" ? a.name.localeCompare(b.name) : a.joinDate.localeCompare(b.joinDate)
      );
  }, [q, role, sort]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl neon-text">Members</h1>
      <p className="text-white/60 mt-2">Daftar anggota komunitas MARGA NANIME.</p>

      <ProfileEditor />

      <div className="mt-8 flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[220px] flex items-center gap-2 glass rounded-full px-4 py-2">
          <Search size={16} className="text-white/50"/>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama..." className="bg-transparent outline-none w-full text-sm"/>
        </div>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="glass rounded-full px-4 py-2 text-sm bg-deep">
          {roles.map((r) => <option key={r} className="bg-deep">{r}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="glass rounded-full px-4 py-2 text-sm bg-deep">
          <option value="name" className="bg-deep">Sort: Name</option>
          <option value="date" className="bg-deep">Sort: Join Date</option>
        </select>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="glass rounded-2xl p-5 text-center hover:shadow-neon transition"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.avatar} alt={m.name} className="w-20 h-20 mx-auto rounded-full border-2 border-neon-purple"/>
            <p className="mt-3 font-medium">{m.name} <span>{m.badge}</span></p>
            <p className="text-xs text-white/60">{m.role}</p>
            <p className="text-[10px] text-white/40 mt-1">Bergabung {m.joinDate}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
