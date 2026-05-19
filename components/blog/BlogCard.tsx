import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { BlogFrontmatter } from "@/lib/mdx";

interface BlogCardProps {
  post: BlogFrontmatter;
  slug: string;
}

const tagColorMap: Record<string, "amber" | "navy" | "green"> = {
  fdp: "amber",
  genai: "navy",
  "computer-vision": "green",
  mlops: "navy",
};

export function BlogCard({ post, slug }: BlogCardProps) {
  const formattedDate = format(new Date(post.date), "dd MMM yyyy");
  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.map((tag) => (
            <Badge key={tag} variant={tagColorMap[tag] ?? "navy"}>
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-lg hover:text-amber-600 transition-colors">
          <Link href={`/blog/${slug}`}>{post.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <CardDescription className="text-sm leading-relaxed mb-5">
          {post.excerpt}
        </CardDescription>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </div>
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
          >
            Read
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
