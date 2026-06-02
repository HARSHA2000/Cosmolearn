import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { WhyIndustry } from "@/components/home/WhyIndustry";
import { ProgramsGrid } from "@/components/home/ProgramsGrid";
import { SocialProof } from "@/components/home/SocialProof";
import { WhatCollegesGet } from "@/components/home/WhatCollegesGet";
import { CtaSection } from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title:
    "CosmoLearn",
  description:
    "Industry-aligned technical training for educational institutions across India. AI/ML, Cybersecurity, Full Stack, DevOps, VLSI, Embedded Systems & Robotics. Hands-on workshops, bootcamps, and FDPs. AICTE-eligible. Based in Bengaluru.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyIndustry />
      <ProgramsGrid />
      <SocialProof />
      <WhatCollegesGet />
      <CtaSection />
    </>
  );
}
