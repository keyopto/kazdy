import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import fr from './locales/fr.json';

const locales = Localization.getLocales();
const languageTag = locales[0]?.languageTag || 'en';

i18n.use(initReactI18next).init({
  lng: languageTag,
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
