"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadFile } from "@/app/actions/upload";

type Bucket = "avatars" | "projects" | "research" | "posts" | "resumes" | "site";

export function ImageUpload({
  value,
  onChange,
  bucket,
  label = "Image",
}: {
  value: string | null | undefined;
  onChange: (url: string) => void;
  bucket: Bucket;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(false);

  const handleFile = async (file: File) => {
    setPending(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadFile(bucket, fd);
    setPending(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    onChange(res.url);
    toast.success("Uploaded");
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-200">{label}</label>

      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="relative aspect-[16/10] w-full sm:w-56 shrink-0 rounded-xl border border-dashed border-white/10 bg-white/[0.02] overflow-hidden flex items-center justify-center">
          {value ? (
            <>
              <Image
                src={value}
                alt={label}
                fill
                className="object-cover"
                sizes="220px"
              />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute top-1.5 right-1.5 inline-flex h-6 w-6 items-center justify-center rounded-md bg-black/70 text-white hover:bg-red-500/80 transition-colors"
                aria-label="Clear image"
              >
                <X className="h-3 w-3" />
              </button>
            </>
          ) : (
            <ImageIcon className="h-7 w-7 text-zinc-600" />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <Input
            type="text"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https:// or upload below"
          />
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/*,application/pdf"
              hidden
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) await handleFile(f);
                if (inputRef.current) inputRef.current.value = "";
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading…
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5" /> Upload to Supabase
                </>
              )}
            </Button>
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              bucket · {bucket}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
