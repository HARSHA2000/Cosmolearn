import type { Metadata } from "next";
import { Suspense } from "react";
import { LeadFormWrapper } from "./LeadFormWrapper";
import { CheckCircle, Clock, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Request a Program Proposal — AI/ML Training for Your College",
  description:
    "Share your batch details and receive a customised AI/ML workshop or FDP proposal within 24 hours. No commitment required.",
  alternates: { canonical: "/contact" },
};

const assurances = [
  {
    icon: Clock,
    title: "24-hour response",
    body: "Receive a customised proposal with program details, pricing, and logistics within 24 hours.",
  },
  {
    icon: CheckCircle,
    title: "No commitment required",
    body: "This is a proposal request, not a booking. Review everything before deciding.",
  },
  {
    icon: Mail,
    title: "Direct communication",
    body: "You'll hear from Harshith directly — not a coordinator or sales team.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-slate-950 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Request a Program Proposal
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Share your batch details and you&apos;ll receive a customised proposal
            within 24 hours — tailored to your program, student count, and
            timeline.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
                Proposal Request Form
              </h2>
              <p className="text-slate-500 text-sm mb-8">
                Fields marked <span className="text-red-500">*</span> are
                required. This takes about 2 minutes.
              </p>
              <Suspense fallback={<div className="h-96 animate-pulse bg-slate-50 rounded-xl" />}>
                <LeadFormWrapper />
              </Suspense>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assurances */}
            <div className="space-y-4">
              {assurances.map((a) => (
                <div
                  key={a.title}
                  className="flex gap-4 p-5 bg-slate-50 border border-slate-100 rounded-xl"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <a.icon className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 text-sm mb-0.5">
                      {a.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {a.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct contact */}
            <div className="p-5 bg-slate-900 rounded-xl">
              <h3 className="font-display font-semibold text-white text-sm mb-3">
                Prefer to reach out directly?
              </h3>
              <a
                href="mailto:harshith@cosmoverge.in"
                className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
              >
                harshith@cosmoverge.in
              </a>
              <p className="text-slate-500 text-xs mt-2">
                For urgent inquiries or if you&apos;d prefer a call.
              </p>
            </div>

            {/* Past colleges */}
            <div className="p-5 bg-amber-50 border border-amber-100 rounded-xl">
              <h3 className="font-display font-semibold text-slate-900 text-sm mb-3">
                Previous engagements
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li>• BMS College of Engineering, Bengaluru</li>
                <li>• Dhawan College</li>
                <li>• Mahajana PGC Mysore</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
