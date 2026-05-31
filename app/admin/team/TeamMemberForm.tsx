"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { DbTeamMember } from "@/lib/content";

interface Props { member?: DbTeamMember }

export function TeamMemberForm({ member }: Props) {
  const router = useRouter();
  const isEdit = !!member;

  const [form, setForm] = useState({
    name: member?.name ?? "",
    role: (member?.role ?? "instructor") as "founder" | "instructor",
    specialization: member?.specialization ?? "",
    bio: member?.bio ?? "",
    tags: member?.tags?.join(", ") ?? "",
    photo_url: member?.photo_url ?? "",
    order: member?.order ?? 99,
    published: member?.published ?? true,
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.type === "number" ? Number(e.target.value) : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok) {
      setForm((prev) => ({ ...prev, photo_url: data.url }));
    } else {
      setError(data.error ?? "Upload failed.");
    }
    setUploading(false);
    // reset so the same file can be re-selected
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) };
    const url = isEdit ? `/api/admin/team/${member!.id}` : "/api/admin/team";
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) { router.push("/admin/team"); router.refresh(); }
    else { const d = await res.json().catch(() => ({})); setError(d.error ?? "Failed to save."); setSaving(false); }
  }

  async function handleDelete() {
    if (!member || !confirm("Delete this team member?")) return;
    setDeleting(true);
    await fetch(`/api/admin/team/${member.id}`, { method: "DELETE" });
    router.push("/admin/team");
    router.refresh();
  }

  const inputCls = "w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent";
  const labelCls = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Name *</label>
          <input required className={inputCls} value={form.name} onChange={set("name")} placeholder="Instructor name" />
        </div>

        <div>
          <label className={labelCls}>Role</label>
          <select
            className={inputCls}
            value={form.role}
            onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value as "founder" | "instructor" }))}
          >
            <option value="instructor">Instructor</option>
            <option value="founder">Founder</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Specialization *</label>
          <input required className={inputCls} value={form.specialization} onChange={set("specialization")} placeholder="e.g. Cybersecurity — or Founder & Solutions Architect" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Bio</label>
          <textarea rows={4} className={`${inputCls} resize-y`} value={form.bio} onChange={set("bio")} placeholder="Background, experience, what makes this instructor the right fit…" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Tags <span className="text-slate-500 font-normal">(comma-separated)</span></label>
          <input className={inputCls} value={form.tags} onChange={set("tags")} placeholder="Python, Docker, AWS, Kubernetes" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Photo <span className="text-slate-500 font-normal">(leave blank to show specialization icon)</span></label>
          <div className="flex items-start gap-4">
            {form.photo_url && (
              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-slate-700">
                <Image src={form.photo_url} alt="Preview" fill className="object-cover" />
              </div>
            )}
            <div className="flex-1 space-y-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600 text-slate-300 text-sm cursor-pointer hover:bg-slate-800 transition-colors ${uploading ? "opacity-60 pointer-events-none" : ""}`}
              >
                {uploading ? "Uploading…" : form.photo_url ? "Replace photo" : "Upload photo"}
              </label>
              {form.photo_url && (
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, photo_url: "" }))}
                  className="block text-xs text-red-400 hover:text-red-300"
                >
                  Remove photo
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className={labelCls}>Display Order</label>
          <input type="number" className={inputCls} value={form.order} onChange={set("order")} min={1} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="published" checked={form.published} onChange={set("published")} className="w-4 h-4 accent-amber-500" />
        <label htmlFor="published" className="text-sm text-slate-300">Published <span className="text-slate-500">(uncheck to hide from About page)</span></label>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-sm transition-colors disabled:opacity-60">
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Team Member"}
        </button>
        <button type="button" onClick={() => router.push("/admin/team")} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors">
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
