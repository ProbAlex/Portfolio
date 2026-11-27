"use client";

import { useEffect } from "react";

const HIGHLIGHT_MS = 2400;
const ROUTER_SETTLE_MS = 80;

// Document offset that ignores CSS transforms (the reveal animation shifts the
// bounding rect by a few pixels while it plays).
function documentTop(el) {
  let top = 0;
  for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
  return top;
}

// Scrolls to the element named in the URL hash and briefly outlines it.
// CSS :target doesn't fire after Next's client-side navigation (it uses
// pushState), and Next's own hash scrolling can race with ours, so on mount
// we wait for the router to settle and then scroll to an exact position.
// In-page jumps (plain #links) are scrolled natively; we only highlight them.
export default function HashHighlighter() {
  useEffect(() => {
    let highlightTimer;

    function highlight({ scroll }) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      if (scroll) {
        const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        window.scrollTo({ top: documentTop(el) - margin, behavior: "instant" });
      }

      if (!el.hasAttribute("data-highlight")) return;
      document.querySelectorAll(".is-targeted").forEach((node) => node.classList.remove("is-targeted"));
      el.classList.add("is-targeted");
      clearTimeout(highlightTimer);
      highlightTimer = setTimeout(() => el.classList.remove("is-targeted"), HIGHLIGHT_MS);
    }

    const onHashChange = () => highlight({ scroll: false });
    const settleTimer = setTimeout(() => highlight({ scroll: true }), ROUTER_SETTLE_MS);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      clearTimeout(settleTimer);
      clearTimeout(highlightTimer);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
