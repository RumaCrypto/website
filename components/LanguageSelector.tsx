"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const languages = [
  { code: "es", name: "Español" },
  { code: "en", name: "English" },
  { code: "pt", name: "Português" },
];

export default function LanguageSelector({
  currentLocale,
  tone = "ink",
}: {
  currentLocale: string;
  tone?: "ink" | "inverse";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [isOpen]);

  const handleLanguageChange = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  const currentLang = languages.find((lang) => lang.code === currentLocale);
  const inverse = tone === "inverse";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={currentLang?.name}
        className={`flex min-h-11 items-center gap-1.5 text-small cursor-pointer transition-colors duration-200 ${
          inverse ? "text-field-ink" : "text-ink"
        }`}
      >
        <span>{currentLang?.code.toUpperCase()}</span>
        <svg
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute right-0 top-full z-50 mt-1 min-w-40 bg-background py-2 text-ink shadow-[0_12px_32px_rgba(0,0,0,0.14)]">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                aria-current={lang.code === currentLocale ? "true" : undefined}
                className={`w-full cursor-pointer px-4 py-2.5 text-left text-small transition-colors duration-150 hover:bg-surface ${
                  lang.code === currentLocale ? "text-ink" : "text-muted"
                }`}
              >
                {lang.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
