"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { submitContactMessage } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

const BUDGETS = ["Under $2k", "$2k – $5k", "$5k – $15k", "$15k+", "Not sure yet"];
const TIMELINES = ["ASAP", "Within a month", "1–3 months", "Just exploring"];

const field =
  "w-full border border-fg/30 bg-paper-2/60 px-3.5 py-3 text-[15px] text-fg placeholder:text-fg-3 transition-colors focus:border-signal focus:outline-none disabled:opacity-60";

export function ProjectForm({
  services,
  defaultService,
}: {
  services: { slug: string; name: string }[];
  defaultService?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        toast.error(res.error ?? "Something went wrong. Please try again, or email me directly.");
      }
    });
  };

  if (submitted) {
    return (
      <div className="ticks ticks-signal bg-paper-2/60 p-8 sm:p-10" role="status">
        <p className="kicker text-signal">Received</p>
        <h3 className="display mt-3 text-4xl">Thanks — I&apos;ll be in touch.</h3>
        <p className="mt-4 max-w-md text-fg-2 leading-relaxed">
          I read every message myself and reply within 24 hours, usually with a few
          questions or a time for a short call.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-fg-3 ulink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-7">
      {/* Honeypot */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name">
          <input id="name" name="name" required minLength={2} maxLength={100} autoComplete="name" className={field} disabled={isPending} />
        </Field>
        <Field label="Work email" htmlFor="email">
          <input id="email" name="email" type="email" required autoComplete="email" className={field} disabled={isPending} />
        </Field>
      </div>

      <Field label="Company or project" htmlFor="company" optional>
        <input id="company" name="company" maxLength={120} autoComplete="organization" className={field} disabled={isPending} />
      </Field>

      <fieldset>
        <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {[...services, { slug: "other", name: "Something else" }].map((s) => (
            <Choice
              key={s.slug}
              name="service"
              value={s.name}
              label={s.name}
              defaultChecked={s.slug === (defaultService ?? "")}
              disabled={isPending}
            />
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <fieldset>
          <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg">
            Budget <span className="font-normal text-fg-3">(optional)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map((b) => (
              <Choice key={b} name="budget" value={b} label={b} disabled={isPending} />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg">
            Timeline <span className="font-normal text-fg-3">(optional)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map((t) => (
              <Choice key={t} name="timeline" value={t} label={t} disabled={isPending} />
            ))}
          </div>
        </fieldset>
      </div>

      <Field label="What are you trying to get done?" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          placeholder="The workflow or product, the data it touches, and what “done” looks like."
          className={cn(field, "resize-y")}
          disabled={isPending}
        />
      </Field>

      <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-3">Goes straight to my inbox. No newsletter, no sharing.</p>
        <button type="submit" disabled={isPending} className="btn btn-solid h-12 px-7 disabled:opacity-60">
          {isPending ? "Sending…" : "Send message →"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-fg">
        {label} {optional && <span className="font-normal text-fg-3">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

function Choice({
  name,
  value,
  label,
  defaultChecked,
  disabled,
}: {
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="peer sr-only"
      />
      <span className="inline-flex border border-fg/30 px-3 py-1.5 text-sm text-fg-2 transition-colors hover:border-fg peer-checked:border-signal peer-checked:bg-signal peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal">
        {label}
      </span>
    </label>
  );
}
