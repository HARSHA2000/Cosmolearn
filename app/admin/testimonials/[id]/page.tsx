import { notFound } from "next/navigation";
import { adminGetTestimonial } from "@/lib/content";
import { TestimonialForm } from "../TestimonialForm";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await adminGetTestimonial(id);
  if (!testimonial) notFound();

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-white font-display font-bold text-2xl mb-8">Edit Testimonial</h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
