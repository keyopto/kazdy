import React from 'react';
import { type PressableProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemedButton from './ThemedComponents/ThemedButton';

export type DeleteButtonProps = PressableProps;

const DeleteButton: React.FC<DeleteButtonProps> = ({ ...rest }) => {
  const { t } = useTranslation();

  return (
    <ThemedButton
      title={t('general.delete')}
      iconName="bin.xmark.fill"
      themeTextColor="text_error"
      {...rest}
    />
  );
};

export default DeleteButton;
