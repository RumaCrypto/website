import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Methods from "@/components/Methods";
import QrPay from "@/components/QrPay";
import Balance from "@/components/Balance";
import HowItWorks from "@/components/HowItWorks";
import Partners from "@/components/Partners";
import WaitlistCTA from "@/components/WaitlistCTA";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <Navbar lang={lang} tone="inverse" />
      <main>
        <Hero lang={lang} />
        <Methods lang={lang} />
        <QrPay />
        <Balance />
        <HowItWorks />
        <Partners />
        <WaitlistCTA lang={lang} />
      </main>
      <Footer lang={lang} />
      <RevealObserver />
    </>
  );
}
