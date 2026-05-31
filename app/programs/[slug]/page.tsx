import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProgramBySlug } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  Monitor,
  Wrench,
  CheckCircle,
  ArrowLeft,
  Award,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = await getProgramBySlug(params.slug);
  if (!program) return {};
  return {
    title: program.title,
    description: program.excerpt,
    alternates: { canonical: `/programs/${params.slug}` },
  };
}

export default async function ProgramPage({ params }: Props) {
  const program = await getProgramBySlug(params.slug);
  if (!program) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: program.excerpt,
    provider: {
      "@type": "Organization",
      name: "CosmoLearn",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://train.cosmoverge.in",
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: program.audience,
    },
    timeRequired: program.duration,
    courseMode: program.format,
    inLanguage: "en-IN",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://train.cosmoverge.in"}/programs/${params.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">
        <div className="bg-slate-950 pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All programs
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {program.aicte && <Badge variant="amber">AICTE Eligible</Badge>}
              <Badge variant="navy" className="bg-slate-800 text-slate-300 border-slate-700">
                {program.format}
              </Badge>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
              {program.title}
            </h1>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Users className="h-4 w-4 text-amber-400" />
                {program.audience}
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Clock className="h-4 w-4 text-amber-400" />
                {program.duration}
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Monitor className="h-4 w-4 text-amber-400" />
                {program.format}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <article className="prose max-w-none">
                <MDXRemote source={program.content} />
              </article>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  Outcomes
                </h3>
                <ul className="space-y-2.5">
                  {program.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2 text-sm text-slate-600">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-slate-500" />
                  Tools Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {program.tools.map((tool) => (
                    <Badge key={tool} variant="navy">{tool}</Badge>
                  ))}
                </div>
              </div>

              {program.aicte && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <h3 className="font-display font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4 text-amber-500" />
                    AICTE Eligible
                  </h3>
                  <p className="text-sm text-slate-600">
                    This program qualifies for AICTE activity/FDP credits.
                    Full documentation and certificates provided.
                  </p>
                </div>
              )}

              <div className="bg-slate-900 rounded-xl p-6 text-center">
                <h3 className="font-display font-bold text-white mb-2">
                  Interested in This Program?
                </h3>
                <p className="text-slate-400 text-sm mb-5">
                  Share your batch details and receive a customised proposal
                  within 24 hours.
                </p>
                <Button variant="amber" className="w-full" asChild>
                  <Link href={`/contact?program=${encodeURIComponent(program.title)}`}>
                    Request a Proposal
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
