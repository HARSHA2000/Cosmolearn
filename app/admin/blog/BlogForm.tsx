"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DbBlogPost } from "@/lib/content";

interface Props {
  post?: DbBlogPost;
}

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function BlogForm({ post }: Props) {
  const router = useRouter();
  const isEdit = !!post;

  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    date: post?.date ?? new Date().toISOString().split("T")[0],
    author: post?.author ?? "Harshith",
    excerpt: post?.excerpt ?? "",
    tags: post?.tags?.join(", ") ?? "",
    content: post?.content ?? "",
    published: post?.published ?? false,
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
      setForm((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "title" && !isEdit ? { slug: toSlug(e.target.value) } : {}),
      }));
    };
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    const url = isEdit ? `/api/admin/blog/${post!.id}` : "/api/admin/blog";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/blog");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to save.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!post || !confirm("Delete this post? This cannot be undone.")) return;
    setDeleting(true);
    await fetch(`/api/admin/blog/${post.id}`, { method: "DELETE" });
    router.push("/admin/blog");
    router.refresh();
  }

  const inputCls = "w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent";
  const labelCls = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className={labelCls}>Title *</label>
          <input required className={inputCls} value={form.title} onChange={set("title")} placeholder="Post title" />
        </div>

        <div>
          <label className={labelCls}>Slug *</label>
          <input required className={inputCls} value={form.slug} onChange={set("slug")} placeholder="post-slug" />
        </div>

        <div>
          <label className={labelCls}>Date *</label>
          <input required type="date" className={inputCls} value={form.date} onChange={set("date")} />
        </div>

        <div>
          <label className={labelCls}>Author</label>
          <input className={inputCls} value={form.author} onChange={set("author")} placeholder="Harshith" />
        </div>

        <div>
          <label className={labelCls}>Tags <span className="text-slate-500 font-normal">(comma-separated)</span></label>
          <input className={inputCls} value={form.tags} onChange={set("tags")} placeholder="genai, mlops, fdp" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Excerpt</label>
          <input className={inputCls} value={form.excerpt} onChange={set("excerpt")} placeholder="One-line summary shown on the blog listing" />
        </div>
      </div>

      <div>
        <label className={labelCls}>Content <span className="text-slate-500 font-normal">(Markdown / MDX)</span></label>
        <textarea
          className={`${inputCls} font-mono text-xs leading-relaxed min-h-[420px] resize-y`}
          value={form.content}
          onChange={set("content")}
          placeholder={"## Introduction\n\nWrite your post here in Markdown..."}
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="published"
          checked={form.published}
          onChange={set("published")}
          className="w-4 h-4 accent-amber-500"
        />
        <label htmlFor="published" className="text-sm text-slate-300">
          Published <span className="text-slate-500">(uncheck to save as draft)</span>
        </label>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-sm transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
        >
          Cancel
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition-colors ml-auto disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Delete Post"}
          </button>
        )}
      </div>
    </form>
  );
}
