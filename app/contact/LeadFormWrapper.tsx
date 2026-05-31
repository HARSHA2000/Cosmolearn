"use client";

import { useSearchParams } from "next/navigation";
import { LeadForm } from "@/components/contact/LeadForm";

interface Props {
  programs: string[];
}

export function LeadFormWrapper({ programs }: Props) {
  const searchParams = useSearchParams();
  const program = searchParams.get("program") || "";
  return <LeadForm defaultProgram={program} programs={programs} />;
}
