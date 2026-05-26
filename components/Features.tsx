"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const ChainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

const features = [
  { key: "1", Icon: BoltIcon },
  { key: "2", Icon: LockIcon },
  { key: "3", Icon: ChainIcon },
];

const easing = [0.22, 1, 0.36, 1] as const;

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const t = useTranslations("features");

  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-16"
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

        <div className="grid md:grid-cols-3 gap-5">
          {features.map(({ key, Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: easing }}
              className="group relative p-6 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-colors duration-300 overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-linear-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5">
                  <Icon />
                </div>
                <h3 className="font-semibold text-text mb-2 text-[0.9375rem]">
                  {t(`${key}_title`)}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t(`${key}_desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
