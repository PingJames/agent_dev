import HeroSection from "@/components/home/HeroSection";
import FeatureCards from "@/components/home/FeatureCards";
import QuickLearnSection from "@/components/home/QuickLearnSection";
import RoadmapPreview from "@/components/home/RoadmapPreview";
import LatestPosts from "@/components/home/LatestPosts";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <QuickLearnSection />
      <RoadmapPreview />
      <LatestPosts />
      <CTASection />
    </>
  );
}
