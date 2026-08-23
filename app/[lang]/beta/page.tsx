import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BetaDownload from "@/components/BetaDownload";

export const metadata = {
  robots: { index: false, follow: false },
};

const BETA = {
  version: process.env.NEXT_PUBLIC_BETA_VERSION ?? "0.1.0-beta.1",
  releaseDate: process.env.NEXT_PUBLIC_BETA_RELEASE_DATE ?? "2026-08-23",
  fileSize: process.env.NEXT_PUBLIC_BETA_FILE_SIZE ?? "—",
  minAndroid: process.env.NEXT_PUBLIC_BETA_MIN_ANDROID ?? "Android 8.0+",
  apkUrl: process.env.NEXT_PUBLIC_BETA_APK_URL ?? "/downloads/ruma-beta.apk",
  sha256:
    process.env.NEXT_PUBLIC_BETA_SHA256 ??
    "0000000000000000000000000000000000000000000000000000000000000000",
  feedbackUrl:
    process.env.NEXT_PUBLIC_BETA_FEEDBACK_URL ??
    "mailto:founders@ruma.app?subject=Ruma%20Beta%20Feedback",
};

export default async function BetaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <Navbar lang={lang} />
      <main>
        <BetaDownload {...BETA} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
