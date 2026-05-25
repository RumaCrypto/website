"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/context/translations/TranslationsContext";
import LanguageSelector from "@/components/LanguageSelector";

export default function Navbar({ lang }: { lang: string }) {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(9,9,11,0)", "rgba(9,9,11,0.85)"],
  );
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
        className="absolute bottom-0 left-0 right-0 h-px bg-[#27272a]"
      />
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center">
          <Image
            src="/logo-full.svg"
            alt="Ruma"
            width={80}
            height={32}
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#71717a] hover:text-[#fafafa] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSelector currentLocale={lang} />
          <a
            href="#waitlist"
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-[#0057ff] text-white hover:bg-[#3a7cff] transition-colors duration-200"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
