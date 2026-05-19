"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface CurriculumAccordionProps {
  content: string;
}

// Parses MDX/Markdown ## headings as accordion sections
export function CurriculumAccordion({ content }: CurriculumAccordionProps) {
  const sections = parseContentSections(content);

  if (sections.length === 0) return null;

  return (
    <Accordion type="multiple" className="space-y-0">
      {sections.map((section, idx) => (
        <AccordionItem key={idx} value={`section-${idx}`}>
          <AccordionTrigger className="text-base font-semibold">
            {section.heading}
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: section.htmlContent }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function parseContentSections(
  content: string
): { heading: string; htmlContent: string }[] {
  const lines = content.split("\n");
  const sections: { heading: string; lines: string[] }[] = [];
  let current: { heading: string; lines: string[] } | null = null;

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (current) sections.push(current);
      current = { heading: line.replace("### ", "").trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);

  return sections.map((s) => ({
    heading: s.heading,
    htmlContent: markdownToHtml(s.lines.join("\n")),
  }));
}

function markdownToHtml(md: string): string {
  return md
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul class="list-disc list-inside space-y-1 text-slate-600 my-2 ml-2">${m}</ul>`)
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/^(?!<[uo]l|<li|<p|<strong|<em)(.+)$/gm, (m) =>
      m.trim() ? `<p class="text-slate-600 mb-2">${m}</p>` : ""
    );
}
