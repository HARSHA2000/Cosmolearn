import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Wrench, ArrowRight } from "lucide-react";

const programs = [
  {
    title: "Generative AI & Prompt Engineering Workshop",
    slug: "generative-ai-prompt-engineering",
    audience: "BE / MCA Final Year",
    duration: "2 days · 16 hours",
    tools: ["ChatGPT API", "LangChain", "Stable Diffusion"],
    aicte: true,
    excerpt:
      "Build GenAI applications end-to-end. LLM internals, prompt engineering, RAG pipelines, and image generation with Stable Diffusion.",
    color: "from-violet-500/10 to-blue-500/10",
    accent: "text-violet-600",
  },
  {
    title: "Computer Vision Bootcamp",
    slug: "computer-vision-bootcamp",
    audience: "BE / MCA Students",
    duration: "3 days · 24 hours",
    tools: ["OpenCV", "PyTorch", "YOLOv8"],
    aicte: true,
    excerpt:
      "From raw images to deployed object detection. CNN architectures, custom dataset annotation, training YOLOv8, and deploying as a REST API.",
    color: "from-emerald-500/10 to-teal-500/10",
    accent: "text-emerald-600",
  },
  {
    title: "FDP — AI Tools for Education",
    slug: "fdp-ai-tools-education",
    audience: "Faculty & Teaching Staff",
    duration: "2 days · 16 hours",
    tools: ["Claude", "ChatGPT", "NotebookLM"],
    aicte: true,
    excerpt:
      "Practical AI toolkit for educators. AI-assisted lesson planning, question generation, research summarization, and presentation creation.",
    color: "from-amber-500/10 to-orange-500/10",
    accent: "text-amber-600",
  },
  {
    title: "MLOps & Deployment for Final Year Projects",
    slug: "mlops-deployment-final-year",
    audience: "BE / MCA Project Students",
    duration: "1 day · 8 hours",
    tools: ["Docker", "FastAPI", "AWS EC2"],
    aicte: false,
    excerpt:
      "Take your final year ML project from notebook to live URL. Docker, FastAPI, AWS, CI/CD with GitHub Actions, and monitoring with Grafana.",
    color: "from-slate-500/10 to-blue-500/10",
    accent: "text-slate-600",
  },
];

export function ProgramsGrid() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Flagship Programs
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Each program is designed around a real deliverable — not slides and
            theory. Students leave with something to show.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program) => (
            <Card
              key={program.slug}
              className="flex flex-col hover:shadow-md transition-shadow border-slate-200 overflow-hidden"
            >
              <div className={`h-1.5 bg-gradient-to-r ${program.color} opacity-80`} />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <CardTitle className="text-lg leading-snug">
                    {program.title}
                  </CardTitle>
                  {program.aicte && (
                    <Badge variant="green" className="shrink-0 mt-0.5">
                      AICTE
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Users className="h-3.5 w-3.5" />
                    {program.audience}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {program.duration}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <CardDescription className="text-sm leading-relaxed mb-4">
                  {program.excerpt}
                </CardDescription>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Wrench className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  {program.tools.map((tool) => (
                    <Badge key={tool} variant="navy" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${program.accent} hover:bg-slate-100 -ml-2`}
                  asChild
                >
                  <Link href={`/programs/${program.slug}`}>
                    View full curriculum
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/programs">Browse all programs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
