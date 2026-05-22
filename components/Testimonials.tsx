"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";

const testimonials = ["1", "2", "3"];

const easing = [0.22, 1, 0.36, 1] as const;

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const t = useTranslations("testimonials");

  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: easing }}
        >
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border border-[#27272a] bg-[#18181b] text-[#8b5cf6] mb-4">
            {t("badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#fafafa]">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: easing }}
              className="p-6 rounded-2xl bg-[#18181b] border border-[#27272a] flex flex-col gap-4"
            >
              {/* Quote mark */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-[#8b5cf6] opacity-60 shrink-0"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-sm text-[#a1a1aa] leading-relaxed flex-1">
                {t(`${key}_quote`)}
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-[#27272a]">
                {/* Avatar placeholder */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                  {t(`${key}_name`).charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#fafafa]">
                    {t(`${key}_name`)}
                  </p>
                  <p className="text-xs text-[#71717a]">{t(`${key}_role`)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
