# MARGA NANIME

Komunitas anime Indonesia premium — Next.js 14 + React 18 + TypeScript + Tailwind CSS + Framer Motion.

## Quick start

```bash
npm install     # or: pnpm install / bun install
npm run dev     # http://localhost:3000
npm run build
npm run start
```

## Deploy ke Vercel

1. Push repo ini ke GitHub.
2. Buka https://vercel.com/new dan import repo-nya.
3. Framework preset otomatis terdeteksi (Next.js). Klik **Deploy**.
   Tidak perlu environment variable.

## Konfigurasi cepat

Edit `lib/config.ts`:

```ts
export const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.example.app";
export const SOCIAL = {
  discord: "...",
  whatsapp: "...",
  github: "...",
};
```

Edit `app/sitemap.ts` → ganti `SITE.url` di `lib/config.ts` dengan domain final.

## Data lokal

- `data/members.json` – daftar anggota
- `data/borders.json` – koleksi border profil
- `data/playlist.json` – playlist musik (file MP3 di `public/music/`)

## Music files

Letakkan `song1.mp3`, `song2.mp3`, `song3.mp3` di `public/music/`. Edit `data/playlist.json` untuk menambah/mengganti lagu.

## LocalStorage keys

- `mn-profile` — profil user (nama, bio, avatar, border, social)
- `mn-borders` — daftar border yang dimiliki
- `mn-player` — state music player (index, volume, loop, shuffle)

## Fitur utama

- Hero fullscreen + particle + floating cards
- Animated stats counter
- Download APK section + changelog
- Global music player (mini floating, persist state, loop, shuffle, volume)
- Members showcase + halaman list + search/filter/sort
- Profile editor + Border Collection (Common → Mythic) tersimpan di LocalStorage
- Characters dari Jikan API + infinite scroll + search
- Gallery anime + modal detail
- Hall of Fame / Ranking
- About, Footer, mobile menu animated, sticky blur navbar
- SEO metadata, sitemap.ts, robots.ts
- Tema dark neon, glassmorphism, anime gradient

## Tech

Next.js 14.2 · React 18.3 · TypeScript 5.6 · Tailwind 3.4 · Framer Motion 11 · Lucide React.
