import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { NetworkCanvas } from "./NetworkCanvas";
import { getAllCollegeEngagements } from "@/lib/content";

const domains = [
  { label: "AI / ML", cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { label: "Cybersecurity", cls: "bg-red-500/10 text-red-400 border-red-500/20" },
  { label: "Full Stack — MERN · MEAN", cls: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { label: "Python · Django · FastAPI", cls: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
  { label: "DevOps & Cloud", cls: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  { label: "VLSI Design", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { label: "Embedded Systems", cls: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
  { label: "Robotics", cls: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
];

export async function Hero() {
  const colleges = await getAllCollegeEngagements().catch(() => []);
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
            Industry-Aligned Technical Training for{" "}
            <span className="text-amber-400">Educational Institutions</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
            Hands-on workshops, bootcamps, and FDPs for BCA, MCA, and BE
            students — across AI/ML, Cybersecurity, Full Stack, DevOps, VLSI & more.
            Built by practitioners, not textbook authors.
          </p>

          {/* Domain pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {domains.map((d) => (
              <span
                key={d.label}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${d.cls}`}
              >
                {d.label}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button variant="amber" size="xl" asChild>
              <Link href="/contact">
                Request a Program Proposal
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Credibility bar */}
          {colleges.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-slate-500 text-sm shrink-0">
                Past engagements:
              </span>
              <div className="flex flex-wrap gap-3">
                {colleges.slice(0, 4).map((college) => (
                  <div
                    key={college.id}
                    className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/50 rounded-full px-3 py-1"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span className="text-slate-300 text-xs font-medium">
                      {college.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
