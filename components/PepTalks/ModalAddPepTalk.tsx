import React from 'react';
import ModalCenterLayout from '../ModalCenterLayout';
import ControllerDatePicker from '../ControllerInputs/ControllerDatePicker';
import { useForm } from 'react-hook-form';
import type { FormDataAddPepTalk } from '@/types/forms/AddPepTalkForm';
import AddPepTalkForm from '@/types/forms/AddPepTalkForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import ControllerTextInput from '../ControllerInputs/ControllerTextInput';
import usePepTalks from '@/hooks/usePepTalks';
import ThemedButton from '../ThemedComponents/ThemedButton';
import ThemedView from '../ThemedComponents/ThemedView';
import { StyleSheet } from 'react-native';

export type ModalAddPepTalkProps = {
  isVisible: boolean;
  dismiss: () => void;
  goalId: number;
  uriRecord: string | undefined;
};

const ModalAddPepTalk: React.FC<ModalAddPepTalkProps> = ({
  isVisible,
  dismiss,
  goalId,
  uriRecord,
}) => {
  const { t } = useTranslation();

  const { addPepTalk } = usePepTalks({ goalId });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataAddPepTalk>({
    resolver: zodResolver(AddPepTalkForm(t)),
  });

  const onSubmit = async (pepTalk: FormDataAddPepTalk) => {
    if (!uriRecord) {
      throw new Error('No uri for Pep talk');
    }
    await addPepTalk({ ...pepTalk, goalId, uri: uriRecord });
    dismiss();
  };

  return (
    <ModalCenterLayout isVisible={isVisible} dismiss={dismiss} style={styles.container}>
      <ThemedView style={styles.inputContainer}>
        <ControllerTextInput
          control={control}
          name="title"
          label={t('pep_talk_list.label_title')}
          placeholder={t('pep_talk_list.placeholder_title')}
          error={errors.title}
        />
        <ControllerDatePicker
          control={control}
          name="date"
          label={t('pep_talk_list.label_date')}
          placeholder={t('pep_talk_list.placeholder_date')}
          error={errors.date}
          mode="date"
        />
      </ThemedView>
      <ThemedButton type="submit" title="Submit" onPress={handleSubmit(onSubmit)} />
    </ModalCenterLayout>
  );
};

export default ModalAddPepTalk;

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  inputContainer: {
    gap: 20,
  },
});
