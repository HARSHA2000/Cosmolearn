import { BlogForm } from "../BlogForm";

export default function NewBlogPostPage() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-white font-display font-bold text-2xl mb-8">New Blog Post</h1>
      <BlogForm />
    </div>
  );
}
