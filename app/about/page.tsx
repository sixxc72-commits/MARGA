import AboutSection from "@/components/AboutSection";
export const metadata = { title: "About" };
export default function AboutPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl neon-text">About</h1>
      <AboutSection />
    </section>
  );
}
