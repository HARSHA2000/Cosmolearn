import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getAllTeamMembers } from "@/lib/content";
import {
  ArrowRight,
  GitBranch,
  ShieldCheck,
  Code2,
  Terminal,
  Cloud,
  Cpu,
  Bot,
  CheckCircle,
  BookOpen,
  Building2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About CosmoLearn — Engineering & AI Training Team",
  description:
    "CosmoLearn is a team of industry practitioners delivering AI, Cybersecurity, Full Stack, DevOps, VLSI, Embedded Systems, and Robotics training for engineering colleges.",
  alternates: { canonical: "/about" },
};

const domains = [
  { label: "AI / ML", cls: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
  { label: "Cybersecurity", cls: "bg-red-500/10 text-red-400 border border-red-500/20" },
  { label: "Full Stack — MERN · MEAN", cls: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
  { label: "Python · Django · FastAPI", cls: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
  { label: "DevOps & Cloud", cls: "bg-violet-500/10 text-violet-400 border border-violet-500/20" },
  { label: "VLSI Design", cls: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
  { label: "Embedded Systems", cls: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
  { label: "Robotics", cls: "bg-orange-500/10 text-orange-400 border border-orange-500/20" },
];

const founderHighlights = [
  { value: "7+", label: "Years in AI/ML" },
  { value: "500+", label: "Students Trained" },
  { value: "10+", label: "College Programs" },
  { value: "Active", label: "Keras Contributor" },
];

const differentiators = [
  {
    icon: Code2,
    title: "Industry practitioners, not career trainers",
    body: "Every instructor on the CosmoLearn team is active in their domain — shipping products, not retired from them. What they teach is what they currently use.",
  },
  {
    icon: BookOpen,
    title: "Curriculum built around outcomes",
    body: "Programs are designed around deliverables, not topics. Students leave with a working project and demonstrable skills — not just a certificate for attending slides.",
  },
  {
    icon: Building2,
    title: "Understands the college context",
    body: "Familiar with VTU/AICTE requirements, placement pressures, and what TPOs and HODs need to justify external training to their management.",
  },
  {
    icon: CheckCircle,
    title: "Breadth across the engineering spectrum",
    body: "From AI and Cybersecurity to VLSI and Robotics — one point of contact for colleges that want to upskill across multiple departments and programmes.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CosmoLearn",
  description:
    "Industry-aligned AI, Cybersecurity, Full Stack, DevOps, VLSI, Embedded, and Robotics training for engineering colleges across India.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://train.cosmoverge.in",
  parentOrganization: {
    "@type": "Organization",
    name: "Cosmoverge",
    url: "https://cosmoverge.in",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
};

// Map specialization keywords to icon styles for display
function getSpecStyle(spec: string) {
  const s = spec.toLowerCase();
  if (s.includes("cyber") || s.includes("security")) return { Icon: ShieldCheck, iconBg: "bg-red-500/10", iconColor: "text-red-400" };
  if (s.includes("full stack") || s.includes("mern") || s.includes("mean") || s.includes("web")) return { Icon: Code2, iconBg: "bg-blue-500/10", iconColor: "text-blue-400" };
  if (s.includes("python") || s.includes("django") || s.includes("fastapi")) return { Icon: Terminal, iconBg: "bg-green-500/10", iconColor: "text-green-400" };
  if (s.includes("devops") || s.includes("cloud")) return { Icon: Cloud, iconBg: "bg-violet-500/10", iconColor: "text-violet-400" };
  if (s.includes("vlsi") || s.includes("embedded")) return { Icon: Cpu, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400" };
  if (s.includes("robot")) return { Icon: Bot, iconBg: "bg-orange-500/10", iconColor: "text-orange-400" };
  return { Icon: Code2, iconBg: "bg-slate-500/10", iconColor: "text-slate-400" };
}

export default async function AboutPage() {
  const teamMembers = await getAllTeamMembers().catch(() => []);
  const founder = teamMembers.find((m) => m.role === "founder");
  const instructors = teamMembers.filter((m) => m.role !== "founder");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">

        {/* Hero */}
        <div className="bg-slate-950 pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Our Team
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Practitioners Who Teach{" "}
              <span className="text-amber-400">What They Build</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              CosmoLearn is a collective of industry engineers — active in their
              fields, not retired from them. Every instructor delivers curriculum
              built from real production experience.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
              {domains.map((d) => (
                <span
                  key={d.label}
                  className={`px-3.5 py-1 rounded-full text-sm font-medium ${d.cls}`}
                >
                  {d.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Founder */}
        {founder && (
          <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

                {/* Left column: image + identity below */}
                <div className="flex flex-col gap-6">
                  <div className="relative flex-1 min-h-[320px] rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-md">
                    {founder.photo_url ? (
                      <Image
                        src={founder.photo_url}
                        alt={founder.name}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-28 h-28 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center">
                          <span className="text-amber-500 font-black text-5xl font-display">
                            {founder.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Name + badge below photo */}
                  <div>
                    <span className="inline-block bg-amber-500/10 text-amber-600 border border-amber-500/20 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                      Founder
                    </span>
                    <h2 className="font-display text-3xl font-bold text-slate-900 mb-1">
                      {founder.name}
                    </h2>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                      {founder.specialization}
                    </p>
                  </div>

                  {/* Tags */}
                  {founder.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {founder.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right column: bio + keras link + stats, fills full height */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col justify-between gap-6">
                  <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line flex-1">
                    {founder.bio}
                  </p>

                  <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-slate-400 shrink-0" />
                    <a
                      href="https://github.com/keras-team/keras-hub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                    >
                      Active keras-hub contributor ↗
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {founderHighlights.map((h) => (
                      <div key={h.label} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                        <div className="font-display text-2xl font-bold text-slate-900 mb-0.5">{h.value}</div>
                        <div className="text-xs text-slate-500">{h.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Instructors grid */}
        {instructors.length > 0 && (
          <div className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                  Meet Our Instructors
                </h2>
                <p className="text-slate-500 text-base max-w-xl mx-auto">
                  Each instructor is an active industry professional — not a
                  trainer by default, but a practitioner who chose to teach.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                {instructors.map((inst) => {
                const { Icon, iconBg, iconColor } = getSpecStyle(inst.specialization);
                return (
                  <div
                    key={inst.id}
                    className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="relative h-56 shrink-0 overflow-hidden">
                      {inst.photo_url ? (
                        <>
                          <Image src={inst.photo_url} alt={inst.name} fill className="object-cover object-center" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/80 to-transparent px-5 py-4">
                            <p className="text-white font-display font-bold text-base leading-tight truncate">{inst.name}</p>
                            <p className="text-amber-300 text-xs font-medium mt-0.5 truncate">{inst.specialization}</p>
                          </div>
                        </>
                      ) : (
                        <div className={`w-full h-full ${iconBg} flex flex-col items-center justify-center gap-3 px-4`}>
                          <Icon className={`h-14 w-14 ${iconColor} opacity-40`} />
                          <p className="text-xs font-semibold text-center text-slate-600 leading-snug line-clamp-2">
                            {inst.specialization}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <div>
                        {!inst.photo_url && (
                          <div className="font-display font-bold text-slate-900 text-base mb-0.5">{inst.name}</div>
                        )}
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed flex-1">{inst.bio}</p>
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                        {inst.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
                })}
              </div>
            </div>
          </div>
        )}

        {/* What Makes This Different */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-12 text-center">
              What Makes CosmoLearn Different
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {differentiators.map((d) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.title}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-7 flex gap-5"
                  >
                    <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-slate-900 mb-2">
                        {d.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {d.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 bg-slate-950 text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              Want to Bring a Program to Your College?
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Every engagement starts with a short call — no pitch, no pressure.
              Just a conversation about what your batch needs and which
              instructor is the right fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="amber" size="lg" asChild>
                <Link href="/contact">
                  Request a Proposal
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500"
                asChild
              >
                <Link href="/programs">View Programs</Link>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
