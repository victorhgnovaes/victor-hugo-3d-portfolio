"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "pt" | "en";
type LanguageContextValue = { locale: Locale; setLocale: (locale: Locale) => void; text: (pt: string, en: string) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");
  useEffect(() => { const saved = window.localStorage.getItem("vh-locale"); if (saved === "pt" || saved === "en") setLocaleState(saved); }, []);
  const setLocale = useCallback((next: Locale) => { setLocaleState(next); window.localStorage.setItem("vh-locale", next); document.documentElement.lang = next === "pt" ? "pt-BR" : "en"; }, []);
  useEffect(() => { document.documentElement.lang = locale === "pt" ? "pt-BR" : "en"; }, [locale]);
  const value = useMemo(() => ({ locale, setLocale, text: (pt: string, en: string) => locale === "pt" ? pt : en }), [locale, setLocale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { const context = useContext(LanguageContext); if (!context) throw new Error("useLanguage must be used inside LanguageProvider"); return context; }
