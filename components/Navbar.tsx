"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/context/translations/TranslationsContext";
import LanguageSelector from "@/components/LanguageSelector";
import { appUrl } from "@/lib/appConfig";

/** `inverse` sits on the blue hero of the landing; the default sits on white. */
export default function Navbar({ lang, tone = "ink" }: { lang: string; tone?: "ink" | "inverse" }) {
  const t = useTranslations("nav");
  const inverse = tone === "inverse";

  const navLinks = [
    { label: t("send"), href: `/${lang}#envios` },
    { label: t("qr"), href: `/${lang}#qr` },
    { label: t("how"), href: `/${lang}#empezar` },
  ];

  return (
    <header className={`frame nav ${inverse ? "nav--inverse" : ""}`}>
      <Link href={`/${lang}`} aria-label={t("home")} className="flex items-center">
        <Image
          src={inverse ? "/logo-full-white.svg" : "/logo-full.svg"}
          alt="Ruma"
          width={84}
          height={32}
          priority
          className="h-7 w-auto"
        />
      </Link>

      <div className="nav__right">
        <nav className="nav__links">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className="nav__link">
              {item.label}
            </a>
          ))}
        </nav>
        <LanguageSelector currentLocale={lang} tone={inverse ? "inverse" : "ink"} />
        <a href={appUrl} className={`button button--small ${inverse ? "button--white" : "button--ink"}`}>
          {t("open_app")}
        </a>
      </div>
    </header>
  );
}
