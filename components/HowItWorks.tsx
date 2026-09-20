"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "@/context/translations/TranslationsContext";
import { appUrl } from "@/lib/appConfig";

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

              {/* Step 1 is where intent peaks — hand them the app right here */}
              {step === "1" && (
                <a
                  href={appUrl}
                  className="group mt-5 inline-flex items-center gap-2.5 pl-2.5 pr-4 py-2.5 rounded-xl border border-border bg-surface hover:border-accent/40 transition-colors duration-200"
                >
                  <Image
                    src="/app-icon.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-lg"
                  />
                  <span className="text-left">
                    <span className="block text-sm font-medium text-text">
                      {t("1_cta")}
                    </span>
                    <span className="block text-xs text-subtle">
                      {t("1_cta_note")}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-accent group-hover:translate-x-0.5 transition-transform"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
