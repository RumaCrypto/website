import "../globals.css";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import { TranslationsProvider } from "@/context/translations/TranslationsContext";
import SmoothScroll from "@/components/SmoothScroll";
import BetaAndroidBanner from "@/components/BetaAndroidBanner";
import { betaPromoEnabled } from "@/lib/betaFlag";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    other: {
      "base:app_id": "6a203b294fbf682eb25dc0fe",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);

  return (
    // The `js` class gates every hidden starting state, so nothing stays
    // invisible when scripts are off; React must not fight it on hydration.
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preload" href="/fonts/garet.heavy.ttf" as="font" type="font/ttf" crossOrigin="" />
      </head>
      <body>
        <SmoothScroll>
          <TranslationsProvider dictionary={dictionary}>
            {betaPromoEnabled && <BetaAndroidBanner lang={lang} />}
            {children}
          </TranslationsProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
