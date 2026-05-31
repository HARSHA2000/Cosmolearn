"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { DbTestimonial } from "@/lib/content";

const INTERVAL = 5000;

function TestimonialCard({ t }: { t: DbTestimonial }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col h-full">
      <Quote className="h-6 w-6 text-amber-400 mb-5 shrink-0" />
      <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-6 italic">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
          <span className="text-amber-700 font-bold text-sm font-display">
            {t.initials || t.name.charAt(0)}
          </span>
        </div>
        <div>
          <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
          <div className="text-slate-500 text-xs">{t.designation}</div>
          <div className="text-slate-400 text-xs">{t.college}</div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsCarousel({ testimonials }: { testimonials: DbTestimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stepPx, setStepPx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const total = testimonials.length;

  const measure = useCallback(() => {
    if (!firstCardRef.current) return;
    const cardW = firstCardRef.current.offsetWidth;
    const gap = 24; // gap-6
    const w = firstCardRef.current.parentElement?.clientWidth ?? 0;
    const count = w >= 1024 ? 3 : w >= 640 ? 2 : 1;
    setVisibleCount(count);
    setStepPx(cardW + gap);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const maxIndex = Math.max(0, total - visibleCount);
  const isCarousel = total > visibleCount;

  const next = useCallback(() => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)), [maxIndex]);
  const prev = useCallback(() => setCurrent((c) => (c <= 0 ? maxIndex : c - 1)), [maxIndex]);

  useEffect(() => {
    if (!isCarousel || paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [isCarousel, paused, next]);

  // Reset index if visibleCount changes and current is now out of range
  useEffect(() => {
    setCurrent((c) => Math.min(c, Math.max(0, total - visibleCount)));
  }, [visibleCount, total]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{ transform: stepPx ? `translateX(-${current * stepPx}px)` : undefined }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              ref={i === 0 ? firstCardRef : undefined}
              className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>

      {isCarousel && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex gap-1.5">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-4 h-1.5 bg-amber-500" : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
