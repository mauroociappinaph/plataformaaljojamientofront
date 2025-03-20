import { Navbar } from "@/components/navbar/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { PopularDestinations } from "@/components/sections/PopularDestinations";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <PopularDestinations />
      <FeaturesSection />
    </div>
  );
}
