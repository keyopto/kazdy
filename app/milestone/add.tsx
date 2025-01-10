import ControllerDatePicker from '@/components/ControllerInputs/ControllerDatePicker';
import ControllerTextInput from '@/components/ControllerInputs/ControllerTextInput';
import ThemedButton from '@/components/ThemedComponents/ThemedButton';
import ThemedView from '@/components/ThemedComponents/ThemedView';
import useMilestones from '@/hooks/useMilestones';
import type { FormDataAddMilestone } from '@/types/forms/AddMilestoneForm';
import AddMilestoneForm from '@/types/forms/AddMilestoneForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams, type UnknownOutputParams } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

export interface MilestoneAddScreenParams extends UnknownOutputParams {
  goalId: string;
}

const MilestoneAdd = () => {
  const { goalId } = useLocalSearchParams<MilestoneAddScreenParams>();

  const { t } = useTranslation();

  const { addMilestone } = useMilestones();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataAddMilestone>({
    resolver: zodResolver(AddMilestoneForm(t)),
  });

  const onSubmit = async (milestone: FormDataAddMilestone) => {
    await addMilestone({
      ...milestone,
      goalId: Number(goalId),
    });
    router.dismiss();
  };

  return (
    <ThemedView style={styles.container}>
      <ControllerTextInput
        control={control}
        name="title"
        placeholder={t('add_milestone.placeholder_title')}
        error={errors.title}
      />
      <ControllerDatePicker
        control={control}
        name="date"
        placeholder={t('add_milestone.placeholder_date')}
        mode="date"
        error={errors.date}
      />
      <ThemedButton title="Submit" onPress={handleSubmit(onSubmit)} />
    </ThemedView>
  );
};

export default MilestoneAdd;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
