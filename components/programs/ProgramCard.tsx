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
import { Clock, Users, ArrowRight } from "lucide-react";
import type { ProgramFrontmatter } from "@/lib/mdx";

interface ProgramCardProps {
  program: ProgramFrontmatter;
  slug: string;
}

export function ProgramCard({ program, slug }: ProgramCardProps) {
  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <CardTitle className="text-lg">{program.title}</CardTitle>
          {program.aicte && (
            <Badge variant="green" className="shrink-0">
              AICTE
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
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
        <div className="flex flex-wrap gap-1.5">
          {program.tools.slice(0, 4).map((tool) => (
            <Badge key={tool} variant="navy">
              {tool}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0 gap-3">
        <Button variant="default" size="sm" asChild>
          <Link href={`/programs/${slug}`}>
            View Curriculum
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/contact?program=${encodeURIComponent(program.title)}`}>
            Enquire
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
