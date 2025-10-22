// src/context/LanguageContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../../data/translations";

const LanguageContext = createContext();

export function LanguageProvider({ defaultLang = "en", children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("appLanguage") || defaultLang;
  });

  useEffect(() => {
    localStorage.setItem("appLanguage", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => translations[language]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
