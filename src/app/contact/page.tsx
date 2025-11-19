"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof Schema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(Schema) });

  const onSubmit = async (data: FormData) => {
    toast.success("Message sent!");
    reset();
  };

  const onError = () => {
    toast.error("Please fix validation errors");
  };

  return (
    <main className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            {...register("fullName")}
            className="mt-1 w-full border rounded px-3 py-2"
          />
          {errors.fullName && (
            <p className="text-rose-600 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Subject</label>
          <input
            {...register("subject")}
            className="mt-1 w-full border rounded px-3 py-2"
          />
          {errors.subject && (
            <p className="text-rose-600 text-sm">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email")}
            className="mt-1 w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-rose-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            {...register("message")}
            rows={5}
            className="mt-1 w-full border rounded px-3 py-2"
          />
          {errors.message && (
            <p className="text-rose-600 text-sm">{errors.message.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="px-4 py-2 rounded bg-black text-white"
        >
          Send
        </button>
      </form>
    </main>
  );
}
