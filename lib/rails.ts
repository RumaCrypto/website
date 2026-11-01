import { useTranslations } from "@/context/translations/TranslationsContext";

/**
 * Every country Ruma sends money to, and the local payment method the
 * money lands in there. This is the one place to add a country:
 *
 *   1. add it here,
 *   2. translate it under `rails.countries` in the three dictionaries,
 *   3. draw its flag in components/Flag.tsx.
 *
 * TypeScript fails the build if step 2 or 3 is missing (see the checks at
 * the bottom of this file and the `flags` map in Flag.tsx).
 */
export const RAILS = [
  { code: "pe", method: "Yape" },
  { code: "br", method: "Pix" },
  { code: "ve", method: "Pago Móvil" },
  { code: "co", method: "Bre-B" },
  { code: "ar", method: "Mercado Pago" },
] as const;

export type RailCode = (typeof RAILS)[number]["code"];

/** What each language says about a country. */
interface RailCopy {
  country: string;
  currency: string;
  need: string;
}

export type RailsCopy = Record<RailCode, RailCopy>;

/** A rail with its copy in the current language. */
export interface Rail extends RailCopy {
  code: RailCode;
  method: string;
}

/** The rails in the order of RAILS, translated for the current page. */
export function useRails(): Rail[] {
  const copy = useTranslations("rails")("countries") as RailsCopy;
  return RAILS.map((rail) => ({ ...rail, ...copy[rail.code] }));
}

/** The rail a visitor sees first, by language: Brazil for Portuguese, Peru otherwise. */
export function defaultRailIndex(rails: Rail[], lang: string): number {
  const code: RailCode = lang === "pt" ? "br" : "pe";
  return Math.max(
    0,
    rails.findIndex((rail) => rail.code === code),
  );
}

// Compile-time only (type imports, nothing is bundled): every dictionary
// translates every rail. A missing country is a type error naming it.
type TranslatesEveryRail<T extends RailsCopy> = T;
export type RailsTranslated = [
  TranslatesEveryRail<(typeof import("@/dictionaries/es.json"))["rails"]["countries"]>,
  TranslatesEveryRail<(typeof import("@/dictionaries/en.json"))["rails"]["countries"]>,
  TranslatesEveryRail<(typeof import("@/dictionaries/pt.json"))["rails"]["countries"]>,
];
