"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";
import LanguageSelector from "@/components/LanguageSelector";

export default function Navbar({ lang }: { lang: string }) {
  const { scrollY } = useScroll();
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useState(mq.matches);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mq]);

  const darkBg = useTransform(scrollY, [0, 80], ["rgba(9,9,11,0)", "rgba(9,9,11,0.85)"]);
  const lightBg = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.85)"]);
  const bg = isDark ? darkBg : lightBg;
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const t = useTranslations("nav");

  const navLinks = [
    { label: t("features"), href: "#features" },
    { label: t("how_it_works"), href: "#how-it-works" },
    { label: t("security"), href: "#security" },
  ];

  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 right-0 h-px bg-border"
      />
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center">
          <Image
            src="/logo-full.svg"
            alt="Ruma"
            width={80}
            height={32}
            className="h-8 w-auto dark:hidden"
          />
          <Image
            src="/logo-full-white.svg"
            alt="Ruma"
            width={80}
            height={32}
            className="h-7 w-auto hidden dark:block"
          />
        </Link>

        <div className="flex items-center gap-3">

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted hover:text-text transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <LanguageSelector currentLocale={lang} />
          <a
            href="#waitlist"
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-[#3a7cff] transition-colors duration-200"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
