import React from 'react';
import { useTranslation } from 'react-i18next';
import ModalCenterLayout from './ModalCenterLayout';
import ThemedText from './ThemedComponents/ThemedText';
import DeleteButton from './DeleteButton';
import { StyleSheet } from 'react-native';

export type ModalDeleteProps = {
  isVisible: boolean;
  dismiss: () => void;
  onDelete: () => Promise<void>;
};

const ModalDelete: React.FC<ModalDeleteProps> = ({ isVisible, dismiss, onDelete }) => {
  const { t } = useTranslation();

  const onPressDelete = async () => {
    dismiss();
    await onDelete();
  };

  return (
    <ModalCenterLayout isVisible={isVisible} dismiss={dismiss}>
      <ThemedText style={styles.question}> {t('general.delete_question')} </ThemedText>
      <DeleteButton onPress={onPressDelete} style={styles.button} />
    </ModalCenterLayout>
  );
};

export default ModalDelete;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
  },
  question: {
    padding: 20,
    textAlign: 'center',
  },
});
