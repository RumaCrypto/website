"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useTranslations } from "@/context/translations/TranslationsContext";
import Phone from "@/components/Phone";
import AppShot, { ShotName } from "@/components/AppShot";

interface Step {
  title: string;
  body: string;
}

/** The real app screen behind each step, in order. */
const SHOTS: ShotName[] = ["onboarding", "login", "deposit", "send"];

/**
 * One phone plays the sign-up flow while the list of steps works as its
 * player: the active step's bar fills, and when it is full the next one
 * starts. The fill is a CSS animation, so the timing runs off the main
 * thread and `animationend` is what advances the step.
 */
export default function HowItWorks({ lang }: { lang: string }) {
  const t = useTranslations("how");
  const steps = t("steps") as Step[];
  const chips = t("chips") as string[];
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paused = held || !onScreen;
  const next = () => setActive((i) => (i + 1) % steps.length);

  return (
    <section
      ref={sectionRef}
      id="empezar"
      aria-labelledby="how-title"
      className={`section ${paused ? "is-paused" : ""} ${reduce ? "is-still" : ""}`}
    >
      <div className="frame player">
        <div className="player__list">
          <h2 id="how-title" data-reveal className="h2">
            {t("heading")}
          </h2>

          <div role="tablist" aria-label={t("steps_label")} className="player__steps">
            {steps.map((step, i) => {
              const state = i === active ? "is-active" : i < active ? "is-done" : "";
              return (
                <button
                  key={step.title}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  data-reveal
                  style={{ "--i": i + 1 } as CSSProperties}
                  className={`player__step ${state}`}
                  onClick={() => setActive(i)}
                  onPointerEnter={() => setHeld(true)}
                  onPointerLeave={() => setHeld(false)}
                  onFocus={() => setHeld(true)}
                  onBlur={() => setHeld(false)}
                >
                  <span className="player__title">{step.title}</span>
                  <span className="player__body">
                    <span>{step.body}</span>
                  </span>
                  <span className="player__bar" aria-hidden="true">
                    <span
                      key={`${i}-${active}`}
                      className="player__fill"
                      onAnimationEnd={i === active ? next : undefined}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div data-reveal className="player__stage">
          <Phone className="player__phone">
            {SHOTS.map((shot, i) => (
              <div key={shot} className={`player__screen ${i === active ? "is-active" : ""}`}>
                <AppShot name={shot} lang={lang} />
              </div>
            ))}
          </Phone>
          <div key={active} aria-hidden="true" className="player__chip">
            <span className="toast__check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            {chips[active]}
          </div>
        </div>
      </div>
    </section>
  );
}
