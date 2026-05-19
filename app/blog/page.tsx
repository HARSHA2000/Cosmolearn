import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog — AI/ML Training Insights & Field Notes",
  description:
    "Articles on AI/ML education, FDP design, college training programs, and GenAI for engineering students. Written by a practitioner.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-slate-950 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Field notes on AI/ML education, workshop design, and what actually
            works when training engineering students.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <p className="text-slate-500 text-center py-20">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post.frontmatter}
                slug={post.slug}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
