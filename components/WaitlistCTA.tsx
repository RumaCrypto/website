"use client";

import { CSSProperties, useState } from "react";
import { useTranslations } from "@/context/translations/TranslationsContext";
import { getUserLocation, submitToNotion } from "@/lib/notion";

export default function WaitlistCTA({ lang }: { lang: string }) {
  const t = useTranslations("waitlist");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const { country } = await getUserLocation();
      await submitToNotion({ email, language: lang, country });
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="novedades" aria-labelledby="news-title" className="section">
      <div className="frame">
        <div className="panel panel--blue news">
          <div className="news__copy">
            <h2 id="news-title" data-reveal className="h2">
              {t("heading")}
            </h2>
            <p data-reveal style={{ "--i": 1 } as CSSProperties} className="lead">
              {t("text")}
            </p>
          </div>

          <div data-reveal style={{ "--i": 2 } as CSSProperties} className="news__action">
            {submitted ? (
              <p role="status" className="news__done">
                {t("thank_you")}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="news__form">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("placeholder")}
                  aria-label={t("input_label")}
                  autoComplete="email"
                  className="news__input"
                />
                <button type="submit" disabled={loading} className="button">
                  {loading ? t("sending") : t("cta")}
                </button>
              </form>
            )}
            {error && (
              <p role="alert" className="news__error">
                {t("error")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
