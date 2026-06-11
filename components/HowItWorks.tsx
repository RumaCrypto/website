"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";

const steps = ["1", "2", "3"];

const easing = [0.22, 1, 0.36, 1] as const;

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useTranslations("how_to_start");

  return (
    <section id="how-to-start" className="py-28 px-6">
      {/* Subtle separator */}
      <div className="max-w-6xl mx-auto mb-28">
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: easing }}
        >
          <span className="sr-only inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-surface text-accent mb-4">
            {t("badge")}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-text mb-4">
            {t("title")}
          </h2>
          <p className="sm:text-2xl text-muted max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-6 relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-8 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px bg-linear-to-r from-border via-accent/30 to-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.15, ease: easing }}
            >
              {/* Step number */}
              <div className="relative w-16 h-16 rounded-full border border-border bg-surface flex items-center justify-center mb-6 shrink-0">
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-accent/20 to-transparent" />
                <span className="relative text-xl font-bold text-accent">
                  {step}
                </span>
              </div>

              <h3 className="font-semibold text-text mb-3 text-2xl">
                {t(`${step}_title`)}
              </h3>
              <p className="text-lg text-muted leading-relaxed max-w-xs">
                {t(`${step}_desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
