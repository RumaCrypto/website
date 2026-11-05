import Image from "next/image";

export type ShotName = "onboarding" | "onboarding-qr" | "login" | "deposit" | "send";

/**
 * The captures have no status bar, so the phone's notch would sit on the
 * app's header. Each shot gets a strip on top in the colour of its own top
 * edge, which reads as the status bar and pushes the screen below the notch.
 */
const TOP_EDGE: Record<ShotName, string> = {
  onboarding: "#eaf0fe",
  "onboarding-qr": "#eaf0fe",
  login: "#fafafa",
  deposit: "#fafafa",
  // the send sheet opens over a dimmed, blurred home screen
  send: "#999999",
};

/** A real screen of the Ruma app, captured in the page's language. */
export default function AppShot({ name, lang, priority = false }: { name: ShotName; lang: string; priority?: boolean }) {
  return (
    <div className="shot" style={{ backgroundColor: TOP_EDGE[name] }}>
      <Image
        src={`/screens/${name}-${lang}.jpg`}
        alt=""
        width={668}
        height={1444}
        sizes="(min-width: 600px) 300px, 260px"
        priority={priority}
        className="shot__img"
      />
    </div>
  );
}
