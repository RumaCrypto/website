"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "@/context/translations/TranslationsContext";

const easing = [0.22, 1, 0.36, 1] as const;

type Props = {
  version: string;
  releaseDate: string;
  fileSize: string;
  minAndroid: string;
  apkUrl: string;
  sha256: string;
  feedbackUrl: string;
};

export default function BetaDownload({
  version,
  releaseDate,
  fileSize,
  minAndroid,
  apkUrl,
  sha256,
  feedbackUrl,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const t = useTranslations("beta");
  const [copied, setCopied] = useState(false);

  const copyChecksum = async () => {
    await navigator.clipboard.writeText(sha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="relative pt-32 pb-28 px-6 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-accent opacity-[0.08] blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-[600px] left-1/4 w-[400px] h-[400px] bg-accent opacity-[0.04] blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easing }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-surface text-accent mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {t("badge")}
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold text-text mb-5 tracking-tight leading-[1.05]">
            {t("title")}
          </h1>
          <p className="text-muted max-w-xl mx-auto text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Main download card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: easing }}
          className="relative rounded-3xl border border-border bg-surface p-8 md:p-12 overflow-hidden"
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent opacity-[0.1] blur-[80px] pointer-events-none rounded-full" />

          <div className="relative flex flex-col items-center text-center">
            {/* App icon / logo */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-accent opacity-30 blur-2xl rounded-3xl" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-background border border-border flex items-center justify-center shadow-2xl">
                <Image
                  src="/logo.svg"
                  alt="Ruma"
                  width={64}
                  height={64}
                  className="w-14 h-14 sm:w-16 sm:h-16"
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="text-2xl font-bold text-text mb-1">Ruma</div>
              <div className="text-sm text-muted">
                {version} · {fileSize} · {minAndroid}
              </div>
            </div>

            <a
              href={apkUrl}
              download
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-accent hover:bg-[#3a7cff] text-white font-medium text-base transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 group-hover:translate-y-0.5 transition-transform"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.75.75v8.19l2.72-2.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 111.06-1.06l2.72 2.72V3.75A.75.75 0 0110 3zM3.75 15a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H3.75z"
                  clipRule="evenodd"
                />
              </svg>
              {t("download_cta")}
            </a>

            <div className="mt-4 text-xs text-subtle">
              {t("download_note")} · {t("meta_released")} {releaseDate}
            </div>
          </div>

          {/* Checksum */}
          <div className="relative mt-10 pt-8 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs uppercase tracking-wider text-subtle font-semibold">
                {t("checksum_label")}
              </div>
              <button
                type="button"
                onClick={copyChecksum}
                className="text-xs text-accent hover:text-accent-hover font-medium transition-colors"
              >
                {copied ? t("checksum_copied") : t("checksum_copy")}
              </button>
            </div>
            <button
              type="button"
              onClick={copyChecksum}
              className="w-full text-left font-mono text-[11px] sm:text-xs text-muted bg-background border border-border rounded-lg px-3 py-3 break-all hover:border-accent/40 transition-colors"
              title={t("checksum_copy")}
            >
              {sha256}
            </button>
            <div className="mt-2 text-xs text-subtle">{t("checksum_hint")}</div>
          </div>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2, ease: easing }}
          className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6"
        >
          <div className="flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-text mb-1.5">
                {t("warning_title")}
              </div>
              <p className="text-muted text-sm leading-relaxed">
                {t("warning_body")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Install steps */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.25, ease: easing }}
          className="mt-14"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-6 text-center">
            {t("install_title")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="flex gap-4 p-5 rounded-2xl border border-border bg-surface/60"
              >
                <span className="shrink-0 w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-bold flex items-center justify-center">
                  {n}
                </span>
                <span className="text-muted leading-relaxed text-sm pt-0.5">
                  {t(`install_step_${n}`)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3, ease: easing }}
          className="mt-6 rounded-2xl border border-border bg-surface p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <div className="font-semibold text-text mb-1">
              {t("feedback_title")}
            </div>
            <p className="text-muted text-sm">{t("feedback_body")}</p>
          </div>
          <a
            href={feedbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl border border-border bg-background hover:border-accent/40 hover:text-accent text-text text-sm font-medium transition-colors"
          >
            {t("feedback_cta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
