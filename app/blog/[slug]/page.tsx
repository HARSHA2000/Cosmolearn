import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { format } from "date-fns";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    alternates: { canonical: `/blog/${params.slug}` },
  };
}

const tagColorMap: Record<string, "amber" | "navy" | "green"> = {
  fdp: "amber",
  genai: "navy",
  "computer-vision": "green",
  mlops: "navy",
};

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const { frontmatter: fm, content } = post;
  const formattedDate = format(new Date(fm.date), "dd MMMM yyyy");

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://train.cosmoverge.in";
  const postUrl = `${siteUrl}/blog/${params.slug}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-slate-950 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {fm.tags.map((tag) => (
              <Badge key={tag} variant={tagColorMap[tag] ?? "navy"}>
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white leading-snug mb-6">
            {fm.title}
          </h1>

          <div className="flex flex-wrap gap-5 text-slate-400 text-sm">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {fm.author}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose max-w-none">
          <MDXRemote source={content} />
        </article>

        {/* Share buttons */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-4">
            <Share2 className="h-4 w-4 text-slate-400" />
            <span className="text-slate-500 text-sm">Share this post:</span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-[#0A66C2] text-white text-xs font-medium hover:bg-[#004182] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(fm.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-700 transition-colors"
            >
              X / Twitter
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(fm.title + " " + postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-[#25D366] text-white text-xs font-medium hover:bg-[#1aad4c] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center">
          <h3 className="font-display font-bold text-slate-900 text-xl mb-2">
            Thinking about a program for your college?
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            Share your batch details and receive a proposal within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-slate-900 text-sm font-bold rounded-md hover:bg-amber-400 transition-colors"
          >
            Request a Proposal
          </Link>
        </div>
      </div>
    </div>
  );
}
