"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Brain, Database, CheckCircle2, ChevronRight, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LogLine {
  text: string;
  type: "info" | "system" | "success" | "tool" | "input";
  delay: number;
}

const AGENT_LOGS: LogLine[] = [
  { text: "faysal.ai agent run --task 'crm_auto_reply'", type: "input", delay: 400 },
  { text: "⚡ Initializing AI Agent workflow (LangGraph)...", type: "system", delay: 800 },
  { text: "🤖 Loading LLM: Claude 3.5 Sonnet (Stateful Router)", type: "info", delay: 600 },
  { text: "🔍 Analyzing incoming email context...", type: "info", delay: 900 },
  { text: "📥 Database: Querying Vector DB for relevant context...", type: "tool", delay: 1100 },
  { text: "📦 Pinecone: 3 document chunks retrieved (score > 0.88)", type: "tool", delay: 800 },
  { text: "🧠 Router: Routing to HubSpot CRM tool node...", type: "system", delay: 700 },
  { text: "💼 HubSpot API: Fetched client contact 'Sarah Jenkins'", type: "tool", delay: 1000 },
  { text: "✍️ Composer: Generating customized email draft...", type: "system", delay: 1200 },
  { text: "✨ Response compiled. Confidence score: 98.6%", type: "success", delay: 700 },
  { text: "🚀 CRM updated. Draft saved. Execution time: 1.32s", type: "success", delay: 900 },
];

export function AgentTerminal() {
  const [visibleLines, setVisibleLines] = useState<LogLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [activeNode, setActiveNode] = useState<number>(0);
  const consoleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentLineIndex < AGENT_LOGS.length) {
      const line = AGENT_LOGS[currentLineIndex];
      timeoutId = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        
        // Update active node based on log progress
        if (currentLineIndex <= 1) {
          setActiveNode(0); // Trigger
        } else if (currentLineIndex === 2 || currentLineIndex === 3 || currentLineIndex === 6) {
          setActiveNode(1); // Router
        } else if (currentLineIndex === 4 || currentLineIndex === 5 || currentLineIndex === 7) {
          setActiveNode(2); // Tools
        } else {
          setActiveNode(3); // Execute
        }

        setCurrentLineIndex((prev) => prev + 1);
      }, line.delay);
    } else {
      // Loop: clear and restart after 4 seconds
      timeoutId = setTimeout(() => {
        setVisibleLines([]);
        setCurrentLineIndex(0);
        setActiveNode(0);
      }, 4000);
    }

    return () => clearTimeout(timeoutId);
  }, [currentLineIndex]);

  // Scroll to bottom of terminal container on new log line
  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const nodes = [
    { id: 0, label: "Trigger", icon: Play, color: "text-accent-blue bg-accent-blue/10 border-accent-blue/30" },
    { id: 1, label: "Router", icon: Brain, color: "text-accent-indigo bg-accent-indigo/10 border-accent-indigo/30" },
    { id: 2, label: "Tools", icon: Database, color: "text-amber-400 bg-amber-400/10 border-amber-400/30" },
    { id: 3, label: "Execute", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" },
  ];

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-6">
      {/* Node Workflow Visualizer */}
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-md">
        <div className="flex items-center justify-between gap-2">
          {nodes.map((node, i) => {
            const isActive = activeNode === node.id;
            const Icon = node.icon;
            
            return (
              <div key={node.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5 relative">
                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 ${
                      isActive
                        ? `${node.color.split(" ")[0]} border-current shadow-[0_0_15px_rgba(59,130,246,0.2)] scale-110 bg-white/[0.06]`
                        : "border-white/10 bg-transparent text-zinc-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {isActive && (
                      <span className="absolute -inset-px rounded-xl border border-current animate-ping opacity-35" />
                    )}
                  </div>
                  <span className={`font-mono text-[9px] uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? "text-white font-medium" : "text-zinc-600"
                  }`}>
                    {node.label}
                  </span>
                </div>
                
                {i < nodes.length - 1 && (
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-white/10 mx-2 relative overflow-hidden">
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-accent-blue"
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Window */}
      <div className="rounded-xl border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col h-[280px]">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/60 border-b border-white/5 font-mono text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-zinc-500 flex items-center gap-1">
            <Terminal className="h-3 w-3" /> agent_pipeline.py
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] uppercase tracking-wider text-emerald-500/80">Active</span>
          </div>
        </div>

        {/* Console logs */}
        <div ref={consoleContainerRef} className="p-4 flex-1 overflow-y-auto font-mono text-[11px] leading-relaxed text-zinc-300 select-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          <div className="space-y-1.5">
            <AnimatePresence initial={false}>
              {visibleLines.map((line, index) => {
                let colorClass = "text-zinc-300";
                let prefix = "";

                if (line.type === "input") {
                  colorClass = "text-zinc-100 font-semibold";
                  prefix = "$ ";
                } else if (line.type === "system") {
                  colorClass = "text-accent-indigo";
                } else if (line.type === "tool") {
                  colorClass = "text-amber-400/90";
                } else if (line.type === "success") {
                  colorClass = "text-emerald-400 font-medium";
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={colorClass}
                  >
                    {prefix}{line.text}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
