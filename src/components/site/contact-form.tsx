"use client";

import { useState, useTransition } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactMessage } from "@/app/actions/contact";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const res = await submitContactMessage(formData);
      if (res.success) {
        toast.success("Message sent. I'll get back to you soon.");
        setSubmitted(true);
      } else {
        toast.error(res.error ?? "Something went wrong. Try again?");
      }
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-glow-sm">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-white">
          Message received
        </h3>
        <p className="mt-2 max-w-sm text-sm text-zinc-400">
          Thanks for reaching out. I'll reply directly to your email within 24
          hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-xs font-mono uppercase tracking-wider text-accent-blue hover:text-white transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Ada Lovelace"
            required
            minLength={2}
            disabled={isPending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="ada@example.com"
            required
            disabled={isPending}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject (optional)</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Research collaboration · CV consulting · Hiring"
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about the problem you're working on…"
          rows={6}
          required
          minLength={10}
          maxLength={4000}
          disabled={isPending}
        />
        <p className="text-xs text-zinc-500 font-mono">
          Minimum 10 characters · Max 4,000.
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="submit" size="lg" disabled={isPending} className="min-w-[160px]">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
