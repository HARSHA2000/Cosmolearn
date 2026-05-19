"use client";

import { useSearchParams } from "next/navigation";
import { LeadForm } from "@/components/contact/LeadForm";

export function LeadFormWrapper() {
  const searchParams = useSearchParams();
  const program = searchParams.get("program") || "";
  return <LeadForm defaultProgram={program} />;
}
