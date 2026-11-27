"use client";

import { useEffect, useState } from "react";
import LogoMark from "@/components/Logo";

const NAME = "Alexander Dial";

// Play only when the browser's first page load is /. During that load the
// server-rendered overlay is already in the DOM when React hydrates; after a
// client-side navigation to Home it isn't, so the intro is skipped. The module
// flag also covers coming back to Home later in the same session.
let introPlayed = false;

function shouldPlay() {
  if (typeof window === "undefined") return true; // server render of a fresh load
  return !introPlayed && document.querySelector(".intro-overlay") !== null;
}

// The animation itself is pure CSS (see .intro-* in globals.css), so it also runs
// before hydration and never needs JS to get out of the way. While it's in the
// DOM, :has(.intro-overlay) pushes the page's reveal animations back to start as
// the curtain lifts.
export default function IntroOverlay() {
  const [show] = useState(shouldPlay);

  useEffect(() => {
    introPlayed = true;
  }, []);

  if (!show) return null;

  return (
    <div className="intro-overlay" aria-hidden="true">
      <div className="flex flex-col items-center px-4 text-center">
        <LogoMark className="intro-mark h-16 w-16 md:h-20 md:w-20" />
        <p className="intro-name mt-6 text-[clamp(2.25rem,9vw,4.5rem)] font-semibold leading-none tracking-[-0.035em] text-white">
          {NAME.split("").map((char, index) => (
            <span key={index} className="intro-char" style={{ "--c": index }}>
              {char === " " ? " " : char}
            </span>
          ))}
        </p>
        <span className="intro-line mt-6" />
      </div>
    </div>
  );
}
