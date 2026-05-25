"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/context/translations/TranslationsContext";

export default function Footer({ lang }: { lang: string }) {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href={`/${lang}`}>
              <Image
                src="/logo-full.svg"
                alt="Ruma"
                width={72}
                height={28}
                className="h-7 w-auto mb-3 dark:hidden"
              />
              <Image
                src="/logo-full-white.svg"
                alt="Ruma"
                width={72}
                height={28}
                className="h-7 w-auto mb-3 hidden dark:block"
              />
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Product links */}
          <div>
            <p className="text-xs font-semibold text-subtle uppercase tracking-wider mb-4">
              {t("links_product")}
            </p>
            <ul className="space-y-3">
              {[
                { label: t("link_features"), href: "#features" },
                { label: t("link_security"), href: "#security" },
                { label: t("link_how"), href: "#how-it-works" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-text transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <p className="text-xs font-semibold text-subtle uppercase tracking-wider mb-4">
              {t("links_company")}
            </p>
            <ul className="space-y-3">
              {[
                { label: t("link_about"), href: "#" },
                { label: t("link_blog"), href: "#" },
                { label: t("link_contact"), href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-text transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-border mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-subtle">{t("copyright")}</p>
          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Twitter"
              className="text-subtle hover:text-text transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="text-subtle hover:text-text transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
