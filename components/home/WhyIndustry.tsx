import React from "react";
import { BookOpen, AlertTriangle, Zap } from "lucide-react";

const columns = [
  {
    icon: BookOpen,
    label: "The Problem",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
    title: "Outdated Curriculum",
    body:
      "Whether it's AI/ML, Cybersecurity, Full Stack, or DevOps — engineering syllabi are stuck 3–5 years behind industry. The tools, frameworks, and architectures companies actually hire for today barely appear in coursework.",
    detail: "Last major update to many syllabi: 2019–2021",
  },
  {
    icon: AlertTriangle,
    label: "The Gap",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    title: "Students Enter Jobs Unprepared",
    body:
      "Hiring managers expect fluency in real tools — LangChain, Docker, penetration testing frameworks, MERN stacks, FPGA workflows — depending on the role. Students trained only on theory have no practical vocabulary for any of it.",
    detail: "Avg. ramp-up time for fresh hires: 3–6 months",
  },
  {
    icon: Zap,
    label: "The Solution",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    title: "Industry-Aligned Hands-On Training",
    body:
      "Programs designed around what practitioners actually use in production — real tools, real datasets, real deployments. Students leave with portfolio-worthy projects, not just attendance certificates.",
    detail: "Outcome: A project they can demo in interviews",
  },
];

export function WhyIndustry() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Why Industry-Led Training?
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            The gap between what colleges teach and what companies hire for has
            never been wider.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => (
            <div
              key={col.label}
              className={`rounded-2xl border ${col.border} ${col.bg} p-8 flex flex-col`}
            >
              <div
                className={`w-11 h-11 rounded-xl bg-white border ${col.border} flex items-center justify-center mb-5 shadow-sm`}
              >
                <col.icon className={`h-5 w-5 ${col.color}`} />
              </div>
              <div className={`text-xs font-bold ${col.color} mb-2 uppercase tracking-wider`}>
                {col.label}
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
                {col.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-1">
                {col.body}
              </p>
              <div className={`mt-6 pt-4 border-t ${col.border} text-xs ${col.color} font-medium`}>
                {col.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
