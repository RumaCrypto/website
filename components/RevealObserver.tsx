"use client";

import { useEffect } from "react";

/**
 * Marks every [data-reveal] element as it enters the viewport, once.
 *
 * The mark is a `data-shown` attribute, not a class: React rewrites the
 * className of any element whose classes it renders dynamically, which
 * would wipe a class added here and hide the element again. Elements
 * mounted later (a step player re-rendering, a fast refresh) are picked up
 * by the mutation observer.
 *
 * The hidden starting state only exists under `html.js` and
 * prefers-reduced-motion: no-preference (see globals.css), so content is
 * never left invisible if this never runs.
 */
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.shown = "";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    const watch = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));

    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
