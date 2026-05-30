import Link from "next/link";
import { Github, MessageCircle, Phone, Download } from "lucide-react";
import { SITE, SOCIAL } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl neon-text">{SITE.name}</h3>
          <p className="text-white/60 mt-3 text-sm">{SITE.description}</p>
        </div>
        <div className="text-sm">
          <h4 className="text-white/80 mb-3">Komunitas</h4>
          <ul className="space-y-2 text-white/60">
            <li><Link href="/members" className="hover:text-white">Members</Link></li>
            <li><Link href="/ranking" className="hover:text-white">Hall of Fame</Link></li>
            <li><Link href="/about" className="hover:text-white">Tentang</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="text-white/80 mb-3">Connect</h4>
          <div className="flex gap-3">
            <a href={SOCIAL.discord} target="_blank" rel="noopener" className="w-10 h-10 grid place-items-center rounded-full glass hover:shadow-neon"><MessageCircle size={18}/></a>
            <a href={SOCIAL.whatsapp} target="_blank" rel="noopener" className="w-10 h-10 grid place-items-center rounded-full glass hover:shadow-neon"><Phone size={18}/></a>
            <a href={SOCIAL.github} target="_blank" rel="noopener" className="w-10 h-10 grid place-items-center rounded-full glass hover:shadow-neon"><Github size={18}/></a>
            <a href={SOCIAL.playstore} target="_blank" rel="noopener" className="w-10 h-10 grid place-items-center rounded-full glass hover:shadow-neon"><Download size={18}/></a>
          </div>
        </div>
      </div>
      <div className="text-center text-white/40 text-xs py-5 border-t border-white/5">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
