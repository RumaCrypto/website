"use client";

import Image from "next/image";
import { useTranslations } from "@/context/translations/TranslationsContext";

const partners = [
  { name: "Privy", src: "/partners/privy.svg", width: 160, height: 40 },
  { name: "P2P.ME", src: "/partners/p2pme.svg", width: 150, height: 40 },
  { name: "Base", src: "/partners/base.svg", width: 150, height: 40 },
  { name: "Reclaim Protocol", src: "/partners/reclaim.png", width: 180, height: 40 },
];

export default function Partners() {
  const t = useTranslations("partners");

  return (
    <section aria-labelledby="partners-title" className="section partners">
      <div className="frame partners__inner">
        <h2 id="partners-title" data-reveal className="partners__lead">
          {t("lead")}
        </h2>
        <ul data-reveal className="partners__logos">
          {partners.map((p) => (
            <li key={p.name}>
              <Image src={p.src} alt={p.name} width={p.width} height={p.height} className="partners__logo" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
