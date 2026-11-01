"use client";

/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "@/context/translations/TranslationsContext";
import { Rail } from "@/lib/rails";

// Screens of the Ruma app, rebuilt from the real one at app.ruma.live so the
// page can show the product doing what each section says.

const Logo = () => <img src="/logo-full.svg" alt="" width={84} height={32} className="screen__logo" />;

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const QrGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path strokeLinecap="round" d="M14 14h3v3M21 14v.01M14 21h3M21 17v4" />
  </svg>
);

const Fingerprint = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className="h-12 w-12">
    <path d="M12 11c0 3.5-1 6.5-2.5 8.5M8.5 7.5A5 5 0 0117 11c0 1.6-.2 3.2-.6 4.6M6.4 9.4A6.9 6.9 0 006 11c0 2.4-.6 4.6-1.6 6.3M15 19.5c.5-1 .9-2.2 1.2-3.4M12 7a4 4 0 00-4 4c0 2.6-.6 5-1.7 6.9M19 11a7 7 0 00-11.3-5.5M12 11c0 1.4-.2 2.8-.5 4" />
  </svg>
);

export function SendScreen({ rail }: { rail: Rail }) {
  const t = useTranslations("hero");
  const who = t("recipient");
  return (
    <div className="screen">
      <div className="screen__bar">
        <Logo />
      </div>
      <p className="screen__title">{t("card_title")}</p>
      <div className="screen__row">
        <span className="screen__avatar">{who.charAt(0)}</span>
        <span className="screen__who">
          <span className="screen__strong">{who}</span>
          <span key={rail.code} className="screen__soft screen__swap">
            {rail.method} · {rail.country}
          </span>
        </span>
      </div>
      <p className="screen__soft screen__label-top">{t("amount_label")}</p>
      <p className="screen__amount screen__amount--inline">{t("card_amount")}</p>
      <p key={`${rail.code}-cur`} className="screen__soft screen__swap">
        {t("card_lands")} {rail.currency}
      </p>
      <div className="screen__keypad">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map((key) => (
          <span key={key}>{key}</span>
        ))}
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6h11v12H9l-5-6 5-6zM13 10l4 4M17 10l-4 4" />
          </svg>
        </span>
      </div>
      <span className="screen__button">{t("card_cta")}</span>
    </div>
  );
}

export function QrScreen({ paid, onPay, onAgain }: { paid: boolean; onPay: () => void; onAgain: () => void }) {
  const t = useTranslations("qr");
  return (
    <div className="screen">
      <div className="screen__bar">
        <Logo />
      </div>
      <p className="screen__title">{t("screen_title")}</p>
      <div className="screen__row">
        <span className={`screen__icon ${paid ? "screen__icon--done" : ""}`}>{paid ? <Check /> : <QrGlyph />}</span>
        <span className="screen__who">
          <span className="screen__strong">{t("merchant")}</span>
          <span className="screen__soft">{t("place")}</span>
        </span>
      </div>
      <p className="screen__amount screen__amount--inline">{t("amount")}</p>
      <dl className="screen__details">
        <div>
          <dt>{t("detail_shop")}</dt>
          <dd>{t("merchant")}</dd>
        </div>
        <div>
          <dt>{t("detail_method")}</dt>
          <dd>{t("method_value")}</dd>
        </div>
        <div>
          <dt>{t("detail_from")}</dt>
          <dd>{t("from_value")}</dd>
        </div>
      </dl>
      {paid ? (
        <>
          <span className="screen__done">
            <Check /> {t("paid")}
          </span>
          <button type="button" tabIndex={-1} className="screen__quiet" onClick={onAgain}>
            {t("again")}
          </button>
        </>
      ) : (
        <button type="button" tabIndex={-1} className="screen__button" onClick={onPay}>
          {t("pay")}
        </button>
      )}
    </div>
  );
}

interface Asset {
  icon: string;
  name: string;
  sym: string;
  value: string;
}

export function BalanceScreen() {
  const t = useTranslations("balance");
  const assets = t("assets") as Asset[];
  return (
    <div className="screen">
      <div className="screen__bar">
        <Logo />
      </div>
      <p className="screen__soft screen__label">{t("total_label")}</p>
      <p className="screen__amount screen__amount--top">{t("total")}</p>
      <ul className="screen__assets">
        {assets.map((a) => (
          <li key={a.sym} className="screen__asset">
            <img src={`/wallet/${a.icon}.svg`} alt="" width={36} height={36} />
            <span className="screen__who">
              <span className="screen__strong">{a.name}</span>
              <span className="screen__soft">{a.sym}</span>
            </span>
            <span className="screen__strong screen__value">{a.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OnboardingScreen() {
  const ui = useTranslations("how")("ui") as Record<string, string>;
  return (
    <div className="screen screen--center">
      <div className="screen__bar">
        <Logo />
        <span className="screen__pill">{ui.language}</span>
      </div>
      <img src="/app-icon.svg" alt="" width={80} height={80} className="screen__mark" />
      <p className="screen__title">{ui.onboarding_title}</p>
      <p className="screen__soft">{ui.onboarding_text}</p>
      <span className="screen__button">{ui.onboarding_cta}</span>
    </div>
  );
}

export function PasskeyScreen() {
  const ui = useTranslations("how")("ui") as Record<string, string>;
  return (
    <div className="screen screen--center">
      <div className="screen__bar">
        <Logo />
      </div>
      <span className="screen__print">
        <Fingerprint />
      </span>
      <p className="screen__title">{ui.passkey_title}</p>
      <p className="screen__soft">{ui.passkey_text}</p>
      <span className="screen__button">{ui.passkey_cta}</span>
    </div>
  );
}

export function DepositScreen() {
  const ui = useTranslations("how")("ui") as Record<string, string>;
  return (
    <div className="screen">
      <div className="screen__bar">
        <Logo />
      </div>
      <p className="screen__title">{ui.deposit_title}</p>
      <p className="screen__soft">{ui.deposit_from}</p>
      <span className="screen__field">
        {ui.deposit_country}
        <Chevron />
      </span>
      <p className="screen__amount">{ui.deposit_amount}</p>
      <span className="screen__button">{ui.deposit_cta}</span>
    </div>
  );
}
