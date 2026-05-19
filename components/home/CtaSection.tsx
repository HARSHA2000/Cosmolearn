import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 bg-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <Calendar className="h-10 w-10 text-amber-900/60 mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Have a Batch Coming Up?
          </h2>
          <p className="text-slate-800 text-lg leading-relaxed mb-10">
            Let&apos;s plan a program together. Share your batch details and I&apos;ll
            send back a customised proposal within 24 hours — no commitment
            required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              className="bg-slate-900 text-white hover:bg-slate-800"
              asChild
            >
              <Link href="/contact">
                Request a Proposal
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-slate-900/30 text-slate-900 hover:bg-amber-600 hover:border-transparent hover:text-white"
              asChild
            >
              <Link href="/programs">View All Programs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
