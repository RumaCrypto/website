"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";
import { getUserLocation, submitToNotion } from "@/lib/notion";

const easing = [0.22, 1, 0.36, 1] as const;

export default function WaitlistCTA({ lang }: { lang: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const t = useTranslations("waitlist");
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
    <section id="waitlist" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          ref={ref}
          className="relative rounded-3xl overflow-hidden border border-border bg-surface p-12 md:p-20 text-center"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easing }}
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-accent opacity-[0.06] blur-[80px] pointer-events-none rounded-full" />

          <div className="relative">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-background text-accent mb-6">
              {t("badge")}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold text-text mb-4 tracking-tight">
              {t("title")}
            </h2>
            <p className="text-muted max-w-md mx-auto mb-10 leading-relaxed text-lg">
              {t("subtitle")}
            </p>

            {submitted ? (
              <div className="inline-flex items-center gap-2 text-accent font-medium">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
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
                  className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-text placeholder-subtle text-sm focus:outline-none focus:border-accent transition-colors duration-200"
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
