import es from "./es.json";
import en from "./en.json";

export const translations = {
  es,
  en,
};

export type Lang = keyof typeof translations;
export type TranslationSchema = typeof es;
