import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { WhyIndustry } from "@/components/home/WhyIndustry";
import { ProgramsGrid } from "@/components/home/ProgramsGrid";
import { SocialProof } from "@/components/home/SocialProof";
import { WhatCollegesGet } from "@/components/home/WhatCollegesGet";
import { CtaSection } from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title:
    "Harshith | AI/ML Training Programs for Engineering Colleges — Bengaluru",
  description:
    "Industry-aligned AI/ML workshops, FDPs, and bootcamps for BCA, MCA, and BE students. Computer Vision, Generative AI, MLOps. Based in Bengaluru. AICTE-eligible programs.",
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
