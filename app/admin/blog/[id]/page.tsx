import { notFound } from "next/navigation";
import { adminGetBlogPost } from "@/lib/content";
import { BlogForm } from "../BlogForm";

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await adminGetBlogPost(params.id);
  if (!post) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-white font-display font-bold text-2xl mb-8">Edit Post</h1>
      <BlogForm post={post} />
    </div>
  );
}
