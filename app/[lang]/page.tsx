import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Methods from "@/components/Methods";
import QrPay from "@/components/QrPay";
import Invest from "@/components/Invest";
import HowItWorks from "@/components/HowItWorks";
import Partners from "@/components/Partners";
import WaitlistCTA from "@/components/WaitlistCTA";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import { getSellRates } from "@/lib/rates";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // P2P.ME's sell prices, read on the server and cached for a minute
  const rates = await getSellRates();

  return (
    <>
      <Navbar lang={lang} tone="inverse" />
      <main>
        <Hero lang={lang} />
        <Methods lang={lang} rates={rates} />
        <QrPay lang={lang} />
        <Invest lang={lang} />
        <HowItWorks lang={lang} />
        <Partners />
        <WaitlistCTA lang={lang} />
      </main>
      <Footer lang={lang} />
      <RevealObserver />
    </>
  );
}
