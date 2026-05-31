import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { NetworkCanvas } from "./NetworkCanvas";

const credibilityItems = [
  "BMS College of Engineering",
  "Dhawan College",
  "Mahajana PGC Mysore",
];

export function Hero() {
  return (
    <section className="relative bg-slate-950 pt-24 pb-20 overflow-hidden">
      <NetworkCanvas />
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* Amber glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-sm font-medium">
              Available for workshops, Training Programs & Hackathons           
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Industry-Aligned AI/ML Training Programs for{" "}
            <span className="text-amber-400">Engineering Colleges</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
            Hands-on workshops and FDPs designed for BCA, MCA, and BE
            students — built by an industry practitioner, not a textbook author.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button variant="amber" size="xl" asChild>
              <Link href="/contact">
                Request a Program Proposal
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Credibility bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-slate-500 text-sm shrink-0">
              Past engagements:
            </span>
            <div className="flex flex-wrap gap-3">
              {credibilityItems.map((college) => (
                <div
                  key={college}
                  className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/50 rounded-full px-3 py-1"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="text-slate-300 text-xs font-medium">
                    {college}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
