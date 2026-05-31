"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DbTestimonial } from "@/lib/content";

interface Props { testimonial?: DbTestimonial }

export function TestimonialForm({ testimonial }: Props) {
  const router = useRouter();
  const isEdit = !!testimonial;

  const [form, setForm] = useState({
    quote: testimonial?.quote ?? "",
    name: testimonial?.name ?? "",
    designation: testimonial?.designation ?? "",
    college: testimonial?.college ?? "",
    initials: testimonial?.initials ?? "",
    order: testimonial?.order ?? 99,
    published: testimonial?.published ?? true,
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.type === "number" ? Number(e.target.value) : e.target.value;
      setForm((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "name" && !isEdit ? { initials: (e.target.value.charAt(0) ?? "").toUpperCase() } : {}),
      }));
    };
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = isEdit ? `/api/admin/testimonials/${testimonial!.id}` : "/api/admin/testimonials";
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { router.push("/admin/testimonials"); router.refresh(); }
    else { const d = await res.json().catch(() => ({})); setError(d.error ?? "Failed to save."); setSaving(false); }
  }

  async function handleDelete() {
    if (!testimonial || !confirm("Delete this testimonial?")) return;
    setDeleting(true);
    await fetch(`/api/admin/testimonials/${testimonial.id}`, { method: "DELETE" });
    router.push("/admin/testimonials");
    router.refresh();
  }

  const inputCls = "w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent";
  const labelCls = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className={labelCls}>Quote *</label>
          <textarea required rows={4} className={`${inputCls} resize-y`} value={form.quote} onChange={set("quote")} placeholder="What they said about the program…" />
        </div>

        <div>
          <label className={labelCls}>Name *</label>
          <input required className={inputCls} value={form.name} onChange={set("name")} placeholder="Dr. Priya Sharma" />
        </div>

        <div>
          <label className={labelCls}>Initials <span className="text-slate-500 font-normal">(auto-filled from name)</span></label>
          <input className={inputCls} value={form.initials} onChange={set("initials")} placeholder="P" maxLength={3} />
        </div>

        <div>
          <label className={labelCls}>Designation</label>
          <input className={inputCls} value={form.designation} onChange={set("designation")} placeholder="Head of Department, CS" />
        </div>

        <div>
          <label className={labelCls}>College</label>
          <input className={inputCls} value={form.college} onChange={set("college")} placeholder="ABC Engineering College, Bengaluru" />
        </div>

        <div>
          <label className={labelCls}>Display Order</label>
          <input type="number" className={inputCls} value={form.order} onChange={set("order")} min={1} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="published" checked={form.published} onChange={set("published")} className="w-4 h-4 accent-amber-500" />
        <label htmlFor="published" className="text-sm text-slate-300">Published <span className="text-slate-500">(uncheck to hide)</span></label>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-sm transition-colors disabled:opacity-60">
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Testimonial"}
        </button>
        <button type="button" onClick={() => router.push("/admin/testimonials")} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors">
          Cancel
        </button>
        {isEdit && (
          <button type="button" onClick={handleDelete} disabled={deleting} className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition-colors ml-auto disabled:opacity-60">
            {deleting ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>
    </form>
  );
}
