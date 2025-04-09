import { HeroSection } from "@/components/sections/HeroSection";
import { PopularDestinations } from "@/components/sections/PopularDestinations";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <PopularDestinations />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </div>
  );
}
