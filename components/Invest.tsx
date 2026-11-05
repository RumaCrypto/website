"use client";

import { CSSProperties } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";

/**
 * Investing is not in the app yet, so this says so plainly: no screen, no
 * assets, no balances, only what is coming and a way to hear when it lands.
 */
export default function Invest({ lang }: { lang: string }) {
  const t = useTranslations("invest");

  return (
    <section aria-labelledby="invest-title" className="section">
      <div className="frame">
        <div className="panel panel--gold invest">
          <div className="invest__copy">
            <span data-reveal className="invest__badge">
              {t("badge")}
            </span>
            <h2 id="invest-title" data-reveal style={{ "--i": 1 } as CSSProperties} className="h2">
              {t("heading")}
            </h2>
            <p data-reveal style={{ "--i": 2 } as CSSProperties} className="lead">
              {t("text")}
            </p>
            <a data-reveal style={{ "--i": 3 } as CSSProperties} href={`/${lang}#novedades`} className="button button--ink">
              {t("action")}
            </a>
          </div>

          {/* A rising line, as a mark of what is coming; not a chart of anything */}
          <svg aria-hidden="true" viewBox="0 0 240 160" className="invest__mark">
            <path d="M12 140 L72 96 L116 116 L176 52 L228 20" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M188 20 H228 V60" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
