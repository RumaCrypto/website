"use client";

import Image from "next/image";
import rhinestoneLogo from "../public/partners/rhinestone.svg";
import p2pmeLogo from "../public/partners/p2pme.svg";
import { useTranslations } from "@/context/translations/TranslationsContext";

const partners = [
  {
    name: "Rhinestone",
    image: rhinestoneLogo,
  },
  {
    name: "P2P.me",
    image: p2pmeLogo,
  },
];

export default function Partners() {
  const t = useTranslations("partners");
  return (
    <section className="bg-[url(../public/partners/bg-partner.png)] bg-cover relative max-w-full sm:mx-6 my-24 shadow sm:rounded-2xl overflow-hidden">
      <div className="w-full px-6 sm:px-0 py-16 flex flex-col items-center justify-center space-y-4 text-center">
        <h3
          className="text-3xl sm:text-5xl text-neutral-800 font-semibold"
        >
          {t("title")}
        </h3>
        <p className="text-lg">
          {t("subtitle")}
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-20 mt-8"
        >
          {partners.map((partner, index) => (
            <Image
              key={index}
              className="sm:w-1/2 lg:w-72 mx-auto"
              alt={partner.name}
              src={partner.image}
            ></Image>
          ))}
        </div>
      </div>
    </section>
  );
}
