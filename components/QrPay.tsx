"use client";

import { CSSProperties } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";
import Phone from "@/components/Phone";
import AppShot from "@/components/AppShot";

export default function QrPay({ lang }: { lang: string }) {
  const t = useTranslations("qr");
  const methods = t("methods") as string[];

  return (
    <section id="qr" aria-labelledby="qr-title" className="section">
      <div className="frame split">
        <div data-reveal className="split__visual split__visual--soft">
          <Phone>
            <AppShot name="onboarding-qr" lang={lang} />
          </Phone>
        </div>

        <div className="split__copy">
          <h2 id="qr-title" data-reveal className="h2">
            {t("heading")}
          </h2>
          <p data-reveal style={{ "--i": 1 } as CSSProperties} className="lead">
            {t("text")}
          </p>
          <ul data-reveal style={{ "--i": 2 } as CSSProperties} className="chips">
            {methods.map((m) => (
              <li key={m} className="chip">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
