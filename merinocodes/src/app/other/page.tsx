import Nav from "@/components/nav";
import Link from "next/link";

const progressPct = 32;

export default function Other() {
  return (
    <main className="min-h-screen bg-background text-foreground font-[family-name:var(--font-geist-mono)] flex flex-col items-center justify-center p-8">
      <Nav />

      <div className="w-full max-w-lg space-y-0">
        {/* Title bar */}
        <div className="flex items-center justify-between border border-b-0 border-foreground/20 px-4 py-2">
          <span className="text-xs text-muted-foreground tracking-widest">terminal</span>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full border border-foreground/20" />
            <span className="w-2 h-2 rounded-full border border-foreground/20" />
            <span className="w-2 h-2 rounded-full border border-foreground/20" />
          </div>
        </div>

        {/* Body */}
        <div className="border border-foreground/20 p-6 space-y-4 text-sm">

          <div className="space-y-1">
            <p>
              <span className="text-muted-foreground">cm@merinocodes:~$ </span>
              cd /other
            </p>
            <p className="text-muted-foreground pl-2">
              bash: cd: /other: directory not ready
            </p>
          </div>

          <div className="space-y-1">
            <p>
              <span className="text-muted-foreground">cm@merinocodes:~$ </span>
              build --target other --watch
            </p>
            <p className="text-muted-foreground pl-2">initializing build pipeline...</p>
            <p className="text-muted-foreground pl-2">compiling thoughts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[  ok  ]</p>
            <p className="text-muted-foreground pl-2">drafting posts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[  ok  ]</p>
            <p className="text-muted-foreground pl-2">questioning decisions &nbsp;[ warn ]</p>
            <p className="text-muted-foreground pl-2">shipping &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ wait ]</p>
          </div>

          {/* Progress bar */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 border border-foreground/20 overflow-hidden">
                <div
                  className="h-full bg-foreground/60"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-muted-foreground text-xs tabular-nums">{progressPct}%</span>
            </div>
            <p className="text-muted-foreground text-xs">
              estimated completion: someday™
            </p>
          </div>

          {/* Cursor line */}
          <div className="flex items-center gap-1 pt-2">
            <span className="text-muted-foreground">cm@merinocodes:~$</span>
            <span
              className="inline-block w-[9px] h-[1.1em] bg-foreground"
              style={{ animation: "blink 1s step-end infinite" }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border border-t-0 border-foreground/20 px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">exit code: 1</span>
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
