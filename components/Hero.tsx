"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "@/context/translations/TranslationsContext";
import { getUserLocation, submitToNotion } from "@/lib/notion";

const easing = [0.22, 1, 0.36, 1] as const;

function ScrollIndicator() {
  return (
    <div className="w-7 h-11 rounded-full border-2 border-accent flex justify-center pt-2">
      <motion.div
        className="w-1.5 h-2.5 bg-accent rounded-full"
        animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function Hero({ lang }: { lang: string }) {
  const tPre = useTranslations("pre-hero");
  const t = useTranslations("hero");

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heroInteractive, setHeroInteractive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Video: starts small at lower-center, expands to fill viewport
  const videoTop = useTransform(scrollYProgress, [0, 0.85], ["62%", "50%"]);
  const videoWidth = useTransform(scrollYProgress, [0.05, 0.85], ["20vw", "100vw"]);
  const videoHeight = useTransform(scrollYProgress, [0.05, 0.85], ["25vh", "100vh"]);
  const videoBorderRadius = useTransform(scrollYProgress, [0.05, 0.7], ["16px", "0px"]);

  // Pre-hero text fades out early
  const preHeroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Overlay fades in to make hero text readable over video
  const overlayOpacity = useTransform(scrollYProgress, [0.4, 0.72], [0, 0.65]);

  // Hero content rises and scales in from the video's position
  const heroOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);
  const heroY = useTransform(scrollYProgress, [0.45, 0.75], ["10%", "0%"]);
  const heroScale = useTransform(scrollYProgress, [0.45, 0.75], [0.88, 1]);

  // Start video on first scroll, stop if scrolled back to top
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (!videoRef.current) return;
      if (v > 0.05) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    });
  }, [scrollYProgress]);

  // Enable pointer events only when hero content is visible
  useEffect(() => {
    return heroOpacity.on("change", (v) => setHeroInteractive(v > 0.3));
  }, [heroOpacity]);

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
    <section ref={containerRef} style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Pre-hero: title + scroll indicator */}
        <motion.div
          style={{ opacity: preHeroOpacity }}
          className="absolute top-[15%] inset-x-0 flex flex-col items-center gap-8 z-10 pointer-events-none"
        >
          <h2 className="text-4xl font-bold text-text text-center max-w-2xl px-6">
            {tPre("title")}
          </h2>
          <ScrollIndicator />
        </motion.div>

        {/* Expanding video */}
        <motion.div
          style={{
            position: "absolute",
            top: videoTop,
            left: "50%",
            x: "-50%",
            y: "-50%",
            width: videoWidth,
            height: videoHeight,
            borderRadius: videoBorderRadius,
          }}
          className="overflow-hidden z-0"
        >
          <video
            ref={videoRef}
            src="/hero.mp4"
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Dark overlay — fades in for text legibility */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 z-[1] bg-background pointer-events-none"
        />

        {/* Hero content — fades + rises + scales in over the expanding video */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className={`absolute inset-0 z-10 flex items-center justify-center pt-16 ${
            heroInteractive ? "" : "pointer-events-none"
          }`}
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-6xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.07] mb-6">
              <span className="text-text">{t("title_1")}</span>
              <br />
              <span className="bg-linear-to-r from-accent via-[#3a7cff] to-accent-hover bg-clip-text text-transparent">
                {t("title_2")}
              </span>
            </h1>

            <p className="text-lg text-muted max-w-xl mx-auto mb-10 leading-relaxed">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
