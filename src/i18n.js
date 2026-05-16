import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English
import enCommon from './locales/en/common.json';
import enNavbar from './locales/en/navbar.json';
import enDialog from './locales/en/dialog.json';

// French
import frCommon from './locales/fr/common.json';

// Spanish
import esCommon from './locales/es/common.json';

const resources = {
  en: {
    common: enCommon,
    navbar: enNavbar,
    dialog: enDialog,
    translation: { ...enCommon, ...enNavbar, ...enDialog } // Fallback for simple t('key')
  },
  fr: {
    common: frCommon,
    translation: { ...frCommon }
  },
  es: {
    common: esCommon,
    translation: { ...esCommon }
  }
  // Others can be added here or loaded dynamically
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['common', 'navbar', 'dialog'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
