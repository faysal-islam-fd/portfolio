"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteMessage, markMessageRead } from "@/app/actions/admin";

export function MessageActions({
  id,
  isRead,
}: {
  id: string;
  isRead: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const toggle = () =>
    startTransition(async () => {
      const res = await markMessageRead(id, !isRead);
      if (res.ok) router.refresh();
      else toast.error(res.error ?? "Failed");
    });

  const remove = () =>
    startTransition(async () => {
      const res = await deleteMessage(id);
      if (res.ok) {
        toast.success("Deleted");
        router.refresh();
      } else toast.error(res.error ?? "Failed");
    });

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="sm" onClick={toggle} disabled={pending}>
        {isRead ? <Mail className="h-3.5 w-3.5" /> : <MailOpen className="h-3.5 w-3.5" />}
        <span className="hidden sm:inline">{isRead ? "Mark unread" : "Mark read"}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={remove}
        disabled={pending}
        className="text-zinc-400 hover:text-red-400"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
