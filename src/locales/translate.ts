// src/locales/index.ts
import es from "./es.json";

interface Translations {
  [key: string]: string;
}

const translations: Translations = es as Translations;

const translate = (key: string, params?: Record<string, string | number>) => {
  let text = translations[key] || key;
  if (params) {
    Object.keys(params).forEach((param) => {
      const regex = new RegExp(`{{${param}}}`, "g");
      text = text.replace(regex, params[param].toString());
    });
  }
  return text;
};

export default translate;
