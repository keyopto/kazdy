import LanguageValues from '@/constants/LanguageValues';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomPicker from '../ThemedComponents/CustomPicker';
import Language from '@/enums/Language';

export type LanguagePickerProps = {
  __placeholder?: never;
};

const LanguagePicker: React.FC<LanguagePickerProps> = () => {
  const { i18n } = useTranslation();
  const onChangeLanguage = (newLanguage: string) => {
    let language = '';
    switch (newLanguage) {
      case Language.FRENCH:
        language = 'fr-FR';
        break;
      case Language.ENGLISH:
      default:
        language = 'en-EN';
        break;
    }

    i18n.changeLanguage(language);
  };

  const data = Object.entries(LanguageValues).map(([key, value]) => {
    return {
      value: key,
      label: value.label,
    };
  });

  const getSelectedValue = () => {
    switch (i18n.language) {
      case 'fr-FR':
        return Language.FRENCH;
      case 'en-EN':
      default:
        return Language.ENGLISH;
    }
  };

  return (
    <CustomPicker data={data} selectedValue={getSelectedValue()} onValueChange={onChangeLanguage} />
  );
};

export default LanguagePicker;
