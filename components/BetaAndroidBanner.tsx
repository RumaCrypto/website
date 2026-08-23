"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "@/context/translations/TranslationsContext";

const DISMISS_KEY = "ruma_beta_banner_dismissed";

export default function BetaAndroidBanner({ lang }: { lang: string }) {
  const t = useTranslations("beta_banner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISS_KEY) === "1") return;
    const isAndroid = /Android/i.test(navigator.userAgent);
    if (isAndroid) setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-accent text-white">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-3 text-sm">
        <span className="flex-1 truncate">
          <span className="font-semibold mr-2">{t("prefix")}</span>
          <span className="opacity-90">{t("message")}</span>
        </span>
        <Link
          href={`/${lang}/beta`}
          className="shrink-0 px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 font-medium transition-colors"
        >
          {t("cta")}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("dismiss")}
          className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/15 transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path
              fillRule="evenodd"
              d="M4.28 4.22a.75.75 0 011.06 0L10 8.94l4.66-4.72a.75.75 0 111.07 1.05L11.06 10l4.67 4.72a.75.75 0 11-1.07 1.06L10 11.06l-4.66 4.72a.75.75 0 01-1.07-1.05L8.94 10 4.28 5.28a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
