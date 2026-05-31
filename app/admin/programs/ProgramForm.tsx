"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DbProgram } from "@/lib/content";

interface Props {
  program?: DbProgram;
}

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function ProgramForm({ program }: Props) {
  const router = useRouter();
  const isEdit = !!program;

  const [form, setForm] = useState({
    title: program?.title ?? "",
    slug: program?.slug ?? "",
    audience: program?.audience ?? "",
    duration: program?.duration ?? "",
    format: program?.format ?? "On-campus, hands-on",
    tools: program?.tools?.join(", ") ?? "",
    outcomes: program?.outcomes?.join("\n") ?? "",
    aicte: program?.aicte ?? false,
    order: String(program?.order ?? 99),
    excerpt: program?.excerpt ?? "",
    content: program?.content ?? "",
    published: program?.published ?? false,
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      tools: form.tools.split(",").map((t) => t.trim()).filter(Boolean),
      outcomes: form.outcomes.split("\n").map((o) => o.trim()).filter(Boolean),
      order: parseInt(form.order) || 99,
    };

    const url = isEdit ? `/api/admin/programs/${program!.id}` : "/api/admin/programs";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/programs");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to save.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!program || !confirm("Delete this program? This cannot be undone.")) return;
    setDeleting(true);
    await fetch(`/api/admin/programs/${program.id}`, { method: "DELETE" });
    router.push("/admin/programs");
    router.refresh();
  }

  const inputCls = "w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent";
  const labelCls = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Basic info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className={labelCls}>Title *</label>
          <input required className={inputCls} value={form.title} onChange={set("title")} placeholder="Program title" />
        </div>

        <div>
          <label className={labelCls}>Slug *</label>
          <input required className={inputCls} value={form.slug} onChange={set("slug")} placeholder="program-slug" />
        </div>

        <div>
          <label className={labelCls}>Order <span className="text-slate-500 font-normal">(sort position)</span></label>
          <input type="number" className={inputCls} value={form.order} onChange={set("order")} placeholder="1" />
        </div>

        <div>
          <label className={labelCls}>Audience</label>
          <input className={inputCls} value={form.audience} onChange={set("audience")} placeholder="BE / MCA final year students" />
        </div>

        <div>
          <label className={labelCls}>Duration</label>
          <input className={inputCls} value={form.duration} onChange={set("duration")} placeholder="2 days (16 hours)" />
        </div>

        <div>
          <label className={labelCls}>Format</label>
          <input className={inputCls} value={form.format} onChange={set("format")} placeholder="On-campus, hands-on" />
        </div>

        <div>
          <label className={labelCls}>Tools <span className="text-slate-500 font-normal">(comma-separated)</span></label>
          <input className={inputCls} value={form.tools} onChange={set("tools")} placeholder="LangChain, PyTorch, Docker" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Excerpt</label>
          <input className={inputCls} value={form.excerpt} onChange={set("excerpt")} placeholder="One-line description shown on the programs listing" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Outcomes <span className="text-slate-500 font-normal">(one per line)</span></label>
          <textarea
            className={`${inputCls} min-h-[100px] resize-y`}
            value={form.outcomes}
            onChange={set("outcomes")}
            placeholder={"Build a working GenAI app\nUnderstand LLM internals\nDeploy a LangChain pipeline"}
          />
        </div>
      </div>

      {/* Curriculum content */}
      <div>
        <label className={labelCls}>Curriculum Content <span className="text-slate-500 font-normal">(Markdown / MDX)</span></label>
        <textarea
          className={`${inputCls} font-mono text-xs leading-relaxed min-h-[480px] resize-y`}
          value={form.content}
          onChange={set("content")}
          placeholder={"## What This Program Is About\n\n...\n\n## Curriculum\n\n### Day 1 — ...\n\n..."}
        />
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-3">
          <input type="checkbox" id="aicte" checked={form.aicte} onChange={set("aicte")} className="w-4 h-4 accent-amber-500" />
          <label htmlFor="aicte" className="text-sm text-slate-300">AICTE Eligible</label>
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="published" checked={form.published} onChange={set("published")} className="w-4 h-4 accent-amber-500" />
          <label htmlFor="published" className="text-sm text-slate-300">
            Published <span className="text-slate-500">(uncheck to save as draft)</span>
          </label>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-sm transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Program"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/programs")}
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
            {deleting ? "Deleting…" : "Delete Program"}
          </button>
        )}
      </div>
    </form>
  );
}
