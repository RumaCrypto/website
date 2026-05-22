import "../globals.css";
import { Metadata } from "next";
import { getDictionary, Locale } from "./dictionaries";
import { TranslationsProvider } from "@/context/translations/TranslationsContext";
import { ReactLenis } from "lenis/react";

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
            {children}
          </TranslationsProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
