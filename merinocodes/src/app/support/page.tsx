"use client";

import Nav from "@/components/nav";
import Link from "next/link";
import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Support() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      formData.append("access_key", "5483e121-dcb3-4f55-81d4-ec9bc40a7b6b");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setState("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-[family-name:var(--font-geist-mono)] flex flex-col items-center justify-center p-8">
      <Nav />

      <div className="w-full max-w-lg space-y-0">
        {/* Title bar */}
        <div className="flex items-center justify-between border border-b-0 border-foreground/20 px-4 py-2">
          <span className="text-xs text-muted-foreground tracking-widest">
            support
          </span>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full border border-foreground/20" />
            <span className="w-2 h-2 rounded-full border border-foreground/20" />
            <span className="w-2 h-2 rounded-full border border-foreground/20" />
          </div>
        </div>

        {/* Body */}
        <div className="border border-foreground/20 p-6 space-y-5 text-sm">
          <div className="space-y-1">
            <p>
              <span className="text-muted-foreground">cm@merinocodes:~$ </span>
              open --channel support
            </p>
            <p className="text-muted-foreground pl-2">
              connection established. fill in the fields below.
            </p>
          </div>

          {state === "success" ? (
            <div className="space-y-2 pt-1">
              <p className="text-muted-foreground pl-2">
                <span className="text-foreground">[ &nbsp;ok&nbsp; ]</span>{" "}
                message transmitted successfully.
              </p>
              <p className="text-muted-foreground pl-2">
                i&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setState("idle")}
                className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground tracking-widest">
                  name
                </label>
                <div className="flex items-center border border-foreground/20 px-3 py-2 focus-within:border-foreground/50 transition-colors">
                  <span className="text-muted-foreground mr-2 select-none">
                    ›
                  </span>
                  <input
                    name="name"
                    required
                    autoComplete="off"
                    placeholder="your name"
                    className="flex-1 bg-transparent outline-none placeholder:text-foreground/20 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground tracking-widest">
                  email
                </label>
                <div className="flex items-center border border-foreground/20 px-3 py-2 focus-within:border-foreground/50 transition-colors">
                  <span className="text-muted-foreground mr-2 select-none">
                    ›
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="off"
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent outline-none placeholder:text-foreground/20 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground tracking-widest">
                  message
                </label>
                <div className="flex items-start border border-foreground/20 px-3 py-2 focus-within:border-foreground/50 transition-colors">
                  <span className="text-muted-foreground mr-2 mt-0.5 select-none">
                    ›
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="describe your issue or inquiry..."
                    className="flex-1 bg-transparent outline-none placeholder:text-foreground/20 text-sm resize-none"
                  />
                </div>
              </div>

              {state === "error" && (
                <p className="text-xs text-muted-foreground pl-2">
                  <span className="text-foreground">[ error ]</span>{" "}
                  transmission failed. please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={state === "submitting"}
                className="w-full border border-foreground/20 px-4 py-2 text-xs tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {state === "submitting" ? "transmitting..." : "send --message"}
              </button>
            </form>
          )}

          {/* Cursor */}
          {state !== "submitting" && (
            <div className="flex items-center gap-1 pt-1">
              <span className="text-muted-foreground">cm@merinocodes:~$</span>
              <span
                className="inline-block w-[9px] h-[1.1em] bg-foreground"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border border-t-0 border-foreground/20 px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">exit code: 0</span>
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            ← go home
          </Link>
        </div>
      </div>
    </main>
  );
}
