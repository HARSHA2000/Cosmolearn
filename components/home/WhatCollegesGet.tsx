import React from "react";
import { CheckCircle, FileText, Award, Monitor, Building } from "lucide-react";

const deliverables = [
  {
    icon: Monitor,
    title: "On-Campus or Hybrid Delivery",
    body: "Programs run at your campus. No travel for students. For larger batches or multi-city colleges, hybrid delivery is available with identical quality.",
  },
  {
    icon: Award,
    title: "AICTE / VTU Aligned",
    body: "Workshops are structured to qualify for AICTE activity points. FDPs are designed for AICTE FDP credit eligibility. Full documentation provided.",
  },
  {
    icon: FileText,
    title: "Complete Post-Program Documentation",
    body: "Attendance certificates for all participants, project reports for student records, and a feedback summary report for institutional filings.",
  },
  {
    icon: Building,
    title: "Faculty FDP Format Available",
    body: "Dedicated FDP track for teaching staff. Not a student-facing program repurposed — purpose-built content for faculty workflows and teaching contexts.",
  },
  {
    icon: CheckCircle,
    title: "Custom Program Design",
    body: "Every engagement starts with a proposal call. Programs are calibrated to your batch size, course stream, current skill level, and available dates.",
  },
];

export function WhatCollegesGet() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
              What the College Gets
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Every engagement is a complete package — not just a trainer who
              shows up on the day. Institutions get documentation, certificates,
              and a structured post-program record.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
              <div className="text-amber-400 text-sm font-semibold mb-3">
                AICTE / VTU Alignment
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Student workshops can qualify for AICTE activity points.
                Faculty programs are structured to meet AICTE FDP credit
                requirements. All supporting documentation — schedule, learning
                objectives, attendance, and feedback — is provided.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            {deliverables.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
