import { createClient } from "@supabase/supabase-js";

// Public client — lazy init, safe for client-side usage
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("Supabase env vars not configured");
  return createClient(url, anonKey);
}

// Service role client — SERVER-SIDE ONLY (API routes / Server Components)
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  if (!serviceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
    realtime: { params: { eventsPerSecond: -1 } },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

export interface Lead {
  full_name: string;
  designation: string;
  college_name: string;
  city: string;
  email: string;
  phone: string;
  program_interest: string;
  student_count: string;
  preferred_month?: string;
  notes?: string;
}
