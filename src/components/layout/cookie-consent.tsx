"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "gadgetflow_cookie_consent";

type ConsentStatus = "pending" | "accepted" | "rejected";

export function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = window.localStorage.getItem(CONSENT_KEY) as ConsentStatus | null;
        setStatus(stored || "pending");
      } catch {
        setStatus("pending");
      }
    });
  }, []);

  const save = (value: ConsentStatus) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    setStatus(value);
  };

  if (status !== "pending") return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-lg"
    >
      <div className="container-tight py-4 md:py-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-sm text-text-secondary">
            <p className="mb-1">
              Мы используем cookies для работы корзины, избранного и аналитики.
            </p>
            <p>
              Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
              <a href="/privacy" className="text-accent hover:underline">
                Политикой конфиденциальности
              </a>
              .
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="secondary" size="sm" onClick={() => save("rejected")}>
              Отклонить
            </Button>
            <Button size="sm" onClick={() => save("accepted")}>
              Принять
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
