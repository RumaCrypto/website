"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";
import Image from "next/image";


const features = [
  { key: "1", image: "/features/features-1.jpg" },
  { key: "2", image: "/features/features-2.jpg" },
  { key: "3", image: "/features/features-3.jpg" },
];

const easing = [0.22, 1, 0.36, 1] as const;

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const t = useTranslations("features");

  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ key, image }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: easing }}
              className="group relative p-3 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-colors duration-300 overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-linear-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

              <div className="relative">
                <div className="w-full h-80 rounded-xl overflow-hidden mb-5">
                  <Image width={300} height={320} src={image} alt={t(`${key}_title`)} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-text mb-2 text-2xl">
                    {t(`${key}_title`)}
                  </h3>
                  <p className="text-muted leading-relaxed text-lg">
                    {t(`${key}_desc`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
