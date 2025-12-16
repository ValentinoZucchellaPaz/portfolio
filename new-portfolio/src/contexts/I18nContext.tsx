import { createContext, useContext, useState } from "react";
import { translations } from "../i18n";
import type { ReactNode } from "react";
import type { Lang } from "../i18n";

type I18nContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

function getBrowserLang(): Lang {
  const lang = navigator.language.slice(0, 2);
  return lang in translations ? (lang as Lang) : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getBrowserLang());

  function t(path: string): string {
    const keys = path.split(".");
    let value: any = translations[lang];

    for (const key of keys) {
      value = value?.[key];
    }

    if (typeof value !== "string") {
      console.warn(`Missing translation: ${lang}.${path}`);
      return path;
    }

    return value;
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
