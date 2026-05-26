import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import WaitlistCTA from "@/components/WaitlistCTA";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <Navbar lang={lang} />
      <main>
        <Hero lang={lang} />
        <Features />
        <HowItWorks />
        <Partners />
        <WaitlistCTA lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
