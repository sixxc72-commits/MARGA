import HallOfFame from "@/components/HallOfFame";

export const metadata = { title: "Ranking" };

export default function RankingPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl neon-text">Hall of Fame</h1>
      <p className="text-white/60 mt-2">Top member, collector, dan anime lover.</p>
      <HallOfFame />
    </section>
  );
}
