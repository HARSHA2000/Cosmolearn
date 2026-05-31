import { getSupabase, getSupabaseAdmin } from "./supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DbBlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbProgram {
  id: string;
  title: string;
  slug: string;
  audience: string;
  duration: string;
  format: string;
  tools: string[];
  outcomes: string[];
  aicte: boolean;
  order: number;
  excerpt: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Public reads (published only) ───────────────────────────────────────────

export async function getAllBlogPosts(): Promise<DbBlogPost[]> {
  const { data, error } = await getSupabase()
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<DbBlogPost | null> {
  const { data, error } = await getSupabase()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (error) return null;
  return data;
}

export async function getAllPrograms(): Promise<DbProgram[]> {
  const { data, error } = await getSupabase()
    .from("programs")
    .select("*")
    .eq("published", true);
  if (error) throw error;
  return (data ?? []).sort((a, b) => a.order - b.order);
}

export async function getProgramBySlug(slug: string): Promise<DbProgram | null> {
  const { data, error } = await getSupabase()
    .from("programs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (error) return null;
  return data;
}

// ─── Admin reads (all records, including unpublished) ─────────────────────────

export async function adminGetAllBlogPosts(): Promise<DbBlogPost[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("blog_posts")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function adminGetBlogPost(id: string): Promise<DbBlogPost | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function adminCreateBlogPost(
  post: Omit<DbBlogPost, "id" | "created_at" | "updated_at">
): Promise<DbBlogPost> {
  const { data, error } = await getSupabaseAdmin()
    .from("blog_posts")
    .insert([post])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminUpdateBlogPost(
  id: string,
  post: Partial<Omit<DbBlogPost, "id" | "created_at" | "updated_at">>
): Promise<DbBlogPost> {
  const { data, error } = await getSupabaseAdmin()
    .from("blog_posts")
    .update(post)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminDeleteBlogPost(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("blog_posts")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

export async function adminGetAllPrograms(): Promise<DbProgram[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("programs")
    .select("*");
  if (error) throw error;
  return (data ?? []).sort((a, b) => a.order - b.order);
}

export async function adminGetProgram(id: string): Promise<DbProgram | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("programs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function adminCreateProgram(
  program: Omit<DbProgram, "id" | "created_at" | "updated_at">
): Promise<DbProgram> {
  const { data, error } = await getSupabaseAdmin()
    .from("programs")
    .insert([program])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminUpdateProgram(
  id: string,
  program: Partial<Omit<DbProgram, "id" | "created_at" | "updated_at">>
): Promise<DbProgram> {
  const { data, error } = await getSupabaseAdmin()
    .from("programs")
    .update(program)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminDeleteProgram(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("programs")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface DbTestimonial {
  id: string;
  quote: string;
  name: string;
  designation: string;
  college: string;
  initials: string;
  order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getAllTestimonials(): Promise<DbTestimonial[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("testimonials")
    .select("*")
    .eq("published", true);
  if (error) throw error;
  return (data ?? []).sort((a, b) => a.order - b.order);
}

export async function adminGetAllTestimonials(): Promise<DbTestimonial[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("testimonials")
    .select("*");
  if (error) throw error;
  return (data ?? []).sort((a, b) => a.order - b.order);
}

export async function adminGetTestimonial(id: string): Promise<DbTestimonial | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function adminCreateTestimonial(
  t: Omit<DbTestimonial, "id" | "created_at" | "updated_at">
): Promise<DbTestimonial> {
  const { data, error } = await getSupabaseAdmin()
    .from("testimonials")
    .insert([t])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminUpdateTestimonial(
  id: string,
  t: Partial<Omit<DbTestimonial, "id" | "created_at" | "updated_at">>
): Promise<DbTestimonial> {
  const { data, error } = await getSupabaseAdmin()
    .from("testimonials")
    .update(t)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminDeleteTestimonial(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("testimonials")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// ─── Team Members ─────────────────────────────────────────────────────────────

export interface DbTeamMember {
  id: string;
  name: string;
  role: "founder" | "instructor";
  specialization: string;
  bio: string;
  tags: string[];
  photo_url: string;
  order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getAllTeamMembers(): Promise<DbTeamMember[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("team_members")
    .select("*")
    .eq("published", true);
  if (error) throw error;
  return (data ?? []).sort((a, b) => a.order - b.order);
}

export async function adminGetAllTeamMembers(): Promise<DbTeamMember[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("team_members")
    .select("*");
  if (error) throw error;
  return (data ?? []).sort((a, b) => a.order - b.order);
}

export async function adminGetTeamMember(id: string): Promise<DbTeamMember | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("team_members")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function adminCreateTeamMember(
  m: Omit<DbTeamMember, "id" | "created_at" | "updated_at">
): Promise<DbTeamMember> {
  const { data, error } = await getSupabaseAdmin()
    .from("team_members")
    .insert([m])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminUpdateTeamMember(
  id: string,
  m: Partial<Omit<DbTeamMember, "id" | "created_at" | "updated_at">>
): Promise<DbTeamMember> {
  const { data, error } = await getSupabaseAdmin()
    .from("team_members")
    .update(m)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminDeleteTeamMember(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("team_members")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// ─── College Engagements ──────────────────────────────────────────────────────

export interface DbCollegeEngagement {
  id: string;
  name: string;
  order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getAllCollegeEngagements(): Promise<DbCollegeEngagement[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("college_engagements")
    .select("*")
    .eq("published", true);
  if (error) throw error;
  return (data ?? []).sort((a, b) => a.order - b.order);
}

export async function adminGetAllCollegeEngagements(): Promise<DbCollegeEngagement[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("college_engagements")
    .select("*");
  if (error) throw error;
  return (data ?? []).sort((a, b) => a.order - b.order);
}

export async function adminGetCollegeEngagement(id: string): Promise<DbCollegeEngagement | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("college_engagements")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function adminCreateCollegeEngagement(
  e: Omit<DbCollegeEngagement, "id" | "created_at" | "updated_at">
): Promise<DbCollegeEngagement> {
  const { data, error } = await getSupabaseAdmin()
    .from("college_engagements")
    .insert(e)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminUpdateCollegeEngagement(
  id: string,
  e: Partial<Omit<DbCollegeEngagement, "id" | "created_at" | "updated_at">>
): Promise<DbCollegeEngagement> {
  const { data, error } = await getSupabaseAdmin()
    .from("college_engagements")
    .update({ ...e, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminDeleteCollegeEngagement(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("college_engagements")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
