import Language from '@/enums/Language';

const LanguageValues: Record<Language, { label: string }> = {
  [Language.FRENCH]: {
    label: 'Français',
  },
  [Language.ENGLISH]: {
    label: 'English',
  },
};

export default LanguageValues;
