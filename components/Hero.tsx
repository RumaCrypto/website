"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";
import { getUserLocation, submitToNotion } from "@/lib/notion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const easing = [0.22, 1, 0.36, 1] as const;

export default function Hero({ lang }: { lang: string }) {
  const t = useTranslations("hero");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { country } = await getUserLocation();
      await submitToNotion({ email, language: lang, country });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">

      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-125 h-125 rounded-full bg-muted opacity-[0.08] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-100 h-100 rounded-full bg-accent opacity-[0.07] blur-[100px] pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.55, ease: easing }}
          className="text-6xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.07] mb-6"
        >
          <span className="text-text">{t("title_1")}</span>
          <br />
          <span className="bg-linear-to-r from-accent via-[#3a7cff] to-accent-hover bg-clip-text text-transparent">
            {t("title_2")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.55, ease: easing }}
          className="text-lg text-muted max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        {/* Form */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.55, ease: easing }}
        >
          {submitted ? (
            <div className="inline-flex items-center gap-2 text-accent font-medium">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              {t("thank_you")}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                className="flex-1 px-4 py-3 rounded-xl bg-surface border border-border text-text placeholder-subtle text-sm focus:outline-none focus:border-accent transition-colors duration-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-accent hover:bg-[#3a7cff] disabled:opacity-60 text-white font-medium text-sm transition-colors duration-200 shrink-0"
              >
                {loading ? "..." : t("cta")}
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-subtle">{t("social_proof")}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
