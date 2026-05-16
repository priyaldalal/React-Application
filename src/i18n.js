import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English
import enCommon from './locales/en/common.json';
import enNavbar from './locales/en/navbar.json';
import enDialog from './locales/en/dialog.json';

// French
import frCommon from './locales/fr/common.json';
import frNavbar from './locales/fr/navbar.json';
import frDialog from './locales/fr/dialog.json';

// Spanish
import esCommon from './locales/es/common.json';
import esNavbar from './locales/es/navbar.json';
import esDialog from './locales/es/dialog.json';

// Russian
import ruCommon from './locales/ru/common.json';
import ruNavbar from './locales/ru/navbar.json';
import ruDialog from './locales/ru/dialog.json';

// Japanese
import jaCommon from './locales/ja/common.json';
import jaNavbar from './locales/ja/navbar.json';
import jaDialog from './locales/ja/dialog.json';

// Chinese
import zhCommon from './locales/zh/common.json';
import zhNavbar from './locales/zh/navbar.json';
import zhDialog from './locales/zh/dialog.json';

// Amharic
import amCommon from './locales/am/common.json';
import amNavbar from './locales/am/navbar.json';
import amDialog from './locales/am/dialog.json';

// Hebrew
import heCommon from './locales/he/common.json';
import heNavbar from './locales/he/navbar.json';
import heDialog from './locales/he/dialog.json';

const buildLang = (common, navbar, dialog) => ({
  common,
  navbar,
  dialog,
  translation: { ...common, ...navbar, ...dialog },
});

const resources = {
  en: buildLang(enCommon, enNavbar, enDialog),
  fr: buildLang(frCommon, frNavbar, frDialog),
  es: buildLang(esCommon, esNavbar, esDialog),
  ru: buildLang(ruCommon, ruNavbar, ruDialog),
  ja: buildLang(jaCommon, jaNavbar, jaDialog),
  zh: buildLang(zhCommon, zhNavbar, zhDialog),
  am: buildLang(amCommon, amNavbar, amDialog),
  he: buildLang(heCommon, heNavbar, heDialog),
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['common', 'navbar', 'dialog'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
