import React from "react";
import { getAllTestimonials, getAllCollegeEngagements } from "@/lib/content";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

const stats = [
  { value: "500+", label: "Students trained" },
  { value: "10+", label: "College engagements" },
  { value: "3", label: "States reached" },
  { value: "4", label: "Flagship programs" },
];

export async function SocialProof() {
  const [testimonials, colleges] = await Promise.all([
    getAllTestimonials().catch(() => []),
    getAllCollegeEngagements().catch(() => []),
  ]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="font-display text-4xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* College names */}
        {colleges.length > 0 && (
          <div className="text-center mb-14">
            <p className="text-slate-400 text-sm uppercase tracking-widest font-medium mb-6">
              Past engagements include
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {colleges.map((college) => (
                <div key={college.id} className="px-5 py-2.5 border border-slate-200 rounded-full text-slate-600 text-sm font-medium bg-white">
                  {college.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                What College Decision-Makers Say
              </h2>
              <p className="text-slate-500 text-base">
                From TPOs, HODs, and Principals after completed programs.
              </p>
            </div>

            <TestimonialsCarousel testimonials={testimonials} />
          </>
        )}
      </div>
    </section>
  );
}
