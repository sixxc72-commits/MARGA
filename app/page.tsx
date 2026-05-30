import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import DownloadSection from "@/components/DownloadSection";
import MembersShowcase from "@/components/MembersShowcase";
import CharactersShowcase from "@/components/CharactersShowcase";
import HallOfFame from "@/components/HallOfFame";
import GalleryPreview from "@/components/GalleryPreview";
import AboutSection from "@/components/AboutSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <DownloadSection />
      <MembersShowcase />
      <CharactersShowcase />
      <HallOfFame />
      <GalleryPreview />
      <AboutSection />
    </>
  );
}
