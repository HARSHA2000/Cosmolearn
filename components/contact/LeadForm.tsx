"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

interface FormData {
  full_name: string;
  designation: string;
  college_name: string;
  city: string;
  email: string;
  phone: string;
  program_interest: string;
  student_count: string;
  preferred_month: string;
  notes: string;
}

const initialData: FormData = {
  full_name: "",
  designation: "",
  college_name: "",
  city: "",
  email: "",
  phone: "",
  program_interest: "",
  student_count: "",
  preferred_month: "",
  notes: "",
};

const DEFAULT_PROGRAMS = [
  "Generative AI & Prompt Engineering Workshop",
  "Computer Vision Bootcamp",
  "FDP — AI Tools for Education",
  "MLOps & Deployment for Final Year Projects",
  "Custom / Not Sure",
];

const DESIGNATIONS = ["TPO", "HOD", "Principal", "Faculty", "Other"];

const STUDENT_COUNTS = ["< 30", "30–60", "60–100", "100+"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "Flexible",
];

interface LeadFormProps {
  defaultProgram?: string;
  programs?: string[];
}

export function LeadForm({ defaultProgram, programs = DEFAULT_PROGRAMS }: LeadFormProps) {
  const [form, setForm] = useState<FormData>({
    ...initialData,
    program_interest: defaultProgram || "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const setSelect = (field: keyof FormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-emerald-500" />
        </div>
        <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">
          Request Received!
        </h3>
        <p className="text-slate-500 max-w-sm mx-auto mb-6">
          We&apos;ll get back to you within{" "}
          <strong>24 hours</strong> with a customised program proposal. Check
          your inbox — including spam.
        </p>
        <p className="text-slate-400 text-sm">
          Questions? Email{" "}
          <a
            href="mailto:harshith@cosmoverge.in"
            className="text-amber-600 hover:underline"
          >
            harshith@cosmoverge.in
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Designation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            required
            value={form.full_name}
            onChange={set("full_name")}
            placeholder="Dr. Priya Sharma"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Designation <span className="text-red-500">*</span>
          </label>
          <Select
            required
            value={form.designation}
            onValueChange={setSelect("designation")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select designation" />
            </SelectTrigger>
            <SelectContent>
              {DESIGNATIONS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* College + City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            College Name <span className="text-red-500">*</span>
          </label>
          <Input
            required
            value={form.college_name}
            onChange={set("college_name")}
            placeholder="ABC Engineering College"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            City <span className="text-red-500">*</span>
          </label>
          <Input
            required
            value={form.city}
            onChange={set("city")}
            placeholder="Bengaluru"
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="tpo@abceng.edu.in"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Phone <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <span className="flex items-center px-3 bg-slate-100 border border-r-0 border-slate-300 rounded-l-md text-slate-500 text-sm font-medium">
              +91
            </span>
            <Input
              required
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              placeholder="98765 43210"
              className="rounded-l-none"
              pattern="[0-9]{10}"
              title="10-digit mobile number"
            />
          </div>
        </div>
      </div>

      {/* Program + Student count */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Program of Interest <span className="text-red-500">*</span>
          </label>
          <Select
            required
            value={form.program_interest}
            onValueChange={setSelect("program_interest")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent>
              {programs.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Approximate Student Count <span className="text-red-500">*</span>
          </label>
          <Select
            required
            value={form.student_count}
            onValueChange={setSelect("student_count")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select batch size" />
            </SelectTrigger>
            <SelectContent>
              {STUDENT_COUNTS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Preferred month */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Preferred Month{" "}
          <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <Select
          value={form.preferred_month}
          onValueChange={setSelect("preferred_month")}
        >
          <SelectTrigger>
            <SelectValue placeholder="When are you planning?" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Additional Notes{" "}
          <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <Textarea
          value={form.notes}
          onChange={set("notes")}
          placeholder="Any specific requirements, skill level of students, constraints, or questions?"
          rows={4}
        />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {errorMsg}
        </div>
      )}

      <Button
        type="submit"
        variant="amber"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Proposal Request"
        )}
      </Button>

      <p className="text-xs text-slate-400 text-center">
        Your information is only used to prepare your program proposal. No
        spam, ever.
      </p>
    </form>
  );
}
