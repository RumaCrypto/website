"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useTranslations } from "@/context/translations/TranslationsContext";
import { appUrl } from "@/lib/appConfig";
import { defaultRailIndex, useRails } from "@/lib/rails";
import Phone from "@/components/Phone";
import { SendScreen } from "@/components/AppScreens";

const CYCLE_MS = 2800;

export default function Hero({ lang }: { lang: string }) {
  const t = useTranslations("hero");
  const rails = useRails();
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(() => defaultRailIndex(rails, lang));
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The phone cycles through the methods; never under reduced motion or off screen
  useEffect(() => {
    if (reduce || !onScreen) return;
    const id = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % rails.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, onScreen, rails.length]);

  const rail = rails[index];

  return (
    <section ref={sectionRef} aria-labelledby="hero-title" className="hero">
      <div className="frame hero__inner">
        <div className="hero__copy">
          <h1 id="hero-title" className="lines hero__title">
            <span className="line">
              <span data-line style={{ "--i": 0 } as CSSProperties}>
                {t("line_1")}
              </span>
            </span>
            <span className="line">
              <span data-line style={{ "--i": 1 } as CSSProperties}>
                {t("line_2")}
              </span>
            </span>
          </h1>
          <p data-load style={{ "--d": "420ms" } as CSSProperties} className="hero__lead">
            {t("lead")}
          </p>
          <div data-load style={{ "--d": "480ms" } as CSSProperties} className="hero__cta">
            <a href={appUrl} className="button button--white">
              {t("cta")}
            </a>
            <p className="hero__note">{t("cta_note")}</p>
          </div>
        </div>

        <div data-load style={{ "--d": "300ms" } as CSSProperties} className="hero__visual">
          <Phone className="phone--hero">
            <SendScreen rail={rail} />
          </Phone>
          <div aria-hidden="true" data-ui className="toast">
            <span className="toast__check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <span className="toast__text">
              <span className="toast__title">{t("sent_title")}</span>
              <span key={rail.code} className="toast__sub">
                {t("sent_to")} · {rail.method}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
