"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, GripVertical, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { ContactIcon } from "@/components/site/contact-icon";
import { deleteContactLink, reorderContactLinks } from "@/app/actions/admin";
import type { ContactLink } from "@/lib/types";

export function ContactLinksList({ initial }: { initial: ContactLink[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [pending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);
    startTransition(async () => {
      const res = await reorderContactLinks(reordered.map((i) => i.id));
      if (!res.ok) toast.error("Could not save order");
      else router.refresh();
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-2">
          {items.map((l) => (
            <SortableRow key={l.id} item={l} />
          ))}
        </ul>
      </SortableContext>
      {pending && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
          <Loader2 className="h-3 w-3 animate-spin" /> Saving order…
        </p>
      )}
    </DndContext>
  );
}

function SortableRow({ item }: { item: ContactLink }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={
        "flex items-center gap-3 rounded-xl border border-white/[0.06] bg-ink-900/90  p-3 " +
        (isDragging ? "ring-2 ring-accent-blue/40" : "")
      }
    >
      <button
        type="button"
        className="cursor-grab text-zinc-500 hover:text-white touch-none"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300">
        <ContactIcon name={item.icon} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-white">{item.label}</div>
        <div className="font-mono text-[11px] text-zinc-500 truncate">
          {item.href}
        </div>
      </div>
      <Button asChild variant="ghost" size="sm">
        <Link href={`/admin/contact-links/${item.id}`}>
          <Pencil className="h-3.5 w-3.5" /> Edit
        </Link>
      </Button>
      <DeleteButton id={item.id} action={async (id) => deleteContactLink(id)} />
    </li>
  );
}
