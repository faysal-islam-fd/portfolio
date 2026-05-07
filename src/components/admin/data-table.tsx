import Link from "next/link";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  className?: string;
  cell?: (row: T) => React.ReactNode;
}

export function DataTable<T extends { id: string }>({
  rows,
  columns,
  editHref,
  rowAction,
  empty = "No items yet.",
}: {
  rows: T[];
  columns: Column<T>[];
  editHref: (row: T) => string;
  rowAction?: (row: T) => React.ReactNode;
  empty?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center">
        <p className="text-sm text-zinc-500">{empty}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 backdrop-blur-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              {columns.map((c, i) => (
                <th
                  key={i}
                  className={cn(
                    "px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500",
                    c.className
                  )}
                >
                  {c.header}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                {columns.map((c, i) => (
                  <td
                    key={i}
                    className={cn("px-4 py-3 align-middle text-zinc-200", c.className)}
                  >
                    {c.cell ? c.cell(row) : (row as any)[c.key]}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-1">
                    <Link
                      href={editHref(row)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                      aria-label="Edit"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                    {rowAction?.(row)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
