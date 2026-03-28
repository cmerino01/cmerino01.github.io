"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

let isFirstLoad = true;

const ease = [0.76, 0, 0.24, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const [firstLoad] = useState(() => {
    const first = isFirstLoad;
    if (isFirstLoad) isFirstLoad = false;
    return first;
  });

  const turbRef = useRef<SVGFETurbulenceElement | null>(null);
  const displaceRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const rafRef = useRef<number>(0);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (firstLoad) return;

    setGlitchActive(true);
    let startTime: number | null = null;
    const duration = 600;

    const tick = (time: number) => {
      if (!startTime) startTime = time;
      const t = Math.min((time - startTime) / duration, 1);

      // Intensity high at start, fades as page stabilises
      const intensity = Math.pow(1 - t, 0.6) * 80;
      // Rapidly stepping seed creates the "jumping frames" glitch feel
      const seed = Math.floor(time / 20) % 30;

      turbRef.current?.setAttribute("seed", String(seed));
      // Low X freq = wide horizontal bands; high Y freq = lots of independent rows
      turbRef.current?.setAttribute(
        "baseFrequency",
        `0.002 ${0.3 + (1 - t) * 0.5}`
      );
      displaceRef.current?.setAttribute("scale", String(Math.max(0, intensity)));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        displaceRef.current?.setAttribute("scale", "0");
        setGlitchActive(false);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [firstLoad]);

  return (
    <>
      {/* SVG displacement filter — only referenced when glitchActive */}
      <svg
        aria-hidden
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter
            id="crt-glitch"
            x="-20%"
            y="0%"
            width="140%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbRef}
              type="turbulence"
              baseFrequency="0.002 0.8"
              numOctaves="1"
              seed="0"
              result="turbulence"
            />
            <feDisplacementMap
              ref={displaceRef}
              in="SourceGraphic"
              in2="turbulence"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Outer div applies displacement filter; inner motion.div handles scaleY */}
      <div style={{ filter: glitchActive ? "url(#crt-glitch)" : undefined }}>
        <motion.div
          initial={{ scaleY: 0, filter: "brightness(3)" }}
          animate={{
            scaleY: 1,
            filter: "brightness(1)",
            transition: { duration: firstLoad ? 0.5 : 0.45, ease },
          }}
          exit={{
            scaleY: 0,
            filter: "brightness(3)",
            transition: { duration: 0.3, ease },
          }}
          style={{ transformOrigin: "center" }}
          suppressHydrationWarning
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
