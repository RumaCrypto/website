"use client";

import { CSSProperties } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";
import { appUrl } from "@/lib/appConfig";
import Phone from "@/components/Phone";
import { BalanceScreen } from "@/components/AppScreens";

export default function Balance() {
  const t = useTranslations("balance");

  return (
    <section aria-labelledby="balance-title" className="section">
      <div className="frame">
        <div className="panel panel--gold split">
          <div className="split__copy">
            <h2 id="balance-title" data-reveal className="h2">
              {t("heading")}
            </h2>
            <p data-reveal style={{ "--i": 1 } as CSSProperties} className="lead">
              {t("text")}
            </p>
            <p data-reveal style={{ "--i": 2 } as CSSProperties} className="panel__small">
              {t("networks")}
            </p>
            <a data-reveal style={{ "--i": 3 } as CSSProperties} href={appUrl} className="button button--ink">
              {t("action")}
            </a>
          </div>
          <div data-reveal className="split__visual">
            <Phone>
              <BalanceScreen />
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
}
