"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const ASCII = `
  ██████╗███╗   ███╗
 ██╔════╝████╗ ████║
 ██║     ██╔████╔██║
 ██║     ██║╚██╔╝██║
 ╚██████╗██║ ╚═╝ ██║
  ╚═════╝╚═╝     ╚═╝`.trim();

const LINKEDIN = "https://www.linkedin.com/in/chrismerinobrito/";
const RESUME: string | null = "/resume.pdf";

const COMPLETIONS = [
  "whoami",
  "help",
  "ls",
  "ls pages",
  "clear",
  "cls",
  "cat interests.txt",
  "cd about",
  "cd projects",
  "cd other",
  "goto about",
  "goto projects",
  "goto other",
  "linkedin",
  "resume",
];

const HELP = [
  "available commands:",
  "  ?  |  help          — show this help",
  "  whoami              — display user info",
  "  cat interests.txt   — list interests",
  "  ls                  — list available pages",
  "  cd <page>           — navigate to page",
  "  linkedin            — open linkedin profile",
  "  resume              — open resume",
  "  clear               — clear terminal",
  "",
  "pages: about, projects",
];

type Line =
  | { type: "ascii" }
  | { type: "spacer" }
  | { type: "prompt"; cmd: string }
  | { type: "output"; text: string }
  | { type: "error"; text: string };

const INITIAL: Line[] = [
  { type: "ascii" },
  { type: "spacer" },
  { type: "output", text: "welcome to merinocodes.com" },
  { type: "output", text: "hint: try 'linkedin' or 'resume'" },
  { type: "output", text: "type ? for all commands" },
  { type: "spacer" },
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(INITIAL);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [tabIdx, setTabIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const push = useCallback((...newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const handleCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      const lower = cmd.toLowerCase();

      if (!cmd) return;

      push({ type: "prompt", cmd });

      switch (lower) {
        case "?":
        case "help":
          push({ type: "spacer" });
          HELP.forEach((t) => push({ type: "output", text: t }));
          push({ type: "spacer" });
          break;

        case "whoami":
          push(
            { type: "spacer" },
            { type: "output", text: "christopher merino brito" },
            { type: "output", text: "software engineer @ microsoft" },
            { type: "output", text: "los angeles, ca" },
            { type: "spacer" },
          );
          break;

        case "cat interests.txt":
          push(
            { type: "spacer" },
            {
              type: "output",
              text: "gaming  hardware  streaming  open-source",
            },
            { type: "spacer" },
          );
          break;

        case "ls":
        case "ls pages":
          push(
            { type: "spacer" },
            { type: "output", text: "about/      — who i am" },
            { type: "output", text: "projects/   — work & projects" },
            { type: "output", text: "other/      — [under construction]" },
            { type: "spacer" },
          );
          break;

        case "cd about":
        case "goto about":
          push({ type: "output", text: "navigating to /about..." });
          setTimeout(() => router.push("/about"), 500);
          break;

        case "cd projects":
        case "goto projects":
          push({ type: "output", text: "navigating to /projects..." });
          setTimeout(() => router.push("/projects"), 500);
          break;

        case "cd other":
        case "goto other":
          push(
            { type: "spacer" },
            { type: "error", text: "bash: cd: other: directory not ready" },
            { type: "output", text: "this page is under construction." },
            { type: "spacer" },
          );
          break;

        case "linkedin":
          push({ type: "output", text: "opening linkedin..." });
          setTimeout(() => window.open(LINKEDIN, "_blank", "noopener,noreferrer"), 400);
          break;

        case "resume":
          if (RESUME) {
            push({ type: "output", text: "opening resume..." });
            setTimeout(() => window.open(RESUME, "_blank", "noopener,noreferrer"), 400);
          } else {
            push({ type: "error", text: "resume: not yet available" });
          }
          break;

        case "clear":
          setLines(INITIAL);
          setInput("");
          setCmdHistory([]);
          setHistoryIdx(-1);
          return;

        case "cls":
          setLines(INITIAL);
          setInput("");
          setCmdHistory([]);
          setHistoryIdx(-1);
          return;

        default:
          push({
            type: "error",
            text: `command not found: ${cmd}  (type ? for help)`,
          });
      }

      setCmdHistory((prev) => [cmd, ...prev]);
      setHistoryIdx(-1);
      setInput("");
    },
    [push, router],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const matches = COMPLETIONS.filter(c =>
        c.startsWith(input.toLowerCase()) && c !== input.toLowerCase()
      );
      if (matches.length === 0) return;
      const next = tabIdx % matches.length;
      setInput(matches[next]);
      setTabIdx(next + 1);
    } else if (e.key === "Enter") {
      handleCommand(input);
      setTabIdx(0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next]);
    } else {
      setTabIdx(0);
    }
  };

  return (
    <div
      className="w-full min-h-screen font-[family-name:var(--font-geist-mono)] text-sm flex flex-col cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-foreground/20 px-6 py-3 shrink-0">
        <span className="text-xs text-muted-foreground tracking-widest">
          cm@merinocodes:~
        </span>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border border-foreground/20" />
          <span className="w-2.5 h-2.5 rounded-full border border-foreground/20" />
          <span className="w-2.5 h-2.5 rounded-full border border-foreground/20" />
        </div>
      </div>

      {/* Output */}
      <div className="flex-1 p-6 space-y-0.5 overflow-y-auto">
        {lines.map((line, i) => {
          if (line.type === "ascii")
            return (
              <pre
                key={i}
                className="text-foreground/30 text-[10px] leading-tight mb-4 select-none"
              >
                {ASCII}
              </pre>
            );
          if (line.type === "spacer") return <div key={i} className="h-2" />;
          if (line.type === "prompt")
            return (
              <p key={i}>
                <span className="text-muted-foreground">
                  cm@merinocodes:~${" "}
                </span>
                <span>{line.cmd}</span>
              </p>
            );
          if (line.type === "error")
            return (
              <p key={i} className="text-foreground/50 pl-2">
                {line.text}
              </p>
            );
          return (
            <p key={i} className="text-muted-foreground pl-2">
              {line.text}
            </p>
          );
        })}

        {/* Active input line */}
        <div className="flex items-center">
          <span className="text-muted-foreground shrink-0">
            cm@merinocodes:~$&nbsp;
          </span>
          <div className="relative flex items-center flex-1">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 w-full bg-transparent outline-none opacity-0"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
            <span>{input}</span>
            <span
              className="inline-block w-[9px] h-[1.1em] bg-foreground ml-px"
              style={{ animation: "blink 1s step-end infinite" }}
            />
          </div>
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
