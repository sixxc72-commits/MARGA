export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-7xl font-display neon-text">404</h1>
        <p className="mt-3 text-white/70">Halaman tidak ditemukan.</p>
        <a href="/" className="inline-block mt-6 px-6 py-3 rounded-full glass hover:shadow-neon transition">Kembali ke Home</a>
      </div>
    </div>
  );
}
