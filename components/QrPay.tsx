"use client";

import { CSSProperties, useState } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";
import Phone from "@/components/Phone";
import { QrScreen } from "@/components/AppScreens";

export default function QrPay() {
  const t = useTranslations("qr");
  const methods = t("methods") as string[];
  const [paid, setPaid] = useState(false);

  return (
    <section id="qr" aria-labelledby="qr-title" className="section">
      <div className="frame split">
        <div data-reveal className="split__visual split__visual--soft">
          <Phone>
            <QrScreen paid={paid} onPay={() => setPaid(true)} onAgain={() => setPaid(false)} />
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
          <button type="button" onClick={() => setPaid((p) => !p)} className="link split__try">
            {paid ? t("again") : `${t("pay")} ${t("amount")}`}
          </button>
        </div>
      </div>
    </section>
  );
}
