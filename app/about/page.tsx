import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Cpu,
  BookOpen,
  Building2,
  GitBranch,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Harshith — AI/ML Trainer & Industry Practitioner",
  description:
    "Harshith is an AI/ML engineer and trainer based in Bengaluru. 5+ years in Computer Vision and Generative AI, active Keras contributor, founder of Cosmoverge. He teaches what he uses in production.",
  alternates: { canonical: "/about" },
};

const techStack = [
  "PyTorch",
  "TensorFlow",
  "Keras / keras-hub",
  "Hugging Face",
  "Stable Diffusion / LoRA",
  "FastAPI",
  "LangChain",
  "Docker",
  "AWS EC2",
  "GitHub Actions",
  "MLOps tooling",
  "React / Next.js",
];

const differentiators = [
  {
    icon: Code2,
    title: "Ships real products",
    body: "Every tool covered in a workshop is one Harshith uses in active production at Cosmoverge. Not curated for curriculum — used because it's the right tool.",
  },
  {
    icon: Cpu,
    title: "Deep on Computer Vision and GenAI",
    body: "5–7 years of specialisation in CV and Diffusion models. Contributing to Keras-hub puts him directly in contact with the research community.",
  },
  {
    icon: BookOpen,
    title: "Curriculum, not content",
    body: "Programs are designed around outcomes and deliverables, not topics. Students leave with a project, not a certificate for attending slides.",
  },
  {
    icon: Building2,
    title: "Understands the college context",
    body: "Familiar with VTU/AICTE requirements, placement pressures, and what TPOs and HODs need to justify external training to management.",
  },
];

const timeline = [
  {
    year: "2017–2019",
    label: "Started in AI/ML Engineering",
    detail:
      "Began as an ML engineer, first projects in image classification and data pipelines.",
  },
  {
    year: "2020–2021",
    label: "Deep dive into Computer Vision",
    detail:
      "Specialised in CV systems — object detection, segmentation, and real-time inference pipelines.",
  },
  {
    year: "2022",
    label: "Generative AI and Diffusion Models",
    detail:
      "Shifted focus to Stable Diffusion, LoRA fine-tuning, and production GenAI systems.",
  },
  {
    year: "2022–present",
    label: "Founded Cosmoverge",
    detail:
      "Boutique tech agency building AI and web products for clients. Active practitioner, not a retired one.",
  },
  {
    year: "2023–present",
    label: "Open Source — Keras ecosystem",
    detail:
      "Active contributor to keras-hub. Regularly interacts with ML research community.",
  },
  {
    year: "2023–present",
    label: "College Training Programs",
    detail:
      "Began running workshops and FDPs for engineering colleges across Karnataka.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harshith",
  jobTitle: "AI/ML Trainer & Industry Practitioner",
  description:
    "AI/ML engineer and trainer based in Bengaluru. Specialises in Computer Vision and Generative AI. Founder of Cosmoverge. Active Keras contributor.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL || "https://train.cosmoverge.in",
  worksFor: {
    "@type": "Organization",
    name: "Cosmoverge",
    url: "https://cosmoverge.in",
  },
  knowsAbout: [
    "Machine Learning",
    "Computer Vision",
    "Generative AI",
    "Stable Diffusion",
    "LangChain",
    "PyTorch",
    "MLOps",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-slate-950 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
                  About the Trainer
                </p>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
                  Hi, I&apos;m Harshith
                </h1>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  I&apos;m an AI/ML engineer and practitioner based in
                  Bengaluru. I build AI products through my agency{" "}
                  <a
                    href="https://cosmoverge.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300"
                  >
                    Cosmoverge
                  </a>
                  , and I run training programs for engineering colleges because
                  I believe the gap between what colleges teach and what
                  industry needs is a problem worth fixing.
                </p>
                <p className="text-slate-400 text-base leading-relaxed">
                  I teach what I use in production — not what was in a 2019
                  textbook.
                </p>
              </div>

              {/* Photo placeholder */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-72 h-80 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center gap-3">
                  {/* TODO: Replace with actual photo */}
                  <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center">
                    <span className="text-amber-400 font-black text-3xl font-display">
                      H
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs">
                    {/* TODO: Add photo */}
                    [Photo placeholder]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-amber-50 border-y border-amber-100 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-relaxed">
              &ldquo;I teach what I use in production, not what&apos;s in a 2019
              textbook. Every tool in my workshops is one I&apos;ve shipped real
              software with.&rdquo;
            </p>
            <p className="text-slate-500 mt-4 text-sm">— Harshith</p>
          </div>
        </div>

        {/* Journey timeline */}
        <div className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-12">
              The Journey
            </h2>
            <div className="relative pl-8 border-l-2 border-slate-100 space-y-8">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[2.6rem] top-0.5 w-5 h-5 rounded-full bg-amber-500 border-2 border-white shadow" />
                  <div className="text-xs font-semibold text-amber-600 mb-1">
                    {item.year}
                  </div>
                  <h3 className="font-display font-bold text-slate-900 mb-1">
                    {item.label}
                  </h3>
                  <p className="text-slate-500 text-sm">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Differentiators */}
        <div className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-12 text-center">
              What Makes This Different
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {differentiators.map((d) => (
                <div
                  key={d.title}
                  className="bg-white border border-slate-200 rounded-xl p-7 flex gap-5"
                >
                  <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <d.icon className="h-5 w-5 text-amber-600" />
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
              ))}
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
              Current Production Stack
            </h2>
            <p className="text-slate-500 text-sm mb-8">
              Tools and frameworks actively used in client projects at
              Cosmoverge — the same ones covered in training programs.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {techStack.map((tool) => (
                <div
                  key={tool}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-sm text-slate-700 font-medium"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open source */}
        <div className="py-16 bg-slate-50 border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
              <GitBranch className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">
                Open Source Work
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Active contributor to the{" "}
                <strong>Keras ecosystem (keras-hub)</strong>. Open source work
                signals something that a training resume cannot — that the
                practitioner engages with the research community, reads real
                model implementations, and writes code that gets reviewed by
                core ML engineers.
              </p>
              <a
                href="https://github.com/keras-team/keras-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium"
              >
                View keras-hub on GitHub ↗
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 bg-white text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
              Want to Explore a Program for Your College?
            </h2>
            <p className="text-slate-500 mb-8">
              Every engagement starts with a 20-minute call. No pitch, no
              pressure — just a conversation about what your batch needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="amber" size="lg" asChild>
                <Link href="/contact">
                  Request a Proposal
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/programs">View Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
