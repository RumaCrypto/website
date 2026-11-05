"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useTranslations } from "@/context/translations/TranslationsContext";
import { appUrl } from "@/lib/appConfig";
import { defaultRailIndex, useRails } from "@/lib/rails";
import Phone from "@/components/Phone";
import AppShot from "@/components/AppShot";
import Flag from "@/components/Flag";

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

  // The note beside the phone cycles through where money can land
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
            <a href={appUrl} className="button button--ink">
              {t("cta")}
            </a>
            <p className="hero__note">{t("cta_note")}</p>
          </div>
        </div>

        <div data-load style={{ "--d": "300ms" } as CSSProperties} className="hero__visual">
          <Phone className="phone--hero">
            <AppShot name="onboarding" lang={lang} priority />
          </Phone>

          {/* Where money can land: every country Ruma pays out in */}
          <div aria-hidden="true" className="hero__reach">
            <span className="hero__flags">
              {rails.map((r) => (
                <Flag key={r.code} code={r.code} />
              ))}
            </span>
            {(t("countries") as string).replace("{n}", String(rails.length))}
          </div>

          <div aria-hidden="true" className="toast">
            <span className="toast__avatar">
              {(t("recipient") as string).charAt(0)}
              <Flag key={rail.code} code={rail.code} className="toast__flag" />
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
