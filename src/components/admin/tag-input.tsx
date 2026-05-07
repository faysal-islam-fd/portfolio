"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TagInput({
  value,
  onChange,
  placeholder = "Type and press Enter…",
  label,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const t = draft.trim();
    if (!t) return;
    if (value.includes(t)) {
      setDraft("");
      return;
    }
    onChange([...value, t]);
    setDraft("");
  };

  const remove = (t: string) => onChange(value.filter((v) => v !== t));

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add();
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-zinc-200">{label}</label>
      )}
      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/10 bg-ink-900/60 p-1.5">
        {value.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs text-zinc-200"
          >
            {t}
            <button
              type="button"
              onClick={() => remove(t)}
              className="text-zinc-500 hover:text-red-400"
              aria-label={`Remove ${t}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          onBlur={add}
          placeholder={placeholder}
          className="flex-1 min-w-[160px] bg-transparent px-2 py-1 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
        />
      </div>
    </div>
  );
}
