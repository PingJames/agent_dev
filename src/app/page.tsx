import HeroSection from "@/components/home/HeroSection";
import FeatureCards from "@/components/home/FeatureCards";
import RoadmapPreview from "@/components/home/RoadmapPreview";
import LatestPosts from "@/components/home/LatestPosts";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <RoadmapPreview />
      <LatestPosts />
      <CTASection />
    </>
  );
}
