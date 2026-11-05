import { useTranslations } from "@/context/translations/TranslationsContext";

/**
 * Every country Ruma sends money to, the local method the money lands in,
 * and how its currency is quoted and shown. This is the one place to add a
 * country:
 *
 *   1. add it here (`sdkCurrency` is P2P.ME's code for its sell price),
 *   2. translate it under `rails.countries` in the three dictionaries,
 *   3. draw its flag in components/Flag.tsx.
 *
 * TypeScript fails the build if step 2 or 3 is missing (see the checks at
 * the bottom of this file and the `flags` map in Flag.tsx), and if
 * `sdkCurrency` is not a currency the SDK knows (lib/rates.ts).
 */
export const RAILS = [
  { code: "br", method: "PIX", sdkCurrency: "BRL", symbol: "R$", locale: "pt-BR", decimals: 2 },
  { code: "ar", method: "MercadoPago", sdkCurrency: "ARS", symbol: "$", locale: "es-AR", decimals: 0 },
  { code: "ve", method: "PagoMóvil", sdkCurrency: "VEN", symbol: "Bs.", locale: "es-VE", decimals: 2 },
  { code: "pe", method: "Yape", sdkCurrency: "PEN", symbol: "S/", locale: "es-PE", decimals: 2 },
  // Ecuador pays out in US dollars, but its P2P.ME corridor still floats
  { code: "ec", method: "DeUna o Banco", sdkCurrency: "ECU", symbol: "US$", locale: "es-EC", decimals: 2 },
  { code: "bo", method: "QR Simple", sdkCurrency: "BOB", symbol: "Bs", locale: "es-BO", decimals: 2 },
  { code: "co", method: "Bre-B", sdkCurrency: "COP", symbol: "$", locale: "es-CO", decimals: 0 },
] as const;

export type RailCode = (typeof RAILS)[number]["code"];

/** What each language says about a country. */
interface RailCopy {
  country: string;
  currency: string;
}

export type RailsCopy = Record<RailCode, RailCopy>;

/** A rail with its copy in the current language. */
export type Rail = (typeof RAILS)[number] & RailCopy;

/** The rails in the order of RAILS, translated for the current page. */
export function useRails(): Rail[] {
  const copy = useTranslations("rails")("countries") as RailsCopy;
  return RAILS.map((rail) => ({ ...rail, ...copy[rail.code] }));
}

/** The rail a visitor sees first, by language: Brazil for Portuguese, Peru otherwise. */
export function defaultRailIndex(rails: readonly { code: RailCode }[], lang: string): number {
  const code: RailCode = lang === "pt" ? "br" : "pe";
  return Math.max(
    0,
    rails.findIndex((rail) => rail.code === code),
  );
}

/** An amount in a rail's own currency, the way people there write it. */
export function formatLocal(rail: (typeof RAILS)[number], amount: number): string {
  const digits = new Intl.NumberFormat(rail.locale, {
    minimumFractionDigits: rail.decimals,
    maximumFractionDigits: rail.decimals,
  }).format(amount);
  return `${rail.symbol} ${digits}`;
}

// Compile-time only (type imports, nothing is bundled): every dictionary
// translates every rail. A missing country is a type error naming it.
type TranslatesEveryRail<T extends RailsCopy> = T;
export type RailsTranslated = [
  TranslatesEveryRail<(typeof import("@/dictionaries/es.json"))["rails"]["countries"]>,
  TranslatesEveryRail<(typeof import("@/dictionaries/en.json"))["rails"]["countries"]>,
  TranslatesEveryRail<(typeof import("@/dictionaries/pt.json"))["rails"]["countries"]>,
];
