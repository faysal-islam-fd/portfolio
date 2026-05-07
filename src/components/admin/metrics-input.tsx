"use client";

import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Metric } from "@/lib/types";

export function MetricsInput({
  value,
  onChange,
  label = "Metrics",
}: {
  value: Metric[];
  onChange: (metrics: Metric[]) => void;
  label?: string;
}) {
  const update = (i: number, patch: Partial<Metric>) => {
    const next = [...value];
    next[i] = { ...next[i]!, ...patch };
    onChange(next);
  };
  const add = () => onChange([...value, { label: "", value: "" }]);
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-200">{label}</label>
        <Button type="button" variant="ghost" size="sm" onClick={add}>
          <Plus className="h-3.5 w-3.5" /> Add metric
        </Button>
      </div>
      {value.length === 0 ? (
        <p className="text-xs text-zinc-500">No metrics yet.</p>
      ) : (
        <div className="space-y-2">
          {value.map((m, i) => (
            <div key={i} className="grid grid-cols-12 gap-2">
              <Input
                className="col-span-5"
                placeholder="Label (e.g. AUC)"
                value={m.label}
                onChange={(e) => update(i, { label: e.target.value })}
              />
              <Input
                className="col-span-4"
                placeholder="Value (e.g. 0.91)"
                value={m.value}
                onChange={(e) => update(i, { value: e.target.value })}
              />
              <Input
                className="col-span-2"
                placeholder="Unit"
                value={m.unit ?? ""}
                onChange={(e) => update(i, { unit: e.target.value })}
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="col-span-1 inline-flex items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:text-red-400 hover:border-red-500/30"
                aria-label="Remove"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
