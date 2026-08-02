import { Hero } from "@/components/hero";
import { FeaturedPhases } from "@/components/featured-phases";
import { AboutSection } from "@/components/about-section";
import { StatsSection } from "@/components/stats-section";
import { WhyChooseUs } from "@/components/why-choose-us";
import { BlogPreview } from "@/components/blog-preview";
import { LeadForm } from "@/components/lead-form";
import { LeadPopup } from "@/components/lead-popup";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPhases />
      <AboutSection />
      <StatsSection />
      <WhyChooseUs />
      <BlogPreview />
      <LeadForm />
      <LeadPopup />
    </>
  );
}
