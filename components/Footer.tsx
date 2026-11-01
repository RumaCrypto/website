"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/context/translations/TranslationsContext";
import { appUrl } from "@/lib/appConfig";
import { betaPromoEnabled } from "@/lib/betaFlag";

export default function Footer({ lang }: { lang: string }) {
  const t = useTranslations("footer");

  const links = [
    { label: "Instagram", href: "https://instagram.com/rumacrypto" },
    { label: "X", href: "https://x.com/rumacrypto" },
    { label: "GitHub", href: "https://github.com/rumacrypto" },
    { label: t("link_contact"), href: "https://t.me/danielarroyoeth" },
    ...(betaPromoEnabled ? [{ label: t("link_beta"), href: `/${lang}/beta` }] : []),
  ];

  return (
    <footer aria-labelledby="footer-title" className="footer">
      <div className="frame">
        <div className="footer__top">
          <div>
            <h2 id="footer-title" className="h2 footer__invite">
              {t("invite")}
            </h2>
            <a href={appUrl} className="button button--white">
              {t("cta")}
            </a>
          </div>

          <nav aria-label={t("links_label")}>
            <ul className="footer__links">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer__legal">
          <Link href={`/${lang}`} aria-label="Ruma">
            <Image src="/logo-full-white.svg" alt="Ruma" width={84} height={32} className="h-7 w-auto" />
          </Link>
          <span>
            © {new Date().getFullYear()} Ruma. {t("rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}
