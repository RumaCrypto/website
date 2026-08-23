import "../globals.css";
import { Metadata } from "next";
import { getDictionary, Locale } from "./dictionaries";
import { TranslationsProvider } from "@/context/translations/TranslationsContext";
import { ReactLenis } from "lenis/react";
import BetaAndroidBanner from "@/components/BetaAndroidBanner";
import { betaPromoEnabled } from "@/lib/betaFlag";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
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
  const dictionary = await getDictionary(lang as Locale);

  return (
    <html lang={lang}>
      <body>
        <ReactLenis root>
          <TranslationsProvider dictionary={dictionary}>
            {betaPromoEnabled && <BetaAndroidBanner lang={lang} />}
            {children}
          </TranslationsProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
