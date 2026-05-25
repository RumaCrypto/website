"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const languages = [
  { code: "en", name: "English"},
  { code: "es", name: "Español"},
  { code: "pt", name: "Português"},
];

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5} stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
)

export default function LanguageSelector({
  currentLocale,
}: {
  currentLocale: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  const currentLang = languages.find((lang) => lang.code === currentLocale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted hover:text-text hover:bg-surface border border-transparent hover:border-border transition-all duration-200 cursor-pointer"
      >
        <GlobeIcon/>
        <span className="font-medium">{currentLang?.code.toUpperCase()}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden z-50 min-w-[140px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="w-full px-4 py-2.5 text-left text-sm hover:bg-border transition-colors duration-150 flex items-center gap-3 text-[#a1a1aa] hover:text-text cursor-pointer"
            >
              <span>{lang.code}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
