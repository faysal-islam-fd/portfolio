"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  speed?: number;
  pause?: number;
  className?: string;
}

export function Typewriter({
  words,
  speed = 60,
  pause = 1500,
  className = "",
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    if (!words.length) return;
    const current = words[index % words.length] ?? "";

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          speed + Math.random() * 30
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("deleting"), pause);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          speed * 0.5
        );
        return () => clearTimeout(t);
      }
      setIndex((i) => (i + 1) % words.length);
      setPhase("typing");
    }
  }, [text, phase, index, words, speed, pause]);

  return (
    <span className={className}>
      <span>{text}</span>
      <span className="ml-0.5 inline-block w-[2px] h-[1em] -mb-1 bg-accent-blue animate-blink" />
    </span>
  );
}
