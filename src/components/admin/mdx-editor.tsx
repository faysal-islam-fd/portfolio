"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] rounded-lg border border-white/10 bg-ink-900/40 animate-pulse" />
  ),
});

export function MdxEditor({
  value,
  onChange,
  height = 460,
}: {
  value: string;
  onChange: (v: string) => void;
  height?: number;
}) {
  return (
    <div data-color-mode="dark" className="rounded-lg overflow-hidden border border-white/10">
      <MDEditor
        value={value}
        onChange={(v) => onChange(v ?? "")}
        height={height}
        preview="edit"
        visibleDragbar={false}
      />
    </div>
  );
}
