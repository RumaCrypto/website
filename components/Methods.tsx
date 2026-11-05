"use client";

/* eslint-disable @next/next/no-img-element */
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";
import { defaultRailIndex, formatLocal, useRails } from "@/lib/rails";
import type { Rates } from "@/lib/rates";
import Flag from "@/components/Flag";

/** The example amount the route converts. */
const SEND_USD = 50;

/**
 * One question, one route. The visitor says where their family is and sees
 * the money travel from them, through Ruma, into that country's method,
 * with what it comes to in their currency at P2P.ME's sell price.
 */
export default function Methods({ lang, rates }: { lang: string; rates: Rates }) {
  const t = useTranslations("methods");
  const recipient = useTranslations("hero")("recipient");
  const rails = useRails();

  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(() => defaultRailIndex(rails, lang));
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rail = rails[index];
  const rate = rates[rail.code];

  return (
    <section
      ref={sectionRef}
      id="envios"
      aria-labelledby="methods-title"
      className={`section methods ${onScreen ? "" : "is-paused"}`}
    >
      <div className="frame">
        <div className="section-head">
          <h2 id="methods-title" data-reveal className="h2">
            {t("heading")}
          </h2>
          <p data-reveal style={{ "--i": 1 } as CSSProperties} className="lead">
            {t("sub")}
          </p>
        </div>

        <fieldset data-reveal style={{ "--i": 2 } as CSSProperties} className="countries">
          <legend className="countries__question">{t("question")}</legend>
          <div className="countries__list">
            {rails.map((r, i) => (
              <label key={r.code} className="country">
                <input
                  type="radio"
                  name="family-country"
                  value={r.code}
                  checked={i === index}
                  onChange={() => setIndex(i)}
                />
                <span>
                  <Flag code={r.code} />
                  {r.country}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div data-reveal style={{ "--i": 3 } as CSSProperties} className="card route">
          <div className="route__flow" aria-live="polite">
            <div className="route__node">
              <span className="route__badge route__badge--you">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-7 w-7">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c1.5-3.5 4.4-5 8-5s6.5 1.5 8 5" />
                </svg>
              </span>
              <span className="route__value">US$ {SEND_USD}</span>
              <span className="route__sub">
                {t("you")} · {t("you_sub")}
              </span>
            </div>

            <span className="route__line" aria-hidden="true">
              <span className="route__carrier" />
            </span>

            <div className="route__node">
              <img src="/app-icon.svg" alt="" width={64} height={64} className="route__badge route__badge--ruma" />
              <span className="route__value">Ruma</span>
              <span className="route__sub">{t("ruma_sub")}</span>
            </div>

            <span className="route__line route__line--second" aria-hidden="true">
              <span className="route__carrier" />
            </span>

            <div className="route__node">
              <span className="route__badge route__badge--family">
                {recipient.charAt(0)}
                <Flag key={rail.code} code={rail.code} className="route__flag" />
              </span>
              {rate !== undefined && (
                <span key={`${rail.code}-amount`} className="route__value route__swap">
                  {formatLocal(rail, SEND_USD * rate)}*
                </span>
              )}
              <span key={rail.code} className={`route__method route__swap ${rate === undefined ? "route__method--alone" : ""}`}>
                {rail.method}
              </span>
              <span key={`${rail.code}-cur`} className="route__sub route__swap">
                {recipient} · {rail.currency}
              </span>
            </div>
          </div>
        </div>

        {rate !== undefined && <p className="route__note">{t("reference")}</p>}
      </div>
    </section>
  );
}
