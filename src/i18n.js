import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//import LanguageDetector from "i18next-browser-languagedetector";
//import Backend from "i18next-http-backend";

// Importa tus archivos de traducción
import translationEN from "./Locales/en/translation.json";
import translationES from "./Locales/es/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: translationEN },
    en: { translation: translationES },
  },
  lng: "es", // idioma por defecto
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
