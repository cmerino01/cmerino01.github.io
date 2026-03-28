"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Home } from "lucide-react";

const navLinks = [
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "other", href: "/other", disabled: true },
];

export default function Nav() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {/* Pill Nav — top center */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <div
          className="relative flex items-center border border-foreground/20 rounded-full px-1 py-1 bg-background/80 backdrop-blur-sm"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            const isHovered = hoveredIndex === i;

            return (
              <span key={link.href} className="flex items-center">
                {link.disabled ? (
                  <span
                    className="relative px-4 py-1.5 text-xs tracking-widest text-foreground/20 cursor-not-allowed rounded-full select-none"
                    title="coming soon"
                  >
                    {link.label}
                  </span>
                ) : isActive ? (
                  <span className="relative px-4 py-1.5 text-xs tracking-widest text-foreground/30 cursor-default rounded-full">
                    <span className="absolute inset-0 rounded-full bg-foreground/5" />
                    <span className="relative">{link.label}</span>
                  </span>
                ) : (
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHoveredIndex(i)}
                    className="relative px-4 py-1.5 text-xs tracking-widest text-muted-foreground transition-colors duration-200 rounded-full"
                    style={{ color: isHovered ? "var(--foreground)" : undefined }}
                  >
                    {/* Sliding hover background */}
                    <span
                      className="absolute inset-0 rounded-full bg-foreground/8 shadow-sm"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "scale(1)" : "scale(0.85)",
                        transition: "opacity 180ms ease, transform 180ms ease",
                      }}
                    />
                    <span className="relative">{link.label}</span>
                  </Link>
                )}
                {i < navLinks.length - 1 && (
                  <span
                    className="w-px h-3 bg-foreground/20 transition-opacity duration-150"
                    style={{ opacity: hoveredIndex === i || hoveredIndex === i + 1 ? 0 : 1 }}
                  />
                )}
              </span>
            );
          })}
        </div>

        {/* Connector stem */}
        <div className="w-px h-2.5 bg-foreground/20" />

        {/* Home button — hangs below the pill */}
        <Link
          href="/"
          aria-label="Home"
          className="w-7 h-7 flex items-center justify-center rounded-full border border-foreground/20 bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors duration-200"
        >
          <Home size={16} />
        </Link>
      </nav>

      {/* Theme toggle — top left */}
      <div className="fixed top-6 left-8 z-50">
        <ThemeToggle />
      </div>
    </>
  );
}
