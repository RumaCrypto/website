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
                { label: t("link_how"), href: "#how-to-start" },
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
                {
                  label: t("link_contact"),
                  href: "https://t.me/danielarroyoeth",
                },
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
          <a
            className="text-xs text-subtle"
            href="https://www.pexels.com/es-es/video/impresionante-mirador-de-montana-con-un-grupo-de-personas-29886388/"
            target="_blank"
          >
            Vídeo de Juan Castelblanco
          </a>
          <a
            className="text-xs text-subtle"
            href="https://www.pexels.com/es-es/foto/ciudad-calle-autobus-bus-13784003/"
            target="_blank"
          >
            Foto LATAM de Oscar Andres Roballo
          </a>
          <a
            className="text-xs text-subtle"
            href="https://www.pexels.com/es-es/foto/candado-metalico-para-asegurar-el-pestillo-de-una-puerta-37095097/"
            target="_blank"
          >
            Foto candado de Артем Зелюткин
          </a>
          <a
            className="text-xs text-subtle"
            href="https://www.pexels.com/es-es/foto/dinero-monedas-brillante-efectivo-25961803/"
            target="_blank"
          >
            Foto centavos de Iván Cauich
          </a>
          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/rumacrypto"
              aria-label="Instagram"
              className="text-subtle hover:text-text transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
              </svg>
            </a>
            <a
              href="https://x.com/rumacrypto"
              aria-label="Twitter"
              className="text-subtle hover:text-text transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://github.com/rumacrypto"
              aria-label="GitHub"
              className="text-subtle hover:text-text transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
