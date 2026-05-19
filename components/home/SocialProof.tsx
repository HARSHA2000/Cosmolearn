import React from "react";
import { Quote } from "lucide-react";

const stats = [
  { value: "500+", label: "Students trained" },
  { value: "10+", label: "College engagements" },
  { value: "3", label: "States reached" },
  { value: "4", label: "Flagship programs" },
];

const colleges = [
  "BMS College of Engineering",
  "Dhawan College",
  "Mahajana PGC Mysore",
];

// TODO: Replace with real testimonials from TPOs/HODs
const testimonials = [
  {
    quote:
      "The workshop was exactly what our final year students needed — hands-on, industry-relevant, and delivered by someone who clearly uses these tools daily. The students were building working GenAI apps by day 2.",
    name: "Dr. [Name]",
    designation: "Head of Department, CS",
    college: "Engineering College, Bengaluru",
    initials: "D",
  },
  {
    quote:
      "We've had external trainers before, but none with this level of depth on actual tools. The FDP didn't just introduce AI concepts — it gave our faculty a workflow they've already started using in their daily prep.",
    name: "[Name]",
    designation: "Training & Placement Officer",
    college: "Engineering College, Karnataka",
    initials: "T",
  },
  {
    quote:
      "Our placement numbers improved significantly this cycle. Several students who attended the Computer Vision bootcamp got shortlisted specifically because they could demonstrate an object detection project in their interviews.",
    name: "Prof. [Name]",
    designation: "Principal",
    college: "College, Mysore",
    initials: "P",
  },
];

export function SocialProof() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100"
            >
              <div className="font-display text-4xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* College names */}
        <div className="text-center mb-14">
          <p className="text-slate-400 text-sm uppercase tracking-widest font-medium mb-6">
            Past engagements include
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {colleges.map((college) => (
              <div
                key={college}
                className="px-5 py-2.5 border border-slate-200 rounded-full text-slate-600 text-sm font-medium bg-white"
              >
                {college}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            What College Decision-Makers Say
          </h2>
          <p className="text-slate-500 text-base">
            {/* TODO: Replace with real testimonial attribution note */}
            From TPOs, HODs, and Principals after completed programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col"
            >
              <Quote className="h-6 w-6 text-amber-400 mb-5 shrink-0" />
              <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                  <span className="text-amber-700 font-bold text-sm font-display">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {t.name}
                  </div>
                  <div className="text-slate-500 text-xs">
                    {t.designation}
                  </div>
                  <div className="text-slate-400 text-xs">{t.college}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
